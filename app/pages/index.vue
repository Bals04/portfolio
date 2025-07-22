<template>
  <div class="bg-white text-gray-800">
    <section
      class="relative bg-gradient-to-br from-white via-gray-100 to-gray-200 py-16 md:py-24 transition-opacity duration-1000">

      <div class="max-w-7xl mx-auto px-6 min-h-screen flex items-center justify-center">
        <div class="flex flex-col lg:flex-row items-center justify-center w-full">
          <!-- Left column with text and button -->
          <div class="lg:w-3/5 lg:pr-12 z-10">
            <div ref="textContainer" :class="textVisible ? 'animate-slideIn opacity-100' : 'opacity-0'"
              class="transition-opacity duration-1000">
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
    <!-- Projects Section with Animation -->
    <section ref="projectsSection" class="py-20 bg-gray-100">
      <div class="max-w-6xl mx-auto px-8">
        <div class="mb-16 text-center"
          :class="projectsVisible ? 'animate-fadeInUp opacity-100' : 'opacity-0 translate-y-8'"
          style="transition: all 1s ease-out;">
          <span
            class="inline-block px-3 py-1 bg-[#1c1c1c] bg-opacity-10 text-[#1c1c1c] text-sm font-medium rounded-full mb-3">Portfolio</span>
          <h2 class="text-4xl font-bold text-[#1c1c1c] mb-4">Featured Projects</h2>
          <div class="w-24 h-1 bg-[#1c1c1c] mx-auto"></div>
        </div>

        <div v-for="(project, index) in projects" :key="project.id"
          :class="projectsVisible ? 'animate-slideInStagger opacity-100' : 'opacity-0 translate-x-12'"
          :style="`transition: all 1s ease-out; transition-delay: ${index * 0.3}s;`"
          class="flex flex-col md:flex-row gap-8 mb-24 bg-white rounded-xl overflow-hidden shadow-xl">
          <!-- Image Section -->
          <div class="md:w-1/2" :class="index % 2 === 0 ? 'md:order-1' : 'md:order-2'">
            <div class="relative h-full">
              <img :src="project.image" :alt="project.title" class="w-full h-full object-cover">
              <div class="absolute inset-0 bg-[#1c1c1c] opacity-0 hover:opacity-20 transition-opacity duration-300">
              </div>
            </div>
          </div>

          <!-- Content Section -->
          <div class="md:w-1/2 p-8 lg:p-10 flex flex-col justify-center"
            :class="index % 2 === 0 ? 'md:order-2' : 'md:order-1'">
            <h3 class="text-2xl lg:text-3xl font-bold text-[#1c1c1c] mb-4">{{ project.title }}</h3>
            <p class="text-gray-700 mb-6">{{ project.description }}</p>

            <div class="mb-6">
              <p class="text-sm font-medium text-[#1c1c1c] mb-3">Technologies:</p>
              <div class="flex flex-wrap gap-2">
                <span v-for="tech in project.technology.split(', ')" :key="tech"
                  class="inline-block px-3 py-1 bg-[#1c1c1c] text-gray-200 text-xs font-medium rounded-md">
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Experience Section with Animation -->
    <section class="py-16 bg-gradient-to-br from-white via-gray-100 to-gray-200 text-gray-800">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 ref="experienceTitle" class="text-3xl sm:text-4xl font-bold text-center text-[#1c1c1c] mb-12"
          :class="experienceTitleVisible ? 'animate-fadeInUp opacity-100' : 'opacity-0 translate-y-8'"
          style="transition: all 1s ease-out;">Experience</h2>

        <div class="space-y-12">
          <div v-for="(exp, index) in experiences" :key="exp.id" :ref="el => experienceItems[index] = el"
            :class="experienceItemsVisible[index] ? 'animate-fadeInUp opacity-100' : 'opacity-0 translate-y-8'"
            style="transition: all 1s ease-out;" class="grid md:grid-cols-2 gap-8 items-center">
            <!-- Left Column -->
            <div class="text-center md:text-left">
              <h3 class="text-xl sm:text-2xl font-semibold text-[#1c1c1c] mb-2">
                {{ exp.date }}
              </h3>
            </div>
            <!-- Right Column -->
            <div class="text-center md:text-left max-w-3xl mx-auto">
              <p class="text-xl sm:text-2xl font-bold text-[#1c1c1c] mb-4">{{ exp.title }}</p>
              <p class="text-base sm:text-lg text-gray-700 mb-4">{{ exp.description }}</p>
              <p class="text-sm sm:text-base text-gray-700 flex flex-wrap gap-4 justify-center">
                <span v-for="tech in exp.technologies" :key="tech.name"
                  class="bg-white border border-gray-200 text-[#1c1c1c] py-1 px-2 rounded-md flex items-center gap-2 shadow-sm">
                  <img :src="tech.icon" :alt="tech.name" class="h-5 w-5" />
                  {{ tech.name }}
                </span>
              </p>
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
    title: 'E-Voting System',
    description: 'An E-Voting System is a digital platform that allows voters to cast their votes electronically instead of using traditional paper ballots. It ensures a secure, transparent, and efficient voting process.',
    technology: 'Reactjs, TypeScript, Tailwind CSS, Node.js, Express, MySQL, Supabase',
    image: '/evotingimg.png'
  },
  {
    id: 2,
    title: 'Flexperience',
    description: 'A web-based solution bringing gym owners, trainers, and fitness enthusiasts together in a unified fitness management platform.',
    technology: 'HTML, CSS, Tailwind CSS, Node.js, Express, MySQL, Socket.io, Supabase',
    image: '/flexperience.png'
  },
  {
    id: 3,
    title: 'Eagle Mountain College Enrollment System',
    description: 'An enrollment system allows users to easily register, track, and manage their participation in programs, courses, or events. It streamlines the process for both administrators and participants, offering a seamless experience for signing up, scheduling, and confirming attendance. Perfect for schools, gyms, or any organization that offers structured programs.',
    technology: 'C#, MySQL',
    image: '/enrollmentSystem.png'
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