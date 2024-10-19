<template>
  <div class="container mx-auto px-[1rem] md:px-[4rem] mt-[2.5rem] mb-[10rem]">
    <div class="text-center xl:px-[25rem]">
      <p class="text-[#2A2F4F] text-[1.5rem] font-bold leading-10">
        Prepare your storefront and stand out!
      </p>
      <p class="text-[#7F8295] text-[1rem] leading-7">
        Complete these simple steps to publish your storefront. Our team will
        review the information and contact you soon.
      </p>
    </div>
    <div
      class="container mx-auto md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-x-6"
    >
      <NuxtLink
        v-for="step in steps"
        :key="step.id"
        :to="`vendor/form/${step.route}`"
        class="col-span-1 flex flex-col"
      >
        <registerationCard
          :key="step.id"
          :data="step"
          :status="
            (user?.venue as Record<string, any>)?.[`${step.key}Completed`]
          "
        />
      </NuxtLink>
    </div>
    <div class="text-center xl:px-[25rem]">
      <p class="text-[#2A2F4F] text-[1rem] leading-7 my-[2rem]">
        Our team will review your data carefully and notify you to continue all
        process to publish your account with us
      </p>
      <NuxtLink to="/registeration-steps/reviewing">
        <button
          :disabled="finishStatusBtn"
          class="rounded-[2rem] bg-[#FF3D9A] w-[11.25rem] border-[0.063rem] border-[#FF3D9A] h-[3.5rem] cursor-pointer disabled:border-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[#AAACB9]"
        >
          <p v-if="true" class="text-[#fff] text[1rem] leading-7 font-bold">
            Finish
          </p>
          <SVGIcon v-else icon="circularLoader" />
        </button>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getSteps } from '~/constants/registerationSteps'
import registerationCard from '~/components/cards/registerationCard.vue'
import { useUserStore } from '~/store/user'

const userStore = useUserStore()
const { user } = userStore
const { businessInfoCompleted, photosCompleted, profileCompleted } = user.venue
const steps = getSteps()
const finishStatusBtn = computed(() => {
  return [businessInfoCompleted, photosCompleted, profileCompleted].some(
    status => !status
  )
})
definePageMeta({
  layout: 'vendor',
  requiresAuth: true
})
</script>
