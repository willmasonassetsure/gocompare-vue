<script setup>
import { ref, computed } from 'vue'
import HeroSection from './components/HeroSection.vue'
import ItemCard from './components/ItemCard.vue'
import UnspecifiedSlider from './components/UnspecifiedSlider.vue'
import CoverageMatrix from './components/CoverageMatrix.vue'
import CoverageLevels from './components/CoverageLevels.vue'
import OptionalAddOns from './components/OptionalAddOns.vue'
import ExcessSelector from './components/ExcessSelector.vue'
import CategoryPicker from './components/CategoryPicker.vue'
import FinalCTA from './components/FinalCTA.vue'
import MarketingOptOut from './components/MarketingOptOut.vue'
import ReviewPage from './components/ReviewPage.vue'
import PaymentPage from './components/PaymentPage.vue'
import { SAMPLE_ITEMS, PRICING } from './data/constants.js'

const { baseMonthly, baseAnnual } = PRICING

/* ── Page routing ── */
const page = ref('cover')

function handleNavigate(target) {
  page.value = target
  window.scrollTo({ top: 0, behavior: 'instant' })
}

const items = ref([...SAMPLE_ITEMS])
const expandedId = ref(null)
const showCategoryPicker = ref(false)
const completionMap = ref({})
const validationFired = ref(false)
const shakeBtn = ref(false)
const excess = ref(0)
const contentsLimit = ref(50000)
const addOnsTotal = ref(0)
const isAnnual = ref(true)
const addItemRef = ref(null)

const totalSpec = computed(() => items.value.reduce((s, i) => s + i.value, 0))

const allComplete = computed(() =>
  items.value.every(it => it.category === 'collectibles' || completionMap.value[it.id] === true)
)

const incompleteItems = computed(() =>
  items.value.filter(it => it.category !== 'collectibles' && completionMap.value[it.id] !== true)
)

function handleCompletionChange(id, complete) {
  completionMap.value[id] = complete
}

function handleAutoAdvance(completedId) {
  const idx = items.value.findIndex(it => it.id === completedId)
  const next = items.value.find((it, i) => i > idx && it.category !== 'collectibles' && completionMap.value[it.id] !== true)
  if (next) {
    expandedId.value = next.id
    setTimeout(() => {
      const el = document.getElementById(`item-card-${next.id}`)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 400)
  } else {
    expandedId.value = null
  }
}

function handleToggle(id) {
  expandedId.value = expandedId.value === id ? null : id
}

function handleRemove(id) {
  items.value = items.value.filter(i => i.id !== id)
  if (expandedId.value === id) expandedId.value = null
}

function handleUpdate(id, updates) {
  items.value = items.value.map(i => i.id === id ? { ...i, ...updates } : i)
}

function scrollToAddItem() {
  showCategoryPicker.value = true
  setTimeout(() => {
    if (addItemRef.value) addItemRef.value.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, 100)
}

function handleCategorySelect(cat) {
  const newId = Date.now()
  items.value.push({ id: newId, category: cat.key, type: cat.defaultType, description: '', value: 0 })
  showCategoryPicker.value = false
  expandedId.value = newId
  setTimeout(() => {
    const el = document.getElementById(`item-card-${newId}`)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, 150)
}

function handleContinue() {
  if (allComplete.value) {
    handleNavigate('review')
    return
  }
  validationFired.value = true
  shakeBtn.value = true
  setTimeout(() => { shakeBtn.value = false }, 450)
}

function handleScrollToFirst() {
  const first = incompleteItems.value[0]
  if (first) {
    expandedId.value = first.id
    setTimeout(() => {
      const el = document.getElementById(`item-card-${first.id}`)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 150)
  }
}

// Auto-expand first incomplete card on mount
setTimeout(() => {
  const firstIncomplete = items.value.find(it => it.category !== 'collectibles')
  if (firstIncomplete && expandedId.value === null) {
    expandedId.value = firstIncomplete.id
  }
}, 800)
</script>

<template>
  <!-- Review Page -->
  <ReviewPage
    v-if="page === 'review'"
    :items="items"
    :excess="excess"
    :contents-limit="contentsLimit"
    :add-ons-total="addOnsTotal"
    :is-annual="isAnnual"
    @navigate="handleNavigate"
    @update:items="v => items = v"
    @update:excess="v => excess = v"
    @update:contents-limit="v => contentsLimit = v"
    @update:add-ons-total="v => addOnsTotal = v"
    @update:is-annual="v => isAnnual = v"
  />

  <!-- Payment Page -->
  <PaymentPage
    v-else-if="page === 'payment'"
    :items="items"
    :excess="excess"
    :contents-limit="contentsLimit"
    :add-ons-total="addOnsTotal"
    :is-annual="isAnnual"
    @navigate="handleNavigate"
    @update:is-annual="v => isAnnual = v"
  />

  <!-- Cover Page (default) -->
  <div v-else class="min-h-screen bg-off-white">
    <HeroSection />

    <div class="bg-off-white py-8 pb-12">
      <div class="max-w-[780px] mx-auto px-5">

        <!-- Total Contents Limit -->
        <div class="bg-off-white rounded-2xl border-[1.5px] border-border-light px-6 py-7 flex flex-col items-center mb-7">
          <div class="flex items-center gap-2.5 mb-2">
            <div class="w-9 h-9 rounded-lg bg-orange-light border border-orange-mid flex items-center justify-center">
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M2 4H14V12C14 12.6 13.6 13 13 13H3C2.4 13 2 12.6 2 12V4Z" stroke="var(--color-orange)" stroke-width="1.5" /><path d="M2 4L4 2H12L14 4" stroke="var(--color-orange)" stroke-width="1.5" stroke-linejoin="round" /><path d="M6 7H10" stroke="var(--color-orange)" stroke-width="1.5" stroke-linecap="round" /></svg>
            </div>
            <h3 class="font-heading text-2xl font-semibold text-charcoal m-0">Total contents limit</h3>
          </div>
          <p class="font-body text-[13px] text-text-secondary text-center leading-relaxed max-w-[480px] mb-4">
            The maximum your policy covers across all unspecified contents — everything in your home that isn't listed individually below.
          </p>
          <div class="inline-flex items-center bg-white rounded-xl border-[1.5px] border-border overflow-hidden">
            <div class="px-4 py-2.5 font-body text-[13px] font-semibold text-text-primary border-r border-border-light">Contents cover</div>
            <select
              :value="contentsLimit"
              @change="contentsLimit = Number($event.target.value)"
              class="px-3.5 py-2.5 border-none font-body text-sm font-bold text-charcoal bg-white cursor-pointer outline-none"
              style="appearance: none; padding-right: 32px; background-image: url('data:image/svg+xml,%3Csvg width=&quot;10&quot; height=&quot;6&quot; viewBox=&quot;0 0 10 6&quot; fill=&quot;none&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cpath d=&quot;M1 1L5 5L9 1&quot; stroke=&quot;%2378716C&quot; stroke-width=&quot;1.5&quot; stroke-linecap=&quot;round&quot; stroke-linejoin=&quot;round&quot;/%3E%3C/svg%3E'); background-repeat: no-repeat; background-position: right 12px center;"
            >
              <option :value="50000">£50,000</option>
              <option :value="75000">£75,000</option>
              <option :value="100000">£100,000</option>
            </select>
          </div>
        </div>

        <!-- Specified Items Header -->
        <div class="mb-7">
          <div class="flex items-center gap-2.5 mb-1.5">
            <div class="w-9 h-9 rounded-xl bg-orange flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2L11 7H16L12 10L13.5 15.5L9 12L4.5 15.5L6 10L2 7H7L9 2Z" fill="white"/></svg>
            </div>
            <h2 class="font-heading text-[28px] font-semibold text-charcoal m-0">Your Specified Items</h2>
          </div>
          <p class="font-body text-[13px] text-text-secondary leading-relaxed max-w-[560px] m-0">
            High-value items benefit from specialist cover. Expand each to review details and see what's included.
          </p>
        </div>

        <!-- Item Cards -->
        <div class="flex flex-col gap-3.5">
          <ItemCard
            v-for="it in items"
            :key="it.id"
            :item="it"
            :is-expanded="expandedId === it.id"
            :show-error="validationFired && !allComplete && completionMap[it.id] !== true && it.category !== 'collectibles'"
            @toggle="handleToggle(it.id)"
            @remove="handleRemove"
            @update="handleUpdate"
            @completion-change="handleCompletionChange"
            @auto-advance="handleAutoAdvance"
          />
        </div>

        <!-- Add Item -->
        <div ref="addItemRef" class="mt-3.5">
          <div v-if="showCategoryPicker" class="p-4.5 bg-white rounded-2xl border-[1.5px] border-border shadow-md">
            <CategoryPicker @select="handleCategorySelect" @cancel="showCategoryPicker = false" />
          </div>
          <button
            v-else
            @click="showCategoryPicker = true"
            class="w-full py-4 border-2 border-dashed border-border rounded-2xl bg-transparent font-body text-[13px] font-semibold text-text-secondary cursor-pointer transition-all duration-150 flex items-center justify-center gap-2 hover:border-orange hover:text-charcoal hover:bg-orange-light active:scale-[0.985]"
          >
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M8 3V13M3 8H13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
            Add another specified item
          </button>
        </div>

        <!-- Summary Bar -->
        <div class="mt-6 px-5 py-4 bg-charcoal rounded-2xl flex items-center justify-between">
          <div>
            <div class="font-body text-[9px] font-semibold uppercase tracking-widest text-white/35 mb-0.5">Total specified items value</div>
            <div class="font-heading text-[32px] font-bold text-white">£{{ totalSpec.toLocaleString() }}</div>
          </div>
          <div class="flex items-center gap-3.5">
            <div class="rounded-lg px-3.5 py-2 font-body text-xs font-bold leading-none" style="background: rgba(46,125,50,0.12); border: 1px solid rgba(46,125,50,0.2); color: var(--color-success);">£0 excess on all items</div>
            <div class="text-right">
              <div class="font-body text-[11px] text-white/40">{{ items.length }} items insured</div>
              <div class="font-body text-[11px] font-semibold text-orange mt-0.5">Lloyd's of London</div>
            </div>
          </div>
        </div>

        <div class="my-9 h-px" style="background: linear-gradient(90deg, transparent, var(--color-border), transparent)"></div>

        <UnspecifiedSlider :specified-items="items" @scroll-to-add="scrollToAddItem" />

        <div class="my-9 h-px" style="background: linear-gradient(90deg, transparent, var(--color-border), transparent)"></div>

        <CoverageMatrix :contents-limit="contentsLimit" />

        <div class="my-9 h-px" style="background: linear-gradient(90deg, transparent, var(--color-border), transparent)"></div>

        <CoverageLevels :items="items" :contents-limit="contentsLimit" />

        <div class="my-9 h-px" style="background: linear-gradient(90deg, transparent, var(--color-border), transparent)"></div>

        <OptionalAddOns @total-change="v => addOnsTotal = v" />

        <div class="my-9 h-px" style="background: linear-gradient(90deg, transparent, var(--color-border), transparent)"></div>

        <ExcessSelector v-model="excess" />

        <div class="my-9 h-px" style="background: linear-gradient(90deg, transparent, var(--color-border), transparent)"></div>

        <MarketingOptOut />

        <div class="my-9 h-px" style="background: linear-gradient(90deg, transparent, var(--color-border), transparent)"></div>

        <FinalCTA
          :total-spec="totalSpec"
          :item-count="items.length"
          :is-annual="isAnnual"
          :base-monthly="baseMonthly"
          :base-annual="baseAnnual"
          :add-ons-total="addOnsTotal"
          :excess="excess"
          :all-complete="allComplete"
          :shake-btn="shakeBtn"
          :incomplete-items="incompleteItems"
          :validation-fired="validationFired"
          @continue="handleContinue"
          @error-dismiss="validationFired = false"
          @scroll-to-first="handleScrollToFirst"
        />

        <div class="h-10"></div>
      </div>
    </div>
  </div>
</template>
