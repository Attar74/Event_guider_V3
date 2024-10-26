<template>
  <header v-if="filteredTabs.length" class="mx-[2.125rem] mb-[2.5rem]">
    <nav
      class="bg-white border-0 lg:px-6 border-b-[#D4D5DC] rounded-b-xl p-[1.5rem]"
    >
      <div
        class="flex flex-wrap items-center justify-between mx-auto p-4 md:py-[0.75rem] md:px-[5rem] w-full"
      >
        <div
          v-for="tab in filteredTabs"
          :key="tab.title"
          class="flex mx-[1rem]"
        >
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
              :icon="tab.activeIcon"
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
    activeIcon: 'active-businessInfo',
    parent: 'storefront',
    component: 'businessInfo'
  },
  {
    title: 'Location',
    icon: 'locationMap',
    activeIcon: 'active-locationMap',
    parent: 'storefront',
    component: 'location'
  },
  {
    title: 'Photos',
    icon: 'photos',
    activeIcon: 'active-photos',
    parent: 'storefront',
    component: 'photos'
  },
  {
    title: 'Questions',
    icon: 'question',
    activeIcon: 'active-question',
    parent: 'storefront',
    component: 'questions'
  },
  {
    title: 'Deals',
    icon: 'deals',
    parent: 'storefront',
    component: ''
  },
  {
    title: 'Suppliers',
    icon: 'suppliers',
    parent: 'storefront',
    component: ''
  },
  {
    title: 'Social Networks',
    icon: 'socialNetwork',
    parent: 'storefront',
    component: ''
  },

  {
    title: 'Published Faq’s',
    icon: 'publishedFaqs',
    parent: 'faq',
    component: ''
  },
  {
    title: 'Users Faq’s',
    icon: 'usersFaqs',
    parent: 'faq',
    component: ''
  },
  {
    title: 'Archived Faq’s',
    icon: 'archivedFaqs',
    parent: 'faq',
    component: ''
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
