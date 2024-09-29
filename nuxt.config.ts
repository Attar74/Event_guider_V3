import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: true,
  app: {
    head: {
      title: 'Workey',
    },
  },
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    '@nuxtjs/i18n',
    '@nuxt/eslint',
    '@pinia/nuxt',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', config => {
        config?.plugins?.push(vuetify({ autoImport: true }));
      });
    },
  ],
  pinia: {
    storesDirs: ['./store/**'],
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
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
        dir: 'ltr',
      },
      {
        code: 'ar',
        name: 'العربية',
        iso: 'ar-EG',
        file: 'ar.js',
        dir: 'rtl',
      },
    ],
    defaultLocale: 'ar',
    strategy: 'prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      fallbackLocale: 'ar',
    },
  },
});
