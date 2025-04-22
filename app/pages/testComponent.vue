<template>
    <div class="flex min-h-screen bg-gray-100">
      <!-- Sidebar -->
      <aside class="w-64 bg-teal-600 text-white flex flex-col p-4 shadow-lg">
        <div class="text-2xl font-semibold mb-6">CitizenOne</div>
        <ul class="space-y-4">
          <li><a href="#" class="text-lg hover:text-teal-300">Dashboard</a></li>
          <li><a href="#" class="text-lg hover:text-teal-300">Analytics</a></li>
          <li><a href="#" class="text-lg hover:text-teal-300">Reports</a></li>
          <li><a href="#" class="text-lg hover:text-teal-300">Settings</a></li>
          <li><a href="#" class="text-lg hover:text-teal-300">Support</a></li>
        </ul>
      </aside>
  
      <!-- Main Content -->
      <div class="flex-1 p-8">
        <h2 class="text-2xl font-bold mb-6">Pinia Test/CitizenOne Dashboard Filter Feature</h2>
  
  <!-- Checkboxes -->
  <div class="mb-8 space-y-4">
    <div class="flex items-center space-x-4">
      <input 
        type="checkbox" 
        id="toggleDivOne" 
        class="toggle-checkbox"
        :checked="filterStore.dailyOverviewFilter.showDivOne" 
        @change="toggleDivOne"
      />
      <label for="toggleDivOne" class="text-lg font-medium cursor-pointer">Show Div One</label>
    </div>
    
    <div class="flex items-center space-x-4">
      <input 
        type="checkbox" 
        id="toggleDivTwo" 
        class="toggle-checkbox"
        :checked="filterStore.dailyOverviewFilter.showDivTwo" 
        @change="toggleDivTwo"
      />
      <label for="toggleDivTwo" class="text-lg font-medium cursor-pointer">Show Div Two</label>
    </div>
    
    <div class="flex items-center space-x-4">
      <input 
        type="checkbox" 
        id="toggleDivThree" 
        class="toggle-checkbox"
        :checked="filterStore.dailyOverviewFilter.showDivThree" 
        @change="toggleDivThree"
      />
      <label for="toggleDivThree" class="text-lg font-medium cursor-pointer">Show Div Three</label>
    </div>
  </div>
  
        <!-- Dashboard Divs -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Div One -->
          <div v-if="filterStore.dailyOverviewFilter.showDivOne"
            class="bg-white shadow-lg rounded-md border-l-8 border-teal-600 flex flex-col items-center justify-center min-h-96 max-h-96 text-sm mt-2">
            <h3 class="text-lg font-semibold">Div One</h3>
            <p>This is the first div. It's currently visible.</p>
          </div>
  
          <!-- Div Two -->
          <div v-if="filterStore.dailyOverviewFilter.showDivTwo"
            class="bg-white shadow-lg rounded-md border-l-8 border-green-600 flex flex-col items-center justify-center min-h-96 max-h-96 text-sm mt-2">
            <h3 class="text-lg font-semibold">Div Two</h3>
            <p>This is the second div. It's currently visible.</p>
          </div>
  
          <!-- Div Three -->
          <div v-if="filterStore.dailyOverviewFilter.showDivThree"
            class="bg-white shadow-lg rounded-md border-l-8 border-red-600 flex flex-col items-center justify-center min-h-96 max-h-96 text-sm mt-2">
            <h3 class="text-lg font-semibold">Div Three</h3>
            <p>This is the third div. It's currently visible.</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useFilterStore } from './store/filter'
  
  // Access the Pinia store
  const filterStore = useFilterStore()
  
  // Functions to toggle the visibility of each div
  const toggleDivOne = () => {
    filterStore.setShowDivOne(!filterStore.dailyOverviewFilter.showDivOne)
  }
  
  const toggleDivTwo = () => {
    filterStore.setShowDivTwo(!filterStore.dailyOverviewFilter.showDivTwo)
  }
  
  const toggleDivThree = () => {
    filterStore.setShowDivThree(!filterStore.dailyOverviewFilter.showDivThree)
  }
  </script>
  
  <style scoped>
  /* Sidebar styling */
  aside {
    box-shadow: 2px 0 6px rgba(0, 0, 0, 0.1);
  }
  
  /* Links in sidebar */
  aside a {
    transition: color 0.3s ease;
  }
  
  aside a:hover {
    color: #81e6d9; /* Teal color */
  }
  
  /* Main content area */
  main {
    background-color: #f7fafc;
  }
  
  /* Div styling */
  div {
    transition: transform 0.3s ease-in-out;
  }
  
  div:hover {
    transform: translateY(-5px);
  }
  </style>
  