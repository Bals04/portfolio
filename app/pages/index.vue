<template>
  <div class="bg-black text-gray-200">
    <section class="relative bg-gradient-to-br from-black via-gray-900 to-gray-800">
      <div class="flex lg:flex-row flex-col gap-4 bg-surface-0 dark:bg-surface-900">
        <div class="flex-1 flex items-center justify-center">
          <div class="p-6 pt-12 lg:p-12">
            <h1 class="text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-gray-100">
              Hi, I'm <span class="text-gray-400">Jonhyl</span>
            </h1>
            <p class="text-lg md:text-xl text-gray-400 mb-10"> A web developer that creates visually stunning
              websites that deliver seamless functionality. Whether you're looking to revamp your online presence or
              build something new, let's collaborate to bring your vision to life and drive your business forward. </p>
            <div class="flex justify-center md:justify-start space-x-6">
              <div v-for="social in socialMediaLinks" :key="social.name">
                <a :href="social.url" target="_blank"
                  class="text-gray-400 hover:text-white transition-all duration-300">
                  <img :src="social.logo" alt="social.name" class="w-8 h-8 object-contain" />
                </a>
              </div>
              <a href="/projects"
                class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-all duration-300 hidden">
                My Projects
              </a>
              <a href="/testComponent"
                class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-all duration-300 hidden">
                TEST
              </a>
            </div>
          </div>
        </div>
        <div class="flex-1 overflow-hidden">
          <img src="/hero2.jpeg" alt="hero-1"
            class="h-full w-full object-cover lg:[clip-path:polygon(12%_0,100%_0%,100%_100%,0_100%)]" />
        </div>
      </div>
    </section>
    <section class="py-20 bg-gradient-to-br from-black via-gray-900 to-gray-800 text-gray-100">
      <div class="max-w-6xl mx-auto px-8">
        <h2 class="text-4xl font-bold text-center text-gray-100 mb-12">Technologies</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div v-for="tech in techStack" :key="tech.name"
            class="flex flex-col items-center space-y-4 transition-transform duration-300 ease-in-out hover:scale-110 bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl">
            <img :src="tech.logo" :alt="tech.name" class="w-16 h-16 object-contain" />
            <p class="text-lg font-semibold text-gray-100">{{ tech.name }}</p>
          </div>
        </div>
      </div>

    </section>
    <section class="py-20 bg-gray-900">
      <div class="max-w-6xl mx-auto px-8">
        <h2 class="text-4xl font-bold text-center text-gray-100 mb-12">Projects</h2>
        <div v-for="project in projects" :key="project.id" class="grid md:grid-cols-2 gap-8 mb-16 items-center">
          <div>
            <h3 class="text-2xl font-semibold text-gray-100 mb-4">{{ project.title }}</h3>
            <p class="text-gray-300 mb-4">{{ project.description }}</p>
            <p class="text-sm text-gray-400">Technologies used: <span class="text-teal-400">{{ project.technology
                }}</span></p>
          </div>

          <div>
            <img :src="project.image" :alt="project.title" class="rounded-lg shadow-lg object-cover w-full h-full">
          </div>
        </div>
      </div>
    </section>
    <section class="py-16 bg-gradient-to-br from-black via-gray-900 to-gray-800 text-gray-100">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl sm:text-4xl font-bold text-center text-gray-100 mb-12">Experience</h2>

        <div class="space-y-12">
          <div class="grid md:grid-cols-2 gap-8 items-center">
            <!-- Left Column (Date) -->
            <div class="text-center md:text-left">
              <h3 class="text-xl sm:text-2xl font-semibold text-gray-100 mb-2">January 2025 - Present</h3>
            </div>

            <!-- Right Column (Experience Details) -->
            <div class="text-center md:text-left max-w-3xl mx-auto">
              <p class="text-xl sm:text-2xl font-bold text-white mb-4">Front-end Web Developer (Internship) - Awork
                Company, Denmark</p>
              <p class="text-base sm:text-lg text-gray-300 mb-4">
                Contributed to the development of CitizenOne Website using NuxtJS, Laravel, and Typescript. Collaborated
                with senior developers to implement new features, troubleshoot bugs, and optimize web performance.
              </p>
              <p class="text-sm sm:text-base text-gray-300 flex flex-wrap gap-4 justify-center">
                <span class="bg-gray-700 text-white py-1 px-2 rounded-md flex items-center gap-2">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Laravel.svg" alt="Laravel"
                    class="h-5 w-5" />
                  Laravel
                </span>
                <span class="bg-gray-700 text-white py-1 px-2 rounded-md flex items-center gap-2">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/a/ae/Nuxt_logo.svg" alt="Nuxt.js"
                    class="h-5 w-5" />
                  Nuxt.js
                </span>
                <span class="bg-gray-700 text-white py-1 px-2 rounded-md flex items-center gap-2">
                  <img src="https://bgasparotto.com/wp-content/uploads/2015/05/mysql-logo.png" alt="MySQL"
                    class="h-5 w-5" />
                  MySQL
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script lang="ts" setup>

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
    title: 'Flexperience',
    description: 'A web-based solution bringing gym owners, trainers, and fitness enthusiasts together in a unified fitness management platform.',
    technology: 'HTML, CSS, Tailwind CSS, Node.js, Express, MySQL, Socket.io, Supabase',
    image: '/flexperience.png'
  },
  {
    id: 2,
    title: 'Eagle Mountain College Enrollment System',
    description: 'An enrollment system allows users to easily register, track, and manage their participation in programs, courses, or events. It streamlines the process for both administrators and participants, offering a seamless experience for signing up, scheduling, and confirming attendance. Perfect for schools, gyms, or any organization that offers structured programs.',
    technology: 'C#, MySQL',
    image: '/enrollmentSystem.png'
  }
];

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

.animate-slideIn {
  animation: slideIn 1s ease-out forwards;
}

.animate-slideInRight {
  animation: slideInRight 1s ease-out forwards;

}
</style>
