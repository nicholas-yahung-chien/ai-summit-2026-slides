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
    <h1>不同任務難度下的準確率與費用比較</h1>
    <ArenaScatter :tiers="tiers" />
    <p class="takeaway">多模型路由能省下不少費用；在較難任務的表現上準確率也差距不大</p>
    <ResearchCitation source="arena" />
  </section>
</template>
<style scoped>
.arena h1 {font-size:43px;margin:14px 0 16px;letter-spacing:-.035em}
.arena .takeaway {font-size:23px;color:#0043ce;margin:15px 0 7px;padding:0;border:0}
</style>
