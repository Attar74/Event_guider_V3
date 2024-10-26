<template>
  <div>
    <Header @toggle-drawer="toggleDrawer" />
    <Drawer :is-drawer-open="isDrawerOpen" />
    <AtomsSnackbar />
    <NuxtPage class="mt-[4rem]" :class="{ 'ml-[15.125rem]': isDrawerOpen }" />
  </div>
</template>
<script setup lang="ts">
import Drawer from '~/components/app/Drawer.vue'
import Header from '~/components/app/Header.vue'

const isDrawerOpen = ref(true)
const toggleDrawer = () => {
  isDrawerOpen.value = !isDrawerOpen.value
}
</script>
