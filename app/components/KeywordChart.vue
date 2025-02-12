<template>
    <canvas id="keywordChart"></canvas>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { Chart } from 'chart.js/auto';

onMounted(() => {
    const ctx = (document.getElementById('keywordChart') as HTMLCanvasElement).getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Keyword 1', 'Keyword 2', 'Keyword 3', 'Keyword 4'],
            datasets: [
                {
                    label: 'Keyword Performance',
                    data: [50, 75, 120, 90],
                    backgroundColor: '#3b82f6',
                    borderColor: '#2563eb',
                    borderWidth: 1,
                },
            ],
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });
});
</script>

<style scoped>
canvas {
    max-height: 300px;
}
</style>