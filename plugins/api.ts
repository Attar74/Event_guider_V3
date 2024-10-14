import { useUserStore } from '~/store/user'

export default defineNuxtPlugin(nuxtApp => {
  // const { session } = useUserSession()
  const config = useRuntimeConfig()
  const userStore = useUserStore()

  const api = $fetch.create({
    baseURL: config.public.apiBaseUrl,
    onRequest({ request, options, error }) {
      /* if (session.value?.token) {
        // note that this relies on ofetch >= 1.4.0 - you may need to refresh your lockfile
        options.headers.set('Authorization', `Bearer ${session.value?.token}`)
      }*/
      options.headers.set('X-Api-Key', config.public.apiKey)
      options.headers.set(
        'Authorization',
        `Bearer ${userStore.tokens.accessToken}`
      )
    },
    onResponse({ response }) {
      // Throw an error for non-200 status codes
      if (response.status !== 200) {
        throw new Error(`Request failed with status code ${response.status}`)
      }
    },
    async onResponseError({ response }) {
      if (response.status === 401) {
        await nuxtApp.runWithContext(() => navigateTo('/'))
      } else {
        throw new Error(
          `API request failed with status code ${response.status}`
        )
      }
    }
  })

  // Expose to useNuxtApp().$api
  return {
    provide: {
      api
    }
  }
})
