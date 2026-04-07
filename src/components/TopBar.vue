<script setup>
defineProps({
  isAnnual: Boolean,
  displayAmount: String,
})

const emit = defineEmits(['navigate'])
</script>

<template>
  <div class="sticky top-0 z-50 bg-white border-b border-border-light">
    <div class="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
      <!-- Logo -->
      <button
        class="flex items-center gap-0 cursor-pointer bg-transparent border-none p-0"
        @click="emit('navigate', 'cover')"
      >
        <span class="font-heading text-xl">
          <span class="font-light tracking-[0.25em] text-text-muted uppercase">Asset</span><span class="font-bold tracking-[0.25em] text-charcoal uppercase">Sure</span>
        </span>
        <span class="w-1.5 h-1.5 rounded-full bg-orange ml-0.5 mb-2"></span>
      </button>

      <!-- Payment amount -->
      <div class="flex items-center gap-3">
        <span class="font-body text-xs text-text-secondary">
          {{ isAnnual ? 'Annual' : 'Monthly' }} payment
        </span>
        <span class="font-heading text-xl font-semibold text-charcoal">
          £{{ displayAmount }}
        </span>
      </div>
    </div>
  </div>
</template>
