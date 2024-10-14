<template>
  <div class="my-[1.5rem] md:my-auto px-[0.25rem] md:px-[4.5rem]">
    <div class="flex justify-center">
      <SVGIcon icon="openMail" />
    </div>
    <div class="my-[2rem]">
      <h1
        class="text-[#2A2F4F] text-[1rem] md:text-[1.25rem] font-bold leading-8 text-center"
      >
        Check Your Messages
      </h1>
      <p
        class="text-[#7F8295] max-w-[18rem] md:max-w-[30rem] mt-[0.5rem] text-[0.75rem] md:text-[1rem] font-normal leading-6 text-center"
      >
        We have sent a Verification Code to info@unify.com please, write the
        code below
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
        <p v-if="!isCheckInProgress" class="mx-3">Confirm</p>
        <SVGIcon v-else icon="circularLoader" />
      </button>
      <div class="flex justify-center mt-[1rem]">
        <p class="mx-[1rem] text-[0.875rem] leading-6 text-[#AAACB9]">
          Don't receive the code ?
        </p>
        <p
          class="text-[0.875rem] leading-6 text-[#FF3D9A] cursor-pointer hover:underline"
        >
          Request New Code
        </p>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import SVGIcon from '~/helper/SVGIcon.vue'
import baseInput from '~/components/formElements/baseInput.vue'
import guest from '~/middleware/guest'

definePageMeta({
  layout: 'auth',
  middleware: guest
})
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

const isCheckInProgress = ref(false)
const isCheckOn = ref(false)

const form = ref<Form>({
  code: {
    value: '',
    props: {
      type: 'text',
      placeholder: 'Enter code',
      label: 'Verification Code',
      name: 'VerificationCode',
      'prefix-icon': 'openMainIcon',
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
  return !value.length
    ? 'Code is Required'
    : value.length !== 4
      ? 'Please Enter a Valid Code'
      : ''
}

const router = useRouter()
const route = useRoute()

const validateOTP = async () => {
  if (
    route.query.email?.length &&
    useEmailValidator(route.query.email.toString()).length
  ) {
    return
  }
  try {
    const { status } = await useAPI(`/account/validate-otp`, {
      method: 'POST',
      body: {
        email: route.query.email,
        otp: form.value.code.value
      }
    })
    if (status.value === 'error') return
    router.push({
      name: 'auth-newPassword___en',
      query: { email: route.query.email }
    })
  } catch {
  } finally {
    isCheckInProgress.value = false
  }
}

const isValidForm = computed(() => {
  return Object.values(form.value).every(({ props }) => !props?.error?.length)
})

const onSubmit = () => {
  isCheckOn.value = true
  validateForm()
  if (isValidForm.value) {
    isCheckInProgress.value = true
    validateOTP()
  }
}
</script>
