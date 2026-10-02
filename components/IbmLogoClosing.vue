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
    <div class="visual-frame" aria-hidden="true">
      <svg viewBox="0 0 1280 720" preserveAspectRatio="none">
        <defs>
          <linearGradient id="closing-gradient-top" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stop-color="#3ddbd9" />
            <stop offset=".46" stop-color="#78a9ff" />
            <stop offset="1" stop-color="#be95ff" />
          </linearGradient>
          <linearGradient id="closing-gradient-bottom" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stop-color="#be95ff" />
            <stop offset=".54" stop-color="#78a9ff" />
            <stop offset="1" stop-color="#3ddbd9" />
          </linearGradient>
        </defs>

        <path
          class="wave-band wave-band-top"
          d="M-110 112 C176 -8 404 224 681 91 S1115 3 1392 133"
          stroke="url(#closing-gradient-top)"
        />
        <g class="wave-lines wave-lines-top">
          <path
            v-for="index in 9"
            :key="`top-line-${index}`"
            d="M-110 112 C176 -8 404 224 681 91 S1115 3 1392 133"
            stroke="url(#closing-gradient-top)"
            pathLength="1"
            :transform="`translate(0 ${(index - 5) * 9})`"
            :style="{ animationDelay: `${180 + index * 55}ms` }"
          />
        </g>

        <path
          class="wave-band wave-band-bottom"
          d="M-116 617 C204 759 421 486 707 621 S1124 743 1392 585"
          stroke="url(#closing-gradient-bottom)"
        />
        <g class="wave-lines wave-lines-bottom">
          <path
            v-for="index in 9"
            :key="`bottom-line-${index}`"
            d="M-116 617 C204 759 421 486 707 621 S1124 743 1392 585"
            stroke="url(#closing-gradient-bottom)"
            pathLength="1"
            :transform="`translate(0 ${(index - 5) * 9})`"
            :style="{ animationDelay: `${360 + index * 55}ms` }"
          />
        </g>
      </svg>
    </div>
    <div class="logo-field">
      <img class="ibm-mark" :src="ibmLogo" alt="IBM" width="220" height="88" />
    </div>
  </section>
</template>

<style scoped>
.ibm-logo-closing-mark {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background:
    radial-gradient(ellipse at 12% 88%, rgba(61,219,217,.2), transparent 34%),
    radial-gradient(ellipse at 88% 12%, rgba(190,149,255,.2), transparent 35%),
    radial-gradient(circle at 50% 50%, rgba(120,169,255,.13), transparent 37%),
    #0043ce;
}

.visual-frame {
  position: absolute;
  inset: 0;
  overflow: hidden;
  animation: field-in 1.45s cubic-bezier(.22, 1, .36, 1) both;
}

.visual-frame svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.wave-band,
.wave-lines path {
  fill: none;
  vector-effect: non-scaling-stroke;
}

.wave-band {
  stroke-width: 76px;
  opacity: .12;
  filter: blur(10px);
  animation: band-in 1.6s ease both;
}

.wave-band-bottom {
  animation-delay: 140ms;
}

.wave-lines path {
  stroke-width: 1.4px;
  stroke-linecap: round;
  opacity: .31;
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  animation: line-draw 1.7s cubic-bezier(.4, 0, .2, 1) both;
}

.wave-lines-bottom path {
  opacity: .27;
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
  width: 430px;
  height: 230px;
  border-radius: 50%;
  background: radial-gradient(ellipse, rgba(120,169,255,.2), transparent 67%);
  filter: blur(8px);
}

.ibm-mark {
  position: relative;
  display: block;
  width: 220px;
  height: auto;
  filter: brightness(0) invert(1) drop-shadow(0 12px 24px rgba(0,29,108,.2));
  animation: logo-in 1.1s cubic-bezier(.22, 1, .36, 1) both;
}

.instant .visual-frame,
.instant .wave-band,
.instant .wave-lines path,
.instant .ibm-mark { animation: none; }

.instant .wave-lines path { stroke-dashoffset: 0; }

@keyframes field-in {
  from { opacity: 0; transform: scale(1.035); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes band-in {
  from { opacity: 0; }
}

@keyframes line-draw {
  to { stroke-dashoffset: 0; }
}

@keyframes logo-in {
  from { opacity: 0; transform: scale(.94); }
  to { opacity: 1; transform: scale(1); }
}

@media (prefers-reduced-motion: reduce) {
  .visual-frame,
  .wave-band,
  .wave-lines path,
  .ibm-mark { animation: none; }

  .wave-lines path { stroke-dashoffset: 0; }
}
</style>
