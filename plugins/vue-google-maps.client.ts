import VueGoogleMaps from '@fawmi/vue-google-maps'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(nuxtApp => {
  const config = useRuntimeConfig()
  nuxtApp.vueApp.use(VueGoogleMaps, {
    load: {
      key: config.public.googleMapsApiKey || '' // Use your Google Maps API key
    }
  })
})
