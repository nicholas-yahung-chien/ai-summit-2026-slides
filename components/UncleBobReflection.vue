<script setup lang="ts">
import postImage from '../assets/uncle-bob-post.jpg'
defineProps<{ english?: string; chinese?: string }>()
</script>

<template>
  <section class="reflection-story">
    <p class="reflection-kicker">UNCLE BOB · RETHINKING HARNESSES</p>
    <div class="reflection-columns">
      <figure>
        <a href="https://x.com/unclebobmartin/status/2098744156709441896" target="_blank" rel="noopener"><img :src="postImage" alt="Uncle Bob Martin 發布 Rethinking Harnesses 的原始 X 貼文截圖，由使用者提供" /></a>
        <figcaption><time datetime="2026-09-12">2026.09.12</time><span>@unclebobmartin</span></figcaption>
      </figure>
      <div class="reflection-quote">
        <template v-if="english && chinese">
          <p class="reflection-label">當約束成為負擔</p>
          <AnimatedQuote :english="english" :chinese="chinese" />
        </template>
        <template v-else>
          <p class="reflection-label">Morning Bathrobe Rant · 貼文主題</p>
          <h2 class="reflection-title">Rethinking<br>Harnesses.</h2>
          <p class="reflection-translation">重新思考 Harness</p>
          <p class="verification-pending">影片原文與中文引用待核對</p>
        </template>
      </div>
    </div>
  </section>
</template>

<style scoped>
.reflection-kicker { color:#0043ce; font-size:17px; letter-spacing:.12em; font-weight:500; }
.reflection-columns { display:grid; grid-template-columns:395px 1fr; gap:60px; margin-top:20px; align-items:center; }
figure { margin:0; }
figure img { display:block; width:395px; height:475px; object-fit:contain; object-position:top center; }
figcaption { display:flex; align-items:baseline; justify-content:space-between; border-top:1px solid #c6c6c6; margin-top:12px; padding-top:10px; }
figcaption time { color:#0043ce; font-size:23px; font-weight:600; font-variant-numeric:tabular-nums; letter-spacing:.04em; text-decoration:underline; text-decoration-thickness:3px; text-underline-offset:6px; }
figcaption span { color:#525252; font-size:16px; }
.reflection-label { font-size:24px; color:#525252; margin-bottom:26px; }
.reflection-quote { border-left:3px solid #0f62fe; padding-left:32px; }
.reflection-title { font-size:60px; line-height:1.12; font-weight:500; color:#0043ce; letter-spacing:-.035em; }
.reflection-translation { font-size:30px; margin-top:26px; }
.verification-pending { font-size:16px; color:#6f6f6f; margin-top:35px; }
.reflection-quote :deep(.quote-en) { font-size:35px; line-height:1.3; }
.reflection-quote :deep(.quote-zh) { font-size:29px; line-height:1.55; margin-top:25px; }
</style>
