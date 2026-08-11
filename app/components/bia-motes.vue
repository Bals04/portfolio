<template>
    <!-- Decorative throughout: the "BIA" wordmark it sits beside is what
         carries the meaning, so this is hidden from assistive tech rather
         than announced twice. -->
    <div class="bia-motes" :class="[`bia-motes--${size}`, { 'bia-motes--bright': bright }]" aria-hidden="true">
        <i v-for="mote in 19" :key="mote"><b></b></i>
    </div>
</template>

<script setup lang="ts">
/**
 * BIA's particle self. Purely presentational and never tied to request
 * state, so she keeps moving whether or not she's answering.
 */
withDefaults(defineProps<{
    /**
     * hero    beside the large wordmark in the opening state
     * compact beside the small wordmark mid-conversation
     * mini    inside the launcher pill
     */
    size?: 'hero' | 'compact' | 'mini'
    /** Use the pale tones — for sitting on an ink-filled surface. */
    bright?: boolean
}>(), { size: 'hero', bright: false })
</script>

<style scoped>
/* ── BIA herself, as 19 motes ─────────────────────────────────────────
   Three nested layers, because one element can only run one transform
   animation at a time:
     i         orbits  — rotates around the centre of the box
     i::before is the thread from the core out to the mote
     i > b     breathes — pushes the mote out along that rotated axis
     b::before is the mote itself. Round, so the orbit's rotation needs no
                          counter-rotation to cancel — a circle has no
                          angle to give away.
   Three groups, all on the same 3s clock so the gather and the reform
   read as one deliberate movement:
     1–12  the outer ring
     13–18 an inner ring on the opposite phase — it pulls in as the outer
           ring opens out, which is what gives the thing depth
     19    a still core that swells when the rings scatter
   Radii are multiples of --ring, so the whole character scales by
   editing --box / --ring alone. Mote sizes stay whole even pixels so
   the 50% radius lands on a clean half-pixel and the dots read round
   rather than lozenge-ish at these sizes. */
.bia-motes {
    --box: 52px;
    --ring: 17px;
    /* Gathered radius, as a ratio of --ring rather than px: the threads
       scale by the same numbers the motes travel by, and CSS calc can't
       divide one length by another to recover the ratio later. */
    --gather: .22;

    /* One hue, six tones: deep blue through to pale sky. With a single
       family there's no muddy midpoint to avoid, so pairs are chosen for
       tonal contrast instead — a dot visibly lightens or darkens as it
       travels, and the mixture is the spread of tones across the cluster.
       Deep end on paper-white, inverted toward the light end in the dark
       theme, where a 700 would disappear into the background. */
    --p1: 29 78 216;
    --p2: 37 99 235;
    --p3: 59 130 246;
    --p4: 96 165 250;
    --p5: 14 165 233;
    --p6: 56 189 248;

    position: relative;
    width: var(--box);
    height: var(--box);
}

.dark .bia-motes {
    --p1: 96 165 250;
    --p2: 147 197 253;
    --p3: 191 219 254;
    --p4: 125 211 252;
    --p5: 56 189 248;
    --p6: 186 230 253;
}

@media (min-width: 640px) {
    .bia-motes {
        --box: 60px;
        --ring: 20px;
    }
}

/* Mote sizes don't shrink with the box — at these scales the cluster wants
   to read as chunkier and denser, not as a faithful miniature. --ring is
   set so the widest scatter (1.38 × --ring, plus half the largest dot)
   still clears the edge. Declared after the breakpoint above so both
   override the hero size at every width. */
.bia-motes--compact {
    --box: 36px;
    --ring: 11px;
}

.bia-motes--mini {
    --box: 26px;
    --ring: 7px;
}

/* On an ink-filled surface the theme ramp is upside down: a blue-700 dot
   disappears into it. This is the dark-theme end of the same ramp, pinned
   regardless of which theme is active. */
.bia-motes--bright {
    --p1: 96 165 250;
    --p2: 147 197 253;
    --p3: 191 219 254;
    --p4: 125 211 252;
    --p5: 56 189 248;
    --p6: 186 230 253;
}

.bia-motes i {
    position: absolute;
    left: 50%;
    top: 50%;
    animation: bia-orbit 3s linear infinite;
}

/* The thread from the core out to the mote. It lives on the orbiting
   layer, so it always lies along the same axis the mote travels on, and
   it's scaled by the very numbers --breathe uses — the far end lands on
   the mote at every frame without either one knowing about the other.
   Scaling a 1px-tall bar on X only, so the hairline never thickens. */
.bia-motes i::before {
    content: '';
    position: absolute;
    left: 0;
    top: -.5px;
    width: var(--ring);
    height: 1px;
    background-color: rgb(var(--c1) / .4);
    transform-origin: 0 50%;
    animation: bia-thread 3s ease-in-out infinite;
}

/* Spokes for the outer ring only — threading the inner six as well turns
   the middle into a knot. They stay loose, drifting free of the frame. */
.bia-motes i:nth-child(n+13)::before {
    content: none;
}

.bia-motes b {
    position: absolute;
    animation: bia-breathe 3s ease-in-out infinite;
}

.bia-motes b::before {
    content: '';
    position: absolute;
    left: calc(var(--d) / -2);
    top: calc(var(--d) / -2);
    width: var(--d);
    height: var(--d);
    border-radius: 50%;
    background-color: rgb(var(--c1));
    animation:
        bia-fade 3s ease-in-out infinite,
        bia-tint 3s ease-in-out infinite;
}

/* Pairs are dealt out so neighbouring motes never share one, and each
   spans two or three steps of the ramp rather than sitting on adjacent
   tones — at this size a one-step shift is invisible, and the point is to
   see the cluster's tones drift against each other as it turns. */
.bia-motes i:nth-child(6n+1) { --c1: var(--p1); --c2: var(--p3); }
.bia-motes i:nth-child(6n+2) { --c1: var(--p4); --c2: var(--p2); }
.bia-motes i:nth-child(6n+3) { --c1: var(--p2); --c2: var(--p5); }
.bia-motes i:nth-child(6n+4) { --c1: var(--p6); --c2: var(--p3); }
.bia-motes i:nth-child(6n+5) { --c1: var(--p3); --c2: var(--p1); }
.bia-motes i:nth-child(6n)   { --c1: var(--p5); --c2: var(--p4); }

/* --a start angle · --s scatter radius as a multiple of --ring
   --t turns (sign = direction) · --d mote size · --o opacity at scatter */
.bia-motes i:nth-child(1)  { --a:   0deg; --s: 1.30; --t:  1; --d: 5px; --o: .5;  }
.bia-motes i:nth-child(2)  { --a:  32deg; --s:  .82; --t: -1; --d: 3px; --o: .46; }
.bia-motes i:nth-child(3)  { --a:  64deg; --s: 1.36; --t:  1; --d: 4px; --o: .6;  }
.bia-motes i:nth-child(4)  { --a:  97deg; --s: 1.02; --t:  2; --d: 3px; --o: .48; }
.bia-motes i:nth-child(5)  { --a: 126deg; --s: 1.24; --t: -1; --d: 5px; --o: .55; }
.bia-motes i:nth-child(6)  { --a: 154deg; --s:  .90; --t:  1; --d: 4px; --o: .45; }
.bia-motes i:nth-child(7)  { --a: 188deg; --s: 1.38; --t:  1; --d: 3px; --o: .5;  }
.bia-motes i:nth-child(8)  { --a: 213deg; --s: 1.10; --t: -1; --d: 5px; --o: .6;  }
.bia-motes i:nth-child(9)  { --a: 246deg; --s:  .80; --t:  2; --d: 3px; --o: .48; }
.bia-motes i:nth-child(10) { --a: 275deg; --s: 1.26; --t:  1; --d: 4px; --o: .5;  }
.bia-motes i:nth-child(11) { --a: 302deg; --s:  .98; --t: -1; --d: 5px; --o: .55; }
.bia-motes i:nth-child(12) { --a: 334deg; --s: 1.34; --t:  1; --d: 3px; --o: .45; }

/* inner ring: smaller, fainter, orbiting faster than the outer twelve */
.bia-motes i:nth-child(13) { --a:  18deg; --s: .62; --t:  2; --d: 3px; --o: .55; }
.bia-motes i:nth-child(14) { --a:  76deg; --s: .48; --t: -2; --d: 3px; --o: .48; }
.bia-motes i:nth-child(15) { --a: 138deg; --s: .70; --t:  2; --d: 4px; --o: .6;  }
.bia-motes i:nth-child(16) { --a: 199deg; --s: .52; --t:  3; --d: 3px; --o: .45; }
.bia-motes i:nth-child(17) { --a: 258deg; --s: .66; --t: -2; --d: 3px; --o: .5;  }
.bia-motes i:nth-child(18) { --a: 318deg; --s: .44; --t:  2; --d: 4px; --o: .46; }

.bia-motes i:nth-child(n+13):nth-child(-n+18) b {
    animation-name: bia-breathe-inner;
}

/* Inner ring takes the pale end. Lighter reads as further off, so tone
   carries the depth now that every mote shares a hue. */
.bia-motes i:nth-child(2n+13):nth-child(-n+18) { --c1: var(--p6); --c2: var(--p4); }
.bia-motes i:nth-child(2n+14):nth-child(-n+18) { --c1: var(--p4); --c2: var(--p6); }

/* the core: no orbit, no travel — it only breathes in place, and holds the
   deepest blue, the one dark point the pale interior is read against */
.bia-motes i:nth-child(19) { --a: 0deg; --d: 4px; --c1: var(--p1); --c2: var(--p2); animation: none; }
.bia-motes i:nth-child(19) b { animation: none; }
.bia-motes i:nth-child(19) b::before {
    animation:
        bia-core 3s ease-in-out infinite,
        bia-tint 3s ease-in-out infinite;
}

@keyframes bia-orbit {
    from { transform: rotate(var(--a)); }
    to   { transform: rotate(calc(var(--a) + var(--t) * 360deg)); }
}

@keyframes bia-breathe {
    /* gathered into a tight core */
    0%   { transform: translateX(calc(var(--ring) * var(--gather))); }
    /* every mote at the same radius: one clean circle */
    20%  { transform: translateX(var(--ring)); }
    /* drift apart, each its own distance */
    42%  { transform: translateX(calc(var(--ring) * var(--s))); }
    /* and back into the circle */
    58%  { transform: translateX(var(--ring)); }
    /* a small second glance outward */
    78%  { transform: translateX(calc(var(--ring) * var(--s) * 0.72)); }
    100% { transform: translateX(calc(var(--ring) * var(--gather))); }
}

/* Counter-phase to bia-breathe: in when the outer ring is out. */
@keyframes bia-breathe-inner {
    0%   { transform: translateX(calc(var(--ring) * 0.55)); }
    20%  { transform: translateX(calc(var(--ring) * var(--gather))); }
    42%  { transform: translateX(calc(var(--ring) * var(--s))); }
    58%  { transform: translateX(calc(var(--ring) * var(--gather))); }
    78%  { transform: translateX(calc(var(--ring) * var(--s) * 0.8)); }
    100% { transform: translateX(calc(var(--ring) * 0.55)); }
}

/* Same stops as bia-breathe, as pure ratios, so the thread's length tracks
   its mote's radius frame for frame. Two rules keep a line from ever
   reading as orphaned:
     · every length carries a 0.92 inset, so the tip stops just short of
       the mote's centre and is always capped by the dot itself
     · opacity hits 0 at the gather, where the motes pile up and the
       spokes would otherwise be a starburst with nothing on the ends
   So the frame only exists while there's a circle for it to describe. */
@keyframes bia-thread {
    0%   { transform: scaleX(calc(var(--gather) * 0.92)); opacity: 0; }
    20%  { transform: scaleX(0.92); opacity: .5; }
    42%  { transform: scaleX(calc(var(--s) * 0.92)); opacity: .14; }
    58%  { transform: scaleX(0.92); opacity: .5; }
    78%  { transform: scaleX(calc(var(--s) * 0.72 * 0.92)); opacity: .24; }
    100% { transform: scaleX(calc(var(--gather) * 0.92)); opacity: 0; }
}

/* Offset from the movement stops (20/42/58/78) on purpose: colour peaking
   between positions keeps the mix from looking keyed to the motion. */
@keyframes bia-tint {
    0%, 100% { background-color: rgb(var(--c1)); }
    30%      { background-color: rgb(var(--c2)); }
    50%      { background-color: rgb(var(--c1)); }
    70%      { background-color: rgb(var(--c2)); }
}

@keyframes bia-fade {
    0%, 100% { opacity: .6; }
    20%, 58% { opacity: 1; }
    42%      { opacity: var(--o); }
    78%      { opacity: .8; }
}

/* Whole multiples only — a scaled dot stays a clean circle. */
@keyframes bia-core {
    0%, 100% { transform: scale(1); opacity: .85; }
    20%      { transform: scale(1); opacity: 1;   }
    42%      { transform: scale(2); opacity: .3;  }
    58%      { transform: scale(1); opacity: 1;   }
    78%      { transform: scale(2); opacity: .45; }
}

@media (prefers-reduced-motion: reduce) {
    /* The motes hold the reformed circle: same character, standing still. */
    .bia-motes i,
    .bia-motes i::before,
    .bia-motes b,
    .bia-motes b::before {
        animation: none;
    }

    /* Same 0.92 inset as the animated version, so each spoke stops under
       the mote standing at --ring in the static formation. */
    .bia-motes i::before { transform: scaleX(0.92); opacity: .5; }

    .bia-motes i         { transform: rotate(var(--a)); }
    .bia-motes b         { transform: translateX(var(--ring)); }
    .bia-motes b::before { opacity: 1; }

    /* Both rings and the core, held in the reformed formation. */
    .bia-motes i:nth-child(n+13):nth-child(-n+18) b { transform: translateX(calc(var(--ring) * 0.5)); }
    .bia-motes i:nth-child(19) b { transform: none; }
}
</style>
