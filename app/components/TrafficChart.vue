<template>
    <canvas id="trafficChart"></canvas>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { Chart } from 'chart.js/auto';

onMounted(() => {
    const ctx = (document.getElementById('trafficChart') as HTMLCanvasElement).getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
                {
                    label: 'Visitors',
                    data: [500, 600, 800, 1200, 1000, 900, 700],
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.2)',
                },
            ],
        },
        options: {
            responsive: true,
        },
    });
});
</script>

<style scoped>
canvas {
    max-height: 300px;
}
</style>