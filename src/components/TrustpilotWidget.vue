<script setup>
import { ref, onMounted } from 'vue'

const widgetRef = ref(null)

onMounted(() => {
  const SRC = '//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js'
  const render = () => {
    if (window.Trustpilot && widgetRef.value) {
      window.Trustpilot.loadFromElement(widgetRef.value, true)
    }
  }
  const existing = document.querySelector(`script[src="${SRC}"]`)
  if (existing) {
    if (window.Trustpilot) render()
    else existing.addEventListener('load', render)
  } else {
    const s = document.createElement('script')
    s.src = SRC
    s.async = true
    s.onload = render
    document.body.appendChild(s)
  }
})
</script>

<template>
  <div
    ref="widgetRef"
    class="trustpilot-widget"
    data-locale="en-US"
    data-template-id="54197383fd9dceac42a68694"
    data-businessunit-id="4f158a610000640005124e75"
    data-style-width="100%"
    data-style-size="S"
    data-token="c9304758-d2dd-46a1-b8db-ad618a024d5f"
    data-text-color="dark"
    data-headline="star"
    data-support-text="word"
    data-background="light"
    data-external-elements-color="dark"
  >
    <a href="https://www.trustpilot.com/review/assetsure.com" target="_blank" rel="noopener">Trustpilot</a>
  </div>
</template>
