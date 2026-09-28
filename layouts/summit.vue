<script setup lang="ts">
import { useSlideContext } from '@slidev/client'
import ibmLogo from '../assets/ibm-logo.png'
const { $page } = useSlideContext()
</script>

<template>
  <main class="slidev-layout summit-layout">
    <slot />
    <footer class="slide-footer">
      <span>AI SUMMIT <b>2026</b></span>
      <span>10.23 <i></i> BUILD AI</span>
      <span class="page-number">{{ String($page).padStart(2, '0') }}</span>
      <img class="ibm-logo" :src="ibmLogo" alt="IBM" width="80" height="32" />
    </footer>
  </main>
</template>
