<template>
  <section class="pair-perspectives">
    <p class="eyebrow">08 · AI PAIR PROGRAMMING</p>
    <h1>AI 結對程式設計的價值：共同思考、持續改善</h1>
    <div class="perspectives">
      <article>
        <div class="theme"><span>01</span><h2>共同掌握<br>設計方向</h2></div>
        <div class="quotation">
          <blockquote lang="en">“The developer's role changes from reverse-engineering invisible design decisions to steering them explicitly.”</blockquote>
          <p class="translation">開發者的角色，從反推隱藏的設計決策，轉為明確引導這些決策</p>
          <p class="attribution">Garg, R. (2026, March 3). <a href="https://www.martinfowler.com/articles/reduce-friction-ai/design-first-collaboration.html" target="_blank" rel="noopener"><cite>Design-first collaboration</cite></a>. MartinFowler.com.</p>
        </div>
      </article>
      <article>
        <div class="theme"><span>02</span><h2>更靈活地<br>探索解法</h2></div>
        <div class="quotation">
          <blockquote lang="en">“Since LLMs can operate at a lower level of precision they allow us to explore abstractions with more fluidity.”</blockquote>
          <p class="translation">LLM 能在較低的精確度下運作，讓我們更靈活地探索抽象概念</p>
          <p class="speaker">— Martin Fowler</p>
          <p class="attribution">Joshi, U., Parsons, R., &amp; Fowler, M. (2026, January 21). <a href="https://martinfowler.com/articles/convo-what-how.html" target="_blank" rel="noopener"><cite>Conversation: LLMs and the what/how loop</cite></a>. MartinFowler.com.</p>
        </div>
      </article>
      <article>
        <div class="theme"><span>03</span><h2>讓協作經驗<br>成為品質改善</h2></div>
        <div class="quotation">
          <blockquote lang="en">“We continuously improve the quality of the outcomes we get by continuously improving the harness.”</blockquote>
          <p class="translation">透過持續改善 harness，我們也持續提升成果品質</p>
          <p class="attribution">Morris, K. (2026, March 4). <a href="https://martinfowler.com/articles/exploring-gen-ai/humans-and-agents.html" target="_blank" rel="noopener"><cite>Humans and agents in software engineering loops</cite></a>. MartinFowler.com.</p>
        </div>
      </article>
    </div>
    <p class="translation-note">中文為原文翻譯</p>
  </section>
</template>

<style scoped>
h1{font-size:38px!important;line-height:1.25!important;letter-spacing:-1px;margin:12px 0 16px!important}
.perspectives{border-top:1px solid #a8b7c9}
article{display:grid;grid-template-columns:190px 1fr;gap:28px;padding:12px 0 12px;border-bottom:1px solid #d6dce4}
.theme{display:flex;gap:14px;border-right:2px solid #a6c8ff}
.theme span{font-size:16px;color:#0f62fe;padding-top:4px}
.theme h2{font-size:23px;line-height:1.45;font-weight:600;color:#0043ce;margin:0}
blockquote{font-size:22px;line-height:1.38;font-weight:500;color:#161616;border:0!important;padding:0!important;margin:0!important;background:none!important}
.translation{font-size:21px;line-height:1.45;color:#0043ce;margin:8px 0 0}
.speaker{font-size:12px;color:#525252;margin:0;line-height:1.3}
.attribution{font-size:12px;line-height:1.45;color:#525252;margin:6px 0 0}
.attribution a{color:inherit;text-decoration:none;border-bottom:1px dotted #8d8d8d}
.attribution a:hover{color:#0043ce}
.translation-note{font-size:12px;color:#6f6f6f;margin:8px 0 0;text-align:right}
</style>
