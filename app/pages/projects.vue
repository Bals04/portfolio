<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <aside class="w-64 bg-gray-800 text-white p-6">
      <div class="mb-10">
        <h2 class="text-3xl font-semibold">MOCK DESIGN ONLIII</h2>
      </div>
      <ul class="space-y-6">
        <li><a href="#" class="hover:text-blue-400">Overview</a></li>
        <li><a href="#" class="hover:text-blue-400">SEO Analytics</a></li>
        <li><a href="#" class="hover:text-blue-400">Traffic Reports</a></li>
        <li><a href="#" class="hover:text-blue-400">Keyword Insights</a></li>
        <li><a href="#" class="hover:text-blue-400">User Management</a></li>
        <li><a href="#" class="hover:text-blue-400">Settings</a></li>
      </ul>
    </aside>
    <main class="flex-1 bg-gray-100 p-6">
      <div class="mb-10">
        <h2 class="text-4xl font-semibold text-gray-800">SEO Management Dashboard Mock DESIGN ONLY (VISUALIZATION)</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
        <div class="bg-white shadow-xl rounded-lg p-8 hover:shadow-2xl transition-all duration-300">
          <h3 class="text-xl font-medium text-gray-600 mb-6">Total Visitors</h3>
          <p class="text-4xl font-bold text-blue-600">42,560</p>
          <p class="text-gray-500 mt-2">Last 30 days</p>
        </div>
        <div class="bg-white shadow-xl rounded-lg p-8 hover:shadow-2xl transition-all duration-300">
          <h3 class="text-xl font-medium text-gray-600 mb-6">Bounce Rate</h3>
          <p class="text-4xl font-bold text-red-500">32%</p>
          <p class="text-gray-500 mt-2">Down by 4% this week</p>
        </div>
        <div class="bg-white shadow-xl rounded-lg p-8 hover:shadow-2xl transition-all duration-300">
          <h3 class="text-xl font-medium text-gray-600 mb-6">Top Keywords</h3>
          <ul class="space-y-2">
            <li class="text-gray-500">Web Development</li>
            <li class="text-gray-500">SEO Optimization</li>
            <li class="text-gray-500">Vue.js Dashboard</li>
          </ul>
        </div>
      </div>

      <!-- Graphs Section -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
        <div class="bg-white shadow-xl rounded-lg p-8 hover:shadow-2xl transition-all duration-300">
          <h3 class="text-xl font-medium text-gray-600 mb-6">Traffic Overview</h3>
          <TrafficChart />
        </div>
        <div class="bg-white shadow-xl rounded-lg p-8 hover:shadow-2xl transition-all duration-300">
          <h3 class="text-xl font-medium text-gray-600 mb-6">Keyword Performance</h3>
          <KeywordChart />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>

</script>

<style scoped>
/* Sidebar */
aside {
  background-color: #1f2937;
}

/* Navbar */
header {
  background-color: #ffffff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

/* Search input */
input[type="text"] {
  width: 250px;
}

/* Avatar styling */
img {
  object-fit: cover;
}
</style>
