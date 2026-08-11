/**
 * POST /api/chat, the chatbot's backend.
 *
 * This runs on YOUR SERVER, never in the visitor's browser. That's the whole
 * point: the API key lives here and is never shipped to the client.
 *
 * It speaks the "OpenAI-compatible chat completions" format, which almost
 * every LLM provider now supports. That means switching providers is just
 * three environment variables, no code changes. See .env.example.
 */

/**
 * ─── EDIT YOUR CHAT MESSAGES HERE ──────────────────────────────────────────
 * These are the exact words a visitor sees when something goes wrong. Written
 * in the bot's own voice, because the widget shows them as a chat bubble.
 */
const MESSAGES = {
  /** Visitor is spamming YOUR endpoint (your own per-IP limit, below). */
  tooManyQuestions:
    "Easy there, speed-typer! You're asking faster than I can think. Give me about a minute to catch my breath. 😮‍💨",

  /** The AI provider's per-minute quota ran out. Retrying soon usually works. */
  providerBusy:
    "My brain just overheated a little. 🫠 Give me a minute to cool down, then ask me again.",

  /** The provider's DAILY quota ran out. Retrying soon will NOT work. */
  providerDailyLimit:
    "Well, that's my brain cells for today, all used up. 🧠💤 Jonhyl doesn't pay me overtime (he doesn't pay me at all, honestly), so I'm clocking out. Come back tomorrow, or just message him on LinkedIn if it's urgent!",

  /** No API key configured yet (only you should ever see this). */
  notConfigured:
    "The chat isn't configured yet. Add AI_API_KEY to your .env file.",

  /** Key rejected, or a bad model name (only you should ever see this). */
  misconfigured: 'The chat is misconfigured. (Check your API key and AI_MODEL.)',

  /** Anything else. */
  generic:
    "Something broke on my end. Very embarrassing for an AI. 😅 Mind asking me that again?",
} as const
// ───────────────────────────────────────────────────────────────────────────

/** Max characters we accept in a single question. Keeps costs and abuse down. */
const MAX_MESSAGE_LENGTH = 500

/**
 * How many messages to send the model, counting the current question.
 *
 *   1  = no memory. Only the question being asked right now. Cheapest.
 *   10 = remembers roughly the last 5 exchanges, so follow-ups work.
 *
 * Currently 1: every question is answered on its own.
 *
 * The trade-off: "Tell me about Flexperience" → "What tech did it use?" will
 * confuse her, because she never sees the first question and doesn't know what
 * "it" refers to. Visitors still see the whole conversation on screen, it's
 * only the model that forgets. Raise this to 10 to turn memory back on.
 *
 * Savings are modest: history costs ~45 tokens per exchange, while the
 * knowledge base costs ~1,550 on every single request either way.
 */
const MAX_HISTORY = 1

/** Simple per-IP rate limit. */
const RATE_LIMIT_MAX = 15
const RATE_LIMIT_WINDOW_MS = 60_000

type Role = 'user' | 'assistant'
interface ChatMessage {
  role: Role
  content: string
}

/**
 * In-memory rate limiter. Good enough for a portfolio site.
 * Note: this resets whenever the server restarts, and on serverless hosts each
 * instance keeps its own counter, it's a speed bump, not a vault.
 */
const hits = new Map<string, { count: number; resetAt: number }>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = hits.get(ip)

  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    // Opportunistic cleanup so the map can't grow forever.
    if (hits.size > 500) {
      for (const [key, value] of hits) if (now > value.resetAt) hits.delete(key)
    }
    return false
  }

  entry.count += 1
  return entry.count > RATE_LIMIT_MAX
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)

  // Read the live environment FIRST, then fall back to the values baked in at
  // build time by nuxt.config. Order matters: Nuxt freezes runtimeConfig when
  // it builds, so if you rotate your key in a Vercel/Netlify dashboard later,
  // only the live process.env has the new value, no rebuild required.
  const apiKey = process.env.AI_API_KEY || config.aiApiKey
  const baseUrl = process.env.AI_BASE_URL || config.aiBaseUrl
  const model = process.env.AI_MODEL || config.aiModel

  // Optional backup provider. Free tiers are small (Gemini allows only 20
  // requests per day, per model), so when the main one is out of quota we try
  // this one instead of telling the visitor to come back tomorrow. Entirely
  // optional, leave the fallback variables unset and nothing changes.
  const fallbackKey = process.env.AI_FALLBACK_API_KEY || config.aiFallbackApiKey
  const fallbackBaseUrl =
    process.env.AI_FALLBACK_BASE_URL || config.aiFallbackBaseUrl
  const fallbackModel = process.env.AI_FALLBACK_MODEL || config.aiFallbackModel

  // Friendly message instead of a crash when the key isn't set up yet.
  if (!apiKey) {
    throw createError({ statusCode: 503, message: MESSAGES.notConfigured })
  }

  const ip = getRequestIP(event, { xForwardedFor: true }) ?? 'unknown'
  if (isRateLimited(ip)) {
    throw createError({ statusCode: 429, message: MESSAGES.tooManyQuestions })
  }

  // ---- Validate the incoming request -------------------------------------
  const body = await readBody<{ messages?: unknown }>(event)

  if (!Array.isArray(body?.messages) || body.messages.length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'No messages provided.' })
  }

  const history: ChatMessage[] = []
  for (const raw of body.messages.slice(-MAX_HISTORY)) {
    const item = raw as Partial<ChatMessage>
    if (
      (item?.role !== 'user' && item?.role !== 'assistant') ||
      typeof item.content !== 'string'
    ) {
      throw createError({ statusCode: 400, statusMessage: 'Malformed message.' })
    }
    const content = item.content.trim().slice(0, MAX_MESSAGE_LENGTH)
    if (content) history.push({ role: item.role, content })
  }

  if (history.length === 0 || history.at(-1)!.role !== 'user') {
    throw createError({
      statusCode: 400,
      statusMessage: 'The last message must be a question from the visitor.',
    })
  }

  // ---- Ask the model, trying the backup provider if the main one is out ----
  const providers = [{ label: 'main', key: apiKey, baseUrl, model }]
  if (fallbackKey) {
    providers.push({
      label: 'fallback',
      key: fallbackKey,
      baseUrl: fallbackBaseUrl,
      model: fallbackModel,
    })
  }

  let payload: any = null
  let status = 0
  let servedBy = ''

  for (const provider of providers) {
    try {
      const response = await fetch(`${provider.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${provider.key}`,
        },
        body: JSON.stringify({
          model: provider.model,
          // The system message is BIA's instructions + everything she knows.
          messages: [{ role: 'system', content: PORTFOLIO_CONTEXT }, ...history],
          // A safety ceiling, not a length setting. Modern "thinking" models
          // spend tokens reasoning *before* they write, and that counts against
          // this number, set it too low and you get an empty reply. Answer
          // length is controlled by the "be concise" rule in the system prompt.
          max_tokens: 1200,
        }),
        // Don't let a slow provider hang the request forever.
        signal: AbortSignal.timeout(30_000),
      })
      payload = await response.json().catch(() => null)
      status = response.status

      if (response.ok) {
        servedBy = `${provider.label}:${provider.model}`
        break
      }

      // Full JSON, not the object, Node truncates nested arrays to "[Array]",
      // which hides the `quotaId` that tells you WHICH limit you hit.
      console.error(
        `[api/chat] ${provider.label} provider error ${status}:`,
        JSON.stringify(payload),
      )

      // Provider errors are not interchangeable. For example, Gemini can
      // reject a parameter or model that Groq accepts, and each provider has
      // its own key and model permissions. If a backup is configured, let it
      // try every failure from the main provider.
    } catch (error) {
      console.error(`[api/chat] ${provider.label} provider unreachable:`, error)
      status = 0
      payload = null
    }
  }

  if (!servedBy) {
    if (status === 429) {
      // A 429 can mean "too fast, wait a minute" or "you're out for the day",
      // and telling someone to retry in a minute when they can't is worse than
      // saying nothing. Providers name the exhausted quota in the error body
      // (e.g. "...RequestsPerDay..."), so we look for a per-day quota.
      const isDailyLimit = /per\s*-?\s*day|daily|requests_per_day/i.test(
        JSON.stringify(payload ?? ''),
      )
      throw createError({
        statusCode: 429,
        message: isDailyLimit
          ? MESSAGES.providerDailyLimit
          : MESSAGES.providerBusy,
      })
    }
    if (
      status === 400 ||
      status === 401 ||
      status === 403 ||
      status === 404
    ) {
      throw createError({ statusCode: 503, message: MESSAGES.misconfigured })
    }
    throw createError({ statusCode: 502, message: MESSAGES.generic })
  }

  const reply: string | undefined = payload?.choices?.[0]?.message?.content

  if (!reply?.trim()) {
    console.error('[api/chat] empty reply from provider:', payload)
    throw createError({
      statusCode: 502,
      message: MESSAGES.generic,
    })
  }

  // Log what this answer actually cost, so you can see real numbers in your
  // terminal instead of guessing. `prompt` is the knowledge base + the whole
  // conversation so far (it grows as the chat goes on); `completion` includes
  // hidden reasoning tokens, which is why it's bigger than the visible reply.
  //
  // Note on Gemini's free tier: the daily cap counts REQUESTS, not tokens, and
  // it is per project *per model* (quotaId GenerateRequestsPerDayPerProjectPerModel).
  // Every question below is 1 request no matter how big. Your limits and usage:
  // https://aistudio.google.com/rate-limit?timeRange=last-28-days
  const u = payload?.usage
  if (u) {
    console.log(
      `[api/chat] ${servedBy} · 1 request · ${u.prompt_tokens} prompt + ${u.completion_tokens} completion = ${u.total_tokens} tokens`,
    )
  }

  return {
    reply: reply.trim(),
    // Safe to expose for debugging: this contains only the provider slot and
    // model id (for example, "main:gemini-flash-lite-latest"), never the key.
    servedBy,
  }
})
