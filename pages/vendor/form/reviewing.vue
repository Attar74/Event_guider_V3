<template>
  <div
    class="container mx-auto px-[1rem] md:px-[4rem] mt-[2.5rem] mb-[10rem]"
    :class="{ 'max-w-[55rem]': true }"
  >
    <div class="text-center mb-[3rem]">
      <div>
        <SVGIcon icon="Successfully" class="mx-auto" />
      </div>

      <p class="text-[#FF3D9A] text-[1.5rem] font-bold leading-10 mt-[1rem]">
        Processes completed successfully.
      </p>
      <p class="text-[#7F8295] text-[1rem] leading-7">
        Your data will be carefully reviewed by our team and you will be allowed
        to resume your activity within 4 days.
      </p>
    </div>
    <div class="flex justify-center">
      <div class="flex gap-x-[1rem]">
        <p
          v-for="item in datesItem"
          :key="item"
          class="text-[#2A2F4F] text-[1.25rem] leading-9 font-semibold p-[1.375rem] bg-[#fff] rounded-[1rem]"
        >
          {{ item }}
        </p>
      </div>
    </div>
    <p
      class="text-[#7F8295] text-[1rem] leading-7 text-center mt-[4rem] mb-[2rem]"
    >
      Do you want to change any details before admin action ?
    </p>
    <div class="flex">
      <NuxtLink
        :to="{ name: 'vendor___en' }"
        class="flex flex-col sm:flex-row justify-center gap-x-[1.5rem] gap-y-[0.5rem] sm:gap-y-0 mx-auto"
      >
        <button
          class="rounded-[2rem] bg-[#FF3D9A] w-[11.25rem] border-[0.063rem] border-[#FF3D9A] h-[3.5rem] cursor-pointer"
        >
          <p class="text-[#fff] text[1rem] leading-7 font-bold">Edit Details</p>
        </button>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  add,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds
} from 'date-fns'
import SVGIcon from '~/helper/SVGIcon.vue'
import approved from '~/middleware/approved'
import stepsCompleted from '~/middleware/stepsCompleted'
import { useUserStore } from '~/store/user'

definePageMeta({
  layout: 'vendor',
  requiresAuth: true,
  middleware: [approved, stepsCompleted]
})

const userStore = useUserStore()
const { user } = userStore
const { profileCompletedAt } = user.venue

const datesItem = computed(() => {
  return [
    `${timeLeft.value.daysBetween} D`,
    `${timeLeft.value.hoursBetween} H`,
    `${timeLeft.value.minutsBetween} M`,
    `${timeLeft.value.secondsBetween} S`
  ]
})

const timeLeft = ref({
  daysBetween: 0,
  hoursBetween: 0,
  minutsBetween: 0,
  secondsBetween: 0
})

let intervalId: string | number | NodeJS.Timeout | null | undefined = null

const updateTimeLeft = () => {
  const now = new Date()
  const daysBetween = differenceInDays(
    add(profileCompletedAt, { days: 4 }),
    now
  )

  const hoursBetween =
    differenceInHours(add(profileCompletedAt, { days: 4 }), now) % 24

  const minutsBetween =
    differenceInMinutes(add(profileCompletedAt, { days: 4 }), now) % 60
  const secondsBetween =
    differenceInSeconds(add(profileCompletedAt, { days: 4 }), now) % 60

  if (!secondsBetween && !minutsBetween && !hoursBetween && !daysBetween) {
    timeLeft.value = {
      daysBetween: 0,
      hoursBetween: 0,
      minutsBetween: 0,
      secondsBetween: 0
    }
    if (intervalId !== null) {
      clearInterval(intervalId)
    }
    // Stop updating the time left
    return
  }

  // Update the reactive object
  timeLeft.value = { daysBetween, hoursBetween, minutsBetween, secondsBetween }
}

// Update time left every second
onMounted(() => {
  updateTimeLeft() // Initial update
  intervalId = setInterval(updateTimeLeft, 1000) // Update every second
})
onBeforeUnmount(() => {
  if (intervalId !== null) {
    clearInterval(intervalId)
  }
})
</script>
