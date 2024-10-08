<template>
  <div
    class="my-[1.5rem] md:my-auto overflow-scroll overflow-x-hidden h-[85vh] w-full"
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
              v-bind="value.props"
              @update-input="value.value = $event"
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
import useEmailValidator from '~/composables/useEmailValidator'
import useMobileValidator from '~/composables/useMobileValidator'
import usePasswordConfirmation from '~/composables/usePasswordConfirmation'
import usePasswordValidator from '~/composables/usePasswordValidator'

definePageMeta({
  layout: 'auth'
})

interface option {
  value: number
  name: string
}
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

interface FormSelectFiled {
  componentType: string
  value: string | number
  props: {
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
  [key: string]: FormField | FormSelectFiled
}

const isRegisterationInProgress = ref(false)
const isCheckOn = ref(false)
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
  name: {
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
  phoneNumber: {
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
        { name: 'Option 1', value: 1 },
        { name: 'Option 2', value: 2 },
        { name: 'Option 3', value: 3 }
      ]
    }
  },
  subCategory: {
    componentType: 'baseSelect',
    value: '',
    props: {
      loading: false,
      placeholder: 'Choose your sub-category',
      label: 'Sub Category',
      name: 'subCategory',
      classes:
        'w-full outline-0 text-[0.875rem] md:text-[1rem] text-[#000] block h-[3rem] md:h-[3.5rem] p-2.5 dark:placeholder-[#AAACB9]',
      required: true,
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
  const field = form.value[fieldKey]
  if (field) {
    const newIcon =
      field.props['suffix-icon'] === 'closeEye' ? 'openEye' : 'closeEye'
    field.props['suffix-icon'] = newIcon
  }
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
    case 'phoneNumber':
      return useMobileValidator(value)
    case 'password':
      return usePasswordValidator(value, 'register')
    case 'confirmPassword':
      return usePasswordConfirmation(
        value,
        form.value?.password?.value.toString()
      )
    default:
      return !!value.length ? '' : `The ${key} is Required`
  }
}

const onSubmit = () => {
  isCheckOn.value = true
  validateForm()
}
</script>
