<template>
    <form class="space-y-4" @submit.prevent="handleSubmit">
      <input v-model="form.name" type="text" placeholder="Your Name" class="w-full p-2 border rounded" />
      <input v-model="form.email" type="email" placeholder="Your Email" class="w-full p-2 border rounded" />
      <textarea v-model="form.message" placeholder="Your Message" class="w-full p-2 border rounded" rows="4"></textarea>
      <button type="submit" class="bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600">
        Send Message
      </button>
    </form>
  </template>
  
  <script lang="ts" setup>
  import { reactive } from 'vue'
  
  const form = reactive({
    name: '',
    email: '',
    message: '',
  })
  
  const handleSubmit = () => {
    console.log('Form submitted:', form)
  }
  </script>
  