<script>
const iconCache = {}

export default {
  props: {
    icon: {
      type: String,
      default: null
    },
    classes: {
      type: String,
      default: 'svg-container flex items-center justify-center'
    }
  },
  data() {
    return {
      svgContent: null
    }
  },
  async created() {
    if (this.icon) {
      if (iconCache[this.icon]) {
        this.svgContent = iconCache[this.icon]
      } else {
        const response = await $fetch(`/assets/svgs_icons/${this.icon}.svg`)
        const svg = await response.text()
        iconCache[this.icon] = svg
        this.svgContent = svg
      }
    }
  }
}
</script>

<template>
  <span :class="[classes, 'svg-icon-container']" v-html="svgContent" />
</template>

<style scoped>
.svg-container {
  display: inline-flex;
}
</style>
