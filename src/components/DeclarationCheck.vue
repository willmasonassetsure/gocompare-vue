<script setup>
defineProps({
  label: String,
  modelValue: Boolean,
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <label class="flex items-start gap-2.5 cursor-pointer select-none py-2">
    <!-- Checkbox -->
    <span
      class="w-5 h-5 rounded flex items-center justify-center shrink-0 transition-all duration-200 border"
      :class="modelValue ? 'bg-success border-success' : 'bg-white border-border'"
      @click.prevent="emit('update:modelValue', !modelValue)"
    >
      <svg v-if="modelValue" width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </span>
    <!-- Label -->
    <span
      class="font-body text-[13px] text-text-primary leading-snug"
      @click.prevent="emit('update:modelValue', !modelValue)"
    >
      {{ label }}
    </span>
  </label>
</template>
