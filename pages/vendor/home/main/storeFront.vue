<template>
  <div class="mx-auto px-[1rem] md:px-[4rem] mt-[2.5rem] mb-[10rem]">
    <HorizntalTabs :active-tab="activeComponentKey" @tab-change="changeTab" />
    <component :is="activeTab" />
  </div>
</template>
<script setup lang="ts">
import HorizntalTabs from '~/components/ui/horizntalTabs.vue'
import reviewing from '~/middleware/reviewing'

definePageMeta({
  layout: 'home-vendor',
  requiresAuth: true,
  middleware: reviewing
})

// Define dynamic components
const components = {
  businessInfo: defineAsyncComponent(
    () => import('~/components/apply/businessInfo.vue')
  ),
  location: defineAsyncComponent(
    () => import('~/components/apply/location.vue')
  ),
  photos: defineAsyncComponent(() => import('~/components/apply/photos.vue')),
  questions: defineAsyncComponent(
    () => import('~/components/storeFront/questions.vue')
  ),
  suppliers: defineAsyncComponent(
    () => import('~/components/storeFront/suppliers.vue')
  ),
  socialNetworks: defineAsyncComponent(
    () => import('~/components/storeFront/socialNetworks.vue')
  )
  // Add other components as needed
  // anotherTab: defineAsyncComponent(() => import('~/components/apply/anotherTab.vue')),
}

const activeTab = ref(components.businessInfo)
const activeComponentKey = ref('businessInfo')
const changeTab = (tab: keyof typeof components) => {
  activeTab.value = components[tab]
  activeComponentKey.value = tab
}
</script>
