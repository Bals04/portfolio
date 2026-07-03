<template>
    <section id="experience" ref="sectionRef" class="px-4 md:px-6 py-14 md:py-20 border-t border-g200">
        <div class="mx-auto max-w-4xl">

            <div class="reveal mb-12" :class="{ in: visible }">
                <p class="font-mono text-[10px] uppercase tracking-micro text-g400 mb-3">04 — experience</p>
                <h2 class="font-pixel text-4xl md:text-5xl text-ink">Career</h2>
            </div>

            <div class="relative md:pl-8">
                <!-- hairline rail -->
                <div class="hidden md:block absolute left-0 top-1 bottom-1 w-px bg-g200"></div>

                <div class="space-y-4 md:space-y-6">
                    <article v-for="(exp, index) in experiences" :key="exp.id"
                        class="reveal relative rounded-card border border-g200 bg-g50 p-5 md:p-6 shadow-soft"
                        :class="{ in: visible }" :style="`animation-delay: ${100 + index * 70}ms`">
                        <!-- node on the rail -->
                        <span
                            class="hidden md:block absolute -left-8 top-7 h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 border-bg bg-ink"></span>

                        <span
                            class="inline-block rounded-full bg-ink px-3 py-1 font-mono text-[9px] uppercase tracking-micro text-bg">
                            {{ exp.date }}
                        </span>

                        <div class="mt-4 flex items-center gap-3">
                            <div class="flex h-9 w-9 items-center justify-center overflow-hidden rounded-sm2 border border-g200 bg-white">
                                <img :src="exp.logo" alt="" class="h-full w-full object-contain p-1" />
                            </div>
                            <h3 class="text-base md:text-lg font-semibold leading-tight tracking-tight text-ink">
                                {{ exp.title }}
                            </h3>
                        </div>

                        <p class="mt-3 text-[13px] leading-relaxed text-g500">{{ exp.description }}</p>

                        <div v-if="exp.technologies.length" class="mt-4 flex flex-wrap gap-2">
                            <span v-for="tech in exp.technologies" :key="tech.name"
                                class="inline-flex items-center gap-1.5 rounded-full border border-g300 px-2 py-0.5 font-mono text-[9px] uppercase tracking-micro text-g500">
                                <img :src="tech.icon" class="h-3 w-3" alt="" />
                                {{ tech.name }}
                            </span>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const sectionRef = ref<HTMLElement | null>(null)
const visible = ref(false)

const experiences = [
    {
        id: 1,
        date: 'June 2025 - Present',
        title: 'Front-End Web Developer — AWORK, Denmark',
        logo: '/awork-logo.png',
        description: 'Assigned as the Frontend Developer for AWORK ONE, one of Awork company’s products. I am responsible for integrating backend functionalities with the frontend, while designing and developing intuitive, user-friendly interfaces to ensure a seamless user experience.',
        technologies: [
            { name: 'Laravel', icon: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Laravel.svg' },
            { name: 'Nuxt.js', icon: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Nuxt_logo.svg' },
            { name: 'MySQL', icon: 'https://bgasparotto.com/wp-content/uploads/2015/05/mysql-logo.png' }
        ]
    },
    {
        id: 2,
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
        date: 'July 2025',
        title: 'BS Information Technology — STI College of Davao',
        logo: '/sti-logo.png',
        description: 'Graduated with a Bachelor of Science in Information Technology (BSIT), gaining strong foundational skills in software development, database systems, and modern web technologies. Awarded Best Capstone of the Year for outstanding capstone project excellence.',
        technologies: []
    }
]

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
