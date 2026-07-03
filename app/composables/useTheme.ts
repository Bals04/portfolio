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
    apply(t)
  }

  return { theme, init, set }
}
