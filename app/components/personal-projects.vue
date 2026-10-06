<template>
    <!-- Styled after the Gym Progress Tracker itself, so this section stays dark in both themes. -->
    <section id="personal" ref="sectionRef"
        class="gym relative overflow-hidden px-4 md:px-6 py-14 md:py-20 font-montserrat">
        <div class="mx-auto max-w-4xl">

            <!-- header -->
            <div class="reveal grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-8 mb-12"
                :class="{ in: visible }">
                <div>
                    <p class="mb-3 flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--gym-green)]">
                        <span class="h-[7px] w-6 bg-[var(--gym-green)]"></span>03 — Personal app
                    </p>
                    <h2 class="text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--gym-text)]">
                        Gym Progress Tracker
                    </h2>
                    <p class="mt-5 max-w-lg text-[15px] leading-[1.75] text-[var(--gym-muted)]">
                        A training log I built for myself and use every week. Plan the week in a calendar-style
                        board, then add, edit and delete exercises inside each day, on desktop or on my phone.
                    </p>
                </div>

                <!-- coach baw + speech bubble, same as in the app -->
                <div class="flex items-center gap-4 md:justify-end">
                    <img src="/personal-projects/coach-baw.png" alt="Coach BAW, the bull mascot"
                        class="w-28 shrink-0 md:w-32" style="image-rendering: pixelated;" />
                    <div
                        class="relative max-w-[15rem] rounded-xl border border-[var(--gym-line)] bg-[var(--gym-card)] p-4">
                        <span
                            class="absolute -left-[7px] top-6 h-3 w-3 rotate-45 border-b border-l border-[var(--gym-line)] bg-[var(--gym-card)]"></span>
                        <p class="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--gym-green)]">Coach Baw</p>
                        <p class="mt-1.5 text-[13px] font-semibold leading-snug text-[var(--gym-text)]">
                            No skipping leg day. I'm the bull who keeps this guy lifting.
                        </p>
                    </div>
                </div>
            </div>

            <div class="mb-10 h-px bg-[var(--gym-line)]"></div>

            <!-- devices -->
            <div class="reveal relative pb-2 md:pr-10" :class="{ in: visible }" style="animation-delay: 120ms">

                <!-- monitor -->
                <div class="w-[88%] md:w-[86%]">
                    <div class="rounded-[14px] bg-[#0b0b0d] p-[6px] sm:p-[10px] ring-1 ring-[#3a3a3a]"
                        style="box-shadow: 0 30px 60px -25px rgb(0 0 0 / 0.8);">
                        <div class="overflow-hidden rounded-[6px] bg-[var(--gym-bg)]" style="aspect-ratio: 1659/895;">
                            <img src="/personal-projects/desktop-view.png"
                                alt="Gym Progress Tracker on desktop: weekly stats and Tuesday's pull session"
                                class="h-full w-full object-cover object-top" loading="lazy" />
                        </div>
                        <div class="flex justify-center pt-[5px] sm:pt-[8px]">
                            <span class="h-1 w-1 rounded-full bg-[#2a2a2e]"></span>
                        </div>
                    </div>
                    <!-- stand -->
                    <div class="mx-auto h-6 w-[14%] bg-gradient-to-b from-[#141416] to-[#2a2a2f] sm:h-10"
                        style="clip-path: polygon(18% 0, 82% 0, 100% 100%, 0 100%);"></div>
                    <div class="mx-auto h-[6px] w-[30%] rounded-t-[3px] rounded-b-[8px] bg-[#2f2f34]"></div>
                </div>

                <!-- phone -->
                <div class="absolute bottom-0 right-0 w-[30%] sm:w-[24%] md:w-[21%]">
                    <div class="rounded-[22px] sm:rounded-[32px] bg-[#0b0b0d] p-[4px] sm:p-[7px] ring-1 ring-[#444]"
                        style="box-shadow: 0 40px 70px -20px rgb(0 0 0 / 0.9);">
                        <div class="relative overflow-hidden rounded-[18px] sm:rounded-[26px] bg-[var(--gym-bg)]"
                            style="aspect-ratio: 924/1999;">
                            <img src="/personal-projects/mobile-view.jpg"
                                alt="Gym Progress Tracker on mobile with Coach BAW and weekly stats"
                                class="h-full w-full object-cover object-top" loading="lazy" />
                            <span
                                class="absolute left-1/2 top-[1.4%] h-[2.6%] w-[30%] -translate-x-1/2 rounded-full bg-black"></span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- features strip -->
            <ul class="reveal mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6"
                :class="{ in: visible }" style="animation-delay: 200ms">
                <li v-for="(f, i) in features" :key="f.title" class="relative pl-5">
                    <!-- floating accent bar, echoing the app's green marker -->
                    <span class="absolute left-0 top-0.5 bottom-0.5 w-[3px] rounded-full bg-[var(--gym-green)]"></span>
                    <p class="text-[11px] font-bold tracking-[0.14em] text-[var(--gym-green)]">
                        {{ String(i + 1).padStart(2, '0') }}
                    </p>
                    <p class="mt-3 text-[15px] font-extrabold text-[var(--gym-text)]">{{ f.title }}</p>
                    <p class="mt-1.5 text-[13px] leading-relaxed text-[var(--gym-muted)]">{{ f.text }}</p>
                </li>
            </ul>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const sectionRef = ref(null);
const visible = ref(false);

const features = [
    { title: 'Weekly board', text: 'Plan every day of the week in a calendar-style board.' },
    { title: 'Active days', text: 'See how consistent I am, with rest days kept on the board.' },
    { title: 'Total volume', text: 'Sets × reps × kg, added up per day and for the whole week.' },
];

const handleScroll = () => {
    if (!sectionRef.value) return;
    if (sectionRef.value.getBoundingClientRect().top < window.innerHeight * 0.85) visible.value = true;
};

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();
});
onUnmounted(() => window.removeEventListener('scroll', handleScroll));
</script>

<style scoped>
/* Gym Progress Tracker palette, fixed regardless of the site theme */
.gym {
    --gym-bg: #1b1b1b;
    --gym-card: #252525;
    --gym-line: #333333;
    --gym-text: #f4f4f4;
    --gym-muted: #a8a8a8;
    --gym-green: #3fa982;
    /* faint green glow behind the mascot, over a subtle dot grid */
    background:
        radial-gradient(ellipse 60% 45% at 85% 10%, rgb(63 169 130 / 0.08), transparent 70%),
        radial-gradient(rgb(255 255 255 / 0.06) 1px, transparent 1.2px) 0 0 / 18px 18px,
        var(--gym-bg);
    color: var(--gym-text);
    color-scheme: dark;
}
</style>
