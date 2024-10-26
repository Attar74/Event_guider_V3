<template>
  <div
    class="container mx-auto px-[1rem] md:px-[4rem] mt-[2.5rem] mb-[10rem] translate-x-[7rem]"
  >
    <HorizntalTabs />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import HorizntalTabs from '~/components/ui/horizntalTabs.vue'

definePageMeta({
  layout: 'home-vendor'
})
</script>
