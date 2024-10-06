<template>
  <div class="flex flex-col gap-1 call-back my-[1rem]">
    <div class="flex justify-between">
      <!--label-->
      <label
        :for="name"
        class="text-[#2A2F4F] text-[0.75rem] lg:text-[0.875rem] mb-[0.25rem] ml-[1rem] font-bold"
      >
        {{ label }}
        <span v-if="required">*</span>
      </label>
      <slot name="labelAction" />
    </div>
    <Multiselect
      v-model="inputVal"
      :style="
        error &&
        'border:1px solid #e88080;border-radius:6px; border-radius:9999px'
      "
      :class="classes"
      :options="options"
      :placeholder="placeholder"
      :loading="loading"
      track-by="name"
      label="name"
    />

    <div
      v-if="error.length"
      class="text-[#cc0000] mx-[1rem] text-[0.875rem] md:text-[1rem] my-[0.75rem]"
    >
      {{ error }}
    </div>
  </div>
</template>
<script setup lang="ts">
import '@vueform/multiselect/themes/default.css'
import { ref, watch } from 'vue'
import Multiselect from '@vueform/multiselect'
import type { PropType } from 'vue'

interface option {
  value: number
  name: string
}

interface Option {
  [key: string]: option // Replace 'any' with a more specific type based on the actual option structure
}

defineProps({
  classes: { type: String, default: '' },
  loading: {
    default: false,
    type: Boolean
  },
  options: {
    default: () => {
      return []
    },
    type: Array as PropType<Option[]>
  },
  placeholder: {
    type: String,
    default: 'Select an option'
  },
  label: {
    type: String,
    default: ''
  },
  error: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['updateInput'])

// Reactive state and other script setup code
const inputVal = ref<string | number>('') // Use more specific type if possible

// Watchers and functions
watch(inputVal, newValue => {
  emits('updateInput', newValue)
})
</script>
<style>
/* Overrides for Vue Multiselect */
.multiselect {
  border-radius: 9999px;
  border: 1px solid #d4d5dc;
}

.multiselect.is-open {
  border-radius: 9999px;
  border: 1px solid #d4d5dc;
}

.multiselect.is-active {
  box-shadow: 0 0 0 1px #fd8fc4;
}

.multiselect.is-open:focus {
  border-radius: 9999px;
  border: 1px solid #d4d5dc;
  outline: #ff3d9a;
}

.multiselect-dropdown {
  margin: -5px 0px !important;
  border-radius: 16px;
  padding: 24px 6px;
}

/* Style individual option elements */
.multiselect__option {
  padding: 10px 20px;
  cursor: pointer;
  color: #333;
  background-color: #ff3d9a;
}

.multiselect-option:hover {
  border-radius: 6px;
}

.multiselect-option.is-selected {
  background-color: #ff3d9a;
  border-radius: 6px;
}

.multiselect-option.is-selected:hover {
  background-color: #ff3d9a;
  border-radius: 6px;
}

/* Hover and highlight styles */
.multiselect__option--highlight,
.multiselect__option:hover {
  background-color: #ff3d9a; /* Light grey background on hover or highlight */
}
</style>
