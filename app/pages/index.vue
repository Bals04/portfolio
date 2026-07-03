<template>
  <div id="top">
    <!-- Loader -->
    <Transition name="fade">
      <div v-if="isLoading"
        class="fixed inset-0 z-[60] flex flex-col items-center justify-center overflow-hidden bg-bg">

        <div class="relative z-10 flex flex-col items-center text-ink">
          <!-- Monogram with concentric rings -->
          <div class="relative mb-8 flex h-32 w-32 items-center justify-center sm:mb-10 sm:h-40 sm:w-40">
            <svg class="absolute inset-0 h-full w-full animate-spin-slow" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" stroke-opacity="0.12" stroke-width="1" />
              <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" stroke-width="1"
                stroke-dasharray="20 280" stroke-linecap="round" />
            </svg>
            <svg class="absolute inset-2 h-[calc(100%-1rem)] w-[calc(100%-1rem)] animate-spin-reverse"
              viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" stroke-opacity="0.1" stroke-width="1" />
              <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" stroke-width="1.5"
                stroke-dasharray="8 268" stroke-linecap="round" />
            </svg>

            <div class="relative text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">JB</div>
          </div>

          <div class="text-xs font-medium uppercase tracking-[0.3em] text-ink sm:text-sm">
            Preparing portfolio
          </div>
        </div>

        <div
          class="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-g400">
          © {{ year }} — jb.dev
        </div>
      </div>
    </Transition>

    <!-- Main Content -->
    <Transition name="fade">
      <div v-if="!isLoading" class="bg-bg text-ink">
        <Title>Jonhyl Balsamo — Web Developer</Title>
        <Nav />
        <main class="pb-28">
          <Hero />
          <Projects />
          <PersonalProjects />
          <Experience />
          <TechStack />
        </main>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isLoading = ref(true)
const year = 2026
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
</style>
