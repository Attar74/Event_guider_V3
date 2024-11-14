<template>
  <div
    class="mx-auto px-[1rem] md:px-[4rem] mt-[2.5rem] mb-[10rem]"
    :class="{ 'w-[65rem]': true }"
  >
    <div class="mt-[2rem]">
      <div
        class="flex gap-x-[1rem] w-full h-full overflow-hidden sm:p-[1rem] rounded-[0.75rem] mx-auto bg-[#FFF]"
      >
        <div class="w-full">
          <div class="flex justify-between w-full">
            <div class="flex gap-x-[1rem]">
              <p class="text-[#2A2F4F] text-[1rem] leading-7 my-auto">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </div>

            <div class="flex gap-x-[0.5rem] my-auto">
              <SVGIcon icon="circlePlus" />
              <p class="text-[#AAACB9] text-[1rem] leading-7 font-bold">
                Add your question
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="my-[2.5rem]">
      <form @submit.prevent="onSubmit">
        <div
          class="w-full h-full overflow-hidden shadow-lg p-[1rem] sm:p-[1.5rem] rounded-2xl bg-[#fff] mx-auto"
        >
          <div
            class="grid grid-cols-1 md:grid-cols-2 gap-x-0 md:gap-x-[1.5rem] mt-[1.5rem]"
          >
            <div class="col-span-2">
              <baseInput
                v-bind="form.question.props"
                :value="form.question.value"
                @update-input="form.question.value = $event"
              />
            </div>
          </div>
          <div class="my-[1rem] mx-5">
            <baseRadioButtons
              v-bind="form.answerType.props"
              :value="form.answerType.value"
              @update:selected="upddateRadioBtn($event)"
            />
          </div>
          <div class="my-[2.5rem]">
            <div v-if="form.answerType.value === 'Paragraph'" class="mt-[1rem]">
              <baseTextArea
                v-bind="form.paragraph.props"
                :value="form.paragraph.value"
                @update-input="form.paragraph.value = $event"
              />
            </div>
            <div
              v-else
              class="bg-[#F9F9FA] border-[0.063rem] border-[#D4D5DC] rounded-[1rem] px-[1.5rem] pb-[1.5rem] pt-[.5rem]"
            >
              <div class="flex justify-between gap-x-[1rem]">
                <div class="w-full my-auto">
                  <baseInput
                    v-bind="form.points.props"
                    :value="form.points.value"
                    @update-input="updatePointInput"
                  />
                </div>
                <div class="flex my-[1rem]">
                  <button
                    class="mb-auto rounded-[2rem] bg-[#FFF] border-[0.063rem] border-[#FF3D9A] cursor-pointer px-[3rem] py-[0.8rem] disabled:border-0"
                    @click.prevent="pushingaPoints(form.points.value)"
                  >
                    <p
                      class="text-[#FF3D9A] text[1rem] leading-7 font-bold text-nowrap"
                    >
                      Add Point
                    </p>
                  </button>
                </div>
              </div>
              <div class="flex gap-x-[1rem] flex-wrap">
                <div
                  v-for="point in points"
                  :key="point"
                  class="mt-[0.75rem] bg-[#ff3d9a0d] flex gap-x-[1rem] p-[1rem] rounded-[2.5rem] max-w-fit items-center"
                >
                  <div class="flex gap-x-[0.5rem]">
                    <SVGIcon icon="pointsCheck" />
                    <p>{{ point }}</p>
                  </div>
                  <div class="flex gap-x-[0.5rem]">
                    <button @click="EditPoint(point)">
                      <SVGIcon icon="edit" />
                    </button>
                    <button @click="popUpPoint(point)">
                      <SVGIcon icon="delete" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex justify-end gap-x-[1rem]">
            <button
              v-if="!!(questionUuid.length && !isDeleteInProgress)"
              class="rounded-[2rem] bg-[#fff] border-[0.063rem] border-[#000] w-[11.25rem] h-[3.3rem] cursor-pointer"
              @click.prevent="cancelEdit"
            >
              <p class="text-[#000] text[1rem] leading-7 font-bold">Cancel</p>
            </button>
            <button
              type="submit"
              :disabled="saveBtnLoading"
              class="rounded-[2rem] bg-[#FF3D9A] border-[0.063rem] border-[#FF3D9A] w-[11.25rem] h-[3.5rem] cursor-pointer disabled:border-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[#AAACB9]"
            >
              <p
                v-if="!saveBtnLoading"
                class="text-[#fff] text[1rem] leading-7 font-bold"
              >
                {{
                  !(questionUuid.length && !isDeleteInProgress)
                    ? 'Add Answer'
                    : 'Edit Answer'
                }}
              </p>

              <SVGIcon v-else icon="circularLoader" />
            </button>
          </div>
        </div>
      </form>
    </div>
    <div v-if="false" class="my-[2rem]">
      <div
        class="flex gap-x-[1rem] w-full h-full overflow-hidden sm:p-[1rem] rounded-[0.75rem] mx-auto bg-[#FFF]"
      >
        <div class="w-full">
          <div class="flex justify-between w-full">
            <div class="flex gap-x-[0.5rem]">
              <p class="text-[#7F8295] text-[1rem] leading-7 font-bold">01</p>
              <p class="text-[#2A2F4F] text-[1rem] leading-7 my-auto font-bold">
                From which price can I hire my Venues ?
              </p>
            </div>
            <div class="flex gap-x-[0.75rem] my-auto">
              <SVGIcon icon="edit" />
              <SVGIcon icon="delete" />
            </div>
          </div>
          <div class="mt-[0.75rem]">
            <p class="text-[#2A2F4F] text-[1rem] leading-7">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
          </div>
        </div>
      </div>
    </div>
    <transition-group name="fadeUp" tag="div" class="space-y-4">
      <div v-if="!isQuestionDataInProgress">
        <div
          v-for="(question, index) in questions"
          :key="question.uuid"
          :class="{ 'opacity-50': questionUuid === question.uuid }"
          class="my-[2rem]"
        >
          <div
            class="flex gap-x-[1rem] w-full h-full overflow-hidden sm:p-[1rem] md:p-[1.5rem] rounded-[0.75rem] mx-auto bg-[#FFF]"
          >
            <div class="w-full">
              <div class="flex justify-between w-full">
                <div class="flex gap-x-[0.5rem]">
                  <p class="text-[#7F8295] text-[1rem] leading-7 font-bold">
                    {{ index < 9 ? `0${index + 1}` : index + 1 }}
                  </p>
                  <p
                    class="text-[#2A2F4F] text-[1rem] leading-7 my-auto font-bold"
                  >
                    {{ question.question }}
                  </p>
                </div>
                <div class="flex gap-x-[0.75rem] my-auto">
                  <button
                    :disabled="!question.uuid.length"
                    @click="editQuestion(question)"
                  >
                    <SVGIcon icon="edit" />
                  </button>
                  <button
                    :disabled="isDeleteInProgress"
                    @click="deleteQuestion(question.uuid)"
                  >
                    <SVGIcon
                      v-if="
                        isDeleteInProgress && questionUuid === question.uuid
                      "
                      icon="circularLoader"
                    />
                    <SVGIcon v-else icon="delete" />
                  </button>
                </div>
              </div>
              <div
                v-if="question.answerType === 'Paragraph'"
                class="text-[#2A2F4F] text-[1rem] leading-7 font-[400] my-[1rem]"
              >
                {{ question.paragraph }}
              </div>
              <div v-else class="flex gap-x-[1rem]">
                <div
                  v-for="point in question.points"
                  :key="point"
                  class="mt-[0.75rem] bg-[#ff3d9a0d] flex gap-x-[0.5rem] py-[0.8rem] px-[1rem] rounded-[2.5rem] max-w-fit"
                >
                  <SVGIcon icon="pointsCheck" />
                  <p>{{ point }}</p>
                </div>
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
</template>
<script lang="ts" setup>
import SVGIcon from '~/helper/SVGIcon.vue'
import baseInput from '../formElements/baseInput.vue'
import baseRadioButtons from '../formElements/baseRadioButtons.vue'
import baseTextArea from '../formElements/baseTextArea.vue'
import loader from '../ui/loader.vue'
import { useSnackbarStore } from '~/store/snackbarStore'
import { useUserStore } from '~/store/user'

const snackbarStore = useSnackbarStore()

const userStore = useUserStore()
interface FormField {
  value: string | number
  props: {
    type?: string
    placeholder: string
    label?: string
    name: string
    'prefix-icon'?: string
    classes: string
    required: boolean
    error: string
  }
}

interface option {
  value: string
  name: string
}

interface FormRadioButton {
  value: string | number
  props: {
    label?: string
    name: string
    required: boolean
    error: string
    options: option[]
  }
}

interface Form {
  [key: string]: FormField | FormRadioButton
}
const form = ref<Form>({
  question: {
    value: '',
    props: {
      placeholder: 'Enter Question Title...',
      label: 'Question Title',
      name: 'question',
      classes:
        'w-full border-[#D4D5DC] border-[0.063rem] outline-0 text-[0.875rem] md:text-[1rem] text-[#000] rounded-full block h-[3rem] md:h-[3.5rem] pl-5 p-2.5 dark:placeholder-[#AAACB9]',
      required: true,
      error: ''
    }
  },
  answerType: {
    value: 'Paragraph',
    props: {
      label: 'Answer Type',
      name: 'answerType',
      required: true,
      error: '',
      options: [
        { value: 'Paragraph', name: 'Paragraph' },
        { value: 'Points', name: 'Points' }
      ]
    }
  },
  paragraph: {
    value: '',
    props: {
      placeholder: 'enter your Answer',
      name: 'paragraph',
      classes:
        'w-full bg-[#F9F9FA] w-full border-[#D4D5DC] border-[0.063rem] outline-0 text-[0.875rem] md:text-[1rem] text-[#000] rounded-xl block pt-[0.875rem] pl-[1.25rem]',
      required: true,
      error: ''
    }
  },
  points: {
    value: '',
    props: {
      placeholder: 'Enter a Point',
      name: 'points',
      'prefix-icon': 'pointsCheck',
      classes:
        'w-full border-[#D4D5DC] border-[0.063rem] outline-0 text-[0.875rem] md:text-[1rem] text-[#000] rounded-full block h-[3rem] md:h-[3.5rem] pl-12 p-2.5 dark:placeholder-[#AAACB9]',
      required: false,
      error: ''
    }
  }
})

watch(
  form,
  () => {
    validateForm()
  },
  {
    deep: true // Specify deep watching
  }
)

const cancelEdit = () => {
  questionUuid.value = ''
  form.value.question.value = ''
  form.value.paragraph.value = ''
  points.value = []
}
const upddateRadioBtn = (readioBtnOpt: string | number) => {
  form.value.answerType.value = readioBtnOpt
  form.value.paragraph.props.required = !!(readioBtnOpt === 'Paragraph')
}

const pushingaPoints = (point: string | number) => {
  if (!point.toString().length) {
    form.value.points.props.error = 'Please enter a point'
    return
  }
  if (points.value.includes(point)) {
    snackbarStore.fireSnack({
      isVisible: true,
      text: 'Point already exist',
      type: 'error'
    })
    return
  }
  points.value.push(point)
  form.value.points.value = ''
  nextTick(() => {
    form.value.points.props.error = ''
  })
}

const popUpPoint = (point: string | number) => {
  points.value = points.value.filter(P => P !== point)
}

const EditPoint = (point: string | number) => {
  popUpPoint(point)
  form.value.points.value = point
}

const updatePointInput = (point: string | number) => {
  form.value.points.value = point
  form.value.points.props.error = !!(
    point.toString().length || points.value.length
  )
    ? ''
    : 'Please enter a point'
}

const validateForm = () => {
  if (!isCheckOn.value) {
    return
  }
  for (const key in form.value) {
    if (form.value?.[key]?.props?.required || form.value?.[key]?.value) {
      form.value[key].props.error = checkFormVal(key)
    } else if (key === 'points' && form.value.answerType.value === 'Points') {
      form.value[key].props.error = !!points.value.length
        ? ''
        : 'Please Add at least one point'
    } else {
      form.value[key].props.error = ''
    }
  }
}

const checkFormVal = (key: string) => {
  let { value } = form.value?.[key]
  value = value.toString()
  switch (key) {
    case 'question':
      return !value.length
        ? `The ${key} is Required`
        : value.length < 5
          ? `The ${key} can't be less than 5 characters`
          : ''
    case 'answerType':
      return !value.length ? `The ${key} is Required` : ''
    case 'paragraph':
      return !value.length
        ? `The ${key} is Required`
        : value.length < 4
          ? `The ${key} can't be less than 4 characters`
          : ''
    default:
      return !value.length ? `The ${key} is Required` : ''
  }
}

const questionUuid = ref('')
const isDeleteInProgress = ref(false)
const isCheckOn = ref(false)
const saveBtnLoading = ref(false)
const questions = ref<questionItem[]>([])
const isQuestionDataInProgress = ref(true)
const points = ref<(string | number)[]>([])

const isValidForm = computed(() => {
  return !!(
    (form.value.answerType.value === 'Points' ? points.value.length : true) &&
    Object.values(form.value).every(({ props }) => !props?.error?.length)
  )
})

const onSubmit = () => {
  isCheckOn.value = true
  validateForm()
  if (isValidForm.value) {
    isCheckOn.value = true
    saveBtnLoading.value = true
    addQuestion()
  }
}

interface Item {
  [key: string]: string | number // Add index signature for dynamic keys
  // Other known properties
}

interface ApiResponse {
  data: Item
}

const reqBody = computed(() => {
  const payload: Record<string, string | number> = {}
  for (const key in form.value) {
    if (form.value[key].value.toString().length) {
      payload[key] = form.value[key].value
    }
  }
  return {
    ...payload,
    ...(form.value.answerType.value === 'Points' && {
      points: points.value
    })
  }
})

const addQuestion = async () => {
  try {
    const { status } = await useAPI<ApiResponse>(
      questionUuid.value.length
        ? `/faqs/my/${questionUuid.value}`
        : `/faqs/my?venueUuid=${userStore.user?.venue?.uuid}`,
      {
        method: questionUuid.value.length ? 'PUT' : 'POST',
        body: reqBody.value
      }
    )
    if (status.value === 'error') {
      snackbarStore.fireSnack({
        isVisible: true,
        text: 'Smoething went wrong',
        type: 'error'
      })
    } else {
      getAllQuestions()
      snackbarStore.fireSnack({
        isVisible: true,
        text: `Question has been ${questionUuid.value ? 'updated' : 'added'} successfully`,
        type: 'success'
      })
    }
    form.value.question.value = ''
    form.value.paragraph.value = ''
    points.value = []
    isCheckOn.value = false
  } catch (e) {
    snackbarStore.fireSnack({
      isVisible: true,
      text: 'Something went wrong',
      type: 'error'
    })
  } finally {
    saveBtnLoading.value = false
    questionUuid.value = ''
  }
}

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

const getAllQuestions = async () => {
  try {
    const { data, status } = await useAPI<ApiQuestionResponse>(`/faqs/my`, {
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
      questions.value = data.value?.data
    }
  } catch (e) {
    snackbarStore.fireSnack({
      isVisible: true,
      text: 'Something went wrong',
      type: 'error'
    })
  } finally {
    isQuestionDataInProgress.value = false
  }
}

const deleteQuestion = async (uuid: string) => {
  isDeleteInProgress.value = true
  questionUuid.value = uuid
  try {
    const { status } = await useAPI(`/faqs/my/${uuid}`, {
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

const editQuestion = (question: questionItem) => {
  questionUuid.value = question.uuid
  form.value.answerType.value = question.answerType
  form.value.question.value = question.question
  form.value.paragraph.value = question.paragraph?.length
    ? question.paragraph
    : ''
  points.value = question.points ?? []
}

onMounted(() => {
  getAllQuestions()
})
</script>
