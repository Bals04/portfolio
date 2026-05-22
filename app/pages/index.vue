<template>
  <div>
    <!-- Loader -->
    <Transition name="fade">
      <div v-if="isLoading"
        class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-white via-gray-50 to-gray-200 overflow-hidden">

        <!-- Subtle grid pattern bg -->
        <div class="absolute inset-0 loader-grid opacity-40 pointer-events-none"></div>

        <!-- Center stack -->
        <div class="relative z-10 flex flex-col items-center">

          <!-- Monogram with concentric rings -->
          <div class="relative w-40 h-40 flex items-center justify-center mb-10">
            <!-- outer slow ring -->
            <svg class="absolute inset-0 w-full h-full animate-spin-slow" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="48" fill="none" stroke="#1c1c1c" stroke-opacity="0.08"
                stroke-width="1" />
              <circle cx="50" cy="50" r="48" fill="none" stroke="#1c1c1c" stroke-width="1"
                stroke-dasharray="20 280" stroke-linecap="round" />
            </svg>
            <!-- inner reverse ring -->
            <svg class="absolute inset-2 w-[calc(100%-1rem)] h-[calc(100%-1rem)] animate-spin-reverse"
              viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="44" fill="none" stroke="#1c1c1c" stroke-opacity="0.06"
                stroke-width="1" />
              <circle cx="50" cy="50" r="44" fill="none" stroke="#1c1c1c" stroke-width="1.5"
                stroke-dasharray="8 268" stroke-linecap="round" />
            </svg>

            <!-- Monogram -->
            <div
              class="relative text-5xl font-extrabold tracking-tight bg-gradient-to-br from-[#1c1c1c] to-gray-500 bg-clip-text text-transparent">
              JB
            </div>
          </div>

          <!-- Caption -->
          <div class="text-sm uppercase tracking-[0.3em] text-[#1c1c1c] font-medium">
            Preparing portfolio
          </div>
        </div>

        <!-- Bottom corner mark -->
        <div
          class="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-gray-400">
          &copy; {{ new Date().getFullYear() }} &mdash; jb.dev
        </div>
      </div>
    </Transition>

    <!-- Main Content -->
    <Transition name="fade">
      <div v-if="!isLoading" class="bg-white text-gray-800">
        <Title>Jonhyl - Web Developer</Title>
        <Hero />
        <Projects />
        <PersonalProjects />
        <Experience />
        <TechStack />
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isLoading = ref(true)
const STATIC_LOADER_DURATION = 2400

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, STATIC_LOADER_DURATION)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.7s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes spin-reverse {
  from { transform: rotate(360deg); }
  to { transform: rotate(0deg); }
}

.animate-spin-slow {
  animation: spin 6s linear infinite;
  transform-origin: center;
}

.animate-spin-reverse {
  animation: spin-reverse 4s linear infinite;
  transform-origin: center;
}

@keyframes loader-bar {
  0% { transform: translateX(-100%); }
  60% { transform: translateX(0); }
  100% { transform: translateX(100%); }
}

.loader-bar {
  width: 100%;
  animation: loader-bar 2s cubic-bezier(0.65, 0, 0.35, 1) infinite;
}

.loader-grid {
  background-image:
    linear-gradient(rgba(28, 28, 28, 0.07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(28, 28, 28, 0.07) 1px, transparent 1px);
  background-size: 40px 40px;
  mask-image: radial-gradient(ellipse at center, black 30%, transparent 75%);
  -webkit-mask-image: radial-gradient(ellipse at center, black 30%, transparent 75%);
}
</style>