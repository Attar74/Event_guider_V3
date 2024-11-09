<template>
  <div class="my-[1rem]">
    <label
      v-if="label"
      :for="name"
      class="flex text-[#2A2F4F] text-[0.75rem] lg:text-[0.875rem] mb-[0.25rem] ml-[1rem] font-bold gap-x-1"
    >
      <p>{{ label }}</p>
      <span v-if="required" class="text-[#FF3D9A]">*</span>
    </label>
    <div class="relative z-0">
      <textarea
        v-model="inputVal"
        cols="10"
        :style="error && 'border:1px solid #e88080;'"
        :rows="rows"
        :name="name"
        :class="classes"
        :placeholder="placeholder"
      />
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
const props = defineProps({
  rows: {
    default: 5,
    type: Number
  },
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
  value: {
    type: [String, Number],
    default: ''
  }
})

const inputVal = ref(props.value)
const emits = defineEmits(['updateInput'])

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
