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
      <span class="ambient ambient-cyan"></span>
      <span class="ambient ambient-violet"></span>
      <span class="orbit orbit-outer"></span>
      <span class="orbit orbit-inner"></span>
      <div class="slat-wave wave-left">
        <i v-for="index in 15" :key="`left-${index}`" :style="{ '--i': index - 1 }"></i>
      </div>
      <div class="slat-wave wave-right">
        <i v-for="index in 15" :key="`right-${index}`" :style="{ '--i': index - 1 }"></i>
      </div>
    </div>
    <div class="logo-field">
      <img class="ibm-mark" :src="ibmLogo" alt="IBM" width="250" height="100" />
    </div>
  </section>
</template>

<style scoped>
.ibm-logo-closing-mark {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background:
    radial-gradient(circle at 50% 50%, rgba(69,137,255,.18) 0 12%, transparent 42%),
    #0043ce;
}

.visual-frame {
  position: absolute;
  inset: 0;
  overflow: hidden;
  animation: field-in 1.45s cubic-bezier(.22, 1, .36, 1) both;
}

.ambient {
  position: absolute;
  width: 650px;
  height: 650px;
  border-radius: 50%;
  filter: blur(12px);
}

.ambient-cyan {
  left: -330px;
  bottom: -350px;
  background: radial-gradient(circle, rgba(61,219,217,.72), rgba(15,98,254,.12) 52%, transparent 70%);
}

.ambient-violet {
  right: -315px;
  top: -360px;
  background: radial-gradient(circle, rgba(190,149,255,.76), rgba(105,41,196,.15) 52%, transparent 70%);
}

.orbit {
  position: absolute;
  left: 50%;
  top: 50%;
  border: 1px solid rgba(255,255,255,.14);
  border-radius: 50%;
  transform: translate(-50%, -50%) rotate(-12deg);
}

.orbit-outer {
  width: 1030px;
  height: 410px;
}

.orbit-inner {
  width: 770px;
  height: 272px;
  border-color: rgba(166,200,255,.22);
  transform: translate(-50%, -50%) rotate(10deg);
}

.slat-wave {
  position: absolute;
  width: 420px;
  height: 430px;
  filter: drop-shadow(0 18px 18px rgba(0,29,108,.26));
}

.slat-wave i {
  --i: 0;
  position: absolute;
  display: block;
  width: 340px;
  height: 32px;
  border-radius: 999px;
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.78),
    inset 0 -7px 12px rgba(0,45,156,.18),
    0 7px 8px rgba(0,29,108,.14);
}

.wave-left {
  left: -122px;
  bottom: -52px;
  transform: rotate(-8deg);
}

.wave-left i {
  left: calc(var(--i) * 10px);
  top: calc(var(--i) * 24px);
  transform: rotate(calc(-34deg + var(--i) * 2.7deg));
  background: linear-gradient(100deg, rgba(211,255,255,.96), rgba(61,219,217,.88) 36%, rgba(120,169,255,.72) 72%, rgba(255,255,255,.2));
}

.wave-right {
  right: -116px;
  top: -62px;
  transform: rotate(172deg);
}

.wave-right i {
  left: calc(var(--i) * 10px);
  top: calc(var(--i) * 24px);
  transform: rotate(calc(-34deg + var(--i) * 2.7deg));
  background: linear-gradient(100deg, rgba(255,255,255,.96), rgba(190,149,255,.9) 40%, rgba(138,63,252,.7) 74%, rgba(255,255,255,.16));
}

.logo-field {
  position: absolute;
  inset: 0;
  z-index: 1;
  display: grid;
  place-items: center;
}

.logo-field::before,
.logo-field::after {
  content: '';
  position: absolute;
  width: 420px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.25), transparent);
}

.logo-field::before {
  top: calc(50% - 98px);
}

.logo-field::after {
  bottom: calc(50% - 98px);
}

.ibm-mark {
  position: relative;
  display: block;
  width: 250px;
  height: auto;
  filter: brightness(0) invert(1) drop-shadow(0 12px 24px rgba(0,29,108,.2));
  animation: logo-in 1.1s cubic-bezier(.22, 1, .36, 1) both;
}

.instant .visual-frame,
.instant .ibm-mark { animation: none; }

@keyframes field-in {
  from { opacity: 0; transform: scale(1.035); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes logo-in {
  from { opacity: 0; transform: scale(.94); }
  to { opacity: 1; transform: scale(1); }
}

@media (prefers-reduced-motion: reduce) {
  .visual-frame,
  .ibm-mark { animation: none; }
}
</style>
