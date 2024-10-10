<template>
  <div>
    <Header />
    <slot />
    <Footer />
  </div>
</template>
<script setup lang="ts">
import Footer from '~/components/app/Footer.vue'
import Header from '~/components/app/Header.vue'
</script>
