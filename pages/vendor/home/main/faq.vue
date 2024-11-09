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
  Archived: defineAsyncComponent(() => import('~/components/Faq/Archived.vue')),
  Published: defineAsyncComponent(
    () => import('~/components/Faq/Published.vue')
  ),
  Users: defineAsyncComponent(() => import('~/components/Faq/Users.vue'))
  // Add other components as needed
  // anotherTab: defineAsyncComponent(() => import('~/components/apply/anotherTab.vue')),
}

const activeTab = ref(components.Published)
const activeComponentKey = ref('Published')
const changeTab = (tab: keyof typeof components) => {
  activeTab.value = components[tab]
  activeComponentKey.value = tab
}
</script>
