<template>
  <span
    ref="iconRef"
    style="position: relative; display: inline-flex; margin-left: 5px; vertical-align: middle"
    @mouseenter="open"
    @mouseleave="close"
  >
    <span
      style="width: 16px; height: 16px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.15s ease"
      :style="{
        background: show ? 'var(--color-orange)' : 'var(--color-border-light)',
      }"
      @click="show = !show"
    >
      <span
        style="font-family: var(--font-body); font-size: 9px; font-weight: 700; line-height: 1"
        :style="{
          color: show ? '#FFFFFF' : 'var(--color-text-muted)',
        }"
      >i</span>
    </span>

    <Teleport to="body">
      <div
        v-if="show"
        ref="tipRef"
        style="position: fixed; top: -9999px; left: -9999px; font-family: var(--font-body); font-size: 11px; line-height: 1.45; padding: 10px 14px; border-radius: 10px; width: 280px; z-index: 99999; box-shadow: 0 8px 24px rgba(0,0,0,0.15); pointer-events: auto; white-space: pre-line; background: var(--color-charcoal); color: #FFFFFF"
        @mouseenter="open"
        @mouseleave="close"
      >
        {{ text }}
      </div>
    </Teleport>
  </span>
</template>

<script setup>
import { ref, watch, nextTick, onUnmounted } from 'vue'

const props = defineProps({
  text: { type: String, required: true },
})

const show = ref(false)
const iconRef = ref(null)
const tipRef = ref(null)
let hideTimer = null

function open() {
  clearTimeout(hideTimer)
  show.value = true
}

function close() {
  hideTimer = setTimeout(() => {
    show.value = false
  }, 150)
}

function reposition() {
  if (!iconRef.value || !tipRef.value) return
  const r = iconRef.value.getBoundingClientRect()
  const tip = tipRef.value
  const vw = window.innerWidth
  const tipW = Math.min(280, vw - 24)
  tip.style.width = tipW + 'px'
  let left = r.left + r.width / 2 - tipW / 2
  if (left < 12) left = 12
  if (left + tipW > vw - 12) left = vw - tipW - 12
  const tipH = tip.offsetHeight
  let top = r.top - tipH - 6
  if (top < 12) top = r.bottom + 6
  tip.style.top = top + 'px'
  tip.style.left = left + 'px'
}

watch(show, (val) => {
  if (val) {
    nextTick(() => {
      reposition()
      window.addEventListener('scroll', reposition, true)
      window.addEventListener('resize', reposition)
    })
  } else {
    window.removeEventListener('scroll', reposition, true)
    window.removeEventListener('resize', reposition)
  }
})

onUnmounted(() => {
  clearTimeout(hideTimer)
  window.removeEventListener('scroll', reposition, true)
  window.removeEventListener('resize', reposition)
})
</script>
