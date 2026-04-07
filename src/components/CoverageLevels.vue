<script setup>
import { computed } from 'vue'

const props = defineProps({
  items: { type: Array, default: () => [] },
  contentsLimit: { type: Number, default: 50000 }
})

const specCount = computed(() => props.items.length)
const specTotal = computed(() => props.items.reduce((s, i) => s + i.value, 0))

const specBenefits = [
  { icon: '\uD83D\uDEE1\uFE0F', text: '\u00A30 compulsory excess', highlight: true },
  { icon: '\uD83C\uDF0D', text: 'Worldwide all-risks cover' },
  { icon: '\uD83D\uDC8E', text: 'Category-specific specialist benefits' },
  { icon: '\u26A1', text: 'Accidental loss, damage and theft' },
  { icon: '\uD83D\uDD27', text: 'Repair, replacement or cash settlement' },
]

const unspecBenefits = computed(() => [
  { icon: '\uD83C\uDFE0', text: `Contents cover up to \u00A3${props.contentsLimit.toLocaleString()}` },
  { icon: '\uD83D\uDD12', text: 'Theft and attempted theft' },
  { icon: '\u26A1', text: 'Accidental damage to contents' },
  { icon: '\uD83C\uDFD7\uFE0F', text: 'Alternative accommodation up to \u00A310,000' },
  { icon: '\uD83D\uDCF1', text: 'Bikes, phones, laptops up to \u00A31,000 each' },
])
</script>

<template>
  <div>
    <h2 class="font-heading text-[26px] font-semibold text-charcoal mb-2">
      How your cover works
    </h2>
    <p class="font-body text-[13px] text-text-secondary mb-6 leading-relaxed max-w-[560px]">
      Your policy protects your home contents in two ways. High-value items get specialist cover individually. Everything else is covered under your general contents.
    </p>

    <div class="grid grid-cols-2 gap-3.5">

      <!-- Specified Items Column -->
      <div class="bg-charcoal rounded-2xl p-5 flex flex-col border-[1.5px] border-charcoal-light">
        <!-- Header -->
        <div class="flex items-center gap-2 mb-4">
          <div class="w-7 h-7 rounded-lg bg-orange flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
              <path d="M9 2L11 7H16L12 10L13.5 15.5L9 12L4.5 15.5L6 10L2 7H7L9 2Z" fill="white" />
            </svg>
          </div>
          <div>
            <div class="font-body text-sm font-bold text-white">Specified items</div>
            <div class="font-body text-[11px]" style="color: rgba(255,255,255,0.45)">Your high-value belongings</div>
          </div>
        </div>

        <!-- Live stats -->
        <div class="flex gap-2.5 mb-5">
          <div class="flex-1 py-2.5 px-3 rounded-xl" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.07)">
            <div class="font-body text-[9px] font-semibold uppercase tracking-[0.08em] mb-0.5" style="color: rgba(255,255,255,0.35)">Items</div>
            <div class="font-heading text-xl font-bold text-white">{{ specCount }}</div>
          </div>
          <div class="flex-1 py-2.5 px-3 rounded-xl" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.07)">
            <div class="font-body text-[9px] font-semibold uppercase tracking-[0.08em] mb-0.5" style="color: rgba(255,255,255,0.35)">Total value</div>
            <div class="font-heading text-xl font-bold text-white">&pound;{{ specTotal.toLocaleString() }}</div>
          </div>
        </div>

        <!-- Benefits -->
        <div class="flex flex-col gap-2.5 flex-1">
          <div
            v-for="(b, i) in specBenefits"
            :key="i"
            class="flex items-center gap-2.5"
          >
            <span class="text-sm leading-none shrink-0">{{ b.icon }}</span>
            <span
              class="font-body text-xs"
              :class="b.highlight ? 'font-bold text-orange' : 'font-medium'"
              :style="!b.highlight ? 'color: rgba(255,255,255,0.7)' : undefined"
            >{{ b.text }}</span>
          </div>
        </div>

        <!-- Threshold note -->
        <div class="mt-5 py-2.5 px-3 rounded-lg font-body text-[11px] text-orange leading-snug" style="background: rgba(255,170,0,0.08); border: 1px solid rgba(255,170,0,0.15)">
          Items worth over &pound;1,000 should be specified for full protection
        </div>
      </div>

      <!-- Unspecified Column -->
      <div class="bg-white rounded-2xl p-5 flex flex-col border-[1.5px] border-border">
        <!-- Header -->
        <div class="flex items-center gap-2 mb-4">
          <div class="w-7 h-7 rounded-lg bg-off-white border border-border flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M2 4H14V12C14 12.6 13.6 13 13 13H3C2.4 13 2 12.6 2 12V4Z" stroke="var(--color-text-muted)" stroke-width="1.3" />
              <path d="M2 4L4 2H12L14 4" stroke="var(--color-text-muted)" stroke-width="1.3" stroke-linejoin="round" />
            </svg>
          </div>
          <div>
            <div class="font-body text-sm font-bold text-text-primary">Unspecified contents</div>
            <div class="font-body text-[11px] text-text-muted">Your everyday belongings</div>
          </div>
        </div>

        <!-- Limits summary -->
        <div class="flex gap-2.5 mb-5">
          <div class="flex-1 py-2.5 px-3 bg-off-white rounded-xl border border-border-light">
            <div class="font-body text-[9px] font-semibold uppercase tracking-[0.08em] text-text-muted mb-0.5">Contents limit</div>
            <div class="font-heading text-xl font-bold text-charcoal transition-all duration-200">&pound;{{ contentsLimit.toLocaleString() }}</div>
          </div>
          <div class="flex-1 py-2.5 px-3 bg-off-white rounded-xl border border-border-light">
            <div class="font-body text-[9px] font-semibold uppercase tracking-[0.08em] text-text-muted mb-0.5">Single item limit</div>
            <div class="font-heading text-xl font-bold text-charcoal">&pound;1,000</div>
          </div>
        </div>

        <!-- Benefits -->
        <div class="flex flex-col gap-2.5 flex-1">
          <div
            v-for="(b, i) in unspecBenefits"
            :key="i"
            class="flex items-center gap-2.5"
          >
            <span class="text-sm leading-none shrink-0">{{ b.icon }}</span>
            <span class="font-body text-xs font-medium text-text-secondary">{{ b.text }}</span>
          </div>
        </div>

        <!-- Excess note -->
        <div class="mt-5 py-2.5 px-3 rounded-lg bg-off-white border border-border-light font-body text-[11px] text-text-secondary leading-snug">
          Standard excess applies to unspecified claims
        </div>
      </div>
    </div>

    <!-- Bottom callout -->
    <div class="mt-3.5 py-3.5 px-4.5 rounded-xl bg-white border-[1.5px] border-border flex items-center gap-3">
      <div class="w-9 h-9 rounded-lg bg-success-bg flex items-center justify-center shrink-0">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 1.5L2 4.5V8C2 11.5 4.5 14.2 8 15C11.5 14.2 14 11.5 14 8V4.5L8 1.5Z" stroke="var(--color-success)" stroke-width="1.5" fill="none" />
          <path d="M5.5 8L7 9.5L10.5 6" stroke="var(--color-success)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
      <div>
        <div class="font-body text-[13px] font-semibold text-text-primary">
          Specified items get &pound;0 excess and worldwide cover that general contents doesn't include.
        </div>
        <div class="font-body text-xs text-text-secondary mt-0.5">
          Items worth over &pound;1,000 should be added as specified items above for full protection.
        </div>
      </div>
    </div>
  </div>
</template>
