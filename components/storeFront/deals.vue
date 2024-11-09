<template>
  <div
    class="mx-auto px-[1rem] md:px-[4rem] mt-[2.5rem] mb-[10rem]"
    :class="{ 'w-[65rem]': true }"
  >
    <transition-group name="fade" tag="div" class="space-y-4">
      <div v-if="!isCreatDeal">
        <div class="my-[2.5rem]">
          <p
            class="text-[1.25rem] text-[#2A2F4F] font-semibold leading-9 mb-[0.5rem]"
          >
            Discount
          </p>
          <div
            class="w-full h-full overflow-hidden shadow-lg p-[1rem] sm:p-[1.5rem] rounded-2xl bg-[#fff] mx-auto"
          >
            <p class="text-[#2A2F4F] text-[1rem] font-semibold leading-7">
              Add discount
            </p>
            <p
              class="bg-[#F9F9FA] text-[1rem] rounded-[0.75rem] text-[#7F8295] font-normal leading-7 p-[1rem]"
            >
              Add special discount to your listing to generate more interest
              and receive more leads.
            </p>
            <div
              class="my-[1rem] w-full overflow-hidden shadow-lg p-[1rem] sm:p-[1.5rem] rounded-2xl mx-auto bg-[#2A2F4F] min-h-[12.5rem]"
            />
            <div>
              <transition-group name="fadeUp" tag="div" class="space-y-4">
                <loader v-if="isDiscountDataInProgress" />
                <div
                  v-for="discount in Discounts"
                  :key="discount.uuid"
                  class="w-full h-full overflow-hidden sm:p-[1.5rem] rounded-[0.75rem] mx-auto border-[0.063rem] border-[#ff3d9a08] bg-[#ff3d9a08]"
                >
                  <div class="flex justify-end gap-x-[1rem]">
                    <button @click="editDiscount(discount)">
                      <SVGIcon icon="edit" />
                    </button>
                    <button @click="deleteDiscount(discount.uuid)">
                      <SVGIcon icon="delete" />
                    </button>
                  </div>
                  <table class="table-auto w-full">
                    <thead>
                      <tr>
                        <th
                          class="text-left text-[#555972] text-[0.875rem] leading-6 font-medium"
                        >
                          Discount for :
                        </th>
                        <th
                          class="text-left text-[#555972] text-[0.875rem] leading-6 font-medium"
                        >
                          Discount Ratio :
                        </th>
                        <th
                          class="text-left text-[#555972] text-[0.875rem] leading-6 font-medium"
                        >
                          Valid until :
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td class="flex gap-x-[0.5rem]">
                          <img
                            class="w-10 h-10 rounded-full"
                            src="@/public/assets/auth/loginImg.png"
                            alt="Rounded avatar"
                          />
                          <p
                            class="text-[#2A2F4F] text-[1rem] leading-7 font-semibold my-auto"
                          >
                            {{ discount.venueTradeName }}
                          </p>
                        </td>
                        <td>
                          <div class="flex gap-x-[0.5rem]">
                            <svgDiscount />
                            <p
                              class="text-[#FF3D9A] text-[1rem] font-bold leading-7"
                            >
                              {{ discount.ratio }} % off
                            </p>
                          </div>
                        </td>
                        <td>
                          <div class="flex gap-x-[0.5rem]">
                            <svgDate />
                            <p
                              class="text-[#2A2F4F] text-[1rem] font-medium leading-7"
                            >
                              {{ discount.validUntil.split('T')[0] }}
                            </p>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </transition-group>
              <transition name="fade">
                <div
                  v-if="!AddDiscount && !Discounts.length"
                  class="flex justify-between mt-[2rem]"
                >
                  <p
                    class="my-auto text-[#7F8295] text-[1rem] font-medium leading-7"
                  >
                    Want to add discount ?
                  </p>
                  <button
                    class="rounded-[2rem] bg-[#FF3D9A] border-[0.063rem] border-[#FF3D9A] w-[11.25rem] h-[3.5rem] cursor-pointer"
                    @click="AddDiscount = !AddDiscount"
                  >
                    <p class="text-[#fff] text[1rem] leading-7 font-bold">
                      Add discount
                    </p>
                  </button>
                </div>
              </transition>
            </div>
            <transition name="fade">
              <form v-if="AddDiscount" @submit.prevent="createDiscount">
                <div
                  class="grid grid-cols-1 md:grid-cols-2 gap-x-0 md:gap-x-[1.5rem] mt-[1.5rem]"
                >
                  <div v-if="!isVendor" class="col-span-2 md:col-span-1">
                    <baseSelect
                      v-bind="discountform.venueUuid.props"
                      :value="discountform.venueUuid.value"
                      @update-input="discountform.venueUuid.value = $event"
                    />
                  </div>
                  <div class="col-span-2 md:col-span-1">
                    <baseInput
                      v-bind="discountform.ratio.props"
                      :value="discountform.ratio.value"
                      @update-input="discountform.ratio.value = $event"
                    />
                  </div>
                  <div
                    :class="
                      isVendor ? 'col-span-2 md:col-span-1' : 'col-span-1'
                    "
                  >
                    <baseDate
                      v-bind="discountform.validUntil.props"
                      :value="discountform.validUntil.value"
                      @update:selected-date="
                        discountform.validUntil.value = $event
                      "
                    />
                  </div>
                </div>
                <div class="flex justify-end gap-x-[1rem] mt-[2rem]">
                  <button
                    class="rounded-[2rem] bg-[#fff] border-[0.063rem] border-[#000] w-[11.25rem] h-[3.3rem] cursor-pointer"
                    :disabled="saveDiscountBtnLoading"
                    @click="cancelDiscontForm"
                  >
                    <p class="text-[#000] text[1rem] leading-7 font-bold">
                      Cancel
                    </p>
                  </button>
                  <button
                    type="submit"
                    :disabled="saveDiscountBtnLoading"
                    class="rounded-[2rem] bg-[#FF3D9A] border-[0.063rem] border-[#FF3D9A] w-[11.25rem] h-[3.5rem] cursor-pointer"
                  >
                    <p
                      v-if="!saveDiscountBtnLoading"
                      class="text-[#fff] text[1rem] leading-7 font-bold"
                    >
                      Save discount
                    </p>
                    <SVGIcon v-else icon="circularLoader" class="mx-auto" />
                  </button>
                </div>
              </form>
            </transition>
          </div>
        </div>
        <div>
          <p
            class="text-[1.25rem] text-[#2A2F4F] font-semibold leading-9 mb-[0.5rem]"
          >
            Deals
          </p>
          <div
            class="overflow-hidden shadow-lg md:px-[1rem] p-[1.5rem] rounded-2xl bg-[#fff] mx-auto"
          >
            <div
              class="bg-no-repeat bg-contain bg-[url(@/public/assets/bg/coloredBg.png)] p-[2rem]"
            >
              <div class="flex gap-x-[1rem]">
                <SVGIcon icon="dealsHand" />
                <p
                  class="text-[#fff] my-auto text-[1.25rem] capitalize leading-10 font-bold"
                >
                  Create deal
                </p>
              </div>
              <div class="flex justify-between mt-[1rem]">
                <p class="text-[#fff] text-[1rem] leading-7">
                  Offer a discount or special package to attract new business.
                  <br />
                  Please contact your account manager if you are unsure about
                  whether
                  <br />
                  you have paid for the deals package.
                </p>
                <button
                  class="rounded-[2rem] bg-[#fff] w-[11.25rem] h-[3.5rem] cursor-pointer mt-auto"
                  @click="isCreatDeal = !isCreatDeal"
                >
                  <p class="text-[#FF3D9A] text[0.875rem] leading-7 font-bold">
                    Create Deal
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-if="Deals.length" class="mt-[2rem]">
          <p
            class="text-[#2A2F4F] text-[1rem] leading-7 font-semibold mb-[0.5rem]"
          >
            Your deals
          </p>
          <transition-group name="fadeUp" tag="div" class="space-y-4">
            <div v-if="!isDealingDataInProgress">
              <div
                v-for="deal in Deals"
                :key="deal.uuid"
                class="flex flex-col my-[2rem]"
              >
                <div
                  class="flex gap-x-[1rem] w-full h-full sm:p-[1.5rem] rounded-[0.75rem] mx-auto border-[0.063rem] border-[#ff3d9a1a] bg-[#ff3d9a08]"
                >
                  <div
                    class="bg-no-repeat bg-contain p-[2rem] min-w-[18.75rem] min-h-[9.25rem]"
                    :style="{
                      'background-image': `url(${config.public.apiBaseUrl}${deal.imagePath})`
                    }"
                  />
                  <div class="w-full">
                    <div class="flex justify-between w-full">
                      <p
                        class="text-[#2A2F4F] text-[1.25rem] font-bold leading-9 capitalize my-auto"
                      >
                        {{ deal.displayName }}
                      </p>
                      <div class="flex gap-x-[1rem] my-auto">
                        <button @click="editDeal(deal)">
                          <SVGIcon icon="edit" />
                        </button>
                        <button @click="deleteDeal(deal.uuid)">
                          <SVGIcon icon="delete" />
                        </button>
                      </div>
                    </div>
                    <div class="mt-[1.5rem]">
                      <p class="text-[#7F8295] text-[1rem] leading-7">
                        {{ deal.description }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <loader v-for="i in 2" :key="i" />
            </div>
          </transition-group>
        </div>
      </div>
      <div v-else class="my-[2.5rem]">
        <p
          class="text-[1.25rem] text-[#2A2F4F] font-semibold leading-9 mb-[0.5rem]"
        >
          Create Deals
        </p>
        <form
          class="w-full shadow-lg p-[1.5rem] sm:p-[1.5rem] rounded-2xl bg-[#fff] mx-auto"
          @submit.prevent="createDeal"
        >
          <div
            class="grid grid-cols-1 md:grid-cols-2 gap-x-0 md:gap-x-[1.5rem] mb-[1.5rem]"
          >
            <div class="col-span-2 md:col-span-1">
              <p
                class="text-[1rem] text-[#2A2F4F] font-semibold leading-9 mb-[0.5rem]"
              >
                Deal Info
              </p>
              <div
                class="w-full p-[1rem] sm:p-[1.5rem] rounded-2xl bg-[#2a2f4f08] mx-auto grid grid-cols-1 md:grid-cols-1"
              >
                <div class="col-span-2 md:col-span-1">
                  <baseInput
                    v-bind="dealsform.DisplayName.props"
                    :value="dealsform.DisplayName.value"
                    @update-input="dealsform.DisplayName.value = $event"
                  />
                </div>
                <div class="col-span-2 md:col-span-1">
                  <baseDate
                    v-bind="dealsform.ValidUntil.props"
                    :value="dealsform.ValidUntil.value"
                    @update:selected-date="dealsform.ValidUntil.value = $event"
                  />
                </div>
              </div>
            </div>
            <div class="col-span-2 md:col-span-1">
              <p
                class="text-[1rem] text-[#2A2F4F] font-semibold leading-9 mb-[0.5rem]"
              >
                Deal Image
              </p>
              <div class="rounded-2xl">
                <transition name="fade">
                  <label v-if="!images.length" for="file_input">
                    <input
                      id="file_input"
                      ref="fileInput"
                      class="hidden"
                      type="file"
                      accept="image/png"
                      @change="handleFileChange"
                    />
                    <div
                      class="flex cursor-pointer border-[0.063rem] border-[#FF3D9A] border-dashed rounded-[0.875rem] bg-[#ff3d9a08] py-[1.5rem]"
                    >
                      <div class="mx-auto flex flex-col">
                        <SVGIcon icon="uploadIcon" class="mx-auto" />
                        <p
                          class="text-[#FF3D9A] text-center underline mt-[0.5rem] text-[1rem]"
                        >
                          Click here to upload
                        </p>
                        <p class="text-[#7F8295] text-center text-[0.875rem]">
                          Max file: 8MB
                        </p>
                      </div>
                    </div>
                  </label>
                  <div v-else>
                    <button @click="images = []">
                      <SVGIcon icon="closeIcon" class="my-auto" />
                    </button>
                    <img
                      :src="images[0].path"
                      class="w-full h-full max-w-[20rem] max-w-[15rem] mx-auto"
                    />
                  </div>
                </transition>
                <div class="flex gap-x-[0.5rem] mt-[1rem]">
                  <SVGIcon icon="Iicon" class="mb-auto mt-1" />
                  <p
                    class="text-[#7F8295] text-[0.875rem] leading-6 md:max-w-[19.5rem]"
                  >
                    Collages, photos with watermarks, contact details and
                    illustrations cannot be published
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="my-[2.5rem]">
            <div class="mt-[1rem]">
              <baseTextArea
                v-bind="dealsform.Description.props"
                :value="dealsform.Description.value"
                @update-input="dealsform.Description.value = $event"
              />
            </div>
          </div>
          <div class="flex justify-end gap-x-[1rem]">
            <button
              class="rounded-[2rem] bg-[#fff] border-[0.063rem] border-[#000] w-[11.25rem] h-[3.3rem] cursor-pointer"
              @click="CancelDealsForm"
            >
              <p class="text-[#000] text[1rem] leading-7 font-bold">Cancel</p>
            </button>
            <button
              type="submit"
              :disabled="saveDealBtnLoading"
              class="rounded-[2rem] bg-[#FF3D9A] border-[0.063rem] border-[#FF3D9A] w-[11.25rem] h-[3.5rem] cursor-pointer"
            >
              <p
                v-if="!saveDealBtnLoading"
                class="text-[#fff] text[1rem] leading-7 font-bold"
              >
                {{ dealUuid.length ? 'Update Deal' : 'Save Deal' }}
              </p>
              <SVGIcon v-else icon="circularLoader" class="mx-auto" />
            </button>
          </div>
        </form>
      </div>
    </transition-group>
  </div>
</template>
<script lang="ts" setup>
import SVGIcon from '~/helper/SVGIcon.vue'
import baseDate from '../formElements/baseDatePicker.vue'
import baseInput from '../formElements/baseInput.vue'
import baseSelect from '../formElements/baseSelect.vue'
import baseTextArea from '../formElements/baseTextArea.vue'
import loader from '../ui/loader.vue'
import { useBuildQueryString } from '~/composables/useBuildQueryString'
import { useSnackbarStore } from '~/store/snackbarStore'
import { useUserStore } from '~/store/user'

const userStore = useUserStore()
const { buildQueryString } = useBuildQueryString()
const snackbarStore = useSnackbarStore()
const config = useRuntimeConfig()

interface FormDate {
  value: string | number
  props: {
    label: string
    inputId: string
    value: string
    name: string
    hasLabel: boolean
    required: boolean
    error: string
    minDate: Date
  }
}

interface option {
  value: string
  name: string
}

interface FormField {
  value: string | number
  props: {
    type?: string
    placeholder: string
    label?: string
    name: string
    'suffix-icon'?: string
    classes: string
    required: boolean
    options?: option[]
    error: string
  }
}
interface Form {
  [key: string]: FormDate | FormField
}

const AddDiscount = ref(false)

const discountform = ref<Form>({
  venueUuid: {
    value: '',
    props: {
      placeholder: 'Choose venue',
      label: 'Venue',
      name: 'venueUuid',
      classes:
        'w-full outline-0 text-[0.875rem] md:text-[1rem] text-[#000] block h-[3rem] md:h-[3.5rem] p-2.5 dark:placeholder-[#AAACB9]',
      required: true,
      error: '',
      options: []
    }
  },
  ratio: {
    value: '',
    props: {
      type: 'number ',
      placeholder: 'Choose discount ratio',
      label: 'Discount ratio',
      name: 'ratio',
      'suffix-icon': 'ratioIcon',
      classes:
        'w-full border-[#D4D5DC] border-[0.063rem] outline-0 text-[0.875rem] md:text-[1rem] text-[#000] rounded-full block h-[3rem] md:h-[3.5rem] pl-5 p-2.5 dark:placeholder-[#AAACB9]',
      required: true,
      error: ''
    }
  },
  validUntil: {
    value: '',
    props: {
      label: 'Valid until',
      name: 'ValidUntil',
      inputId: '',
      value: '',
      hasLabel: true,
      required: true,
      error: '',
      minDate: new Date()
    }
  }
})

const dealsform = ref<Form>({
  DisplayName: {
    value: '',
    props: {
      placeholder: 'Enter deal name',
      label: 'Deal name',
      name: 'DisplayName',
      classes:
        'w-full border-[#D4D5DC] border-[0.063rem] outline-0 text-[0.875rem] md:text-[1rem] text-[#000] rounded-full block h-[3rem] md:h-[3.5rem] pl-5 p-2.5 dark:placeholder-[#AAACB9]',
      required: true,
      error: ''
    }
  },
  ValidUntil: {
    value: '',
    props: {
      label: 'Valid until',
      placeholder: 'Choose discount ratio',
      inputId: '',
      name: 'ValidUntil',
      value: '',
      hasLabel: true,
      required: true,
      error: '',
      minDate: new Date()
    }
  },
  Description: {
    value: '',
    props: {
      placeholder: 'Write discription',
      label: 'Deals Discription',
      name: 'Description',
      classes:
        'w-full bg-[#F9F9FA] w-full border-[#D4D5DC] border-[0.063rem] outline-0 text-[0.875rem] md:text-[1rem] text-[#000] rounded-xl block pt-[0.875rem] pl-[1.25rem]',
      required: true,
      error: ''
    }
  }
})

interface imageItem {
  path: string
  uuid: string
}

interface dealItem {
  dateCreated: string
  description: string
  displayName: string
  imagePath: string
  uuid: string
  validUntil: string
  venueTradeName: string
  venueUuid: string
}

interface discountItem {
  dateCreated: string
  description: string
  displayName: string
  imagePath: string
  uuid: string
  validUntil: string
  venueTradeName: string
  venueUuid: string
  ratio: number
}

interface ApiDealResponse {
  data: { deals: dealItem[] }
}

interface ApiResponse {
  data: { photos: imageItem[] }
}

const fileInput = ref<HTMLInputElement | null>(null)

const images = ref<imageItem[]>([])

const imagesToBeSend = ref<File[]>([])

const Deals = ref<dealItem[]>([])
const Discounts = ref<discountItem[]>([])
const isCreatDeal = ref(false)
const isDealingDataInProgress = ref(true)
const isDiscountDataInProgress = ref(true)
const isCheckOn = ref(false)
const saveDealBtnLoading = ref(false)

/*********************************** Deals Logic************************************/

const handleFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files ? target.files[0] : null
  if (file && file instanceof File) {
    const newImgSrcs = (window.URL ? URL : webkitURL).createObjectURL(file)
    images.value.push({
      path: newImgSrcs,
      uuid: file.name
    })
    imagesToBeSend.value.push(file)
  } else {
    snackbarStore.fireSnack({
      isVisible: true,
      text: 'Invalud Fiel, please try again',
      type: 'error'
    })
  }
}

const checkFormVal = (key: string) => {
  let { value } = dealsform.value?.[key]
  value = value.toString()
  switch (key) {
    case 'ValidUntil':
      return useDateValidator(value)
    default:
      return !value.length
        ? `The ${key} is Required`
        : value.length < 4
          ? `The ${key} can't be less than 4 characters`
          : ''
  }
}

const checkDiscountFormVal = (key: string) => {
  let { value } = discountform.value?.[key]
  value = value.toString()
  switch (key) {
    case 'ValidUntil':
      return useDateValidator(value)
    case 'ratio':
      return isNaN(Number(value)) || Number(value) <= 0 || Number(value) >= 100
        ? 'Invalid ratio'
        : ''
    default:
      return !value.length
        ? `The ${key} is Required`
        : value.length < 4
          ? `The ${key} can't be less than 4 characters`
          : ''
  }
}

const queryParams = computed(() => {
  const payload: Record<string, string | number> = {}
  for (const key in dealsform.value) {
    payload[key] = dealsform.value[key].value
  }
  return {
    ...payload,
    ...(dealUuid.value.length && { dealUuid: dealUuid.value }),
    VenueUuid: userStore.user?.venue?.uuid
  }
})

const isValidForm = computed(() => {
  return (
    Object.values(dealsform.value).every(
      ({ props }) => !props?.error?.length
    ) && images.value.length
  )
})

watch(
  dealsform,
  () => {
    validateForm()
  },
  {
    deep: true // Specify deep watching
  }
)

watch(
  discountform,
  () => {
    validateDiscountForm()
  },
  {
    deep: true // Specify deep watching
  }
)

const validateForm = () => {
  if (!isCheckOn.value) {
    return
  }
  for (const key in dealsform.value) {
    if (
      dealsform.value?.[key]?.props?.required ||
      dealsform.value?.[key]?.value
    ) {
      dealsform.value[key].props.error = checkFormVal(key)
    } else {
      dealsform.value[key].props.error = ''
    }
  }
}

const createDeal = async () => {
  isCheckOn.value = true
  saveDealBtnLoading.value = true
  validateForm()

  if (!isValidForm.value) {
    saveDealBtnLoading.value = false
    return
  }
  const formData = new FormData()

  // Append each file to the FormData object
  imagesToBeSend.value.forEach(file => {
    formData.append(`ImageFile`, file)
  })
  const queryParams_ = buildQueryString(queryParams.value)
  try {
    const { status } = await useAPI<ApiResponse>(
      dealUuid.value.length
        ? `/vendors/my/deals/${dealUuid.value}${queryParams_}`
        : `/vendors/my/deals${queryParams_}`,
      {
        method: dealUuid.value.length ? 'PUT' : 'POST',
        body: formData
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

    snackbarStore.fireSnack({
      isVisible: true,
      text: `Deal has been ${dealUuid.value.length ? 'updated' : 'created'} successfully`,
      type: 'success'
    })

    for (const key in dealsform.value) {
      dealsform.value[key].value = ''
      dealsform.value[key].props.error = ''
    }
    images.value = []
    isCheckOn.value = false
  } catch {
  } finally {
    imagesToBeSend.value = []
    images.value = []
    isCreatDeal.value = false
    saveDealBtnLoading.value = false
    dealUuid.value = ''
    getDeals()
  }
}

const deleteDeal = async (uuid: string) => {
  try {
    const { status } = await useAPI(`/vendors/my/deals/${uuid}`, {
      method: 'DELETE'
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
      text: 'Deal has been deleted successfully',
      type: 'success'
    })
    Deals.value = Deals.value.filter(item => item.uuid !== uuid)
  } catch (e) {}
}

const getDeals = async () => {
  try {
    const { data, status } = await useAPI<ApiDealResponse>(
      `/vendors/my/deals?venueUuid=${userStore.user?.venue?.uuid}`,
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
      Deals.value = data.value?.data
    }
  } catch (e) {
    snackbarStore.fireSnack({
      isVisible: true,
      text: 'Something went wrong',
      type: 'error'
    })
  } finally {
    isDealingDataInProgress.value = false
  }
}

const dealUuid = ref('')

const editDeal = (item: dealItem) => {
  isCreatDeal.value = !isCreatDeal.value
  isCheckOn.value = false
  dealsform.value.DisplayName.value = item.displayName
  dealsform.value.ValidUntil.value = item.validUntil
  dealsform.value.Description.value = item.description
  images.value.push({
    path: `${config.public.apiBaseUrl}${item.imagePath}`,
    uuid: item.imagePath
  })
  dealUuid.value = item.uuid
}

const CancelDealsForm = () => {
  isCreatDeal.value = !isCreatDeal.value
  for (const key in dealsform.value) {
    dealsform.value[key].value = ''
    dealsform.value[key].props.error = ''
  }
  isCheckOn.value = false
  dealUuid.value = ''
  images.value = []
}

/*********************************** Discount Logic************************************/

const saveDiscountBtnLoading = ref(false)
const isCheckOnDiscount = ref(false)
const discountUuid = ref('')

const validateDiscountForm = () => {
  if (isVendor.value || !Discounts.value.length) {
    discountform.value.venueUuid.props.required = false
  }
  if (!isCheckOnDiscount.value) {
    return
  }
  for (const key in discountform.value) {
    if (
      discountform.value?.[key]?.props?.required ||
      discountform.value?.[key]?.value
    ) {
      discountform.value[key].props.error = checkDiscountFormVal(key)
    } else {
      discountform.value[key].props.error = ''
    }
  }
}

const isValidDiscountForm = computed(() => {
  return Object.values(discountform.value).every(
    ({ props }) => !props?.error?.length
  )
})

const queryDiscountParams = computed(() => {
  const payload: Record<string, string | number> = {}
  for (const key in discountform.value) {
    if (discountform.value[key].value.toString().length) {
      payload[key] = discountform.value[key].value
    }
  }
  return {
    ...payload,
    venueUuid: payload.venueUuid
      ? payload.venueUuid
      : userStore.user?.venue?.uuid
  }
})

const createDiscount = async () => {
  isCheckOnDiscount.value = true
  saveDiscountBtnLoading.value = true
  validateDiscountForm()

  if (!isValidDiscountForm.value) {
    saveDiscountBtnLoading.value = false
    return
  }

  try {
    const { status } = await useAPI<ApiResponse>(
      discountUuid.value.length
        ? `/vendors/my/discounts/${discountUuid.value}`
        : `/vendors/my/discounts`,
      {
        method: discountUuid.value.length ? 'PUT' : 'POST',
        body: queryDiscountParams.value
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

    snackbarStore.fireSnack({
      isVisible: true,
      text: `Discount has been ${dealUuid.value.length ? 'updated' : 'created'} successfully`,
      type: 'success'
    })

    for (const key in discountform.value) {
      discountform.value[key].value = ''
      discountform.value[key].props.error = ''
    }
    isCheckOnDiscount.value = false
  } catch {
  } finally {
    AddDiscount.value = false
    saveDiscountBtnLoading.value = false
    discountUuid.value = ''
    getDiscounts()
  }
}

const deleteDiscount = async (uuid: string) => {
  try {
    const { status } = await useAPI(`/vendors/my/discounts/${uuid}`, {
      method: 'DELETE'
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
      text: 'Discount has been deleted successfully',
      type: 'success'
    })
    Discounts.value = Discounts.value.filter(item => item.uuid !== uuid)
  } catch (e) {}
}

const editDiscount = (item: discountItem) => {
  AddDiscount.value = !AddDiscount.value
  isCheckOnDiscount.value = false
  discountform.value.ratio.value = item.ratio
  discountform.value.validUntil.value = item.validUntil
  // discountform.value.Description.value = item.description
  discountUuid.value = item.uuid
}

const getDiscounts = async () => {
  try {
    const { data, status } = await useAPI<ApiDealResponse>(
      `/vendors/my/discounts?venueUuid=${userStore.user?.venue?.uuid}`,
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
      Discounts.value = data.value?.data
    }
  } catch (e) {
    snackbarStore.fireSnack({
      isVisible: true,
      text: 'Something went wrong',
      type: 'error'
    })
  } finally {
    isDiscountDataInProgress.value = false
  }
}

const { user } = userStore
const { userType } = user
const isVendor = computed(() => {
  return userType === 'Vendor'
})

const getVenues = async () => {
  if (isVendor.value) {
    return
  }
  try {
    const { data, status } = await useAPI<ApiDealResponse>(
      `/vendors/my/venues`,
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
      Discounts.value = data.value?.data
    }
  } catch (e) {
    snackbarStore.fireSnack({
      isVisible: true,
      text: 'Something went wrong',
      type: 'error'
    })
  } finally {
    isDiscountDataInProgress.value = false
  }
}

const cancelDiscontForm = () => {
  AddDiscount.value = !AddDiscount.value
  for (const key in discountform.value) {
    discountform.value[key].value = ''
    discountform.value[key].props.error = ''
  }
  isCheckOnDiscount.value = false
  discountUuid.value = ''
}

onMounted(() => {
  getDiscounts()
  getVenues()
  getDeals()
})
</script>
<style>
.fade-enter-active {
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

.fadeUp-enter-active,
.fadeUp-leave-active {
  @apply transition-opacity duration-500; /* Smooth fade transition */
}

.fadeUp-enter-from,
.fadeUp-leave-to {
  @apply opacity-0; /* Initial and final state for fade effect */
}

.fadeUp-enter-to,
.fadeUp-leave-from {
  @apply opacity-100; /* Fully visible state */
}
</style>
