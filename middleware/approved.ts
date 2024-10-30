export default defineNuxtRouteMiddleware(async () => {
  const userStore = useUserStore()

  if (!import.meta.client) {
    return
  }
  try {
    await userStore.loadTokensFromLocalStorage()
  } catch {
  } finally {
    // If the the account already approved and user trying to acces the reviewing steps
    if (userStore?.user?.venue?.applicationStatus === 'Approved') {
      return navigateTo({ name: 'vendor-home-main-dashboard___en' }) // Redirect approved accounts to dashboard or any other protected route
    }
  }
})
