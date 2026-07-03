/** @type {import('tailwindcss').Config} */
const ink = (v) => `rgb(var(--${v}) / <alpha-value>)`

export default {
  darkMode: 'class',
  content: [
    './app/components/**/*.{vue,js,ts}',
    './app/pages/**/*.{vue,js,ts}',
    './app/layouts/**/*.{vue,js,ts}',
    './app/app.vue',
    './app/plugins/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        bg: ink('bg'),
        ink: ink('ink'),
        g50: ink('g50'),
        g100: ink('g100'),
        g200: ink('g200'),
        g300: ink('g300'),
        g400: ink('g400'),
        g500: ink('g500'),
        g600: ink('g600'),
        g700: ink('g700'),
        g800: ink('g800'),
        g900: ink('g900'),
        g950: ink('g950'),
      },
      fontFamily: {
        sans: ['Geist', 'system-ui', 'sans-serif'],
        montserrat: ['Montserrat', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'ui-monospace', 'monospace'],
        pixel: ['Geist Pixel', 'Geist Mono', 'monospace'],
        serif: ['Source Serif 4', 'Georgia', 'serif'],
      },
      borderRadius: {
        // the 16 / 12 / 8 / 6 ladder
        card: '16px',
        md2: '12px',
        sm2: '8px',
        input: '6px',
      },
      boxShadow: {
        // black at low alpha, large blur, strong negative spread — soft ground contact
        soft: '0 8px 22px -14px rgb(0 0 0 / 0.25)',
        'soft-lg': '0 18px 36px -20px rgb(0 0 0 / 0.40)',
        modal: '0 40px 90px -20px rgb(0 0 0 / 0.35)',
      },
      letterSpacing: {
        micro: '0.12em',
      },
    },
  },
  plugins: [],
}
