<script setup>
defineProps({
  label: String,
  modelValue: String,
  type: {
    type: String,
    default: 'text',
  },
  placeholder: String,
  options: Array,
  span: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div :class="{ 'col-span-2': span }">
    <label class="font-body text-[10px] font-semibold uppercase tracking-[0.1em] text-text-muted mb-1.5 block">
      {{ label }}
    </label>
    <!-- Select -->
    <select
      v-if="options"
      class="item-select"
      :value="modelValue"
      @change="emit('update:modelValue', $event.target.value)"
    >
      <option v-for="opt in options" :key="opt.value ?? opt" :value="opt.value ?? opt">
        {{ opt.label ?? opt }}
      </option>
    </select>
    <!-- Input -->
    <input
      v-else
      class="item-input"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      @input="emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>
