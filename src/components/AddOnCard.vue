<script setup>
import { ref } from 'vue'

const props = defineProps({
  addon: { type: Object, required: true },
  isSelected: { type: Boolean, default: false }
})

const emit = defineEmits(['toggle'])

const showDetails = ref(false)
</script>

<template>
  <div
    class="bg-white rounded-2xl transition-all duration-200"
    :class="[
      isSelected
        ? 'border-2 border-orange shadow-[0_4px_16px_rgba(255,170,0,0.1)]'
        : 'border-[1.5px] border-border-light hover:border-border hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)]'
    ]"
    style="padding: 16px 18px"
  >
    <!-- Main row -->
    <div class="flex items-center gap-3.5">
      <!-- Toggle switch -->
      <div
        @click="emit('toggle')"
        class="w-11 h-6 rounded-xl cursor-pointer relative shrink-0 transition-colors duration-200 active:scale-95"
        :class="isSelected ? 'bg-orange' : 'bg-border-light'"
      >
        <div
          class="w-[18px] h-[18px] rounded-full bg-white absolute top-[3px] shadow-[0_1px_3px_rgba(0,0,0,0.15)]"
          :style="{ left: isSelected ? '23px' : '3px', transition: 'left 0.2s cubic-bezier(0.34,1.56,0.64,1)' }"
        />
      </div>

      <!-- Content -->
      <div class="flex-1">
        <div class="font-body text-sm font-semibold text-text-primary">{{ addon.title }}</div>
        <div class="font-body text-xs text-text-secondary leading-snug mt-0.5">{{ addon.summary }}</div>
      </div>

      <!-- Price -->
      <div class="text-right shrink-0">
        <div
          class="font-heading text-lg font-bold transition-colors duration-200"
          :class="isSelected ? 'text-orange' : 'text-charcoal'"
        >
          +&pound;{{ addon.price.toFixed(2) }}
        </div>
        <div class="font-body text-[10px] text-text-muted">per {{ addon.period }}</div>
      </div>
    </div>

    <!-- Expandable details -->
    <div class="mt-2.5 pt-2.5 border-t border-border-light">
      <button
        @click="showDetails = !showDetails"
        class="bg-transparent border-none cursor-pointer p-0 font-body text-xs font-medium text-orange hover:text-orange-dark flex items-center gap-1 transition-colors duration-150"
      >
        {{ showDetails ? 'Hide details' : 'See details' }}
        <svg
          width="10" height="10" viewBox="0 0 10 10" fill="none"
          :style="{ transform: showDetails ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }"
        >
          <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>

      <div
        class="overflow-hidden transition-[max-height] duration-300"
        :style="{ maxHeight: showDetails ? '200px' : '0px' }"
      >
        <div class="pt-2.5 flex flex-col gap-1.5">
          <div
            v-for="(d, i) in addon.details"
            :key="i"
            class="flex items-center gap-2"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2.5 6L5 8.5L9.5 3.5" stroke="var(--color-success)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <span class="font-body text-xs text-text-secondary">{{ d }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
