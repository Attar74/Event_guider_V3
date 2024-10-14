export default defineNuxtRouteMiddleware(async () => {
  const userStore = useUserStore()

  if (!import.meta.client) {
    return
  }
  try {
    await userStore.loadTokensFromLocalStorage()
  } catch {
  } finally {
    // If the user is already authenticated, redirect them away from the login page
    if (userStore.isAuthenticated) {
      return navigateTo({ name: 'vendor___en' }) // Redirect authenticated users to dashboard or any other protected route
    }
  }
})
