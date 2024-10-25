<template>
  <div
    class="px-[0.25rem] md:px-[4.5rem] my-[1.5rem] md:my-auto overflow-scroll overflow-x-hidden h-[85vh] w-full"
  >
    <div>
      <h1
        class="text-[#2A2F4F] text-[1rem] md:text-[1.25rem] font-bold leading-8 text-center"
      >
        Welcome to Event Guiders 👋
      </h1>
      <p
        class="mx-auto text-[#7F8295] max-w-[18rem] md:max-w-[24.1rem] mt-[0.5rem] text-[0.75rem] md:text-[1rem] font-normal leading-6 text-center"
      >
        Please , enter your below information to register as a vendor
      </p>
    </div>
    <form class="px-[1rem] mt-[2rem]" @submit.prevent="onSubmit">
      <div class="flex justify-center">
        <div class="mx-auto w-full">
          <div v-for="(value, key) in form" :key="key">
            <component
              :is="value.componentType === 'baseInput' ? baseInput : baseSelect"
              v-if="
                key === 'subCategoryUuid'
                  ? !!form.subCategoryUuid.props.options?.length
                  : true
              "
              v-bind="value.props"
              @update-input="setInputValue(key, $event)"
              @suffix-icon-click="suffixIconClicked"
            />
          </div>
        </div>
      </div>
      <button
        type="submit"
        class="w-full font-bold mt-[0.5rem] md:mt-[2rem] mx-auto text-white bg-[#FF3D9A] hover:bg-[#e8388c] focus:outline-none leading-7 rounded-full text-[0.875rem] md:text-[1rem] py-[0.6rem] md:py-[0.875rem] text-center dark:bg-[#FF3D9A] dark:focus:ring-red-900"
      >
        <p v-if="!isRegisterationInProgress" class="mx-3">Register</p>
        <SVGIcon v-else icon="circularLoader" />
      </button>
      <div class="flex justify-center mt-[1rem]">
        <p
          class="text-[0.875rem] md:text-[1rem] text-[#AAACB9] mr-[0.5rem] leading-[1.5rem]"
        >
          Do you have an account ?
        </p>
        <NuxtLink to="/en">
          <p
            class="text-[0.75rem] md:text-[0.875rem] text-[#FF3D9A] cursor-pointer font-semibold hover:underline leading-[1.5rem]"
          >
            Login
          </p>
        </NuxtLink>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import SVGIcon from '~/helper/SVGIcon.vue'
import baseInput from '~/components/formElements/baseInput.vue'
import baseSelect from '~/components/formElements/baseSelect.vue'
import guest from '~/middleware/guest'
import useEmailValidator from '~/composables/useEmailValidator'
import useMobileValidator from '~/composables/useMobileValidator'
import usePasswordConfirmation from '~/composables/usePasswordConfirmation'
import usePasswordValidator from '~/composables/usePasswordValidator'
import { useSnackbarStore } from '~/store/snackbarStore'

definePageMeta({
  layout: 'auth',
  middleware: guest
})

interface option {
  value: string
  name: string
}
interface FormField {
  componentType: string
  value: string | number
  props: {
    type?: string
    placeholder: string
    label: string
    name: string
    'prefix-icon': string
    'suffix-icon'?: string
    classes: string
    required: boolean
    error: string
    options?: option[]
  }
}

interface FormSelectFiled {
  componentType: string
  value: string | number
  props: {
    type?: string
    placeholder: string
    label: string
    name: string
    'prefix-icon'?: string
    'suffix-icon'?: string
    classes: string
    required: boolean
    error: string
    options: option[]
    loading: boolean
  }
}

interface Form {
  [key: string]: FormSelectFiled | FormField
}
interface SubCategory {
  value: string
  name: string
  category: string
}

const isRegisterationInProgress = ref(false)
const isCheckOn = ref(false)
const snackbarStore = useSnackbarStore()
const subCategories = ref<SubCategory[]>([])

const form = ref<Form>({
  tradeName: {
    componentType: 'baseInput',
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
  Username: {
    componentType: 'baseInput',
    value: '',
    props: {
      type: 'text',
      placeholder: 'Enter your name',
      label: 'User Name',
      name: 'name',
      'prefix-icon': 'userIcon',
      classes:
        'w-full border-[#D4D5DC] border-[0.063rem] outline-0 text-[0.875rem] md:text-[1rem] text-[#000] rounded-full block h-[3rem] md:h-[3.5rem] pl-10 p-2.5 dark:placeholder-[#AAACB9]',
      required: true,
      error: ''
    }
  },
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
  },
  MobileNumber: {
    componentType: 'baseInput',
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
  category: {
    componentType: 'baseSelect',
    value: '',
    props: {
      loading: false,
      placeholder: 'Choose your category',
      label: 'Category',
      name: 'Mobile Number',
      classes:
        'w-full outline-0 text-[0.875rem] md:text-[1rem] text-[#000] block h-[3rem] md:h-[3.5rem] p-2.5 dark:placeholder-[#AAACB9]',
      required: true,
      error: '',
      options: [
        { value: 'Hotel', name: 'Hotel' },
        { value: 'Venue', name: 'Venue' },
        { value: 'Service', name: 'Service' }
      ]
    }
  },
  subCategoryUuid: {
    componentType: 'baseSelect',
    value: '',
    props: {
      loading: false,
      placeholder: 'Choose your sub-category',
      label: 'Sub-Category',
      name: 'subCategoryUuid',
      classes:
        'w-full outline-0 text-[0.875rem] md:text-[1rem] text-[#000] block h-[3rem] md:h-[3.5rem] p-2.5 dark:placeholder-[#AAACB9]',
      required: false,
      error: '',
      options: []
    }
  },
  password: {
    componentType: 'baseInput',
    value: '',
    props: {
      type: 'password',
      placeholder: 'Create your Password',
      label: 'Password',
      name: 'password',
      'prefix-icon': 'passwordIcon',
      'suffix-icon': 'closeEye',
      classes:
        'w-full border-[#D4D5DC] border-[0.063rem] outline-0 text-[0.875rem] md:text-[1rem] text-[#000] rounded-full block h-[3rem] md:h-[3.5rem] pl-10 p-2.5 dark:placeholder-[#AAACB9]',
      required: true,
      error: ''
    }
  },
  confirmPassword: {
    componentType: 'baseInput',
    value: '',
    props: {
      type: 'password',
      placeholder: 'Confirm your Password',
      label: 'Confirm Password',
      name: 'confirmPassword',
      'prefix-icon': 'passwordIcon',
      'suffix-icon': 'closeEye',
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

const toggleShowPassword = (fieldKey: string) => {
  form.value[fieldKey].props['suffix-icon'] =
    form.value[fieldKey].props['suffix-icon'] === 'closeEye'
      ? 'openEye'
      : 'closeEye'

  form.value[fieldKey].props.type =
    form.value[fieldKey].props.type === 'text' ? 'password' : 'text'
}

const suffixIconClicked = (name: string) => {
  if (!['password', 'confirmPassword'].includes(name)) {
    return
  }
  toggleShowPassword(name)
}

// Validate Form inputs
const validateForm = () => {
  if (!isCheckOn.value) {
    return
  }
  for (const key in form.value) {
    if (form.value?.[key]?.props?.required) {
      form.value[key].props.error = checkFormVal(key)
    } else {
      form.value[key].props.error = ''
    }
  }
}

const checkFormVal = (key: string) => {
  let { value } = form.value?.[key]
  value = value?.toString()
  switch (key) {
    case 'email':
      return useEmailValidator(value)
    case 'MobileNumber':
      return useMobileValidator(value)
    case 'password':
      return usePasswordValidator(value, 'register')
    case 'confirmPassword':
      return usePasswordConfirmation(
        value,
        form.value?.password?.value.toString()
      )
    default:
      return !!value?.length ? '' : `The ${key} is Required`
  }
}

const router = useRouter()
const isValidForm = computed(() => {
  return Object.values(form.value).every(({ props }) => !props?.error?.length)
})

const setInputValue = (key: string | number, value: string) => {
  form.value[key].value = value
  if (key === 'category') {
    form.value.subCategoryUuid.props.options = subCategories.value.filter(
      subCategory => subCategory.category === form.value.category.value
    )
    form.value.subCategoryUuid.props.required =
      !!form.value.subCategoryUuid.props?.options?.length
  }
}

const onSubmit = () => {
  isCheckOn.value = true
  validateForm()
  if (isValidForm.value) {
    isCheckOn.value = true
    isRegisterationInProgress.value = true
    register()
  }
}

const formPayload = computed(() => {
  let payload: Record<string, string | number> = {}
  for (const key in form.value) {
    payload = {
      ...payload,
      ...(!!form.value[key].value && { [key]: form.value[key].value })
    }
  }
  return payload
})

const register = async () => {
  try {
    const { status } = await useAPI(`/account/vendors`, {
      method: 'POST',
      body: formPayload.value
    })
    if (status.value === 'error') {
      snackbarStore.fireSnack({
        isVisible: true,
        text: 'Email already exists',
        type: 'error'
      })
      return
    }
    router.push({ name: 'index___en' })
  } catch (error) {
    console.log(error)
  } finally {
    isRegisterationInProgress.value = false
  }
}

interface Item {
  uuid: string
  displayName: string
  category: string
}

interface ApiResponse {
  data: Item[]
}

const setSubCategories = async () => {
  try {
    const { data } = await useAPI<ApiResponse>(`/account/sub-categories`)
    subCategories.value =
      data.value?.data?.map((item: Item) => ({
        value: item.uuid,
        name: item.displayName,
        category: item.category
      })) || []
  } catch (error) {
    console.log(error)
  }
}
setSubCategories()
</script>
