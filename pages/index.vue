<template>
  <div class="my-[1.5rem] md:my-auto">
    <div>
      <h1
        class="text-[#2A2F4F] text-[1rem] md:text-[1.25rem] font-bold leading-8 text-center"
      >
        Login as a Vendor
      </h1>
      <p
        class="text-[#7F8295] max-w-[18rem] md:max-w-[30rem] mt-[0.5rem] text-[0.75rem] md:text-[1rem] font-normal leading-6 text-center"
      >
        Please , enter your credentials below to be login
      </p>
    </div>

    <form class="mt-[2rem]" @submit.prevent="onSubmit">
      <div class="flex justify-center">
        <div class="mx-auto w-full">
          <div v-for="(value, key) in form" :key="key">
            <baseInput
              v-bind="value.props"
              :disabled="loginBtnLoading"
              @update-input="value.value = $event"
              @suffix-icon-click="suffixIconClicked"
            />
          </div>
        </div>
      </div>
      <div class="flex justify-end">
        <NuxtLink
          :to="{ name: 'auth-forgetPassword___en' }"
          :class="{
            'text-gray-400  pointer-events-none cursor-not-allowed':
              loginBtnLoading
          }"
        >
          <p
            class="text-[0.75rem] md:text-[0.875rem] text-[#FF3D9A] cursor-pointer mt-[0.5rem] md:font-semibold hover:underline leading-[1.5rem]"
          >
            Forget Password ?
          </p>
        </NuxtLink>
      </div>
      <button
        type="submit"
        :disabled="loginBtnLoading"
        class="flex justify-center w-full font-bold mt-[0.5rem] md:mt-[2rem] mx-auto text-white bg-[#FF3D9A] hover:bg-[#e8388c] focus:outline-none leading-7 rounded-full text-[0.875rem] md:text-[1rem] py-[0.6rem] md:py-[0.875rem] text-center dark:bg-[#FF3D9A] dark:focus:ring-red-900"
      >
        <p v-if="!loginBtnLoading" class="mx-3">Log In</p>
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
      <div class="flex justify-center mt-[1rem]">
        <p
          class="text-[0.875rem] md:text-[1rem] text-[#AAACB9] mr-[0.5rem] leading-[1.5rem]"
        >
          Don’t have an account ?
        </p>
        <NuxtLink
          to="/en/auth/register"
          :class="{
            'text-gray-400  pointer-events-none cursor-not-allowed':
              loginBtnLoading
          }"
        >
          <p
            class="text-[0.75rem] md:text-[0.875rem] text-[#FF3D9A] cursor-pointer font-semibold hover:underline leading-[1.5rem]"
          >
            Register
          </p>
        </NuxtLink>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
// import SVGIcon from '~/helper/SVGIcon.vue'
import baseInput from '~/components/formElements/baseInput.vue'
import guest from '~/middleware/guest'
import useEmailValidator from '~/composables/useEmailValidator'
import usePasswordValidator from '~/composables/usePasswordValidator'
import { useSnackbarStore } from '~/store/snackbarStore'
import { useUserStore } from '~/store/user'

definePageMeta({
  layout: 'auth',
  middleware: guest
})

// Initialize the user store
const userStore = useUserStore()
const snackbarStore = useSnackbarStore()

interface FormField {
  componentType: string
  value: string | number
  props: {
    type: string
    placeholder: string
    label: string
    name: string
    'prefix-icon': string
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
  username: {
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
  },
  password: {
    componentType: 'baseInput',
    value: '',
    props: {
      type: 'password',
      placeholder: 'Enter your Password',
      label: 'Password',
      name: 'password',
      'prefix-icon': 'passwordIcon',
      'suffix-icon': 'closeEye',
      classes:
        'w-full border-[#D4D5DC] border-[0.063rem] outline-0 text-[0.875rem] md:text-[1rem] text-[#000] rounded-full block h-[3rem] md:h-[3.5rem] pl-10 p-2.5 dark:placeholder-[#AAACB9]',
      required: true,
      error: ''
    }
  }
})
const isCheckOn = ref(false)
const loginBtnLoading = ref(false)

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
    case 'username':
      return useEmailValidator(value)
    case 'password':
      return usePasswordValidator(value, 'login')
    default:
      return ''
  }
}

const formPayload = computed(() => {
  const payload: Record<string, string | number> = {}
  for (const key in form.value) {
    payload[key] = form.value[key].value
  }
  return payload
})

interface Venue {
  addressCompleted: boolean
  applicationStatus: string
  businessInfoCompleted: boolean
  dateCreated: string
  email: string
  mobileNumber: string
  photos: string[]
  photosCompleted: boolean
  profileCompleted: boolean
  rating: number
  subCategoryDisplayName:
    | 'Wedding Venue'
    | 'Private Villa'
    | 'Boat'
    | 'Restaurant'
    | ''
  subCategoryUuid: string
  tradeName: string
  uuid: string
  profileCompletedAt: string
}
interface User {
  dateCreated: string
  dateLastLogin: string
  mobileNumber: string
  state: string
  name: string
  email: string
  userType: string
  username: string
  uuid: string
  venue: Venue
  userType: string
}

interface ApiResponse {
  data: { accessToken: string; refreshToken: string; user: User }
}

const login = async () => {
  try {
    const { data, status } = await useAPI<ApiResponse>(`/auth/authenticate`, {
      method: 'POST',
      body: formPayload.value
    })

    if (status.value === 'error') {
      snackbarStore.fireSnack({
        isVisible: true,
        text: 'Invalid Credntials',
        type: 'error'
      })
      return
    }

    if (data && data.value) {
      const { data: userData } = data.value
      const { accessToken, refreshToken, user } = userData
      if (userData) {
        userStore.setUser(user)
        userStore.setTokens({ accessToken, refreshToken })
        if (
          user?.venue?.applicationStatus &&
          user.venue.applicationStatus === 'Approved'
        ) {
          router.push({ name: 'vendor-home-main-dashboard___en' })
        } else {
          router.push({ name: 'vendor___en' })
        }
      }
    }
  } catch (error) {
    console.log(error)
  } finally {
    loginBtnLoading.value = false
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
    isCheckOn.value = true
    loginBtnLoading.value = true
    login()
  }
}

const suffixIconClicked = (name: string) => {
  if (!['password'].includes(name)) {
    return
  }
  toggleShowPassword(name)
}

const toggleShowPassword = (fieldKey: string) => {
  form.value[fieldKey].props['suffix-icon'] =
    form.value[fieldKey].props['suffix-icon'] === 'closeEye'
      ? 'openEye'
      : 'closeEye'

  form.value[fieldKey].props.type =
    form.value[fieldKey].props.type === 'text' ? 'password' : 'text'
}
</script>
