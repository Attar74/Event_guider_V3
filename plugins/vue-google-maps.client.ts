import VueGoogleMaps from '@fawmi/vue-google-maps'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(VueGoogleMaps, {
    load: {
      key: process.env.GOOGLE_MAPS_API_KEY || '' // Use your Google Maps API key
    }
  })
})
