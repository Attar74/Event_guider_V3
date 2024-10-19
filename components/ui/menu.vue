<template>
  <div ref="menuContainer" class="relative flex">
    <!-- Button to toggle menu -->
    <slot name="trigger" class="mt-auto" />

    <!-- Menu -->
    <transition
      name="fade"
      enter-active-class="transition ease-out duration-300"
      leave-active-class="transition ease-in duration-300"
    >
      <div
        v-if="isMenuOpen"
        :style="{ width: `${width}` }"
        class="absolute mt-5 bg-white rounded-[1.5rem] shadow-lg z-10 p-2"
      >
        <slot name="content" />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
const menuContainer = ref<HTMLElement | null>(null)

defineProps({
  isMenuOpen: {
    default: false,
    type: Boolean
  },
  width: {
    default: '[64rem]',
    type: String
  }
})

const emit = defineEmits(['closeMenu'])

const closeMenu = () => {
  emit('closeMenu')
}

const handleClickOutside = (event: MouseEvent) => {
  if (
    menuContainer.value &&
    !menuContainer.value.contains(event.target as Node)
  ) {
    closeMenu()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
