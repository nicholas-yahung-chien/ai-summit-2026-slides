<script setup lang="ts">
// Activate only after the original video's quotation and screenshot are verified.
defineProps<{ screenshot: string; english: string; chinese: string }>()
</script>

<template>
  <section class="reflection-story">
    <p class="reflection-kicker">UNCLE BOB · RETHINKING HARNESSES</p>
    <div class="reflection-columns">
      <figure>
        <img :src="screenshot" alt="Uncle Bob Martin 發布 Rethinking Harnesses 的原始 X 貼文截圖" />
        <figcaption><time datetime="2026-09-12">2026.09.12</time><span>@unclebobmartin</span></figcaption>
      </figure>
      <div class="reflection-quote">
        <p class="reflection-label">重新思考 Harness</p>
        <AnimatedQuote :english="english" :chinese="chinese" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.reflection-kicker { color:#0043ce; font-size:17px; letter-spacing:.12em; font-weight:500; }
.reflection-columns { display:grid; grid-template-columns:450px 1fr; gap:48px; margin-top:25px; align-items:center; }
figure { margin:0; }
figure img { width:450px; height:460px; object-fit:contain; object-position:top center; }
figcaption { display:flex; align-items:baseline; justify-content:space-between; border-top:1px solid #c6c6c6; margin-top:12px; padding-top:10px; }
figcaption time { color:#0043ce; font-size:25px; font-weight:500; }
figcaption span { color:#525252; font-size:16px; }
.reflection-label { font-size:24px; color:#525252; margin-bottom:26px; }
.reflection-quote { border-left:3px solid #0f62fe; padding-left:32px; }
.reflection-quote :deep(.quote-en) { font-size:35px; line-height:1.3; }
.reflection-quote :deep(.quote-zh) { font-size:29px; line-height:1.55; margin-top:25px; }
</style>
