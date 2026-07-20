<template>
    <Teleport to="body">
        <Transition name="modal">
            <div v-if="open" class="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
                role="dialog" aria-modal="true" aria-label="Resume preview">
                <!-- backdrop -->
                <div class="absolute inset-0 bg-ink/30 backdrop-blur-md" @click="$emit('close')"></div>

                <!-- panel -->
                <div
                    class="modal-panel relative flex h-[86vh] w-full max-w-3xl flex-col overflow-hidden rounded-card border border-g200 bg-bg shadow-modal">
                    <!-- header -->
                    <div class="relative flex items-center justify-between gap-3 border-b border-g200 px-4 py-3 sm:px-5">
                        <!-- halftone accent, faded into the corner -->
                        <div class="halftone pointer-events-none absolute inset-y-0 right-0 w-40 opacity-60"></div>

                        <div class="relative flex items-center gap-2.5">
                            <span class="pulse-dot mt-0.5 h-1.5 w-1.5 rounded-full bg-ink"></span>
                            <div class="flex flex-col leading-none">
                                <span class="font-mono text-[9px] uppercase tracking-micro text-g400">resume — preview</span>
                                <span class="mt-1 font-mono text-[11px] text-ink">Jonhyl Balsamo</span>
                            </div>
                            <span v-if="pageCount"
                                class="ml-1 hidden rounded-full border border-g300 px-2 py-0.5 font-mono text-[9px] uppercase tracking-micro text-g500 sm:inline-block">
                                {{ pageCount }} {{ pageCount === 1 ? 'page' : 'pages' }}
                            </span>
                        </div>

                        <div class="relative flex items-center gap-2">
                            <a :href="pdf" target="_blank" rel="noopener noreferrer"
                                class="group hidden items-center gap-1.5 rounded-full border border-g200 px-3 py-1.5 font-mono text-[10px] uppercase tracking-micro text-g500 transition-colors hover:border-g300 hover:text-ink sm:inline-flex">
                                open <span class="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
                            </a>
                            <a :href="pdf" download="Jonhyl-Balsamo-Resume.pdf"
                                class="group inline-flex items-center gap-1.5 rounded-full bg-ink px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-micro text-bg transition-opacity hover:opacity-80">
                                download <span class="transition-transform group-hover:translate-y-0.5">↓</span>
                            </a>
                            <button type="button" aria-label="Close preview" @click="$emit('close')"
                                class="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-bg transition-opacity hover:opacity-80">✕</button>
                        </div>
                    </div>

                    <!-- pdf pages, rendered to canvas in our own scroll container -->
                    <div class="pdf-scroll relative flex-1 overflow-y-auto bg-g100 px-4 py-5 sm:px-6 sm:py-7">
                        <!-- loading: page-shaped skeleton -->
                        <div v-if="loading" class="mx-auto max-w-2xl">
                            <div class="skeleton-page mx-auto w-full rounded-md2 border border-g200 bg-g50"
                                style="aspect-ratio: 1 / 1.294;"></div>
                            <p class="status-pulse mt-4 text-center font-mono text-[10px] uppercase tracking-micro text-g400">
                                rendering preview…
                            </p>
                        </div>

                        <!-- error fallback -->
                        <div v-else-if="error" class="flex h-full flex-col items-center justify-center gap-4">
                            <span class="font-mono text-[10px] uppercase tracking-micro text-g400">preview unavailable</span>
                            <a :href="pdf" target="_blank" rel="noopener noreferrer"
                                class="group inline-flex items-center gap-1.5 rounded-full border border-g200 px-3 py-1.5 font-mono text-[10px] uppercase tracking-micro text-g500 transition-colors hover:border-g300 hover:text-ink">
                                open the pdf instead <span class="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
                            </a>
                        </div>

                        <!-- rendered pages get appended here -->
                        <div ref="pagesRef" class="mx-auto max-w-2xl space-y-6"></div>
                    </div>

                    <!-- footer -->
                    <div class="flex items-center justify-between gap-3 border-t border-g200 px-4 py-2.5 sm:px-5">
                        <span class="font-mono text-[9px] uppercase tracking-micro text-g400">jonhyl-balsamo-resume.pdf</span>
                        <span class="hidden items-center gap-1.5 font-mono text-[9px] uppercase tracking-micro text-g400 sm:flex">
                            <kbd class="rounded border border-g200 bg-g50 px-1.5 py-0.5 text-ink">esc</kbd> to close
                        </span>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onUnmounted } from 'vue'

const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ close: [] }>()

const pdf = '/jonhyl-balsamo-resume.pdf'

const pagesRef = ref<HTMLDivElement | null>(null)
const loading = ref(false)
const error = ref(false)
const rendered = ref(false)
const pageCount = ref(0)

const renderPdf = async () => {
    if (rendered.value || loading.value || !pagesRef.value) return
    loading.value = true
    error.value = false
    try {
        const pdfjs = await import('pdfjs-dist')
        // @ts-ignore — Vite resolves the worker file to a URL string
        const worker = await import('pdfjs-dist/build/pdf.worker.min.mjs?url')
        pdfjs.GlobalWorkerOptions.workerSrc = worker.default

        const doc = await pdfjs.getDocument({ url: pdf }).promise
        pageCount.value = doc.numPages

        // rendered pages accumulate off-DOM, then swap in at once so the
        // skeleton stays until the whole document is ready (no half-drawn flash)
        const frag = document.createDocumentFragment()
        const width = pagesRef.value.clientWidth
        // Match the screen's TRUE device-pixel ratio and map device pixels 1:1
        // (backing store = CSS size × dpr, CSS size pinned explicitly). This is
        // exactly how a native PDF viewer draws: pdf.js rasterises glyphs onto
        // the real pixel grid and the browser does zero rescaling — so text is
        // crisp AND keeps its stroke weight. Forcing a higher scale (e.g. 2×)
        // would make the browser downscale the canvas, and that resampling is
        // what thinned out the serif strokes. Cap at 3 to bound canvas memory.
        const outputScale = Math.min(window.devicePixelRatio || 1, 3)

        for (let i = 1; i <= doc.numPages; i++) {
            const page = await doc.getPage(i)
            const base = page.getViewport({ scale: 1 })
            const cssW = width
            const cssH = base.height * (width / base.width)
            const viewport = page.getViewport({ scale: (width / base.width) * outputScale })

            const figure = document.createElement('figure')
            figure.className = 'group relative'

            if (doc.numPages > 1) {
                const label = document.createElement('figcaption')
                label.className =
                    'mb-2 font-mono text-[9px] uppercase tracking-[0.12em] text-g400'
                label.textContent = `page ${String(i).padStart(2, '0')} / ${String(doc.numPages).padStart(2, '0')}`
                figure.appendChild(label)
            }

            const canvas = document.createElement('canvas')
            canvas.width = Math.floor(viewport.width)
            canvas.height = Math.floor(viewport.height)
            // Pin the display size so the big backing store is shown 1:1 per
            // device pixel — no browser downscaling, no thinned strokes.
            canvas.style.width = `${Math.floor(cssW)}px`
            canvas.style.height = `${Math.floor(cssH)}px`
            canvas.className =
                'block max-w-full rounded-md2 border border-g200 bg-white shadow-soft transition-shadow duration-300 group-hover:shadow-soft-lg'
            figure.appendChild(canvas)
            frag.appendChild(figure)

            await page.render({ canvasContext: canvas.getContext('2d')!, viewport }).promise
        }

        pagesRef.value.replaceChildren(frag)
        rendered.value = true
    } catch (err) {
        console.error('[resume-modal] PDF preview failed:', err)
        error.value = true
    } finally {
        loading.value = false
    }
}

const onKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') emit('close')
}

watch(() => props.open, async (isOpen) => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    if (isOpen) {
        window.addEventListener('keydown', onKeydown)
        await nextTick()
        renderPdf()
    } else {
        window.removeEventListener('keydown', onKeydown)
        // The modal lives behind v-if, so closing destroys the rendered
        // canvases. Reset so the next open re-renders into the fresh DOM
        // instead of early-returning on a stale `rendered` flag.
        rendered.value = false
    }
})

onUnmounted(() => {
    document.body.style.overflow = ''
    window.removeEventListener('keydown', onKeydown)
})
</script>

<style scoped>
/* Custom scrollbar for the preview pane: slim inset pill that
   widens slightly and darkens on hover. Firefox gets the thin
   native equivalent via scrollbar-width/color. */
.pdf-scroll {
    scrollbar-width: thin;
    scrollbar-color: rgb(var(--g300)) transparent;
}

.pdf-scroll::-webkit-scrollbar {
    width: 12px;
}

.pdf-scroll::-webkit-scrollbar-track {
    background: transparent;
}

.pdf-scroll::-webkit-scrollbar-thumb {
    background: rgb(var(--g300));
    border: 4px solid transparent;
    background-clip: padding-box;
    border-radius: 999px;
}

.pdf-scroll::-webkit-scrollbar-thumb:hover {
    background: rgb(var(--g400));
    border-width: 3px;
    background-clip: padding-box;
}

/* loading skeleton — a soft shimmer sweeping across a page-shaped block */
.skeleton-page {
    position: relative;
    overflow: hidden;
}

.skeleton-page::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(100deg,
            transparent 30%,
            rgb(var(--g200) / 0.55) 50%,
            transparent 70%);
    transform: translateX(-100%);
    animation: shimmer 1.4s ease-in-out infinite;
}

@keyframes shimmer {
    to {
        transform: translateX(100%);
    }
}

.status-pulse {
    animation: pulse-opacity 1.8s ease-in-out infinite;
}

@keyframes pulse-opacity {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.25;
    }
}

.modal-enter-active,
.modal-leave-active {
    transition: opacity 200ms ease;
}

.modal-enter-active .modal-panel,
.modal-leave-active .modal-panel {
    transition: transform 200ms cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-enter-from .modal-panel,
.modal-leave-to .modal-panel {
    transform: scale(0.95);
}

@media (prefers-reduced-motion: reduce) {

    .modal-enter-active,
    .modal-leave-active,
    .modal-enter-active .modal-panel,
    .modal-leave-active .modal-panel,
    .status-pulse,
    .skeleton-page::after {
        transition: none;
        animation: none;
    }
}
</style>
