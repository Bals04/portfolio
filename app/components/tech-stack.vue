<template>
    <section id="stack" ref="sectionRef" class="px-4 md:px-6 py-14 md:py-20 border-t border-g200">
        <div class="mx-auto max-w-4xl">

            <div class="reveal mb-12" :class="{ in: visible }">
                <p class="font-mono text-[10px] uppercase tracking-micro text-g400 mb-3">05 — stack</p>
                <h2 class="font-pixel text-4xl md:text-5xl text-ink">Tools</h2>
            </div>

            <div class="space-y-10">
                <div v-for="(category, ci) in categories" :key="category.title" class="reveal"
                    :class="{ in: visible }" :style="`animation-delay: ${100 + ci * 70}ms`">
                    <p class="font-mono text-[10px] uppercase tracking-micro text-g400 mb-4">{{ category.title }}</p>

                    <!-- hairline-divided cell grid: the dividers are the design -->
                    <div class="grid grid-cols-3 border-l border-t border-g200 rounded-card overflow-hidden">
                        <div v-for="item in category.items" :key="item.name"
                            class="flex flex-col items-center justify-center gap-3 border-r border-b border-g200 p-6">
                            <img :src="item.icon" :alt="item.name + ' icon'"
                                class="h-8 w-8 object-contain opacity-90 transition-all duration-200 hover:scale-110 hover:opacity-100"
                                :class="{ 'dark:invert': item.invertDark }" />
                            <span class="font-mono text-[10px] uppercase tracking-micro text-g500">{{ item.name }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- footer -->
            <footer class="mt-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t border-g200 pt-8">
                <p class="font-mono text-[10px] uppercase tracking-micro text-g400">© 2026 — jonhyl balsamo</p>
                <div class="flex gap-5 font-mono text-[10px] uppercase tracking-micro text-g500">
                    <a href="https://github.com/bals04" target="_blank" rel="noopener noreferrer"
                        class="link-underline hover:text-ink">github ↗</a>
                    <a href="https://www.linkedin.com/in/jonhyl-balsamo-b41a93386" target="_blank"
                        rel="noopener noreferrer" class="link-underline hover:text-ink">linkedin ↗</a>
                </div>
            </footer>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const sectionRef = ref(null)
const visible = ref(false)

const categories = [
    {
        title: "Frontend",
        items: [
            { name: "Vue.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" },
            { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
            { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", invertDark: true },
            { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
            { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
            { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
        ]
    },
    {
        title: "Backend",
        items: [
            { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
            { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", invertDark: true },
            { name: "Prisma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg", invertDark: true },
            { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
            { name: "Socket.IO", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg", invertDark: true },
            { name: "Supabase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg" },
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
]

const handleScroll = () => {
    if (!sectionRef.value) return
    if (sectionRef.value.getBoundingClientRect().top < window.innerHeight * 0.85) visible.value = true
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
    handleScroll()
})
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>
