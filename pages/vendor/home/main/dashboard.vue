<template>
  <div class="mx-auto px-[1rem] md:px-[4rem] mt-[2.5rem] mb-[10rem] flex">
    <h1 class="mt-[5rem] mx-auto text-4xl">Dashboard</h1>
  </div>
</template>
<script setup lang="ts">
import reviewing from '~/middleware/reviewing'

definePageMeta({
  layout: 'home-vendor',
  requiresAuth: true,
  middleware: reviewing
})
</script>
