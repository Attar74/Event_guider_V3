<template>
  <div class="mx-auto px-[1rem] md:px-[4rem] mt-[2.5rem] mb-[10rem]">
    <div class="text-center">
      <div class="mx-auto">
        <SVGIcon
          class="bg-[#ff3d9a08] rounded-xl"
          icon="Work"
          :style="{ height: '5rem', width: '5rem' }"
        />
      </div>
      <p class="text-[#2A2F4F] text-[1.5rem] font-bold leading-10 mt-[1rem]">
        Add information about your business
      </p>
      <p
        class="text-[#7F8295] text-[1rem] leading-7 mx-auto"
        :style="{ 'max-width': '43rem' }"
      >
        Your storefront features information about your wedding services to
        attract and convert our audience of engaged couples.
      </p>
    </div>
    <busniessInfo />
  </div>
</template>
<script setup lang="ts">
import SVGIcon from '~/helper/SVGIcon.vue'
import busniessInfo from '~/components/apply/businessInfo.vue'

definePageMeta({
  layout: 'vendor'
})
</script>
