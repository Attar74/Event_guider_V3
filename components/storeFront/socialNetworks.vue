<template>
  <div
    class="mx-auto px-[1rem] md:px-[4rem] mt-[2.5rem] mb-[10rem]"
    :class="{ 'max-w-[75rem]': true }"
  >
    <form class="my-[2.5rem]" @submit.prevent="onSubmit">
      <p
        class="text-[1.25rem] text-[#2A2F4F] font-semibold leading-9 mb-[0.5rem]"
      >
        Social networks
      </p>
      <div
        class="w-full h-full shadow-lg p-[1rem] sm:p-[1.5rem] rounded-2xl bg-[#fff] mx-auto overflow-visible"
      >
        <div class="bg-[#F9F9FA] rounded-[0.75rem] p-[1rem]">
          <p class="text-[#2A2F4F] text-[1rem] font-[600] leading-7">
            Share your social handles with us and increase the chances to have
            your pictures posted on our
          </p>
          <p class="text-[1rem] text-[#2A2F4F] font-normal leading-7">
            socials. When we make a post with one of your photos, we'll tag your
            business.
          </p>
        </div>
        <div class="lg:flex justify-between gap-x-[1rem] w-full block">
          <div
            v-for="(value, key) in form"
            :key="key"
            :class="key !== 'url' ? 'lg:w-1/3 w-full' : 'lg:w-2/3 w-full'"
          >
            <component
              :is="value.componentType === 'baseInput' ? baseInput : baseSelect"
              v-bind="value.props"
              :value="value.value"
              @update-input="value.value = $event"
            />
          </div>
          <div class="mb-auto flex justify-center">
            <button
              :disabled="isAddingBtnLoading"
              type="submit"
              class="mt-[2.75rem] rounded-[2rem] bg-[#FF3D9A] border-[0.063rem] border-[#FF3D9A] w-[11.25rem] h-[3.5rem] cursor-pointer disabled:border-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[#AAACB9]"
            >
              <p
                v-if="!isAddingBtnLoading"
                class="text-[#fff] text-[1rem] leading-7 font-bold"
              >
                Add Link
              </p>
              <SVGIcon v-else icon="circularLoader" />
            </button>
          </div>
        </div>
      </div>
    </form>
    <div class="mt-[2rem]">
      <Loader v-if="isPageLoading && !mySocialNetworks?.length" />
      <div v-else>
        <transition-group name="fade" tag="div" class="space-y-4">
          <div
            v-for="social in mySocialNetworks"
            :key="social.id"
            class="flex gap-x-[1rem] w-full h-full overflow-hidden sm:p-[1.5rem] rounded-[0.75rem] mx-auto border-[0.063rem] border-[#ff3d9a1a] bg-[#ff3d9a08] p-2 md:p-6"
            :class="{ 'opacity-50': deletedSocialNetworkId === social.id }"
          >
            <div class="flex justify-between w-full">
              <div class="flex gap-x-[1rem]">
                <div
                  class="bg-[#2A2F4F] rounded-[0.5rem] px-[1rem] py-[0.5rem]"
                >
                  <SVGIcon
                    v-if="getSocialIcon(social)"
                    class="mt-1 max-w-[0.75rem]"
                    :icon="getSocialIcon(social)"
                  />
                  <p v-else class="text-[#fff]">
                    {{ social.name.toString()[0] }}
                  </p>
                </div>
                <p
                  class="text-[#2A2F4F] text-[1rem] font-bold leading-9 capitalize my-auto"
                >
                  {{ social.url }}
                </p>
              </div>
              <button
                class="flex gap-x-[1rem] my-auto cursor-pointer"
                @click="deleteSocialNetwork(social.id)"
              >
                <SVGIcon
                  v-if="deletedSocialNetworkId !== social.id"
                  icon="trashIcon"
                />
                <SVGIcon v-else icon="circularLoader" />
              </button>
            </div>
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Loader from '../ui/loader.vue'
import SVGIcon from '~/helper/SVGIcon.vue'
import baseInput from '../formElements/baseInput.vue'
import baseSelect from '../formElements/baseSelect.vue'
import { useSnackbarStore } from '~/store/snackbarStore'
import useWebsiteValidator from '~/composables/useWebsiteValidator'

const snackbarStore = useSnackbarStore()
const isAddingBtnLoading = ref(false)
const isCheckOn = ref(false)
const isPageLoading = ref(true)

interface Network {
  id: string | number
  name: string | number
  url: string | number
}

const deletedSocialNetworkId = ref<string | number>('')
const mySocialNetworks = ref<Network[]>([])

interface option {
  value: string | number
  name: string | number
}

interface FormField {
  componentType: string
  value: string | number
  props: {
    loading: boolean
    placeholder: string
    label?: string
    name: string
    classes: string
    required: boolean
    error: string
    options?: { value: string; name: string }[]
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

const form = ref<Form>({
  socialNetwork: {
    componentType: 'baseSelect',
    value: '',
    props: {
      loading: false,
      placeholder: 'Choose network',
      label: 'Social network',
      name: 'socialNetwork',
      classes:
        'w-full outline-0 text-[0.875rem] md:text-[1rem] text-[#000] block h-[3rem] md:h-[3.5rem] p-2.5 dark:placeholder-[#AAACB9]',
      required: true,
      error: '',
      options: [
        {
          value: 'Facebook',
          name: 'Facebook'
        },
        { value: 'X', name: 'X' },
        { value: 'Instagram', name: 'Instagram' }
      ]
    }
  },
  url: {
    componentType: 'baseInput',
    value: '',
    props: {
      loading: false,
      placeholder: 'App Link',
      label: 'Link',
      name: 'url',
      classes:
        'w-full border-[#D4D5DC] border-[0.063rem] outline-0 text-[0.875rem] md:text-[1rem] text-[#000] rounded-full block h-[3rem] md:h-[3.5rem] pl-10 p-2.5 dark:placeholder-[#AAACB9]',
      required: true,
      error: ''
    }
  }
})

const getSocialIcon = ({ url }: Network) => {
  if (url.toString().toLowerCase().includes('facebook')) {
    return 'facebookIcon'
  } else if (url.toString().toLowerCase().includes('x')) {
    return 'xIcon'
  } else if (url.toString().toLowerCase().includes('instagram')) {
    return 'instagramIcon'
  }
  return ''
}

interface Item {
  [key: string]: string | number // Add index signature for dynamic keys
  // Other known properties
}

interface ApiResponse {
  data: Item
}

const getAllCurrentSocialNetwork = async () => {
  isPageLoading.value = true
  try {
    const { data, status } = await useAPI<ApiResponse>(
      `/vendors/my/social-networks`,
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
    if (Array.isArray(data.value?.data)) {
      mySocialNetworks.value =
        data.value?.data?.map((item: Item) => ({
          id: item.uuid,
          name: item.socialNetwork,
          url: item.url
        })) || []
    }
  } catch (e) {
    snackbarStore.fireSnack({
      isVisible: true,
      text: 'Something went wrong',
      type: 'error'
    })
  } finally {
    isPageLoading.value = false
  }
}

watch(
  form,
  () => {
    validateForm()
  },
  {
    deep: true // Specify deep watching
  }
)

const isValidForm = computed(() => {
  return Object.values(form.value).every(({ props }) => !props?.error?.length)
})

const checkFormVal = (key: string) => {
  let { value } = form.value?.[key]
  value = value?.toString()
  switch (key) {
    case 'url':
      return useWebsiteValidator(value)
    default:
      return !!value?.length ? '' : `The ${key} is Required`
  }
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

const onSubmit = () => {
  isCheckOn.value = true
  validateForm()
  if (isValidForm.value) {
    isCheckOn.value = true
    isAddingBtnLoading.value = true
    addSocialNetwork()
  }
}

const addSocialNetwork = async () => {
  const isUrlAlreafyExisted = mySocialNetworks.value.find(
    socialNetwork =>
      socialNetwork.url.toString().toLowerCase() ===
      form.value.url.value.toString().toLowerCase()
  )
  if (isUrlAlreafyExisted) {
    snackbarStore.fireSnack({
      isVisible: true,
      text: "It's already existed",
      type: 'error'
    })
    form.value.socialNetwork.value = ''
    form.value.url.value = ''
    isCheckOn.value = false
    isAddingBtnLoading.value = false
    return
  }
  try {
    const { status } = await useAPI<ApiResponse>(
      `/vendors/my/social-networks`,
      {
        method: 'POST',
        body: {
          socialNetwork: form.value.socialNetwork.value,
          url: form.value.url.value.toString().includes('http')
            ? form.value.url.value
            : `https://${form.value.url.value}`
        }
      }
    )
    if (status.value === 'error') {
      snackbarStore.fireSnack({
        isVisible: true,
        text: "It's already existed",
        type: 'error'
      })
    } else {
      getAllCurrentSocialNetwork()
      snackbarStore.fireSnack({
        isVisible: true,
        text: `${form.value.socialNetwork.value} has been added successfully`,
        type: 'success'
      })
    }
    form.value.socialNetwork.value = ''
    form.value.url.value = ''
    isCheckOn.value = false
  } catch (e) {
    snackbarStore.fireSnack({
      isVisible: true,
      text: 'Something went wrong',
      type: 'error'
    })
  } finally {
    isAddingBtnLoading.value = false
  }
}

const deleteSocialNetwork = async (uuid: string | number) => {
  deletedSocialNetworkId.value = uuid
  try {
    const { status } = await useAPI<ApiResponse>(
      `/vendors/my/social-networks/${uuid}`,
      {
        method: 'DELETE'
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
    mySocialNetworks.value = mySocialNetworks.value.filter(
      item => item.id !== uuid
    )
    snackbarStore.fireSnack({
      isVisible: true,
      text: 'Social network has been deleted successfully',
      type: 'success'
    })
  } catch (e) {
    snackbarStore.fireSnack({
      isVisible: true,
      text: 'Something went wrong',
      type: 'error'
    })
  } finally {
    deletedSocialNetworkId.value = ''
  }
}

onMounted(() => {
  nextTick(() => {
    getAllCurrentSocialNetwork()
  })
})
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  @apply transition-opacity duration-500; /* Smooth fade transition */
}

.fade-enter-from,
.fade-leave-to {
  @apply opacity-0; /* Initial and final state for fade effect */
}

.fade-enter-to,
.fade-leave-from {
  @apply opacity-100; /* Fully visible state */
}
</style>
