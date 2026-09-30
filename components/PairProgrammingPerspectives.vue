<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useSlideContext } from '@slidev/client'
const { $page, $nav } = useSlideContext()
const active = computed(() => $page.value === $nav.value.currentSlideNo)
const replay = ref(0)
const showAll = ref(false)
function restart() { showAll.value = false; replay.value++ }
watch(active, value => { if (value) restart() })
</script>

<template>
  <section class="pair-perspectives">
    <p class="eyebrow">08 · AI PAIR PROGRAMMING</p>
    <h1>AI 結對程式設計：協作的價值與人的角色</h1>
    <div :key="replay" class="perspectives">
      <article>
        <div class="theme"><span>01</span><h2>共同掌握<br>設計方向</h2></div>
        <div class="quotation">
          <AnimatedQuote english="The developer's role changes from reverse-engineering invisible design decisions to steering them explicitly." chinese="開發者的角色，從反推隱藏的設計決策，轉為明確引導這些決策" :controls="false" :show-all="showAll" />
          <p class="attribution">Garg, R. (2026, March 3). <a href="https://www.martinfowler.com/articles/reduce-friction-ai/design-first-collaboration.html" target="_blank" rel="noopener"><cite>Design-first collaboration</cite></a>. MartinFowler.com.</p>
        </div>
      </article>
      <article>
        <div class="theme"><span>02</span><h2>更靈活地<br>探索解法</h2></div>
        <div class="quotation">
          <AnimatedQuote english="Since LLMs can operate at a lower level of precision they allow us to explore abstractions with more fluidity." chinese="LLM 能在較低的精確度下運作，讓我們更靈活地探索抽象概念" :delay="5000" :controls="false" :show-all="showAll" />
          <p class="speaker">— Martin Fowler</p>
          <p class="attribution">Joshi, U., Parsons, R., &amp; Fowler, M. (2026, January 21). <a href="https://martinfowler.com/articles/convo-what-how.html" target="_blank" rel="noopener"><cite>Conversation: LLMs and the what/how loop</cite></a>. MartinFowler.com.</p>
        </div>
      </article>
      <article>
        <div class="theme"><span>03</span><div><h2>改善機制<br>提升成果品質</h2><p class="scope">延伸觀點 · On the loop</p></div></div>
        <div class="quotation">
          <AnimatedQuote english="We continuously improve the quality of the outcomes we get by continuously improving the harness." chinese="透過持續改善 harness，我們也持續提升成果品質" :delay="10000" :controls="false" :show-all="showAll" />
          <p class="attribution">Morris, K. (2026, March 4). <a href="https://martinfowler.com/articles/exploring-gen-ai/humans-and-agents.html" target="_blank" rel="noopener"><cite>Humans and agents in software engineering loops</cite></a>. MartinFowler.com.</p>
        </div>
      </article>
    </div>
    <div class="actions" @click.stop @pointerdown.stop><button @click="restart">重播引文 ↻</button><button @click="showAll = true">顯示全文</button></div>
  </section>
</template>

<style scoped>
h1{font-size:38px!important;line-height:1.25!important;letter-spacing:-1px;margin:12px 0 16px!important}
.perspectives{border-top:1px solid #a8b7c9}
article{display:grid;grid-template-columns:190px 1fr;gap:28px;padding:12px 0 12px;border-bottom:1px solid #d6dce4}
.theme{display:flex;gap:14px;border-right:2px solid #a6c8ff}
.theme span{font-size:16px;color:#0f62fe;padding-top:4px}
.theme h2{font-size:23px;line-height:1.45;font-weight:600;color:#0043ce;margin:0}
:deep(blockquote){border:0!important;padding:0!important;margin:0!important;background:none!important}
:deep(.quote-en){font-size:22px;line-height:1.38;font-weight:500;color:#161616;letter-spacing:normal;margin:0}
:deep(.quote-zh){font-size:21px;line-height:1.45;color:#0043ce;margin:8px 0 0;font-weight:400}
.scope{font-size:11px;line-height:1.4;color:#525252;margin:5px 0 0}
.speaker{font-size:12px;color:#525252;margin:0;line-height:1.3}
.attribution{font-size:12px;line-height:1.45;color:#525252;margin:6px 0 0}
.attribution a{color:inherit;text-decoration:none;border-bottom:1px dotted #8d8d8d}
.attribution a:hover{color:#0043ce}
.actions{display:flex;justify-content:flex-end;gap:18px;margin-top:8px}
.actions button{font-size:12px;color:#525252;background:transparent;border-bottom:1px solid #a8a8a8;padding:2px 0}
.actions button:hover{color:#0043ce}.actions button:focus-visible{outline:2px solid #0f62fe;outline-offset:3px}
@media print{.actions{display:none}}
</style>
