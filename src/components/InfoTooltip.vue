<script setup>
import { ref, watch, nextTick, onBeforeUnmount } from 'vue'

const props = defineProps({
  text: { type: String, required: true }
})

const show = ref(false)
const iconRef = ref(null)
const tipRef = ref(null)
let hideTimer = null

function open() {
  clearTimeout(hideTimer)
  show.value = true
  nextTick(reposition)
}

function close() {
  hideTimer = setTimeout(() => { show.value = false }, 150)
}

function toggle() {
  show.value ? close() : open()
}

function reposition() {
  if (!iconRef.value || !tipRef.value) return
  const r = iconRef.value.getBoundingClientRect()
  const tip = tipRef.value
  const vw = window.innerWidth
  const tipW = Math.min(240, vw - 24)
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

let scrollHandler = null
let resizeHandler = null

watch(show, (val) => {
  if (val) {
    scrollHandler = () => reposition()
    resizeHandler = () => reposition()
    window.addEventListener('scroll', scrollHandler, true)
    window.addEventListener('resize', resizeHandler)
  } else {
    if (scrollHandler) window.removeEventListener('scroll', scrollHandler, true)
    if (resizeHandler) window.removeEventListener('resize', resizeHandler)
  }
})

onBeforeUnmount(() => {
  clearTimeout(hideTimer)
  if (scrollHandler) window.removeEventListener('scroll', scrollHandler, true)
  if (resizeHandler) window.removeEventListener('resize', resizeHandler)
})
</script>

<template>
  <div
    ref="iconRef"
    class="relative inline-flex"
    @mouseenter="open"
    @mouseleave="close"
  >
    <div
      @click="toggle"
      class="w-[18px] h-[18px] rounded-full flex items-center justify-center bg-border-light cursor-pointer transition-all duration-150 shrink-0"
      :class="show ? 'border-[1.5px] border-orange' : 'border-[1.5px] border-transparent'"
    >
      <span class="font-body text-[10px] font-bold text-text-muted leading-none">i</span>
    </div>

    <Teleport to="body">
      <div
        v-if="show"
        ref="tipRef"
        class="fixed z-[99999] bg-charcoal text-white font-body text-xs leading-[1.45] rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.15)] pointer-events-auto whitespace-pre-line"
        style="top: -9999px; left: -9999px; padding: 10px 14px; width: 240px"
        @mouseenter="open"
        @mouseleave="close"
      >
        {{ text }}
      </div>
    </Teleport>
  </div>
</template>
