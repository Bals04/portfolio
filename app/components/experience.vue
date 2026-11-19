<template>
    <section id="experience" ref="sectionRef" class="px-4 md:px-6 py-14 md:py-20 border-t border-g200 overflow-x-clip">
        <div class="mx-auto max-w-4xl">

            <div class="reveal mb-12" :class="{ in: visible }">
                <p class="font-mono text-[10px] uppercase tracking-micro text-g400 mb-3">04 — experience</p>
                <h2 class="font-pixel text-4xl md:text-5xl text-ink">Career</h2>
            </div>

            <div class="relative md:pl-8">
                <!-- hairline rail -->
                <div class="hidden md:block absolute left-0 top-1 bottom-1 w-px bg-g200"></div>

                <div class="space-y-4 md:space-y-6">
                    <div v-for="(exp, index) in experiences" :key="exp.id" class="reveal relative"
                        :class="{ in: visible }"
                        :style="`animation-delay: ${100 + index * 70}ms; padding-top: ${(cards(exp).length - 1) * PEEK}px`">
                        <!-- node on the rail -->
                        <span class="hidden md:block absolute -left-8 h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 border-bg bg-ink"
                            :style="`top: ${28 + (cards(exp).length - 1) * PEEK}px`"></span>

                        <!-- deck: every card sits in the same grid cell, so the stack is as tall as the tallest card -->
                        <div class="grid">
                            <article v-for="(card, cIndex) in cards(exp)" :key="card.key"
                                class="deck-card relative col-start-1 row-start-1 rounded-card border border-g200 bg-g50 p-5 md:p-6 shadow-soft"
                                :class="{
                                    'is-back cursor-pointer !bg-g100 !border-g300': depth(exp, cIndex) > 0,
                                    'to-back': leaving[exp.id] === cIndex,
                                }"
                                :style="deckStyle(depth(exp, cIndex))"
                                :aria-hidden="depth(exp, cIndex) > 0"
                                @click="depth(exp, cIndex) > 0 && bringToFront(exp, cIndex)"
                                @animationend="leaving[exp.id] = undefined">

                                <!-- label on the sliver that peeks out behind the front card -->
                                <div v-if="depth(exp, cIndex) > 0"
                                    class="absolute inset-x-0 top-0 flex items-center justify-between gap-3 px-5 md:px-6"
                                    :style="`height: ${PEEK}px`">
                                    <span class="flex items-center gap-2 min-w-0">
                                        <span class="flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-sm2 border border-g200 bg-white">
                                            <img :src="card.logo" alt="" class="h-full w-full object-contain"
                                                :class="card.logoClass ?? 'p-0.5'" />
                                        </span>
                                        <span class="truncate text-[13px] font-semibold tracking-tight text-ink">{{ card.name }}</span>
                                    </span>
                                    <span class="deck-cta shrink-0 inline-flex items-center gap-1 rounded-full border border-g300 bg-g50 px-2.5 py-1 font-mono text-[9px] uppercase tracking-micro text-g500">
                                        View <span aria-hidden="true">↑</span>
                                    </span>
                                </div>

                                <div class="deck-body" :class="{ 'opacity-0': depth(exp, cIndex) > 0 }">
                                    <span
                                        class="inline-block rounded-full bg-ink px-3 py-1 font-mono text-[9px] uppercase tracking-micro text-bg">
                                        {{ exp.date }}
                                    </span>

                                    <span v-if="exp.tag"
                                        class="ml-2 inline-block rounded-full border border-g300 px-3 py-1 font-mono text-[9px] uppercase tracking-micro text-g500">
                                        {{ exp.tag }}
                                    </span>

                                    <div class="mt-4 flex items-center gap-3">
                                        <div class="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-sm2 border border-g200 bg-white">
                                            <img :src="card.logo" alt="" class="h-full w-full object-contain"
                                                :class="card.logoClass ?? 'p-1'" />
                                        </div>
                                        <div v-if="cards(exp).length > 1" class="min-w-0">
                                            <h3 class="text-lg md:text-xl font-semibold leading-tight tracking-tight text-ink">
                                                {{ card.name }}
                                            </h3>
                                            <p class="mt-0.5 text-[13px] leading-tight text-g500">{{ exp.title }}</p>
                                        </div>
                                        <h3 v-else class="text-base md:text-lg font-semibold leading-tight tracking-tight text-ink">
                                            {{ exp.title }}
                                        </h3>
                                    </div>

                                    <!-- project switcher -->
                                    <div v-if="cards(exp).length > 1" role="tablist" aria-label="Projects"
                                        class="mt-4 inline-flex rounded-full border border-g300 p-0.5">
                                        <button v-for="(other, oIndex) in cards(exp)" :key="other.key" type="button"
                                            role="tab" :aria-selected="oIndex === cIndex" :tabindex="depth(exp, cIndex) > 0 ? -1 : 0"
                                            class="rounded-full px-3 py-1 font-mono text-[9px] uppercase tracking-micro transition-colors"
                                            :class="oIndex === cIndex ? 'bg-ink text-bg' : 'text-g500 hover:text-ink'"
                                            @click.stop="bringToFront(exp, oIndex)">
                                            {{ other.name }}
                                        </button>
                                    </div>

                                    <p class="mt-3 text-[13px] leading-relaxed text-g500">{{ card.description }}</p>

                                    <a v-if="card.link" :href="card.link" target="_blank" rel="noopener"
                                        :tabindex="depth(exp, cIndex) > 0 ? -1 : 0"
                                        class="mt-2 inline-block font-mono text-[10px] uppercase tracking-micro text-g400 hover:text-ink">
                                        {{ card.link.replace(/^https?:\/\//, '') }} ↗
                                    </a>

                                    <div v-if="card.technologies.length" class="mt-4 flex flex-wrap gap-2">
                                        <span v-for="tech in card.technologies" :key="tech.name"
                                            class="inline-flex items-center gap-1.5 rounded-full border border-g300 px-2 py-0.5 font-mono text-[9px] uppercase tracking-micro text-g500">
                                            <img :src="tech.icon" class="h-3 w-3" alt="" />
                                            {{ tech.name }}
                                        </span>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'

interface Tech { name: string; icon: string }
interface Project { name: string; logo: string; logoClass?: string; description: string; link?: string; technologies: Tech[] }
interface Experience {
    id: number
    tag: string
    date: string
    title: string
    logo: string
    description: string
    link?: string
    technologies: Tech[]
    projects?: Project[]
}

const sectionRef = ref<HTMLElement | null>(null)
const visible = ref(false)

const currentMonthYear = new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' })

const awStack: Tech[] = [
    { name: 'Laravel', icon: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Laravel.svg' },
    { name: 'Nuxt.js', icon: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Nuxt_logo.svg' },
    { name: 'MySQL', icon: 'https://bgasparotto.com/wp-content/uploads/2015/05/mysql-logo.png' }
]

const experiences: Experience[] = [
    {
        id: 1,
        tag: '',
        date: `June 2025 - ${currentMonthYear}`,
        title: 'Fullstack Developer — AWORK, Denmark',
        logo: '/awork-logo.png',
        description: '',
        technologies: [],
        projects: [
            {
                name: 'Obiyen',
                logo: '/obiyen-logo.png',
                link: 'https://obiyen.com',
                description: 'Fullstack developer on Obiyen, an EU-hosted, GDPR-focused business platform that bundles modular apps (cookie consent, SEO rank tracking, site audits, web analytics, PDF accessibility checks, document management, surveys and more) under one login. I build backend features and APIs and turn them into intuitive, user-friendly interfaces.',
                technologies: awStack
            },
            {
                name: 'CitizenOne',
                logo: '/citizenone-logo.png',
                // icon is a circle on a navy square: clip to the circle so the white box shows around it
                logoClass: '[clip-path:circle(36%)]',
                link: 'https://citizenone.dk',
                description: 'Fullstack developer on CitizenOne, a Danish journal and booking system for social services and health practices. The platform covers care documentation, medicine management, staff scheduling, secure messaging and online booking. I develop features end to end, from backend logic and integrations to responsive, accessible interfaces.',
                technologies: awStack
            }
        ]
    },
    {
        id: 4,
        date: 'December 2025',
        tag: 'Part-time',
        title: 'UI/UX Developer — Caremed Healthcare Group, United Kingdom',
        logo: 'https://cdn.simpleicons.org/shopify/95BF47',
        description: 'Part-time role improving the overall UI/UX of an established Shopify website. Refined layouts, visual consistency, and user flows, and fixed UI issues across the storefront to deliver a cleaner, more usable shopping experience.',
        technologies: [
            { name: 'Shopify', icon: 'https://cdn.simpleicons.org/shopify/95BF47' },
            { name: 'Liquid', icon: 'https://cdn.simpleicons.org/shopify/95BF47' },
            { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' }
        ]
    },
    {
        id: 2,
        tag: '',
        date: 'January 2025 - June 2025',
        title: 'Front-End Web Developer Intern — AWORK, Denmark',
        logo: '/awork-logo.png',
        description: 'Assisted in building and enhancing the CitizenOne website using NuxtJS, Laravel, and TypeScript. Collaborated closely with senior developers to implement new features, resolve bugs, and optimize overall web performance and user experience.',
        technologies: [
            { name: 'Laravel', icon: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Laravel.svg' },
            { name: 'Nuxt.js', icon: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Nuxt_logo.svg' },
            { name: 'MySQL', icon: 'https://bgasparotto.com/wp-content/uploads/2015/05/mysql-logo.png' }
        ]
    },
    {
        id: 3,
        tag: '',
        date: 'July 2025',
        title: 'BS Information Technology — STI College of Davao',
        logo: '/sti-logo.png',
        description: 'Graduated with a Bachelor of Science in Information Technology (BSIT), gaining strong foundational skills in software development, database systems, and modern web technologies. Awarded Best Capstone of the Year for outstanding capstone project excellence.',
        technologies: []
    }
]

interface Card { key: string; name: string; logo: string; logoClass?: string; description: string; link?: string; technologies: Tech[] }

// how many px each card behind the front one peeks out above it
const PEEK = 48

// one card per project, or a single card for a plain experience
const cards = (exp: Experience): Card[] =>
    exp.projects?.length
        ? exp.projects.map(p => ({ key: `${exp.id}-${p.name}`, ...p }))
        : [{ key: `${exp.id}`, name: exp.title, logo: exp.logo, description: exp.description, link: exp.link, technologies: exp.technologies }]

// index of the card currently in front, per experience
const front = reactive<Record<number, number>>({})
// index of the card currently animating to the back, per experience
const leaving = reactive<Record<number, number | undefined>>({})

// 0 = front card, 1 = directly behind it, ...
const depth = (exp: Experience, index: number) => {
    const n = cards(exp).length
    return (index - (front[exp.id] ?? 0) + n) % n
}

const deckStyle = (d: number) => ({ '--d': d, '--peek': `${PEEK}px`, zIndex: 10 - d })

const bringToFront = (exp: Experience, index: number) => {
    const currentFront = front[exp.id] ?? 0
    if (index === currentFront) return
    leaving[exp.id] = currentFront
    front[exp.id] = index
}

const handleScroll = () => {
    if (!sectionRef.value) return
    if (sectionRef.value.getBoundingClientRect().top < window.innerHeight * 0.85) visible.value = true
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
    handleScroll()
})
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
/* Stacked project deck. --d is the card's depth (0 = front). Cards behind
   the front one move up by --peek per level and shrink slightly from the
   top edge, so a labelled sliver of each shows above the front card. */
.deck-card {
    --lift: 0px;
    transform-origin: top center;
    transform: translateY(calc(var(--d) * var(--peek) * -1 - var(--lift))) scale(calc(1 - var(--d) * 0.04));
    transition: transform 520ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 300ms ease;
}

.deck-card.is-back:hover {
    --lift: 6px;
}

.deck-card.is-back:hover .deck-cta {
    background: rgb(var(--ink));
    color: rgb(var(--bg));
    border-color: rgb(var(--ink));
}

.deck-cta {
    transition: background-color 200ms ease, color 200ms ease, border-color 200ms ease;
}

.deck-body {
    transition: opacity 260ms ease;
}

/* The card being sent back swings out to the side, drops behind the
   new front card halfway through, then settles into the back slot. */
.deck-card.to-back {
    animation: deck-to-back 640ms cubic-bezier(0.45, 0, 0.2, 1);
}

@keyframes deck-to-back {
    0% {
        transform: none;
        z-index: 20;
    }

    45% {
        transform: translate(42%, -10px) rotate(5deg);
        z-index: 20;
    }

    55% {
        z-index: 0;
    }

    100% {
        transform: translateY(calc(var(--peek) * -1)) scale(0.96);
        z-index: 0;
    }
}

@media (prefers-reduced-motion: reduce) {
    .deck-card.to-back {
        animation: none;
    }

    .deck-card {
        transition-duration: 150ms;
    }
}
</style>
