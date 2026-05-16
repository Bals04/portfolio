<template>
    <section ref="sectionRef" class="personal-section overflow-hidden">
        <div class="personal-grid"></div>

        <div class="personal-shell">
            <div class="personal-header" :class="visible ? 'is-visible' : ''">
                <div class="personal-header-text">
                    <h2>Personal Projects</h2>
                    <p class="personal-copy">
                        Meet <strong class="name-baw">BAW</strong>, the no-nonsense bull who keeps me lifting, and <strong class="name-veeh">VEEH</strong>, the buzzing bee watching over my wallet, The two mascots leading my little universe of passion projects.
                    </p>
                </div>

                <div class="personal-mascots">
                    <img src="/personal-projects/mascot-collab.png" alt="DevBiz mascot collaboration" />
                </div>
            </div>

            <div class="personal-cards" :class="visible ? 'is-visible' : ''">
                <article v-for="project in projects" :key="project.id" class="personal-card">
                    <div class="personal-card-media">
                        <img :src="project.image" :alt="project.title" />
                    </div>
                    <div class="personal-card-body">
                        <div class="personal-card-topline">
                            <span>{{ project.category }}</span>
                        </div>
                        <h4>{{ project.title }}</h4>
                        <p>{{ project.description }}</p>
                    </div>
                </article>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const sectionRef = ref(null);
const visible = ref(false);

const projects = [
    {
        id: 1,
        title: 'Gym Progress Tracker',
        category: 'Fitness · Personal App',
        description:
            'A calendar-style training log to plan, edit and review weekly sessions. Tracks volume, active days and exercise breakdowns at a glance.',
        technology: 'Vue, Nuxt, Tailwind CSS',
        image: '/personal-projects/Screenshot%202026-05-16%20151733.png'
    },
    {
        id: 2,
        title: 'BuzzBudget',
        category: 'Finance · Personal App',
        description:
            'A friendly personal finance tracker with a built-in mascot guide. Manage budgets, log spending and move money to savings, all in one calm dashboard.',
        technology: 'Vue, Nuxt, Tailwind CSS',
        image: '/personal-projects/Screenshot%202026-05-16%20151836.png'
    }
];

const handleScroll = () => {
    if (!sectionRef.value) return;
    const rect = sectionRef.value.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.82) visible.value = true;
};

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.personal-section {
    position: relative;
    background: linear-gradient(180deg, #0f172a 0%, #111827 60%, #0b1220 100%);
    color: #e2e8f0;
    padding: 7rem 0 6rem;
}

.personal-grid {
    position: absolute;
    inset: 0;
    background-image:
        linear-gradient(rgba(148, 163, 184, 0.08) 1px, transparent 1px),
        linear-gradient(90deg, rgba(148, 163, 184, 0.08) 1px, transparent 1px);
    background-size: 8rem 8rem;
    mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.2));
    pointer-events: none;
}

.personal-shell {
    position: relative;
    max-width: 96rem;
    margin: 0 auto;
    padding: 0 1.5rem;
}

.personal-header,
.personal-cards {
    opacity: 0;
    transform: translateY(1.5rem);
    transition: opacity 0.8s ease, transform 0.8s ease;
}

.personal-header.is-visible,
.personal-cards.is-visible {
    opacity: 1;
    transform: translateY(0);
}

.personal-header {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    gap: 2.5rem;
}

.personal-header-text {
    text-align: left;
}

.personal-mascots {
    display: flex;
    justify-content: flex-end;
}

.personal-mascots img {
    width: 100%;
    max-width: 26rem;
    height: auto;
    image-rendering: pixelated;
    filter: drop-shadow(0 18px 30px rgba(0, 0, 0, 0.45));
}

.personal-badge {
    display: grid;
    place-items: center;
    width: 4rem;
    height: 4rem;
    border-radius: 1rem;
    background: linear-gradient(180deg, #f8fafc, #cbd5e1);
    color: #0f172a;
    box-shadow: 0 20px 45px rgba(0, 0, 0, 0.4);
}

.personal-badge-icon {
    width: 1.65rem;
    height: 1.65rem;
}

.personal-eyebrow {
    margin: 0 0 0.25rem;
    color: #94a3b8;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
}

.personal-header-text h2 {
    margin: 0;
    font-size: clamp(2.5rem, 5vw, 4.5rem);
    line-height: 0.95;
    letter-spacing: -0.05em;
    color: #f8fafc;
}

.personal-copy {
    max-width: 36rem;
    margin: 1.25rem 0 0;
    color: #94a3b8;
    font-size: 1.05rem;
    line-height: 1.8;
}

.name-baw {
    color: #4ade80;
}

.name-veeh {
    color: #facc15;
}

.personal-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
}

.personal-tags span {
    display: inline-flex;
    align-items: center;
    padding: 0.55rem 0.85rem;
    border-radius: 999px;
    background: rgba(248, 250, 252, 0.06);
    border: 1px solid rgba(148, 163, 184, 0.22);
    color: #e2e8f0;
    font-size: 0.75rem;
    font-weight: 600;
}

.personal-cards {
    margin-top: 1.5rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.75rem;
    transition-delay: 0.28s;
}

.personal-card {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-radius: 1.5rem;
    background: linear-gradient(160deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.7));
    border: 1px solid rgba(148, 163, 184, 0.16);
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3);
    transition: transform 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease;
}

.personal-card:hover {
    transform: translateY(-4px);
    border-color: rgba(148, 163, 184, 0.35);
    box-shadow: 0 40px 80px rgba(0, 0, 0, 0.45);
}

.personal-card-media {
    position: relative;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    background: #0b1220;
}

.personal-card-media img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.personal-card-body {
    padding: 1.5rem 1.5rem 1.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
}

.personal-card-topline {
    color: #94a3b8;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
}

.personal-card-body h4 {
    margin: 0;
    font-size: 1.5rem;
    line-height: 1.1;
    letter-spacing: -0.02em;
    color: #f8fafc;
}

.personal-card-body p {
    margin: 0;
    color: #cbd5e1;
    font-size: 0.95rem;
    line-height: 1.65;
}

@media (max-width: 768px) {
    .personal-section {
        padding: 5.5rem 0 4.5rem;
    }

    .personal-shell {
        padding: 0 1rem;
    }

    .personal-header {
        grid-template-columns: 1fr;
        text-align: center;
        gap: 2rem;
    }

    .personal-header-text {
        text-align: center;
    }

    .personal-copy {
        margin: 1.25rem auto 0;
    }

    .personal-mascots {
        justify-content: center;
    }

    .personal-mascots img {
        max-width: 20rem;
    }

    .personal-cards {
        grid-template-columns: 1fr;
        gap: 1.25rem;
    }
}
</style>
