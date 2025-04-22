<template>
  <div>
    <NuxtPage />
  </div>
</template>
<script setup>
useHead({
  script: [
    {
      id: "awork-cmp",
      src: "https://server6611.aworkinsight.dk/browser-ui/loader.js",
      async: true,
      "data-settings-id": "30858756-6f4a-4cf7-8285-0fea070ac2d9",
    },
  ],
});
</script>