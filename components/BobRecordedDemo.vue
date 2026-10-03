<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useSlideContext } from '@slidev/client'
import bobLogo from '../assets/architecture-logos/bob-mascot.webp'

const { $page, $nav, $renderContext } = useSlideContext()
const video = ref(null)
const replay = ref(0)
const active = computed(() => $page.value === $nav.value.currentSlideNo)
const isPrint = computed(() => $renderContext === 'print')
const base = import.meta.env.BASE_URL
const videoSrc = `${base}media/ibm-bob-genapp-demo.mp4`
const posterSrc = `${base}media/ibm-bob-genapp-demo-poster.png`

async function playFromStart() {
  if (!video.value || isPrint.value) return
  video.value.muted = true
  video.value.currentTime = 0
  try {
    await video.value.play()
  }
  catch {
    // Native controls remain available if the browser blocks autoplay.
  }
}

watch(active, async (value) => {
  if (value) {
    replay.value++
    await nextTick()
    await playFromStart()
  }
  else if (video.value) {
    video.value.pause()
    video.value.currentTime = 0
  }
})

onMounted(() => {
  if (active.value) playFromStart()
})
</script>

<template>
  <section
    :key="replay"
    class="bob-recorded-demo"
    :class="{ instant: !active || isPrint }"
  >
    <aside class="feature-rail">
      <div class="bob-brand">
        <img :src="bobLogo" alt="IBM Bob" />
        <div>
          <strong>IBM Bob</strong>
          <span>Premium Package for Z</span>
          <small>RECORDED WORKFLOW</small>
        </div>
      </div>

      <h1>從 COBOL 理解<br><span>到 Java 驗證</span></h1>

      <ul aria-label="IBM Bob 與 Premium Package for Z 特色功能">
        <li><b>全週期</b><span>規劃、開發、測試與現代化</span></li>
        <li><b>智慧協作</b><span>模式、技能與子代理協同</span></li>
        <li><b>企業治理</b><span>可重複、可控管的多步驟流程</span></li>
        <li><b>IBM Z</b><span>理解、轉換並驗證企業主機程式</span></li>
      </ul>

      <p class="demo-scope">規劃 · 執行 · 驗證 · 治理</p>
    </aside>

    <div class="video-column">
      <div class="video-frame">
        <img v-if="isPrint" :src="posterSrc" alt="IBM Bob GenApp 預錄展示畫面" />
        <video
          v-else
          ref="video"
          :src="videoSrc"
          :poster="posterSrc"
          muted
          autoplay
          playsinline
          controls
          preload="auto"
          aria-label="IBM Bob 理解 COBOL、產生規格、轉換 Java 並建立測試的預錄展示"
        ></video>
      </div>
      <div class="video-caption">
        <span>IBM Bob IDE · LOCAL WORKSPACE</span>
        <button type="button" @click="playFromStart">從頭播放</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.bob-recorded-demo {
  position: relative;
  height: 100%;
  display: grid;
  grid-template-columns: 252px minmax(0, 1fr);
  gap: 30px;
  align-items: start;
}

.bob-recorded-demo::after {
  content: '';
  position: fixed;
  top: 0;
  right: 0;
  width: 12px;
  height: 100%;
  background: #3ddbd9;
}

:global(.slidev-layout.summit-layout.bob-recorded-demo-page) {
  background: #001d6c;
}

:global(.bob-recorded-demo-page .slide-footer) {
  color: #a6c8ff;
  border-color: #4589ff;
}

:global(.bob-recorded-demo-page .slide-footer b) {
  color: #3ddbd9;
}

.feature-rail {
  height: 500px;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.bob-brand {
  display: flex;
  align-items: center;
  gap: 13px;
  animation: feature-enter 520ms cubic-bezier(.2, .75, .2, 1) 80ms both;
}

.bob-brand img {
  width: 58px;
  height: 58px;
  flex: 0 0 auto;
  object-fit: contain;
}

.bob-brand strong,
.bob-brand span,
.bob-brand small {
  display: block;
}

.bob-brand strong {
  color: #f4f4f4;
  font-size: 24px;
  line-height: 1.08;
  font-weight: 600;
}

.bob-brand span {
  margin-top: 3px;
  color: #a6c8ff;
  font-size: 12px;
  line-height: 1.2;
}

.bob-brand small {
  margin-top: 5px;
  color: #3ddbd9;
  font-size: 10px;
  line-height: 1.2;
  font-weight: 600;
  letter-spacing: .12em;
}

h1 {
  margin: 14px 0 18px !important;
  color: #ffffff;
  font-size: 34px !important;
  line-height: 1.22 !important;
  letter-spacing: -.035em !important;
  font-weight: 600 !important;
  animation: feature-enter 600ms cubic-bezier(.2, .75, .2, 1) 260ms both;
}

h1 span {
  color: #a6c8ff;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

li {
  display: grid;
  grid-template-columns: 72px 1fr;
  gap: 10px;
  padding: 12px 0;
  border-top: 1px solid rgba(120, 169, 255, .45);
  animation: feature-enter 600ms cubic-bezier(.2, .75, .2, 1) both;
}

li:nth-child(1) { animation-delay: 620ms; }
li:nth-child(2) { animation-delay: 800ms; }
li:nth-child(3) { animation-delay: 980ms; }
li:nth-child(4) { animation-delay: 1160ms; }

li:first-child {
  border-top: 3px solid #3ddbd9;
}

li b {
  color: #3ddbd9;
  font-size: 17px;
  line-height: 1.45;
  font-weight: 600;
}

li span {
  color: #d0e2ff;
  font-size: 17px;
  line-height: 1.45;
}

.demo-scope {
  margin-top: auto !important;
  color: #78a9ff;
  font-size: 15px;
  line-height: 1.3;
  animation: feature-enter 560ms cubic-bezier(.2, .75, .2, 1) 1380ms both;
}

.instant .bob-brand,
.instant h1,
.instant li,
.instant .demo-scope {
  animation: none;
}

@keyframes feature-enter {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.video-column {
  min-width: 0;
}

.video-frame {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: #161616;
  border: 1px solid #4589ff;
  box-shadow: 0 16px 38px rgba(0, 0, 0, .32);
}

.video-frame video,
.video-frame img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-caption {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  color: #a6c8ff;
  font-size: 13px;
  line-height: 1.2;
  letter-spacing: .08em;
}

.video-caption button {
  padding: 4px 0;
  color: #3ddbd9;
  font: inherit;
  letter-spacing: .04em;
  background: transparent;
  border: 0;
  border-bottom: 1px solid #3ddbd9;
  cursor: pointer;
}

.video-caption button:focus-visible {
  outline: 2px solid #0f62fe;
  outline-offset: 4px;
}

@media print {
  .video-caption button { display: none; }
}
</style>
