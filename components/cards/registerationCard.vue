<template>
  <div
    class="col-span-1 flex flex-col hover:scale-110 trinsition ease-in-out duration-100"
  >
    <div
      class="w-full h-full max-w-sm overflow-hidden shadow-lg p-[1rem] sm:p-[3rem] rounded-2xl bg-[#fff] mx-auto my-[2rem] cursor-pointer"
    >
      <div class="bg-[#ff3d9a08] mx-auto p-[2rem] w-[7.5rem] rounded-xl">
        <SVGIcon :icon="status ? 'completed' : data.icon" />
      </div>
      <div class="my-[1rem]">
        <p class="text-[#FF3D9A] text-[1rem] font-bold text-center leading-7">
          {{ data.title }}
        </p>
      </div>
      <div class="my-[1rem]">
        <p
          class="text-[#2A2F4F] text-[1.25rem] font-bold text-center leading-9 mx-1"
        >
          {{ data.description }}
        </p>
      </div>
      <div class="my-[1rem]">
        <p class="text-[#7F8295] text[1-rem] leading-7 text-center">
          Estimated completion time : {{ data.estimitadeTime }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SVGIcon from '~/helper/SVGIcon.vue'

interface Data {
  id: number
  title: string
  description: string
  estimitadeTime: string
  icon: string
}

interface Props {
  data: Data
  status: string
}

defineProps<Props>()
</script>
