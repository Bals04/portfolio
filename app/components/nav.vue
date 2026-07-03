<template>
    <!-- Floating bottom tab bar (phone-style dock) -->
    <nav class="fixed bottom-3 left-1/2 z-50 w-max max-w-[calc(100vw-1rem)] -translate-x-1/2 sm:bottom-4">
        <div
            class="flex items-center gap-0.5 rounded-full border border-g200 bg-bg/85 px-1.5 py-1.5 shadow-soft-lg backdrop-blur-md sm:px-2 sm:py-2">

            <!-- section links -->
            <a v-for="item in links" :key="item.id" :href="`#${item.id}`" :aria-label="item.label"
                :aria-current="active === item.id ? 'true' : undefined"
                class="flex flex-col items-center gap-1 rounded-full px-2.5 py-1.5 transition-colors sm:px-4"
                :class="active === item.id ? 'text-ink' : 'text-g400 hover:text-ink'">
                <span class="[&_svg]:h-5 [&_svg]:w-5" v-html="item.icon"></span>
                <span class="hidden font-mono text-[9px] uppercase tracking-micro sm:block">{{ item.label }}</span>
            </a>

            <!-- divider -->
            <span class="mx-0.5 h-7 w-px bg-g200 sm:mx-1 sm:h-8"></span>

            <!-- theme control -->
            <div class="flex items-center gap-0.5">
                <button v-for="m in modes" :key="m.id" type="button" @click="set(m.id)" :aria-label="`${m.id} theme`"
                    :aria-pressed="theme === m.id"
                    class="flex h-7 w-7 items-center justify-center rounded-full transition-colors sm:h-8 sm:w-8"
                    :class="theme === m.id ? 'bg-ink text-bg' : 'text-g400 hover:text-ink'" v-html="m.icon"></button>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const { theme, init, set } = useTheme()
const active = ref('work')

// theme icons
const sun = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>'
const moon = '<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>'
const monitor = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>'

const modes = [
    { id: 'light', icon: sun },
    { id: 'dark', icon: moon },
    { id: 'system', icon: monitor },
] as const

// section icons
const folder = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>'
const spark = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/></svg>'
const briefcase = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>'
const layers = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 12l9 5 9-5"/></svg>'

const links = [
    { id: 'work', label: 'Projects', icon: folder },
    { id: 'personal', label: 'Quests', icon: spark },
    { id: 'experience', label: 'Career', icon: briefcase },
    { id: 'stack', label: 'Tools', icon: layers },
]

let observer: IntersectionObserver | null = null

onMounted(() => {
    init()
    // scroll-spy: highlight the section currently in view
    observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) active.value = e.target.id
            })
        },
        { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    )
    links.forEach((l) => {
        const el = document.getElementById(l.id)
        if (el) observer!.observe(el)
    })
})

onUnmounted(() => observer?.disconnect())
</script>
