<script setup>
const props = defineProps({
  currentStep: Number,
})

const emit = defineEmits(['step-click'])

const steps = [
  { number: 1, label: 'Cover Selection', page: 'cover' },
  { number: 2, label: 'Review', page: 'review' },
  { number: 3, label: 'Pay', page: 'payment' },
]

function isComplete(stepNumber) {
  return stepNumber < props.currentStep
}

function isActive(stepNumber) {
  return stepNumber === props.currentStep
}

function handleClick(step) {
  if (isComplete(step.number)) {
    emit('step-click', step.page)
  }
}
</script>

<template>
  <div class="flex items-center justify-center py-4">
    <template v-for="(step, index) in steps" :key="step.number">
      <!-- Connector line (before steps 2 and 3) -->
      <div
        v-if="index > 0"
        class="w-[80px] h-[2px] mx-2 transition-colors duration-300"
        :class="isComplete(step.number) || isActive(step.number) ? 'bg-orange' : 'bg-border-light'"
      ></div>

      <!-- Step circle + label -->
      <div class="flex flex-col items-center gap-1.5">
        <button
          class="w-[30px] h-[30px] rounded-full flex items-center justify-center text-xs font-body font-semibold border-2 transition-all duration-300"
          :class="[
            isComplete(step.number)
              ? 'bg-success border-success text-white cursor-pointer'
              : isActive(step.number)
                ? 'bg-orange border-orange text-white cursor-default'
                : 'bg-off-white border-border text-text-muted cursor-default',
          ]"
          :disabled="!isComplete(step.number)"
          @click="handleClick(step)"
        >
          <!-- Checkmark for completed -->
          <svg v-if="isComplete(step.number)" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 7L6 10L11 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <!-- Number for active/inactive -->
          <span v-else>{{ step.number }}</span>
        </button>
        <span
          class="font-body text-[10px] font-semibold uppercase tracking-[0.08em]"
          :class="isComplete(step.number) || isActive(step.number) ? 'text-charcoal' : 'text-text-muted'"
        >
          {{ step.label }}
        </span>
      </div>
    </template>
  </div>
</template>
