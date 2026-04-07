<script setup>
import { computed } from 'vue'

const props = defineProps({
  isAnnual: Boolean,
  baseAnnual: Number,
  addOnsAnnual: Number,
  totalSpec: Number,
  itemCount: Number,
  excess: Number,
  contentsLimit: Number,
  allConfirmed: Boolean,
  showCta: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['update:isAnnual', 'navigate'])

const annualTotal = computed(() => props.baseAnnual + props.addOnsAnnual)

const INTEREST_RATE = 14.9
const APR = 21.4

const initialPayment = computed(() => {
  return +(annualTotal.value / 12).toFixed(2)
})

const monthlyPayment = computed(() => {
  const principal = annualTotal.value - initialPayment.value
  const monthlyRate = INTEREST_RATE / 100 / 11
  const monthly = (principal * (1 + monthlyRate)) / 11
  return +monthly.toFixed(2)
})

const chargeForCredit = computed(() => {
  const totalPayable = initialPayment.value + monthlyPayment.value * 11
  return +(totalPayable - annualTotal.value).toFixed(2)
})

const totalPayable = computed(() => {
  return +(initialPayment.value + monthlyPayment.value * 11).toFixed(2)
})

function fmt(val) {
  return val.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function fmtInt(val) {
  return val.toLocaleString('en-GB')
}
</script>

<template>
  <div class="sticky top-24 bg-white rounded-2xl border border-border-light p-5 space-y-4">
    <!-- Header -->
    <h3 class="font-heading text-lg font-semibold text-charcoal">Order summary</h3>

    <!-- Summary rows -->
    <div class="space-y-2.5 text-sm font-body">
      <div class="flex justify-between">
        <span class="text-text-secondary">Specified items ({{ itemCount }})</span>
        <span class="font-medium text-text-primary">£{{ fmtInt(totalSpec) }}</span>
      </div>
      <div class="flex justify-between">
        <span class="text-text-secondary">Contents limit</span>
        <span class="font-medium text-text-primary">£{{ fmtInt(contentsLimit) }}</span>
      </div>
      <div class="flex justify-between">
        <span class="text-text-secondary">Voluntary excess</span>
        <span class="font-medium text-text-primary">£{{ excess }}</span>
      </div>
    </div>

    <!-- Divider -->
    <div class="h-px bg-border-light"></div>

    <!-- Pricing rows -->
    <div class="space-y-2.5 text-sm font-body">
      <div class="flex justify-between">
        <span class="text-text-secondary">Base policy</span>
        <span class="font-medium text-text-primary">£{{ fmt(baseAnnual) }}</span>
      </div>
      <div v-if="addOnsAnnual > 0" class="flex justify-between">
        <span class="text-text-secondary">Coverage enhancements</span>
        <span class="font-medium text-text-primary">£{{ fmt(addOnsAnnual) }}</span>
      </div>
    </div>

    <!-- Monthly / Annual toggle -->
    <div class="flex bg-off-white rounded-lg p-1">
      <button
        class="flex-1 py-2 text-xs font-body font-semibold rounded-md transition-all duration-200"
        :class="!isAnnual ? 'bg-white text-charcoal shadow-sm' : 'text-text-muted'"
        @click="emit('update:isAnnual', false)"
      >
        Monthly
      </button>
      <button
        class="flex-1 py-2 text-xs font-body font-semibold rounded-md transition-all duration-200"
        :class="isAnnual ? 'bg-white text-charcoal shadow-sm' : 'text-text-muted'"
        @click="emit('update:isAnnual', true)"
      >
        Annual
      </button>
    </div>

    <!-- Annual total -->
    <div v-if="isAnnual" class="text-center py-2">
      <div class="font-heading text-3xl font-bold text-orange">
        £{{ fmt(annualTotal) }}
      </div>
      <div class="font-body text-xs text-text-secondary mt-1">per year</div>
    </div>

    <!-- Monthly breakdown -->
    <div v-else class="space-y-3">
      <div class="text-center py-2">
        <div class="font-heading text-3xl font-bold text-charcoal">
          £{{ fmt(initialPayment) }}
        </div>
        <div class="font-body text-xs text-text-secondary mt-1">initial payment today</div>
      </div>

      <div class="space-y-2 text-xs font-body bg-off-white rounded-xl p-3.5">
        <div class="flex justify-between">
          <span class="text-text-secondary">11 monthly payments of</span>
          <span class="font-medium text-text-primary">£{{ fmt(monthlyPayment) }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-text-secondary">Interest rate</span>
          <span class="font-medium text-text-primary">{{ INTEREST_RATE }}%</span>
        </div>
        <div class="flex justify-between">
          <span class="text-text-secondary">Representative APR</span>
          <span class="font-medium text-text-primary">{{ APR }}%</span>
        </div>
        <div class="flex justify-between">
          <span class="text-text-secondary">Charge for credit</span>
          <span class="font-medium text-text-primary">£{{ fmt(chargeForCredit) }}</span>
        </div>
        <div class="h-px bg-border-light my-1"></div>
        <div class="flex justify-between font-semibold">
          <span class="text-text-primary">Total payable</span>
          <span class="text-text-primary">£{{ fmt(totalPayable) }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-text-secondary">Price if paid annually</span>
          <span class="font-medium text-text-primary">£{{ fmt(annualTotal) }}</span>
        </div>
      </div>

      <!-- Credit info box -->
      <div class="bg-off-white border border-border-light rounded-xl p-3 px-4 flex items-start gap-2">
        <svg class="w-3.5 h-3.5 text-text-muted shrink-0 mt-0.5" viewBox="0 0 14 14" fill="none">
          <circle cx="7" cy="7" r="6" stroke="currentColor" stroke-width="1.2" />
          <path d="M7 6.5V10" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
          <circle cx="7" cy="4.5" r="0.75" fill="currentColor" />
        </svg>
        <span class="font-body text-xs leading-relaxed text-text-secondary">
          Paying by Direct Debit monthly costs more than paying annually due to the interest charged on the credit agreement.
        </span>
      </div>
    </div>

    <!-- CTA -->
    <button
      v-if="showCta && allConfirmed"
      class="w-full py-3.5 rounded-xl font-body text-sm font-semibold text-charcoal bg-orange hover:bg-orange-dark transition-colors duration-200 cursor-pointer border-none"
      @click="emit('navigate', 'payment')"
    >
      Continue to payment
    </button>

    <!-- Trust strip -->
    <div class="flex items-center justify-center gap-2 pt-1">
      <svg class="w-4 h-4 text-success" viewBox="0 0 16 16" fill="none">
        <path d="M8 1L2 4V7.5C2 11.1 4.5 14.4 8 15.5C11.5 14.4 14 11.1 14 7.5V4L8 1Z" fill="currentColor" opacity="0.15" />
        <path d="M8 1L2 4V7.5C2 11.1 4.5 14.4 8 15.5C11.5 14.4 14 11.1 14 7.5V4L8 1Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round" />
        <path d="M5.5 8L7 9.5L10.5 6" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <span class="font-body text-[10px] text-text-muted tracking-wide">
        SSL secured · Lloyd's of London
      </span>
    </div>
  </div>
</template>
