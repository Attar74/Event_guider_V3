<template>
  <header v-if="filteredTabs.length" class="mx-[2.125rem] mb-[2.5rem]">
    <nav
      class="bg-white border-0 lg:px-6 border-b-[#D4D5DC] rounded-b-xl p-[1.5rem]"
    >
      <div
        class="flex flex-wrap items-center justify-start mx-auto px-[3%] py-4 md:py-[0.75rem] w-full gap-x-10"
      >
        <div v-for="tab in filteredTabs" :key="tab.title" class="flex">
          <button
            class="flex gap-x-[0.5rem] px-[1rem]"
            :class="
              tab.component === props.activeTab
                ? 'bg-[#2A2F4F] rounded-[1.5rem] py-[0.5rem]'
                : ''
            "
            @click="changeTab(tab.component)"
          >
            <SVGIcon
              v-if="tab.component === props.activeTab"
              class="my-auto"
              :icon="`active-${tab.icon}`"
            />
            <SVGIcon v-else class="my-auto" :icon="tab.icon" />
            <p
              class="text-[1rem] leading-6 font-bold mt-1"
              :class="
                tab.component === props.activeTab
                  ? 'text-[#fff]'
                  : 'text-[#555972]'
              "
            >
              {{ tab.title }}
            </p>
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import SVGIcon from '~/helper/SVGIcon.vue'

const tabs = [
  {
    title: 'Business info',
    icon: 'businessInfo',
    parent: 'storefront',
    component: 'businessInfo'
  },
  {
    title: 'Location',
    icon: 'locationMap',
    parent: 'storefront',
    component: 'location'
  },
  {
    title: 'Photos',
    icon: 'photos',
    parent: 'storefront',
    component: 'photos'
  },
  {
    title: 'Questions',
    icon: 'question',
    parent: 'storefront',
    component: 'questions'
  },
  {
    title: 'Deals',
    icon: 'deals',
    parent: 'storefront',
    component: 'deals'
  },
  {
    title: 'Suppliers',
    icon: 'suppliers',
    parent: 'storefront',
    component: 'suppliers'
  },
  {
    title: 'Social Networks',
    icon: 'socialNetwork',
    parent: 'storefront',
    component: 'socialNetworks'
  },

  {
    title: 'Published Faq’s',
    icon: 'publishedFaqs',
    parent: 'faq',
    component: 'Published'
  },
  {
    title: 'Users Faq’s',
    icon: 'usersFaqs',
    parent: 'faq',
    component: 'Users'
  },
  {
    title: 'Archived Faq’s',
    icon: 'archivedFaqs',
    parent: 'faq',
    component: 'Archived'
  }
]
const props = defineProps({
  activeTab: { type: String, default: 'businessInfo' }
})
const route = useRoute()
const emits = defineEmits(['tabChange'])

const changeTab = (tab: string) => {
  emits('tabChange', tab)
}

const filteredTabs = computed(() => {
  return tabs.filter(tab => {
    return !!route.path.includes(tab.parent)
  })
})
</script>
