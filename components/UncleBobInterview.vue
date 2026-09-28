<script setup lang="ts">
import interviewFrame from '../assets/uncle-bob-interview.png'
</script>

<template>
  <section class="interview-story">
    <div class="interview-heading"><span>UNCLE BOB · THE HARNESS</span><time datetime="2026-08-19">2026.08.19</time></div>
    <figure>
      <img :src="interviewFrame" alt="Matt Pocock 與 Uncle Bob 在 Software Fundamentals in the Age of AI 專訪中的實際畫面" />
      <figcaption>Matt Pocock × Robert C. Martin <span>Software Fundamentals in the Age of AI</span></figcaption>
    </figure>
    <AnimatedQuote english="You must change the code until this tool says that it's okay." chinese="你必須持續修改程式碼，直到這個工具判定通過。" />
  </section>
</template>

<style scoped>
.interview-story { width:100%; }
.interview-heading { display:flex; justify-content:space-between; align-items:center; font-size:17px; color:#0043ce; font-weight:500; letter-spacing:.12em; margin-bottom:14px; }
.interview-heading time { font-size:21px; font-variant-numeric:tabular-nums; letter-spacing:.04em; }
figure { margin:0 0 23px; }
figure img { display:block; height:330px; width:100%; object-fit:contain; background:#161616; }
figcaption { display:flex; justify-content:space-between; margin-top:8px; font-size:14px; color:#525252; }
</style>
