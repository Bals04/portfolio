<template>
    <section class="max-w-5xl mx-auto py-16">
      <h2 class="text-3xl font-bold mb-8">My Projects</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProjectCard v-for="project in projects" :key="project.id" :title="project.title" :description="project.description" />
      </div>
    </section>
  </template>
  
  <script lang="ts" setup>
  const projects = [
    { id: 1, title: 'Project One', description: 'A modern web application built with Nuxt and Tailwind CSS.' },
    { id: 2, title: 'Project Two', description: 'An interactive dashboard with custom charts and animations.' },
    { id: 3, title: 'Project Three', description: 'A responsive portfolio showcasing various web development projects.' },
  ]
  </script>
  