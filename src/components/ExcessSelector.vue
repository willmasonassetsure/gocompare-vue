<script setup>
import { EXCESS_OPTIONS } from '../data/constants.js'

const props = defineProps({
  modelValue: { type: Number, default: 0 }
})

const emit = defineEmits(['update:modelValue'])

function onChange(e) {
  emit('update:modelValue', Number(e.target.value))
}
</script>

<template>
  <div class="bg-off-white rounded-2xl border-[1.5px] border-border-light pt-7 px-6 pb-6 flex flex-col items-center">
    <!-- Header with piggy bank + umbrella icon -->
    <div class="flex items-center gap-2.5 mb-2">
      <div class="w-8 h-8 rounded-lg bg-orange-light border border-orange-mid flex items-center justify-center">
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
          <!-- Umbrella -->
          <path d="M10 1.5C7.5 1.5 5.5 3.5 5.5 5.5H14.5C14.5 3.5 12.5 1.5 10 1.5Z" fill="var(--color-orange)" />
          <line x1="10" y1="0.5" x2="10" y2="5.5" stroke="var(--color-charcoal)" stroke-width="0.8" stroke-linecap="round" />
          <!-- Piggy body -->
          <ellipse cx="10" cy="12" rx="6.5" ry="5" fill="var(--color-orange)" />
          <!-- Snout -->
          <ellipse cx="15.5" cy="12" rx="1.8" ry="1.3" fill="var(--color-orange-dark)" />
          <circle cx="15" cy="11.5" r="0.35" fill="var(--color-charcoal)" opacity="0.4" />
          <circle cx="16" cy="11.5" r="0.35" fill="var(--color-charcoal)" opacity="0.4" />
          <!-- Eye -->
          <circle cx="13" cy="10.2" r="0.6" fill="var(--color-charcoal)" />
          <!-- Ear -->
          <ellipse cx="11.5" cy="7.8" rx="1.4" ry="1.1" fill="var(--color-orange-dark)" transform="rotate(-10 11.5 7.8)" />
          <!-- Coin slot -->
          <rect x="8.5" y="7.5" width="3" height="0.8" rx="0.4" fill="var(--color-charcoal)" opacity="0.2" />
          <!-- Legs -->
          <rect x="6.5" y="15.5" width="1.5" height="2.2" rx="0.75" fill="var(--color-orange-dark)" />
          <rect x="12" y="15.5" width="1.5" height="2.2" rx="0.75" fill="var(--color-orange-dark)" />
          <!-- Tail -->
          <path d="M3.5 11C2.5 10 2.8 9 3.5 8.8" stroke="var(--color-orange-dark)" stroke-width="0.8" stroke-linecap="round" fill="none" />
        </svg>
      </div>
      <h2 class="font-heading text-2xl font-semibold text-charcoal m-0">
        Choose your excess
      </h2>
    </div>

    <p class="font-body text-[13px] text-text-secondary mb-4 leading-relaxed max-w-[480px] text-center">
      The excess is what you pay towards a claim. A higher excess lowers your premium. Your compulsory excess is <strong class="text-charcoal">&pound;0</strong> &mdash; choose a voluntary excess below if you'd like to reduce your cost.
    </p>

    <!-- Dropdown -->
    <div class="inline-flex items-center bg-white rounded-xl border-[1.5px] border-border overflow-hidden">
      <div class="py-2.5 px-4 font-body text-[13px] font-semibold text-text-primary border-r border-border-light">
        Voluntary excess
      </div>
      <select
        :value="modelValue"
        @change="onChange"
        class="py-2.5 pr-8 pl-3.5 border-none font-body text-sm font-bold text-charcoal bg-white cursor-pointer outline-none appearance-none"
        style="background-image: url(&quot;data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%2378716C' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E&quot;); background-repeat: no-repeat; background-position: right 12px center"
      >
        <option
          v-for="opt in EXCESS_OPTIONS"
          :key="opt.value"
          :value="opt.value"
        >
          {{ opt.label }}{{ opt.value === 0 ? ' \u2014 recommended' : '' }}
        </option>
      </select>
    </div>

    <!-- Message -->
    <div
      v-if="modelValue > 0"
      class="mt-2.5 font-body text-xs text-success font-medium animate-[fadeSlideIn_0.2s_ease]"
    >
      &pound;{{ modelValue }} voluntary excess selected &mdash; you'll pay this amount towards any claim
    </div>
    <div
      v-else
      class="mt-2.5 font-body text-xs text-text-muted"
    >
      No voluntary excess &mdash; you pay nothing towards any claim
    </div>
  </div>
</template>
