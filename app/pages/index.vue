<template>
  <div class="bg-white text-gray-800">
    <section
      class="relative bg-gradient-to-br from-white via-gray-100 to-gray-200 py-16 md:py-24 transition-opacity duration-1000">

      <div class="max-w-7xl mx-auto px-6 min-h-screen flex items-center justify-center">
        <div class="flex flex-col lg:flex-row items-center justify-center w-full">
          <!-- Left column with text and button -->
          <div class="lg:w-3/5 lg:pr-12 z-10">
            <div ref="textContainer" class="animate-slideIn opacity-100 transition-opacity duration-1000">
              <div class="mb-8">
                <span class="inline-block px-4 py-1 bg-[#1c1c1c] text-white text-md font-medium rounded-full mb-4">Web
                  Developer</span>
              </div>
              <h1 class="text-6xl md:text-7xl font-extrabold tracking-tight mb-6 text-[#1c1c1c]">
                <span class="block">Hello, I'm</span>
                <span class="block bg-gradient-to-r from-[#1c1c1c] to-gray-500 bg-clip-text text-transparent">Jonhyl
                  Balsamo</span>
              </h1>
              <p class="text-xl text-gray-600 max-w-2xl">
                From concept to launch, I create websites that give businesses the online presence they need to succeed.
              </p>
            </div>
            <div ref="textContainer" :class="textVisible ? 'animate-slideIn opacity-100' : 'opacity-0'"
              class="flex flex-wrap gap-4">
              <div class="mt-16 text-center">
                <a href="https://facebook.com/jj.balsamo"
                  class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#1c1c1c] to-gray-600 text-white font-medium rounded-md">
                  <span>Let's work together</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 ml-2">
                    <path fill-rule="evenodd"
                      d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                      clip-rule="evenodd" />
                  </svg>
                </a>
                <div class="flex items-center mt-16 justify-center lg:justify-start gap-6">
                  <span class="text-sm text-gray-500 font-medium">Socials:</span>
                  <a href="https://github.com/bals04" class="text-[#1c1c1c] hover:text-gray-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                      fill="currentColor">
                      <path
                        d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                  <a href="https://facebook.com/jj.balsamo"
                    class="text-[#1c1c1c] hover:text-gray-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                      fill="currentColor">
                      <path
                        d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Right column with image and decorative elements -->
          <div ref="textContainer" :class="textVisible ? 'animate-slideInRight opacity-100' : 'opacity-0'"
            class="lg:w-2/5 mt-12 lg:mt-0 relative">
            <div class="relative z-10">
              <div class="absolute -top-5 -left-5 w-full h-full bg-gradient-to-r from-[#1c1c1c] to-gray-400 opacity-60">
              </div>
              <div
                class="absolute -bottom-5 -right-5 w-full h-full bg-gradient-to-l from-[#1c1c1c] to-gray-200 opacity-40">
              </div>
              <div class="relative z-20 overflow-hidden shadow-2xl">
                <img id="heroImage" src="/hero-1.jpg" alt="Jonhyl Balsamo" class="w-full h-full object-cover" />
              </div>
            </div>

            <!-- Decorative dots pattern -->
            <div class="absolute -bottom-8 -left-8 w-24 h-24 z-0">
              <div class="grid grid-cols-4 gap-2">
                <div class="w-3 h-3 rounded-full bg-[#1c1c1c] opacity-50"></div>
                <div class="w-3 h-3 rounded-full bg-[#1c1c1c] opacity-60"></div>
                <div class="w-3 h-3 rounded-full bg-[#1c1c1c] opacity-20"></div>
                <div class="w-3 h-3 rounded-full bg-[#1c1c1c] opacity-10"></div>
                <div class="w-3 h-3 rounded-full bg-[#1c1c1c] opacity-30"></div>
                <div class="w-3 h-3 rounded-full bg-[#1c1c1c] opacity-40"></div>
                <div class="w-3 h-3 rounded-full bg-[#1c1c1c] opacity-30"></div>
                <div class="w-3 h-3 rounded-full bg-[#1c1c1c] opacity-20"></div>
                <div class="w-3 h-3 rounded-full bg-[#1c1c1c] opacity-20"></div>
                <div class="w-3 h-3 rounded-full bg-[#1c1c1c] opacity-30"></div>
                <div class="w-3 h-3 rounded-full bg-[#1c1c1c] opacity-40"></div>
                <div class="w-3 h-3 rounded-full bg-[#1c1c1c] opacity-30"></div>
                <div class="w-3 h-3 rounded-full bg-[#1c1c1c] opacity-10"></div>
                <div class="w-3 h-3 rounded-full bg-[#1c1c1c] opacity-20"></div>
                <div class="w-3 h-3 rounded-full bg-[#1c1c1c] opacity-30"></div>
                <div class="w-3 h-3 rounded-full bg-[#1c1c1c] opacity-20"></div>
              </div>
            </div>

            <!-- Tech stack icons -->
            <div
              class="absolute -top-6 -right-6 flex items-center justify-center bg-white p-3 rounded-full shadow-lg z-20">
              <div class="text-[#1c1c1c]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6">
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Minimal Projects Section -->

    <!-- Elegant Minimal Projects Section -->
    <section ref="projectsSection" class="py-32 bg-gray-50">
      <div class="max-w-5xl mx-auto px-6">
        <!-- Elegant Header -->
        <div class="mb-24 text-center" :class="projectsVisible ? 'opacity-100' : 'opacity-0'"
          :style="projectsVisible ? 'transform: translateY(0); transition: all 0.8s ease-out;' : 'transform: translateY(20px); transition: all 0.8s ease-out;'">

          <h1 class="text-3xl font-medium text-slate-800 mb-8 tracking-tight">
            Projects
          </h1>

          <div class="w-8 h-px bg-gray-500 mx-auto"></div>
        </div>

        <!-- Elegant Project Grid -->
        <div class="space-y-24">
          <div v-for="(project, index) in projects" :key="project.id"
            :class="projectsVisible ? 'opacity-100' : 'opacity-0'" :style="projectsVisible ?
              `transform: translateY(0); transition: all 0.8s ease-out; transition-delay: ${index * 0.15}s;` :
              `transform: translateY(30px); transition: all 0.8s ease-out; transition-delay: ${index * 0.15}s;`"
            class="group cursor-pointer">

            <!-- Project Number & Title -->
            <div class="flex items-baseline justify-between mb-6 pb-4" style="border-bottom: 1px solid #e2e8f0;">
              <div class="flex items-baseline gap-8">
                <span
                  class="text-xs font-medium text-white bg-slate-800 rounded-full p-1 tracking-[0.2em] grid place-items-center"
                  style="min-width: 40px;">
                  {{ String(index + 1).padStart(2, '0') }}
                </span>

                <h3 class="text-xl font-medium text-slate-600 tracking-tight">
                  {{ project.title }}
                </h3>
              </div>
            </div>

            <!-- Project Image -->
            <div class="relative mb-8 overflow-hidden rounded-xl" style="aspect-ratio: 16/9;">
              <img :src="project.image" :alt="project.title"
                class="w-full h-full object-cover transition-all duration-700 group-hover:scale-105">
            </div>

            <!-- Project Info -->
            <div class="grid md:grid-cols-3 gap-8">
              <!-- Description -->
              <div class="md:col-span-2">
                <p class="text-lg leading-relaxed text-slate-600 font-medium">
                  {{ project.description }}
                </p>
              </div>

              <!-- Tech Stack -->
              <div class="md:col-span-1">
                <div class="mb-3">
                  <span class="text-xs font-medium text-gray-600 tracking-[0.1em] uppercase">Technology</span>
                </div>
                <div class="flex flex-wrap gap-2">
                  <span v-for="tech in project.technology.split(', ')" :key="tech"
                    class="inline-block px-3 py-1 bg-gray-600 text-white text-xs font-medium rounded-full">
                    {{ tech }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Experience Section with Animation -->
    <section class="py-16 bg-gradient-to-br from-white via-gray-100 to-gray-200 text-gray-800">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 ref="experienceTitle" class="text-3xl sm:text-4xl font-bold text-center text-[#1c1c1c] mb-16"
          :class="experienceTitleVisible ? 'animate-fadeInUp opacity-100' : 'opacity-0 translate-y-8'"
          style="transition: all 1s ease-out;">Experience</h2>

        <div class="relative">
          <!-- Timeline Line -->
          <div
            class="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-300 via-gray-400 to-gray-300 transform md:-translate-x-px">
          </div>

          <div class="space-y-12">
            <div v-for="(exp, index) in experiences" :key="exp.id" :ref="el => experienceItems[index] = el" :class="[
              experienceItemsVisible[index] ? 'animate-fadeInUp opacity-100' : 'opacity-0 translate-y-8',
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            ]" style="transition: all 1s ease-out;" class="relative flex flex-col md:flex-row md:items-center">

              <!-- Timeline Dot -->
              <div
                class="absolute left-4 md:left-1/2 w-4 h-4 bg-[#1c1c1c] rounded-full transform -translate-x-2 md:-translate-x-2 z-10 shadow-lg border-4 border-white">
              </div>

              <!-- Content Card -->
              <div :class="index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'"
                class="ml-12 md:ml-0 md:w-1/2 bg-white rounded-lg p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">

                <!-- Date Badge -->
                <div :class="index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'" class="flex justify-start mb-3">
                  <span class="bg-[#1c1c1c] text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {{ exp.date }}
                  </span>
                </div>

                <!-- Title and Description -->
                <h3 class="text-xl sm:text-2xl font-bold text-[#1c1c1c] mb-3">
                  {{ exp.title }}
                </h3>
                <p class="text-base sm:text-lg text-gray-700 mb-4 leading-relaxed">
                  {{ exp.description }}
                </p>

                <!-- Technologies -->
                <div :class="index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'"
                  class="flex flex-wrap gap-2 justify-start">
                  <span v-for="tech in exp.technologies" :key="tech.name"
                    class="bg-gray-50 border border-gray-200 text-[#1c1c1c] py-1 px-3 rounded-full text-sm flex items-center gap-2 hover:bg-gray-100 transition-colors">
                    <img :src="tech.icon" :alt="tech.name" class="h-4 w-4" />
                    {{ tech.name }}
                  </span>
                </div>
              </div>

              <!-- Spacer for alignment -->
              <div class="hidden md:block md:w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tech Stack Section with Animation -->
    <section ref="techSection" class="py-20 bg-gradient-to-br from-white via-gray-100 to-gray-200 text-gray-800">
      <div class="max-w-6xl mx-auto px-8">
        <div class="mb-16 text-center" :class="techVisible ? 'animate-fadeInUp opacity-100' : 'opacity-0 translate-y-8'"
          style="transition: all 1s ease-out;">
          <span
            class="inline-block px-3 py-1 bg-[#1c1c1c] bg-opacity-10 text-[#1c1c1c] text-sm font-medium rounded-full mb-3">My
            Toolkit</span>
          <h2 class="text-4xl font-bold text-[#1c1c1c] mb-4">Technologies</h2>
          <div class="w-24 h-1 bg-[#1c1c1c] mx-auto"></div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          <div v-for="(tech, index) in techStack" :key="tech.name"
            :class="techVisible ? 'animate-fadeInUp opacity-100' : 'opacity-0 translate-y-8'"
            :style="`transition: all 1s ease-out; transition-delay: ${index * 0.1}s;`"
            class="group relative flex flex-col items-center bg-white p-6 rounded-xl shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-2">
            <div
              class="absolute inset-0 bg-[#1c1c1c] opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-300">
            </div>
            <div class="w-16 h-16 mb-4 flex items-center justify-center">
              <img :src="tech.logo" :alt="tech.name" class="max-w-full max-h-full object-contain" />
            </div>
            <p class="text-lg font-semibold text-[#1c1c1c] text-center">{{ tech.name }}</p>
            <div class="mt-2 h-1 w-0 group-hover:w-16 bg-[#1c1c1c] transition-all duration-300"></div>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
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
      if (entry.isIntersecting) {
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
            if (entry.isIntersecting) {
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
</style>