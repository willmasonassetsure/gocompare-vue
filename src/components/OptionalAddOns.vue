<script setup>
import { ref, computed, watch } from 'vue'
import { ADD_ONS } from '../data/constants.js'
import AddOnCard from './AddOnCard.vue'

const emit = defineEmits(['total-change'])

const selected = ref({})

function toggle(id) {
  selected.value = { ...selected.value, [id]: !selected.value[id] }
}

const totalExtra = computed(() =>
  ADD_ONS.filter(a => selected.value[a.id]).reduce((s, a) => s + a.price, 0)
)

const selectedCount = computed(() =>
  ADD_ONS.filter(a => selected.value[a.id]).length
)

watch(totalExtra, (val) => {
  emit('total-change', val)
})
</script>

<template>
  <div>
    <!-- Header -->
    <div class="flex items-end justify-between mb-6">
      <div>
        <h2 class="font-heading text-[26px] font-semibold text-charcoal mb-2">
          Coverage enhancements
        </h2>
        <p class="font-body text-[13px] text-text-secondary m-0 leading-relaxed">
          Strengthen your policy with additional cover. None of these are required &mdash; your policy is fully functional without them.
        </p>
      </div>
      <div
        v-if="selectedCount > 0"
        class="font-body text-xs font-semibold text-orange bg-orange-light py-1.5 px-3 rounded-[20px] border border-orange-mid whitespace-nowrap animate-[fadeSlideIn_0.2s_ease]"
      >
        +&pound;{{ totalExtra.toFixed(2) }} / yr added
      </div>
    </div>

    <!-- Add-on cards -->
    <div class="flex flex-col gap-2.5">
      <AddOnCard
        v-for="addon in ADD_ONS"
        :key="addon.id"
        :addon="addon"
        :is-selected="!!selected[addon.id]"
        @toggle="toggle(addon.id)"
      />
    </div>
  </div>
</template>
