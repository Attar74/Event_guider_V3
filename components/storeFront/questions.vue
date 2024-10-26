<template>
  <div
    class="mx-auto px-[1rem] md:px-[4rem] mt-[2.5rem] mb-[10rem]"
    :class="{ 'w-[55rem]': true }"
  >
    <form v-if="!isPageLoading" @submit.prevent="onSubmit">
      <div class="my-[2.5rem]">
        <div
          class="w-full h-full overflow-hidden shadow-lg p-[1rem] sm:p-[1.5rem] rounded-2xl bg-[#fff] mx-auto"
        >
          <div>
            <p class="text-[#2A2F4F] text-[1rem] font-semibold leading-7">
              You have to answer all required questions below
            </p>
            <p class="text-[#7F8295] text-[0.875rem] font-medium leading-6">
              We recommend you answer all the questions, as it's very useful
              information for couples.
            </p>
          </div>
        </div>
      </div>
      <div class="my-[2.5rem]">
        <p
          class="text-[1.25rem] text-[#2A2F4F] font-semibold leading-9 mb-[0.5rem]"
        >
          Price
          <spna class="text-[#FF3D9A]">*</spna>
        </p>
        <div
          class="w-full h-full overflow-hidden shadow-lg p-[1rem] sm:p-[1.5rem] rounded-2xl bg-[#fff] mx-auto"
        >
          <p class="text-[#2A2F4F] text-[1rem] font-semibold leading-7">
            From which price can I hire my Venues ?
          </p>
          <div class="bg-[#F9F9FA] text-[0.75rem] rounded-[0.75rem]">
            <p
              class="text-[#7F8295] text-[0.875rem] font-normal leading-7 p-[1rem]"
            >
              Enter your average pricing for your storefront to appear in
              results when couples search by price.
            </p>
          </div>
          <div
            class="grid grid-cols-1 md:grid-cols-2 gap-x-0 md:gap-x-[1.5rem] mt-[1.5rem]"
          >
            <div class="col-span-2 md:col-span-1">
              <baseInput
                v-bind="form.minPrice.props"
                :value="form.minPrice.value"
                @update-input="form.minPrice.value = $event"
              />
            </div>
            <div class="col-span-2 md:col-span-1">
              <baseInput
                v-bind="form.maxPrice.props"
                :value="form.maxPrice.value"
                @update-input="form.maxPrice.value = $event"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="my-[2.5rem]">
        <p
          class="text-[1.25rem] text-[#2A2F4F] font-semibold leading-9 mb-[0.5rem]"
        >
          Capacity
          <spna class="text-[#FF3D9A]">*</spna>
        </p>
        <div
          class="w-full h-full overflow-hidden shadow-lg p-[1rem] sm:p-[1.5rem] rounded-2xl bg-[#fff] mx-auto"
        >
          <p class="text-[#2A2F4F] text-[1rem] font-semibold leading-7">
            How many guests can you accommodate ?
          </p>
          <div
            class="grid grid-cols-1 md:grid-cols-2 gap-x-0 md:gap-x-[1.5rem] mt-[1.5rem]"
          >
            <div class="col-span-2 md:col-span-1">
              <baseInput
                v-bind="form.minGuestNo.props"
                :value="form.minGuestNo.value"
                @update-input="form.minGuestNo.value = $event"
              />
            </div>
            <div class="col-span-2 md:col-span-1">
              <baseInput
                v-bind="form.maxGuestNo.props"
                :value="form.maxGuestNo.value"
                @update-input="form.maxGuestNo.value = $event"
              />
            </div>
          </div>
        </div>
        <div class="flex mt-[2rem] md:mt-[4rem]">
          <div
            class="flex flex-col sm:flex-row justify-center gap-x-[1.5rem] gap-y-[0.5rem] sm:gap-y-0 mx-auto"
          >
            <button
              type="submit"
              :disabled="saveBtnLoading"
              class="rounded-[2rem] w-[11.25rem] border-[0.063rem] h-[3.5rem] border-[#FF3D9A]"
              :class="
                saveBtnLoading
                  ? 'cursor-not-allowed bg-[#fc53a4] text-[#fff]'
                  : 'bg-[#FF3D9A] cursor-pointer '
              "
            >
              <p
                v-if="!saveBtnLoading"
                class="text-[#fff] text[1rem] leading-7 font-bold"
              >
                Save
              </p>
              <svg
                v-else
                aria-hidden="true"
                class="mx-auto w-8 h-8 animate-spin text-[#e8388c] fill-white"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </form>
    <div v-else>
      <loader v-for="i in 2" :key="i" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import baseInput from '../formElements/baseInput.vue'
import loader from '../ui/loader.vue'
import useComparisonNumber from '~/composables/useComparisonNumber.ts'
import { useSnackbarStore } from '~/store/snackbarStore'

interface FormField {
  value: string | number
  props: {
    type?: string
    placeholder: string
    label?: string
    name: string
    'prefix-icon'?: string
    'suffix-icon'?: string
    classes: string
    required: boolean
    error: string
  }
}
interface Form {
  [key: string]: FormField
}
const form = ref<Form>({
  minPrice: {
    value: '',
    props: {
      type: 'number ',
      placeholder: 'enter min price',
      label: 'Min price',
      name: 'minPrice',
      'prefix-icon': 'moneyIcon',
      'suffix-icon': 'EGPIcon',
      classes:
        'w-full border-[#D4D5DC] border-[0.063rem] outline-0 text-[0.875rem] md:text-[1rem] text-[#000] rounded-full block h-[3rem] md:h-[3.5rem] pl-10 p-2.5 dark:placeholder-[#AAACB9]',
      required: true,
      error: ''
    }
  },
  maxPrice: {
    value: '',
    props: {
      type: 'number ',
      placeholder: 'enter max price',
      label: 'Max price',
      name: 'maxPrice',
      'prefix-icon': 'moneyIcon',
      'suffix-icon': 'EGPIcon',
      classes:
        'w-full border-[#D4D5DC] border-[0.063rem] outline-0 text-[0.875rem] md:text-[1rem] text-[#000] rounded-full block h-[3rem] md:h-[3.5rem] pl-10 p-2.5 dark:placeholder-[#AAACB9]',
      required: true,
      error: ''
    }
  },
  minGuestNo: {
    value: '',
    props: {
      type: 'number',
      placeholder: 'enter min no.',
      label: 'Min number of guests',
      name: 'minGuestNo',
      'prefix-icon': 'guestNo',
      classes:
        'w-full border-[#D4D5DC] border-[0.063rem] outline-0 text-[0.875rem] md:text-[1rem] text-[#000] rounded-full block h-[3rem] md:h-[3.5rem] pl-10 p-2.5 dark:placeholder-[#AAACB9]',
      required: true,
      error: ''
    }
  },
  maxGuestNo: {
    value: '',
    props: {
      type: 'number',
      placeholder: 'enter max no.',
      label: 'Max number of guests',
      name: 'maxGuestNo',
      'prefix-icon': 'guestNo',
      classes:
        'w-full border-[#D4D5DC] border-[0.063rem] outline-0 text-[0.875rem] md:text-[1rem] text-[#000] rounded-full block h-[3rem] md:h-[3.5rem] pl-10 p-2.5 dark:placeholder-[#AAACB9]',
      required: true,
      error: ''
    }
  }
})

const isCheckOn = ref(false)
const snackbarStore = useSnackbarStore()
const isPageLoading = ref(true)
const saveBtnLoading = ref(false)

watch(
  form,
  () => {
    validateForm()
  },
  {
    deep: true // Specify deep watching
  }
)

const validateForm = () => {
  if (!isCheckOn.value) {
    return
  }
  // isRegisterationInProgress.value = true
  for (const key in form.value) {
    if (form.value?.[key]?.props?.required) {
      form.value[key].props.error = checkFormVal(key)
    }
  }
}

const checkFormVal = (key: string) => {
  let { value } = form.value?.[key]
  value = value.toString()
  switch (key) {
    case 'minPrice':
      return useComparisonNumber(
        value,
        form.value.maxPrice.value,
        'Min Price',
        'greaterThanOrEqual'
      )
    case 'maxPrice':
      return useComparisonNumber(
        value,
        form.value.minPrice.value,
        'max Price',
        'lessThanOrEqual'
      )
    case 'minGuestNo':
      return useComparisonNumber(
        value,
        form.value.maxGuestNo.value,
        'min Guests No.',
        'greaterThanOrEqual'
      )
    case 'maxGuestNo':
      return useComparisonNumber(
        value,
        form.value.minGuestNo.value,
        'max Guests No.',
        'lessThanOrEqual'
      )
    default:
      return !value
        ? `${key} is required`
        : Number(value) <= 0
          ? `${key} should be greater than 0`
          : ''
  }
}

const formPayload = computed(() => {
  const payload: Record<string, string | number> = {}
  for (const key in form.value) {
    payload[key] = form.value[key].value
  }
  return payload
})

const isValidForm = computed(() => {
  return Object.values(form.value).every(({ props }) => !props?.error?.length)
})

const onSubmit = async () => {
  isCheckOn.value = true
  validateForm()
  if (isValidForm.value) {
    isCheckOn.value = true
    saveBtnLoading.value = true
    updateQuestionAnswers()
  }
}

const updateQuestionAnswers = async () => {
  try {
    await useAPI(`/vendors/my/venue-questions`, {
      method: 'PUT',
      body: { ...formPayload.value, style: 'Wedding', styleType: 'Indoor' }
    })
    snackbarStore.fireSnack({
      isVisible: true,
      text: 'Data has been updated successfully',
      type: 'success'
    })
  } catch (error) {
  } finally {
    saveBtnLoading.value = false
  }
}

const updateFormValues = (data: Record<string, string | number>) => {
  if (data) {
    for (const key in data) {
      // Check if the form field exists before assigning the value
      if (form.value[key]) {
        form.value[key] = {
          ...form.value[key], // Keep the props intact
          value: data[key] // Set the new value
        }
      }
    }
  }
}

interface Item {
  [key: string]: string | number // Add index signature for dynamic keys
  // Other known properties
}

interface ApiResponse {
  data: Item
}

const setQuestionsAnswers = async () => {
  try {
    const { data, status } = await useAPI<ApiResponse>(
      `/vendors/my/venue-questions`,
      {
        method: 'GET'
      }
    )
    if (status.value === 'error') {
      snackbarStore.fireSnack({
        isVisible: true,
        text: 'Something went wrong',
        type: 'error'
      })
      return
    }
    if (data?.value?.data) updateFormValues(data.value.data)
  } catch (e) {
  } finally {
    isPageLoading.value = false
  }
}
onMounted(() => {
  nextTick(() => {
    setQuestionsAnswers()
  })
})
</script>
