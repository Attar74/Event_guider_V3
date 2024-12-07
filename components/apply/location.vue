<template>
  <div
    class="mx-auto px-[1rem] md:px-[4rem] mt-[2.5rem] mb-[10rem]"
    :class="{ 'w-[55rem]': true }"
  >
    <form
      v-if="!isPageLoading"
      class="min-w-[44rem]"
      @submit.prevent="onSubmit"
    >
      <div class="my-[2.5rem]">
        <p
          class="text-[1.25rem] text-[#2A2F4F] font-semibold leading-9 mb-[0.5rem]"
        >
          Location details
          <span class="text-[#FF3D9A]">*</span>
        </p>
        <div
          class="w-full h-full shadow-lg p-[1rem] sm:p-[1.5rem] rounded-2xl bg-[#fff] mx-auto"
        >
          <div class="mb-[1.5rem]">
            <GoogleMap @set-address="setAddress" />
          </div>
          <div class="flex justify-center">
            <div class="mx-auto w-full">
              <div v-for="(value, key) in form" :key="key" class="mt-[1.5rem]">
                <baseInput
                  :value="value.value"
                  v-bind="value.props"
                  @update-input="value.value = $event"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex mt-[2rem] md:mt-[4rem]">
        <div
          class="flex flex-col sm:flex-row justify-center gap-x-[1.5rem] gap-y-[0.5rem] sm:gap-y-0 mx-auto"
        >
          <NuxtLink
            v-if="route.name === 'vendor-form-location___en'"
            to="business-information"
          >
            <button
              class="rounded-[2rem] bg-[#fff] border-[0.063rem] border-[#FF3D9A] w-[11.25rem] h-[3.5rem] cursor-pointer"
            >
              <p class="text-[#FF3D9A] text[1rem] leading-7 font-bold">Back</p>
            </button>
          </NuxtLink>
          <button
            type="submit"
            class="rounded-[2rem] bg-[#FF3D9A] w-[11.25rem] border-[0.063rem] border-[#FF3D9A] h-[3.5rem] cursor-pointer"
          >
            <p class="text-[#fff] text[1rem] leading-7 font-bold">
              {{
                route.name === 'vendor-form-location___en'
                  ? 'Save & continue'
                  : 'Save'
              }}
            </p>
          </button>
        </div>
      </div>
    </form>
    <div v-else>
      <loader v-for="i in 2" :key="i" />
    </div>
  </div>
</template>

<script setup lang="ts">
import GoogleMap from '../ui/GoogleMap.vue'
import baseInput from '../formElements/baseInput.vue'
import loader from '../ui/loader.vue'
import { useSnackbarStore } from '~/store/snackbarStore'
import { useUserStore } from '~/store/user'

const userStore = useUserStore()
interface FormField {
  value: string | number
  props: {
    type: string
    placeholder: string
    label: string
    name: string
    'prefix-icon': string
    classes: string
    required: boolean
    error: string
  }
}

interface Form {
  [key: string]: FormField
}

const snackbarStore = useSnackbarStore()
const saveBtnLoading = ref(false)
const isPageLoading = ref(true)
const isCheckOn = ref(false)
const route = useRoute()
const form = ref<Form>({
  city: {
    value: '',
    props: {
      type: 'text',
      placeholder: 'Choose your City',
      label: 'City',
      name: 'city',
      'prefix-icon': 'locationPin',
      classes:
        'w-full border-[#D4D5DC] border-[0.063rem] outline-0 text-[0.875rem] md:text-[1rem] text-[#000] rounded-full block h-[3rem] md:h-[3.5rem] pl-10 p-2.5 dark:placeholder-[#AAACB9]',
      required: true,
      error: ''
    }
  },
  address: {
    value: '',
    props: {
      type: 'text',
      placeholder: 'Enter Address',
      label: 'Address',
      name: 'address',
      'prefix-icon': 'locationPin',
      classes:
        'w-full border-[#D4D5DC] border-[0.063rem] outline-0 text-[0.875rem] md:text-[1rem] text-[#000] rounded-full block h-[3rem] md:h-[3.5rem] pl-10 p-2.5 dark:placeholder-[#AAACB9]',
      required: true,
      error: ''
    }
  }
})

watch(
  form,
  () => {
    validateForm()
  },
  {
    deep: true // Specify deep watching
  }
)

// Validate Form inputs
const validateForm = () => {
  if (!isCheckOn.value) {
    return
  }
  for (const key in form.value) {
    if (form.value?.[key]?.props?.required) {
      form.value[key].props.error = checkFormVal(key)
    }
  }
}

/**
 * Checks the value of a form input and returns an error message or an empty string.
 * @param key - The key of the form input to check.
 * @returns An error message if the input is invalid, an empty string otherwise.
 */
const checkFormVal = (key: string) => {
  let { value } = form.value?.[key]
  value = value.toString()
  return !!value.length ? '' : `The ${key} is Required`
}

const isValidForm = computed(() => {
  return Object.values(form.value).every(({ props }) => !props?.error?.length)
})

const formPayload = computed(() => {
  const payload: Record<string, string | number> = {}
  for (const key in form.value) {
    payload[key] = form.value[key].value
  }
  return payload
})

const updateLocationInfo = async () => {
  try {
    const { status, data } = await useAPI<ApiResponse>(
      `/vendors/my/business-address`,
      {
        method: 'PUT',
        body: formPayload.value
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
    if (data && data.value) {
      const { data: userData } = data.value
      const { addressCompleted, profileCompleted, profileCompletedAt } =
        userData

      if (userData && route.name === 'vendor-form-location___en') {
        userStore.UpdateUserData({
          addressCompleted,
          profileCompleted,
          profileCompletedAt
        })
        navigateTo({
          name:
            userData?.applicationStatus === 'Approved'
              ? 'vendor-home-main-dashboard___en'
              : 'vendor-form-photos___en'
        })
      }
    }
    snackbarStore.fireSnack({
      isVisible: true,
      text: 'Location Info has been updated successfully',
      type: 'success'
    })
  } catch (e) {
  } finally {
    saveBtnLoading.value = false
  }
}

const onSubmit = () => {
  isCheckOn.value = true
  validateForm()
  if (isValidForm.value) {
    isCheckOn.value = true
    saveBtnLoading.value = true
    updateLocationInfo()
  }
}

interface Item {
  [key: string]: string | number // Add index signature for dynamic keys
  // Other known properties
}

interface ApiResponse {
  data: Item
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

const setAddress = (fullAddress: Record<string, string | number>) => {
  form.value.address.value = fullAddress.address
  form.value.city.value = fullAddress.city
}

const setLocationData = async () => {
  try {
    const { data, status } = await useAPI<ApiResponse>(
      `/vendors/my/business-address`,
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
  setTimeout(() => {
    nextTick(() => {
      setLocationData()
    })
  })
})
</script>
