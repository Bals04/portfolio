<template>
    <Teleport to="body">
        <Transition name="modal">
            <div v-if="open" class="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6" role="dialog"
                aria-modal="true" aria-label="Contact details">
                <!-- backdrop -->
                <div class="absolute inset-0 bg-ink/30 backdrop-blur-md" @click="$emit('close')"></div>

                <!-- panel -->
                <div
                    class="modal-panel relative w-full max-w-md overflow-hidden rounded-card border border-g200 bg-bg shadow-modal">
                    <!-- header -->
                    <div class="relative flex items-center justify-between gap-3 border-b border-g200 px-5 py-3">
                        <div class="halftone pointer-events-none absolute inset-y-0 right-0 w-40 opacity-60"></div>

                        <div class="relative flex items-center gap-2.5">
                            <span class="pulse-dot h-1.5 w-1.5 rounded-full bg-ink"></span>
                            <div class="flex flex-col leading-none">
                                <span class="font-mono text-[9px] uppercase tracking-micro text-g400">get in
                                    touch</span>
                                <span class="mt-1 font-mono text-[11px] text-ink">Jonhyl Balsamo</span>
                            </div>
                        </div>

                        <button type="button" aria-label="Close" @click="$emit('close')"
                            class="relative flex h-7 w-7 items-center justify-center rounded-full bg-ink text-bg transition-opacity hover:opacity-80">✕</button>
                    </div>

                    <!-- body -->
                    <div class="px-5 py-5">
                        <p class="max-w-sm font-montserrat text-sm leading-[1.7] text-g500">
                            Happy to talk about a role, a project, or a build. Reach me at either of these —
                            I usually reply within a day.
                        </p>

                        <ul class="mt-6 space-y-3">
                            <!-- email -->
                            <li
                                class="group flex items-center justify-between gap-3 rounded-input border border-g200 px-4 py-3 transition-colors hover:border-g300">
                                <div class="min-w-0">
                                    <span
                                        class="block font-mono text-[9px] uppercase tracking-micro text-g400">email</span>
                                    <a :href="`mailto:${email}`"
                                        class="link-underline mt-1 block truncate font-mono text-[13px] text-ink">
                                        {{ email }}
                                    </a>
                                </div>
                                <button type="button" @click="copyEmail"
                                    class="shrink-0 rounded-full border border-g200 px-3 py-1.5 font-mono text-[10px] uppercase tracking-micro text-g500 transition-colors hover:border-g300 hover:text-ink">
                                    {{ copied ? 'copied' : 'copy' }}
                                </button>
                            </li>

                            <!-- linkedin -->
                            <li
                                class="group flex items-center justify-between gap-3 rounded-input border border-g200 px-4 py-3 transition-colors hover:border-g300">
                                <div class="min-w-0">
                                    <span
                                        class="block font-mono text-[9px] uppercase tracking-micro text-g400">linkedin</span>
                                    <span class="mt-1 block truncate font-mono text-[13px] text-ink">
                                        in/jonhyl-balsamo
                                    </span>
                                </div>
                                <a :href="linkedin" target="_blank" rel="noopener noreferrer"
                                    class="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-ink px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-micro text-bg transition-opacity hover:opacity-80">
                                    open <span class="transition-transform">↗</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <!-- footer -->
                    <div class="flex items-center justify-between gap-3 border-t border-g200 px-5 py-2.5">
                        <span class="font-mono text-[9px] uppercase tracking-micro text-g400">open to work</span>
                        <span
                            class="hidden items-center gap-1.5 font-mono text-[9px] uppercase tracking-micro text-g400 sm:flex">
                            <kbd class="rounded border border-g200 bg-g50 px-1.5 py-0.5 text-ink">esc</kbd> to close
                        </span>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue'

const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ close: [] }>()

const email = 'balsthedeveloper@gmail.com'
const linkedin = 'https://www.linkedin.com/in/jonhyl-balsamo-b41a93386'

const copied = ref(false)
let copyTimer: ReturnType<typeof setTimeout> | undefined

const copyEmail = async () => {
    try {
        await navigator.clipboard.writeText(email)
        copied.value = true
        clearTimeout(copyTimer)
        copyTimer = setTimeout(() => { copied.value = false }, 1600)
    } catch {
        // clipboard blocked (insecure context / permission) — the mailto link
        // beside this button still works, so fail quietly
    }
}

const onKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') emit('close')
}

watch(() => props.open, (isOpen) => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    if (isOpen) {
        window.addEventListener('keydown', onKeydown)
    } else {
        window.removeEventListener('keydown', onKeydown)
        copied.value = false
    }
})

onUnmounted(() => {
    document.body.style.overflow = ''
    window.removeEventListener('keydown', onKeydown)
    clearTimeout(copyTimer)
})
</script>

<style scoped>
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
    .modal-leave-active .modal-panel {
        transition: none;
    }
}
</style>
