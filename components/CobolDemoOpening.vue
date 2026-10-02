<script setup>
import { computed, ref, watch } from 'vue'
import { useSlideContext } from '@slidev/client'

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
    class="cobol-demo-opening"
    :class="{ instant: !active || $renderContext === 'print' }"
  >
    <p class="eyebrow">LIVE DEMO · COBOL MODERNIZATION</p>
    <h1>同一段 Prompt<br><span>兩種代理路徑</span></h1>

    <div class="experiment" aria-label="同一份 COBOL 專案與同一段 prompt，分別交由 Bob CLI 與 Codex CLI 執行">
      <div class="shared-input">
        <small>SHARED INPUT</small>
        <strong>同一份 COBOL 專案與 Prompt</strong>
      </div>

      <div class="branch" aria-hidden="true">
        <i></i><i></i><i></i>
      </div>

      <div class="lanes">
        <article class="bob-lane">
          <small>ROUTED PATH</small>
          <strong>Bob CLI</strong>
          <span>單代理 · 多模型路由</span>
        </article>
        <article class="codex-lane">
          <small>FIXED PATH</small>
          <strong>Codex CLI</strong>
          <span>單代理 · 固定單一模型</span>
        </article>
      </div>
    </div>

    <div class="deliverables" aria-label="Demo 交付項目">
      <span>理解 COBOL</span><b>→</b>
      <span>產出程式規格</span><b>→</b>
      <span>改寫 Java</span><b>→</b>
      <span>留下 Java 規格</span>
    </div>

    <p class="comparison">最後比較：交付結果、token 用量與換算成本</p>
    <i class="edge-accent" aria-hidden="true"></i>
  </section>
</template>

<style scoped>
.cobol-demo-opening { position:relative; height:100%; color:#fff; }
.eyebrow { animation:reveal .45s ease .08s both; }
h1 { margin:34px 0 0!important; font-size:78px!important; line-height:1.14!important; font-weight:500!important; letter-spacing:-.05em!important; animation:reveal .55s cubic-bezier(.22,1,.36,1) .18s both; }
h1 span { color:#a6c8ff; }
.experiment { position:absolute; top:98px; right:0; width:510px; }
.shared-input { width:330px; margin:0 auto; border:1px solid #78a9ff; background:#0b4fc2; padding:15px 20px 17px; text-align:center; animation:node-in .45s cubic-bezier(.22,1,.36,1) .55s both; }
.shared-input small,.lanes small { display:block; color:#d0e2ff; font-size:12px; font-weight:600; letter-spacing:.14em; }
.shared-input strong { display:block; margin-top:4px; font-size:20px; font-weight:500; }
.branch { position:relative; height:54px; }
.branch i { position:absolute; display:block; background:#78a9ff; transform-origin:top; animation:line-draw .38s ease .88s both; }
.branch i:nth-child(1) { left:50%; top:0; width:1px; height:27px; }
.branch i:nth-child(2) { left:25%; right:25%; top:27px; height:1px; transform-origin:center; }
.branch i:nth-child(3) { left:25%; right:25%; top:27px; height:27px; background:linear-gradient(90deg,#78a9ff 0 1px,transparent 1px calc(100% - 1px),#78a9ff calc(100% - 1px)); }
.lanes { display:grid; grid-template-columns:1fr 1fr; gap:20px; }
.lanes article { min-height:132px; border-top:4px solid #3ddbd9; background:rgba(0,29,108,.52); padding:18px 20px; animation:node-in .5s cubic-bezier(.22,1,.36,1) 1.12s both; }
.lanes article:last-child { border-top-color:#a6c8ff; animation-delay:1.24s; }
.lanes strong { display:block; margin:8px 0 4px; font-size:30px; font-weight:500; }
.lanes span { display:block; color:#e0eaff; font-size:17px; }
.deliverables { position:absolute; left:0; right:0; bottom:132px; display:flex; align-items:center; gap:18px; border-top:1px solid #78a9ff; padding-top:20px; font-size:22px; animation:reveal .55s ease 1.55s both; }
.deliverables span { white-space:nowrap; }
.deliverables b { color:#3ddbd9; font-weight:400; }
.comparison { position:absolute; left:0; bottom:78px; color:#d0e2ff; font-size:21px; animation:reveal .45s ease 1.82s both; }
.edge-accent { position:fixed; right:0; top:0; width:12px; height:100%; background:#3ddbd9; transform-origin:bottom; animation:accent-in .65s cubic-bezier(.22,1,.36,1) .1s both; }
.instant * { animation:none!important; opacity:1!important; transform:none!important; }
@keyframes reveal { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:none; } }
@keyframes node-in { from { opacity:0; transform:translateY(14px) scale(.98); } to { opacity:1; transform:none; } }
@keyframes line-draw { from { opacity:0; transform:scaleY(0); } to { opacity:1; transform:scaleY(1); } }
@keyframes accent-in { from { transform:scaleY(0); } to { transform:scaleY(1); } }
</style>
