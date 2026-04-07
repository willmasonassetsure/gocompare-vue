<script setup>
import { INCLUDED_ITEMS, ITEM_LIMITS, NOT_COVERED } from '../data/constants.js'
import InfoTooltip from './InfoTooltip.vue'

const props = defineProps({
  contentsLimit: { type: Number, default: 50000 }
})

function formatLimit(item) {
  if (item.limit === null) return `Up to \u00A3${props.contentsLimit.toLocaleString()}`
  if (item.limit.startsWith('\u00A3')) return `Up to ${item.limit}`
  if (item.limit === '10%') return '10% \u2014 60 days'
  return item.limit
}
</script>

<template>
  <div class="flex flex-col gap-8">

    <!-- Included as standard -->
    <div>
      <h2 class="font-heading text-[26px] font-semibold text-charcoal mb-2">
        Included as standard
      </h2>
      <p class="font-body text-[13px] text-text-secondary mb-6 leading-relaxed max-w-[580px]">
        Your policy covers the essentials. Check the details below to make sure everything meets your needs.
      </p>

      <!-- Main coverage grid -->
      <div class="grid grid-cols-3 gap-2.5">
        <div
          v-for="(item, i) in INCLUDED_ITEMS"
          :key="i"
          class="flex items-start gap-2.5 p-3.5 bg-white rounded-xl border-[1.5px] border-border-light hover:border-border transition-[border-color] duration-150"
        >
          <!-- Green check -->
          <div class="w-5 h-5 rounded-full bg-success-bg flex items-center justify-center shrink-0 mt-px">
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path d="M2.5 5.5L4.5 7.5L8.5 3.5" stroke="var(--color-success)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
          <div class="flex-1">
            <div class="font-body text-[13px] font-semibold text-text-primary mb-1">{{ item.title }}</div>
            <span class="inline-block font-body text-[11px] font-bold text-success bg-success-bg py-0.5 px-2 rounded tracking-[0.02em]">
              {{ formatLimit(item) }}
            </span>
          </div>
          <InfoTooltip :text="item.info" />
        </div>
      </div>

      <!-- Item limits row -->
      <div class="mt-3.5 py-3.5 px-4.5 bg-white rounded-xl border-[1.5px] border-border-light">
        <div class="font-body text-[10px] font-semibold uppercase tracking-[0.1em] text-text-muted mb-2.5">
          Single item limits within unspecified cover
        </div>
        <div class="flex gap-3">
          <div
            v-for="(item, i) in ITEM_LIMITS"
            :key="i"
            class="flex-1 flex items-center justify-between py-2 px-3 bg-off-white rounded-lg border border-border-light"
          >
            <div class="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 11 11" fill="none">
                <path d="M2.5 5.5L4.5 7.5L8.5 3.5" stroke="var(--color-success)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <span class="font-body text-xs font-medium text-text-primary">{{ item.title }}</span>
            </div>
            <div class="flex items-center gap-1.5">
              <span class="font-body text-xs font-bold text-charcoal">{{ item.limit }}</span>
              <InfoTooltip :text="item.info" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- What's not covered -->
    <div>
      <h2 class="font-heading text-[22px] font-semibold text-charcoal mb-4">
        What's not covered
      </h2>
      <div class="grid grid-cols-2 gap-2.5">
        <div
          v-for="(item, i) in NOT_COVERED"
          :key="i"
          class="flex items-start gap-2.5 py-3 px-3.5 bg-white rounded-xl border-[1.5px] border-border-light"
        >
          <div class="w-[18px] h-[18px] flex items-center justify-center shrink-0 mt-px">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M3 3L9 9M9 3L3 9" stroke="var(--color-error)" stroke-width="1.8" stroke-linecap="round" />
            </svg>
          </div>
          <span class="font-body text-xs font-medium text-text-secondary leading-snug flex-1">{{ item.title }}</span>
          <InfoTooltip :text="item.info" />
        </div>
      </div>
    </div>

    <!-- Insurance Product Document link -->
    <div class="flex items-center justify-center flex-col gap-1 py-4">
      <a
        href="#"
        class="flex items-center gap-1.5 font-body text-[13px] font-semibold text-orange hover:text-orange-dark transition-all duration-150 no-underline"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 1V9.5M7 9.5L4 6.5M7 9.5L10 6.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M1 10V12C1 12.6 1.4 13 2 13H12C12.6 13 13 12.6 13 12V10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        Insurance Product Information Document
      </a>
      <span class="font-body text-[11px] text-text-muted">A bite-sized summary to help you easily compare products</span>
    </div>
  </div>
</template>
