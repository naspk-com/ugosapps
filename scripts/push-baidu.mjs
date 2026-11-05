/**
 * 百度主动推送：把 dist/sitemap.xml 中的 URL 推送给百度站长平台。
 *
 * 用法：
 *   pnpm run build
 *   BAIDU_PUSH_TOKEN=你的token node scripts/push-baidu.mjs [数量上限]
 *
 * token 通过环境变量传入，不写入仓库。新站每日配额通常为 10 条，
 * 可用第三个参数控制本次推送条数（默认按配额上限全量尝试，超出会返回 over quota）。
 */
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const here = path.dirname(fileURLToPath(import.meta.url))
const site = 'https://ugosapps.naspk.com'
const token = process.env.BAIDU_PUSH_TOKEN

if (!token) {
  console.error('缺少环境变量 BAIDU_PUSH_TOKEN')
  process.exit(1)
}

const xml = await readFile(path.join(here, '..', 'dist', 'sitemap.xml'), 'utf8')
const all = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1])

/** 优先级：中文首页 > 中文应用页 > 英文页 > 文档页，让有限配额先推重要页面。 */
const score = (url) => {
  if (url === `${site}/`) return 0
  const isEn = url.includes('/en/')
  const isDoc = /\.html$/.test(url) && !/index\.html$/.test(url)
  if (isDoc) return 3
  if (isEn) return 2
  return 1
}
const urls = all.sort((a, b) => score(a) - score(b))

const limit = Number.parseInt(process.argv[2] ?? '', 10)
const batch = Number.isFinite(limit) && limit > 0 ? urls.slice(0, limit) : urls

const resp = await fetch(
  `http://data.zz.baidu.com/urls?site=${encodeURIComponent(site)}&token=${token}`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    body: batch.join('\n'),
  },
)
const result = await resp.json()

if (result.success != null) {
  console.log(`推送成功 ${result.success} 条，今日剩余配额 ${result.remain}`)
} else {
  console.error(`推送失败：${result.message ?? JSON.stringify(result)}`)
  process.exit(1)
}
