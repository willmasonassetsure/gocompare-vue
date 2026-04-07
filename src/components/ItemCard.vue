<template>
  <div
    :id="`item-card-${item.id}`"
    class="bg-white rounded-2xl overflow-hidden transition-all duration-200"
    :class="cardClasses"
    :style="cardStyle"
    @blur.capture="handleCardBlur"
  >
    <!-- Header -->
    <div
      class="flex items-center py-3.5 px-[18px] cursor-pointer gap-3.5 select-none transition-colors duration-150"
      :class="{ 'bg-black/[0.008]': isHovered && !isExpanded }"
      @click="$emit('toggle')"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false; isPressed = false"
      @mousedown="isPressed = true"
      @mouseup="isPressed = false"
    >
      <!-- Thumbnail -->
      <div class="w-[52px] h-[52px] rounded-xl overflow-hidden shrink-0 bg-stone-50 relative">
        <img :src="cat.image" alt="" class="w-full h-full object-cover" />
        <!-- Completion badge -->
        <div
          v-if="complete && !isExpanded"
          class="absolute -bottom-0.5 -right-0.5 w-[18px] h-[18px] rounded-full flex items-center justify-center border-2 border-white bg-success animate-[checkPop_0.35s_cubic-bezier(0.34,1.56,0.64,1)]"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 5L4 7L8 3" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
      </div>

      <!-- Info -->
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2 mb-0.5">
          <span class="font-heading text-lg font-semibold text-charcoal whitespace-nowrap overflow-hidden text-ellipsis">
            {{ ev.description || ev.type }}
          </span>
          <span class="text-[9px] font-semibold uppercase tracking-[0.08em] text-charcoal bg-orange-light py-0.5 px-2.5 rounded-full whitespace-nowrap shrink-0 border border-orange-mid font-body">
            {{ ev.type }}
          </span>
        </div>
        <div class="font-body text-xs text-text-secondary whitespace-nowrap overflow-hidden text-ellipsis">
          {{ ev.description }}
        </div>
      </div>

      <!-- Value + Badge + Chevron -->
      <div class="flex items-center gap-3 shrink-0">
        <!-- Incomplete fields counter pill -->
        <div
          v-if="!isExpanded && !complete && missingCount > 0 && (hasBeenOpened || showError)"
          class="flex items-center gap-1 rounded-full py-0.5 px-2.5 font-body text-[10px] whitespace-nowrap transition-all duration-200"
          :class="{
            'bg-error-light border border-error-mid font-bold text-error animate-[errorPillIn_0.2s_ease-out]': showError,
            'bg-stone-50 border border-border font-semibold text-text-secondary': !showError,
          }"
        >
          <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
            <circle cx="5" cy="5" r="4.5" :stroke="showError ? 'var(--color-error)' : 'var(--color-text-muted)'" stroke-width="1.2" />
            <path d="M5 3V5.5M5 7V7.2" :stroke="showError ? 'var(--color-error)' : 'var(--color-text-muted)'" stroke-width="1.2" stroke-linecap="round" />
          </svg>
          {{ missingCount === 1 ? '1 field needed' : `${missingCount} fields needed` }}
        </div>

        <div class="text-right">
          <div class="font-body text-[9px] uppercase tracking-widest text-text-muted mb-px">Insured value</div>
          <div class="font-heading text-xl font-bold text-charcoal transition-all duration-300">
            £{{ displayValue.toLocaleString() }}
          </div>
        </div>

        <div class="bg-success-bg text-success text-[9px] font-bold font-body py-1.5 px-2.5 rounded-md whitespace-nowrap tracking-[0.04em] leading-none uppercase">
          £0 Excess
        </div>

        <div
          class="w-[30px] h-[30px] rounded-lg flex items-center justify-center transition-all duration-150 shrink-0"
          :class="{
            'bg-orange': isExpanded,
            'bg-border-light': !isExpanded && isHovered,
            'bg-stone-50': !isExpanded && !isHovered,
          }"
        >
          <svg
            width="13" height="13" viewBox="0 0 14 14" fill="none"
            class="transition-transform duration-250"
            :class="{ 'rotate-180': isExpanded }"
            style="transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1)"
          >
            <path d="M3 5.5L7 9.5L11 5.5" :stroke="isExpanded ? '#FFFFFF' : 'var(--color-text-secondary)'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
      </div>
    </div>

    <!-- Expanded section -->
    <div
      class="overflow-hidden transition-[max-height] duration-[450ms]"
      style="transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1)"
      :style="{ maxHeight: isExpanded ? '1800px' : '0px' }"
    >
      <div class="border-t-[1.5px] border-border">
        <!-- Edit section -->
        <div class="p-[22px_18px_18px] bg-stone-50">
          <div class="flex items-center justify-between mb-4">
            <div class="font-body text-[10px] font-semibold uppercase tracking-widest text-charcoal-soft">
              <span class="inline-flex items-center gap-1.5">
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <path d="M10.5 1.75L12.25 3.5L4.375 11.375L1.75 12.25L2.625 9.625L10.5 1.75Z" stroke="var(--color-orange)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                Item Details
              </span>
            </div>
            <button
              class="font-body text-[11px] font-medium text-text-muted bg-transparent border-none cursor-pointer py-1 px-2 rounded-md flex items-center gap-1.5 transition-all duration-150 -mt-4 hover:text-error hover:bg-red-600/[0.06]"
              @click.stop="$emit('remove', item.id)"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 3H10M4.5 3V2C4.5 1.45 4.95 1 5.5 1H6.5C7.05 1 7.5 1.45 7.5 2V3M9 3V10C9 10.55 8.55 11 8 11H4C3.45 11 3 10.55 3 10V3" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M5 5.5V8.5M7 5.5V8.5" stroke="currentColor" stroke-width="1" stroke-linecap="round" />
              </svg>
              Remove item
            </button>
          </div>

          <div class="grid grid-cols-[1fr_1.4fr_0.8fr] gap-3">
            <!-- Item Type -->
            <div>
              <label class="item-label">Item Type</label>
              <select :value="ev.type" class="item-select" @change="upE('type', $event.target.value)">
                <option v-for="t in cat.itemTypes" :key="t" :value="t">{{ t }}</option>
              </select>
            </div>
            <!-- Description -->
            <div>
              <label class="item-label">Description</label>
              <input type="text" :value="ev.description" class="item-input" @input="upE('description', $event.target.value)" />
            </div>
            <!-- Estimated Value -->
            <div>
              <label class="item-label">Estimated Value</label>
              <div class="relative">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted font-body text-[13px] font-semibold">£</span>
                <input
                  type="text"
                  inputmode="numeric"
                  :value="rawValue"
                  class="item-input !pl-7"
                  :class="{ '!border-error-mid': valueInvalid }"
                  @input="handleValueInput"
                />
              </div>
              <div
                v-if="valueInvalid"
                class="font-body text-[11px] text-error mt-1 flex items-center gap-1 animate-[fadeSlideIn_0.2s_ease]"
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <circle cx="5" cy="5" r="4.5" stroke="currentColor" stroke-width="1" />
                  <path d="M5 3V5.5M5 7V7.2" stroke="currentColor" stroke-width="1" stroke-linecap="round" />
                </svg>
                Enter a whole number, e.g. 2500
              </div>
            </div>
          </div>
        </div>

        <!-- Questions section -->
        <div
          v-if="cat.questions.length > 0 && item.category !== 'collectibles'"
          class="p-[18px] border-t border-border-light"
        >
          <div class="font-body text-[10px] font-semibold uppercase tracking-widest text-charcoal-soft mb-4">
            <span class="inline-flex items-center gap-1.5">
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="5.5" stroke="var(--color-orange)" stroke-width="1.5" />
                <path d="M7 4V8M7 9.5V10" stroke="var(--color-orange)" stroke-width="1.5" stroke-linecap="round" />
              </svg>
              About your {{ cat.label.toLowerCase().split(' &')[0] }}
            </span>
          </div>

          <div class="grid grid-cols-2 gap-x-3 gap-y-3.5">
            <div
              v-for="q in cat.questions"
              :key="q.id"
              :class="{ 'col-span-2': !q.half }"
            >
              <!-- Question label -->
              <label class="block font-body text-[13px] text-charcoal font-medium mb-2 leading-snug">
                {{ q.label }}
                <QInfoTooltip v-if="q.info" :text="q.info" />
              </label>

              <!-- yesno -->
              <template v-if="q.type === 'yesno'">
                <YesNoButtons :value="fd[q.id]" @change="upF(q.id, $event)" />
                <FieldRequired v-if="showFieldError(q)" />
              </template>

              <!-- select -->
              <template v-if="q.type === 'select'">
                <select :value="fd[q.id] || ''" class="item-select max-w-[360px]" @change="upF(q.id, $event.target.value)">
                  <option v-for="o in q.options" :key="o.value" :value="o.value">{{ o.label }}</option>
                </select>
                <FieldRequired v-if="showFieldError(q)" />
              </template>

              <!-- currency -->
              <template v-if="q.type === 'currency'">
                <div class="relative max-w-[200px]">
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted font-body text-[13px]">£</span>
                  <input
                    type="text"
                    inputmode="numeric"
                    :value="fd[q.id] || ''"
                    :placeholder="q.placeholder"
                    class="item-input !pl-7 max-w-[200px]"
                    :class="{ '!border-error-mid': isCurrencyInvalid(q) }"
                    @input="upF(q.id, $event.target.value)"
                  />
                </div>
                <CurrencyError v-if="isCurrencyInvalid(q)" />
                <FieldRequired v-else-if="showFieldError(q)" />
              </template>

              <!-- text -->
              <template v-if="q.type === 'text'">
                <input
                  type="text"
                  :value="fd[q.id] || ''"
                  :placeholder="q.placeholder"
                  class="item-input max-w-[360px]"
                  @input="upF(q.id, $event.target.value)"
                />
                <FieldRequired v-if="showFieldError(q)" />
              </template>

              <!-- dob -->
              <template v-if="q.type === 'dob'">
                <div class="flex gap-2 max-w-[400px]">
                  <select :value="dobVal(q.id).day" class="item-select flex-1" @change="upDob(q.id, 'day', $event.target.value)">
                    <option value="">Day</option>
                    <option v-for="d in 31" :key="d" :value="d">{{ d }}</option>
                  </select>
                  <select :value="dobVal(q.id).month" class="item-select flex-1" @change="upDob(q.id, 'month', $event.target.value)">
                    <option value="">Month</option>
                    <option v-for="(m, i) in months" :key="m" :value="i + 1">{{ m }}</option>
                  </select>
                  <select :value="dobVal(q.id).year" class="item-select flex-1" @change="upDob(q.id, 'year', $event.target.value)">
                    <option value="">Year</option>
                    <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
                  </select>
                </div>
                <FieldRequired v-if="showFieldError(q)" />
              </template>

              <!-- multicheck -->
              <template v-if="q.type === 'multicheck'">
                <div class="grid grid-cols-2 gap-1.5">
                  <label
                    v-for="o in q.options"
                    :key="o.value"
                    class="flex items-center gap-2 cursor-pointer select-none py-2 px-2.5 rounded-md transition-colors duration-150"
                    :class="{ 'bg-orange-light': isChecked(q.id, o.value) }"
                    @click="toggleMulticheck(q.id, o.value)"
                  >
                    <div
                      class="w-4 h-4 rounded-[3px] flex items-center justify-center transition-all duration-150 shrink-0"
                      :class="isChecked(q.id, o.value) ? 'border-[1.5px] border-orange bg-orange' : 'border-[1.5px] border-border bg-white'"
                    >
                      <svg v-if="isChecked(q.id, o.value)" width="9" height="9" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5L4 7L8 3" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </div>
                    <span class="font-body text-xs text-charcoal">{{ o.label }}</span>
                  </label>
                </div>
                <FieldRequired v-if="showFieldError(q)" />
              </template>

              <!-- checkboxes -->
              <template v-if="q.type === 'checkboxes'">
                <div class="grid grid-cols-2 gap-1.5">
                  <label
                    v-for="o in q.options"
                    :key="o.value"
                    class="flex items-center gap-2 cursor-pointer select-none py-2 px-2.5 rounded-md transition-colors duration-150"
                    :class="{ 'bg-orange-light': isChecked(q.id, o.value) }"
                    @click="toggleCheckbox(q.id, o.value)"
                  >
                    <div
                      class="w-4 h-4 rounded-[3px] flex items-center justify-center transition-all duration-150 shrink-0"
                      :class="isChecked(q.id, o.value) ? 'border-[1.5px] border-orange bg-orange' : 'border-[1.5px] border-border bg-white'"
                    >
                      <svg v-if="isChecked(q.id, o.value)" width="9" height="9" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5L4 7L8 3" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </div>
                    <span class="font-body text-xs text-charcoal">{{ o.label }}</span>
                    <QInfoTooltip v-if="o.info" :text="o.info" />
                  </label>
                </div>
                <FieldRequired v-if="showFieldError(q)" />
              </template>

              <!-- static -->
              <template v-if="q.type === 'static'">
                <div class="py-2 px-3 bg-stone-50 rounded-lg border border-border-light font-body text-[13px] font-semibold text-charcoal">
                  {{ q.value }}
                </div>
              </template>

              <!-- Follow-up -->
              <div
                v-if="q.followUp && fd[q.id] === q.followUp.showWhen"
                class="mt-3.5 pt-3.5 border-t border-dashed border-border animate-[fadeSlideIn_0.3s_ease]"
              >
                <div class="flex gap-6 items-start">
                  <div>
                    <label class="block font-body text-[13px] text-charcoal font-medium mb-2 leading-snug">
                      {{ q.followUp.label }}
                    </label>
                    <YesNoButtons v-if="q.followUp.type === 'yesno'" :value="fd[q.followUp.id]" @change="upF(q.followUp.id, $event)" />
                  </div>

                  <!-- Previous insurer — jewellery/watches when purchased_30=No AND previously_insured=Yes -->
                  <div
                    v-if="q.id === 'purchased_30' && (item.category === 'jewellery' || item.category === 'watches') && fd[q.followUp.id] === 'Yes'"
                    class="animate-[fadeSlideIn_0.3s_ease]"
                  >
                    <label class="block font-body text-[13px] text-charcoal font-medium mb-2 leading-snug">
                      Previous insurer
                    </label>
                    <input
                      type="text"
                      :value="fd[prevInsurerKey] || ''"
                      placeholder="Enter insurer's name"
                      class="item-input max-w-[200px]"
                      @input="upF(prevInsurerKey, $event.target.value)"
                    />
                  </div>
                </div>

                <!-- Photo requirement — jewellery/watches when purchased_30=No AND previously_insured=No -->
                <div
                  v-if="q.id === 'purchased_30' && (item.category === 'jewellery' || item.category === 'watches') && fd[q.followUp.id] === 'No'"
                  class="mt-4 flex rounded-xl overflow-hidden bg-info-bg shadow-[0_1px_3px_rgba(0,0,0,0.06)] animate-[fadeSlideIn_0.3s_ease]"
                >
                  <div class="w-1 shrink-0 bg-info" />
                  <div class="p-[14px_16px] flex-1">
                    <div class="flex items-center gap-2 mb-2">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
                      </svg>
                      <span class="font-body text-[13px] font-bold text-charcoal">Important — please read</span>
                    </div>
                    <p class="font-body text-xs leading-relaxed text-charcoal-light mb-2">
                      As you've owned this item for more than 30 days without previous insurance, we'll need a photo of it against our timestamp before we can offer <strong class="text-charcoal">accidental loss</strong> cover.
                    </p>
                    <p class="font-body text-xs leading-relaxed text-charcoal-light mb-2">
                      You can still buy a policy now — cover will be limited to <strong class="text-charcoal">accidental damage and theft</strong> until we receive your photo. We'll walk you through the simple photo process at the end of this sale, and it's also included in your welcome email.
                    </p>
                    <p class="font-body text-xs leading-relaxed text-charcoal-light">
                      Questions? Call us on <strong class="text-charcoal">0208 0033 190</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Completion indicator -->
          <div
            v-if="complete"
            class="mt-[18px] p-3 px-4 rounded-xl bg-success-bg border-[1.5px] border-success-light font-body text-[13px] font-semibold text-success flex items-center gap-2.5 animate-[scaleIn_0.35s_cubic-bezier(0.34,1.56,0.64,1)]"
          >
            <div class="w-[22px] h-[22px] rounded-full bg-success flex items-center justify-center shrink-0 shadow-[0_2px_6px_rgba(46,125,50,0.25)]">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2.5 6L5 8.5L9.5 3.5" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
            All questions answered — you're covered
          </div>
        </div>

        <!-- USPs section -->
        <div class="p-[18px] border-t border-border-light bg-charcoal">
          <div class="font-body text-[10px] font-semibold uppercase tracking-[0.12em] text-orange mb-3.5 flex items-center gap-1.5">
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path d="M7 1L8.8 4.6L12.8 5.2L9.9 8L10.6 12L7 10.1L3.4 12L4.1 8L1.2 5.2L5.2 4.6L7 1Z" fill="var(--color-orange)" />
            </svg>
            Your specialist cover includes
          </div>

          <div class="grid grid-cols-2 gap-2">
            <div
              v-for="(u, i) in visibleUsps"
              :key="i"
              class="flex items-start gap-2.5 p-[10px_12px] rounded-xl"
              :class="{
                'bg-[rgba(255,170,0,0.06)] border border-[rgba(255,170,0,0.12)] animate-[fadeSlideIn_0.3s_ease]': u.artOnly,
                'bg-white/[0.04] border border-white/[0.06]': !u.artOnly,
              }"
              :style="isLastOddUsp(i) ? { gridColumn: '1 / -1' } : {}"
            >
              <span class="text-base leading-none shrink-0 mt-px">{{ u.icon }}</span>
              <div>
                <div class="font-body text-xs font-semibold text-white mb-0.5">
                  {{ u.title }}
                  <span v-if="u.artOnly" class="text-[9px] font-medium text-orange ml-1.5 uppercase tracking-[0.05em]">Art only</span>
                </div>
                <div class="font-body text-[11px] text-white/50 leading-snug">{{ u.desc }}</div>
              </div>
            </div>
          </div>

          <!-- Lloyd's badge -->
          <div class="mt-2.5 p-[9px_14px] bg-[rgba(255,170,0,0.08)] rounded-lg border border-[rgba(255,170,0,0.15)] font-body text-[11px] font-medium text-orange flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M8 1.5L2 4.5V8C2 11.5 4.5 14.2 8 15C11.5 14.2 14 11.5 14 8V4.5L8 1.5Z" stroke="var(--color-orange)" stroke-width="1.5" fill="none" />
              <path d="M5.5 8L7 9.5L10.5 6" stroke="var(--color-orange)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            Underwritten at Lloyd's of London — the world's specialist insurance market
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onUnmounted } from 'vue'
import { CATS, ART_TYPES } from '../data/constants.js'
import YesNoButtons from './YesNoButtons.vue'
import QInfoTooltip from './QInfoTooltip.vue'
import FieldRequired from './FieldRequired.vue'
import CurrencyError from './CurrencyError.vue'

/* ── Props & Emits ── */
const props = defineProps({
  item: { type: Object, required: true },
  isExpanded: { type: Boolean, default: false },
  showError: { type: Boolean, default: false },
})

const emit = defineEmits(['toggle', 'remove', 'update', 'completion-change', 'auto-advance'])

/* ── State ── */
const cat = computed(() => CATS[props.item.category])
const fd = ref({})
const ev = ref({
  type: props.item.type,
  description: props.item.description,
  value: props.item.value,
})
const displayValue = ref(props.item.value)
const rawValue = ref(String(props.item.value || ''))
const isHovered = ref(false)
const isPressed = ref(false)
const hasBeenOpened = ref(false)

const valueInvalid = computed(() => rawValue.value !== '' && (!/^\d+$/.test(rawValue.value) || rawValue.value.startsWith('0')))

let debounceTimer = null
let blurTimer = null

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const years = computed(() => Array.from({ length: 80 }, (_, i) => 2008 - i))

const prevInsurerKey = computed(() => props.item.category === 'jewellery' ? 'jewellery_prev_insurer' : 'watches_prev_insurer')

/* ── Validation helpers ── */
function isFieldEmpty(v, type) {
  if (type === 'static') return false
  if (!v || v === '') return true
  if (type === 'dob') return typeof v !== 'object' || !v.day || !v.month || !v.year
  if (type === 'multicheck' || type === 'checkboxes') return !Array.isArray(v) || v.length === 0
  if (type === 'currency') return !/^\d+$/.test(v) || v.startsWith('0')
  return false
}

function isCardComplete(questions, formData) {
  return questions.filter(q => !q.optional).every((q) => {
    if (isFieldEmpty(formData[q.id], q.type)) return false
    if (q.followUp && formData[q.id] === q.followUp.showWhen) {
      return !isFieldEmpty(formData[q.followUp.id], q.followUp.type)
    }
    return true
  })
}

function countIncompleteFields(questions, formData) {
  let count = 0
  questions.filter(q => !q.optional).forEach((q) => {
    if (isFieldEmpty(formData[q.id], q.type)) count++
    if (q.followUp && formData[q.id] === q.followUp.showWhen) {
      if (isFieldEmpty(formData[q.followUp.id], q.followUp.type)) count++
    }
  })
  return count
}

const complete = computed(() => props.item.category === 'collectibles' || isCardComplete(cat.value.questions, fd.value))
const missingCount = computed(() => props.item.category === 'collectibles' ? 0 : countIncompleteFields(cat.value.questions, fd.value))

/* ── USPs ── */
const visibleUsps = computed(() => {
  const isArtType = ART_TYPES.includes(ev.value.type)
  return cat.value.usps.filter(u => !u.artOnly || isArtType)
})

function isLastOddUsp(i) {
  return visibleUsps.value.length % 2 !== 0 && i === visibleUsps.value.length - 1
}

/* ── Update helpers ── */
function upF(key, val) {
  fd.value = { ...fd.value, [key]: val }
}

function upE(key, val) {
  const updated = { ...ev.value, [key]: val }
  ev.value = updated
  if (key === 'value') {
    if (debounceTimer) clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => {
      displayValue.value = val
      emit('update', props.item.id, updated)
    }, 600)
  } else {
    emit('update', props.item.id, updated)
  }
}

function handleValueInput(e) {
  rawValue.value = e.target.value
  const n = parseInt(e.target.value)
  if (!isNaN(n) && n > 0 && /^\d+$/.test(e.target.value)) {
    upE('value', n)
  }
}

/* ── DOB helper ── */
function dobVal(qId) {
  const v = fd.value[qId]
  return typeof v === 'object' && v ? v : { day: '', month: '', year: '' }
}

function upDob(qId, key, val) {
  const current = dobVal(qId)
  upF(qId, { ...current, [key]: val })
}

/* ── Check helpers ── */
function isChecked(qId, val) {
  return Array.isArray(fd.value[qId]) && fd.value[qId].includes(val)
}

function toggleMulticheck(qId, val) {
  const current = Array.isArray(fd.value[qId]) ? [...fd.value[qId]] : []
  if (val === 'none') {
    upF(qId, isChecked(qId, 'none') ? [] : ['none'])
    return
  }
  const filtered = current.filter(x => x !== 'none')
  upF(qId, isChecked(qId, val) ? filtered.filter(x => x !== val) : [...filtered, val])
}

function toggleCheckbox(qId, val) {
  const current = Array.isArray(fd.value[qId]) ? [...fd.value[qId]] : []
  upF(qId, isChecked(qId, val) ? current.filter(x => x !== val) : [...current, val])
}

/* ── Field error display ── */
function showFieldError(q) {
  if (q.type === 'static' || q.optional) return false
  const showErrors = hasBeenOpened.value || props.showError
  if (!showErrors) return false
  const v = fd.value[q.id]
  return isFieldEmpty(v, q.type)
}

function isCurrencyInvalid(q) {
  const v = fd.value[q.id]
  return v && v !== '' && (!/^\d+$/.test(v) || v.startsWith('0'))
}

/* ── Card border/shadow style ── */
const cardClasses = computed(() => {
  if (props.isExpanded) return ''
  if (complete.value) return ''
  if (props.showError && !complete.value) return 'animate-[errorGlow_0.6s_ease]'
  return ''
})

const cardStyle = computed(() => {
  const expanded = props.isExpanded
  const isComplete = complete.value
  const hasError = props.showError && !isComplete
  const hovered = isHovered.value
  const pressed = isPressed.value

  let border
  if (expanded) border = '2px solid var(--color-orange)'
  else if (isComplete) border = '1.5px solid var(--color-success-light)'
  else if (hasError) border = '1.5px solid var(--color-error-mid)'
  else if (hovered) border = '1.5px solid var(--color-charcoal-soft)'
  else border = '1.5px solid var(--color-border)'

  let shadow
  if (expanded) shadow = '0 8px 32px rgba(255,170,0,0.1), 0 2px 8px rgba(0,0,0,0.04)'
  else if (hasError) shadow = '0 2px 12px rgba(220,38,38,0.08)'
  else if (hovered) shadow = '0 4px 16px rgba(0,0,0,0.06)'
  else shadow = '0 1px 3px rgba(0,0,0,0.03)'

  const transform = pressed && !expanded ? 'scale(0.985)' : 'scale(1)'

  return { border, boxShadow: shadow, transform }
})

/* ── Watchers ── */
watch(() => props.isExpanded, (val) => {
  if (val) hasBeenOpened.value = true
})

watch(complete, (val) => {
  emit('completion-change', props.item.id, val)
})

/* ── Auto-advance on blur ── */
function handleCardBlur(e) {
  if (blurTimer) clearTimeout(blurTimer)
  const cardEl = document.getElementById(`item-card-${props.item.id}`)
  if (cardEl && e.relatedTarget && cardEl.contains(e.relatedTarget)) return
  blurTimer = setTimeout(() => {
    if (!cardEl) return
    if (cardEl.contains(document.activeElement)) return
    const nowComplete = props.item.category === 'collectibles' || isCardComplete(cat.value.questions, fd.value)
    if (nowComplete && props.isExpanded) {
      setTimeout(() => emit('auto-advance', props.item.id), 250)
    }
  }, 600)
}

onUnmounted(() => {
  if (debounceTimer) clearTimeout(debounceTimer)
  if (blurTimer) clearTimeout(blurTimer)
})
</script>


<style scoped>
.item-label {
  display: block;
  font-family: var(--font-body);
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-text-muted);
  margin-bottom: 6px;
}

.item-input {
  width: 100%;
  padding: 10px 12px;
  border: 1.5px solid var(--color-border);
  border-radius: 8px;
  font-family: var(--font-body);
  font-size: 13px;
  line-height: 1.2;
  color: var(--color-charcoal);
  outline: none;
  background: var(--color-off-white, #FFFFFF);
  box-sizing: border-box;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.item-input:focus {
  border-color: var(--color-orange);
  box-shadow: 0 0 0 3px rgba(255, 170, 0, 0.1);
}

.item-select {
  width: 100%;
  padding: 10px 12px;
  border: 1.5px solid var(--color-border);
  border-radius: 8px;
  font-family: var(--font-body);
  font-size: 13px;
  line-height: 1.2;
  color: var(--color-charcoal);
  outline: none;
  background: var(--color-off-white, #FFFFFF);
  box-sizing: border-box;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
  appearance: none;
  padding-right: 36px;
  background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%2378716C' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
  cursor: pointer;
}

.item-select:focus {
  border-color: var(--color-orange);
  box-shadow: 0 0 0 3px rgba(255, 170, 0, 0.1);
}

@keyframes fadeSlideIn {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.92); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes checkPop {
  0% { transform: scale(0); opacity: 0; }
  60% { transform: scale(1.2); }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes errorGlow {
  0% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.3); }
  50% { box-shadow: 0 0 12px 4px rgba(220, 38, 38, 0.15); }
  100% { box-shadow: 0 2px 12px rgba(220, 38, 38, 0.08); }
}

@keyframes errorPillIn {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}
</style>
