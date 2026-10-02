<script setup>
import { computed, ref, watch } from 'vue'
import { useSlideContext } from '@slidev/client'
import ibmLogo from '../assets/ibm-logo.png'
import keyVisual from '../assets/summit-key-visual.jpeg'

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
    <img class="closing-visual" :src="keyVisual" alt="" aria-hidden="true" />
    <div class="logo-field">
      <img class="ibm-mark" :src="ibmLogo" alt="IBM" width="440" height="176" />
    </div>
  </section>
</template>

<style scoped>
.ibm-logo-closing-mark {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background: #f4f4f4;
}

.closing-visual {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 52%;
  opacity: .82;
  animation: visual-in 1.25s cubic-bezier(.22, 1, .36, 1) both;
}

.logo-field {
  position: absolute;
  inset: 0;
  z-index: 1;
  display: grid;
  place-items: center;
}

.logo-field::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: 288px;
  transform: translateY(-50%);
  background: linear-gradient(180deg, rgba(255,255,255,0), rgba(255,255,255,.96) 18%, rgba(255,255,255,.96) 82%, rgba(255,255,255,0));
}

.ibm-mark {
  position: relative;
  display: block;
  width: 440px;
  height: auto;
  animation: logo-in 1.1s cubic-bezier(.22, 1, .36, 1) both;
}

.instant .closing-visual,
.instant .ibm-mark { animation: none; }

@keyframes visual-in {
  from { opacity: 0; transform: scale(1.015); }
  to { opacity: .82; transform: scale(1); }
}

@keyframes logo-in {
  from { opacity: 0; transform: scale(.94); }
  to { opacity: 1; transform: scale(1); }
}

@media (prefers-reduced-motion: reduce) {
  .closing-visual,
  .ibm-mark { animation: none; }
}
</style>
