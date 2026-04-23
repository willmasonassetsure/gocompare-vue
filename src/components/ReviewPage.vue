<script setup>
import { ref, computed } from 'vue'
import TopBar from './TopBar.vue'
import ProgressBar from './ProgressBar.vue'
import PriceSidebar from './PriceSidebar.vue'
import SectionDivider from './SectionDivider.vue'
import InfoBox from './InfoBox.vue'
import ReviewField from './ReviewField.vue'
import EditableField from './EditableField.vue'
import DeclarationCheck from './DeclarationCheck.vue'
import TrustpilotWidget from './TrustpilotWidget.vue'
import { PRICING } from '../data/constants.js'

const props = defineProps({
  items: { type: Array, default: () => [] },
  excess: { type: Number, default: 0 },
  contentsLimit: { type: Number, default: 50000 },
  addOnsTotal: { type: Number, default: 0 },
  isAnnual: { type: Boolean, default: true },
})

const emit = defineEmits([
  'navigate',
  'update:items',
  'update:excess',
  'update:contentsLimit',
  'update:addOnsTotal',
  'update:isAnnual',
])

/* ── Local state ── */
const declarations = ref({})
const allConfirmed = ref(false)
const editingSection = ref(null)

/* ── Computed ── */
const totalSpec = computed(() => props.items.reduce((s, i) => s + (i.value || 0), 0))
const baseAnnual = PRICING.baseAnnual
const totalAnnual = computed(() => baseAnnual + props.addOnsTotal)
const totalMonthly = computed(() => totalAnnual.value / 12)
const displayAmount = computed(() =>
  props.isAnnual ? totalAnnual.value.toFixed(2) : totalMonthly.value.toFixed(2)
)

/* ── Helpers ── */
function toggleEdit(section) {
  editingSection.value = editingSection.value === section ? null : section
}

function toggleDecl(key) {
  declarations.value = { ...declarations.value, [key]: !declarations.value[key] }
}

function handleStepClick(step) {
  if (step === 1) emit('navigate', 'cover')
}

/* ── Static data for select options ── */
const titleOptions = [
  { value: 'Mr', label: 'Mr' },
  { value: 'Mrs', label: 'Mrs' },
  { value: 'Ms', label: 'Ms' },
  { value: 'Miss', label: 'Miss' },
  { value: 'Dr', label: 'Dr' },
]

const ownershipOptions = [
  { value: 'Owner occupier', label: 'Owner occupier' },
  { value: 'Tenant', label: 'Tenant' },
  { value: 'Landlord', label: 'Landlord' },
]

const yesNoOptions = [
  { value: 'Yes', label: 'Yes' },
  { value: 'No', label: 'No' },
]

const propertyTypeOptions = [
  { value: 'Detached house', label: 'Detached house' },
  { value: 'Semi-detached', label: 'Semi-detached' },
  { value: 'Terraced', label: 'Terraced' },
  { value: 'Flat', label: 'Flat' },
  { value: 'Bungalow', label: 'Bungalow' },
]

const bedroomOptions = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5+', label: '5+' },
]

const contentsOptions = [
  { value: '50000', label: 'Up to £50,000' },
  { value: '75000', label: 'Up to £75,000' },
  { value: '100000', label: 'Up to £100,000' },
]

const accidentalDamageOptions = [
  { value: 'Contents only', label: 'Contents only' },
  { value: 'Buildings and contents', label: 'Buildings and contents' },
  { value: 'None', label: 'None' },
]

const claimFreeOptions = [
  { value: '0', label: '0 years' },
  { value: '1 year', label: '1 year' },
  { value: '2 years', label: '2 years' },
  { value: '3 years', label: '3 years' },
  { value: '4 years', label: '4 years' },
  { value: '5 years', label: '5 years' },
]

const excessOptions = [
  { value: 0, label: '£0' },
  { value: 100, label: '£100' },
  { value: 250, label: '£250' },
  { value: 500, label: '£500' },
]

const propertyDeclarations = [
  { label: 'Previously declared bankrupt', value: 'No' },
  { label: 'Any unspent convictions', value: 'No' },
  { label: 'Previous insurance refused, cancelled or declared void', value: 'No' },
]

const notCoveredItems = [
  "Maintenance and upkeep of your home isn't covered. This includes damage caused by gradual deterioration, wear and tear, rust, or mould.",
  "If you have a storm or flood, we won't cover any damage caused to fences, gates, or garden furniture.",
  "Building works aren't covered. This means any structural alterations, extensions, or renovations you carry out.",
]

const aboutPropertyDeclarations = [
  { key: 'flooded', label: 'The property has never been flooded.' },
  { key: 'business', label: 'The property is not used for any business or professional purpose.' },
  { key: 'claims', label: 'In the last five years, neither I nor anyone living with me has made any claims or suffered any loss or damage.' },
]

const securityDeclarations = [
  { key: 'alarm', label: 'The property has an alarm system installed that is routinely used and in full working order.' },
  { key: 'smoke', label: 'The property has smoke alarms fitted and in working order.' },
  { key: 'locks', label: 'The main entrance has key-operated locks that meet British Standard BS3621.' },
  { key: 'patio', label: 'Any patio or sliding doors have key-operated locks fitted.' },
  { key: 'otherdoors', label: 'All other external doors have key-operated locks fitted.' },
  { key: 'windows', label: 'All accessible windows at the property have key-operated locks.' },
]
</script>

<template>
  <div class="bg-off-white min-h-screen">
    <!-- Top Bar -->
    <TopBar
      :is-annual="isAnnual"
      :display-amount="displayAmount"
      @navigate="emit('navigate', $event)"
    />

    <!-- Progress Bar -->
    <div class="max-w-[1060px] mx-auto px-5">
      <ProgressBar :current-step="2" @step-click="handleStepClick" />
    </div>

    <!-- Page Header -->
    <div class="max-w-[1060px] mx-auto px-5 pb-2">
      <h1 class="font-heading text-[32px] font-bold text-charcoal mb-1">Your cover details</h1>
      <p class="font-body text-sm text-text-secondary">Please correct anything that doesn't look quite right.</p>
    </div>

    <!-- Two Column Layout -->
    <div class="max-w-[1060px] mx-auto px-5 pb-[60px] pt-4 flex gap-6 items-start">

      <!-- Left Column -->
      <div class="flex-1 flex flex-col gap-4">

        <!-- ══ 1. Personal Details ══ -->
        <div class="bg-white rounded-2xl border-2 border-border-light p-6 px-7 shadow-sm animate-[fadeSlideIn_0.3s_ease]">
          <h2 class="font-heading text-xl font-semibold text-charcoal mb-5">Personal details</h2>
          <div class="grid grid-cols-2 gap-4 mb-4">
            <EditableField label="Email address" model-value="will.example@gmail.com" type="email" />
            <EditableField label="Mobile number" model-value="07700 900123" type="tel" />
          </div>
          <InfoBox>
            Please make sure your phone number is correct — we may use it to verify your account and contact you about your policy.
          </InfoBox>
        </div>

        <!-- ══ 2. About You ══ -->
        <div
          class="bg-white rounded-2xl border-2 p-6 px-7 shadow-sm animate-[fadeSlideIn_0.3s_ease] transition-[border-color,box-shadow] duration-200"
          :class="editingSection === 'about' ? 'border-orange' : 'border-border-light'"
        >
          <div class="flex justify-between items-center mb-5">
            <h2 class="font-heading text-xl font-semibold text-charcoal">About you</h2>
            <button
              class="font-body text-xs font-semibold bg-transparent border-none cursor-pointer p-0 flex items-center gap-1"
              :class="editingSection === 'about' ? 'text-charcoal' : 'text-orange'"
              @click="toggleEdit('about')"
            >
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M8 1.5L9.5 3L3.5 9L1 9.5L1.5 7L8 1.5Z" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              {{ editingSection === 'about' ? 'Done' : 'Edit' }}
            </button>
          </div>

          <div
            class="grid grid-cols-2 gap-4 mb-4"
            :class="{ 'animate-[editFadeIn_0.2s_ease]': editingSection === 'about' }"
          >
            <template v-if="editingSection === 'about'">
              <EditableField label="Title" model-value="Mr" :options="titleOptions" />
              <EditableField label="First name" model-value="James" />
              <EditableField label="Last name" model-value="Clayton" />
              <EditableField label="Date of birth" model-value="15/03/1988" />
              <EditableField label="Telephone" model-value="" type="tel" placeholder="Optional" />
              <EditableField label="Mobile" model-value="07700 900123" type="tel" />
              <EditableField label="Occupation" model-value="Financial Services" :span="true" />
            </template>
            <template v-else>
              <ReviewField label="Title" value="Mr" />
              <ReviewField label="First name" value="James" />
              <ReviewField label="Last name" value="Clayton" />
              <ReviewField label="Date of birth" value="15/03/1988" />
              <ReviewField label="Telephone" value="—" />
              <ReviewField label="Mobile" value="07700 900123" />
              <ReviewField label="Occupation" value="Financial Services" :span="true" />
            </template>
          </div>

          <SectionDivider label="Risk address" />

          <div
            class="grid grid-cols-2 gap-4 mb-4"
            :class="{ 'animate-[editFadeIn_0.2s_ease]': editingSection === 'about' }"
          >
            <template v-if="editingSection === 'about'">
              <EditableField label="Address" model-value="12 Baker Avenue" />
              <EditableField label="Town / City" model-value="Manchester" />
              <EditableField label="County / Region" model-value="Greater Manchester" />
              <EditableField label="Postcode" model-value="M20 4BH" />
            </template>
            <template v-else>
              <ReviewField label="Address" value="12 Baker Avenue" />
              <ReviewField label="Town / City" value="Manchester" />
              <ReviewField label="County / Region" value="Greater Manchester" />
              <ReviewField label="Postcode" value="M20 4BH" />
            </template>
          </div>

          <template v-if="editingSection !== 'about'">
            <SectionDivider label="Correspondence address" />
            <div class="font-body text-[13px] text-text-muted">Same as risk address</div>
          </template>
        </div>

        <!-- ══ 3. About the Property ══ -->
        <div
          class="bg-white rounded-2xl border-2 p-6 px-7 shadow-sm animate-[fadeSlideIn_0.3s_ease] transition-[border-color,box-shadow] duration-200"
          :class="editingSection === 'property' ? 'border-orange' : 'border-border-light'"
        >
          <div class="flex justify-between items-center mb-5">
            <h2 class="font-heading text-xl font-semibold text-charcoal">About the property</h2>
            <button
              class="font-body text-xs font-semibold bg-transparent border-none cursor-pointer p-0 flex items-center gap-1"
              :class="editingSection === 'property' ? 'text-charcoal' : 'text-orange'"
              @click="toggleEdit('property')"
            >
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M8 1.5L9.5 3L3.5 9L1 9.5L1.5 7L8 1.5Z" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              {{ editingSection === 'property' ? 'Done' : 'Edit' }}
            </button>
          </div>

          <div
            class="grid grid-cols-2 gap-4 mb-4"
            :class="{ 'animate-[editFadeIn_0.2s_ease]': editingSection === 'property' }"
          >
            <template v-if="editingSection === 'property'">
              <EditableField label="Do you own or rent?" model-value="Owner occupier" :options="ownershipOptions" />
              <EditableField label="Main residence?" model-value="Yes" :options="yesNoOptions" />
              <EditableField label="Property type" model-value="Detached house" :options="propertyTypeOptions" />
              <EditableField label="Number of bedrooms" model-value="3" :options="bedroomOptions" />
              <EditableField label="Year built" model-value="1995" />
              <EditableField label="Security" model-value="British Standard locks" />
            </template>
            <template v-else>
              <ReviewField label="Do you own or rent?" value="Owner occupier" />
              <ReviewField label="Main residence?" value="Yes" />
              <ReviewField label="Property type" value="Detached house" />
              <ReviewField label="Number of bedrooms" value="3" />
              <ReviewField label="Year built" value="1995" />
              <ReviewField label="Security" value="British Standard locks" />
            </template>
          </div>

          <SectionDivider label="Declarations" />

          <div class="flex flex-col gap-2.5">
            <div
              v-for="(d, i) in propertyDeclarations"
              :key="i"
              class="flex justify-between items-center p-2 px-3.5 bg-off-white rounded-lg"
            >
              <span class="font-body text-[13px] text-text-secondary">{{ d.label }}</span>
              <span class="font-body text-[13px] font-semibold text-success">{{ d.value }}</span>
            </div>
          </div>
        </div>

        <!-- ══ 4. Your Cover ══ -->
        <div
          class="bg-white rounded-2xl border-2 p-6 px-7 shadow-sm animate-[fadeSlideIn_0.3s_ease] transition-[border-color,box-shadow] duration-200"
          :class="editingSection === 'cover' ? 'border-orange' : 'border-border-light'"
        >
          <div class="flex justify-between items-center mb-5">
            <h2 class="font-heading text-xl font-semibold text-charcoal">Your cover</h2>
            <button
              class="font-body text-xs font-semibold bg-transparent border-none cursor-pointer p-0 flex items-center gap-1"
              :class="editingSection === 'cover' ? 'text-charcoal' : 'text-orange'"
              @click="toggleEdit('cover')"
            >
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M8 1.5L9.5 3L3.5 9L1 9.5L1.5 7L8 1.5Z" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              {{ editingSection === 'cover' ? 'Done' : 'Edit' }}
            </button>
          </div>

          <div
            class="grid grid-cols-2 gap-4 mb-4"
            :class="{ 'animate-[editFadeIn_0.2s_ease]': editingSection === 'cover' }"
          >
            <template v-if="editingSection === 'cover'">
              <EditableField label="Cover start date" model-value="01/04/2026" type="date" />
              <ReviewField label="Buildings coverage" value="Not selected" />
              <EditableField
                label="Contents coverage"
                :model-value="`${contentsLimit}`"
                :options="contentsOptions"
                @update:model-value="emit('update:contentsLimit', Number($event))"
              />
              <ReviewField label="Personal belongings" value="Up to £3,000" />
              <EditableField label="Accidental damage" model-value="Contents only" :options="accidentalDamageOptions" />
              <EditableField label="Contents claim-free years" model-value="5 years" :options="claimFreeOptions" />
            </template>
            <template v-else>
              <ReviewField label="Cover start date" value="01/04/2026" />
              <ReviewField label="Buildings coverage" value="Not selected" />
              <ReviewField label="Contents coverage" :value="`Up to £${contentsLimit.toLocaleString()}`" />
              <ReviewField label="Personal belongings" value="Up to £3,000" />
              <ReviewField label="Accidental damage" value="Contents only" />
              <ReviewField label="Contents claim-free years" value="5 years" />
            </template>
          </div>

          <template v-if="editingSection !== 'cover'">
            <InfoBox type="warning">
              Please check these cover limits are suitable for your needs. If you're unsure, consider increasing your contents cover to fully protect your belongings.
            </InfoBox>
          </template>

          <SectionDivider label="Specified items" />

          <div class="flex flex-col gap-2">
            <div
              v-for="item in items"
              :key="item.id"
              class="flex items-center justify-between bg-off-white rounded-xl border border-border-light p-2.5 px-3.5"
            >
              <div>
                <div class="font-body text-[13px] font-semibold text-text-primary">
                  {{ item.description || item.name || item.type }}
                </div>
                <div class="font-body text-[11px] text-text-muted">{{ item.type }}</div>
              </div>
              <div class="font-heading text-base font-bold text-charcoal">
                £{{ (item.value || 0).toLocaleString() }}
              </div>
            </div>
          </div>

          <!-- Total specified value bar -->
          <div class="flex justify-between items-center mt-3 p-2.5 px-3.5 bg-charcoal rounded-xl">
            <span class="font-body text-xs font-semibold text-white/60">Total specified value</span>
            <span class="font-heading text-lg font-bold text-white">£{{ totalSpec.toLocaleString() }}</span>
          </div>
        </div>

        <!-- ══ 5. Previous Claims ══ -->
        <div class="bg-white rounded-2xl border-2 border-border-light p-6 px-7 shadow-sm animate-[fadeSlideIn_0.3s_ease]">
          <h2 class="font-heading text-xl font-semibold text-charcoal mb-5">Previous claims</h2>
          <div class="flex items-center gap-2.5 p-3.5 px-4 bg-success-bg rounded-[10px] border border-success-light">
            <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="6" class="fill-success" />
              <path d="M4 7L6 9L10 5" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <span class="font-body text-[13px] font-medium text-success">No previous claims declared</span>
          </div>
        </div>

        <!-- ══ 6. Excess Breakdown ══ -->
        <div
          class="bg-white rounded-2xl border-2 p-6 px-7 shadow-sm animate-[fadeSlideIn_0.3s_ease] transition-[border-color,box-shadow] duration-200"
          :class="editingSection === 'excess' ? 'border-orange' : 'border-border-light'"
        >
          <div class="flex justify-between items-center mb-5">
            <h2 class="font-heading text-xl font-semibold text-charcoal">How much is my excess?</h2>
            <button
              class="font-body text-xs font-semibold bg-transparent border-none cursor-pointer p-0 flex items-center gap-1"
              :class="editingSection === 'excess' ? 'text-charcoal' : 'text-orange'"
              @click="toggleEdit('excess')"
            >
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M8 1.5L9.5 3L3.5 9L1 9.5L1.5 7L8 1.5Z" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              {{ editingSection === 'excess' ? 'Done' : 'Edit' }}
            </button>
          </div>

          <p class="font-body text-[13px] text-text-secondary leading-relaxed mb-5">
            If you make a claim, you'll be expected to pay a portion of the amount. This is called an excess and is made up of the following:
          </p>

          <div class="flex flex-col gap-2.5">
            <!-- Compulsory excess -->
            <div class="p-3.5 px-4 bg-off-white rounded-[10px] border border-border-light">
              <div class="flex justify-between items-center">
                <div>
                  <div class="font-body text-[13px] font-semibold text-text-primary">Compulsory excess</div>
                  <div class="font-body text-xs text-text-muted mt-0.5">A fixed amount set by us</div>
                </div>
                <div class="font-heading text-xl font-bold text-charcoal">£0</div>
              </div>
            </div>

            <!-- Voluntary excess -->
            <div class="p-3.5 px-4 bg-off-white rounded-[10px] border border-border-light">
              <div class="flex justify-between items-center">
                <div>
                  <div class="font-body text-[13px] font-semibold text-text-primary">Voluntary excess</div>
                  <div class="font-body text-xs text-text-muted mt-0.5">The amount you've chosen to pay in addition</div>
                </div>
                <select
                  v-if="editingSection === 'excess'"
                  :value="excess"
                  class="font-heading text-base font-bold w-auto max-w-[140px] p-2.5 px-3 rounded-lg border-[1.5px] border-border bg-white text-text-primary transition-all duration-150 focus:border-orange focus:shadow-[0_0_0_3px_rgba(255,170,0,0.12)] outline-none"
                  @change="emit('update:excess', Number($event.target.value))"
                >
                  <option v-for="opt in excessOptions" :key="opt.value" :value="opt.value">
                    {{ opt.label }}
                  </option>
                </select>
                <div v-else class="font-heading text-xl font-bold text-charcoal">£{{ excess }}</div>
              </div>
            </div>
          </div>

          <SectionDivider label="Contents excesses" />

          <!-- Total excess per claim -->
          <div class="p-3.5 px-4 bg-off-white rounded-[10px] border border-border-light">
            <div class="flex justify-between items-center">
              <span class="font-body text-[13px] font-semibold text-text-primary">Total excess payable per claim</span>
              <span
                class="font-heading text-xl font-bold"
                :class="excess === 0 ? 'text-success' : 'text-charcoal'"
              >£{{ excess }}</span>
            </div>
          </div>
        </div>

        <!-- ══ 7. Fees and Cancellation ══ -->
        <div class="bg-white rounded-2xl border-2 border-border-light p-6 px-7 shadow-sm animate-[fadeSlideIn_0.3s_ease]">
          <h2 class="font-heading text-xl font-semibold text-charcoal mb-5">Fees and cancellation</h2>
          <p class="font-body text-[13px] text-text-secondary leading-relaxed mb-5">
            We won't charge you for making changes to your policy. You're free to cancel within 30 days for a full refund, and after that we'll return the unused portion of your premium with no deductions. All requests are handled by our in-house team. If you're unsure about anything, please refer to our terms of business agreement.
          </p>

          <SectionDivider label="Important things to know before you buy" />

          <div class="flex flex-col gap-2 mb-5">
            <div
              v-for="(text, i) in notCoveredItems"
              :key="i"
              class="flex items-start gap-2 p-2.5 px-3.5 bg-off-white rounded-lg"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" class="shrink-0 mt-0.5">
                <path d="M3 3L9 9M9 3L3 9" stroke="#DC2626" stroke-width="1.5" stroke-linecap="round" />
              </svg>
              <span class="font-body text-xs text-text-secondary leading-relaxed">{{ text }}</span>
            </div>
          </div>

          <SectionDivider label="Our terms and conditions" />

          <p class="font-body text-[13px] text-text-secondary leading-relaxed mb-3.5">
            Your policy is underwritten at Lloyd's of London. Please review the full policy document before you purchase. It contains the key features of your insurance including what is and isn't covered.
          </p>

          <div class="flex gap-3 flex-wrap">
            <a href="#" class="flex items-center gap-1.5 font-body text-xs font-semibold text-orange no-underline hover:underline">
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path d="M7 1V9.5M7 9.5L4 6.5M7 9.5L10 6.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M1 10V12C1 12.6 1.4 13 2 13H12C12.6 13 13 12.6 13 12V10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              Policy document
            </a>
            <a href="#" class="flex items-center gap-1.5 font-body text-xs font-semibold text-orange no-underline hover:underline">
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path d="M7 1V9.5M7 9.5L4 6.5M7 9.5L10 6.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M1 10V12C1 12.6 1.4 13 2 13H12C12.6 13 13 12.6 13 12V10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              Summary of cover
            </a>
          </div>
        </div>

        <!-- ══ 8. Declarations ══ -->
        <div class="bg-white rounded-2xl border-2 border-border-light p-6 px-7 shadow-sm animate-[fadeSlideIn_0.3s_ease]">
          <h2 class="font-heading text-xl font-semibold text-charcoal mb-5">Declarations</h2>
          <p class="font-body text-[13px] text-text-secondary leading-relaxed mb-5">
            Please read the following and tick each box to confirm the statements are true. Providing inaccurate information could affect your cover.
          </p>

          <SectionDivider label="About the property" />

          <div class="flex flex-col gap-1 mb-5">
            <DeclarationCheck
              v-for="d in aboutPropertyDeclarations"
              :key="d.key"
              :label="d.label"
              :checked="!!declarations[d.key]"
              @update:checked="toggleDecl(d.key)"
            />
          </div>

          <SectionDivider label="Security" />

          <div class="flex flex-col gap-1 mb-5">
            <DeclarationCheck
              v-for="d in securityDeclarations"
              :key="d.key"
              :label="d.label"
              :checked="!!declarations[d.key]"
              @update:checked="toggleDecl(d.key)"
            />
          </div>

          <!-- Divider -->
          <div class="h-px bg-border-light my-5" />

          <!-- Master confirmation -->
          <div
            class="p-4 rounded-xl border-[1.5px] transition-all duration-200 cursor-pointer"
            :class="allConfirmed
              ? 'bg-success-bg border-success-light'
              : 'bg-off-white border-border-light'"
            @click="allConfirmed = !allConfirmed"
          >
            <label class="flex items-start gap-2.5 cursor-pointer select-none">
              <div
                class="w-[22px] h-[22px] rounded shrink-0 mt-0.5 flex items-center justify-center transition-all duration-150"
                :class="allConfirmed
                  ? 'border-2 border-success bg-success'
                  : 'border-2 border-charcoal bg-white'"
              >
                <svg v-if="allConfirmed" width="13" height="13" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 6L5 8.5L9.5 3.5" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <span class="font-body text-sm font-semibold text-text-primary leading-snug">
                I confirm the information I have supplied is correct and complete to the best of my knowledge.
              </span>
            </label>
          </div>
        </div>

        <!-- ══ Bottom Navigation ══ -->
        <div class="flex justify-between items-center py-2">
          <button
            class="font-body text-[13px] font-semibold text-text-secondary bg-transparent border-[1.5px] border-border rounded-xl py-3 px-6 cursor-pointer flex items-center gap-1.5 transition-all duration-150 hover:border-charcoal hover:text-charcoal"
            @click="emit('navigate', 'cover')"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M7.5 2.5L3.5 6L7.5 9.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            Back
          </button>

          <button
            class="font-body text-sm font-bold text-charcoal bg-orange border-none rounded-xl py-3.5 px-9 cursor-pointer shadow-[0_4px_12px_rgba(255,170,0,0.25)] flex items-center gap-2 transition-all duration-150 hover:bg-orange-dark active:scale-[0.98]"
            :class="{ 'opacity-50 pointer-events-none': !allConfirmed }"
            @click="allConfirmed && emit('navigate', 'payment')"
          >
            Continue to payment
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M4.5 2.5L8.5 6L4.5 9.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>

      </div>

      <!-- Right Column — Sticky Price Sidebar -->
      <div class="w-[300px] shrink-0 sticky top-[74px] self-start">
        <PriceSidebar
          :is-annual="isAnnual"
          :base-annual="baseAnnual"
          :add-ons-annual="addOnsTotal"
          :total-spec="totalSpec"
          :item-count="items.length"
          :all-confirmed="allConfirmed"
          @update:is-annual="emit('update:isAnnual', $event)"
          @navigate="emit('navigate', $event)"
        />
        <div class="mt-3 bg-white rounded-2xl border border-border-light py-4 px-5">
          <TrustpilotWidget />
        </div>
      </div>

    </div>
  </div>
</template>
