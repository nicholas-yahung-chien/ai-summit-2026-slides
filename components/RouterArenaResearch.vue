<script setup>
import { computed, ref, watch } from 'vue'
import { useSlideContext } from '@slidev/client'
const { $page, $nav, $renderContext } = useSlideContext()
const active = computed(() => $page.value === $nav.value.currentSlideNo)
const replay = ref(0)
watch(active, value => { if (value) replay.value++ })
const tiers = [
  { name:'容易', rule:'≥20 個模型答對', rows:[{name:'GPT-5', score:95.1, cost:5.68},{name:'Azure Router', score:93.3, cost:.30}] },
  { name:'中等', rule:'5–19 個模型答對', rows:[{name:'GPT-5', score:68.6, cost:14.80},{name:'Azure Router', score:59.5, cost:.63}] },
  { name:'困難', rule:'≤4 個模型答對', rows:[{name:'GPT-5', score:27.5, cost:35.73},{name:'Azure Router', score:17.9, cost:1.05}] },
]
</script>
<template>
  <section :key="replay" class="arena" :class="{ instant:!active || $renderContext === 'print' }">
    <p class="eyebrow">RESEARCH 03 · ROUTERARENA</p>
    <h1>不同難度，不同的品質與費用取捨。</h1>
    <div class="heading"><span>難度 · 42 模型評測</span><span>比較方法</span><span>準確率 ↑ <small>0–100%</small></span><span>費用 ↓ <small>USD／千次查詢 · 0–$40</small></span></div>
    <div v-for="(tier,t) in tiers" :key="tier.name" class="tier">
      <div class="label"><h2>{{ tier.name }}</h2><p>{{ tier.rule }}</p></div>
      <div class="rows">
        <div v-for="(row,i) in tier.rows" :key="row.name" class="row" :style="{ '--delay': `${t * 250 + i * 150}ms` }">
          <span>{{ row.name }}</span>
          <div :class="{winner:i === 0}"><b>{{ row.score.toFixed(1) }}%</b><div class="track"><i :style="{width:`${row.score}%`}" /></div></div>
          <div :class="{winner:i === 1}"><b>${{ row.cost.toFixed(2) }}</b><div class="track"><i :style="{width:`${row.cost / 40 * 100}%`}" /></div></div>
        </div>
      </div>
    </div>
    <p class="takeaway">路由可明顯降低費用，並在容易與中等任務上維持具競爭力的準確率。</p>
    <p class="limits">一般查詢評測，非完整程式代理流程；模型池不同。</p>
    <ResearchCitation source="arena" />
  </section>
</template>
<style scoped>
.arena h1 {font-size:43px;margin:14px 0 16px;letter-spacing:-.035em}
.heading {display:grid;grid-template-columns:230px 175px 1fr 1fr;gap:20px;border-bottom:1px solid #a8a8a8;padding-bottom:12px;font-size:19px}
.heading small {font-size:14px;color:#525252}
.tier {display:grid;grid-template-columns:230px 1fr;gap:20px;border-bottom:1px solid #d8dce2;padding:5px 0}
.label h2 {font-size:27px;margin:7px 0 3px}.label p {font-size:16px;color:#525252;margin:0}
.row {display:grid;grid-template-columns:175px 1fr 1fr;gap:20px;align-items:center;height:37px;font-size:20px}
.row b {display:block;font-size:20px;line-height:24px;font-weight:500;color:#697785}.track {height:6px;background:#e0e5eb;margin-top:3px}
.track i {display:block;height:100%;background:#697785;transform-origin:left;animation:grow 750ms ease-out var(--delay) both}
.winner b {color:#0043ce}.winner i {background:#0f62fe}
.arena .takeaway {font-size:23px;color:#0043ce;margin:15px 0 7px;padding:0;border:0}
.limits {font-size:16px;color:#525252;margin:0}
@keyframes grow {from {transform:scaleX(0)}to {transform:scaleX(1)}}.instant .track i {animation:none}
@media(prefers-reduced-motion:reduce){.track i {animation:none}}
</style>
