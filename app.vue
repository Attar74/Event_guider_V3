<template>
  <Html :dir="locale === 'ar' ? 'rtl' : 'ltr'">
    <NuxtLayout>
      <AtomsSnackbar />
      <NuxtLoadingIndicator />
      <NuxtPage />
    </NuxtLayout>
  </Html>
</template>

<script setup lang="ts">
const { locale } = useI18n();
</script>
