<template>
  <div class="rounded-[0.75rem] bg-[#FFF] p-[1.5rem]">
    <div class="w-full">
      <div class="flex justify-between w-full mb-8">
        <div class="flex gap-x-[0.5rem]">
          <p class="text-[#2A2F4F] text-4 leading-7 my-auto font-bold">
            {{ qaTitle }}
          </p>
        </div>
        <div class="flex gap-x-[0.75rem] my-auto items-center">
          <div class="flex gap-x-[0.8rem]">
            <button
              v-if="!showArchive"
              @click="emits('toggleArchiveQuestion', uuid)"
            >
              <p class="text-[#FF3D9A] text-3 leading-7 my-auto font-bold">
                Unarchive
              </p>
            </button>
            <button
              v-else
              :disabled="isArchiveInProgress"
              @click="emits('toggleArchiveQuestion', uuid)"
            >
              <SVGIcon v-if="isArchiveInProgress" icon="circularLoader" />
              <SVGIcon v-else icon="archive" class="cursor-pointer" />
            </button>
            <button
              :disabled="isCopied"
              @click="emits('copyText', { uuid, qaTitle })"
            >
              <SVGIcon v-if="isCopied" icon="circularLoader" />
              <SVGIcon v-else icon="copy" class="cursor-pointer" />
            </button>
            <!-- <button><SVGIcon icon="emptyStar" class="cursor-pointer" /></button> -->
            <button
              :disabled="isDeleteInProgress"
              @click="emits('deleteQuestion', uuid)"
            >
              <SVGIcon v-if="isDeleteInProgress" icon="circularLoader" />
              <SVGIcon v-else icon="delete" />
            </button>
          </div>
        </div>
      </div>
      <section class="mt-[0.75rem] flex gap-x-[4rem]">
        <div class="flex items-center gap-x-[0.5rem]">
          <img
            src="/public/assets/1.png"
            class="w-[2.5rem] h-[2.5rem] rounded-full"
          />
          <p class="my-auto text-[#7F8295] font-[500]">{{ userFullName }}</p>
        </div>
        <div class="flex items-center gap-x-[0.5rem]">
          <SVGIcon icon="clock" />
          <span class="text-[#AAACB9]">{{ date }}</span>
        </div>
      </section>
    </div>
  </div>
</template>
<script setup lang="ts">
import SVGIcon from '~/helper/SVGIcon.vue'

defineProps<{
  uuid?: string
  qaTitle?: string
  date?: string
  answer?: string
  imgPath?: string
  showDelete?: boolean
  showCopy?: boolean
  showStar?: boolean
  showArchive?: boolean
  userFullName?: string
  isDeleteInProgress?: boolean
  isArchiveInProgress?: boolean
  isCopied?: boolean
}>()

const emits = defineEmits([
  'deleteQuestion',
  'toggleArchiveQuestion',
  'copyText'
])
</script>
