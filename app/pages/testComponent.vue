<template>
    <div class="p-8">
        <h2 class="text-2xl font-bold mb-6">Pinia Test/CitizenOne dashboard filter feature</h2>

        <!-- Checkboxes -->
        <div class="mb-6 space-y-2">
            <div>
                <input type="checkbox" id="toggleDivOne" class="mr-2 cursor-pointer"
                    :checked="filterStore.dailyOverviewFilter.showDivOne" @change="toggleDivOne" />
                <label for="toggleDivOne" class="cursor-pointer">Show Div One</label>
            </div>
            <div>
                <input type="checkbox" id="toggleDivTwo" class="mr-2 cursor-pointer"
                    :checked="filterStore.dailyOverviewFilter.showDivTwo" @change="toggleDivTwo" />
                <label for="toggleDivTwo" class="cursor-pointer">Show Div Two</label>
            </div>
            <div>
                <input type="checkbox" id="toggleDivThree" class="mr-2 cursor-pointer"
                    :checked="filterStore.dailyOverviewFilter.showDivThree" @change="toggleDivThree" />
                <label for="toggleDivThree" class="cursor-pointer">Show Div Three</label>
            </div>
        </div>

        <!-- Styled Divs -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- Div One -->
            <div v-if="filterStore.dailyOverviewFilter.showDivOne"
                class="bg-white shadow-md rounded-md border-l-8 border-teal-600 flex flex-col items-center justify-center min-h-96 max-h-96 text-sm mt-2">
                <h3 class="text-lg font-semibold">Div One</h3>
                <p>This is the first div. It's currently visible.</p>
            </div>

            <!-- Div Two -->
            <div v-if="filterStore.dailyOverviewFilter.showDivTwo"
                class="bg-white shadow-md rounded-md border-l-8 border-green-600 flex flex-col items-center justify-center min-h-96 max-h-96 text-sm mt-2">
                <h3 class="text-lg font-semibold">Div Two</h3>
                <p>This is the second div. It's currently visible.</p>
            </div>

            <!-- Div Three -->
            <div v-if="filterStore.dailyOverviewFilter.showDivThree"
                class="bg-white shadow-md rounded-md border-l-8 border-red-600 flex flex-col items-center justify-center min-h-96 max-h-96 text-sm mt-2">
                <h3 class="text-lg font-semibold">Div Three</h3>
                <p>This is the third div. It's currently visible.</p>
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
/* Add additional custom styles if needed */
</style>