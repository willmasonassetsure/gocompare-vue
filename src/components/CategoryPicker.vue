<script setup>
import { ref } from 'vue'
import { CATEGORY_OPTIONS } from '../data/constants.js'

const emit = defineEmits(['select', 'cancel'])

const hoveredKey = ref(null)
</script>

<template>
  <div class="animate-[fadeSlideIn_0.3s_ease]">
    <!-- Header row -->
    <div class="font-body text-xs font-semibold text-text-primary mb-3 flex items-center justify-between">
      <span>What type of item would you like to add?</span>
      <button
        @click="emit('cancel')"
        class="bg-transparent border-none cursor-pointer font-body text-[11px] text-text-muted py-1 px-2 rounded-md hover:text-text-secondary hover:bg-off-white transition-all duration-150"
      >
        Cancel
      </button>
    </div>

    <!-- 3-column grid -->
    <div class="grid grid-cols-3 gap-2">
      <button
        v-for="cat in CATEGORY_OPTIONS"
        :key="cat.key"
        @click="emit('select', cat)"
        @mouseenter="hoveredKey = cat.key"
        @mouseleave="hoveredKey = null"
        class="flex flex-col items-center gap-1.5 py-4 px-2.5 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.96]"
        :class="[
          hoveredKey === cat.key
            ? 'bg-orange-light border-2 border-orange'
            : 'bg-white border-[1.5px] border-border-light'
        ]"
      >
        <span class="text-2xl leading-none">{{ cat.icon }}</span>
        <span
          class="font-body text-xs font-semibold"
          :class="hoveredKey === cat.key ? 'text-charcoal' : 'text-text-secondary'"
        >
          {{ cat.label }}
        </span>
      </button>
    </div>
  </div>
</template>
