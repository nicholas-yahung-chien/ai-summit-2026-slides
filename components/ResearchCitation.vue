<script setup>
defineProps({ source: { type:String, required:true } })
</script>
<template>
  <div class="research-citation" lang="en">
    <template v-if="source === 'agents'">
      <p class="entry">Kim, Y., Gu, K., Park, C., Park, C., Schmidgall, S., Heydari, A. A., Yan, Y., Zhang, Z., Zhuang, Y., Liu, Y., Malhotra, M., Liang, P. P., Park, H. W., Yang, Y., Xu, X., Du, Y., Patel, S., Althoff, T., McDuff, D., &amp; Liu, X. (2026). <em>Towards a science of scaling agent systems</em> [Preprint]. arXiv. <a href="https://doi.org/10.48550/arXiv.2512.08296" target="_blank" rel="noopener">https://doi.org/10.48550/arXiv.2512.08296</a></p>
      <p class="locator"><span lang="zh-Hant">資料位置：</span><a href="https://arxiv.org/pdf/2512.08296v3" target="_blank" rel="noopener">§4, pp. 13–14; §5; Appendix F</a>. <span lang="zh-Hant">使用版本：</span>v3 (2026-04-08).</p>
    </template>
    <template v-else-if="source === 'routing'">
      <p class="entry">Ong, I., Almahairi, A., Wu, V., Chiang, W.-L., Wu, T., Gonzalez, J. E., Kadous, M. W., &amp; Stoica, I. (2025). RouteLLM: Learning to route LLMs from preference data. In <em>Proceedings of the Thirteenth International Conference on Learning Representations</em>. <a href="https://proceedings.iclr.cc/paper_files/paper/2025/hash/5503a7c69d48a2f86fc00b3dc09de686-Abstract-Conference.html" target="_blank" rel="noopener">https://proceedings.iclr.cc/paper_files/paper/2025/hash/5503a7c69d48a2f86fc00b3dc09de686-Abstract-Conference.html</a></p>
      <p class="locator"><span lang="zh-Hant">資料位置：</span><a href="https://proceedings.iclr.cc/paper_files/paper/2025/file/5503a7c69d48a2f86fc00b3dc09de686-Paper-Conference.pdf" target="_blank" rel="noopener">Tables 1, 7; Appendix D</a>. <span lang="zh-Hant">使用版本：</span>ICLR 2025 proceedings.</p>
    </template>
    <template v-else>
      <p class="entry">Lu, Y., Liu, R., Yuan, J., Cui, X., Zhang, S., Liu, H., &amp; Xing, J. (2025). <em>RouterArena: An open platform for comprehensive comparison of LLM routers</em> [Preprint]. arXiv. <a href="https://doi.org/10.48550/arXiv.2510.00202" target="_blank" rel="noopener">https://doi.org/10.48550/arXiv.2510.00202</a></p>
      <p class="locator"><span lang="zh-Hant">資料位置：</span><a href="https://arxiv.org/pdf/2510.00202v3" target="_blank" rel="noopener">Table 6; §6.3; §8</a>. <span lang="zh-Hant">使用版本：</span>v3 (2025-11-27).</p>
    </template>
  </div>
</template>
<style scoped>
.research-citation {position:absolute;left:72px;right:72px;bottom:83px;border-top:1px solid #c6c6c6;padding-top:12px;color:#393939;font-size:15px;font-weight:400;line-height:1.45}
.research-citation p {font:inherit;margin:0}
.research-citation .entry {padding-left:18px;text-indent:-18px}
.research-citation .locator {margin-top:7px}
.research-citation a {color:#0043ce;text-decoration:none;overflow-wrap:anywhere}
.research-citation a:hover {text-decoration:underline}
.research-citation a:focus-visible {outline:2px solid #0f62fe;outline-offset:2px}
</style>
