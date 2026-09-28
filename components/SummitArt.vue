<script setup lang="ts">
// Original vector study inspired by the supplied key visual's layered rhythm.
// This is not the event's official logo or a reproduction of the supplied image.
const bands = Array.from({ length: 55 }, (_, i) => {
  const t = i / 54
  return {
    x: 135 + t * 325,
    y: 480 - t * 315 + Math.sin(t * Math.PI * 2) * 28,
    rx: 114 + Math.sin(t * Math.PI) * 35,
    ry: 34 + Math.sin(t * Math.PI * 1.5) * 10,
    angle: -28 + Math.sin(t * Math.PI * 2) * 40,
    color: t < .28 ? '#009d9a' : t < .65 ? '#0f62fe' : '#a56eff',
  }
})
</script>

<template>
  <svg viewBox="0 0 640 650" fill="none" aria-hidden="true" class="summit-sculpture">
    <g v-for="(band, i) in bands" :key="i" :transform="`translate(${band.x} ${band.y}) rotate(${band.angle})`">
      <ellipse :rx="band.rx" :ry="band.ry" fill="#f4f4f4" :stroke="band.color" stroke-width="2.2" />
      <ellipse :rx="band.rx * .62" :ry="band.ry * .62" :stroke="band.color" stroke-width="1.3" opacity=".65" />
      <path :d="`M ${-band.rx} 0 A ${band.rx} ${band.ry} 0 0 0 ${band.rx} 0`" :stroke="band.color" stroke-width="5" />
    </g>
  </svg>
</template>
