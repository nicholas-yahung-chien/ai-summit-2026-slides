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
    <div class="abstract-field" aria-hidden="true">
      <span class="fold fold-teal"></span>
      <span class="fold fold-blue"></span>
      <span class="fold fold-violet"></span>
      <span class="fold fold-lilac"></span>
    </div>
    <div class="logo-field">
      <img class="ibm-mark" :src="ibmLogo" alt="IBM" width="340" height="136" />
    </div>
  </section>
</template>

<style scoped>
.ibm-logo-closing-mark {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background:
    radial-gradient(circle at 50% 50%, #ffffff 0 22%, rgba(255,255,255,.96) 40%, rgba(244,244,244,.9) 72%),
    #f4f4f4;
}

.abstract-field {
  position: absolute;
  inset: 0;
  animation: field-in 1.35s cubic-bezier(.22, 1, .36, 1) both;
}

.abstract-field::before,
.abstract-field::after {
  content: '';
  position: absolute;
  width: 430px;
  height: 430px;
  border-radius: 50%;
  opacity: .36;
  background: repeating-conic-gradient(from 18deg, rgba(15,98,254,.5) 0 2.5deg, transparent 2.5deg 7deg);
  -webkit-mask: radial-gradient(circle, transparent 0 38%, #000 39% 62%, transparent 63%);
  mask: radial-gradient(circle, transparent 0 38%, #000 39% 62%, transparent 63%);
}

.abstract-field::before {
  left: -158px;
  bottom: -184px;
  transform: rotate(20deg) scaleY(.72);
}

.abstract-field::after {
  right: -140px;
  top: -178px;
  transform: rotate(-23deg) scaleY(.72);
  background: repeating-conic-gradient(from 18deg, rgba(105,41,196,.46) 0 2.5deg, transparent 2.5deg 7deg);
}

.fold {
  position: absolute;
  width: 420px;
  height: 66px;
  border-radius: 999px;
  filter: drop-shadow(0 13px 12px rgba(0,45,156,.09));
}

.fold::before,
.fold::after {
  content: '';
  position: absolute;
  inset: 13px 24px;
  border-radius: inherit;
  border: 1px solid rgba(255,255,255,.8);
}

.fold::after {
  inset: 27px 48px -14px;
  opacity: .45;
}

.fold-teal {
  left: -125px;
  top: 148px;
  transform: rotate(-25deg);
  background: linear-gradient(100deg, rgba(61,219,217,.13), rgba(0,157,154,.52), rgba(255,255,255,.28));
}

.fold-blue {
  left: -62px;
  bottom: 102px;
  transform: rotate(17deg);
  background: linear-gradient(100deg, rgba(120,169,255,.12), rgba(15,98,254,.62), rgba(255,255,255,.25));
}

.fold-violet {
  right: -92px;
  top: 118px;
  transform: rotate(22deg);
  background: linear-gradient(100deg, rgba(255,255,255,.25), rgba(138,63,252,.46), rgba(190,149,255,.18));
}

.fold-lilac {
  right: -134px;
  bottom: 118px;
  transform: rotate(-20deg);
  background: linear-gradient(100deg, rgba(255,255,255,.3), rgba(166,200,255,.48), rgba(105,41,196,.17));
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
  width: 1px;
  height: 94px;
  background: linear-gradient(180deg, transparent, rgba(15,98,254,.28), transparent);
}

.logo-field::before {
  top: 122px;
}

.logo-field::after {
  bottom: 122px;
}

.ibm-mark {
  position: relative;
  display: block;
  width: 340px;
  height: auto;
  animation: logo-in 1.1s cubic-bezier(.22, 1, .36, 1) both;
}

.instant .abstract-field,
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
  .abstract-field,
  .ibm-mark { animation: none; }
}
</style>
