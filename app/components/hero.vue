<template>
    <section class="relative overflow-hidden px-4 md:px-6 pt-10 lg:pt-24 pb-16 md:pb-20">
        <div class="relative mx-auto max-w-4xl min-h-[78vh] md:min-h-[88vh] flex flex-col justify-center">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

                <!-- Left: identity -->
                <div class="lg:col-span-7">
                    <h1 class="reveal font-pixel leading-[0.95] text-ink text-5xl md:text-7xl"
                        :class="{ in: shown }" style="animation-delay: 50ms">
                        Jonhyl<br />Balsamo
                    </h1>

                    <p class="reveal mt-5 font-montserrat text-lg md:text-xl font-normal tracking-wide text-ink"
                        :class="{ in: shown }" style="animation-delay: 120ms">
                        Full-Stack Web Developer
                    </p>

                    <p class="reveal mt-8 max-w-md font-montserrat text-base leading-[1.7] text-g500"
                        :class="{ in: shown }" style="animation-delay: 190ms">
                        A full-stack developer building production SaaS platforms, from responsive
                        front-end interfaces to the APIs and databases behind them.
                    </p>

                    <div class="reveal mt-10 flex flex-wrap items-center gap-6" :class="{ in: shown }"
                        style="animation-delay: 260ms">
                        <!-- inverted chip — the one loud element -->
                        <a href="https://facebook.com/jj.balsamo"
                            class="inline-flex items-center gap-2 rounded-input bg-ink px-4 py-2.5 font-mono text-xs text-bg transition-opacity hover:opacity-80">
                            schedule call
                            <span class="transition-transform group-hover:translate-x-0.5">↗</span>
                        </a>

                        <div class="flex items-center gap-4">
                            <span class="font-mono text-[10px] uppercase tracking-micro text-g400">socials</span>
                            <a v-for="s in socials" :key="s.name" :href="s.url" :aria-label="s.name" target="_blank"
                                rel="noopener noreferrer" class="text-g500 transition-colors hover:text-ink">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path :d="s.path" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                <!-- Right: portrait dissolving into halftone -->
                <div class="reveal lg:col-span-5 relative flex justify-center lg:justify-end"
                    :class="{ in: shown }" style="animation-delay: 200ms">
                    <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div class="h-[360px] w-[360px] lg:h-[440px] lg:w-[440px] grid-radial"></div>
                    </div>
                    <img src="/hero-1-removebg-preview.png" alt="Jonhyl Balsamo"
                        class="relative z-10 h-auto w-full max-w-[420px] object-contain" />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const shown = ref(false)

const socials = [
    {
        name: 'GitHub', url: 'https://github.com/bals04',
        path: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z'
    },
    {
        name: 'Facebook', url: 'https://facebook.com/jj.balsamo',
        path: 'M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z'
    },
    {
        name: 'LinkedIn', url: 'https://www.linkedin.com/in/jonhyl-balsamo-b41a93386',
        path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.049c.476-.9 1.637-1.852 3.37-1.852 3.602 0 4.268 2.37 4.268 5.455v6.288zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.778 13.019H3.555V9h3.56v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'
    }
]

onMounted(() => {
    requestAnimationFrame(() => { shown.value = true })
})
</script>
