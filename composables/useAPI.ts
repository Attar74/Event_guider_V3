import type { UseFetchOptions } from 'nuxt/app'

export function useAPI<T>(
  url: string | (() => string),
  options?: UseFetchOptions<T>
) {
  return useFetch(url, {
    ...options,
    $fetch: useNuxtApp().$api
  })
}

/*

import type { UseFetchOptions } from 'nuxt/app'

export async function useAPI<T>(
  url: string | (() => string),
  options?: any
): Promise<T> {
  const { $api } = useNuxtApp()

  try {
    // Perform the API request using $fetch (or your custom $api from the plugin)
    const response = await $api(url, {
      ...options
    })

    // Throw an error if the status is not 200
    if (response.status !== 200) {
      throw new Error(`Request failed with status ${response.status}`)
    }

    // Return the response data
    return response
  } catch (error) {
    // Optionally log the error or show it to the user
    console.error('Error in API request:', error)
    throw error // Re-throw the error so it can be caught in the calling function
  }
}


*/
