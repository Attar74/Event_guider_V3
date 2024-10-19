<template>
  <div
    class="mx-auto px-[1rem] md:px-[4rem] mt-[2.5rem] mb-[10rem]"
    :class="{ 'w-[55rem]': true }"
  >
    <div>
      <form v-if="!isPageLoading" @submit.prevent="onSubmit">
        <div class="my-[2.5rem]">
          <p
            class="text-[1.25rem] text-[#2A2F4F] font-semibold leading-9 mb-[0.5rem]"
          >
            Your login details
          </p>
          <div
            class="w-full h-full overflow-hidden shadow-lg p-[1rem] sm:p-[1.5rem] rounded-2xl bg-[#fff] mx-auto"
          >
            <baseInput
              v-bind="form.username.props"
              :value="form.username.value"
              @update-input="form.username.value = $event"
            />
            <NuxtLink>
              <p class="text-[#FF3D9A] text-[1rem] leading-7">
                Change Password
              </p>
            </NuxtLink>
          </div>
        </div>
        <div class="my-[2.5rem]">
          <p
            class="text-[1.25rem] text-[#2A2F4F] font-semibold leading-9 mb-[0.5rem]"
          >
            Describe your business and services *
          </p>
          <div
            class="w-full h-full overflow-hidden shadow-lg p-[1rem] sm:p-[1.5rem] rounded-2xl bg-[#fff] mx-auto"
          >
            <div>
              <p class="text-[#2A2F4F] text-[0.875rem] leading-6">
                Share unique, descriptive information about your business in
                order to attract more couples and boost your visibility across
                top search engines. Please do not include any contact
                information in this section.
              </p>
              <div class="mt-[1rem]">
                <baseTextArea
                  v-bind="form.description.props"
                  :value="form.description.value"
                  @update-input="form.description.value = $event"
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <p
            class="text-[1.25rem] text-[#2A2F4F] font-semibold leading-9 mb-[0.5rem]"
          >
            Contact details
          </p>
          <div
            class="w-full h-full overflow-hidden shadow-lg p-[1rem] sm:p-[1.5rem] rounded-2xl bg-[#fff] mx-auto"
          >
            <div>
              <div class="bg-[#F9F9FA] p-[1rem] rounded-xl">
                <p class="text-[#2A2F4F] text-[1rem] leading-6">
                  Lead notifications and updates from Hitched will be sent to
                  this email address.
                </p>
              </div>
              <div
                class="grid grid-cols-1 md:grid-cols-2 gap-x-0 md:gap-x-[1.5rem] mx-auto w-full mt-[1.5rem]"
              >
                <div v-for="(value, key) in form" :key="key">
                  <baseInput
                    v-if="!['username', 'description'].includes(key.toString())"
                    v-bind="value.props"
                    :value="value.value"
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
            <NuxtLink to="/en/vendor">
              <button
                class="rounded-[2rem] bg-[#fff] border-[0.063rem] border-[#FF3D9A] w-[11.25rem] h-[3.5rem] cursor-pointer"
              >
                <p class="text-[#FF3D9A] text[1rem] leading-7 font-bold">
                  Back
                </p>
              </button>
            </NuxtLink>
            <button
              type="submit"
              :disabled="saveBtnLoading"
              class="rounded-[2rem] bg-[#FF3D9A] w-[11.25rem] border-[0.063rem] border-[#FF3D9A] h-[3.5rem] cursor-pointer"
            >
              <p
                v-if="!saveBtnLoading"
                class="text-[#fff] text[1rem] leading-7 font-bold"
              >
                Save & continue
              </p>
              <SVGIcon v-else icon="circularLoader" />
            </button>
          </div>
        </div>
      </form>
      <div v-else>
        <loader v-for="i in 2" :key="i" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SVGIcon from '~/helper/SVGIcon.vue'
import baseInput from '../formElements/baseInput.vue'
import baseTextArea from '../formElements/baseTextArea.vue'
import loader from '../ui/loader.vue'
import { useSnackbarStore } from '~/store/snackbarStore'
import useWebsiteValidator from '~/composables/useWebsiteValidator'

const saveBtnLoading = ref(false)
interface FormField {
  value: string | number
  props: {
    type?: string
    placeholder: string
    label?: string
    name: string
    'prefix-icon'?: string
    classes: string
    required: boolean
    error: string
  }
}
interface Form {
  [key: string]: FormField
}

const form = ref<Form>({
  username: {
    value: '',
    props: {
      type: 'text',
      placeholder: 'Enter your name',
      label: 'User Name',
      name: 'username',
      'prefix-icon': 'userIcon',
      classes:
        'w-full border-[#D4D5DC] border-[0.063rem] outline-0 text-[0.875rem] md:text-[1rem] text-[#000] rounded-full block h-[3rem] md:h-[3.5rem] pl-10 p-2.5 dark:placeholder-[#AAACB9]',
      required: true,
      error: ''
    }
  },
  description: {
    value: '',
    props: {
      placeholder: 'Enter your message',
      name: 'description',
      classes:
        'w-full bg-[#F9F9FA] w-full border-[#D4D5DC] border-[0.063rem] outline-0 text-[0.875rem] md:text-[1rem] text-[#000] rounded-xl block pt-[0.875rem] pl-[1.25rem]',
      required: true,
      error: ''
    }
  },
  tradeName: {
    value: '',
    props: {
      type: 'text',
      placeholder: 'Enter your trade name',
      label: 'Trade Name',
      name: 'TradeName',
      'prefix-icon': 'TradeIcon',
      classes:
        'w-full border-[#D4D5DC] border-[0.063rem] outline-0 text-[0.875rem] md:text-[1rem] text-[#000] rounded-full block h-[3rem] md:h-[3.5rem] pl-10 p-2.5 dark:placeholder-[#AAACB9]',
      required: true,
      error: ''
    }
  },
  email: {
    value: '',
    props: {
      type: 'email',
      placeholder: 'Enter your Email',
      label: 'Email',
      name: 'Email',
      'prefix-icon': 'emailIcon',
      classes:
        'w-full border-[#D4D5DC] border-[0.063rem] outline-0 text-[0.875rem] md:text-[1rem] text-[#000] rounded-full block h-[3rem] md:h-[3.5rem] pl-10 p-2.5 dark:placeholder-[#AAACB9]',
      required: true,
      error: ''
    }
  },
  mobileNumber: {
    value: '',
    props: {
      type: 'tel',
      placeholder: 'Ex: 01xxxxxxxxx',
      label: 'Mobile Number',
      name: 'Mobile Number',
      'prefix-icon': 'mobileIcon',
      classes:
        'w-full border-[#D4D5DC] border-[0.063rem] outline-0 text-[0.875rem] md:text-[1rem] text-[#000] rounded-full block h-[3rem] md:h-[3.5rem] pl-10 p-2.5 dark:placeholder-[#AAACB9]',
      required: true,
      error: ''
    }
  },
  telephone: {
    value: '',
    props: {
      type: 'tel',
      placeholder: 'Ex: 01xxxxxxxxx',
      label: 'Telephone',
      name: 'telephone',
      'prefix-icon': 'landlineIcon',
      classes:
        'w-full border-[#D4D5DC] border-[0.063rem] outline-0 text-[0.875rem] md:text-[1rem] text-[#000] rounded-full block h-[3rem] md:h-[3.5rem] pl-10 p-2.5 dark:placeholder-[#AAACB9]',
      required: true,
      error: ''
    }
  },
  websiteUrl: {
    value: '',
    props: {
      type: 'text',
      placeholder: 'Enter Website',
      label: 'Website',
      name: 'websiteUrl',
      'prefix-icon': 'WebsiteIcon',
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

const isCheckOn = ref(false)
const snackbarStore = useSnackbarStore()

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
  switch (key) {
    case 'email':
      return useEmailValidator(value)
    case 'mobileNumber':
      return useMobileValidator(value, 'mobile')
    case 'telephone':
      return useMobileValidator(value, 'landLine')
    case 'websiteUrl':
      return useWebsiteValidator(value)
    default:
      return !value.length
        ? `The ${key} is Required`
        : value.length < 4
          ? `The ${key} can't be less than 4 characters`
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

interface Item {
  [key: string]: string | number // Add index signature for dynamic keys
  // Other known properties
}

interface ApiResponse {
  data: Item
}

const updateBusinessInfo = async () => {
  try {
    const { status } = await useAPI<ApiResponse>(`/vendors/my/business-info`, {
      method: 'PUT',
      body: formPayload.value
    })

    if (status.value === 'error') {
      snackbarStore.fireSnack({
        isVisible: true,
        text: 'Something went wrong',
        type: 'error'
      })
      return
    }
    snackbarStore.fireSnack({
      isVisible: true,
      text: 'Bussiness Info has been updated successfully',
      type: 'success'
    })
    navigateTo({ name: 'vendor-form-location___en' })
  } catch (e) {
  } finally {
    saveBtnLoading.value = false
  }
}

const isPageLoading = ref(true)
const isValidForm = computed(() => {
  return Object.values(form.value).every(({ props }) => !props?.error?.length)
})
const onSubmit = () => {
  isCheckOn.value = true
  validateForm()
  if (isValidForm.value) {
    isCheckOn.value = true
    saveBtnLoading.value = true
    updateBusinessInfo()
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

const setBusniessInfoData = async () => {
  try {
    const { data, status } = await useAPI<ApiResponse>(
      `/vendors/my/business-info`,
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
  setBusniessInfoData()
})
</script>
