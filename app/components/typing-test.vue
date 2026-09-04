<template>
    <!-- Launcher, stacked directly above the "ask bia" pill. Outlined rather
         than filled, and icon-only: BIA is the thing a recruiter should click,
         and a second solid pill of equal weight would split that attention.
         The offsets track the chat launcher's own bottom-24 / sm:bottom-6 plus
         its height, so the two read as one stack. -->
    <div v-if="!open" class="hidden fixed bottom-[9.5rem] right-4 z-[55] md:block sm:bottom-[5rem] sm:right-6">
        <button type="button" @click="openTest" aria-label="Open typing test"
            class="flex items-center gap-2 rounded-full border border-g200 bg-bg py-2.5 pl-3 pr-4 text-ink shadow-soft transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-ink">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"
                class="h-4 w-4 shrink-0" aria-hidden="true">
                <rect x="2" y="6" width="20" height="12" rx="2" />
                <path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M7 14h10" />
            </svg>
            <!-- The label types itself, because a typing test may as well
                 demonstrate one. -->
            <span class="type-label font-mono text-[10px] uppercase tracking-micro">typing test</span>
        </button>
    </div>

    <Teleport to="body">
        <Transition name="veil">
            <div v-if="open" class="hidden fixed inset-0 z-[70] md:block" role="dialog" aria-modal="true" aria-label="Typing test">

                <!-- Same frosted paper as the chat overlay, so the two feel like
                     rooms in one building rather than two visual languages. -->
                <div class="absolute inset-0 bg-bg/95 backdrop-blur-2xl"></div>

                <button type="button" @click="close" aria-label="Close typing test"
                    class="absolute right-4 top-4 z-10 flex items-center gap-2 rounded-full border border-g300 bg-bg px-4 py-2.5 font-mono text-[10px] uppercase tracking-micro text-ink shadow-soft transition-all duration-200 hover:border-ink hover:bg-ink hover:text-bg sm:right-6 sm:top-6">
                    <span>close</span>
                </button>

                <div class="relative mx-auto flex h-full max-w-4xl flex-col items-center justify-center px-6 sm:px-10">

                    <!-- ── scoreboard ──────────────────────────────────────── -->
                    <div class="flex items-start gap-10 sm:gap-14">
                        <p v-for="stat in scoreboard" :key="stat.label" class="text-center">
                            <span class="font-pixel text-3xl leading-none text-ink sm:text-4xl">{{ stat.value }}</span>
                            <span v-if="stat.unit" class="ml-1 font-mono text-[10px] text-g400">{{ stat.unit }}</span>
                            <span class="mt-2 block font-mono text-[9px] uppercase tracking-micro text-g400">
                                {{ stat.label }}
                            </span>
                        </p>
                    </div>

                    <!-- ── the passage ─────────────────────────────────────── -->
                    <!-- Three lines, whole and unclipped: with the run this short
                         there's nothing to scroll, so the text can just sit
                         still and be read. -->
                    <div v-if="!finished" class="typing-window mt-10 w-full font-mono sm:mt-12">
                        <div>
                            <span v-for="(word, wi) in words" :key="wi" class="mr-[0.55em] inline-block">
                                <!-- The caret sits before the character you're
                                     about to type, not after the word: it marks
                                     where you are, so it has to move per key. -->
                                <template v-for="(char, ci) in word" :key="ci">
                                    <span v-if="wi === wordIndex && ci === typedLength" class="caret"
                                        aria-hidden="true"></span>
                                    <span :class="charClass(wi, ci)">{{ char }}</span>
                                </template>

                                <!-- Overtyped characters: shown so a wrong-length
                                     word looks wrong, rather than silently
                                     swallowing the extra keystrokes. -->
                                <span v-for="(char, ci) in extraFor(wi)" :key="`x${ci}`" class="text-rose">{{ char }}</span>

                                <!-- Word fully typed: the caret waits past the end
                                     of it, and past anything overtyped. -->
                                <span v-if="wi === wordIndex && typedLength >= word.length" class="caret"
                                    aria-hidden="true"></span>
                            </span>
                        </div>
                    </div>

                    <!-- ── result ──────────────────────────────────────────── -->
                    <div v-else class="mt-10 text-center sm:mt-12">
                        <p class="font-serif text-[1.0625rem] leading-relaxed text-g600">
                            <RollingNumber :value="correctChars" :duration="700" /> characters clean out of
                            {{ typedChars }}, in {{ elapsed }} seconds.
                        </p>

                        <!-- The house record. Obviously fake, and funnier for it,
                             which is why the number is stated plainly and the
                             verdict does the joking. -->
                        <!-- Both numbers roll, yours landing first: Jonhyl's is
                             then still climbing when yours has stopped, which is
                             the joke told in motion rather than in words. -->
                        <div class="mt-8 flex items-end justify-center gap-8 sm:gap-12">
                            <p class="text-center">
                                <RollingNumber :value="wpm" :duration="700"
                                    class="font-pixel text-2xl leading-none text-ink sm:text-3xl" />
                                <span class="ml-1 font-mono text-[10px] uppercase tracking-micro text-g400">wpm</span>
                                <span class="mt-2 block font-mono text-[9px] uppercase tracking-micro text-g400">you</span>
                            </p>
                            <span class="pb-6 font-mono text-[10px] uppercase tracking-micro text-g400">vs</span>
                            <p class="text-center">
                                <RollingNumber :value="JONHYL_WPM" :duration="1400" :delay="500"
                                    class="font-pixel text-2xl leading-none text-ink sm:text-3xl" />
                                <span class="ml-1 font-mono text-[10px] uppercase tracking-micro text-g400">wpm</span>
                                <span class="mt-2 block font-mono text-[9px] uppercase tracking-micro text-g400">
                                    jonhyl
                                </span>
                            </p>
                        </div>

                        <p class="mx-auto mt-6 max-w-sm font-serif text-[1.0625rem] leading-relaxed text-g600">
                            {{ verdict }}
                        </p>

                        <button type="button" @click="reset"
                            class="mt-8 rounded-full bg-g800 px-5 py-2.5 font-mono text-[10px] uppercase tracking-micro text-bg shadow-soft transition-colors duration-200 hover:bg-ink">
                            go again
                        </button>
                    </div>

                    <!-- ── keyboard ────────────────────────────────────────── -->
                    <!-- Shows the next key rather than the last one pressed: a
                         readout of what you just did is only decoration, where
                         the key ahead is something you can act on. -->
                    <div class="mt-12 flex flex-col items-center gap-1.5 sm:mt-14 sm:gap-2" aria-hidden="true">
                        <div v-for="(row, ri) in KEY_ROWS" :key="ri" class="flex gap-1.5 sm:gap-2">
                            <span v-for="key in row" :key="key" class="key font-mono"
                                :class="{ 'key--next': key === nextKey, 'key--down': key === pressed }">
                                {{ key }}
                            </span>
                        </div>
                        <span class="key key--space font-mono"
                            :class="{ 'key--next': nextKey === ' ', 'key--down': pressed === ' ' }">space</span>
                    </div>

                    <p class="mt-10 flex items-center gap-4 font-mono text-[10px] uppercase tracking-micro text-g400">
                        <span><span class="kbd">tab</span> restart</span>
                        <span><span class="kbd">esc</span> close</span>
                    </p>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { TYPING_WORDS } from '~/utils/typing-words'

/** Seconds per run. */
const DURATION = 30

/**
 * About three lines' worth. Short enough to see the whole run at once, which
 * also means the passage never scrolls and the finish line is visible from the
 * start. Reaching the end ends the run early.
 */
const WORD_COUNT = 36

const KEY_ROWS = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
]

const open = ref(false)
const words = ref<string[]>([])
/** What the visitor actually typed, one entry per word, index-aligned. */
const typed = ref<string[]>([])
const wordIndex = ref(0)
const remaining = ref(DURATION)
const finished = ref(false)
const pressed = ref('')

/** Every keystroke and every wrong keystroke, for accuracy. */
const strokes = ref(0)
const misses = ref(0)

let ticker: ReturnType<typeof setInterval> | null = null
let releaseKey: ReturnType<typeof setTimeout> | null = null

/**
 * Real elapsed time, measured rather than counted.
 *
 * Deriving it from the countdown meant it only advanced once a second, so a run
 * that ended between ticks reported a whole second less than it took, and one
 * that ended inside the first tick reported zero seconds and therefore zero
 * words per minute.
 */
let startedAt = 0
const elapsedMs = ref(0)

const randomWords = () =>
    Array.from({ length: WORD_COUNT }, () => TYPING_WORDS[Math.floor(Math.random() * TYPING_WORDS.length)])

/** Correct characters only: typing the wrong letter shouldn't earn speed. */
const correctChars = computed(() => {
    let n = 0
    typed.value.forEach((entry, wi) => {
        const target = words.value[wi] ?? ''
        for (let ci = 0; ci < entry.length; ci++) if (entry[ci] === target[ci]) n++
        // The space that committed the word counts as a keystroke too.
        if (wi < wordIndex.value) n++
    })
    return n
})

const typedChars = computed(() => strokes.value)

/** Whole seconds, for display. */
const elapsed = computed(() => Math.round(elapsedMs.value / 1000))

/** The standard definition: five characters is one "word", regardless of words. */
const wpm = computed(() => {
    // Under half a second there isn't enough signal to divide by, and the
    // result would be a meaningless four-figure number.
    if (elapsedMs.value < 500) return 0
    return Math.round((correctChars.value / 5) / (elapsedMs.value / 60000))
})

const accuracy = computed(() => {
    if (!strokes.value) return 100
    return Math.round(((strokes.value - misses.value) / strokes.value) * 100)
})

/**
 * Jonhyl's "record". A joke, and it has to be an absurd number to read as one:
 * a plausible 140 would look like a boast, where 9999 is obviously a gag.
 */
const JONHYL_WPM = 9999

const verdict = computed(() => {
    if (wpm.value >= JONHYL_WPM) return 'Record broken. Jonhyl is reviewing the footage.'
    if (wpm.value >= 100) return `${wpm.value} is genuinely fast. Jonhyl set his unsupervised and won't do it again on camera.`
    if (wpm.value >= 60) return `Respectable. Jonhyl leads by ${JONHYL_WPM - wpm.value} and won't discuss it further.`
    if (wpm.value > 0) return `Jonhyl wins by ${JONHYL_WPM - wpm.value}. In fairness, nobody has ever seen him do it.`
    return 'Nothing typed, nothing lost. Jonhyl claims the win anyway.'
})

const scoreboard = computed(() => [
    { label: 'wpm', value: wpm.value, unit: '' },
    { label: 'acc', value: accuracy.value, unit: '%' },
    // Counting down during the run, but reporting how long it took once it's
    // over: "18s left" on a finished run answers a question nobody has.
    { label: finished.value ? 'took' : 'time', value: finished.value ? elapsed.value : remaining.value, unit: 's' },
])

/** The character the visitor should hit next, which the keyboard highlights. */
const nextKey = computed(() => {
    const target = words.value[wordIndex.value] ?? ''
    const entry = typed.value[wordIndex.value] ?? ''
    return entry.length >= target.length ? ' ' : target[entry.length] ?? ''
})

/** How far into the current word the visitor is, which is where the caret goes. */
const typedLength = computed(() => (typed.value[wordIndex.value] ?? '').length)

const extraFor = (wi: number) => {
    const target = words.value[wi] ?? ''
    const entry = typed.value[wi] ?? ''
    return entry.length > target.length ? entry.slice(target.length) : ''
}

function charClass(wi: number, ci: number) {
    const entry = typed.value[wi] ?? ''
    if (wi > wordIndex.value || ci >= entry.length) return 'text-g300'
    return entry[ci] === words.value[wi]?.[ci] ? 'text-ink' : 'text-rose'
}

function reset() {
    words.value = randomWords()
    typed.value = Array(WORD_COUNT).fill('')
    wordIndex.value = 0
    remaining.value = DURATION
    finished.value = false
    strokes.value = 0
    misses.value = 0
    startedAt = 0
    elapsedMs.value = 0
    stopClock()
}

function startClock() {
    if (ticker) return
    startedAt = performance.now()
    // Faster than the display needs, so the countdown turns over close to the
    // real second boundary instead of drifting behind it.
    ticker = setInterval(() => {
        elapsedMs.value = performance.now() - startedAt
        remaining.value = Math.max(0, DURATION - Math.floor(elapsedMs.value / 1000))
        if (elapsedMs.value >= DURATION * 1000) finish()
    }, 100)
}

function stopClock() {
    if (ticker) clearInterval(ticker)
    ticker = null
}

function finish() {
    // Read the clock one last time before stopping it, so finishing early is
    // scored on the time actually taken rather than on the last whole second
    // the ticker happened to reach.
    if (startedAt) elapsedMs.value = Math.min(performance.now() - startedAt, DURATION * 1000)
    stopClock()
    remaining.value = Math.max(0, DURATION - Math.floor(elapsedMs.value / 1000))
    finished.value = true
}

function openTest() {
    reset()
    open.value = true
}

function close() {
    open.value = false
    stopClock()
}

function onKeydown(e: KeyboardEvent) {
    if (!open.value) return

    if (e.key === 'Escape') return close()

    if (e.key === 'Tab') {
        e.preventDefault()
        return reset()
    }

    if (finished.value) return

    // No passage means no target to compare against, and scoring a keystroke
    // against nothing counts it as a miss. Better to drop the key.
    if (!words.value.length) return

    if (e.key === 'Backspace') {
        e.preventDefault()

        // Corrections aren't scored as misses: the miss was already counted
        // when the wrong key landed, and charging for the fix would punish the
        // visitor twice for one mistake. Un-committing a word also withdraws
        // the space that committed it, since correctChars derives from
        // wordIndex, so a repaired word scores as though typed right first go.
        const entry = typed.value[wordIndex.value] ?? ''

        // Ctrl/Alt+Backspace clears the whole word, as it does in a text field.
        if (e.ctrlKey || e.altKey) {
            if (entry) typed.value[wordIndex.value] = ''
            else if (wordIndex.value > 0) wordIndex.value--

            return
        }

        if (entry) {
            typed.value[wordIndex.value] = entry.slice(0, -1)
        } else if (wordIndex.value > 0) {
            // Nothing left to delete in this word, so step back into the last
            // one. Without this a typo is sealed the moment you hit space,
            // which is the one correction people reach for most.
            wordIndex.value--

        }
        return
    }

    // Anything with a modifier, or any named key, belongs to the browser.
    if (e.ctrlKey || e.metaKey || e.altKey || e.key.length !== 1) return

    e.preventDefault()
    flashKey(e.key === ' ' ? ' ' : e.key.toLowerCase())
    startClock()

    if (e.key === ' ') {
        // An empty word means a stray space; committing it would leave a blank
        // entry that can never be corrected.
        if (!typed.value[wordIndex.value]) return
        strokes.value++
        if (typed.value[wordIndex.value] !== words.value[wordIndex.value]) misses.value++
        wordIndex.value++

        // Committing the last word ends the run: there is nothing left to type,
        // and sitting on a finished passage waiting out the clock only drags
        // the score down for having got there early.
        if (wordIndex.value >= words.value.length) finish()
        return
    }

    const target = words.value[wordIndex.value] ?? ''
    const entry = typed.value[wordIndex.value] ?? ''
    strokes.value++
    if (e.key !== target[entry.length]) misses.value++
    typed.value[wordIndex.value] = entry + e.key

    // The final word needs no trailing space to count as done.
    if (wordIndex.value === words.value.length - 1 && typed.value[wordIndex.value] === target) finish()
}

function flashKey(key: string) {
    pressed.value = key
    if (releaseKey) clearTimeout(releaseKey)
    releaseKey = setTimeout(() => (pressed.value = ''), 110)
}

// Lock the page while the overlay is up, same as the chat.
watch(open, (isOpen) => {
    if (typeof document === 'undefined') return
    document.documentElement.style.overflow = isOpen ? 'hidden' : ''
})

// Bound on mount, not at setup: a listener registered during setup outlives a
// hot reload, so an edit mid-session leaves an orphaned handler from the old
// module writing into state nothing renders, and every keystroke gets counted
// twice against two different word lists.
onMounted(() => window.addEventListener('keydown', onKeydown))

onUnmounted(() => {
    stopClock()
    if (releaseKey) clearTimeout(releaseKey)
    window.removeEventListener('keydown', onKeydown)
    if (typeof document !== 'undefined') document.documentElement.style.overflow = ''
})
</script>

<style scoped>
.veil-enter-active,
.veil-leave-active {
    transition: opacity 300ms ease;
}

.veil-enter-from,
.veil-leave-to {
    opacity: 0;
}

/* ── the launcher label types itself ─────────────────────────────────────
   Reveal by width, so the caret riding the right edge lands exactly where the
   next character would go. The width is exact rather than fudged: 11 glyphs of
   a monospace face, each carrying tracking-micro's 0.12em, plus 1px of air so
   the caret never touches the final T. Keep the two in step if the label text
   ever changes. */
.type-label {
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    border-right: 1px solid rgb(var(--ink));
    padding-right: 1px;
    width: calc(11ch + 11 * 0.12em);
    animation:
        type-in 5.5s steps(11, jump-none) infinite,
        type-caret 1s step-end infinite;
}

/* Types, holds long enough to read, clears, repeats. The hold is most of the
   cycle: an endlessly retyping button is a distraction, a mostly-still one
   with an occasional flicker of life is an invitation. */
@keyframes type-in {
    0%        { width: 0; }
    20%, 88%  { width: calc(11ch + 11 * 0.12em); }
    96%, 100% { width: 0; }
}

@keyframes type-caret {
    0%, 100% { border-right-color: rgb(var(--ink)); }
    50%      { border-right-color: transparent; }
}

/* ── the passage ──────────────────────────────────────────────────────── */
.typing-window {
    /* Three lines' worth of room, but free to grow: on a narrow screen the same
       words wrap to four or five, and a fixed height would cut them off. */
    min-height: calc(3 * 2.6rem);
    font-size: 1.375rem;
    line-height: 2.6rem;
}

/* Wrong characters. Red is the one place this design breaks monochrome, and it
   earns it: a mistake you can't see is a mistake you can't fix. */
.text-rose {
    color: rgb(220 38 38);
}

:global(.dark) .text-rose {
    color: rgb(248 113 113);
}

/* ── caret ───────────────────────────────────────────────────────────── */
.caret {
    display: inline-block;
    width: 2px;
    height: 1.5rem;
    margin-left: -1px;
    vertical-align: -0.25rem;
    background: rgb(var(--ink));
    animation: caret-blink 1s steps(2, jump-none) infinite;
}

@keyframes caret-blink {
    to { opacity: 0; }
}

/* ── keyboard ────────────────────────────────────────────────────────── */
.key {
    display: flex;
    height: 2.25rem;
    width: 2.25rem;
    align-items: center;
    justify-content: center;
    border: 1px solid rgb(var(--g200));
    border-radius: 0.5rem;
    background: rgb(var(--g50));
    font-size: 11px;
    color: rgb(var(--g500));
    transition: border-color 150ms ease, color 150ms ease, transform 90ms ease, background-color 150ms ease;
}

.key--space {
    width: 14rem;
    max-width: 60vw;
    font-size: 9px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
}

/* The key ahead: outlined, not filled. A filled key would out-shout the
   passage, which is where the visitor's eyes actually need to be. */
.key--next {
    border-color: rgb(var(--ink));
    color: rgb(var(--ink));
}

.key--down {
    background: rgb(var(--ink));
    border-color: rgb(var(--ink));
    color: rgb(var(--bg));
    transform: translateY(1px);
}

.kbd {
    border: 1px solid rgb(var(--g300));
    border-radius: 0.25rem;
    padding: 0.15rem 0.35rem;
    margin-right: 0.35rem;
    color: rgb(var(--g500));
}

@media (prefers-reduced-motion: reduce) {
    .caret {
        animation: none;
    }

    /* Label fully typed and the caret held steady: the button still reads as a
       terminal prompt without anything moving. */
    .type-label {
        animation: none;
        width: auto;
    }
}
</style>
