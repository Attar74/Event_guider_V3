<template>
  <div
    class="mx-auto px-[1rem] md:px-[4rem] mt-[2.5rem] mb-[10rem]"
    :class="{ 'w-[70rem]': true }"
  >
    <loader v-if="loading" />
    <section v-else-if="questions.length" class="flex flex-col gap-y-[1rem]">
      <transition-group name="fadeUp" tag="div" class="space-y-4">
        <FaqUserCard
          v-for="item in questions"
          :key="item.uuid"
          :question="item"
          :qa-title="item.question"
          :date="questionDateDistance(item.dateCreated)"
          :answer="item.paragraph"
          :user-full-name="item.userFullName"
          :uuid="item.uuid"
          :is-delete-in-progress="item.uuid === questionUuid"
          :is-archive-in-progress="item.uuid === questionArchivedUuid"
          :is-copied="item.uuid === copiedQuestionUuid"
          :show-archive="false"
          show-delete
          show-copy
          @delete-question="deleteQuestion($event)"
          @toggle-archive-question="unArchiveQuestion($event)"
          @copy-text="copyText($event)"
        />
      </transition-group>
    </section>
    <Section v-else class="flex justify-center items-center">
      <div class="rounded-[0.75rem] bg-[#FFF] px-[8rem] py-[2rem]">
        <h1 class="text-4xl">There is no Questions</h1>
      </div>
    </Section>
  </div>
</template>
<script setup lang="ts">
import { add, formatDistance } from 'date-fns'
import FaqUserCard from '~/components/Faq/UserCard.vue'
import loader from '../ui/loader.vue'
import { useSnackbarStore } from '~/store/snackbarStore'

const snackbarStore = useSnackbarStore()

const questions = ref<questionItem[]>([])

const loading = ref(true)
const isDeleteInProgress = ref(false)
const isArchiveInProgress = ref(false)
const questionUuid = ref('')
const questionArchivedUuid = ref('')
const copiedQuestionUuid = ref('')

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
  userFullName?: string
  starred?: boolean
}

const getUserQuestions = async () => {
  try {
    const { data, status } = await useAPI<ApiQuestionResponse>(
      `/faqs/my/users/true`,
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
    snackbarStore.fireSnack({
      isVisible: true,
      text: 'Smoething went wrong',
      type: 'error'
    })
  } finally {
    loading.value = false
  }
}

const deleteQuestion = async (uuid: string) => {
  isDeleteInProgress.value = true
  questionUuid.value = uuid
  try {
    const { status } = await useAPI(`/faqs/my/users/${uuid}`, {
      method: 'DELETE'
    })
    if (status.value === 'error') {
      snackbarStore.fireSnack({
        isVisible: true,
        text: 'Question has been deleted successfully',
        type: 'success'
      })
      return
    }
    snackbarStore.fireSnack({
      isVisible: true,
      text: 'Question has been deleted successfully',
      type: 'success'
    })
    questions.value = questions.value.filter(item => item.uuid !== uuid)
  } catch (e) {
  } finally {
    questionUuid.value = ''
    isDeleteInProgress.value = false
  }
}

const unArchiveQuestion = async (uuid: string) => {
  isArchiveInProgress.value = true
  questionArchivedUuid.value = uuid
  try {
    const { status } = await useAPI(`/faqs/my/users/${uuid}/archive/false`, {
      method: 'PUT'
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
      text: 'Question has been unArchived successfully',
      type: 'success'
    })
    questions.value = questions.value.filter(item => item.uuid !== uuid)
  } catch (e) {
  } finally {
    questionArchivedUuid.value = ''
    isArchiveInProgress.value = false
  }
}

const copyText = async ({
  qaTitle,
  uuid
}: {
  qaTitle: string
  uuid: string
}) => {
  try {
    await navigator.clipboard.writeText(qaTitle)
    copiedQuestionUuid.value = uuid
    snackbarStore.fireSnack({
      isVisible: true,
      text: 'Question has been copied successfully',
      type: 'success'
    })
  } catch (error) {
    snackbarStore.fireSnack({
      isVisible: true,
      text: 'Failed to copy question',
      type: 'error'
    })
  }
  // Clear the success message after a few seconds
  setTimeout(() => {
    copiedQuestionUuid.value = ''
  }, 2000)
}

const questionDateDistance = (dateCreated: string) => {
  if (!dateCreated) return ''
  const comment_Date = add(new Date(dateCreated), {
    hours: 3
  })
  return formatDistance(new Date(comment_Date), new Date())
}

onMounted(() => {
  getUserQuestions()
})
</script>
