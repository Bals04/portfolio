<template>
    <section ref="projectsSection"
        class="relative overflow-hidden py-24 md:py-32 bg-gradient-to-br from-white via-gray-100 to-gray-200 text-[#1c1c1c]">

        <!-- Halftone texture backdrop -->
        <div class="absolute inset-0 projects-halftone opacity-50 pointer-events-none"></div>
        <!-- Soft accent glow -->
        <div
            class="absolute left-1/2 top-1/3 -translate-x-1/2 w-[70%] h-[60%] bg-[radial-gradient(ellipse_at_center,rgba(28,28,28,0.10),transparent_70%)] blur-3xl pointer-events-none">
        </div>

        <div class="relative max-w-7xl mx-auto px-6">

            <!-- Header -->
            <div class="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8"
                :class="projectsVisible ? 'opacity-100' : 'opacity-0'"
                :style="projectsVisible ? 'transform: translateY(0); transition: all 0.8s ease-out;' : 'transform: translateY(20px); transition: all 0.8s ease-out;'">

                <div>
                    <div class="text-xs uppercase tracking-[0.4em] text-gray-500 mb-3 flex items-center gap-3">
                        <span class="w-8 h-px bg-[#1c1c1c]"></span> Work
                    </div>
                    <h1
                        class="text-4xl md:text-6xl font-extrabold text-[#1c1c1c] tracking-tight leading-[1.2]">
                        Featured <br class="hidden md:block" />
                        <span
                            class="inline-block pb-4 pr-2 bg-gradient-to-r from-[#1c1c1c] to-gray-500 bg-clip-text text-transparent italic">
                            Projects
                        </span>
                    </h1>
                </div>
            </div>

            <!-- Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10"
                :class="projectsVisible ? 'opacity-100' : 'opacity-0'"
                :style="projectsVisible ? 'transform: translateY(0); transition: all 0.8s ease-out; transition-delay: 0.2s;' : 'transform: translateY(30px); transition: all 0.8s ease-out; transition-delay: 0.2s;'">

                <div v-for="(project, index) in projects" :key="project.id"
                    class="group relative">

                    <!-- Decorative dots accent behind card -->
                    <div
                        class="absolute -bottom-4 -right-4 w-28 h-28 rounded-2xl projects-dots opacity-60 pointer-events-none">
                    </div>

                    <!-- Image card -->
                    <div
                        class="relative overflow-hidden rounded-2xl shadow-xl bg-white transition-all duration-500 group-hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] group-hover:-translate-y-1">
                        <!-- Browser top bar -->
                        <div
                            class="flex items-center gap-1.5 px-4 py-2.5 bg-gray-100/80 border-b border-gray-200">
                            <span class="w-2.5 h-2.5 rounded-full bg-red-400/70"></span>
                            <span class="w-2.5 h-2.5 rounded-full bg-yellow-400/70"></span>
                            <span class="w-2.5 h-2.5 rounded-full bg-green-400/70"></span>
                            <span
                                class="ml-3 text-[10px] tracking-widest uppercase text-gray-400 truncate">
                                {{ project.title }}
                            </span>
                        </div>
                        <div class="relative overflow-hidden" style="aspect-ratio: 16/10;">
                            <!-- Blurred backdrop fills empty space -->
                            <img :src="project.image" alt=""
                                aria-hidden="true"
                                class="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-70" />
                            <!-- Foreground image, fully visible -->
                            <img :src="project.image" :alt="project.title"
                                class="relative w-full h-full object-contain" />
                            <div
                                class="absolute inset-0 bg-gradient-to-tr from-[#1c1c1c]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            </div>
                        </div>
                    </div>

                    <!-- Text below image -->
                    <div class="mt-6 space-y-4">
                        <div class="flex items-center gap-3">
                            <span class="text-3xl font-extrabold text-[#1c1c1c]/15 leading-none">
                                {{ String(index + 1).padStart(2, '0') }}
                            </span>
                            <div class="h-px flex-1 bg-gradient-to-r from-[#1c1c1c]/30 to-transparent">
                            </div>
                        </div>

                        <h3
                            class="text-2xl md:text-3xl font-bold text-[#1c1c1c] tracking-tight leading-tight">
                            {{ project.title }}
                        </h3>

                        <div v-if="project.award"
                            class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-100 to-amber-50 border border-amber-300 text-amber-900 text-xs font-semibold shadow-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                class="w-3.5 h-3.5">
                                <path
                                    d="M5 3h14a1 1 0 0 1 1 1v3a5 5 0 0 1-4.546 4.98A6.002 6.002 0 0 1 13 15.917V19h3a1 1 0 1 1 0 2H8a1 1 0 1 1 0-2h3v-3.083A6.002 6.002 0 0 1 8.546 11.98 5 5 0 0 1 4 7V4a1 1 0 0 1 1-1zm1 2v2a3 3 0 0 0 2 2.83V5H6zm12 0h-2v4.83A3 3 0 0 0 20 7V5h-2z" />
                            </svg>
                            {{ project.award }}
                        </div>

                        <p class="text-sm md:text-base leading-relaxed text-gray-600">
                            {{ project.description }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const projectsSection = ref(null);
const projectsVisible = ref(false);

const projects = [
    {
        id: 1,
        title: 'Chade Inanag',
        description: 'A warm, appetite-stirring landing page for a beloved restaurant in Valencia, Bukidnon, built to make every visitor crave a seat at the table.',
        image: '/chadeinanag.jpg'
    },
    {
        id: 2,
        title: 'GAB Matcha Bar',
        description: 'A calm, earthy landing page for a matcha bar in Valencia, Bukidnon, designed to feel as smooth and grounded as the drinks they serve.',
        image: '/gabmatcha.jpg'
    },
    {
        id: 3,
        title: 'DC Cakes',
        description: 'A sweet, playful landing page for a cake shop in Bukidnon. Colorful, cheerful, and ready to turn browsers into buyers.',
        image: '/dccakes.jpg'
    },
    {
        id: 4,
        title: 'Home Meals by Raf & Nika',
        description: 'A homey landing page for a Panabo City catering business, capturing the comfort of home-cooked meals served with love.',
        image: '/homemeals.jpg'
    },
    {
        id: 5,
        title: 'Uni Lux',
        description: 'A bold, elegant landing page for a Metro Manila luxury bag brand. Minimal, refined, and built to elevate the product.',
        image: '/uniLux.jpg'
    },
    {
        id: 6,
        title: 'XNY Events & Food Services',
        description: 'A vibrant landing page for a Davao events and catering business, designed to turn special days into unforgettable ones.',
        image: '/xny.jpg'
    },
    {
        id: 7,
        title: 'Lead Generation Specialist Portfolio',
        description: 'A sharp, conversion-focused portfolio for a lead-gen pro, showcasing the funnels, results, and strategy that drive real business growth.',
        image: '/leadgeneration.png'
    },
    {
        id: 8,
        title: 'E-Voting System',
        description: 'A secure digital voting platform that swaps paper ballots for clean, transparent, and tamper-resistant elections, built for trust at scale.',
        image: '/evotingimg.png'
    },
    {
        id: 9,
        title: 'Flexperience',
        description: 'My capstone project. A unified fitness platform connecting gym owners, trainers, and members, built to make managing workouts and clients feel effortless.',
        award: 'Best Capstone of the Year',
        image: '/flexperience.png'
    }
];

// Scroll visibility logic
const handleScroll = () => {
    if (!projectsSection.value) return;

    const rect = projectsSection.value.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight * 0.7;

    if (isVisible) {
        projectsVisible.value = true;
    }
};

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.shadow-3xl {
    box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.3);
}

/* Custom CSS to prevent vertical scroll interference during horizontal swipe */
.touch-action-pan-y {
    touch-action: pan-y;
}

.projects-halftone {
    background-image: radial-gradient(rgba(28, 28, 28, 0.16) 1px, transparent 1px);
    background-size: 14px 14px;
    mask-image: radial-gradient(ellipse at center, black 30%, transparent 80%);
    -webkit-mask-image: radial-gradient(ellipse at center, black 30%, transparent 80%);
}

.projects-dots {
    background-image: radial-gradient(rgba(28, 28, 28, 0.35) 1.3px, transparent 1.6px);
    background-size: 10px 10px;
}
</style>