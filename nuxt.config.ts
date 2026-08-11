// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-02-10',

  future: {
    compatibilityVersion: 4,
  },

  experimental: {
    scanPageMeta: 'after-resolve',
    sharedPrerenderData: false,
    compileTemplate: true,
    resetAsyncDataToUndefined: true,
    templateUtils: true,
    relativeWatchPaths: true,
    normalizeComponentNames: false,
    spaLoadingTemplateLocation: 'within',
    defaults: {
      useAsyncData: {
        deep: true
      }
    }
  },

  unhead: {
    renderSSRHeadOptions: {
      omitLineBreaks: false
    }
  },

  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],

  // Server-only config for the AI chatbot. Because these keys live at the top
  // level (not inside `public`), they are NEVER sent to the browser — only
  // server/api/chat.post.ts can read them. Values come from .env at runtime.
  runtimeConfig: {
    // No default for the key: the chat stays politely switched off until it's set.
    aiApiKey: process.env.AI_API_KEY || '',
    aiBaseUrl:
      process.env.AI_BASE_URL ||
      'https://generativelanguage.googleapis.com/v1beta/openai',
    // `-latest` alias, not a pinned version: Google retires specific versions
    // and blocks them for new API keys, which would break the chat.
    aiModel: process.env.AI_MODEL || 'gemini-flash-lite-latest',

    // Optional backup provider, used only when the main one is out of quota.
    // Leave the key unset to disable — no key means no fallback attempt.
    aiFallbackApiKey: process.env.AI_FALLBACK_API_KEY || '',
    aiFallbackBaseUrl:
      process.env.AI_FALLBACK_BASE_URL || 'https://api.groq.com/openai/v1',
    aiFallbackModel: process.env.AI_FALLBACK_MODEL || 'llama-3.3-70b-versatile',
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      // Set the theme class before first paint to avoid a flash.
      script: [
        {
          innerHTML:
            "!function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||((!t||t==='system')&&matchMedia('(prefers-color-scheme:dark)').matches);var e=document.documentElement;e.classList.toggle('dark',d);e.style.colorScheme=d?'dark':'light';}catch(_){}}();",
          tagPosition: 'head'
        }
      ]
    }
  }
})