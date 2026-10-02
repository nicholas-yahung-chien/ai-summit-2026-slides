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
          <linearGradient id="closing-wave-blue" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stop-color="#a6c8ff" />
            <stop offset=".5" stop-color="#4589ff" />
            <stop offset="1" stop-color="#d4bbff" />
          </linearGradient>
          <linearGradient id="closing-wave-light" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stop-color="#ffffff" />
            <stop offset=".48" stop-color="#a7f0ba" />
            <stop offset="1" stop-color="#e8daff" />
          </linearGradient>
        </defs>

        <g class="wave-stack wave-stack-top">
          <path d="M-80 4C126 55 293-27 481 31C662 87 799 2 976 42C1128 77 1245 29 1360 17L1360 91C1234 119 1103 70 949 105C778 144 643 62 463 97C272 134 122 80-80 115Z" fill="url(#closing-wave-top)" />
          <path d="M-80 51C98 12 264 101 445 54C632 5 779 96 955 59C1111 26 1233 79 1360 50L1360 128C1225 150 1097 103 944 137C770 175 626 89 447 129C265 170 104 91-80 139Z" fill="url(#closing-wave-blue)" />
          <path d="M-80 92C109 139 270 54 454 109C635 163 785 71 968 119C1129 161 1238 107 1360 135L1360 192C1235 172 1127 217 965 176C780 129 642 218 449 166C267 117 106 198-80 155Z" fill="url(#closing-wave-light)" />
          <path d="M-80 132C107 94 281 180 466 139C647 99 792 183 973 145C1122 114 1240 166 1360 143L1360 219C1226 244 1103 192 962 223C779 263 648 177 462 219C278 261 107 177-80 216Z" fill="url(#closing-wave-bottom)" />
          <path d="M-80 177C112 224 269 140 455 190C642 240 783 153 962 198C1126 240 1237 188 1360 215L1360 268C1229 248 1120 293 955 254C775 211 639 291 451 247C266 204 109 282-80 243Z" fill="url(#closing-wave-blue)" />
          <path d="M-80 218C103 185 278 266 462 228C643 191 799 270 971 233C1129 199 1237 253 1360 229L1360 291C1225 313 1103 270 960 299C775 336 640 259 455 298C273 336 105 264-80 302Z" fill="url(#closing-wave-top)" />
        </g>

        <g class="wave-stack wave-stack-center">
          <path d="M-80 302C105 349 275 270 455 320C639 371 788 282 970 332C1128 375 1239 321 1360 349L1360 390C1232 369 1114 414 961 378C779 335 642 416 455 371C271 327 107 402-80 365Z" fill="url(#closing-wave-light)" />
        </g>

        <g class="wave-stack wave-stack-bottom">
          <path d="M-80 458C109 423 277 503 459 466C644 429 793 506 974 471C1128 441 1241 491 1360 468L1360 532C1233 554 1110 510 963 540C782 577 642 499 457 539C274 578 106 502-80 542Z" fill="url(#closing-wave-top)" />
          <path d="M-80 500C105 546 275 468 455 518C639 569 788 480 970 530C1128 573 1239 519 1360 547L1360 601C1232 580 1114 625 961 589C779 546 642 627 455 582C271 538 107 613-80 576Z" fill="url(#closing-wave-light)" />
          <path d="M-80 543C108 508 278 587 462 550C644 513 795 590 973 555C1125 525 1243 575 1360 552L1360 616C1235 637 1111 598 966 626C782 661 646 589 459 627C276 664 107 593-80 632Z" fill="url(#closing-wave-blue)" />
          <path d="M-80 580C105 624 272 551 454 599C639 648 785 567 968 611C1127 649 1238 603 1360 627L1360 678C1233 660 1117 699 962 667C779 629 643 700 455 660C274 622 106 689-80 656Z" fill="url(#closing-wave-bottom)" />
          <path d="M-80 623C107 589 281 672 466 632C647 593 792 674 973 638C1122 608 1240 658 1360 635L1360 700C1226 724 1103 676 962 706C779 744 648 664 462 704C278 744 107 666-80 704Z" fill="url(#closing-wave-light)" />
          <path d="M-80 666C112 709 269 631 455 677C642 723 783 644 962 686C1126 725 1237 676 1360 701V760H-80Z" fill="url(#closing-wave-blue)" />
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
  mix-blend-mode: screen;
  --wave-from: translateX(-42px);
  animation: wave-enter 1.15s cubic-bezier(.22, 1, .36, 1) both;
}

.wave-stack path:nth-child(even) { --wave-from:translateX(42px); }

.wave-stack-top path:nth-child(1) { opacity:.48; animation-delay:70ms; }
.wave-stack-top path:nth-child(2) { opacity:.38; animation-delay:125ms; }
.wave-stack-top path:nth-child(3) { opacity:.28; animation-delay:180ms; }
.wave-stack-top path:nth-child(4) { opacity:.18; animation-delay:235ms; }
.wave-stack-top path:nth-child(5) { opacity:.1; animation-delay:290ms; }
.wave-stack-top path:nth-child(6) { opacity:.045; animation-delay:345ms; }

.wave-stack-center path:nth-child(1) { opacity:.022; animation-delay:300ms; }

.wave-stack-bottom path:nth-child(1) { opacity:.045; animation-delay:160ms; }
.wave-stack-bottom path:nth-child(2) { opacity:.09; animation-delay:215ms; }
.wave-stack-bottom path:nth-child(3) { opacity:.16; animation-delay:270ms; }
.wave-stack-bottom path:nth-child(4) { opacity:.25; animation-delay:325ms; }
.wave-stack-bottom path:nth-child(5) { opacity:.36; animation-delay:380ms; }
.wave-stack-bottom path:nth-child(6) { opacity:.5; animation-delay:435ms; }

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
