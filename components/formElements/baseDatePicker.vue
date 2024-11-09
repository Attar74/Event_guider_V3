<template>
  <div class="my-[1rem]">
    <label
      v-if="label"
      :for="label"
      class="flex text-[#2A2F4F] text-[0.75rem] lg:text-[0.875rem] ml-[1rem] font-bold gap-x-1 -mb-3"
    >
      <p>{{ label }}</p>
      <span v-if="required" class="text-[#FF3D9A]">*</span>
    </label>
    <v-date-picker v-model="selectedDate" :format="dateFormat">
      <template #default="{ inputValue, inputEvents }">
        <div class="relative">
          <baseInput
            :classes="`bg-[#fff] focus:border-transparent focus:ring-0 w-full border-[#D4D5DC] border-[0.063rem] outline-0 text-[0.875rem] md:text-[1rem] text-[#000] rounded-full block h-[3rem] md:h-[3.5rem] pl-5 py-3.5 dark:placeholder-[#AAACB9]`"
            :value="inputValue"
            :placeholder="label"
            :error="error"
            :disabled="true"
            v-on="inputEvents"
          />
          <button
            class="cursor-pointer absolute top-4"
            :class="$i18n.locale === 'en' ? 'right-5' : 'left-3'"
          >
            <SVGIcon icon="calendarIcon" />
          </button>
        </div>
      </template>
    </v-date-picker>
  </div>
</template>

<script setup lang="ts">
import SVGIcon from '~/helper/SVGIcon.vue'
import baseInput from './baseInput.vue'
import { format } from 'date-fns'

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  inputId: {
    type: String,
    default: ''
  },
  value: {
    type: [String, Number, Date],
    default: ''
  },
  hasLabel: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: ''
  },
  minDate: {
    type: Date,
    default: null
  }
})
// Local state for selected date
const selectedDate = ref<string | number | Date>(props.value)

watch(selectedDate, val => {
  emitDate(val)
})

// Define emits to emit the selected date to the parent component
const emit = defineEmits(['update:selectedDate'])

// Function to emit the selected date
function emitDate(date: string | number | Date) {
  if (!date) emit('update:selectedDate', date)
  else {
    emit('update:selectedDate', format(new Date(date), 'yyyy-MM-dd'))
  }
}

// Format for the date display (optional)
const dateFormat = 'YYYY-MM-DD' // Change to desired format
</script>

<style>
.vc-popover-content-wrapper.is-interactive {
  z-index: 10;
}
/* Style the main calendar container */
.vc-container {
  font-family: Arial, sans-serif;
  background-color: #ffffff;
  border: 1px solid #d9dde3;
  border-radius: 6px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 10px;
  z-index: 10;
}

/* Style the calendar header */
.vc-title {
  font-size: 16px;
  font-weight: bold;
  color: #333333;
  text-align: center;
  padding: 8px 0;
}

/* Style navigation buttons */
.vc-nav button {
  background-color: #eaeff5;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  font-size: 14px;
  color: #333333;
  cursor: pointer;
  margin: 0 5px;
  transition: background-color 0.3s;
}

.vc-nav button:hover {
  background-color: #d9dde3;
}

.vc-weeks {
  width: 100%;
}

.vc-weekdays {
  width: 100%;
}
/* Style the weekday headers */
.vc-weekday {
  width: 40px;
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #333333;
  cursor: pointer;
  transition: background-color 0.3s;
}

/* Style the calendar days */
.vc-day {
  width: 40px;
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #333333;
  cursor: pointer;
  transition: background-color 0.3s;
}

.vc-day:hover {
  background-color: #eaeff5;
  border-radius: 50%;
}

/* Highlight the selected day */
.vc-day.selected {
  background-color: #007bff;
  color: #ffffff;
  border-radius: 50%;
}

/* Style disabled days */
.vc-day.disabled {
  color: #c0c4cc;
  cursor: not-allowed;
}

/* Style today's date */
.vc-day.today {
  border: 1px solid #007bff;
  border-radius: 50%;
  font-weight: bold;
  color: #007bff;
}
</style>
