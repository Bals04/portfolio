<template>
    <section class="py-20 bg-gray-50">
        <div class="max-w-7xl mx-auto px-6">

            <h1 class="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-12 tracking-tight">
                Technologies
            </h1>

            <div class="grid md:grid-cols-3 gap-x-12 gap-y-16">

                <div v-for="category in categories" :key="category.title">

                    <h3 class="text-2xl font-bold text-slate-800 pb-2 mb-6 tracking-tight">
                        {{ category.title }}
                    </h3>

                    <div class="grid grid-cols-3 gap-4">
                        <div v-for="item in category.items" :key="item.name"
                            class="p-4 bg-white rounded-xl shadow-lg border border-gray-100">
                            <div class="text-center flex flex-col items-center gap-2">
                                <img :src="item.icon" class="w-12 h-12 object-contain mb-1"
                                    :alt="item.name + ' icon'" />

                                <p class="text-xs font-medium text-gray-700 whitespace-nowrap">{{ item.name }}</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    </section>
</template>

<script setup>
const categories = [
    {
        title: "Frontend",
        items: [
            { name: "Vue.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" },
            { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
            { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
            { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
            { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
            { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
        ]
    },
    {
        title: "Backend",
        items: [
            { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
            { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
            { name: "Prisma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg" },
            { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
            { name: "Socket.IO", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg" },
            { name: "JWT", icon: "https://cdn.worldvectorlogo.com/logos/jwt-3.svg" },
        ]
    },
    {
        title: "Tools & Others",
        items: [
            { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
            { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
            { name: "Postman", icon: "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" },
            { name: "Thunder Client", icon: "https://avatars.githubusercontent.com/u/64235328?s=200&v=4" },
            { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
            { name: "Shopify", icon: "https://www.svgrepo.com/show/303503/shopify-logo.svg" },
        ]
    }
];
</script>

<style scoped></style>