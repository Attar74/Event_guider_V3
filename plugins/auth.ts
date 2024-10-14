import { defineNuxtPlugin } from '#app'
import { useRouter } from 'vue-router'
import { useUserStore } from '~/store/user'

export default defineNuxtPlugin(nuxtApp => {
  const router = useRouter() // Access the router
  const userStore = useUserStore() // Access the user store

  // Add a global beforeEach guard
  router.beforeEach((to, from, next) => {
    const requiresAuth = to.meta.requiresAuth // Check the route's meta field

    // If the route requires authentication and the user is not logged in
    if (requiresAuth && !userStore.isAuthenticated) {
      return next({ name: 'index___en' }) // Redirect to the login page
    }

    next() // Allow navigation if no auth is required or if the user is authenticated
  })
})
