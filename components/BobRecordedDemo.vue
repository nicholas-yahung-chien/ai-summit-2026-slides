<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useSlideContext } from '@slidev/client'
import bobLogo from '../assets/architecture-logos/bob.svg'

const { $page, $nav, $renderContext } = useSlideContext()
const video = ref(null)
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
  await nextTick()
  if (value) {
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
  <section class="bob-recorded-demo">
    <aside class="feature-rail">
      <div class="bob-brand">
        <img :src="bobLogo" alt="IBM Bob" />
        <div>
          <strong>IBM Bob</strong>
          <span>Premium Package for Z</span>
        </div>
      </div>

      <p class="demo-label">RECORDED WORKFLOW</p>
      <h1>從 COBOL 理解<br>到 Java 驗證</h1>

      <ul aria-label="IBM Bob 與 Premium Package for Z 特色功能">
        <li><b>理解</b><span>梳理程式、資料與相依關係</span></li>
        <li><b>文件</b><span>留下規格與業務規則依據</span></li>
        <li><b>轉換</b><span>建立 COBOL → Java 追溯</span></li>
        <li><b>驗證</b><span>產生 mock 測試與執行紀錄</span></li>
      </ul>

      <p class="demo-scope">GenApp · 新增客戶流程</p>
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
  align-items: center;
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
}

.bob-brand img {
  width: 46px;
  height: 46px;
  flex: 0 0 auto;
  box-sizing: border-box;
  padding: 7px;
  background: #f4f4f4;
}

.bob-brand strong,
.bob-brand span {
  display: block;
}

.bob-brand strong {
  color: #ffffff;
  font-size: 24px;
  line-height: 1.08;
  font-weight: 600;
}

.bob-brand span {
  margin-top: 5px;
  color: #d0e2ff;
  font-size: 13px;
  line-height: 1.2;
}

.demo-label {
  margin-top: 30px !important;
  color: #a6c8ff;
  font-size: 13px;
  line-height: 1.2;
  font-weight: 600;
  letter-spacing: .12em;
}

h1 {
  margin: 10px 0 23px !important;
  color: #ffffff;
  font-size: 34px !important;
  line-height: 1.22 !important;
  letter-spacing: -.035em !important;
  font-weight: 600 !important;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

li {
  display: grid;
  grid-template-columns: 48px 1fr;
  gap: 10px;
  padding: 12px 0;
  border-top: 1px solid rgba(255, 255, 255, .28);
}

li:first-child {
  border-top: 3px solid #3ddbd9;
}

li b {
  color: #a6c8ff;
  font-size: 17px;
  line-height: 1.45;
  font-weight: 600;
}

li span {
  color: #ffffff;
  font-size: 17px;
  line-height: 1.45;
}

.demo-scope {
  margin-top: auto !important;
  color: #d0e2ff;
  font-size: 15px;
  line-height: 1.3;
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
  border: 1px solid #78a9ff;
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
  color: #d0e2ff;
  font-size: 13px;
  line-height: 1.2;
  letter-spacing: .08em;
}

.video-caption button {
  padding: 4px 0;
  color: #ffffff;
  font: inherit;
  letter-spacing: .04em;
  background: transparent;
  border: 0;
  border-bottom: 1px solid #a6c8ff;
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
