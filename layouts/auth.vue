<template>
  <v-app>
    <v-layout>
      <v-main style="min-height: 100vh">
        <AppHeader />

        <div>
          <slot />
        </div>
      </v-main>
    </v-layout>
  </v-app>
</template>
