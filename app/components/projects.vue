<template>
    <section ref="projectsSection" class="py-32 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        <div class="max-w-7xl mx-auto px-6">
            <!-- Enhanced Header -->
            <div class="mb-16 text-center" :class="projectsVisible ? 'opacity-100' : 'opacity-0'"
                :style="projectsVisible ? 'transform: translateY(0); transition: all 0.8s ease-out;' : 'transform: translateY(20px); transition: all 0.8s ease-out;'">

                <h1 class="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
                    Featured Projects
                </h1>

                <p class="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
                    Explore my works
                </p>

                <!-- Navigation Dots -->
                <div class="flex items-center justify-center gap-2">
                    <button v-for="(project, index) in projects" :key="project.id" @click="goToSlide(index)"
                        class="transition-all duration-300" :class="currentIndex === index
                            ? 'w-8 h-2 bg-slate-800 rounded-full'
                            : 'w-2 h-2 bg-slate-300 rounded-full hover:bg-slate-400'">
                    </button>
                </div>
            </div>

            <!-- Carousel Container -->
            <div class="relative" :class="projectsVisible ? 'opacity-100' : 'opacity-0'"
                :style="projectsVisible ? 'transform: translateY(0); transition: all 0.8s ease-out; transition-delay: 0.2s;' : 'transform: translateY(30px); transition: all 0.8s ease-out; transition-delay: 0.2s;'">

                <!-- Carousel Wrapper -->
                <div class="relative overflow-visible">
                    <div class="flex transition-transform duration-700 ease-out"
                        :style="`transform: translateX(-${currentIndex * 100}%)`">

                        <!-- Project Cards -->
                        <div v-for="(project, index) in projects" :key="project.id" class="w-full flex-shrink-0 px-4">

                            <div class="max-w-5xl mx-auto">
                                <div class="grid md:grid-cols-12 gap-8 items-center">

                                    <!-- Project Image -->
                                    <div class="md:col-span-7 relative group">
                                        <div
                                            class="relative overflow-hidden rounded-2xl shadow-2xl transition-all duration-700 hover:shadow-3xl">
                                            <!-- Gradient overlay -->
                                            <div
                                                class="absolute inset-0 bg-gradient-to-tr from-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
                                            </div>

                                            <div class="relative" style="aspect-ratio: 16/10;">
                                                <img :src="project.image" :alt="project.title"
                                                    class="w-full h-full object-cover transition-all duration-700 group-hover:scale-110">
                                            </div>

                                            <!-- View Project Overlay -->
                                            <div
                                                class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-20">
                                                <div
                                                    class="bg-white px-8 py-4 rounded-full shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                                    <span class="text-sm font-bold text-slate-900 tracking-wide">View
                                                        Project →</span>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Decorative element -->
                                        <div
                                            class="absolute -bottom-6 -right-6 w-32 h-32 bg-slate-200 rounded-2xl -z-10 opacity-50">
                                        </div>
                                    </div>

                                    <!-- Project Content -->
                                    <div class="md:col-span-5 space-y-6">
                                        <!-- Project Number -->
                                        <div class="flex items-center gap-4">
                                            <div
                                                class="w-12 h-12 rounded-full bg-gradient-to-br from-slate-800 to-slate-600 flex items-center justify-center shadow-lg">
                                                <span class="text-sm font-bold text-white">
                                                    {{ String(index + 1).padStart(2, '0') }}
                                                </span>
                                            </div>
                                            <div class="h-px flex-1 bg-gradient-to-r from-slate-300 to-transparent">
                                            </div>
                                        </div>

                                        <!-- Project Title -->
                                        <h3 class="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                                            {{ project.title }}
                                        </h3>

                                        <!-- Description -->
                                        <p class="text-base leading-relaxed text-slate-600">
                                            {{ project.description }}
                                        </p>

                                        <!-- Tech Stack -->
                                        <div class="pt-4">
                                            <div class="mb-3">
                                                <span
                                                    class="text-xs font-bold text-slate-500 tracking-widest uppercase">Tech
                                                    Stack</span>
                                            </div>
                                            <div class="flex flex-wrap gap-2">
                                                <span v-for="tech in project.technology.split(', ')" :key="tech"
                                                    class="inline-flex items-center px-3 py-1.5 bg-white border-2 border-slate-200 text-slate-700 text-xs font-semibold rounded-lg hover:border-slate-400 hover:shadow-md transition-all duration-300 cursor-default">
                                                    {{ tech }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Navigation Arrows -->
                <button @click="previousSlide"
                    class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-slate-800 rounded-full shadow-xl flex items-center justify-center text-white transition-all duration-300 z-10 disabled:opacity-50 disabled:cursor-not-allowed"
                    :disabled="currentIndex === 0">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <button @click="nextSlide"
                    class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-slate-800 rounded-full shadow-xl flex items-center justify-center text-white transition-all duration-300 z-10 disabled:opacity-50 disabled:cursor-not-allowed"
                    :disabled="currentIndex === projects.length - 1">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            <!-- Project Counter -->
            <div class="text-center mt-12">
                <span class="text-sm font-semibold text-slate-500">
                    {{ currentIndex + 1 }} / {{ projects.length }}
                </span>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const projectsSection = ref(null);
const projectsVisible = ref(false);
const currentIndex = ref(0);

const projects = [
    {
        id: 1,
        title: 'Uni Lux',
        description: 'A promotional landing page for a luxury bag business based in Metro Manila',
        technology: 'HTML, Tailwind CSS',
        image: '/uniLux.png'
    },
    {
        id: 2,
        title: 'XNY Events & Food services',
        description: 'A promotional landing page for an events and catering business in Davao.',
        technology: 'HTML, Tailwind CSS',
        image: '/xny.png'
    },
    {
        id: 3,
        title: 'Lead generation specialist portfolio',
        description: 'A professional portfolio website for a lead generation specialist, highlighting expertise in driving qualified leads, optimizing sales funnels, and supporting business growth.',
        technology: 'HTML, Tailwind CSS',
        image: '/leadgeneration.png'
    },
    {
        id: 4,
        title: 'E-Voting System',
        description: 'An E-Voting System is a digital platform that allows voters to cast their votes electronically instead of using traditional paper ballots. It ensures a secure, transparent, and efficient voting process.',
        technology: 'Reactjs, TypeScript, Tailwind CSS, Node.js, Express, MySQL, Supabase',
        image: '/evotingimg.png'
    },
    {
        id: 5,
        title: 'Flexperience',
        description: 'A web-based solution bringing gym owners, trainers, and fitness enthusiasts together in a unified fitness management platform.',
        technology: 'HTML, CSS, Tailwind CSS, Node.js, Express, MySQL, Socket.io, Supabase',
        image: '/flexperience.png'
    }
];

const nextSlide = () => {
    if (currentIndex.value < projects.length - 1) {
        currentIndex.value++;
    }
};

const previousSlide = () => {
    if (currentIndex.value > 0) {
        currentIndex.value--;
    }
};

const goToSlide = (index) => {
    currentIndex.value = index;
};

// Keyboard navigation
const handleKeyPress = (e) => {
    if (e.key === 'ArrowLeft') {
        previousSlide();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
    }
};

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
    window.addEventListener('keydown', handleKeyPress);
    handleScroll();
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('keydown', handleKeyPress);
});
</script>

<style scoped>
.shadow-3xl {
    box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.3);
}
</style>