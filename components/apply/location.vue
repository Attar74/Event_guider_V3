<!-- <template>
  <div>
    <h1>Pick a Location</h1>
    <GoogleMap />
  </div>
</template>

<script setup lang="ts">
import GoogleMap from '~/components/ui/GoogleMap.vue'
</script> -->
<template>
  <div
    class="mx-auto px-[1rem] md:px-[4rem] mt-[2.5rem] mb-[10rem]"
    :class="{ 'max-w-[55rem]': true }"
  >
    <form class="min-w-[44rem]" @submit.prevent="onSubmit">
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
            <GoogleMap />
          </div>
          <div class="mt-[1.5rem]">
            <p class="text-[#2A2F4F] text-[0.875rem] leading-6">
              Address
              <span class="text-[#FF3D9A]">*</span>
            </p>
          </div>
          <div class="flex justify-center">
            <div class="mx-auto w-full">
              <div v-for="(value, key) in form" :key="key" class="mt-[1.5rem]">
                <component
                  :is="
                    value.componentType === 'baseInput' ? baseInput : baseSelect
                  "
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
          <NuxtLink to="business-information">
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
              Save & continue
            </p>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import GoogleMap from '../ui/GoogleMap.vue'
import baseInput from '../formElements/baseInput.vue'
import baseSelect from '../formElements/baseSelect.vue'

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
  city: {
    componentType: 'baseSelect',
    value: '',
    props: {
      loading: false,
      placeholder: 'Choose your City',
      label: 'City',
      name: 'city',
      classes:
        'w-full outline-0 text-[0.875rem] md:text-[1rem] text-[#000] block h-[3rem] md:h-[3.5rem] p-2.5 dark:placeholder-[#AAACB9]',
      required: true,
      error: '',
      options: [
        { name: 'Cairo', value: 1 },
        { name: 'Giza', value: 2 },
        { name: 'Alex', value: 3 }
      ]
    }
  },
  address: {
    componentType: 'baseInput',
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

const router = useRouter()
const isValidForm = computed(() => {
  return Object.values(form.value).every(({ props }) => !props?.error?.length)
})

const onSubmit = () => {
  isCheckOn.value = true
  validateForm()
  if (isValidForm.value) {
    isCheckOn.value = true
    isRegisterationInProgress.value = true
    setTimeout(() => {
      router.push({ name: 'index___en' })
    }, 2000)
  }
}
</script>
