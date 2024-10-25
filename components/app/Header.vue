<template>
  <header>
    <nav
      class="bg-white border-gray-200 px-4 lg:px-6 border-b-[#D4D5DC] border-[1px]"
    >
      <div
        class="flex flex-wrap items-center justify-between p-4 md:p-[0.71rem]"
        :class="
          isDrawer &&
          typeof route.name === 'string' &&
          route.name.includes('vendor-home')
            ? 'w-full'
            : 'max-w-screen-xl mx-auto'
        "
      >
        <div :class="{ 'flex justify-between gap-x-[5rem]': isDrawer }">
          <NuxtLink
            v-if="
              typeof route.name === 'string' &&
              !route.name.includes('vendor-home')
            "
            to="/"
            class="flex items-center mx-auto"
          >
            <SVGIcon icon="eColored" class="mr-3 w-[1.625rem] h-auto" />
            <span class="text-[#2A2F4F] text-[1.5rem] font-extrabold leading-9">
              Event Guiders
            </span>
          </NuxtLink>

          <div
            v-else
            class="flex justify-between gap-x-[1rem] cursor-pointer"
            :class="isDrawer ? 'translate-x-[20rem]' : ''"
          >
            <SVGIcon
              icon="burgerMenu"
              :class="!isDrawer ? 'rotate-180' : ''"
              @click="toggleDrawer"
            />
            <p class="text-[#7F8295] text-[0.875rem] leading-6 my-auto">
              Storefront
            </p>
            <p class="text-[#2A2F4F] text-[1rem] leading-7 font-bold my-auto">
              /
            </p>
            <p class="text-[#2A2F4F] text-[1rem] leading-7 font-bold my-auto">
              Business info
            </p>
          </div>
        </div>

        <button
          data-collapse-toggle="navbar-default"
          type="button"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none"
          aria-controls="navbar-default"
          aria-expanded="false"
          @click="mobileMenuOpen = true"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <div id="navbar-default" class="hidden w-full md:block md:w-auto">
          <ul
            class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0"
          >
            <li class="my-auto">
              <NuxtLink
                href="#"
                class="text-[#555972] text-[0.875rem] cursor-pointer focus:ring-4 focus:ring-gray-300 font-medium rounded-lg focus:outline-none"
              >
                need help ?
              </NuxtLink>
            </li>
            <li class="my-auto">
              <NuxtLink
                href="#"
                class="mx-auto flex text-[#2A2F4F] text-[0.875rem] focus:ring-4 focus:ring-primary-300 font-medium rounded-lg focus:outline-none"
              >
                <SVGIcon icon="phone" />
                <p
                  class="ml-1 text-[#2A2F4F] text-[0.875rem] font-bold leading-6"
                >
                  {{ mobileNumber }}
                </p>
              </NuxtLink>
            </li>
            <li class="my-auto">
              <div class="flex my-auto cursor-pointer">
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    v-model="switchBtn"
                    type="checkbox"
                    class="sr-only peer"
                  />
                  <div
                    class="relative w-[2.75rem] h-[1.5rem] bg-[#fff] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-[#] after:content-[''] after:absolute after:top-[0.4px] after:bg-[#ff3d9a] border-[#ff3d9a] border-2 after:border-[#fff] after:border after:rounded-full after:h-5 after:w-5 after:transition-all"
                    :class="{ 'after:end-[21px]': switchBtn }"
                  />
                  <p
                    class="absolute text-[0.6rem] font-bold"
                    :class="{ 'left-6': !switchBtn, 'right-6': switchBtn }"
                  >
                    {{ switchBtn ? 'EN' : 'AR' }}
                  </p>
                </label>
              </div>
            </li>
            <div class="flex">
              <div
                class="w-[3rem] h-[3rem] rounded-full border-[0.063rem] border-[#ff3d9a] flex justify-center"
              >
                <SVGIcon icon="circularImage" />
              </div>
              <div class="ml-[0.5rem] leading-6">
                <p class="text-[#555972] text-[0.75rem] font-medium text-left">
                  Welcome !
                </p>
                <Menu
                  :is-menu-open="isMenuOpen"
                  width="10.875rem"
                  @close-menu="isMenuOpen = false"
                >
                  <template #trigger>
                    <buton
                      class="flex cursor-pointer"
                      @click="isMenuOpen = !isMenuOpen"
                    >
                      <p class="text-[#000] text-[0.875rem] font-semibold">
                        {{ userName }}
                      </p>
                      <SVGIcon
                        icon="chevronDown"
                        class="w-[1.5rem] my-auto transition-all duration-300"
                        :class="{ 'rotate-180': isMenuOpen }"
                      />
                    </buton>
                  </template>

                  <template #content>
                    <button
                      class="w-full flex justify-start gap-x-[0.5rem] font-semibold text-gray-900 text-[1rem] cursor-pointer items-center p-4 rounded-[1.5rem] text-sm leading-6 hover:bg-[#ff3d9a0d]"
                      @click="handleLogout"
                    >
                      <SVGIcon icon="logout" />
                      Log out
                    </button>
                  </template>
                </Menu>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import Menu from '~/components/ui/menu.vue'
import SVGIcon from '~/helper/SVGIcon.vue'

const userStore = useUserStore()

const userName = computed(() => userStore.user.username)
const mobileNumber = computed(() => userStore.user.mobileNumber)
const isMenuOpen = ref(false)
const switchBtn = ref(false)
const mobileMenuOpen = ref(false)
const isDrawer = ref(true)
const route = useRoute()

const handleLogout = () => {
  userStore.clearUser()
  navigateTo('/')
}

const emits = defineEmits(['toggle-drawer'])

const toggleDrawer = () => {
  isDrawer.value = !isDrawer.value
  emits('toggle-drawer')
}
</script>
