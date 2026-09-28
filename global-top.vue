<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useNav } from '@slidev/client'
import { useTimer } from '@slidev/client/composables/useTimer.ts'
import { formatCountdown, parseSlideNumber } from './lib/controls.mjs'

const nav = useNav()
// Share Slidev's actual timer with presenter mode, rather than running a second clock.
const { status, passed, duration, toggle, reset } = useTimer()
const { currentPage, total, isPresenter, isPrintMode } = nav
const shown = ref(true)
const pageInput = ref('1')
const error = ref('')
const field = ref<HTMLInputElement>()
const clock = computed(() => formatCountdown(duration.value, passed.value))
const presenterHref = computed(() => `#/presenter/${currentPage.value}`)
watch(currentPage, (page) => { pageInput.value = String(page); error.value = '' }, { immediate: true })

async function jump() {
  const page = parseSlideNumber(pageInput.value, total.value)
  if (page === null) { error.value = `請輸入 1–${total.value} 的整數頁碼`; return }
  error.value = ''
  await nav.go(page)
  field.value?.blur()
}
function keyHandler(event: KeyboardEvent) {
  const element = event.target as HTMLElement
  if (element?.closest('input,textarea,select,button,a,[contenteditable="true"]') || event.ctrlKey || event.metaKey || event.altKey || isPresenter.value || isPrintMode.value) return
  if (event.key.toLowerCase() === 'h') { shown.value = !shown.value; event.preventDefault() }
  if (event.key.toLowerCase() === 'j') {
    shown.value = true
    requestAnimationFrame(() => { field.value?.focus(); field.value?.select() })
    event.preventDefault()
  }
}
onMounted(() => window.addEventListener('keydown', keyHandler))
onUnmounted(() => window.removeEventListener('keydown', keyHandler))
</script>

<template>
  <Teleport to="body">
    <nav v-if="!isPresenter && !isPrintMode && shown" class="summit-controls" aria-label="簡報播放控制" @keydown.stop @click.stop>
      <div class="control-pages">
        <button aria-label="上一頁" :disabled="currentPage <= 1" @click="nav.prevSlide()">←</button>
        <form @submit.prevent="jump" novalidate>
          <label for="summit-page">跳至</label>
          <input id="summit-page" ref="field" v-model="pageInput" inputmode="numeric" aria-label="指定頁碼" :aria-invalid="!!error" :aria-describedby="error ? 'page-error' : undefined" autocomplete="off" />
          <span>/ {{ total }}</span>
          <button type="submit">前往</button>
        </form>
        <button aria-label="下一頁" :disabled="currentPage >= total" @click="nav.nextSlide()">→</button>
      </div>
      <div class="control-timer" :class="{ overtime: passed > duration }">
        <span class="clock-label">{{ passed > duration ? '超時' : '倒數' }}</span>
        <output aria-label="演講倒數計時">{{ clock }}</output>
        <button :aria-label="status === 'running' ? '暫停計時' : '開始計時'" @click="toggle">{{ status === 'running' ? '暫停' : '開始' }}</button>
        <button aria-label="重設計時" @click="reset">重設</button>
      </div>
      <a :href="presenterHref" target="_blank" rel="noopener">講者模式 ↗</a>
      <button class="hide-controls" title="H：隱藏或顯示控制列" @click="shown = false">隱藏</button>
      <p v-if="error" id="page-error" role="alert">{{ error }}</p>
    </nav>
    <button v-else-if="!isPresenter && !isPrintMode" class="summit-reopen" aria-label="顯示播放控制" @click="shown = true">播放控制</button>
  </Teleport>
</template>

<style>
.summit-controls { position:fixed; z-index:1000; bottom:10px; left:50%; transform:translateX(-50%); display:flex; align-items:center; gap:12px; padding:8px 12px; color:#161616; background:#fff; border:1px solid #c6c6c6; box-shadow:0 3px 14px #001d6c18; font-family:'IBM Plex Sans','Noto Sans TC',sans-serif; font-size:14px; line-height:1.5; white-space:nowrap; border-radius:4px; }
.summit-controls button,.summit-controls a { padding:7px 10px; min-height:36px; cursor:pointer; border-radius:2px; color:#0043ce; font-weight:500; background:#edf5ff; text-decoration:none; border:0; }
.summit-controls button:hover,.summit-controls a:hover { background:#d0e2ff; }
.summit-controls button:focus-visible,.summit-controls a:focus-visible,.summit-controls input:focus-visible,.summit-reopen:focus-visible { outline:2px solid #0f62fe; outline-offset:2px; }
.summit-controls button:disabled { opacity:.4; cursor:default; }
.control-pages,.control-pages form,.control-timer { display:flex; align-items:center; gap:7px; }
.control-timer { padding:0 12px; border-inline:1px solid #d6d6d6; }
.control-timer output { font-size:20px; font-weight:500; font-variant-numeric:tabular-nums; min-width:60px; }
.control-timer.overtime output { color:#b81921; }
.clock-label { font-size:12px; color:#525252; }
.summit-controls input { width:43px; height:34px; color:#161616; background:#f4f4f4; border:1px solid #8d8d8d; text-align:center; border-radius:0; }
.summit-controls #page-error { position:absolute; bottom:100%; left:0; padding:8px 12px; background:#fff1f1; border:1px solid #da1e28; color:#750e13; margin-bottom:6px; }
.summit-reopen { position:fixed; bottom:12px; right:12px; z-index:1000; color:#0043ce; background:#fff; border:1px solid #c6c6c6; padding:8px 14px; font:14px 'Noto Sans TC',sans-serif; cursor:pointer; }
@media(max-width:760px) { .summit-controls { width:calc(100% - 16px); gap:7px; flex-wrap:wrap; justify-content:center; bottom:8px; } .control-timer { border:0; padding:0 4px; } .clock-label { display:none; } .summit-controls button,.summit-controls a { min-height:40px; } }
@media print { .summit-controls,.summit-reopen { display:none !important; } }
</style>
