<script setup>
import { computed } from 'vue'

const props = defineProps({
  totalSpec: { type: Number, default: 0 },
  itemCount: { type: Number, default: 0 },
  isAnnual: { type: Boolean, default: true },
  baseMonthly: { type: Number, default: 0 },
  baseAnnual: { type: Number, default: 0 },
  addOnsTotal: { type: Number, default: 0 },
  excess: { type: Number, default: 0 },
  allComplete: { type: Boolean, default: true },
  shakeBtn: { type: Boolean, default: false },
  incompleteItems: { type: Array, default: () => [] },
  validationFired: { type: Boolean, default: false }
})

const emit = defineEmits(['continue', 'error-dismiss', 'scroll-to-first'])

const adjustedAnnual = computed(() => props.baseAnnual + props.addOnsTotal)
const adjustedMonthly = computed(() => adjustedAnnual.value / 12)
const displayPrice = computed(() =>
  props.isAnnual ? adjustedAnnual.value.toFixed(2) : adjustedMonthly.value.toFixed(2)
)
const displayPeriod = computed(() => props.isAnnual ? 'yr' : 'mo')
const priceParts = computed(() => {
  const parts = displayPrice.value.split('.')
  return { pounds: parts[0], pence: parts[1] }
})

const btnText = computed(() => {
  if (props.validationFired && !props.allComplete) {
    return `Complete ${props.incompleteItems.length} ${props.incompleteItems.length === 1 ? 'item' : 'items'} to continue`
  }
  return 'Continue to review'
})

const incompleteNames = computed(() =>
  props.incompleteItems.map(it => it.description || it.type).join(' \u00B7 ')
)
</script>

<template>
  <div class="bg-charcoal rounded-[20px] pt-9 px-7 pb-8 text-center relative overflow-hidden">
    <!-- Gradient accent -->
    <div
      class="absolute top-0 left-0 right-0 h-[3px]"
      style="background: linear-gradient(90deg, var(--color-orange), var(--color-orange-mid), var(--color-orange))"
    />

    <!-- Heading -->
    <div class="font-heading text-[22px] font-semibold text-white mb-1.5 italic">
      Your policy is ready
    </div>
    <p class="font-body text-[13px] mb-5" style="color: rgba(255,255,255,0.5)">
      {{ itemCount }} specified {{ itemCount === 1 ? 'item' : 'items' }} worth &pound;{{ totalSpec.toLocaleString() }} &mdash; fully protected
    </p>

    <!-- Price -->
    <div class="mb-6">
      <div class="flex items-start justify-center">
        <span class="font-heading text-5xl font-bold text-white leading-none">
          &pound;{{ priceParts.pounds }}
        </span>
        <span class="font-heading text-[22px] font-semibold text-white leading-none mt-1">
          .{{ priceParts.pence }}
        </span>
        <span class="font-body text-sm ml-1 mt-2" style="color: rgba(255,255,255,0.45)">
          / {{ displayPeriod }}
        </span>
      </div>
      <div
        v-if="addOnsTotal > 0"
        class="font-body text-[11px] mt-1"
        style="color: rgba(255,255,255,0.35)"
      >
        Includes &pound;{{ addOnsTotal.toFixed(2) }}/yr in optional extras
      </div>
      <div
        v-if="excess > 0"
        class="font-body text-[11px] mt-0.5"
        style="color: rgba(255,255,255,0.35)"
      >
        &pound;{{ excess }} voluntary excess applies to claims
      </div>
    </div>

    <!-- Error banner -->
    <div
      v-if="validationFired && !allComplete"
      role="alert"
      class="mb-4 py-3.5 px-4 rounded-xl bg-error-light border-[1.5px] border-error-mid flex items-start gap-2.5 text-left animate-[fadeSlideIn_0.25s_ease]"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" class="shrink-0 mt-px">
        <circle cx="8" cy="8" r="7" stroke="var(--color-error)" stroke-width="1.5" />
        <path d="M8 4.5V8.5M8 10.5V11" stroke="var(--color-error)" stroke-width="1.5" stroke-linecap="round" />
      </svg>
      <div class="flex-1">
        <div class="font-body text-[13px] font-bold text-charcoal mb-0.5">
          A few items still need details
        </div>
        <div class="font-body text-xs text-charcoal-soft leading-relaxed">
          {{ incompleteNames }} &mdash; please expand and complete before continuing.
        </div>
        <button
          @click="emit('scroll-to-first')"
          class="bg-transparent border-none cursor-pointer pt-1 p-0 font-body text-xs font-bold text-error flex items-center gap-1 hover:opacity-75 transition-opacity duration-150"
        >
          Show me what's missing
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
            <path d="M4.5 2.5L8.5 6L4.5 9.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>
      <button
        @click="emit('error-dismiss')"
        class="bg-transparent border-none cursor-pointer p-0.5 text-text-muted shrink-0"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 2L10 10M10 2L2 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
        </svg>
      </button>
    </div>

    <!-- CTA Button -->
    <button
      @click="emit('continue')"
      class="font-body text-base font-bold text-charcoal bg-orange border-none rounded-xl py-4 px-12 cursor-pointer w-full max-w-[400px] shadow-[0_4px_16px_rgba(255,170,0,0.3)] hover:bg-orange-dark hover:shadow-[0_6px_24px_rgba(255,170,0,0.4)] active:scale-[0.98] transition-all duration-150"
      :style="{ animation: shakeBtn ? 'shake 0.45s ease' : 'none' }"
    >
      {{ btnText }}
    </button>

    <!-- Trust strip -->
    <div class="flex items-center justify-center gap-4 mt-5 flex-wrap">
      <div class="flex items-center gap-[5px]">
        <span class="text-xs">&#x1F6E1;&#xFE0F;</span>
        <span class="font-body text-[11px] font-medium" style="color: rgba(255,255,255,0.4)">In-house claims team</span>
      </div>
      <div class="flex items-center gap-[5px]">
        <span class="text-xs">&#x21A9;&#xFE0F;</span>
        <span class="font-body text-[11px] font-medium" style="color: rgba(255,255,255,0.4)">30-day money-back</span>
      </div>
      <div class="flex items-center gap-[5px]">
        <span class="text-xs">&#x2B50;</span>
        <span class="font-body text-[11px] font-medium" style="color: rgba(255,255,255,0.4)">4.9/5 Trustpilot</span>
      </div>
    </div>
  </div>
</template>
