// https://nuxt.com/docs/api/configuration/nuxt-config

import { defineNuxtConfig } from 'nuxt/config'
import '@nuxtjs/eslint-module'
import 'vuetify-nuxt-module'
import '@vueuse/nuxt'
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    'vuetify-nuxt-module',
    '@vueuse/nuxt',
    '@nuxt/icon',
  ],
  vueuse: { ssrHandlers: true },
  vuetify: {
    moduleOptions: {
      /* module specific options */
    },
    vuetifyOptions: {
      /* vuetify options */
    }
  },
  eslint: {
    config: {
      standalone: false
    }
  }
})