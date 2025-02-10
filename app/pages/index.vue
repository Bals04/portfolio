<template>
  <div class="bg-black text-gray-200">
    <section class="relative py-32 bg-gradient-to-br from-black via-gray-900 to-gray-800">
      <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <!-- Left section (text) -->
        <div
          class="text-center md:text-left transform -translate-x-full opacity-0 transition-all duration-1000 ease-out animate-slideIn">
          <h1 class="text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-gray-100">
            Hi, I'm <span class="text-gray-400">Jonhyl</span>
          </h1>
          <p class="text-lg md:text-xl text-gray-400 mb-10">
            I specialize in building websites that are both aesthetically pleasing and functionally perfect. Elevate your business with a
            custom website let’s connect and discuss how we can make it happen.
          </p>

          <!-- Social Media Icons -->
          <div class="flex justify-center md:justify-start space-x-6">
            <div v-for="social in socialMediaLinks" :key="social.name">
              <a :href="social.url" target="_blank" class="text-gray-400 hover:text-white transition-all duration-300">
                <img :src="social.logo" alt="social.name" class="w-8 h-8 object-contain" />
              </a>
            </div>
          </div>
        </div>


        <!-- Right section (image) -->
        <div
          class="flex justify-center transform translate-x-full opacity-0 transition-all duration-1000 ease-out animate-slideInRight"
          style="animation-delay: 0.5s;">
          <img src="/hero-image.png" alt="Hero Image" class="rounded-lg" />
        </div>
      </div>
    </section>
    <section class="py-20 bg-gradient-to-br from-black via-gray-900 to-gray-800 text-gray-100">
      <div class="max-w-6xl mx-auto px-8">
        <h2 class="text-4xl font-bold text-center text-gray-100 mb-12">Technologies</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div v-for="tech in techStack" :key="tech.name"
            class="flex flex-col items-center space-y-4 transition-transform duration-300 ease-in-out hover:scale-110">
            <img :src="tech.logo" :alt="tech.name" class="w-16 h-16 object-contain" />
            <p class="text-lg font-semibold">{{ tech.name }}</p>
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



    <Footer />
  </div>
</template>

<script lang="ts" setup>

const socialMediaLinks = [
  { name: 'GitHub', url: 'https://github.com/bals04', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Github_logo_svg.svg/640px-Github_logo_svg.svg.png' },
  { name: 'Facebook', url: 'https://facebook.com/jj.balsamo', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg' },
  { name: 'Instagram', url: 'https://instagram.com/yourusername', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Instagram_logo_2022.svg' }
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
  animation-delay: 1s;
}
</style>
