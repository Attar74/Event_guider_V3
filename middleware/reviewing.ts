export default defineNuxtRouteMiddleware(async () => {
  const userStore = useUserStore()

  if (!import.meta.client) {
    return
  }
  try {
    await userStore.loadTokensFromLocalStorage()
  } catch {
  } finally {
    // If the the account still under reviewing and user trying to acces the dashboard
    if (userStore.user.venue.applicationStatus === 'Pending') {
      return navigateTo({ name: 'vendor___en' }) // Redirect under reviewing accounts to regsiteration steps or any other protected route
    }
  }
})
