<script setup>
import { computed, ref, watch } from 'vue'
import { useSlideContext } from '@slidev/client'
import ibmLogo from '../assets/ibm-logo.png'

const { $page, $nav, $renderContext } = useSlideContext()
const active = computed(() => $page.value === $nav.value.currentSlideNo)
const replay = ref(0)

watch(active, value => {
  if (value) replay.value++
})
</script>

<template>
  <section
    :key="replay"
    class="ibm-logo-closing-mark"
    :class="{ instant: !active || $renderContext === 'print' }"
    aria-label="IBM"
  >
    <img :src="ibmLogo" alt="IBM" />
  </section>
</template>

<style scoped>
.ibm-logo-closing-mark {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  background: #fff;
}

img {
  display: block;
  width: 620px;
  height: auto;
  animation: logo-in 1.1s cubic-bezier(.22, 1, .36, 1) both;
}

.instant img { animation: none; }

@keyframes logo-in {
  from { opacity: 0; transform: scale(.94); }
  to { opacity: 1; transform: scale(1); }
}

@media (prefers-reduced-motion: reduce) {
  img { animation: none; }
}
</style>
