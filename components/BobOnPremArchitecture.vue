<script setup lang="ts">
import architecture from '../assets/bob-onprem-architecture.png'
</script>

<template>
  <figure class="bob-onprem-figure">
    <img :src="architecture" alt="IBM Bob On-prem 架構：前端、OpenShift 服務與資料層，以及 Bifrost 連接本機 OpenShift AI、公有雲與私有基礎設施三種模型部署選項。" />
  </figure>
</template>

<style scoped>
.bob-onprem-figure { position:absolute; inset:12px 14px 70px; margin:0; display:flex; align-items:center; justify-content:center; }
.bob-onprem-figure img { width:100%; height:100%; object-fit:contain; }
</style>
