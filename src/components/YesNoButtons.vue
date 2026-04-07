<template>
  <div class="flex gap-2">
    <button
      v-for="o in ['Yes', 'No']"
      :key="o"
      class="py-2 px-6 rounded-lg font-body text-xs font-semibold cursor-pointer transition-all duration-150 leading-none"
      :class="buttonClass(o)"
      @click="$emit('change', o)"
    >
      {{ o }}
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  value: String,
})

defineEmits(['change'])

function buttonClass(o) {
  const active = props.value === o
  if (active) {
    return o === 'Yes'
      ? 'border-none bg-orange text-white shadow-[0_2px_8px_rgba(0,0,0,0.1)]'
      : 'border-none bg-charcoal text-white shadow-[0_2px_8px_rgba(0,0,0,0.1)]'
  }
  return 'border-[1.5px] border-border bg-white text-text-secondary'
}
</script>
