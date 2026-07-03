<template>
    <section id="personal" ref="sectionRef" class="relative overflow-hidden px-4 md:px-6 py-14 md:py-20 border-t border-g200">
        <div class="mx-auto max-w-4xl">

            <!-- header -->
            <div class="reveal grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-8 mb-12"
                :class="{ in: visible }">
                <div>
                    <p class="font-mono text-[10px] uppercase tracking-micro text-g400 mb-3">03 — personal</p>
                    <h2 class="font-pixel text-4xl md:text-5xl text-ink">Side Quests</h2>
                    <p class="mt-6 max-w-lg font-serif text-[1.0625rem] leading-[1.75] text-g500">
                        Meet <span class="font-mono text-xs uppercase tracking-micro text-ink">BAW</span>, the
                        no-nonsense bull who keeps me lifting, and
                        <span class="font-mono text-xs uppercase tracking-micro text-ink">VEEH</span>, the buzzing bee
                        watching over my wallet — the two mascots leading my little universe of passion projects.
                    </p>
                </div>
                <div class="flex justify-center md:justify-end">
                    <img src="/personal-projects/mascot-collab.png" alt="DevBiz mascot collaboration"
                        class="w-full max-w-[16rem]" style="image-rendering: pixelated;" />
                </div>
            </div>

            <!-- deck counter -->
            <div class="reveal mb-4 flex items-center justify-between" :class="{ in: visible }"
                style="animation-delay: 80ms">
                <span class="font-mono text-[10px] uppercase tracking-micro text-g400">click a card</span>
                <span class="font-mono text-[10px] uppercase tracking-micro text-g400">
                    {{ String(active + 1).padStart(2, '0') }} / {{ String(projects.length).padStart(2, '0') }}
                </span>
            </div>

            <!-- fanned deck -->
            <div class="reveal relative mx-auto h-[420px] select-none overflow-hidden sm:h-[460px]"
                :class="{ in: visible }" style="animation-delay: 120ms">
                <div v-for="(project, index) in projects" :key="project.id"
                    class="absolute left-1/2 top-1/2 w-[270px] sm:w-[320px] md:w-[360px] -translate-x-1/2 -translate-y-1/2 cursor-pointer overflow-hidden rounded-card border border-g200 bg-bg shadow-soft transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                    :style="cardStyle(index)" @click="onCardClick(index)"
                    :aria-hidden="index !== active" :tabindex="index === active ? 0 : -1">

                    <div class="relative overflow-hidden border-b border-g200 bg-g50" style="aspect-ratio: 16/9;">
                        <img :src="project.image" :alt="project.title" class="h-full w-full object-cover" />
                    </div>

                    <div class="p-5">
                        <span
                            class="inline-flex items-center gap-1 rounded-full bg-ink px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-micro text-bg">
                            <span>‹</span>{{ project.category }}<span>›</span>
                        </span>
                        <h3 class="mt-3 text-lg font-semibold tracking-tight text-ink">{{ project.title }}</h3>
                        <p class="mt-2 text-[13px] leading-relaxed text-g500">{{ project.description }}</p>
                    </div>
                </div>
            </div>

            <!-- controls -->
            <div class="reveal mt-2 flex items-center justify-center gap-6" :class="{ in: visible }"
                style="animation-delay: 200ms">
                <button type="button" aria-label="Previous" @click="prev"
                    class="flex h-9 w-9 items-center justify-center rounded-full border border-g200 text-g500 transition-colors hover:border-g300 hover:text-ink">←</button>
                <div class="flex items-center gap-2">
                    <button v-for="(p, i) in projects" :key="p.id" type="button" :aria-label="`Go to ${p.title}`"
                        @click="activate(i)" class="h-1.5 rounded-full transition-all duration-300"
                        :class="i === active ? 'w-5 bg-ink' : 'w-1.5 bg-g300 hover:bg-g400'"></button>
                </div>
                <button type="button" aria-label="Next" @click="next"
                    class="flex h-9 w-9 items-center justify-center rounded-full border border-g200 text-g500 transition-colors hover:border-g300 hover:text-ink">→</button>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const sectionRef = ref(null);
const visible = ref(false);
const active = ref(0);
// the card most recently sent forward — kept on top for the whole glide
const lifting = ref(0);

const projects = [
    {
        id: 1,
        title: 'Gym Progress Tracker',
        category: 'Fitness · Personal App',
        description: 'A calendar-style training log to plan, edit and review weekly sessions. Tracks volume, active days and exercise breakdowns at a glance.',
        image: '/personal-projects/Screenshot%202026-05-16%20151733.png'
    },
    {
        id: 2,
        title: 'BuzzBudget',
        category: 'Finance · Personal App',
        description: 'A friendly personal finance tracker with a built-in mascot guide. Manage budgets, log spending and move money to savings, all in one calm dashboard.',
        image: '/personal-projects/Screenshot%202026-05-16%20151836.png'
    }
];

// Fan each card out relative to the active one.
const cardStyle = (index) => {
    const n = projects.length;
    let pos = index - active.value;
    if (pos > n / 2) pos -= n;
    if (pos < -n / 2) pos += n;
    const abs = Math.abs(pos);

    // the just-clicked card rides on top for the entire transition, so you
    // watch it travel over the deck instead of snapping in front.
    const onTop = index === lifting.value ? 60 : 0;

    if (pos === 0) {
        return `transform: translate(-50%,-50%) scale(1.04); opacity:1; z-index:${Math.max(50, onTop)};`;
    }
    if (abs > 3) {
        return 'transform: translate(-50%,-50%) scale(0.8); opacity:0; z-index:0; pointer-events:none;';
    }
    const x = pos * 52;
    const y = abs * 18;
    const rot = pos * 6;
    const scale = 1 - abs * 0.07;
    const opacity = abs <= 2 ? 0.6 : 0.3;
    return `transform: translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${rot}deg) scale(${scale}); opacity:${opacity}; z-index:${onTop || (40 - abs)};`;
};

const activate = (i) => { lifting.value = i; active.value = i; };
const onCardClick = (i) => { i === active.value ? next() : activate(i); };
const next = () => { const i = (active.value + 1) % projects.length; activate(i); };
const prev = () => { const i = (active.value - 1 + projects.length) % projects.length; activate(i); };

const handleScroll = () => {
    if (!sectionRef.value) return;
    if (sectionRef.value.getBoundingClientRect().top < window.innerHeight * 0.85) visible.value = true;
};

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();
});
onUnmounted(() => window.removeEventListener('scroll', handleScroll));
</script>
