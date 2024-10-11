<template>
  <div>
    <div>
      <div
        class="w-full h-full shadow-lg p-[1rem] sm:p-[1.5rem] rounded-2xl bg-[#fff] mx-auto"
      >
        <label for="file_input">
          <input
            id="file_input"
            class="hidden"
            type="file"
            accept="image/png"
            multiple
            :disabled="images.length >= 8"
            @change="uploadPhotos"
          />
          <div
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
              :key="image"
              class="w-[10rem] h-[10rem] border-[0.063rem] border-[#D4D5DC] bg-[#fff] rounded-[0.875rem] cursor-pointer bg-[contain] bg-no-repeat mx-auto"
              :style="{ 'background-image': `url(${image})` }"
            >
              <div
                class="bg-gradient-to-t from-slate-300 to-[#2a2f4f14] h-full rounded-[0.875rem]"
              >
                <button @click="removeImage(image)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    class="m-[0.5rem]"
                  >
                    <circle cx="15.9999" cy="16" r="14.6667" fill="white" />
                    <path
                      d="M15.9999 1.33331C7.91247 1.33331 1.33325 7.91254 1.33325 16C1.33325 24.0874 7.91247 30.6666 15.9999 30.6666C24.0874 30.6666 30.6666 24.0874 30.6666 16C30.6666 7.91254 24.0874 1.33331 15.9999 1.33331ZM20.5307 18.8025C21.0086 19.2804 21.0086 20.0529 20.5307 20.5308C20.2924 20.7691 19.9795 20.8889 19.6666 20.8889C19.3537 20.8889 19.0408 20.7691 18.8025 20.5308L15.9999 17.7282L13.1974 20.5308C12.959 20.7691 12.6461 20.8889 12.3333 20.8889C12.0204 20.8889 11.7075 20.7691 11.4691 20.5308C10.9913 20.0529 10.9913 19.2804 11.4691 18.8025L14.2717 16L11.4691 13.1974C10.9913 12.7195 10.9913 11.9471 11.4691 11.4692C11.947 10.9913 12.7195 10.9913 13.1974 11.4692L15.9999 14.2718L18.8025 11.4692C19.2804 10.9913 20.0528 10.9913 20.5307 11.4692C21.0086 11.9471 21.0086 12.7195 20.5307 13.1974L17.7281 16L20.5307 18.8025Z"
                      fill="#FF3D9A"
                    />
                  </svg>
                </button>
                <div class="m-[0.5rem] flex gap-x-[0.5rem] content-end h-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    class="my-auto"
                  >
                    <g clip-path="url(#clip0_2068_3648)">
                      <path
                        d="M8.00008 0.666626C3.95636 0.666626 0.666748 3.95624 0.666748 7.99996C0.666748 12.0437 3.95636 15.3333 8.00008 15.3333C12.0438 15.3333 15.3334 12.0437 15.3334 7.99996C15.3334 3.95624 12.0438 0.666626 8.00008 0.666626ZM11.789 7.09063L9.08419 9.7459C8.60569 10.2152 7.98969 10.4493 7.37308 10.4493C6.76319 10.4493 6.1533 10.2195 5.67664 9.75935L4.51614 8.6184C4.27536 8.3819 4.2723 7.99507 4.5088 7.75429C4.74469 7.5129 5.13275 7.50985 5.37291 7.74696L6.52975 8.88424C7.00397 9.34257 7.75258 9.34013 8.22925 8.87324L10.9334 6.21857C11.1736 5.98146 11.5592 5.98574 11.7975 6.22651C12.034 6.46729 12.0304 6.85413 11.789 7.09063Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_2068_3648">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <p
                    class="text-[1rem] text-[#fff] leading-7 font-bold my-auto"
                  >
                    Profile image
                  </p>
                </div>
              </div>
            </div>
          </template>
          <div
            v-for="i in 8 - images.length"
            :key="i"
            class="w-[10rem] h-[10rem] border-[0.063rem] border-[#D4D5DC] bg-[#fff] rounded-[0.875rem] cursor-pointer mx-auto"
          />
        </div>
      </div>
      <div class="flex mt-[2rem] md:mt-[4rem]">
        <div
          class="flex flex-col sm:flex-row justify-center gap-x-[1.5rem] gap-y-[0.5rem] sm:gap-y-0 mx-auto"
        >
          <NuxtLink to="/registeration-steps/step2">
            <button
              class="rounded-[2rem] bg-[#fff] border-[0.063rem] border-[#FF3D9A] w-[11.25rem] h-[3.5rem] cursor-pointer"
            >
              <p class="text-[#FF3D9A] text[1rem] leading-7 font-bold">Back</p>
            </button>
          </NuxtLink>
          <button
            class="rounded-[2rem] bg-[#FF3D9A] w-[11.25rem] border-[0.063rem] border-[#FF3D9A] h-[3.5rem] cursor-pointer"
          >
            <p class="text-[#fff] text[1rem] leading-7 font-bold">Save</p>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SVGIcon from '~/helper/SVGIcon.vue'

const images = ref<string[]>([])

const uploadPhotos = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = target.files

  if (files?.length) {
    Array.from(files).forEach((file: File) => {
      if (file) {
        images.value.push(URL.createObjectURL(file))
      }
    })
  }

  //   const form: FormData | any = {
  //     photos: adImgBase64.value
  //   }

  //   images.value.push(adImgBase64.value)

  try {
    // await updateMedia(form);
  } catch {
  } finally {
    // setCurrentUserData();
  }
}
const removeImage = async (imageUrl: string) => {
  const slicedImageUrl = imageUrl.split('/')[imageUrl.split('/').length - 1]
  try {
    // await deleteMedia(slicedImageUrl);
  } catch (e) {
    console.error(e)
  } finally {
    // setCurrentUserData();
  }
}
</script>
