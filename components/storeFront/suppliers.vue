<template>
  <div
    class="mx-auto px-[1rem] md:px-[4rem] mt-[2.5rem] mb-[10rem]"
    :class="{ 'max-w-[75rem]': true }"
  >
    <div>
      <form @submit.prevent="onSubmit">
        <div class="my-[2.5rem]">
          <p
            class="text-[1.25rem] text-[#2A2F4F] font-semibold leading-9 mb-[0.5rem]"
          >
            Preferred suppliers
          </p>
          <div
            class="w-full h-full shadow-lg p-[1rem] sm:p-[1.5rem] rounded-2xl bg-[#fff] mx-auto overflow-visible"
          >
            <div class="bg-[#F9F9FA] rounded-[0.75rem] p-[1rem]">
              <p class="text-[#2A2F4F] text-[1rem] font-[600] leading-7">
                Add wedding professionals you frequently work with and recommend
                to couples.
              </p>
              <p class="text-[1rem] text-[#2A2F4F] font-normal leading-7">
                Your Preferred Suppliers will be displayed on your storefront.
              </p>
            </div>
            <div class="flex justify-start gap-x-[1rem]">
              <div class="w-full my-auto">
                <div v-for="(value, key) in form" :key="key">
                  <baseSelect
                    v-bind="value.props"
                    :value="value.value"
                    @update-input="form.supplierUuid.value = $event"
                  />
                </div>
              </div>
              <div class="mb-auto">
                <button
                  type="submit"
                  :disabled="isAddingBtnLoading"
                  class="mt-[2.75rem] rounded-[2rem] bg-[#FF3D9A] border-[0.063rem] border-[#FF3D9A] w-[11.25rem] h-[3.5rem] cursor-pointer disabled:border-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[#AAACB9]"
                >
                  <p
                    v-if="!isAddingBtnLoading"
                    class="text-[#fff] text-[1rem] leading-7 font-bold"
                  >
                    Add Supplier
                  </p>
                  <SVGIcon v-else icon="circularLoader" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div>
        <Loader v-if="isPageLoading && !mySuppliers.length" class="mt-[2rem]" />
        <div v-else>
          <transition-group name="fade" tag="div" class="space-y-4">
            <div
              v-for="supplier in mySuppliers"
              :key="supplier.id"
              class="mt-[2rem]"
            >
              <div
                class="flex gap-x-[1rem] w-full h-full overflow-hidden sm:p-[1.5rem] rounded-[0.75rem] mx-auto border-[0.063rem] border-[#ff3d9a1a] bg-[#ff3d9a08]"
              >
                <div
                  class="bg-no-repeat bg-contain bg-[url(@/public/assets/solidSquareBg.png)] p-[2rem] w-[5.5rem] h-[5.5rem]"
                />
                <div class="w-full">
                  <div class="flex justify-between w-full">
                    <div class="flex gap-x-[1rem]">
                      <p
                        class="text-[#2A2F4F] text-[1rem] font-bold leading-9 capitalize my-auto"
                      >
                        {{ supplier.name }}
                      </p>
                      <div class="my-auto flex gap-x-[0.5rem]">
                        <div class="flex my-auto gap-x-[0.063rem]">
                          <SVGIcon
                            v-for="i in Math.floor(supplier.stars)"
                            :key="i"
                            icon="starIcon"
                            class="my-auto"
                          />
                          <SVGIcon
                            v-for="i in getNumberOfHalfStars(supplier.stars)"
                            :key="i"
                            icon="halfStarIcon"
                            class="my-auto"
                          />
                        </div>
                        <p
                          class="text-[#2A2F4F] text-[0.875rem] leading-6 font-bold my-auto"
                        >
                          {{ supplier.stars }}
                        </p>
                      </div>
                    </div>

                    <button class="flex gap-x-[1rem] my-auto">
                      <SVGIcon
                        icon="trashIcon"
                        @click="deleteSupplier(supplier.id)"
                      />
                    </button>
                  </div>
                  <div class="mt-[0.5rem]">
                    <p class="text-[#555972] text-[1rem] leading-7 font-medium">
                      {{ supplier.subCategoryDisplayName }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </transition-group>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Loader from '../ui/loader.vue'
import SVGIcon from '~/helper/SVGIcon.vue'
import baseSelect from '../formElements/baseSelect.vue'
import { useSnackbarStore } from '~/store/snackbarStore'

interface Supplier {
  id: string | number
  name: string | number
  stars: number
  subCategoryDisplayName: string
}

const mySuppliers = ref<Supplier[]>([])

const snackbarStore = useSnackbarStore()
const isAddingBtnLoading = ref(false)
const isCheckOn = ref(false)
interface option {
  value: string | number
  name: string | number
}

interface FormSelectFiled {
  value: string | number
  props: {
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
  [key: string]: FormSelectFiled
}

const form = ref<Form>({
  supplierUuid: {
    value: '',
    props: {
      loading: false,
      placeholder: 'Enter trade name for your preferred supplier',
      label: 'Supplier name',
      name: 'supplier',
      classes:
        'w-full outline-0 text-[0.875rem] md:text-[1rem] text-[#000] block h-[3rem] md:h-[3.5rem] p-2.5 dark:placeholder-[#AAACB9]',
      required: true,
      error: '',
      options: []
    }
  }
})

interface Item {
  [key: string]: string | number // Add index signature for dynamic keys
  // Other known properties
}

interface ApiResponse {
  data: Item
}

const getAllAvaliableSuppliers = async () => {
  form.value.supplierUuid.props.loading = true
  try {
    const { data, status } = await useAPI<ApiResponse>(`/vendors/suppliers`, {
      method: 'GET'
    })
    if (status.value === 'error') {
      snackbarStore.fireSnack({
        isVisible: true,
        text: 'Something went wrong',
        type: 'error'
      })
      return
    }
    if (Array.isArray(data.value?.data)) {
      form.value.supplierUuid.props.options =
        data.value?.data?.map((item: Item) => ({
          value: item.uuid,
          name: item.tradeName
        })) || []
    }
  } catch (e) {
  } finally {
    form.value.supplierUuid.props.loading = false
  }
}

const isPageLoading = ref(true)

const getAllCurrentSuppliers = async () => {
  isPageLoading.value = true
  try {
    const { data, status } = await useAPI<ApiResponse>(
      `/vendors/my/suppliers`,
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
      mySuppliers.value =
        data.value?.data?.map((item: Item) => ({
          id: item.uuid,
          name: item.tradeName,
          stars: Number(item.rating),
          subCategoryDisplayName: item.subCategoryDisplayName
        })) || []
    }
  } catch (e) {
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

const getNumberOfHalfStars = (stars: number) => {
  const starsReminder = stars - Math.floor(stars) !== 0
  if (!starsReminder) {
    return 0
  }
  return 1
}

const onSubmit = () => {
  isCheckOn.value = true
  validateForm()
  if (isValidForm.value) {
    isCheckOn.value = true
    isAddingBtnLoading.value = true
    addSupplier()
  }
}

const isValidForm = computed(() => {
  return Object.values(form.value).every(({ props }) => !props?.error?.length)
})

const checkFormVal = (key: string) => {
  let { value } = form.value?.[key]
  value = value?.toString()
  switch (key) {
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

const addSupplier = async () => {
  try {
    const { status } = await useAPI<ApiResponse>(
      `/vendors/my/suppliers/${form.value.supplierUuid.value}`,
      {
        method: 'POST'
      }
    )
    form.value.supplierUuid.value = ''
    isCheckOn.value = false
    if (status.value === 'error') {
      snackbarStore.fireSnack({
        isVisible: true,
        text: "It's already existed",
        type: 'error'
      })
      return
    }
    getAllCurrentSuppliers()
    snackbarStore.fireSnack({
      isVisible: true,
      text: 'Supplier has been added successfully',
      type: 'success'
    })
  } catch (e) {
  } finally {
    isAddingBtnLoading.value = false
  }
}

const deleteSupplier = async (uuid: string | number) => {
  try {
    const { status } = await useAPI<ApiResponse>(
      `/vendors/my/suppliers/${uuid}`,
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
    mySuppliers.value = mySuppliers.value.filter(item => item.id !== uuid)
    snackbarStore.fireSnack({
      isVisible: true,
      text: 'Supplier has been deleted successfully',
      type: 'success'
    })
  } catch (e) {
  } finally {
  }
}
onMounted(() => {
  nextTick(async () => {
    await getAllCurrentSuppliers()
    await getAllAvaliableSuppliers()
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
