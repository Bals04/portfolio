<template>
    <!-- ── Launcher ─────────────────────────────────────────────────────── -->
    <div v-if="!open" class="fixed bottom-24 right-4 z-[55] sm:bottom-6 sm:right-6">
        <!-- BIA is present before you open her: the same motes, on the ink
             pill, so the launcher reads as her rather than as a chat icon. -->
        <button type="button" @click="openChat" aria-label="Ask BIA"
            class="flex items-center gap-2.5 rounded-full border border-g200 bg-ink py-2.5 pl-2.5 pr-4 text-bg shadow-soft-lg transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5">
            <BiaMotes size="mini" bright class="shrink-0" />
            <span class="font-mono text-[10px] uppercase tracking-micro">ask bia</span>
        </button>
    </div>

    <!-- ── Full-screen conversation ─────────────────────────────────────── -->
    <Transition name="veil">
        <div v-if="open" class="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Chat with BIA">

            <!-- Frosted glass, plus one faint halftone layer for grain. Kept
                 deliberately quiet: the texture should read as paper, not as
                 pattern, and it must never fight the text for attention. -->
            <div class="absolute inset-0 bg-bg/92 backdrop-blur-2xl"></div>
            <div class="veil-grain pointer-events-none absolute inset-0"></div>


            <!-- close -->
            <button type="button" @click="open = false" aria-label="Close chat"
                class="absolute right-4 top-4 z-10 flex items-center gap-2 rounded-full border border-g300 bg-bg px-4 py-2.5 font-mono text-[10px] uppercase tracking-micro text-ink shadow-soft transition-all duration-200 hover:border-ink hover:bg-ink hover:text-bg sm:right-6 sm:top-6">
                <span>close</span>
                <span class="[&_svg]:h-3.5 [&_svg]:w-3.5" v-html="closeIcon"></span>
            </button>

            <div class="relative mx-auto flex h-full w-full max-w-3xl flex-col px-6 sm:px-10">

                <!-- Once the opening state gives way to a transcript, BIA keeps
                     a small presence at the top: she's still in the room, and
                     the wordmark labels whose voice the prose belongs to.
                     Right padding clears the close button. -->
                <div v-if="started" class="shrink-0 pb-5 pr-28 pt-5 sm:pt-7">
                    <div class="flex items-center gap-2.5">
                        <h2 class="font-pixel text-2xl leading-none text-ink">BIA</h2>
                        <BiaMotes size="compact" class="shrink-0 self-center" />
                    </div>

                    <!-- The opening introduction, shrunk to match: who she is
                         stays on screen without competing with her answers. -->
                    <p class="mt-1.5 max-w-md text-[13px] leading-relaxed text-g500">
                        Bals Intelligent Assistant, an AI Jonhyl built to answer questions for him.
                    </p>

                    <!-- All of them, always: a shortcut that vanishes once used
                         leaves the row shrinking under the visitor as they go. -->
                    <div class="mt-3 flex flex-wrap gap-2">
                        <button v-for="item in CANNED_EXCHANGES" :key="item.q" type="button" @click="askCanned(item)"
                            class="rounded-full bg-g800 px-3.5 py-2 text-[12px] text-bg shadow-soft transition-colors duration-200 hover:bg-ink">
                            {{ item.q }}
                        </button>
                    </div>
                </div>

                <!-- transcript -->
                <!-- Wraps the scroller so the scroll hints can be positioned
                     against it without sitting inside the scrolling content. -->
                <div class="relative flex min-h-0 flex-1 flex-col">

                    <!-- Hidden scrollbar, so the two hints below are the only
                         scroll affordance: an unprompted "earlier" is the one
                         thing a scrollbar would have told you for free. -->
                    <button v-if="canScrollUp" type="button" @click="pageTranscript(-1)"
                        class="absolute right-0 top-0 z-10 flex items-center gap-1.5 rounded-full border border-g300 bg-bg/90 px-2.5 py-1 font-mono text-[9px] uppercase tracking-micro text-g500 shadow-soft backdrop-blur transition-colors duration-200 hover:border-ink hover:text-ink">
                        <span>↑</span><span>earlier</span>
                    </button>

                    <button v-if="canScrollDown" type="button" @click="scrollToBottom(true)"
                        class="absolute bottom-1 right-0 z-10 flex items-center gap-1.5 rounded-full border border-g300 bg-bg/90 px-2.5 py-1 font-mono text-[9px] uppercase tracking-micro text-g500 shadow-soft backdrop-blur transition-colors duration-200 hover:border-ink hover:text-ink">
                        <span>↓</span><span>latest</span>
                    </button>

                    <div ref="scroller" @scroll="syncScrollHints"
                        class="transcript flex min-h-0 flex-1 flex-col overflow-y-auto pb-6"
                        :class="started ? 'pt-12' : 'pt-20'">

                        <!-- mt-auto, NOT justify-end on the scroller: content that
                             overflows the top edge of a justify-end box cannot be
                             scrolled to, so older messages become unreachable. An
                             auto margin sinks a short transcript to the bottom the
                             same way, and simply stops applying once it's tall
                             enough to scroll. -->
                        <div class="mt-auto">

                        <!-- opening state -->
                        <div v-if="!started" class="pb-4">
                            <span
                                class="inline-block rounded-full border border-g300 bg-g50 px-3 py-1.5 font-mono text-[10px] uppercase tracking-micro text-g600">
                                bals intelligent assistant
                            </span>

                            <div class="mt-5 flex items-center gap-3 sm:gap-4">
                                <h2 class="font-pixel text-5xl leading-none text-ink sm:text-6xl">BIA</h2>
                                <BiaMotes class="shrink-0 self-center" />
                            </div>

                            <p class="mt-6 max-w-md font-serif text-[1.0625rem] leading-[1.75] text-g600">
                                Hi! I'm BIA, short for Bals Intelligent Assistant, an AI
                                that Jonhyl built to answer questions for him. I know his
                                work well enough that you won't have to read the whole
                                page. Projects, stack, where he's worked: ask away.
                            </p>

                            <p class="mt-8">
                                <span
                                    class="inline-block rounded-full border border-g300 bg-g50 px-3 py-1.5 font-mono text-[10px] uppercase tracking-micro text-g600">
                                    try asking
                                </span>
                            </p>
                            <div class="mt-3 flex flex-wrap gap-2.5">
                                <button v-for="item in CANNED_EXCHANGES" :key="item.q" type="button"
                                    @click="askCanned(item)"
                                    class="rounded-full bg-g800 px-4 py-2.5 text-[13px] text-bg shadow-soft transition-colors duration-200 hover:bg-ink">
                                    {{ item.q }}
                                </button>
                            </div>
                        </div>

                            <!-- messages: everything left-aligned, editorial rather than chat-app -->
                            <div class="space-y-7">
                                <div v-for="(m, i) in messages" :key="i">
                                    <!-- visitor: small pill with a tail -->
                                    <p v-if="m.role === 'user'"
                                        class="bubble relative inline-block max-w-[85%] rounded-2xl bg-g800 px-4 py-2.5 text-sm leading-snug text-bg shadow-soft">
                                        {{ m.content }}
                                    </p>

                                    <!-- BIA: plain prose, no container -->
                                    <div v-else class="max-w-[46ch]">
                                        <span class="mb-2 block font-mono text-[9px] uppercase tracking-micro text-g400">bia</span>
                                        <p class="whitespace-pre-wrap font-serif text-[1.0625rem] leading-[1.75] text-ink">{{ m.content }}</p>

                                        <!-- Same white tile as the experience section, so
                                             the school reads as the same institution
                                             wherever you meet it on the site. The tile
                                             stays white in both themes: these logos are
                                             drawn for light backgrounds. -->
                                        <div v-if="m.badge" class="mt-4 flex items-center gap-3">
                                            <div
                                                class="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-sm2 border border-g200 bg-white">
                                                <img :src="m.badge.logo" alt="" class="h-full w-full object-contain p-1"
                                                    loading="lazy" />
                                            </div>
                                            <span class="font-mono text-[10px] uppercase tracking-micro text-g500">
                                                {{ m.badge.label }}
                                            </span>
                                        </div>

                                        <!-- A sample of the marks, not the inventory. The
                                             trailing link is the honest version of an
                                             ellipsis: it admits there's more and hands
                                             over the way to see it. -->
                                        <div v-if="m.icons?.length" class="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2.5">
                                            <img v-for="t in m.icons" :key="t.name" :src="t.icon" :alt="t.name" :title="t.name"
                                                class="h-5 w-5 object-contain opacity-80" :class="{ 'dark:invert': t.invertDark }"
                                                loading="lazy" width="20" height="20" />
                                            <button type="button" @click="showFullStack"
                                                class="font-mono text-[9px] uppercase tracking-micro text-g400 transition-colors duration-200 hover:text-ink">
                                                and more ↗
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <!-- thinking -->
                                <div v-if="pending" aria-live="polite">
                                    <span class="shimmer font-serif text-[1.0625rem]">{{ thinkingPhrase }}…</span>
                                </div>

                                <!-- hard error (not a limit, those speak as BIA) -->
                                <p v-if="error" role="alert" class="max-w-[46ch] font-mono text-[11px] leading-relaxed text-g500">
                                    {{ error }}
                                </p>
                            </div>
                    </div>
                </div>
            </div>

                <!-- composer -->
                <form @submit.prevent="send()" class="shrink-0 pb-8 sm:pb-10">
                    <div class="flex items-center gap-3 border-t border-g300 pt-4">
                        <input ref="input" v-model="draft" type="text" :maxlength="MAX_LENGTH" :disabled="pending"
                            placeholder="Ask BIA about Jonhyl…" aria-label="Your question"
                            class="min-w-0 flex-1 bg-transparent py-2 font-serif text-[1.0625rem] text-ink placeholder:font-sans placeholder:text-[0.9375rem] placeholder:text-g400 focus:outline-none disabled:opacity-40" />
                        <button type="submit" :disabled="pending || !draft.trim()" aria-label="Send"
                            class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-bg transition-opacity hover:opacity-80 disabled:opacity-20">
                            <span class="[&_svg]:h-4 [&_svg]:w-4" v-html="sendIcon"></span>
                        </button>
                    </div>
                    <p class="mt-3 font-mono text-[9px] uppercase tracking-micro text-g400">
                        BIA is AI-generated, so she may be imprecise
                    </p>
                </form>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { computed, nextTick, onUnmounted, ref, watch } from 'vue'
import { CANNED_EXCHANGES, type Badge, type CannedExchange, type TechIcon } from '~/utils/bia-canned'

interface Message {
    role: 'user' | 'assistant'
    content: string
    /**
     * Presentation only, attached by canned answers. Stripped before the
     * transcript goes to the API, which has no use for them.
     */
    icons?: TechIcon[]
    badge?: Badge
}

/** Keep in sync with MAX_MESSAGE_LENGTH in server/api/chat.post.ts. */
const MAX_LENGTH = 500

const open = ref(false)
const draft = ref('')
const pending = ref(false)
const error = ref('')
const messages = ref<Message[]>([])
const scroller = ref<HTMLElement | null>(null)
const input = ref<HTMLInputElement | null>(null)

/** Whether there's transcript above / below the visible area. */
const canScrollUp = ref(false)
const canScrollDown = ref(false)

const prefersReducedMotion = () =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * True once there's anything in the transcript, including the moment a
 * question is sent but not yet answered. Swaps the opening state for the
 * compact header, so BIA is never absent from the screen.
 */
const started = computed(() => messages.value.length > 0 || pending.value)

/** Fires the canned reply instead of an API call, see askCanned(). */
let cannedTimer: ReturnType<typeof setTimeout> | null = null

/**
 * Cycled while waiting so the wait feels alive rather than stuck. Written as
 * full clauses naming BIA, so the line reads as her narrating her own work
 * rather than as a status label on the page.
 */
const THINKING_PHRASES = [
    'BIA is fetching information',
    'BIA is checking her notes',
    'BIA is reviewing his work',
    'BIA is composing an answer',
]
const thinkingPhrase = ref(THINKING_PHRASES[0])
let phraseTimer: ReturnType<typeof setInterval> | null = null

const closeIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>'
const sendIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h15M13 6l6 6-6 6"/></svg>'

const openChat = () => {
    open.value = true
    nextTick(() => {
        input.value?.focus()
        scrollToBottom()
    })
}

/**
 * Hands the visitor off to the real stack section rather than trying to
 * reproduce it in the transcript. Closes the overlay first, since the page
 * behind it is scroll-locked while it's open.
 */
function showFullStack() {
    open.value = false
    nextTick(() => {
        document.getElementById('stack')?.scrollIntoView({
            behavior: prefersReducedMotion() ? 'auto' : 'smooth',
            block: 'start',
        })
    })
}

const scrollToBottom = (smooth = false) => {
    const el = scroller.value
    if (!el) return
    if (smooth && !prefersReducedMotion()) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
    else el.scrollTop = el.scrollHeight
    syncScrollHints()
}

/**
 * Drives the two scroll hints. The scrollbar is hidden to keep the panel
 * quiet, so without these there is nothing at all to say the conversation
 * continues past the edge. The 12px slack stops a hint flickering on and off
 * during a smooth scroll's final pixels.
 */
function syncScrollHints() {
    const el = scroller.value
    if (!el) {
        canScrollUp.value = canScrollDown.value = false
        return
    }
    canScrollUp.value = el.scrollTop > 12
    canScrollDown.value = el.scrollTop + el.clientHeight < el.scrollHeight - 12
}

/** Moves by most of a screenful, so a line or two stays for continuity. */
function pageTranscript(direction: 1 | -1) {
    const el = scroller.value
    if (!el) return
    el.scrollBy({
        top: direction * el.clientHeight * 0.8,
        behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    })
}

function startThinking() {
    let i = 0
    thinkingPhrase.value = THINKING_PHRASES[0]
    phraseTimer = setInterval(() => {
        i = (i + 1) % THINKING_PHRASES.length
        thinkingPhrase.value = THINKING_PHRASES[i]
    }, 2200)
}

function stopThinking() {
    if (phraseTimer) clearInterval(phraseTimer)
    phraseTimer = null
}

/**
 * Answers a suggestion chip from CANNED_EXCHANGES, with no API call.
 *
 * The pause is deliberate rather than cosmetic: an answer that lands the
 * instant you click reads as a canned answer, and the thinking animation is
 * how BIA shows she's working. Length-scaled so a longer answer takes longer,
 * which is also what makes the word cycle through more than one state.
 *
 * The reply still enters the transcript as a normal assistant turn, so a
 * typed follow-up carries it to the API as context.
 */
function askCanned(item: CannedExchange) {
    if (pending.value) return

    error.value = ''
    messages.value.push({ role: 'user', content: item.q })
    pending.value = true
    startThinking()
    nextTick(scrollToBottom)

    cannedTimer = setTimeout(async () => {
        cannedTimer = null
        messages.value.push({
            role: 'assistant',
            content: item.a,
            icons: item.icons,
            badge: item.badge,
        })
        pending.value = false
        stopThinking()
        await nextTick(scrollToBottom)
        input.value?.focus()
    }, Math.min(2600, 900 + item.a.length * 6))
}

async function send(preset?: string) {
    const text = (preset ?? draft.value).trim()
    if (!text || pending.value) return

    error.value = ''
    draft.value = ''
    messages.value.push({ role: 'user', content: text.slice(0, MAX_LENGTH) })
    pending.value = true
    startThinking()
    await nextTick(scrollToBottom)

    try {
        const data = await $fetch<{ reply: string; servedBy: string }>('/api/chat', {
            method: 'POST',
            // Send the running conversation so BIA remembers the thread, as
            // role/content only: `icons` is ours to render, not hers to read.
            body: { messages: messages.value.map(({ role, content }) => ({ role, content })) },
        })
        console.info(`[BIA] Answer served by ${data.servedBy}`)
        messages.value.push({ role: 'assistant', content: data.reply })
    } catch (err: any) {
        const status = err?.statusCode ?? err?.status ?? err?.response?.status

        // Always log the raw error. Without this, a request that never reached
        // the server looks identical to one the server rejected, and you're left
        // guessing from a generic message.
        console.error('[BIA] /api/chat failed:', { status, error: err })

        // `message` first: the server sends BIA's wording there, because h3 will
        // sanitize `statusMessage` in a future version (it ends up in the HTTP
        // status line, which can't hold emoji or long text).
        const text =
            err?.data?.message ||
            err?.data?.statusMessage ||
            // No status and no body means the request never got a reply: the dev
            // server is restarting or down, or the network dropped. Say so,
            // rather than blaming the AI for something it never saw.
            (!status
                ? "I couldn't reach the server. If you're running this locally, check that the dev server is still up, then try again."
                : `Something went wrong (error ${status}). Please try again.`)

        if (status === 429) {
            // "I've hit my limit" is BIA talking about herself, so it belongs in
            // the transcript as a reply, not in an error slot.
            messages.value.push({ role: 'assistant', content: text })
        } else {
            error.value = text
        }
    } finally {
        pending.value = false
        stopThinking()
        await nextTick(scrollToBottom)
        input.value?.focus()
    }
}

// Lock the page behind the overlay so it can't scroll under the blur.
watch(open, (isOpen) => {
    if (typeof document === 'undefined') return
    document.documentElement.style.overflow = isOpen ? 'hidden' : ''
})

const onKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && open.value) open.value = false
}

if (typeof window !== 'undefined') window.addEventListener('keydown', onKeydown)

onUnmounted(() => {
    stopThinking()
    // Otherwise a canned reply lands in a transcript nobody is watching, and
    // leaves `pending` stuck true if the widget comes back.
    if (cannedTimer) clearTimeout(cannedTimer)
    if (typeof window !== 'undefined') window.removeEventListener('keydown', onKeydown)
    if (typeof document !== 'undefined') document.documentElement.style.overflow = ''
})
</script>

<style scoped>
/* ── overlay entrance: the page fades away behind the blur ─────────────── */
.veil-enter-active,
.veil-leave-active {
    transition: opacity 340ms ease, backdrop-filter 340ms ease;
}

.veil-enter-from,
.veil-leave-to {
    opacity: 0;
    backdrop-filter: blur(0px);
}

/* ── grain: same dot language as the site, at a whisper ────────────────── */
.veil-grain {
    background-image: radial-gradient(rgb(var(--dot) / 0.1) 1px, transparent 1.4px);
    background-size: 14px 14px;
    /* Fade the dots out through the middle so they never sit behind prose. */
    -webkit-mask-image: radial-gradient(ellipse 70% 60% at 32% 55%, transparent 30%, black 100%);
    mask-image: radial-gradient(ellipse 70% 60% at 32% 55%, transparent 30%, black 100%);
}

/* ── the transcript dissolves as it leaves ────────────────────────────
   Without this, a line scrolling under the header is simply sliced through
   the middle at the container's edge, which reads as a rendering fault
   rather than as content passing out of view. The fade is short so it
   never dims a line you're still reading. */
.transcript {
    -webkit-mask-image: linear-gradient(to bottom, transparent 0, black 34px);
    mask-image: linear-gradient(to bottom, transparent 0, black 34px);

    /* No scrollbar: it's a strip of chrome down the side of a panel that is
       otherwise all paper and type. The two hints replace what it told you. */
    scrollbar-width: none;
    -ms-overflow-style: none;
}

.transcript::-webkit-scrollbar {
    display: none;
}

/* ── the little tail on a visitor bubble ──────────────────────────────── */
.bubble::before {
    content: '';
    position: absolute;
    bottom: 4px;
    left: -3px;
    width: 9px;
    height: 9px;
    background: inherit;
    clip-path: polygon(100% 0, 100% 100%, 0 100%);
    border-bottom-left-radius: 2px;
}

/* ── light sweeping across BIA's changing thinking phrase ────────────── */
.shimmer {
    background: linear-gradient(90deg,
            rgb(var(--g400)) 0%,
            rgb(var(--g400)) 35%,
            rgb(var(--ink)) 50%,
            rgb(var(--g400)) 65%,
            rgb(var(--g400)) 100%);
    background-size: 220% 100%;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    animation: sweep 2.1s linear infinite;
}

@keyframes sweep {
    from { background-position: 120% 0; }
    to   { background-position: -120% 0; }
}

@media (prefers-reduced-motion: reduce) {
    .shimmer {
        animation: none;
        color: rgb(var(--g500));
        -webkit-text-fill-color: rgb(var(--g500));
    }
}
</style>
