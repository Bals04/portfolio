<template>
    <section
        class="relative overflow-hidden bg-gradient-to-br from-white via-gray-100 to-gray-200 text-[#1c1c1c] pt-6 md:pt-10 pb-16 md:pb-20 transition-opacity duration-1000">
        <!-- Halftone dot pattern background -->
        <div class="absolute inset-0 halftone-bg opacity-50 pointer-events-none"></div>
        <!-- Soft accent glow behind portrait (center) -->
        <div
            class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/3 w-[60%] h-[70%] bg-[radial-gradient(ellipse_at_center,rgba(28,28,28,0.12),transparent_60%)] blur-3xl pointer-events-none">
        </div>

        <div ref="textContainer"
            class="relative max-w-7xl mx-auto px-6 min-h-screen flex flex-col justify-center">

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

                <!-- Left: name, title, intro, CTA, socials -->
                <div class="lg:col-span-7 z-10"
                    :class="textVisible ? 'animate-slideIn opacity-100' : 'opacity-0'">
                    <h1
                        class="font-extrabold tracking-tight leading-[0.9] text-[#1c1c1c] text-[12vw] md:text-[8vw] lg:text-[7.5rem]">
                        JONHYL <br class="hidden md:block" />BALSAMO
                    </h1>

                    <div class="mt-4 md:mt-6">
                        <span
                            class="font-light tracking-[0.05em] text-[#1c1c1c] text-[6vw] md:text-[3.5vw] lg:text-5xl">
                            WEB DEVELOPER
                        </span>
                    </div>

                    <div class="mt-8 max-w-xl">
                        <p class="text-base md:text-lg text-gray-600 leading-relaxed mb-6">
                            Front-End Web Developer at AWORK, Denmark, building an all-in-one SaaS
                            platform that brings multiple apps into a single website.
                        </p>

                        <div class="flex flex-wrap items-center gap-6">
                            <a href="https://facebook.com/jj.balsamo"
                                class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#1c1c1c] to-gray-600 text-white font-medium hover:opacity-90 transition-opacity">
                                Schedule Call
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                    class="w-4 h-4">
                                    <path fill-rule="evenodd"
                                        d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                                        clip-rule="evenodd" />
                                </svg>
                            </a>

                            <div class="flex items-center gap-4 text-[#1c1c1c]">
                                <span class="text-xs uppercase tracking-widest text-gray-500">Socials</span>
                                <a href="https://github.com/bals04" aria-label="GitHub"
                                    class="hover:text-gray-600 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                                        viewBox="0 0 24 24" fill="currentColor">
                                        <path
                                            d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                </a>
                                <a href="https://facebook.com/jj.balsamo" aria-label="Facebook"
                                    class="hover:text-gray-600 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                                        viewBox="0 0 24 24" fill="currentColor">
                                        <path
                                            d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                                    </svg>
                                </a>
                                <a href="https://www.linkedin.com/in/jonhyl-balsamo-b41a93386"
                                    aria-label="LinkedIn" target="_blank" rel="noopener noreferrer"
                                    class="hover:text-gray-600 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                                        viewBox="0 0 24 24" fill="currentColor">
                                        <path
                                            d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.049c.476-.9 1.637-1.852 3.37-1.852 3.602 0 4.268 2.37 4.268 5.455v6.288zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.778 13.019H3.555V9h3.56v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right: portrait with texture backdrop -->
                <div class="lg:col-span-5 relative flex justify-center lg:justify-end items-end"
                    :class="textVisible ? 'animate-slideInRight opacity-100' : 'opacity-0'">

                    <!-- texture backdrops behind portrait -->
                    <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div class="w-[460px] h-[460px] lg:w-[540px] lg:h-[540px] rounded-full halftone-radial opacity-80"></div>
                    </div>
                    <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div class="w-[300px] h-[300px] lg:w-[360px] lg:h-[360px] rounded-full hero-grain"></div>
                    </div>

                    <!-- portrait -->
                    <img id="heroImage" src="/hero-1-removebg-preview.png" alt="Jonhyl Balsamo"
                        class="relative z-10 w-full max-w-[560px] lg:max-w-[640px] h-auto object-contain drop-shadow-[0_30px_45px_rgba(0,0,0,0.35)]" />
                </div>
            </div>

        </div>
    </section>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, ref } from 'vue';

const socialMediaLinks = [
    { name: 'GitHub', url: 'https://github.com/bals04', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Github_logo_svg.svg/640px-Github_logo_svg.svg.png' },
    { name: 'Facebook', url: 'https://facebook.com/jj.balsamo', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg' }
];

const techStack = [
    { name: 'JavaScript', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png' },
    { name: 'Tailwind CSS', logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg' },
    { name: 'Vue.js', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg' },
    { name: 'Nuxt.js', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Nuxt_logo.svg' },
    { name: 'React', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg' },
    { name: 'Node.js', logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg' },
    { name: 'Express.js', logo: 'https://img.icons8.com/color/512/express-js.png' },
    { name: 'MySQL', logo: 'https://bgasparotto.com/wp-content/uploads/2015/05/mysql-logo.png' }
];

const projects = [
    {
        id: 1,
        title: 'Uni Lux',
        description: 'A promotional landing page for a luxury bag business based in metro manila',
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

const experiences = [
    {
        id: 1,
        date: 'June 2025 - Present',
        title: 'Front-End Web Developer — Awork Company, Denmark',
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
        title: 'Front-End Web Developer Intern — Awork Company, Denmark',
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
    }
]

// Refs for sections and visibility states
const textContainer = ref<HTMLElement | null>(null)
const techSection = ref<HTMLElement | null>(null)
const projectsSection = ref<HTMLElement | null>(null)
const experienceTitle = ref<HTMLElement | null>(null)
const experienceItems = ref<HTMLElement[]>([])

const textVisible = ref(false)
const techVisible = ref(false)
const projectsVisible = ref(false)
const experienceTitleVisible = ref(false)
const experienceItemsVisible = ref<boolean[]>([])

function handleClick() {
    const img = document.getElementById('heroImage') as HTMLImageElement | null;
    if (img) {
        img.src = '/alden_pose.png';
    } else {
        console.warn("Image with ID 'heroImage' not found.");
    }
}

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
        experienceItems.value.forEach((item, index) => {
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

<style scoped>
/* Minimal custom styles */
@media (max-width: 768px) {
    .tracking-wide {
        letter-spacing: 0.1em;
    }
}


@keyframes slideIn {
    0% {
        transform: translateX(-100%);
        opacity: 0;
    }

    100% {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideInRight {
    0% {
        transform: translateX(100%);
        opacity: 0;
    }

    100% {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes fadeInUp {
    0% {
        transform: translateY(30px);
        opacity: 0;
    }

    100% {
        transform: translateY(0);
        opacity: 1;
    }
}

@keyframes slideInStagger {
    0% {
        transform: translateX(50px);
        opacity: 0;
    }

    100% {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideInLeft {
    0% {
        transform: translateX(-50px);
        opacity: 0;
    }

    100% {
        transform: translateX(0);
        opacity: 1;
    }
}

.animate-slideIn {
    animation: slideIn 1s ease-out forwards;
}

.animate-slideInRight {
    animation: slideInRight 1s ease-out forwards;
}

.animate-fadeInUp {
    animation: fadeInUp 1s ease-out forwards;
}

.animate-slideInStagger {
    animation: slideInStagger 1s ease-out forwards;
}

.animate-slideInLeft {
    animation: slideInLeft 1s ease-out forwards;
}

.halftone-bg {
    background-image: radial-gradient(rgba(28, 28, 28, 0.18) 1px, transparent 1px);
    background-size: 14px 14px;
    mask-image: radial-gradient(ellipse at center, black 30%, transparent 75%);
    -webkit-mask-image: radial-gradient(ellipse at center, black 30%, transparent 75%);
}

.halftone-radial {
    background-image: radial-gradient(rgba(28, 28, 28, 0.35) 1.5px, transparent 1.8px);
    background-size: 10px 10px;
    mask-image: radial-gradient(circle, black 40%, transparent 70%);
    -webkit-mask-image: radial-gradient(circle, black 40%, transparent 70%);
}

.halftone-card {
    background-image: radial-gradient(rgba(28, 28, 28, 0.22) 1.2px, transparent 1.5px);
    background-size: 12px 12px;
    mask-image: radial-gradient(ellipse at 50% 40%, black 55%, transparent 90%);
    -webkit-mask-image: radial-gradient(ellipse at 50% 40%, black 55%, transparent 90%);
}

.hero-grain {
    background-image:
        repeating-linear-gradient(45deg, rgba(28, 28, 28, 0.08) 0 2px, transparent 2px 6px),
        repeating-linear-gradient(-45deg, rgba(28, 28, 28, 0.06) 0 2px, transparent 2px 6px);
    mask-image: radial-gradient(circle, black 50%, transparent 80%);
    -webkit-mask-image: radial-gradient(circle, black 50%, transparent 80%);
}
</style>
