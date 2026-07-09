<template>
  <div>
    <NuxtPage />
  </div>
</template>
<script setup>
useHead({
  script: [
    {
      src: 'https://server6611.aworkinsight.dk/browser-ui/chat-widget-loader.js',
      'data-widget-id': '1e5ed6e4-9ae4-46fd-8051-774eeee1208a',
      'data-api-base': 'https://server6611.aworkinsight.dk/api',
      async: true,
      tagPosition: 'bodyClose'
    }
  ]
})
</script>