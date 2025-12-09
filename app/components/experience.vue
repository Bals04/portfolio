<template>
    <section class="py-20 bg-gradient-to-br from-white via-gray-100 to-gray-200 text-gray-800">
        <div class="max-w-5xl mx-auto px-6">

            <!-- Section Title -->
            <h1 ref="experienceTitle"
                class="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-20 tracking-tight"
                :class="experienceTitleVisible ? 'animate-fadeInUp opacity-100' : 'opacity-0 translate-y-8'"
                style="transition: all 1s ease-out;">
                Experience
            </h1>

            <div class="relative">

                <!-- Glowing Timeline Line -->
                <div
                    class="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-gray-300 via-gray-400 to-gray-300 rounded-full shadow-inner">
                </div>

                <div class="space-y-20">
                    <!-- Experience Item -->
                    <div v-for="(exp, index) in experiences" :key="exp.id" :ref="(el) => (experienceItems[index] = el)"
                        :class="experienceItemsVisible[index] ? 'animate-fadeInUp opacity-100' : 'opacity-0 translate-y-8'"
                        style="transition: all 0.9s ease-out;" class="relative pl-20">
                        <!-- Timeline Dot -->
                        <div
                            class="absolute left-8 top-4 w-5 h-5 bg-[#1c1c1c] rounded-full border-4 border-white shadow-md transform -translate-x-1/2 z-10">
                        </div>
                        <!-- Card -->
                        <div
                            class="bg-white/90 backdrop-blur-md border border-gray-200 shadow-xl rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">

                            <!-- Date -->
                            <span
                                class="inline-block bg-[#1c1c1c] text-white px-4 py-1 rounded-full text-sm font-semibold mb-4 shadow-md">
                                {{ exp.date }}
                            </span>

                            <!-- Title + Company Logo -->
                            <div class="flex items-center gap-4 mb-4">
                                <img :src="exp.logo" alt="Company Logo"
                                    class="h-12 w-12 rounded-full object-cover shadow-md" />
                                <h3 class="text-2xl font-bold text-[#1c1c1c]">
                                    {{ exp.title }}
                                </h3>
                            </div>

                            <!-- Description -->
                            <p class="text-gray-700 leading-relaxed mb-6">
                                {{ exp.description }}
                            </p>

                            <!-- Tech Stack -->
                            <div class="flex flex-wrap gap-3">
                                <span v-for="tech in exp.technologies" :key="tech.name"
                                    class="bg-gray-50 border border-gray-200 text-[#1c1c1c] py-1.5 px-4 rounded-full text-sm flex items-center gap-2 shadow-sm hover:bg-gray-100 transition">
                                    <img :src="tech.icon" class="h-4 w-4" />
                                    {{ tech.name }}
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
const experiences = [
    {
        id: 1,
        date: 'June 2025 - Present',
        title: 'Front-End Web Developer — AWORK, Denmark',
        logo: "/awork-logo.png",
        description:
            'Assigned as the Frontend Developer for AWORK ONE, One of Awork company’s product. I am responsible for integrating backend functionalities with the frontend, while designing and developing intuitive, user-friendly interfaces to ensure a seamless user experience.',
        technologies: [
            {
                name: 'Laravel',
                icon: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Laravel.svg'
            },
            {
                name: 'Nuxt.js',
                icon: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Nuxt_logo.svg'
            },
            {
                name: 'MySQL',
                icon: 'https://bgasparotto.com/wp-content/uploads/2015/05/mysql-logo.png'
            }
        ]
    },
    {
        id: 2,
        date: 'January 2025 - June 2025',
        title: 'Front-End Web Developer Intern — AWORK, Denmark',
        logo: "/awork-logo.png",
        description:
            'Assisted in building and enhancing the CitizenOne website using NuxtJS, Laravel, and TypeScript. Collaborated closely with senior developers to implement new features, resolve bugs, and optimize overall web performance and user experience.',
        technologies: [
            {
                name: 'Laravel',
                icon: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Laravel.svg'
            },
            {
                name: 'Nuxt.js',
                icon: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Nuxt_logo.svg'
            },
            {
                name: 'MySQL',
                icon: 'https://bgasparotto.com/wp-content/uploads/2015/05/mysql-logo.png'
            }
        ]
    },
    {
        id: 3,
        date: 'July 2025',
        title: 'BS Information Technology — STI College of Davao',
        logo: '/sti-logo.png',
        description:
            'Graduated with a Bachelor of Science in Information Technology (BSIT), gaining strong foundational skills in software development, database systems, and modern web technologies. Awarded Best Capstone of the Year for an outstanding capstone project excellence.',
        technologies: []
    }

]

const textContainer = ref<HTMLElement | null>(null)
const techSection = ref<HTMLElement | null>(null)
const projectsSection = ref<HTMLElement | null>(null)
const experienceTitle = ref<HTMLElement | null>(null)
const experienceItems = ref<HTMLElement[]>([]) as any

const textVisible = ref(false)
const techVisible = ref(false)
const projectsVisible = ref(false)
const experienceTitleVisible = ref(false)
const experienceItemsVisible = ref<boolean[]>([])


// Create intersection observer for scroll animations
const createObserver = (element: HTMLElement, visibilityRef: any) => {
    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry?.isIntersecting) {
                visibilityRef.value = true
                observer.disconnect()
            }
        },
        { threshold: 0.1 }
    )

    observer.observe(element)
}

onMounted(() => {
    // Initialize experience items visibility array
    experienceItemsVisible.value = new Array(experiences.length).fill(false)

    // Observer for hero text
    if (textContainer.value) {
        createObserver(textContainer.value, textVisible)
    }

    // Observer for tech section
    if (techSection.value) {
        createObserver(techSection.value, techVisible)
    }

    // Observer for projects section
    if (projectsSection.value) {
        createObserver(projectsSection.value, projectsVisible)
    }

    // Observer for experience title
    if (experienceTitle.value) {
        createObserver(experienceTitle.value, experienceTitleVisible)
    }

    // Individual observers for each experience item
    nextTick(() => {
        experienceItems.value.forEach((item: any, index: any) => {
            if (item) {
                const observer = new IntersectionObserver(
                    ([entry]) => {
                        if (entry?.isIntersecting) {
                            experienceItemsVisible.value[index] = true
                            observer.disconnect()
                        }
                    },
                    { threshold: 0.2 }
                )
                observer.observe(item)
            }
        })
    })
})
</script>