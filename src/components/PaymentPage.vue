<template>
  <!-- ═══ SUCCESS SCREEN ═══ -->
  <div v-if="isComplete" class="bg-off-white min-h-screen">
    <TopBar @navigate="$emit('navigate', $event)" />

    <div class="max-w-[600px] mx-auto mt-20 px-5 text-center animate-[fadeUp_0.6s_ease]">
      <!-- Green checkmark -->
      <div class="w-[72px] h-[72px] rounded-full bg-success flex items-center justify-center mx-auto mb-6 shadow-[0_4px_20px_rgba(46,125,50,0.25)]">
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <path d="M10 18L16 24L26 12" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>

      <h1 class="font-heading text-3xl font-bold text-charcoal mb-2">You're covered</h1>
      <p class="font-body text-[15px] text-text-secondary mb-8 leading-relaxed">
        Your policy is now active. We've sent confirmation and your policy documents to your email address.
      </p>

      <!-- Policy details card -->
      <div class="bg-white rounded-2xl border-2 border-border-light p-[24px_28px] shadow-[0_1px_3px_rgba(0,0,0,0.03)] text-left mb-6">
        <div class="flex justify-between mb-3">
          <span class="font-body text-[13px] text-text-secondary">Policy number</span>
          <span class="font-body text-[13px] font-bold text-charcoal">{{ policyNumber }}</span>
        </div>
        <div class="flex justify-between mb-3">
          <span class="font-body text-[13px] text-text-secondary">Amount paid</span>
          <span class="font-body text-[13px] font-bold text-charcoal">&pound;{{ displayAmount }}</span>
        </div>
        <div class="flex justify-between mb-3">
          <span class="font-body text-[13px] text-text-secondary">Items covered</span>
          <span class="font-body text-[13px] font-bold text-charcoal">{{ items.length }} specified items</span>
        </div>
        <div class="flex justify-between">
          <span class="font-body text-[13px] text-text-secondary">Cover starts</span>
          <span class="font-body text-[13px] font-bold text-charcoal">01/04/2026</span>
        </div>
      </div>

      <!-- Download links -->
      <div class="flex gap-3 justify-center">
        <a href="#" class="flex items-center gap-1.5 font-body text-[13px] font-semibold text-orange no-underline">
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
            <path d="M7 1V9.5M7 9.5L4 6.5M7 9.5L10 6.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M1 10V12C1 12.6 1.4 13 2 13H12C12.6 13 13 12.6 13 12V10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          Download policy
        </a>
        <a href="#" class="flex items-center gap-1.5 font-body text-[13px] font-semibold text-orange no-underline">
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
            <path d="M7 1V9.5M7 9.5L4 6.5M7 9.5L10 6.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M1 10V12C1 12.6 1.4 13 2 13H12C12.6 13 13 12.6 13 12V10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          Download schedule
        </a>
      </div>
    </div>
  </div>

  <!-- ═══ PAYMENT FORM ═══ -->
  <div v-else class="bg-off-white min-h-screen">
    <!-- Top Bar -->
    <TopBar
      :is-annual="isAnnual"
      :display-amount="displayAmount"
      @navigate="$emit('navigate', $event)"
    />

    <!-- Progress Bar -->
    <div class="max-w-[1060px] mx-auto px-5">
      <ProgressBar :current-step="3" @step-click="$emit('navigate', $event)" />
    </div>

    <!-- Page Header -->
    <div class="max-w-[1060px] mx-auto px-5 pb-2">
      <h1 class="font-heading text-[32px] font-bold text-charcoal mb-1">Payment</h1>
      <p class="font-body text-sm text-text-secondary m-0">One last step — enter your payment details to activate your cover.</p>
    </div>

    <!-- ═══ TWO COLUMN LAYOUT ═══ -->
    <div class="max-w-[1060px] mx-auto px-5 pt-4 pb-[60px] flex gap-6 items-start">

      <!-- ═══ LEFT COLUMN ═══ -->
      <div class="flex-1 flex flex-col gap-4">

        <!-- ═══ 1. INITIAL PAYMENT ═══ -->
        <div class="payment-card !border-orange !bg-off-white">
          <div class="flex justify-between items-center mb-4">
            <div>
              <div class="item-label !mb-0.5">Amount due today</div>
              <div class="font-heading text-[32px] font-bold text-charcoal">&pound;{{ displayAmount }}</div>
            </div>
            <div class="py-1.5 px-3.5 bg-white rounded-lg border-[1.5px] border-border-light">
              <div class="font-body text-[10px] font-semibold uppercase tracking-[0.08em] text-text-muted mb-px">Cover starts</div>
              <div class="font-body text-[13px] font-semibold text-charcoal">01 April 2026</div>
            </div>
          </div>
          <div class="font-body text-xs text-text-secondary leading-relaxed">
            <template v-if="isAnnual">
              This is a single annual payment covering 12 months of protection.
            </template>
            <template v-else>
              This is your first monthly instalment. Subsequent payments will be taken automatically by Direct Debit.
            </template>
          </div>
        </div>

        <!-- ═══ 2. ACCOUNT HOLDER ═══ -->
        <div class="payment-card">
          <h2 class="card-title">Account holder</h2>
          <p class="font-body text-[13px] text-text-secondary leading-relaxed mb-4">
            Are you the account holder and can you authorise debits on this account?
          </p>
          <div class="flex gap-2">
            <button
              v-for="opt in ['Yes', 'No']"
              :key="opt"
              class="py-2 px-[22px] rounded-lg font-body text-xs font-semibold cursor-pointer transition-all duration-150"
              :class="
                isAccountHolder === opt
                  ? opt === 'Yes'
                    ? 'border-none bg-orange text-white shadow-[0_2px_8px_rgba(0,0,0,0.1)]'
                    : 'border-none bg-charcoal text-white shadow-[0_2px_8px_rgba(0,0,0,0.1)]'
                  : 'border-[1.5px] border-border bg-white text-text-secondary'
              "
              @click="isAccountHolder = opt"
            >
              {{ opt }}
            </button>
          </div>
          <!-- Account holder error -->
          <div
            v-if="isAccountHolder === 'No'"
            class="mt-4 py-3 px-4 bg-error-light border border-error-mid rounded-[10px] font-body text-xs text-error leading-relaxed animate-[fadeSlideIn_0.2s_ease]"
          >
            You must be the account holder to make a payment. Please contact us if you need to arrange payment from a different account.
          </div>
        </div>

        <!-- ═══ 3. PAYMENT METHOD ═══ -->
        <div v-if="isAccountHolder === 'Yes'" class="payment-card animate-[fadeSlideIn_0.2s_ease]">
          <h2 class="card-title">Payment method</h2>

          <!-- Method tabs -->
          <div class="flex gap-2 mb-6">
            <button
              v-for="m in paymentMethods"
              :key="m.id"
              class="flex-1 py-3 px-4 rounded-[10px] cursor-pointer flex items-center gap-2 transition-all duration-150"
              :class="
                paymentMethod === m.id
                  ? 'border-2 border-orange bg-orange-light'
                  : 'border-[1.5px] border-border bg-white'
              "
              @click="paymentMethod = m.id"
            >
              <span class="text-base">{{ m.icon }}</span>
              <span
                class="font-body text-[13px] text-charcoal"
                :class="paymentMethod === m.id ? 'font-bold' : 'font-medium'"
              >{{ m.label }}</span>
            </button>
          </div>

          <!-- Card form -->
          <div v-if="paymentMethod === 'card'" class="animate-[fadeSlideIn_0.2s_ease]">
            <div class="mb-4">
              <label class="item-label">Cardholder name</label>
              <input
                type="text"
                :value="cardName"
                placeholder="Name as it appears on your card"
                class="item-input"
                @input="cardName = $event.target.value"
              />
            </div>
            <div class="mb-4">
              <label class="item-label">Card number</label>
              <input
                type="text"
                :value="cardNumber"
                placeholder="1234 5678 9012 3456"
                class="item-input"
                inputmode="numeric"
                @input="cardNumber = formatCardNumber($event.target.value)"
              />
            </div>
            <div class="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label class="item-label">Expiry date</label>
                <input
                  type="text"
                  :value="cardExpiry"
                  placeholder="MM / YY"
                  class="item-input"
                  inputmode="numeric"
                  @input="cardExpiry = formatExpiry($event.target.value)"
                />
              </div>
              <div>
                <label class="item-label">Security code (CVC)</label>
                <input
                  type="text"
                  :value="cardCvc"
                  placeholder="123"
                  class="item-input"
                  inputmode="numeric"
                  @input="cardCvc = $event.target.value.replace(/\D/g, '').slice(0, 4)"
                />
              </div>
            </div>
          </div>

          <!-- Bank form -->
          <div v-if="paymentMethod === 'bank'" class="animate-[fadeSlideIn_0.2s_ease]">
            <div class="p-4 bg-off-white rounded-[10px] border border-border-light mb-4">
              <div class="font-body text-[13px] text-text-secondary leading-relaxed">
                Direct debit is available for monthly payments only. You'll be redirected to set up a mandate with your bank after confirming.
              </div>
            </div>
            <div class="mb-4">
              <label class="item-label">Account holder name</label>
              <input
                type="text"
                :value="cardName"
                placeholder="Full name on the account"
                class="item-input"
                @input="cardName = $event.target.value"
              />
            </div>
            <div class="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label class="item-label">Sort code</label>
                <input type="text" placeholder="00-00-00" class="item-input" inputmode="numeric" />
              </div>
              <div>
                <label class="item-label">Account number</label>
                <input type="text" placeholder="12345678" class="item-input" inputmode="numeric" />
              </div>
            </div>
          </div>
        </div>

        <!-- ═══ 4. PAYMENT DATE (monthly only) ═══ -->
        <div v-if="!isAnnual && isAccountHolder === 'Yes'" class="payment-card animate-[fadeSlideIn_0.2s_ease]">
          <h2 class="card-title">Select your payment date</h2>
          <p class="font-body text-[13px] text-text-secondary leading-relaxed mb-4">
            Choose the day of the month your Direct Debit will be collected. Your first payment will be taken today, and the remaining 11 instalments on your chosen date each month.
          </p>

          <select v-model="paymentDate" class="item-select">
            <option value="">Select a date...</option>
            <option v-for="d in 28" :key="d" :value="d">{{ d }}{{ ordinal(d) }} of each month</option>
          </select>

          <!-- Selected date info -->
          <div
            v-if="paymentDate"
            class="mt-3 py-3 px-4 bg-orange-light rounded-[10px] border border-orange-mid animate-[fadeSlideIn_0.15s_ease]"
          >
            <div class="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="3" width="12" height="10" rx="2" stroke="var(--color-orange-dark)" stroke-width="1.3" fill="none" />
                <path d="M1 6H13" stroke="var(--color-orange-dark)" stroke-width="1.3" />
                <path d="M4 1V4M10 1V4" stroke="var(--color-orange-dark)" stroke-width="1.3" stroke-linecap="round" />
              </svg>
              <span class="font-body text-[13px] font-semibold text-charcoal">
                Your first instalment will be collected on <strong>{{ formattedPaymentDate }}</strong>
              </span>
            </div>
          </div>

          <!-- Divider -->
          <div class="h-px bg-border-light my-5"></div>

          <!-- Credit agreement -->
          <div class="p-[14px_16px] bg-off-white rounded-[10px] border border-border-light">
            <div class="font-body text-[11px] font-semibold uppercase tracking-[0.08em] text-text-muted mb-2">Credit agreement</div>
            <p class="font-body text-xs text-text-secondary leading-relaxed mb-2.5">
              By setting up a monthly Direct Debit you are entering into a credit agreement. Your first payment is taken today and the remaining balance is spread over 11 monthly instalments with interest applied at a fixed annual rate.
            </p>
            <p class="font-body text-xs text-text-secondary leading-relaxed m-0">
              Your payments are protected by the <strong class="text-charcoal">Direct Debit Guarantee</strong>. If the amount or date changes, you'll be notified in advance. You can cancel at any time by contacting your bank.
            </p>
          </div>
        </div>

        <!-- ═══ 5. TERMS CONFIRMATION ═══ -->
        <div class="payment-card">
          <label class="flex items-start gap-2.5 cursor-pointer select-none" @click="agreedToTerms = !agreedToTerms">
            <div
              class="w-[22px] h-[22px] rounded-[4px] shrink-0 mt-px flex items-center justify-center transition-all duration-150"
              :class="
                agreedToTerms
                  ? 'border-2 border-success bg-success'
                  : 'border-2 border-charcoal bg-white'
              "
            >
              <svg v-if="agreedToTerms" width="13" height="13" viewBox="0 0 12 12" fill="none">
                <path d="M2.5 6L5 8.5L9.5 3.5" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
            <span class="font-body text-[13px] text-text-primary leading-relaxed">
              I confirm I have read and agree to the
              <a href="#" class="text-orange no-underline font-semibold" @click.stop>policy document</a>,
              <a href="#" class="text-orange no-underline font-semibold" @click.stop>terms of business</a>, and
              <a href="#" class="text-orange no-underline font-semibold" @click.stop>privacy notice</a>.
              I understand that providing inaccurate information may invalidate my policy.
            </span>
          </label>
        </div>

        <!-- ═══ BOTTOM NAVIGATION ═══ -->
        <div class="flex justify-between items-center py-2">
          <!-- Back button -->
          <button
            class="font-body text-[13px] font-semibold text-text-secondary bg-transparent border-[1.5px] border-border rounded-[10px] py-3 px-6 cursor-pointer flex items-center gap-1.5 transition-all duration-150 hover:border-charcoal hover:text-charcoal"
            @click="$emit('navigate', 'review')"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M7.5 2.5L3.5 6L7.5 9.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            Back
          </button>

          <!-- Pay button -->
          <button
            :disabled="isProcessing"
            class="font-body text-[15px] font-bold text-charcoal bg-orange border-none rounded-[10px] py-3.5 px-10 flex items-center gap-2 transition-all duration-150"
            :class="
              canPay && !isProcessing
                ? 'cursor-pointer opacity-100 shadow-[0_4px_16px_rgba(255,170,0,0.3)] hover:bg-orange-dark active:scale-[0.98]'
                : 'cursor-default opacity-50 pointer-events-none'
            "
            @click="handlePay"
          >
            <template v-if="isProcessing">
              <div class="w-4 h-4 border-2 border-charcoal/20 border-t-charcoal rounded-full animate-spin"></div>
              Processing...
            </template>
            <template v-else>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1L2 3.5V6.5C2 9.5 4 12 7 13C10 12 12 9.5 12 6.5V3.5L7 1Z" stroke="currentColor" stroke-width="1.3" fill="none" />
                <path d="M5 7L6.5 8.5L9 5.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              Pay &pound;{{ displayAmount }}
            </template>
          </button>
        </div>

      </div>

      <!-- ═══ RIGHT COLUMN — Sticky Price Sidebar ═══ -->
      <div class="w-[300px] shrink-0 sticky top-[74px] self-start">
        <PriceSidebar
          :is-annual="isAnnual"
          :base-annual="baseAnnual"
          :add-ons-annual="addOnsTotal"
          :total-spec="totalSpec"
          :item-count="items.length"
          :excess="excess"
          :contents-limit="contentsLimit"
          :show-cta="false"
          @update:is-annual="$emit('update:isAnnual', $event)"
        />
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import TopBar from './TopBar.vue'
import ProgressBar from './ProgressBar.vue'
import PriceSidebar from './PriceSidebar.vue'
import { PRICING } from '../data/constants.js'

/* ── Props & Emits ── */
const props = defineProps({
  items: { type: Array, default: () => [] },
  excess: { type: Number, default: 0 },
  contentsLimit: { type: Number, default: 50000 },
  addOnsTotal: { type: Number, default: 0 },
  isAnnual: { type: Boolean, default: true },
})

defineEmits(['navigate', 'update:isAnnual'])

/* ── Local State ── */
const isAccountHolder = ref(null)
const paymentDate = ref('')
const paymentMethod = ref('card')
const cardNumber = ref('')
const cardExpiry = ref('')
const cardCvc = ref('')
const cardName = ref('')
const agreedToTerms = ref(false)
const isProcessing = ref(false)
const isComplete = ref(false)

/* ── Static Data ── */
const paymentMethods = [
  { id: 'card', label: 'Debit / Credit Card', icon: '\uD83D\uDCB3' },
  { id: 'bank', label: 'Direct Debit', icon: '\uD83C\uDFE6' },
]

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

/* ── Computed ── */
const totalSpec = computed(() => props.items.reduce((s, i) => s + (i.value || 0), 0))
const baseAnnual = PRICING.baseAnnual
const totalAnnual = computed(() => baseAnnual + props.addOnsTotal)
const totalMonthly = computed(() => totalAnnual.value / 12)
const displayAmount = computed(() =>
  props.isAnnual ? totalAnnual.value.toFixed(2) : totalMonthly.value.toFixed(2)
)

const policyNumber = computed(() => 'ASR-2026-' + Math.floor(Math.random() * 90000 + 10000))

const cardValid = computed(() => {
  if (paymentMethod.value === 'card') {
    return (
      cardNumber.value.replace(/\s/g, '').length === 16 &&
      cardExpiry.value.replace(/\D/g, '').length === 4 &&
      cardCvc.value.length >= 3 &&
      cardName.value.length > 1
    )
  }
  return cardName.value.length > 1
})

const dateValid = computed(() => props.isAnnual || paymentDate.value !== '')

const canPay = computed(() =>
  isAccountHolder.value === 'Yes' &&
  cardValid.value &&
  dateValid.value &&
  agreedToTerms.value
)

const formattedPaymentDate = computed(() => {
  if (!paymentDate.value) return ''
  const today = new Date()
  const day = parseInt(paymentDate.value)
  let next = new Date(today.getFullYear(), today.getMonth(), day)
  if (next <= today) next = new Date(today.getFullYear(), today.getMonth() + 1, day)
  const suffix = ordinal(day)
  return `${day}${suffix} ${months[next.getMonth()]} ${next.getFullYear()}`
})

/* ── Helpers ── */
function ordinal(d) {
  if (d === 1 || d === 21) return 'st'
  if (d === 2 || d === 22) return 'nd'
  if (d === 3 || d === 23) return 'rd'
  return 'th'
}

function formatCardNumber(v) {
  const digits = v.replace(/\D/g, '').slice(0, 16)
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ')
}

function formatExpiry(v) {
  const digits = v.replace(/\D/g, '').slice(0, 4)
  if (digits.length > 2) return digits.slice(0, 2) + ' / ' + digits.slice(2)
  return digits
}

function handlePay() {
  if (!canPay.value) return
  isProcessing.value = true
  setTimeout(() => {
    isProcessing.value = false
    isComplete.value = true
  }, 2000)
}
</script>

<style scoped>
.payment-card {
  background: var(--color-white, #FFFFFF);
  border-radius: 16px;
  border: 2px solid var(--color-border-light);
  padding: 24px 28px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
  animation: fadeSlideIn 0.3s ease;
  transition: border-color 0.2s ease;
}

.card-title {
  font-family: var(--font-heading);
  font-size: 22px;
  font-weight: 600;
  color: var(--color-charcoal);
  margin: 0 0 20px;
}

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
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
