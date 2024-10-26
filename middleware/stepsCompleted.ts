import { useSnackbarStore } from '~/store/snackbarStore'

export default defineNuxtRouteMiddleware(async () => {
  const userStore = useUserStore()
  const snackbarStore = useSnackbarStore()

  if (!import.meta.client) {
    return
  }
  try {
    await userStore.loadTokensFromLocalStorage()
  } catch {
  } finally {
    const { applicationStatus, photosCompleted, profileCompleted } =
      userStore.user.venue
    // If the the account still under reviewing and user trying to acces the dashboard
    if (!applicationStatus || !photosCompleted || !profileCompleted) {
      snackbarStore.fireSnack({
        isVisible: true,
        text: 'Please complete all the steps to continue',
        type: 'error'
      })
      return navigateTo({ name: 'vendor___en' }) // Redirect under reviewing accounts to regsiteration steps or any other protected route
    }
  }
})
