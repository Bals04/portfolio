import { ref } from 'vue'

export type Theme = 'light' | 'dark' | 'system'

function systemPrefersDark() {
  return typeof window !== 'undefined'
    && window.matchMedia('(prefers-color-scheme: dark)').matches
}

// module-level so every caller shares one source of truth
const theme = ref<Theme>('system')

function apply(t: Theme) {
  if (typeof document === 'undefined') return
  const dark = t === 'dark' || (t === 'system' && systemPrefersDark())
  const el = document.documentElement
  el.classList.toggle('dark', dark)
  el.style.colorScheme = dark ? 'dark' : 'light'
}

const SLASH_MS = 620

// One-time injection of the slash keyframes + classes.
function ensureSlashStyles() {
  if (document.getElementById('slash-fx-style')) return
  const style = document.createElement('style')
  style.id = 'slash-fx-style'
  style.textContent = `
    /* View Transition: the new theme is revealed via a diagonal clip, so
       don't cross-fade — keep the old view still underneath the new one. */
    ::view-transition-group(root) { animation-duration: ${SLASH_MS}ms; }
    ::view-transition-old(root),
    ::view-transition-new(root) { animation: none; mix-blend-mode: normal; }
    ::view-transition-old(root) { z-index: 0; }
    ::view-transition-new(root) { z-index: 1; }

    /* A bright blade that glints along the diagonal reveal edge. */
    @keyframes slash-sweep {
      0%   { transform: rotate(-45deg) translateY(-150vmax); opacity: 0; }
      12%  { opacity: 1; }
      88%  { opacity: 1; }
      100% { transform: rotate(-45deg) translateY(150vmax); opacity: 0; }
    }
    .slash-fx-overlay { position: fixed; inset: 0; z-index: 2147483647; overflow: hidden; pointer-events: none; }
    .slash-fx-blade {
      position: absolute; top: 50%; left: 50%;
      width: 320vmax; height: 6px;
      margin-left: -160vmax; margin-top: -3px;
      border-radius: 6px;
      background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0) 25%, #fff 45%, #fff 55%, rgba(255,255,255,0) 75%, transparent 100%);
      box-shadow: 0 0 24px 6px rgba(255,255,255,0.95), 0 0 60px 16px rgba(120,180,255,0.85);
      animation: slash-sweep ${SLASH_MS}ms cubic-bezier(0.45, 0, 0.15, 1) forwards;
    }
  `
  document.head.appendChild(style)
}

// Play the glint blade on top of whatever is happening underneath.
function playBlade() {
  const overlay = document.createElement('div')
  overlay.className = 'slash-fx-overlay'
  overlay.innerHTML = '<div class="slash-fx-blade"></div>'
  document.body.appendChild(overlay)
  window.setTimeout(() => overlay.remove(), SLASH_MS + 80)
}

// Reveal the new theme with a diagonal "slash open" from the top-left corner.
function slash(applyTheme: () => void) {
  if (typeof document === 'undefined') { applyTheme(); return }

  ensureSlashStyles()

  const startVT = (document as any).startViewTransition?.bind(document)
  if (!startVT) {
    // No View Transitions support: at least flash the blade, swap mid-way.
    playBlade()
    window.setTimeout(applyTheme, SLASH_MS * 0.4)
    return
  }

  const transition = startVT(() => applyTheme())
  transition.ready.then(() => {
    // Grow a triangle from the top-left corner along the diagonal — the new
    // theme "opens" outward as if the page were slashed open.
    document.documentElement.animate(
      { clipPath: ['polygon(0 0, 0 0, 0 0)', 'polygon(0 0, 220% 0, 0 220%)'] },
      {
        duration: SLASH_MS,
        easing: 'cubic-bezier(0.45, 0, 0.15, 1)',
        pseudoElement: '::view-transition-new(root)',
      }
    )
    playBlade()
  }).catch(() => { /* transition skipped; theme already applied */ })
}

export function useTheme() {
  function init() {
    if (typeof localStorage === 'undefined') return
    theme.value = (localStorage.getItem('theme') as Theme) || 'system'
    apply(theme.value)
    // when following the OS, react live to OS changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (theme.value === 'system') apply('system')
    })
  }

  function set(t: Theme) {
    theme.value = t
    localStorage.setItem('theme', t)
    slash(() => apply(t))
  }

  return { theme, init, set }
}
