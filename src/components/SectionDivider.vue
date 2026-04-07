<script setup>
defineProps({
  label: String,
})
</script>

<template>
  <div class="flex items-center gap-3 my-6">
    <div class="flex-1 h-px bg-border-light"></div>
    <span class="font-body text-[10px] font-semibold uppercase tracking-[0.1em] text-text-muted">
      {{ label }}
    </span>
    <div class="flex-1 h-px bg-border-light"></div>
  </div>
</template>
