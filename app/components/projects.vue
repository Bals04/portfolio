<template>
    <section id="work" ref="sectionRef" class="relative px-4 md:px-6 py-14 md:py-20 border-t border-g200">
        <div class="mx-auto max-w-4xl">

            <!-- header + view toggle -->
            <div class="reveal mb-12 flex items-end justify-between gap-4" :class="{ in: visible }">
                <div>
                    <p class="font-mono text-[10px] uppercase tracking-micro text-g400 mb-3">02 — projects</p>
                    <h2 class="font-pixel text-4xl md:text-5xl text-ink">Projects</h2>
                </div>

                <div class="inline-flex items-center gap-0.5 rounded-full border border-g200 p-0.5">
                    <button v-for="v in views" :key="v.id" type="button" @click="view = v.id"
                        :aria-label="`${v.id} view`" :aria-pressed="view === v.id"
                        class="flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-micro transition-colors"
                        :class="view === v.id ? 'bg-ink text-bg' : 'text-g400 hover:text-ink'">
                        <span class="[&_svg]:h-3.5 [&_svg]:w-3.5" v-html="v.icon"></span>
                        <span class="hidden sm:block">{{ v.id }}</span>
                    </button>
                </div>
            </div>

            <!-- LIST (grid) view -->
            <div v-if="view === 'list'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                <article v-for="(project, index) in projects" :key="project.id"
                    class="group rounded-card border border-g200 bg-g50 p-3 shadow-soft transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:shadow-soft-lg">
                    <div class="relative overflow-hidden rounded-md2 border border-g200 bg-bg" style="aspect-ratio: 16/10;">
                        <img :src="project.image" alt="" aria-hidden="true"
                            class="absolute inset-0 h-full w-full scale-110 object-cover opacity-60 blur-2xl" />
                        <img :src="project.image" :alt="project.title"
                            class="relative h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.04]" />
                    </div>
                    <div class="px-1 pt-4 pb-1">
                        <div class="flex items-center gap-3 mb-3">
                            <span class="font-mono text-[10px] text-g400">{{ String(index + 1).padStart(2, '0') }}</span>
                            <span class="h-px flex-1 bg-g200"></span>
                            <span v-if="project.award"
                                class="rounded-full bg-ink px-2 py-0.5 font-mono text-[9px] uppercase tracking-micro text-bg">featured</span>
                        </div>
                        <h3 class="text-lg font-semibold tracking-tight text-ink">{{ project.title }}</h3>
                        <p class="mt-2 text-[13px] leading-relaxed text-g500">{{ project.description }}</p>
                    </div>
                </article>
            </div>

            <!-- CARD (deck) view -->
            <div v-else>
                <div class="mb-4 flex items-center justify-between">
                    <span class="font-mono text-[10px] uppercase tracking-micro text-g400">click a card</span>
                    <span class="font-mono text-[10px] uppercase tracking-micro text-g400">
                        {{ String(active + 1).padStart(2, '0') }} / {{ String(projects.length).padStart(2, '0') }}
                    </span>
                </div>

                <div class="relative mx-auto h-[420px] select-none overflow-hidden sm:h-[460px]">
                    <div v-for="(project, index) in projects" :key="project.id"
                        class="deck-card absolute left-1/2 top-1/2 w-[270px] sm:w-[320px] md:w-[360px] cursor-pointer overflow-hidden rounded-card border border-g200 bg-bg shadow-soft"
                        :style="cardStyle(index)" @click="onCardClick(index)"
                        :aria-hidden="index !== active" :tabindex="index === active ? 0 : -1">
                        <div class="relative overflow-hidden border-b border-g200 bg-g50" style="aspect-ratio: 16/10;">
                            <img :src="project.image" alt="" aria-hidden="true"
                                class="absolute inset-0 h-full w-full scale-110 object-cover opacity-60 blur-2xl" />
                            <img :src="project.image" :alt="project.title" class="relative h-full w-full object-contain" />
                        </div>
                        <div class="p-5">
                            <span v-if="project.award"
                                class="inline-flex items-center gap-1 rounded-full bg-ink px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-micro text-bg">
                                <span>‹</span>{{ project.award }}<span>›</span>
                            </span>
                            <h3 class="text-lg font-semibold tracking-tight text-ink"
                                :class="{ 'mt-3': project.award }">{{ project.title }}</h3>
                            <p class="mt-2 text-[13px] leading-relaxed text-g500 line-clamp-3">{{ project.description }}</p>
                        </div>
                    </div>
                </div>

                <div class="mt-2 flex items-center justify-center gap-6">
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
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const sectionRef = ref(null);
const visible = ref(false);
const view = ref('list');
const active = ref(0);
const lifting = ref(0);

const listIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="7" rx="1"/><rect x="14" y="4" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>';
const cardIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="4" width="10" height="16" rx="2"/><path d="M4 7v10M20 7v10"/></svg>';

const views = [
    { id: 'list', icon: listIcon },
    { id: 'card', icon: cardIcon },
];

const projects = [
    { id: 1, title: 'Chade Inanag', description: 'A warm, appetite-stirring landing page for a beloved restaurant in Valencia, Bukidnon, built to make every visitor crave a seat at the table.', image: '/chadeinanag.jpg' },
    { id: 2, title: 'GAB Matcha Bar', description: 'A calm, earthy landing page for a matcha bar in Valencia, Bukidnon, designed to feel as smooth and grounded as the drinks they serve.', image: '/gabmatcha.jpg' },
    { id: 3, title: 'DC Cakes', description: 'A sweet, playful landing page for a cake shop in Bukidnon. Colorful, cheerful, and ready to turn browsers into buyers.', image: '/dccakes.jpg' },
    { id: 4, title: 'Home Meals by Raf & Nika', description: 'A homey landing page for a Panabo City catering business, capturing the comfort of home-cooked meals served with love.', image: '/homemeals.jpg' },
    { id: 5, title: 'Uni Lux', description: 'A bold, elegant landing page for a Metro Manila luxury bag brand. Minimal, refined, and built to elevate the product.', image: '/unilux.jpg' },
    { id: 6, title: 'XNY Events & Food Services', description: 'A vibrant landing page for a Davao events and catering business, designed to turn special days into unforgettable ones.', image: '/xny.jpg' },
    { id: 7, title: 'Lead Generation Specialist Portfolio', description: 'A sharp, conversion-focused portfolio for a lead-gen pro, showcasing the funnels, results, and strategy that drive real business growth.', image: '/leadgeneration.png' },
    { id: 8, title: 'E-Voting System', description: 'A secure digital voting platform that swaps paper ballots for clean, transparent, and tamper-resistant elections, built for trust at scale.', image: '/evotingimg.png' },
    { id: 9, title: 'Flexperience', description: 'My capstone project. A unified fitness platform connecting gym owners, trainers, and members, built to make managing workouts and clients feel effortless.', award: 'Best Capstone of the Year', image: '/flexperience.png' }
];

// Linear carousel: viewed cards stack to the LEFT, upcoming to the RIGHT.
// Advancing shifts everything left, so the active card exits left while the
// next one glides into the middle from the right.
const cardStyle = (index) => {
    const pos = index - active.value;   // <0 = left/past, 0 = center, >0 = right/upcoming
    const abs = Math.abs(pos);
    const onTop = index === lifting.value ? 60 : 0;

    if (pos === 0) {
        return `transform: translate(-50%,-50%) scale(1.04); opacity:1; z-index:${Math.max(50, onTop)};`;
    }
    if (abs > 3) {
        // parked off to the side, invisible & unclickable
        const parkX = pos < 0 ? -160 : 160;
        return `transform: translate(calc(-50% + ${parkX}px),-50%) scale(0.8); opacity:0; z-index:0; pointer-events:none;`;
    }
    const x = pos * 54;
    const y = abs * 18;
    const rot = pos * 6;
    const scale = 1 - abs * 0.06;
    const opacity = abs === 1 ? 0.9 : abs === 2 ? 0.72 : 0.55;
    return `transform: translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${rot}deg) scale(${scale}); opacity:${opacity}; z-index:${onTop || (40 - abs)};`;
};

const activate = (i) => { lifting.value = i; active.value = i; };
const onCardClick = (i) => { i === active.value ? next() : activate(i); };
const next = () => { if (active.value < projects.length - 1) activate(active.value + 1); };
const prev = () => { if (active.value > 0) activate(active.value - 1); };

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

<style scoped>
/* Explicit transition so the carousel glide can't be overridden by
   Tailwind layer ordering. Tuned slow (800ms) to be clearly visible. */
.deck-card {
    transition: transform 480ms cubic-bezier(0.16, 1, 0.3, 1),
        opacity 480ms ease;
    will-change: transform, opacity;
}
</style>
