<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useSlideContext } from '@slidev/client'

const props = withDefaults(defineProps<{ english: string; chinese: string; delay?: number; controls?: boolean; showAll?: boolean }>(), { delay: 0, controls: true, showAll: false })
const { $page, $nav, $renderContext } = useSlideContext()
const active = computed(() => $page.value === $nav.value.currentSlideNo)
const replay = ref(0)
const instant = ref(false)
const englishWords = computed(() => {
  let index = 0
  return props.english.split(/(\s+)/).map(word => ({
    space: /^\s+$/.test(word),
    chars: Array.from(word).map(char => ({ char, index: index++ })),
  }))
})
const chineseChars = computed(() => Array.from(props.chinese))
const translationDelay = computed(() => Array.from(props.english).length * 23 + 500)
watch(active, value => { if (value) { replay.value++; instant.value = false } })
function restart() { instant.value = false; replay.value++ }
</script>

<template>
  <div class="animated-quote" :class="{ instant: instant || showAll || !active || $renderContext === 'print' }" :style="{ '--quote-delay': `${delay}ms` }">
    <blockquote :key="replay" :aria-label="english + ' ' + chinese">
      <p class="quote-en" lang="en" aria-hidden="true"><span class="quotation-mark">“</span><template v-for="(word, wi) in englishWords" :key="wi"><span :class="word.space ? 'quote-space' : 'quote-word'"><span v-for="letter in word.chars" :key="letter.index" class="quote-letter" :style="{ animationDelay: `${delay + 350 + letter.index * 23}ms` }">{{ letter.char }}</span></span></template><span class="quotation-mark">”</span></p>
      <p class="quote-zh" lang="zh-Hant" aria-hidden="true"><span v-for="(char, i) in chineseChars" :key="i" class="quote-letter" :style="{ animationDelay: `${delay + translationDelay + i * 48}ms` }">{{ char }}</span></p>
    </blockquote>
    <div v-if="controls" class="quote-actions" @click.stop @pointerdown.stop>
      <button type="button" @click="restart">重播引文 ↻</button>
      <button type="button" @click="instant = true">顯示全文</button>
    </div>
  </div>
</template>

<style scoped>
.animated-quote { position:relative; }
blockquote { margin:0; padding:0; border:0; background:none; font-style:normal; }
.quote-en { font-size:38px; font-weight:500; line-height:1.28; letter-spacing:-.025em; color:#0043ce; }
.quote-zh { font-size:29px; line-height:1.5; margin-top:18px; color:#161616; font-weight:500; }
.quote-word { display:inline-block; white-space:nowrap; }
.quote-space { white-space:pre; }
.quote-letter { display:inline-block; opacity:0; animation:quote-rise .42s cubic-bezier(.2,.65,.3,1) both; }
.quotation-mark { color:#0f62fe; }
.quote-actions { display:flex; gap:18px; margin-top:20px; }
.quote-actions button { border:0; border-bottom:1px solid #a8a8a8; background:transparent; color:#525252; padding:3px 0; font:inherit; font-size:14px; cursor:pointer; }
.quote-actions button:hover { color:#0043ce; border-color:#0043ce; }
.quote-actions button:focus-visible { outline:2px solid #0f62fe; outline-offset:4px; }
.instant .quote-letter { animation:none; opacity:1; transform:none; }
@keyframes quote-rise { from { opacity:0; transform:translateY(9px); } to { opacity:1; transform:translateY(0); } }
@media (prefers-reduced-motion:reduce) { .quote-letter { animation:none; opacity:1; } }
@media print { .quote-letter { animation:none; opacity:1; } .quote-actions { display:none; } }
</style>
