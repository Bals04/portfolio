<template>
    <div class="border p-4 rounded-lg shadow hover:shadow-lg transition">
      <h3 class="text-2xl font-bold">{{ props.title }}</h3>
      <p class="mt-2 text-gray-600">{{ props.description }}</p>
    </div>
  </template>
  
  <script lang="ts" setup>
  const props = defineProps({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  })
  </script>
  