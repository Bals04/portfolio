<template><span>{{ shown }}</span></template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'

/**
 * Counts up to a number instead of printing it.
 *
 * Used on the typing test result, where the point is theatre: a score that
 * climbs invites you to watch it land, and gives Jonhyl's absurd record time to
 * keep climbing well past yours.
 */
const props = withDefaults(defineProps<{
    value: number
    /** Milliseconds for the whole roll. */
    duration?: number
    /** Held still for this long first, so several numbers can land in sequence. */
    delay?: number
}>(), { duration: 900, delay: 0 })

const shown = ref(0)

let frame: number | null = null
let timer: ReturnType<typeof setTimeout> | null = null

/** Fast at first, easing into the final value rather than stopping dead. */
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

function stop() {
    if (frame !== null) cancelAnimationFrame(frame)
    if (timer) clearTimeout(timer)
    frame = null
    timer = null
}

function roll() {
    stop()

    const target = props.value

    // A number that animates past someone who asked for no animation is worse
    // than no flourish at all.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        shown.value = target
        return
    }

    shown.value = 0
    timer = setTimeout(() => {
        const started = performance.now()
        const step = (now: number) => {
            const t = Math.min(1, (now - started) / props.duration)
            shown.value = Math.round(target * easeOut(t))
            if (t < 1) frame = requestAnimationFrame(step)
        }
        frame = requestAnimationFrame(step)
    }, props.delay)
}

// Started on mount rather than immediately: roll() reads matchMedia and
// performance, neither of which exists during server rendering.
onMounted(roll)
watch(() => props.value, roll)

onUnmounted(stop)
</script>
