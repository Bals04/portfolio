<template>
  <div>
    <!-- Loader -->
    <Transition name="fade">
      <div v-if="isLoading" class="fixed inset-0 z-50 flex items-center justify-center bg-white">
        <div class="relative">
          <!-- Rotating ring -->
          <div class="absolute inset-0 animate-spin">
            <svg class="w-32 h-32" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" stroke-width="2" />
              <circle cx="50" cy="50" r="45" fill="none" stroke="#1c1c1c" stroke-width="2" stroke-dasharray="283"
                stroke-dashoffset="70" stroke-linecap="round" />
            </svg>
          </div>

          <!-- JB Text with elegant animation -->
          <div class="relative w-32 h-32 flex items-center justify-center">
            <div class="text-5xl font-bold text-gray-800 tracking-tight">
              <span class="inline-block animate-pulse" style="animation-delay: 0ms; animation-duration: 1.5s">
                J
              </span>
              <span class="inline-block animate-pulse" style="animation-delay: 150ms; animation-duration: 1.5s">
                B
              </span>
            </div>
          </div>

          <!-- Subtle loading text -->
          <div
            class="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-sm text-[#1c1c1c] font-light tracking-widest">
            <span class="animate-pulse">LOADING</span>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Main Content -->
    <Transition name="fade">
      <div v-if="!isLoading" class="bg-white text-gray-800">
        <Title>Jonhyl - Web Developer</Title>
        <Hero />
        <Projects />
        <Experience />
        <TechStack />
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isLoading = ref(true)
const STATIC_LOADER_DURATION = 2000

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
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 2s linear infinite;
}
</style>