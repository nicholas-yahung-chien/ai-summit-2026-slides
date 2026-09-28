<script setup>
import { computed, ref, watch } from 'vue'
import { useSlideContext } from '@slidev/client'
const { $page, $nav, $renderContext } = useSlideContext()
const active = computed(() => $page.value === $nav.value.currentSlideNo)
const replay = ref(0)
watch(active, value => { if (value) replay.value++ })
const results = [
  { name: 'SWE-bench Verified', before: .549, after: .709 },
  { name: 'SWE-Smith', before: .626, after: .546 },
]
</script>

<template>
  <section :key="replay" class="swe-research" :class="{ instant: !active || $renderContext === 'print' }">
    <p class="eyebrow">RESEARCH 03 · SWE-ROUTER</p>
    <h1>先探索，再判斷是否升級模型。</h1>
    <div class="flow"><span><b>01</b> 低成本模型探索</span><i>→</i><span><b>02</b> 讀取執行軌跡</span><i>→</i><span><b>03</b> 繼續／升級模型</span></div>
    <div class="comparison">
      <div>
        <p class="metric">成本與解題率綜合指標 · Route-AUC ↑</p>
        <div class="legend"><span>● 只看題目 K = 0</span><span>● 探索 4 步 K = 4</span></div>
        <div v-for="(row, index) in results" :key="row.name" class="dataset" :style="{ '--delay': `${index * 400}ms` }">
          <h2>{{ row.name }} <small>{{ row.after > row.before ? '改善 +0.160' : '退步 −0.080' }}</small></h2>
          <div class="bar"><div class="track"><i :style="{ width: `${row.before * 100}%` }" /></div><b>{{ row.before.toFixed(3) }}</b></div>
          <div class="bar blue"><div class="track"><i :style="{ width: `${row.after * 100}%` }" /></div><b>{{ row.after.toFixed(3) }}</b></div>
        </div>
      </div>
      <aside><h2>先探索的效益，<br>取決於任務分布。</h2><p>GPT-5 mini → Gemini 3 Pro Preview</p><p>Verified 改善；SWE-Smith 退步。<br>作者認為可能與跨程式庫的<br>任務分布改變有關。</p><p class="caveat">探索不保證更好；<br>應在團隊自己的任務上驗證。</p></aside>
    </div>
    <p class="limits">指標非成功率或節省百分比；K 是探索步數，非難度分級。SWE-bench 保留測試集為 100 題。</p>
    <div class="reference" lang="en">Son, S., Yoon, S., Tang, J., Wang, S., Wolf, L., &amp; Bogunovic, I. (2026). <a href="https://arxiv.org/abs/2607.00053" target="_blank" rel="noopener">SWE-Router: Routing in Multi-turn Agentic Software Engineering Tasks.</a> <em>The 5th Deep Learning for Code Workshop, ICML 2026.</em> arXiv:2607.00053v1. <a href="https://doi.org/10.48550/arXiv.2607.00053" target="_blank" rel="noopener">doi:10.48550/arXiv.2607.00053</a>. Data: Table 2; method and limits: §3, §5.1, Appendix A–B.</div>
  </section>
</template>

<style scoped>
.swe-research h1 { font-size:44px; margin:14px 0; letter-spacing:-.035em; }
.context { font-size:19px; color:#525252; }
.flow { display:flex; align-items:center; justify-content:space-between; border-block:1px solid #c6c6c6; padding:13px 0; margin:16px 0; font-size:23px; }
.flow b { color:#0043ce; font-size:17px; margin-right:9px; }
.flow i { color:#0f62fe; font-style:normal; }
.comparison { display:grid; grid-template-columns:1.55fr 1fr; gap:42px; }
.metric { font-size:21px; margin:0; }
.legend { display:flex; gap:25px; font-size:16px; color:#697785; margin:7px 0; }
.legend span:last-child { color:#0043ce; }
.dataset h2 { font-size:21px; margin:9px 0 4px; }
.dataset h2 small { float:right; font-size:17px; font-weight:500; color:#0043ce; }
.bar { display:flex; align-items:center; gap:18px; height:27px; }
.bar b { font-size:23px; font-weight:500; width:64px; }
.track { flex:1; height:11px; background:#e0e5eb; }
.track i { display:block; height:100%; background:#697785; transform-origin:left; animation:grow 800ms cubic-bezier(.22,1,.36,1) var(--delay) both; }
.blue { color:#0043ce; }
.blue i { background:#0f62fe; animation-delay:calc(var(--delay) + 220ms); }
aside { border-left:1px solid #c6c6c6; padding-left:30px; }
aside h2 { font-size:27px; color:#0043ce; line-height:1.4; margin:0 0 10px; }
aside p { font-size:18px; line-height:1.5; margin:7px 0; }
aside .caveat { color:#525252; }
.limits { font-size:16px; color:#525252; margin-top:10px; }
.reference { position:absolute; left:72px; right:72px; bottom:83px; border-top:1px solid #c6c6c6; padding-top:12px; font-size:15px; line-height:1.45; color:#393939; }
.reference a { color:#0043ce; }
@keyframes grow { from { transform:scaleX(0); } to { transform:scaleX(1); } }
.instant .track i { animation:none; }
@media (prefers-reduced-motion:reduce) { .track i { animation:none; } }
</style>
