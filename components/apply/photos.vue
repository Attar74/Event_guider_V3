<template>
  <div
    class="mx-auto px-[1rem] md:px-[4rem] mt-[2.5rem] mb-[10rem]"
    :class="{ 'w-[55rem]': true }"
  >
    <p class="text-[#2A2F4F] text-[1.25rem] font-[600] mb-[0.5rem]">
      {{ images.length < 8 ? 'Add' : 'Uploded' }}
      Photos
    </p>
    <div
      class="w-full h-full shadow-lg p-[1rem] sm:p-[1.5rem] rounded-2xl bg-[#fff] mx-auto"
    >
      <label for="file_input">
        <input
          id="file_input"
          ref="fileInput"
          class="hidden"
          type="file"
          accept="image/png"
          multiple
          :disabled="images.length >= 8"
          @change="handleFileChange"
        />
        <div
          v-if="images.length < 8"
          class="flex cursor-pointer border-[0.063rem] border-[#FF3D9A] border-dashed rounded-[0.875rem] bg-[#ff3d9a08] py-[2.5rem]"
        >
          <div class="mx-auto flex flex-col justify-center">
            <SVGIcon icon="uploadIcon" />
            <p
              class="text-[#FF3D9A] text-center underline mt-[1.5rem] text-[1rem]"
            >
              Click here to upload
            </p>
            <p class="text-[#7F8295] text-center text-[0.875rem]">
              Max file: 8MB
            </p>
          </div>
        </div>
      </label>
      <div class="mt-[2rem] flex flex-row flex-wrap gap-y-[1.5rem]">
        <template v-if="images.length">
          <div
            v-for="image in images"
            :key="image.path"
            class="w-[10rem] h-[10rem] border-[0.063rem] border-[#D4D5DC] bg-[#fff] rounded-[0.875rem] cursor-pointer bg-[contain] bg-no-repeat mx-auto"
            :style="{
              'background-image': image.isBlob
                ? `url(${image.path})`
                : `url(${config.public.apiBaseUrl}${image.path})`
            }"
          >
            <div
              class="bg-gradient-to-t from-slate-300 to-[#2a2f4f14] h-full rounded-[0.875rem]"
            >
              <button @click="removeImage(image)">
                <SVGIcon icon="closeIcon" class="my-auto" />
              </button>
              <div class="m-[0.5rem] flex gap-x-[0.5rem] content-end h-full">
                <SVGIcon
                  :icon="
                    !image?.isBlob ? 'uploadedPhotoIcon' : 'circlePhotoIcon'
                  "
                  class="my-auto"
                />
                <p class="text-[1rem] text-[#fff] leading-7 font-bold my-auto">
                  Profile image
                </p>
              </div>
            </div>
          </div>
        </template>
        <button
          v-for="i in 8 - images.length"
          :key="i"
          class="w-[10rem] h-[10rem] border-[0.063rem] border-[#D4D5DC] bg-[#fff] rounded-[0.875rem] cursor-pointer mx-auto"
          @click="handleOpenFileInput"
        />
      </div>
    </div>
    <div class="flex mt-[2rem] md:mt-[4rem]">
      <div
        class="flex flex-col sm:flex-row justify-center gap-x-[1.5rem] gap-y-[0.5rem] sm:gap-y-0 mx-auto"
      >
        <NuxtLink to="location">
          <button
            class="rounded-[2rem] bg-[#fff] border-[0.063rem] border-[#FF3D9A] w-[11.25rem] h-[3.5rem] cursor-pointer"
          >
            <p class="text-[#FF3D9A] text[1rem] leading-7 font-bold">Back</p>
          </button>
        </NuxtLink>
        <button
          class="rounded-[2rem] bg-[#FF3D9A] w-[11.25rem] border-[0.063rem] border-[#FF3D9A] h-[3.5rem] cursor-pointer disabled:border-0"
          @click="uploadPhotos"
        >
          <SVGIcon
            v-if="saveBtnLoading"
            icon="circularLoader"
            class="my-auto"
          />
          <p v-else class="text-[#fff] text[1rem] leading-7 font-bold">
            Save & continue
          </p>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SVGIcon from '~/helper/SVGIcon.vue'
import { useSnackbarStore } from '~/store/snackbarStore'

interface imageItem {
  path: string
  uuid: string
  isBlob?: true
}

const fileInput = ref<HTMLInputElement | null>(null)
const images = ref<imageItem[]>([])
const imagesToBeSend = ref<File[]>([])
const snackbarStore = useSnackbarStore()
const saveBtnLoading = ref(false)

const handleFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = target.files ?? []
  if (files?.length + images.value.length > 8) {
    snackbarStore.fireSnack({
      isVisible: true,
      text: 'Max 8 photos allowed',
      type: 'error'
    })
    return
  }
  if (files?.length) {
    for (const key in files) {
      if (files[key] instanceof File) {
        const newImgSrcs = (window.URL ? URL : webkitURL).createObjectURL(
          files[key]
        )
        images.value.push({
          path: newImgSrcs,
          uuid: files[key].name,
          isBlob: true
        })
        imagesToBeSend.value.push(files[key])
      }
    }
  } else {
    console.error('No file selected or file type not supported')
  }
}

const config = useRuntimeConfig()

const handleOpenFileInput = () => {
  if (fileInput.value) fileInput.value.click()
}
interface ApiResponse {
  data: { photos: imageItem[] }
}

const uploadPhotos = async () => {
  saveBtnLoading.value = true
  if (images.value.length < 6) {
    snackbarStore.fireSnack({
      isVisible: true,
      text: 'Add at least 6 photos',
      type: 'error'
    })
    saveBtnLoading.value = false
    return
  }
  const formData = new FormData()

  // Append each file to the FormData object
  imagesToBeSend.value.forEach(file => {
    formData.append(`photos`, file)
  })
  try {
    // await updateMedia(form);
    const { status } = await useAPI<ApiResponse>(
      `/vendors/my/business-photos`,
      {
        method: 'PUT',
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
      text: `${imagesToBeSend.value.length} image(s) uploaded successfully!`,
      type: 'success'
    })
    navigateTo({ name: 'vendor-form-reviewing___en' })
  } catch {
  } finally {
    imagesToBeSend.value = []
    saveBtnLoading.value = false
    setPhotosData()
  }
}
const removeImage = async (file: imageItem) => {
  if (!file?.isBlob) {
    try {
      await useAPI<ApiResponse>(`/vendors/my/business-photos/${file.uuid}`, {
        method: 'DELETE'
      })
    } catch (e) {
      console.error(e)
    } finally {
    }
  }
  images.value = images.value.filter(_file => _file.uuid !== file.uuid)
}

const setPhotosData = async () => {
  try {
    const { data, status } = await useAPI<ApiResponse>(
      `/vendors/my/business-photos`,
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
    if (data?.value?.data) {
      images.value = data.value.data?.photos.slice(0, 8)
    }
  } catch (e) {
  } finally {
  }
}

onMounted(() => {
  setTimeout(() => {
    setPhotosData()
  })
})
</script>
