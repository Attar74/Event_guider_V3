export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: true,

  app: {
    head: {
      title: 'Event Guiders'
    },
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' }
  },

  modules: [
    '@nuxtjs/i18n',
    '@nuxt/eslint',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts'
  ],

  typescript: {
    shim: false, // Enable or disable TypeScript shims
    strict: true // Ensure strict typing
  },

  googleFonts: {
    families: {
      'Montserrat Alternates': []
    }
  },

  pinia: {
    storesDirs: ['./store/**']
  },

  css: ['public/assets/main.css'],
  postcss: {
    plugins: {
      'postcss-import': {},
      'tailwindcss/nesting': {},
      tailwindcss: {},
      autoprefixer: {}
    }
  },

  i18n: {
    langDir: 'locales/',
    lazy: true,
    locales: [
      {
        code: 'en',
        name: 'English',
        iso: 'en-US',
        file: 'en.js',
        dir: 'ltr'
      },
      {
        code: 'ar',
        name: 'العربية',
        iso: 'ar-EG',
        file: 'ar.js',
        dir: 'rtl'
      }
    ],
    defaultLocale: 'ar',
    strategy: 'prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      fallbackLocale: 'ar'
    }
  },

  build: {
    transpile: ['fast-deep-equal']
  },

  runtimeConfig: {
    // Public keys that are exposed to the client-side
    public: {
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
      apiBaseUrl: process.env.API_BASE_URL,
      apiKey: process.env.NUXT_PUBLIC_API_KEY
    }
  },

  compatibilityDate: '2024-10-06'
})
