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

<style scoped>
.item-input {
  width: 100%;
  padding: 10px 16px;
  border: 1.5px solid var(--color-border);
  border-radius: 8px;
  font-family: var(--font-body);
  font-size: 13px;
  line-height: 1.2;
  color: var(--color-charcoal);
  outline: none;
  background: var(--color-off-white, #FFFFFF);
  box-sizing: border-box;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.item-input:focus {
  border-color: var(--color-orange);
  box-shadow: 0 0 0 3px rgba(255, 170, 0, 0.1);
}

.item-select {
  width: 100%;
  padding: 10px 16px;
  border: 1.5px solid var(--color-border);
  border-radius: 8px;
  font-family: var(--font-body);
  font-size: 13px;
  line-height: 1.2;
  color: var(--color-charcoal);
  outline: none;
  background: var(--color-off-white, #FFFFFF);
  box-sizing: border-box;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
  appearance: none;
  padding-right: 36px;
  background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%2378716C' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
  cursor: pointer;
}

.item-select:focus {
  border-color: var(--color-orange);
  box-shadow: 0 0 0 3px rgba(255, 170, 0, 0.1);
}
</style>
