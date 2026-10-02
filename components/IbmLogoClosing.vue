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
          <linearGradient id="closing-wave-top" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stop-color="#3ddbd9" />
            <stop offset=".45" stop-color="#78a9ff" />
            <stop offset="1" stop-color="#be95ff" />
          </linearGradient>
          <linearGradient id="closing-wave-bottom" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stop-color="#be95ff" />
            <stop offset=".5" stop-color="#78a9ff" />
            <stop offset="1" stop-color="#3ddbd9" />
          </linearGradient>
        </defs>

        <g class="wave-stack wave-stack-top">
          <path d="M0 0H1280V205C1098 165 972 229 785 194C589 157 457 254 262 216C149 194 71 205 0 230Z" fill="url(#closing-wave-top)" />
          <path d="M0 0H1280V170C1105 135 963 207 796 168C606 124 474 216 280 181C161 159 81 179 0 195Z" fill="url(#closing-wave-top)" />
          <path d="M0 0H1280V134C1100 104 972 168 790 138C600 106 468 177 270 145C153 126 77 146 0 158Z" fill="url(#closing-wave-top)" />
          <path d="M0 0H1280V100C1112 72 970 137 800 105C612 70 483 141 284 112C165 95 84 108 0 126Z" fill="url(#closing-wave-top)" />
          <path d="M0 0H1280V67C1104 48 981 103 800 74C619 44 491 109 291 81C170 64 85 78 0 91Z" fill="url(#closing-wave-top)" />
          <path d="M0 0H1280V36C1114 18 982 68 812 43C630 17 500 71 305 48C179 33 89 45 0 58Z" fill="url(#closing-wave-top)" />
        </g>

        <g class="wave-stack wave-stack-bottom">
          <path d="M0 485C182 528 325 462 505 501C684 540 811 462 1008 500C1129 523 1206 502 1280 486V720H0Z" fill="url(#closing-wave-bottom)" />
          <path d="M0 526C180 567 330 501 503 541C688 583 819 506 1009 543C1127 566 1205 548 1280 528V720H0Z" fill="url(#closing-wave-bottom)" />
          <path d="M0 566C187 605 327 541 510 581C686 620 823 546 1014 582C1129 604 1206 588 1280 570V720H0Z" fill="url(#closing-wave-bottom)" />
          <path d="M0 603C183 638 334 578 510 617C692 657 824 583 1018 622C1132 645 1208 626 1280 611V720H0Z" fill="url(#closing-wave-bottom)" />
          <path d="M0 638C188 673 333 613 516 653C698 692 831 623 1017 658C1133 680 1209 664 1280 648V720H0Z" fill="url(#closing-wave-bottom)" />
          <path d="M0 674C188 706 341 652 519 687C701 722 835 660 1025 694C1137 714 1210 700 1280 685V720H0Z" fill="url(#closing-wave-bottom)" />
        </g>
      </svg>
    </div>
    <div class="logo-field">
      <img class="ibm-mark" :src="ibmLogo" alt="IBM" width="210" height="84" />
    </div>
  </section>
</template>

<style scoped>
.ibm-logo-closing-mark {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background:
    radial-gradient(ellipse at 50% 50%, rgba(120,169,255,.13), transparent 42%),
    linear-gradient(135deg, #0043ce, #002d9c 52%, #0043ce),
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

.wave-stack path {
  transform-box: fill-box;
  animation: wave-enter 1.15s cubic-bezier(.22, 1, .36, 1) both;
}

.wave-stack-top path:nth-child(1) { opacity:.18; animation-delay:80ms; }
.wave-stack-top path:nth-child(2) { opacity:.24; animation-delay:130ms; }
.wave-stack-top path:nth-child(3) { opacity:.31; animation-delay:180ms; }
.wave-stack-top path:nth-child(4) { opacity:.38; animation-delay:230ms; }
.wave-stack-top path:nth-child(5) { opacity:.48; animation-delay:280ms; }
.wave-stack-top path:nth-child(6) { opacity:.62; animation-delay:330ms; }

.wave-stack-bottom path:nth-child(1) { opacity:.18; animation-delay:170ms; }
.wave-stack-bottom path:nth-child(2) { opacity:.24; animation-delay:220ms; }
.wave-stack-bottom path:nth-child(3) { opacity:.31; animation-delay:270ms; }
.wave-stack-bottom path:nth-child(4) { opacity:.39; animation-delay:320ms; }
.wave-stack-bottom path:nth-child(5) { opacity:.49; animation-delay:370ms; }
.wave-stack-bottom path:nth-child(6) { opacity:.63; animation-delay:420ms; }

.wave-stack-top path { transform-origin:center top; }
.wave-stack-bottom path { transform-origin:center bottom; }

.wave-stack-top path { --wave-from: translateY(-24px) scaleY(.9); }
.wave-stack-bottom path { --wave-from: translateY(24px) scaleY(.9); }

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
  width: 210px;
  height: auto;
  filter: brightness(0) invert(1) drop-shadow(0 12px 24px rgba(0,29,108,.2));
  animation: logo-in 1.1s cubic-bezier(.22, 1, .36, 1) both;
}

.instant .visual-frame,
.instant .wave-stack path,
.instant .ibm-mark { animation: none; }

@keyframes field-in {
  from { opacity: 0; transform: scale(1.035); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes wave-enter {
  from { opacity:0; transform:var(--wave-from); }
}

@keyframes logo-in {
  from { opacity: 0; transform: scale(.94); }
  to { opacity: 1; transform: scale(1); }
}

@media (prefers-reduced-motion: reduce) {
  .visual-frame,
  .wave-stack path,
  .ibm-mark { animation: none; }
}
</style>
