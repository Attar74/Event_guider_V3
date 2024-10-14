<template>
  <transition name="snackbar-fade">
    <div
      v-if="snackbarStore.snackbar.isVisible"
      class="custom-shadow absolute rounded-[0.625rem] z-50 flex top-8 left-1/2 translate-x-[-50%] min-w-[20rem] p-[1rem]"
      :style="`background-color: ${bgColor}`"
    >
      <div class="flex justify-center gap-x-3 mx-auto">
        <SVGIcon :icon="snackbarStore.snackbar.type" />
        <p class="text-[#000] m-auto">{{ snackbarStore.snackbar.text }}</p>
      </div>
      <button class="close-btn" @click="snackbarStore.closeSnackbar">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#374957"
          class="icon"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  </transition>
</template>

<script setup>
import SVGIcon from '~/helper/SVGIcon.vue'
import { useSnackbarStore } from '~/store/snackbarStore'
const snackbarStore = useSnackbarStore()

const bgColor = computed(() => {
  switch (snackbarStore.snackbar.type) {
    case 'success':
      return '#d4edda'
    case 'error':
      return '#FDC0C0'
    default:
      return '#fff'
  }
})
</script>

<style scoped>
.custom-shadow {
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

.close-btn {
  background: transparent;
  border: none;
  cursor: pointer;
}

.icon {
  width: 24px;
  height: 24px;
}
/* Transition styles */
.snackbar-fade-enter-active,
.snackbar-fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.snackbar-fade-enter-from,
.snackbar-fade-leave-to {
  opacity: 0;
}
</style>
