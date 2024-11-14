<template>
  <div
    class="mx-auto px-[1rem] md:px-[4rem] mt-[2.5rem] mb-[10rem]"
    :class="{ 'w-[70rem]': true }"
  >
    <section v-if="questions.length" class="flex flex-col gap-y-[1rem]">
      <FaqUserCard
        v-for="item in questions"
        :key="item.uuid"
        :qa-title="item.question"
        :date="item.dateCreated"
        :answer="item.paragraph"
        show-archive
        show-delete
        show-copy
        show-star
      />
    </section>
    <Section v-else class="flex justify-center items-center">
      <div class="rounded-[0.75rem] bg-[#FFF] px-[8rem] py-[2rem]">
        <h1 class="text-4xl">There is no Questions</h1>
      </div>
    </Section>
  </div>
</template>
<script setup lang="ts">
import FaqUserCard from '~/components/Faq/UserCard.vue'
import { useSnackbarStore } from '~/store/snackbarStore'

const snackbarStore = useSnackbarStore()

const questions = ref<questionItem[]>([])

interface ApiQuestionResponse {
  data: { data: questionItem[] }
}

interface questionItem {
  uuid: string
  dateCreated: string
  question: string
  answerType: 'Paragraph' | 'Points'
  answerTypeLocalized: 'string'
  paragraph?: 'string'
  points?: ['string']
}

const getUserQuestions = async () => {
  try {
    const { data, status } = await useAPI<ApiQuestionResponse>(
      `/faqs/my/users/false`,
      {
        method: 'GET'
      }
    )
    if (status.value === 'error') {
      snackbarStore.fireSnack({
        isVisible: true,
        text: 'Smoething went wrong',
        type: 'error'
      })
    } else {
      if (Array.isArray(data.value?.data)) {
        questions.value = data.value?.data
      }
    }
  } catch (e) {
  } finally {
  }
}

onMounted(() => {
  getUserQuestions()
})
</script>
