<script setup>
defineProps({
  label: String,
  value: String,
  span: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div :class="{ 'col-span-2': span }">
    <div class="font-body text-[10px] font-semibold uppercase tracking-[0.1em] text-text-muted mb-1.5">
      {{ label }}
    </div>
    <div class="font-body text-sm font-medium text-text-primary">
      {{ value }}
    </div>
  </div>
</template>
