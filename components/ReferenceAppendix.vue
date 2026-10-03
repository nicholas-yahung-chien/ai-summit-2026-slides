<script setup>
const props = defineProps({
  page: { type: [Number, String], required: true },
})

const sourceGroups = {
  evolution1: {
    refs: [
      { html: 'Turing, A. M. (1950). Computing machinery and intelligence. <em>Mind, 59</em>(236), 433–460. https://doi.org/10.1093/mind/LIX.236.433', url: 'https://academic.oup.com/mind/article/LIX/236/433/986238' },
      { html: 'Feigenbaum, E. A. (n.d.). <em>A. M. Turing Award oral history interview</em> [Transcript]. Association for Computing Machinery.', url: 'https://amturing.acm.org/pdf/FiegenbaumTuringTranscript.pdf' },
      { html: 'IBM. (n.d.). <em>Deep Blue</em>. IBM History.', url: 'https://www.ibm.com/history/deep-blue' },
      { html: 'IBM. (n.d.). <em>Watson, Jeopardy! champion</em>. IBM History.', url: 'https://www.ibm.com/history/watson-jeopardy' },
      { html: 'Silver, D., Huang, A., Maddison, C. J., Guez, A., Sifre, L., van den Driessche, G., Schrittwieser, J., Antonoglou, I., Panneershelvam, V., Lanctot, M., Dieleman, S., Grewe, D., Nham, J., Kalchbrenner, N., Sutskever, I., Lillicrap, T., Leach, M., Kavukcuoglu, K., Graepel, T., &amp; Hassabis, D. (2016). Mastering the game of Go with deep neural networks and tree search. <em>Nature, 529</em>, 484–489. https://doi.org/10.1038/nature16961', url: 'https://www.nature.com/articles/nature16961' },
      { html: 'Brown, T. B., Mann, B., Ryder, N., Subbiah, M., Kaplan, J., Dhariwal, P., Neelakantan, A., Shyam, P., Sastry, G., Askell, A., Agarwal, S., Herbert-Voss, A., Krueger, G., Henighan, T., Child, R., Ramesh, A., Ziegler, D. M., Wu, J., Winter, C., … Amodei, D. (2020). Language models are few-shot learners. <em>Advances in Neural Information Processing Systems, 33</em>, 1877–1901.', url: 'https://arxiv.org/abs/2005.14165' },
      { html: 'Jumper, J., Evans, R., Pritzel, A., Green, T., Figurnov, M., Ronneberger, O., Tunyasuvunakool, K., Bates, R., Žídek, A., Potapenko, A., Bridgland, A., Meyer, C., Kohl, S. A. A., Ballard, A. J., Cowie, A., Romera-Paredes, B., Nikolov, S., Jain, R., Adler, J., … Hassabis, D. (2021). Highly accurate protein structure prediction with AlphaFold. <em>Nature, 596</em>, 583–589. https://doi.org/10.1038/s41586-021-03819-2', url: 'https://www.nature.com/articles/s41586-021-03819-2' },
      { html: 'OpenAI. (2022, November 30). <em>Introducing ChatGPT</em>.', url: 'https://openai.com/index/chatgpt/' },
      { html: 'Gao, Y., Xiong, Y., Gao, X., Jia, K., Pan, J., Bi, Y., Dai, Y., Sun, J., Wang, M., &amp; Wang, H. (2023). <em>Retrieval-augmented generation for large language models: A survey</em> [Preprint]. arXiv. https://doi.org/10.48550/arXiv.2312.10997', url: 'https://arxiv.org/abs/2312.10997' },
      { html: 'Anthropic. (2024, December 19). <em>Building effective agents</em>.', url: 'https://www.anthropic.com/engineering/building-effective-agents' },
    ],
  },
  evolution2: {
    refs: [
      { html: 'IBM. (2025). <em>What is vibe coding?</em> IBM Think.', url: 'https://www.ibm.com/think/topics/vibe-coding' },
      { html: 'GitHub. (2026, February 5). <em>Continuous AI in practice: What developers can automate today with agentic CI</em>.', url: 'https://github.blog/ai-and-ml/generative-ai/continuous-ai-in-practice-what-developers-can-automate-today-with-agentic-ci/' },
      { html: 'Anthropic. (2026, February 5). <em>Building a C compiler with a team of parallel Claudes</em>.', url: 'https://www.anthropic.com/engineering/building-c-compiler' },
      { html: 'Anthropic. (2026, March 24). <em>Harness design for long-running apps</em>.', url: 'https://www.anthropic.com/engineering/harness-design-long-running-apps' },
      { html: 'Anthropic. (2026, April 8). <em>Building managed agents</em>.', url: 'https://www.anthropic.com/engineering/managed-agents' },
      { html: 'Google. (2026, May 19). <em>Search announcements from Google I/O 2026</em>.', url: 'https://blog.google/products-and-platforms/products/search/search-io-2026/' },
      { html: 'Johnston, D., Holtz, D., Richmond, A. M., Ong, C., Tambe, P., &amp; Chatterji, A. (2026). <em>The shift to agentic AI: Evidence from Codex</em> [Preprint]. arXiv. https://doi.org/10.48550/arXiv.2606.26959', url: 'https://arxiv.org/abs/2606.26959' },
      { html: 'Hugging Face. (2026, August 14). <em>State of open models: Summer 2026</em>.', url: 'https://huggingface.co/blog/state-of-open-models-summer-2026' },
    ],
  },
  methodology: {
    refs: [
      { html: 'Osmani, A. (2026, January 4). <em>My LLM coding workflow going into 2026</em>. AddyOsmani.com.', url: 'https://addyosmani.com/blog/ai-coding-workflow/' },
      { html: 'Osmani, A. (2026, April 19). <em>Agent harness engineering</em>. AddyOsmani.com.', url: 'https://addyosmani.com/blog/agent-harness-engineering/' },
      { html: 'Osmani, A. (2026, June 7). <em>Loop engineering</em>. AddyOsmani.com.', url: 'https://addyosmani.com/blog/loop-engineering/' },
      { html: 'Osmani, A. (2026, August 14). <em>Practical loop engineering</em>. AddyOsmani.com.', url: 'https://addyosmani.com/blog/practical-loop-engineering/' },
      { html: 'Pocock, M. (Host). (2026, August 19). <em>Working with agents—Uncle Bob Martin</em> [Video]. YouTube.', url: 'https://www.youtube.com/watch?v=zcLPGC-tvgk&t=896s' },
      { html: 'Martin, R. C. (2026, September 12). <em>Rethinking harnesses</em> [Video post]. X.', url: 'https://x.com/unclebobmartin/status/2098744156709441896' },
    ],
  },
  research: {
    refs: [
      { html: 'Kim, Y., Gu, K., Park, C., Park, C., Schmidgall, S., Heydari, A. A., Yan, Y., Zhang, Z., Zhuang, Y., Liu, Y., Malhotra, M., Liang, P. P., Park, H. W., Yang, Y., Xu, X., Du, Y., Patel, S., Althoff, T., McDuff, D., &amp; Liu, X. (2026). <em>Towards a science of scaling agent systems</em> [Preprint, Version 3]. arXiv. https://doi.org/10.48550/arXiv.2512.08296', url: 'https://arxiv.org/pdf/2512.08296v3' },
      { html: 'Ong, I., Almahairi, A., Wu, V., Chiang, W.-L., Wu, T., Gonzalez, J. E., Kadous, M. W., &amp; Stoica, I. (2025). RouteLLM: Learning to route LLMs from preference data. In <em>Proceedings of the Thirteenth International Conference on Learning Representations</em>.', url: 'https://proceedings.iclr.cc/paper_files/paper/2025/hash/5503a7c69d48a2f86fc00b3dc09de686-Abstract-Conference.html' },
      { html: 'Lu, Y., Liu, R., Yuan, J., Cui, X., Zhang, S., Liu, H., &amp; Xing, J. (2025). <em>RouterArena: An open platform for comprehensive comparison of LLM routers</em> [Preprint, Version 3]. arXiv. https://doi.org/10.48550/arXiv.2510.00202', url: 'https://arxiv.org/pdf/2510.00202v3' },
      { html: 'Khanna, A. (2026, September 20). <em>Jev model routing: What 450 real calls revealed</em> [Benchmark report]. Vaaya.', url: 'https://vaaya.ai/blog/jev-ai-model-routing-vaaya-benchmark' },
      { html: 'robertn702. (2026, September 25). <em>Jev router: Consolidated Astra evaluation</em> [Benchmark report; preselected holdout]. GitHub.', url: 'https://github.com/robertn702/opencode-jev-router/blob/main/eval/results/router-consolidated-2026-09-25.md' },
      { html: 'Vaaya. (2026). <em>Jev model routing benchmark summary</em> [Data set].', url: 'https://vaaya.ai/blog/assets/jev-model-routing-current/summary.json' },
    ],
  },
  routingDocs: {
    refs: [
      { html: 'Maxim AI. (n.d.). <em>Routing rules</em>. Bifrost documentation.', url: 'https://docs.getbifrost.ai/providers/routing-rules' },
      { html: 'Maxim AI. (n.d.). <em>Complexity router</em>. Bifrost documentation.', url: 'https://docs.getbifrost.ai/features/governance/complexity-router' },
      { html: 'Maxim AI. (n.d.). <em>Adaptive load balancing</em>. Bifrost documentation.', url: 'https://docs.getbifrost.ai/enterprise/adaptive-load-balancing' },
      { html: 'TypeSafe AI. (n.d.). <em>Intent routing</em>. Jev documentation.', url: 'https://docs.typesafe.ai/patterns/intent-routing' },
      { html: 'TypeSafe AI. (n.d.). <em>Confidence</em>. Jev documentation.', url: 'https://docs.typesafe.ai/confidence' },
      { html: 'TypeSafe AI. (n.d.). <em>Models</em>. Jev documentation.', url: 'https://docs.typesafe.ai/models' },
      { html: 'TypeSafe AI. (n.d.). <em>Official repositories</em>. GitHub.', url: 'https://github.com/typesafe-ai' },
      { html: 'Maxim AI. (n.d.). <em>MCP Code Mode benchmark report</em> [Technical report]. GitHub.', url: 'https://github.com/maximhq/bifrost-benchmarking/blob/main/mcp-code-mode-benchmark/benchmark_report.md' },
      { html: 'ENTERPILOT. (2026). <em>AI gateway reproducible benchmark</em> [Benchmark code and results]. GitHub.', url: 'https://github.com/ENTERPILOT/ai-gateway-reproducible-benchmark' },
    ],
  },
  bob: {
    refs: [
      { html: 'IBM. (2026). <em>Bob on-prem architecture for GA</em> [Architecture diagram]. Internal technical material.' },
      { html: 'McDaniel, A. (2026). <em>Measuring the ROI of AI-assisted development, and how IBM did it</em>. IBM Think.', url: 'https://www.ibm.com/think/perspectives/measuring-roi-ai-assisted-development-how-ibm-did-it' },
      { html: 'IDC. (2026, May). <em>IBM Bob advances IBM’s position in agentic SDLC development</em> [Analyst report, Document IA20260502000000060].' },
      { html: 'IBM. (2026). <em>The new pace of modernization</em> [Blue Pearl client case study].', url: 'https://www.ibm.com/case-studies/blue-pearl-bob' },
      { html: 'IBM Japan. (2026). <em>IBM Bobコスト・ROI優位性</em> [Internal comparison material, Slide 2].' },
      { html: 'Anthropic. (2026). <em>Pricing</em> [Model rates, prompt caching, and coding-session example].', url: 'https://platform.claude.com/docs/en/about-claude/pricing#worked-example' },
      { html: 'IBM. (2026). <em>Supported models: Model Gateway</em>. IBM Bob documentation.', url: 'https://bob.ibm.com/docs/ide/enterprise/on-premises/model-gateway/supported-models' },
      { html: 'IBM. (n.d.). <em>Premium Package for Z overview</em>. IBM Bob documentation.', url: 'https://bob.ibm.com/docs/ide/premium-packages/bob-for-z/bob-for-z-index' },
      { html: 'IBM. (n.d.). <em>Premium Package for Z workflows</em>. IBM Bob documentation.', url: 'https://bob.ibm.com/docs/ide/premium-packages/bob-for-z/workflows' },
      { html: 'IBM. (n.d.). <em>Welcome to IBM Bob</em>. IBM Bob documentation.', url: 'https://bob.ibm.com/docs/ide' },
      { html: 'IBM. (2026, July 9). <em>IBM Bob advances agentic software development with Premium Packages and a new enterprise AI foundation</em>. IBM Newsroom.', url: 'https://www.ibm.com/new/announcements/ibm-bob-expands-with-premium-packages-new-architecture-and-greater-enterprise-control' },
      { html: 'OpenAI. (2026). <em>GPT-5.6 Sol</em> [Model documentation].', url: 'https://developers.openai.com/api/docs/models/gpt-5.6-sol' },
    ],
  },
  lifecycle: {
    refs: [
      { html: 'Amazon Web Services. (n.d.). <em>AI-driven development life cycle</em>. AWS DevOps Blog.', url: 'https://aws.amazon.com/blogs/devops/ai-driven-development-life-cycle/' },
      { html: 'GitHub. (n.d.). <em>Agentic spec-driven development</em>. Spec Kit documentation.', url: 'https://github.github.com/spec-kit/reference/agentic-sdd.html' },
      { html: 'Kiro. (n.d.). <em>Specs</em>. Kiro documentation.', url: 'https://kiro.dev/docs/specs/' },
      { html: 'IBM. (n.d.). <em>AI pair programming with IBM Bob</em>. IBM Bob documentation.', url: 'https://bob.ibm.com/docs/ide/tutorials/ai-pair-programming-with-ibm-bob' },
      { html: 'Anthropic. (n.d.). <em>Claude Code best practices</em>.', url: 'https://code.claude.com/docs/en/best-practices' },
      { html: 'GitHub. (n.d.). <em>About GitHub Copilot coding agent</em>. GitHub Docs.', url: 'https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent' },
      { html: 'GitHub. (2026). <em>Automate repository tasks with GitHub Agentic Workflows</em>. GitHub Blog.', url: 'https://github.blog/ai-and-ml/automate-repository-tasks-with-github-agentic-workflows/' },
      { html: 'Garg, R. (2026, March 3). <em>Design-first collaboration</em>. MartinFowler.com.', url: 'https://www.martinfowler.com/articles/reduce-friction-ai/design-first-collaboration.html' },
      { html: 'Joshi, U., Parsons, R., &amp; Fowler, M. (2026, January 21). <em>Conversation: LLMs and the what/how loop</em>. MartinFowler.com.', url: 'https://martinfowler.com/articles/convo-what-how.html' },
    ],
  },
}

const plain = value => value.replace(/<[^>]+>/g, '')
const pageSize = 30
const allReferences = [...new Map(
  Object.values(sourceGroups)
    .flatMap(group => group.refs)
    .map(reference => [reference.url || plain(reference.html), reference]),
).values()].sort((a, b) => plain(a.html).localeCompare(plain(b.html), 'en'))
const pageIndex = Math.max(0, Number(props.page) - 1)
const references = allReferences.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)
</script>

<template>
  <section class="reference-appendix">
    <h1 v-if="pageIndex === 0">附錄 A 引用參考資料</h1>
    <div class="reference-columns" lang="en">
      <article v-for="reference in references" :key="reference.html">
        <a v-if="reference.url" :href="reference.url" target="_blank" rel="noopener" v-html="reference.html"></a>
        <p v-else v-html="reference.html"></p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.reference-appendix {
  padding-top: 2px;
}

.reference-appendix h1 {
  margin: 0 0 18px;
  font-size: 30px;
  line-height: 1.2;
  letter-spacing: -.02em;
}

.reference-columns {
  column-count: 2;
  column-gap: 42px;
}

article {
  break-inside: avoid;
  margin: 0 0 12px;
  color: #393939;
  font-size: 12px;
  line-height: 1.38;
}

a,
article p {
  display: block;
  margin: 0;
  padding-left: 14px;
  color: inherit;
  font: inherit;
  border-bottom: 0 !important;
  text-decoration: none;
  text-indent: -14px;
}

a:hover { color: #0043ce; }
a:focus-visible { outline: 2px solid #0f62fe; outline-offset: 3px; }
:deep(em) { font-style: italic; }
</style>
