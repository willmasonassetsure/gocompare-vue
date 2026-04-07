<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'info',
  },
})

const typeClasses = computed(() => {
  switch (props.type) {
    case 'warning':
      return 'bg-orange-light border-orange-mid text-charcoal'
    case 'success':
      return 'bg-success-bg border-success-light text-success'
    default:
      return 'bg-off-white border-border-light text-text-secondary'
  }
})
</script>

<template>
  <div
    class="p-3 px-4 rounded-xl flex items-start gap-2 border font-body text-xs leading-relaxed"
    :class="typeClasses"
  >
    <svg class="w-3.5 h-3.5 shrink-0 mt-0.5" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="6" stroke="currentColor" stroke-width="1.2" />
      <path d="M7 6.5V10" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
      <circle cx="7" cy="4.5" r="0.75" fill="currentColor" />
    </svg>
    <div>
      <slot />
    </div>
  </div>
</template>
