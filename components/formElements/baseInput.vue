<template>
  <div class="my-[1rem]">
    <p
      class="text-[#2A2F4F] text-[0.75rem] lg:text-[0.875rem] mb-[0.25rem] ml-[1rem] font-bold"
    >
      {{ label }}
      <span v-if="required">*</span>
    </p>
    <div class="relative">
      <div
        v-if="prefixIcon.length"
        class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none"
      >
        <SVGIcon :icon="prefixIcon" />
      </div>
      <input
        v-model="inputVal"
        :style="
          error &&
          'border:1px solid #e88080;border-radius:6px; border-radius:9999px'
        "
        :type="type"
        :name="name"
        :class="classes"
        :placeholder="placeholder"
      />
      <button
        v-if="suffixIcon.length"
        class="absolute inset-y-0 right-[1.25rem] flex items-center pl-3.5"
        @click.stop.prevent="emits('suffixIconClick', name)"
      >
        <SVGIcon :icon="suffixIcon" />
      </button>
    </div>
    <div
      v-if="error.length"
      class="text-[#cc0000] mx-[1rem] text-[0.875rem] md:text-[1rem] my-[0.75rem] max-w-sm"
    >
      {{ error }}
    </div>
  </div>
</template>
<script lang="ts" setup>
import SVGIcon from '~/helper/SVGIcon.vue'
defineProps({
  type: { type: String, default: 'text' },
  name: { type: String, default: '' },
  classes: { type: String, default: '' },
  label: {
    type: String,
    default: ''
  },
  error: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: ''
  },
  prefixIcon: {
    type: String,
    default: ''
  },
  suffixIcon: {
    type: String,
    default: ''
  }
})

const inputVal = ref('')
const emits = defineEmits(['updateInput', 'suffixIconClick'])

watch(inputVal, newValue => {
  emits('updateInput', newValue)
})
</script>
<style scopped>
input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* Change the white to any color */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px white inset !important;
}
</style>
