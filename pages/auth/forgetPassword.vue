<template>
  <div class="my-[1.5rem] md:my-auto px-[0.25rem] md:px-[4.5rem]">
    <div class="flex justify-center">
      <SVGIcon icon="lock" />
    </div>
    <div class="my-[2rem]">
      <h1
        class="text-[#2A2F4F] text-[1rem] md:text-[1.25rem] font-bold leading-8 text-center"
      >
        Forget Password ?
      </h1>
      <p
        class="text-[#7F8295] max-w-[18rem] md:max-w-[30rem] mt-[0.5rem] text-[0.75rem] md:text-[1rem] font-normal leading-6 text-center"
      >
        Enter the email associated with your account and we'll send a
        Verification Code to reset your password.
      </p>
    </div>
    <form @submit.prevent="onSubmit">
      <div class="flex justify-center">
        <div class="mx-auto w-full">
          <div v-for="(value, key) in form" :key="key">
            <baseInput
              v-bind="value.props"
              @update-input="value.value = $event"
            />
          </div>
        </div>
      </div>
      <button
        type="submit"
        class="w-full font-bold mt-[0.5rem] md:mt-[2rem] mx-auto text-white bg-[#FF3D9A] hover:bg-[#e8388c] focus:outline-none leading-7 rounded-full text-[0.875rem] md:text-[1rem] py-[0.6rem] md:py-[0.875rem] text-center dark:bg-[#FF3D9A] dark:focus:ring-red-900"
      >
        <p v-if="!isCheckInProgress" class="mx-3">Get Code</p>
        <SVGIcon v-else icon="circularLoader" />
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import SVGIcon from '~/helper/SVGIcon.vue'
import baseInput from '~/components/formElements/baseInput.vue'
import guest from '~/middleware/guest'
import useEmailValidator from '~/composables/useEmailValidator'
import { useSnackbarStore } from '~/store/snackbarStore'

definePageMeta({
  layout: 'auth',
  middleware: guest
})
interface FormField {
  componentType: string
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

const isCheckInProgress = ref(false)
const isCheckOn = ref(false)
const snackbarStore = useSnackbarStore()

const form = ref<Form>({
  email: {
    componentType: 'baseInput',
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
  // isRegisterationInProgress.value = true
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
    default:
      return ''
  }
}

const sendOtp = async () => {
  try {
    const { status } = await useAPI(`/account/forgot-password`, {
      method: 'POST',
      body: `"${form.value.email.value}"`
    })
    if (status.value === 'error') {
      snackbarStore.fireSnack({
        isVisible: true,
        text: 'User cannot be found',
        type: 'error'
      })
      return
    }
    router.push({
      name: 'auth-confirmCode___en',
      query: { email: form.value.email.value }
    })
  } catch {
  } finally {
    isCheckInProgress.value = false
  }
}

const router = useRouter()
const isValidForm = computed(() => {
  return Object.values(form.value).every(({ props }) => !props?.error?.length)
})

const onSubmit = () => {
  isCheckOn.value = true
  validateForm()
  if (isValidForm.value) {
    isCheckInProgress.value = true
    sendOtp()
  }
}
</script>
