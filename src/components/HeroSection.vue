<script setup>
import { ref, computed, onMounted } from 'vue'
import { PRICING, POLICY_HOLDER } from '../data/constants.js'

/* ── Reactive state ── */
const priceVisible = ref(false)
const isAnnual = ref(true)

/* ── Static data ── */
const { baseMonthly: monthlyAmount, baseAnnual: annualAmount } = PRICING
const { name, policyRef } = POLICY_HOLDER

/* ── Computed ── */
const displayMain = computed(() => Math.floor(isAnnual.value ? annualAmount : monthlyAmount))
const displayPence = computed(() => {
  const amount = isAnnual.value ? annualAmount : monthlyAmount
  return (amount % 1).toFixed(2).slice(2)
})
const displayPeriod = computed(() => isAnnual.value ? 'per year' : 'per month')
const topBarLabel = computed(() => isAnnual.value ? 'Annual payment' : 'Monthly payment')
const topBarAmount = computed(() => (isAnnual.value ? annualAmount : monthlyAmount).toFixed(2))
const mainFontSize = computed(() => isAnnual.value ? '30px' : '36px')
const penceFontSize = computed(() => isAnnual.value ? '14px' : '18px')

/* ── Steps data ── */
const steps = [
  { n: 1, l: 'Cover Selection', a: true },
  { n: 2, l: 'Summary', a: false },
  { n: 3, l: 'Payment', a: false },
]

/* ── USP data ── */
const usps = [
  {
    title: 'Worldwide all-risks',
    desc: 'Your specified items are covered anywhere in the world. Unlimited trips, 60 days per trip.',
    icon: 'worldwide',
  },
  {
    title: 'Zero excess, zero fees',
    desc: '\u00A30 compulsory excess on all specified items. Need to make changes? Amendments and cancellations are completely free.',
    icon: 'zero',
  },
  {
    title: '30-day money-back guarantee',
    desc: "Changed your mind? Full refund within 30 days \u2014 double the industry standard. No deductions, no questions.",
    icon: 'moneyback',
  },
]

/* ── Lifecycle ── */
onMounted(() => {
  // Trigger price animation
  setTimeout(() => {
    priceVisible.value = true
  }, 400)
})
</script>

<template>
  <!-- Top Bar -->
  <div class="bg-white flex items-center justify-between border-b border-border-light relative z-10 py-3.5 px-8">
    <!-- Logo -->
    <div class="flex items-center gap-0.5">
      <span class="font-body text-text-muted uppercase text-sm font-light tracking-[0.25em]">Asset</span>
      <span class="font-body text-charcoal uppercase text-sm font-bold tracking-[0.25em]">Sure</span>
      <div class="bg-orange rounded-full w-1 h-1 ml-0.5" />
    </div>
    <!-- Payment info -->
    <div class="text-right">
      <div class="font-body text-text-muted uppercase transition-all duration-200 text-[10px] tracking-[0.08em]">{{ topBarLabel }}</div>
      <div class="font-heading text-charcoal transition-all duration-200 text-lg font-bold">£{{ topBarAmount }}</div>
    </div>
  </div>

  <!-- Hero Gradient -->
  <div class="relative overflow-hidden"
       style="background: linear-gradient(135deg, var(--color-orange) 0%, var(--color-orange-dark) 40%, var(--color-orange-grad-end) 100%)">

    <!-- Floating bubbles -->
    <div class="absolute rounded-full"
         style="right: 60px; top: 30px; width: 180px; height: 180px; background: rgba(255,255,255,0.9); animation: floatBubble 6s ease-in-out infinite" />
    <div class="absolute rounded-full"
         style="right: -10px; top: -20px; width: 100px; height: 100px; background: rgba(255,255,255,0.7); animation: floatBubble 8s ease-in-out infinite 1s" />
    <div class="absolute rounded-full"
         style="right: 200px; top: -30px; width: 60px; height: 60px; background: rgba(255,255,255,0.5); animation: floatBubble 7s ease-in-out infinite 0.5s" />
    <div class="absolute rounded-full"
         style="right: 30px; top: 160px; width: 40px; height: 40px; background: rgba(255,255,255,0.4); animation: floatBubble 5s ease-in-out infinite 2s" />

    <!-- Canvas noise texture overlay (grid) -->
    <div class="absolute inset-0 pointer-events-none"
         :style="{
           backgroundImage: [
             'linear-gradient(rgba(255,255,255,0.072) 1px, transparent 1px)',
             'linear-gradient(90deg, rgba(255,255,255,0.072) 1px, transparent 1px)',
             'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
             'linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
           ].join(', '),
           backgroundSize: '60px 60px, 60px 60px, 12px 12px, 12px 12px',
         }" />

    <!-- Radial light wash — top left warmth -->
    <div class="absolute pointer-events-none"
         style="left: -15%; top: -20%; width: 60%; height: 80%; background: radial-gradient(ellipse at center, rgba(255,255,255,0.12) 0%, transparent 70%)" />
    <!-- Radial light wash — bottom right depth -->
    <div class="absolute pointer-events-none"
         style="right: -10%; bottom: -10%; width: 50%; height: 60%; background: radial-gradient(ellipse at center, rgba(0,0,0,0.08) 0%, transparent 70%)" />

    <div class="relative z-[2] max-w-[780px] mx-auto px-5">

      <!-- Progress Stepper -->
      <div class="flex items-center justify-center pt-7 pb-8">
        <template v-for="(s, i) in steps" :key="i">
          <!-- Connector line -->
          <div v-if="i > 0"
               class="rounded-sm mx-2"
               :style="{
                 width: '80px',
                 height: '2px',
                 background: s.a ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.25)',
               }" />
          <!-- Step -->
          <div class="flex flex-col items-center gap-1.5">
            <div class="flex items-center justify-center rounded-full font-body w-8 h-8 text-[13px] font-bold"
                 :style="{
                   background: s.a ? 'var(--color-off-white)' : 'rgba(255,255,255,0.2)',
                   border: s.a ? 'none' : '1.5px solid rgba(255,255,255,0.4)',
                   color: s.a ? 'var(--color-orange)' : 'rgba(255,255,255,0.7)',
                   boxShadow: s.a ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
                 }">{{ s.n }}</div>
            <span class="font-body text-[11px]"
                  :style="{
                    fontWeight: s.a ? 600 : 400,
                    color: s.a ? '#FFFFFF' : 'rgba(255,255,255,0.6)',
                  }">{{ s.l }}</span>
          </div>
        </template>
      </div>

      <!-- Split layout — content left, illustration right -->
      <div class="flex items-center pb-[60px]" style="animation: fadeUp 0.6s ease 0.1s both">

        <!-- Left — text + price -->
        <div class="flex-1 relative">
          <!-- Soft blur behind text -->
          <div class="absolute pointer-events-none z-0"
               style="left: -40px; top: -20px; right: -20px; bottom: -20px; background: radial-gradient(ellipse at 30% 40%, rgba(230,153,0,0.7) 0%, transparent 70%); filter: blur(30px)" />

          <div class="font-heading relative z-[1] text-lg font-normal italic mb-1"
               style="color: rgba(255,255,255,0.85)">
            Hi {{ name }},
          </div>
          <h1 class="font-heading text-white relative z-[1] text-4xl font-bold mb-6 leading-[1.15] m-0">
            Your specialist<br/>contents policy
          </h1>

          <!-- Price Circle -->
          <div class="flex flex-col items-center justify-center rounded-full bg-white w-[110px] h-[110px]"
               :style="{
                 boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                 animation: priceVisible ? 'scaleIn 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.3s both, pricePulse 3s ease-in-out 1.5s infinite' : 'none',
                 transition: 'transform 0.2s ease',
               }">
            <div class="font-body text-text-muted uppercase text-[9px] font-semibold tracking-[0.1em] mb-0.5">From</div>
            <div class="flex items-start transition-all duration-[250ms]">
              <span class="font-heading text-charcoal" :style="{ fontSize: mainFontSize, fontWeight: 700, lineHeight: 1, transition: 'font-size 0.25s ease' }">£{{ displayMain }}</span>
              <span class="font-heading text-charcoal" :style="{ fontSize: penceFontSize, fontWeight: 600, lineHeight: 1, marginTop: '2px', transition: 'font-size 0.25s ease' }">.{{ displayPence }}</span>
            </div>
            <div class="font-body text-text-secondary transition-all duration-200 text-[10px] font-medium">{{ displayPeriod }}</div>
          </div>

          <!-- Payment Toggle -->
          <div class="flex mt-4 w-fit rounded-3xl p-[3px]"
               style="animation: fadeUp 0.6s ease 0.5s both; background: rgba(255,255,255,0.15)">
            <button
              @click="isAnnual = false"
              @mousedown="$event.currentTarget.style.transform = 'scale(0.96)'"
              @mouseup="$event.currentTarget.style.transform = 'scale(1)'"
              @mouseleave="$event.currentTarget.style.transform = 'scale(1)'"
              class="font-body border-none cursor-pointer transition-all duration-200 text-xs rounded-[20px] py-[7px] px-[18px]"
              :style="{
                fontWeight: !isAnnual ? 700 : 500,
                color: !isAnnual ? 'var(--color-charcoal)' : 'rgba(255,255,255,0.8)',
                background: !isAnnual ? '#FFFFFF' : 'transparent',
                boxShadow: !isAnnual ? '0 2px 6px rgba(0,0,0,0.1)' : 'none',
              }">
              £{{ monthlyAmount.toFixed(2) }} / mo
            </button>
            <button
              @click="isAnnual = true"
              @mousedown="$event.currentTarget.style.transform = 'scale(0.96)'"
              @mouseup="$event.currentTarget.style.transform = 'scale(1)'"
              @mouseleave="$event.currentTarget.style.transform = 'scale(1)'"
              class="font-body border-none cursor-pointer transition-all duration-200 text-xs rounded-[20px] py-[7px] px-[18px]"
              :style="{
                fontWeight: isAnnual ? 700 : 500,
                color: isAnnual ? 'var(--color-charcoal)' : 'rgba(255,255,255,0.8)',
                background: isAnnual ? '#FFFFFF' : 'transparent',
                boxShadow: isAnnual ? '0 2px 6px rgba(0,0,0,0.1)' : 'none',
              }">
              £{{ annualAmount.toFixed(2) }} / yr
            </button>
          </div>

          <!-- Ref Badge -->
          <div class="inline-flex items-center font-body relative z-[1] gap-1.5 text-[11px] mt-3 py-1 px-2.5 rounded-md tracking-[0.03em]"
               style="color: rgba(255,255,255,0.75); background: rgba(255,255,255,0.1); backdrop-filter: blur(4px)">
            <span class="font-bold text-white">Ref:</span> {{ policyRef }}
          </div>
        </div>

        <!-- Right — illustration bubble -->
        <div class="flex items-center justify-center shrink-0 relative">
          <!-- Soft blur behind illustration -->
          <div class="absolute pointer-events-none z-0"
               style="inset: -40px; background: radial-gradient(circle at center, rgba(230,153,0,0.6) 0%, transparent 65%); filter: blur(40px)" />
          <div class="rounded-full bg-white relative z-[1] flex items-center justify-center overflow-hidden w-[350px] h-[350px]"
               style="box-shadow: 0 8px 40px rgba(0,0,0,0.08)">
            <!-- Illustration placeholder -->
            <div class="flex flex-col items-center justify-center text-text-muted">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <span class="font-body mt-2 text-[11px]">Home contents</span>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Curve to dark -->
    <div class="relative -mt-px">
      <svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none" class="block w-full h-[80px]">
        <path d="M0 80V60C200 30 400 30 720 50C1040 70 1240 40 1440 30V80H0Z" fill="var(--color-charcoal)" />
      </svg>
    </div>
  </div>

  <!-- Dark USP Section -->
  <div class="bg-charcoal pb-0 -mt-px">
    <div class="max-w-[780px] mx-auto px-5">

      <!-- Heading -->
      <h2 class="font-heading text-white text-center text-[26px] font-semibold m-0 mb-5 italic"
          style="animation: fadeUp 0.6s ease 0.6s both">
        Great cover you can trust
      </h2>

      <!-- Trustpilot Widget -->
      <div class="flex items-center flex-wrap justify-center gap-2 mb-8" style="animation: fadeUp 0.6s ease 0.7s both">
        <span class="font-body text-white text-xs font-bold">Excellent</span>
        <div class="flex gap-0.5">
          <div v-for="i in 5" :key="i"
               class="flex items-center justify-center w-5 h-5 rounded-sm"
               :style="{
                 background: i <= 4 ? '#00B67A' : '#73CF11',
               }">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1L7.5 4.5L11 5L8.5 7.5L9 11L6 9.5L3 11L3.5 7.5L1 5L4.5 4.5L6 1Z" fill="#fff" />
            </svg>
          </div>
        </div>
        <span class="font-body text-[11px]" style="color: rgba(255,255,255,0.6)">4.9/5 from 3,600+ reviews on</span>
        <span class="font-body text-white text-xs font-bold">Trustpilot</span>
      </div>

      <!-- USP Cards Grid -->
      <div class="grid gap-4 grid-cols-3 pb-10">
        <div v-for="(u, i) in usps" :key="i"
             class="flex flex-col items-center text-center cursor-default transition-all duration-200 pt-7 px-4 pb-6 rounded-2xl"
             style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.06)"
             :style="{ animation: `fadeUp 0.5s ease ${0.8 + i * 0.12}s both` }"
             @mouseenter="$event.currentTarget.style.background = 'rgba(255,255,255,0.07)'; $event.currentTarget.style.borderColor = 'rgba(255,170,0,0.15)'"
             @mouseleave="$event.currentTarget.style.background = 'rgba(255,255,255,0.04)'; $event.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'">

          <!-- Icon SVGs -->
          <div class="mb-4">
            <!-- Worldwide -->
            <svg v-if="u.icon === 'worldwide'" width="80" height="80" viewBox="0 0 80 80" fill="none">
              <circle cx="40" cy="38" r="24" stroke="var(--color-orange-mid)" stroke-width="1.5" fill="none" opacity="0.3" />
              <circle cx="40" cy="38" r="24" stroke="#FFFFFF" stroke-width="1.5" fill="none" stroke-dasharray="4 3" />
              <ellipse cx="40" cy="38" rx="12" ry="24" stroke="#FFFFFF" stroke-width="1.2" fill="none" opacity="0.7" />
              <line x1="16" y1="38" x2="64" y2="38" stroke="#FFFFFF" stroke-width="1" opacity="0.5" />
              <line x1="16" y1="28" x2="64" y2="28" stroke="#FFFFFF" stroke-width="0.8" opacity="0.3" />
              <line x1="16" y1="48" x2="64" y2="48" stroke="#FFFFFF" stroke-width="0.8" opacity="0.3" />
              <path d="M40 20L28 26V38C28 48 33 54 40 58C47 54 52 48 52 38V26L40 20Z" fill="var(--color-orange)" fill-opacity="0.2" stroke="var(--color-orange)" stroke-width="1.5" />
              <path d="M35 38L38 41L45 34" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <circle cx="56" cy="26" r="4" fill="var(--color-orange)" /><circle cx="56" cy="26" r="2" fill="#FFFFFF" />
              <text x="40" y="74" text-anchor="middle" fill="#FFFFFF" opacity="0.5" font-size="8" font-family="var(--font-body)" font-weight="500">WORLDWIDE</text>
            </svg>

            <!-- Zero Excess -->
            <svg v-if="u.icon === 'zero'" width="80" height="80" viewBox="0 0 80 80" fill="none">
              <path d="M40 8L20 17V35C20 50 28.5 60 40 66C51.5 60 60 50 60 35V17L40 8Z" fill="none" stroke="#FFFFFF" stroke-width="1.5" opacity="0.3" />
              <path d="M40 12L24 20V35C24 48 30.5 56.5 40 62C49.5 56.5 56 48 56 35V20L40 12Z" fill="var(--color-orange)" fill-opacity="0.15" stroke="var(--color-orange)" stroke-width="1.5" />
              <text x="40" y="42" text-anchor="middle" fill="#FFFFFF" font-size="24" font-family="var(--font-heading)" font-weight="700">£0</text>
              <circle cx="22" cy="14" r="1.5" fill="var(--color-orange-mid)" opacity="0.6" />
              <circle cx="58" cy="12" r="1" fill="var(--color-orange-mid)" opacity="0.4" />
              <circle cx="62" cy="28" r="1.5" fill="var(--color-orange-mid)" opacity="0.5" />
              <text x="40" y="74" text-anchor="middle" fill="#FFFFFF" opacity="0.5" font-size="8" font-family="var(--font-body)" font-weight="500">ZERO HIDDEN COSTS</text>
            </svg>

            <!-- Money Back -->
            <svg v-if="u.icon === 'moneyback'" width="80" height="80" viewBox="0 0 80 80" fill="none">
              <rect x="20" y="16" width="40" height="44" rx="4" fill="none" stroke="#FFFFFF" stroke-width="1.5" opacity="0.3" />
              <rect x="20" y="16" width="40" height="12" rx="4" fill="var(--color-orange)" fill-opacity="0.2" stroke="var(--color-orange)" stroke-width="1.2" />
              <text x="40" y="25" text-anchor="middle" fill="#FFFFFF" font-size="8" font-family="var(--font-body)" font-weight="700">30 DAYS</text>
              <line x1="30" y1="13" x2="30" y2="19" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" opacity="0.5" />
              <line x1="50" y1="13" x2="50" y2="19" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" opacity="0.5" />
              <circle cx="40" cy="42" r="10" fill="var(--color-orange)" fill-opacity="0.15" stroke="var(--color-orange)" stroke-width="1.2" />
              <path d="M35 42L38.5 45.5L45 38.5" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <circle cx="24" cy="52" r="1.5" fill="var(--color-orange-mid)" opacity="0.4" />
              <circle cx="58" cy="22" r="1" fill="var(--color-orange-mid)" opacity="0.5" />
              <text x="40" y="74" text-anchor="middle" fill="#FFFFFF" opacity="0.5" font-size="8" font-family="var(--font-body)" font-weight="500">FULL REFUND</text>
            </svg>
          </div>

          <h3 class="font-body text-white text-sm font-bold m-0 mb-2">{{ u.title }}</h3>
          <p class="font-body text-xs m-0 leading-relaxed max-w-[200px]" style="color: rgba(255,255,255,0.5)">{{ u.desc }}</p>
        </div>
      </div>
    </div>

    <!-- Curve to content -->
    <svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none" class="block w-full h-[80px]">
      <path d="M0 0V30C200 70 400 70 720 50C1040 30 1240 60 1440 60V0H0Z" fill="var(--color-charcoal)" />
      <path d="M0 30C200 70 400 70 720 50C1040 30 1240 60 1440 60V80H0V30Z" fill="var(--color-off-white)" />
    </svg>
  </div>
</template>
