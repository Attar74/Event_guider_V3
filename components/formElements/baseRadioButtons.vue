<template>
  <div class="my-[1rem]">
    <label
      v-if="label"
      :for="name"
      class="flex text-[#2A2F4F] text-[0.75rem] lg:text-[0.875rem] mb-[0.25rem] font-bold gap-x-1"
    >
      <p>{{ label }}</p>
      <span v-if="required" class="text-[#FF3D9A]">*</span>
    </label>
    <div class="flex justify-start gap-x-5 my-[1rem]">
      <div
        v-for="option in options"
        :key="option.value"
        class="flex justify-center align-middle"
      >
        <input
          :id="option.value"
          v-model="selectedOption"
          type="radio"
          :value="option.value"
          @change="updateSelectedOption"
        />
        <label
          :for="option.value"
          class="text-[0.875rem] font-[600] text-[#2A2F4F] leading-6 mx-2"
        >
          {{ option.name }}
        </label>
      </div>
    </div>
    <div
      v-if="error.length"
      class="text-[#cc0000] mx-[1rem] text-[0.875rem] md:text-[1rem] my-[0.75rem] max-w-sm"
    >
      {{ error }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true
      // Expected format: [{ id: 1, label: "Option 1" }, { id: 2, label: "Option 2" }]
    },
    value: {
      type: [Number, String],
      default: null
    },
    error: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selectedOption: this.value
    }
  },
  watch: {
    value(val) {
      this.selectedOption = val
    }
  },
  methods: {
    updateSelectedOption() {
      this.$emit('update:selected', this.selectedOption)
    }
  }
}
</script>

<style scoped>
input[type='radio'] {
  accent-color: #ff007b; /* Style the radio button color */
  cursor: pointer;
  width: 1.5rem;
  height: 1.5rem;
}
</style>
