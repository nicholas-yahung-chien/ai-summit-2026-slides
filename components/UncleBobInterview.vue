<script setup lang="ts">
import interviewFrame from '../assets/uncle-bob-cover.jpg'
</script>

<template>
  <section class="interview-story">
    <div class="interview-heading"><span>UNCLE BOB · THE HARNESS</span><span>Uncle Bob 的 Harness 設計原則</span></div>
    <figure>
      <img :src="interviewFrame" alt="Uncle Bob on Software Fundamentals and AI 專訪封面，Uncle Bob 與 Matt Pocock" />
      <figcaption><time datetime="2026-08-19">2026.08.19</time><span>Matt Pocock × Robert C. Martin</span></figcaption>
    </figure>
    <AnimatedQuote english="The key with agents is to trim that initial prompt down to its absolute minimum … and then do deterministic tools after the fact" chinese="使用代理的關鍵，是把一開始的提示縮到最精簡……再交給按固定規則運作的工具做後續檢查" />
  </section>
</template>

<style scoped>
.interview-story { width:100%; }
.interview-heading { display:flex; justify-content:space-between; align-items:center; font-size:17px; color:#0043ce; font-weight:500; letter-spacing:.12em; margin-bottom:14px; }
figure { width:576px; max-width:100%; margin:0 auto 18px; }
figure img { display:block; width:100%; height:auto; aspect-ratio:16/9; }
figcaption { display:flex; align-items:center; gap:24px; margin-top:12px; font-size:14px; color:#525252; }
figcaption > span:last-child { margin-left:auto; }
figcaption time { color:#0043ce; font-size:23px; font-weight:600; font-variant-numeric:tabular-nums; letter-spacing:.04em; text-decoration:underline; text-decoration-thickness:3px; text-underline-offset:6px; }
.interview-story :deep(.quote-en) { font-size:32px; line-height:1.3; }
.interview-story :deep(.quote-zh) { font-size:26px; line-height:1.5; margin-top:14px; }
</style>
