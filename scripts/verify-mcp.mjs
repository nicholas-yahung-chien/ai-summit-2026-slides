import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js'
import { fileURLToPath } from 'node:url'
const root = fileURLToPath(new URL('../', import.meta.url))
const client = new Client({ name: 'summit-mcp-verification', version: '1.0.0' })
const transport = new StdioClientTransport({
  command: process.execPath,
  args: [fileURLToPath(new URL('../node_modules/@slidev/cli/bin/slidev.mjs', import.meta.url)), 'mcp', fileURLToPath(new URL('../slides.md', import.meta.url))],
  cwd: root,
  stderr: 'pipe',
})
try {
  await client.connect(transport, { timeout: 120000 })
  const { tools } = await client.listTools()
  console.log('MCP tools:', tools.map(tool => tool.name).join(', '))
  const info = tools.find(tool => /get.info/.test(tool.name))
  if (!info) throw new Error('Slidev info tool was not discovered')
  const result = await client.callTool({ name: info.name, arguments: {} })
  if (result.isError) throw new Error(JSON.stringify(result))
  console.log(JSON.stringify(result, null, 2))
} finally {
  await client.close()
}
