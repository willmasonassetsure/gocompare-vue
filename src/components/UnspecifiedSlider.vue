<script setup>
import { ref, computed, watch, onBeforeUnmount, useTemplateRef } from 'vue'
import { COVERAGE_ANCHORS, UNSPEC_EXAMPLES, SINGLE_ITEM_LIMIT } from '../data/constants.js'

const props = defineProps({
  specifiedItems: { type: Array, default: () => [] }
})

const emit = defineEmits(['scroll-to-add'])

const MIN = 0
const MAX = 1000

const value = ref(500)
const isDragging = ref(false)
const isHovering = ref(false)
const displayValue = ref(500)
const isPulsing = ref(false)
const softNudgeDismissed = ref(false)
const firmNudgeDismissed = ref(false)

let prevH = 5
let rafId = null
let dispCurrent = 500

const itemsOverLimit = computed(() =>
  props.specifiedItems.filter(i => i.value > SINGLE_ITEM_LIMIT)
)

const showSoftNudge = computed(() =>
  value.value >= 1500 && value.value < 2750 && !softNudgeDismissed.value
)

const showFirmNudge = computed(() =>
  value.value >= 2750 && !firmNudgeDismissed.value
)

const anchor = computed(() =>
  [...COVERAGE_ANCHORS].reverse().find(a => value.value >= a.threshold) || COVERAGE_ANCHORS[0]
)

const pct = computed(() => ((value.value - MIN) / (MAX - MIN)) * 100)
const dispPct = computed(() => ((displayValue.value - MIN) / (MAX - MIN)) * 100)
const thumbSz = computed(() => isDragging.value ? 64 : 56)
const trackH = computed(() => (isHovering.value || isDragging.value) ? 6 : 4)

const anchorBg = computed(() => {
  if (value.value >= 2000) return 'bg-success-bg'
  if (value.value >= 1000) return 'bg-orange/[0.06]'
  return 'bg-transparent'
})

function animateDisplay() {
  const run = () => {
    const diff = value.value - dispCurrent
    if (Math.abs(diff) < 0.5) {
      dispCurrent = value.value
      displayValue.value = value.value
      rafId = null
      return
    }
    dispCurrent += diff * 0.18
    displayValue.value = dispCurrent
    rafId = requestAnimationFrame(run)
  }
  if (rafId) cancelAnimationFrame(rafId)
  rafId = requestAnimationFrame(run)
}

function snap(raw) {
  let s = Math.round(raw / 50) * 50
  const r = s % 250
  if (r < 30) s -= r
  else if (r > 220) s += (250 - r)
  return Math.max(MIN, Math.min(MAX, s))
}

function onInput(e) {
  value.value = Number(e.target.value)
}

function onDragStart() {
  isDragging.value = true
}

function onDragEnd() {
  if (!isDragging.value) return
  isDragging.value = false
  value.value = snap(value.value)
}

function stepDown() {
  value.value = Math.max(MIN, value.value - 50)
}

function stepUp() {
  value.value = Math.min(MAX, value.value + 50)
}

watch(value, () => {
  animateDisplay()
  const h = Math.floor(value.value / 100)
  if (h !== prevH && value.value !== 0) {
    isPulsing.value = true
    setTimeout(() => { isPulsing.value = false }, 200)
  }
  prevH = h
})

function handleGlobalUp() {
  onDragEnd()
}
if (typeof window !== 'undefined') {
  window.addEventListener('mouseup', handleGlobalUp)
  window.addEventListener('touchend', handleGlobalUp)
}

onBeforeUnmount(() => {
  if (rafId) cancelAnimationFrame(rafId)
  window.removeEventListener('mouseup', handleGlobalUp)
  window.removeEventListener('touchend', handleGlobalUp)
})
</script>

<template>
  <div class="flex flex-col gap-4">

    <!-- Slider Card -->
    <div
      class="bg-white rounded-2xl border-[1.5px] border-border py-8 px-7 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col items-center"
      @mouseenter="isHovering = true"
      @mouseleave="isHovering = false"
    >
      <!-- Header -->
      <div class="flex items-center gap-2.5 mb-2">
        <div class="w-8 h-8 rounded-lg bg-orange-light border border-orange-mid flex items-center justify-center">
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
            <path d="M2 4H14V12C14 12.6 13.6 13 13 13H3C2.4 13 2 12.6 2 12V4Z" stroke="var(--color-orange)" stroke-width="1.5" />
            <path d="M2 4L4 2H12L14 4" stroke="var(--color-orange)" stroke-width="1.5" stroke-linejoin="round" />
            <path d="M6 7H10" stroke="var(--color-orange)" stroke-width="1.5" stroke-linecap="round" />
          </svg>
        </div>
        <h3 class="font-heading text-2xl font-semibold text-charcoal m-0">Your Unspecified Items</h3>
      </div>

      <p class="font-body text-[13px] text-text-secondary text-center leading-relaxed max-w-[500px] mb-1.5">
        <strong class="text-text-primary">Out of home</strong> cover for your items <strong class="text-text-primary">under &pound;1,000</strong> &mdash; in the case of loss, damage or theft when on the go.
      </p>

      <!-- Anchor label -->
      <div
        class="font-body text-xs font-medium mb-6 py-1 px-3.5 rounded-[20px] transition-all duration-300"
        :class="[anchor.color, anchorBg]"
      >
        {{ anchor.label }}
      </div>

      <!-- Slider track -->
      <div class="w-full max-w-[499px] relative mb-3.5">
        <div class="relative mx-2" style="height: 6px; margin-top: 32px">
          <!-- Background track -->
          <div
            class="absolute left-0 right-0 top-1/2 -translate-y-1/2 rounded-full bg-border-light"
            :style="{ height: trackH + 'px', transition: 'height 200ms cubic-bezier(0.34,1.56,0.64,1)' }"
          >
            <!-- Fill -->
            <div
              class="absolute left-0 h-full rounded-full bg-charcoal-soft"
              :style="{ width: dispPct + '%' }"
            />
          </div>
        </div>

        <!-- Hidden range input -->
        <input
          type="range"
          :min="MIN"
          :max="MAX"
          :step="1"
          :value="value"
          @input="onInput"
          @mousedown="onDragStart"
          @touchstart="onDragStart"
          class="absolute top-0 left-0 w-full opacity-0 cursor-pointer z-10 m-0 box-border"
          style="height: 64px; padding: 0 8px; touch-action: none"
        />

        <!-- Custom thumb -->
        <div
          class="absolute pointer-events-none"
          :style="{
            left: `calc(${pct}% + 8px)`,
            top: '34px',
            transform: 'translate(-50%,-50%)',
            transition: isDragging
              ? 'top 200ms cubic-bezier(0.34,1.56,0.64,1)'
              : 'left 300ms cubic-bezier(0.175,0.885,0.32,1.275), top 300ms'
          }"
        >
          <div
            class="relative flex items-center justify-center"
            :style="{
              width: thumbSz + 'px',
              height: thumbSz + 'px',
              transition: 'width 250ms cubic-bezier(0.175,0.885,0.32,1.275), height 250ms cubic-bezier(0.175,0.885,0.32,1.275)'
            }"
          >
            <div
              class="absolute inset-0 rounded-full transition-all duration-200"
              :class="isDragging ? 'border-[2.5px] border-orange-hover shadow-[0_2px_8px_rgba(0,0,0,0.08)]' : 'border-2 border-charcoal shadow-[0_2px_8px_rgba(0,0,0,0.08)]'"
              :style="{ background: isDragging ? '#FFFDF5' : 'white' }"
            />
            <span
              class="relative z-[1] font-body text-[15px] text-orange-hover"
              :class="isDragging ? 'font-bold' : 'font-semibold'"
              :style="{
                transform: isPulsing ? 'scale(1.08)' : 'scale(1)',
                transition: 'transform 200ms cubic-bezier(0.34,1.56,0.64,1)'
              }"
            >
              &pound;{{ Math.round(displayValue) }}
            </span>
          </div>
        </div>

        <!-- Min/Max labels -->
        <div class="absolute -left-1 font-body text-[11px] text-text-muted" style="top: 66px">
          &pound;{{ MIN }}
        </div>
        <div class="absolute -right-1 font-body text-[11px] text-text-muted" style="top: 66px">
          &pound;{{ MAX.toLocaleString() }}
        </div>
      </div>

      <!-- Arrow buttons -->
      <div class="flex items-center gap-2 mt-7">
        <button
          @click="stepDown"
          class="w-9 h-9 rounded-lg flex items-center justify-center cursor-pointer border-[1.5px] border-border bg-off-white opacity-60 hover:bg-orange-light hover:border-orange-mid hover:opacity-100 hover:scale-110 active:scale-90 transition-all duration-150"
          style="transition-timing-function: cubic-bezier(0.34,1.56,0.64,1)"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 3L5 7L9 11" stroke="var(--color-charcoal)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
        <button
          @click="stepUp"
          class="w-9 h-9 rounded-lg flex items-center justify-center cursor-pointer border-[1.5px] border-border bg-off-white opacity-60 hover:bg-orange-light hover:border-orange-mid hover:opacity-100 hover:scale-110 active:scale-90 transition-all duration-150"
          style="transition-timing-function: cubic-bezier(0.34,1.56,0.64,1)"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style="transform: rotate(180deg)">
            <path d="M9 3L5 7L9 11" stroke="var(--color-charcoal)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Excess Comparison Cards -->
    <div class="grid grid-cols-2 gap-2.5">
      <div class="bg-white rounded-xl border-[1.5px] border-border py-3.5 px-4 flex items-center gap-2.5">
        <div class="w-9 h-9 rounded-lg bg-success-bg flex items-center justify-center shrink-0">
          <span class="font-body text-[13px] font-extrabold text-success">&pound;0</span>
        </div>
        <div>
          <div class="font-body text-xs font-semibold text-text-primary">Specified items excess</div>
          <div class="font-body text-[11px] text-success font-medium">Zero &mdash; on every claim</div>
        </div>
      </div>
      <div class="bg-white rounded-xl border-[1.5px] border-border py-3.5 px-4 flex items-center gap-2.5">
        <div class="w-9 h-9 rounded-lg bg-off-white border border-border flex items-center justify-center shrink-0">
          <span class="font-body text-xs font-bold text-text-secondary">&pound;100</span>
        </div>
        <div>
          <div class="font-body text-xs font-semibold text-text-primary">Unspecified items excess</div>
          <div class="font-body text-[11px] text-text-secondary">Standard contents excess applies</div>
        </div>
      </div>
    </div>

    <!-- Single Item Limit Card -->
    <div class="bg-white rounded-2xl border-[1.5px] border-border p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
      <div class="flex items-center gap-3.5">
        <div class="w-11 h-11 rounded-[10px] bg-off-white border-[1.5px] border-border-light flex items-center justify-center shrink-0">
          <span class="font-heading text-base font-bold text-charcoal">&pound;3k</span>
        </div>
        <div class="flex-1">
          <div class="font-body text-[13px] font-semibold text-text-primary mb-0.5">Single item limit: &pound;1,000</div>
          <div class="font-body text-xs text-text-secondary leading-snug">
            Individual items under &pound;1,000 are covered under your general contents. Items worth more should be added as specified items for full protection.
          </div>
        </div>
      </div>

      <!-- Items exceeding limit -->
      <div
        v-if="itemsOverLimit.length > 0"
        class="mt-3.5 py-3 px-3.5 rounded-[10px] bg-success-bg border border-success-light"
      >
        <div class="font-body text-xs font-semibold text-success mb-1.5 flex items-center gap-1.5">
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="6" fill="var(--color-success)" />
            <path d="M4 7L6 9L10 5" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          {{ itemsOverLimit.length }} of your items {{ itemsOverLimit.length === 1 ? 'exceeds' : 'exceed' }} this limit &mdash; already specified
        </div>
        <div class="flex flex-col gap-1">
          <div
            v-for="it in itemsOverLimit"
            :key="it.id"
            class="font-body text-[11px] text-text-secondary flex justify-between py-0.5"
          >
            <span>{{ it.description || it.type }} <span class="text-text-muted">({{ it.type }})</span></span>
            <span class="font-semibold text-text-primary">&pound;{{ it.value.toLocaleString() }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Soft Nudge -->
    <div
      v-if="showSoftNudge"
      class="py-3.5 px-4 rounded-xl bg-white border-[1.5px] border-orange-mid relative animate-[fadeSlideIn_0.4s_ease]"
    >
      <button
        @click="softNudgeDismissed = true"
        class="absolute top-2.5 right-2.5 bg-transparent border-none cursor-pointer p-1"
      >
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
          <path d="M2 2L10 10M10 2L2 10" stroke="var(--color-text-muted)" stroke-width="1.5" stroke-linecap="round" />
        </svg>
      </button>
      <div class="flex gap-3 items-center">
        <div class="w-8 h-8 rounded-lg bg-orange-light border border-orange-mid flex items-center justify-center shrink-0">
          <span class="text-[15px]">&#x1F4A1;</span>
        </div>
        <div>
          <div class="font-body text-[13px] font-semibold text-text-primary">Got items worth over &pound;1,500?</div>
          <div class="font-body text-xs text-text-secondary leading-snug mt-0.5">
            They're covered here, but specifying them unlocks worldwide all-risks cover and better claim protection.
          </div>
        </div>
      </div>
    </div>

    <!-- Firm Nudge -->
    <div
      v-if="showFirmNudge"
      class="py-4 px-[18px] rounded-[14px] bg-charcoal relative animate-[fadeSlideIn_0.4s_ease]"
    >
      <button
        @click="firmNudgeDismissed = true"
        class="absolute top-3 right-3 bg-transparent border-none cursor-pointer p-1"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 2L10 10M10 2L2 10" stroke="rgba(255,255,255,0.3)" stroke-width="1.5" stroke-linecap="round" />
        </svg>
      </button>
      <div class="flex gap-3.5 items-start">
        <div class="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style="background: rgba(255,170,0,0.15); border: 1px solid rgba(255,170,0,0.25)">
          <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
            <path d="M7 1L13 12H1L7 1Z" stroke="var(--color-orange)" stroke-width="1.5" stroke-linejoin="round" />
            <path d="M7 5V8M7 9.5V10" stroke="var(--color-orange)" stroke-width="1.5" stroke-linecap="round" />
          </svg>
        </div>
        <div>
          <div class="font-body text-[13px] font-semibold text-white mb-1">You're near the &pound;1,000 single item limit</div>
          <div class="font-body text-xs leading-relaxed mb-2.5 max-w-[500px]" style="color: rgba(255,255,255,0.55)">
            Individual items worth over &pound;1,000 <strong class="text-orange">won't be covered</strong> under general contents. Add them as specified items for full worldwide protection.
          </div>
          <button
            @click="emit('scroll-to-add')"
            class="font-body text-[11px] font-bold text-charcoal bg-orange border-none rounded-md py-2 px-4 cursor-pointer hover:bg-orange-dark active:scale-[0.96] transition-all duration-100"
          >
            &#x2191; Add a specified item
          </button>
        </div>
      </div>
    </div>

    <!-- Category Grid -->
    <div class="bg-white rounded-2xl border-[1.5px] border-border py-[18px] px-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
      <div class="font-body text-[10px] font-semibold uppercase tracking-[0.1em] text-text-muted mb-3">
        What's covered as unspecified contents
      </div>
      <div class="grid grid-cols-4 gap-2">
        <div
          v-for="(ex, i) in UNSPEC_EXAMPLES"
          :key="i"
          class="flex flex-col items-center gap-1 py-2.5 px-1.5 bg-off-white rounded-lg border border-border-light"
        >
          <span class="text-lg">{{ ex.icon }}</span>
          <span class="font-body text-[10px] text-text-secondary font-medium text-center">{{ ex.label }}</span>
        </div>
      </div>
      <div class="font-body text-[11px] text-text-muted mt-2.5 text-center leading-snug">
        Jewellery, watches, fine art, and other high-value items should be added as specified items above if over the &pound;1,000 limit.
      </div>
    </div>
  </div>
</template>
