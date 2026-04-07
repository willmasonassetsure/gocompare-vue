<script setup>
import { ref } from 'vue'

const optedOut = ref(false)
</script>

<template>
  <div class="py-1">
    <h3 class="font-heading text-xl font-semibold text-charcoal mb-2">
      Let's stay in touch
    </h3>
    <p class="font-body text-[13px] text-text-secondary mb-3.5 leading-relaxed">
      We'll send you a copy of your policy documents by email. From time to time, we may also get in touch about your cover. If you'd rather we only contact you about your policy, tick the box below.
    </p>

    <!-- Checkbox -->
    <label
      class="flex items-start gap-2.5 cursor-pointer select-none"
      @click.prevent="optedOut = !optedOut"
    >
      <div
        class="w-5 h-5 rounded shrink-0 mt-px flex items-center justify-center transition-all duration-150"
        :class="[
          optedOut
            ? 'border-2 border-charcoal bg-charcoal'
            : 'border-[1.5px] border-border bg-white'
        ]"
      >
        <svg
          v-if="optedOut"
          width="12" height="12" viewBox="0 0 12 12" fill="none"
        >
          <path d="M2.5 6L5 8.5L9.5 3.5" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
      <span class="font-body text-[13px] text-text-primary leading-snug">
        Only contact me about my policy &mdash; nothing else.
      </span>
    </label>

    <!-- Privacy notice -->
    <p class="font-body text-xs font-semibold text-orange mt-3.5 mb-1">
      We will always respect your privacy
    </p>
    <p class="font-body text-xs text-text-muted m-0 leading-snug">
      You can visit our <a href="#" class="text-orange no-underline font-medium hover:underline">Privacy Notice</a> to find out more on how we use your information.
    </p>
  </div>
</template>
