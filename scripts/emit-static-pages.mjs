/**
 * Post-build step: materialise one static HTML file per public URL.
 *
 * The site is a client-rendered Vue SPA, but the app center and old documents
 * already link to concrete `.html` paths such as `/yun139/privacy.html`.
 * Copying the built `index.html` to every such path keeps those URLs working on
 * plain static hosting (EdgeOne Pages / ESA Pages) without rewrite rules, and
 * lets us give each URL its own title, description and canonical link.
 */
import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const dist = join(root, 'dist')
const site = 'https://ugosapps.naspk.com'

const apps = [
  { slug: 'yun139', zh: '移动云盘', en: 'China Mobile Cloud' },
  { slug: 'alipan', zh: '阿里云盘', en: 'Alibaba Cloud Drive' },
  { slug: 'cloud189', zh: '天翼云盘', en: 'Tianyi Cloud Drive' },
  { slug: 'guangyapan', zh: '光鸭云盘', en: 'Guangya Drive' },
  { slug: 'pan115', zh: '115 网盘', en: '115 Drive' },
  { slug: 'pan123', zh: '123 云盘', en: '123 Cloud Drive' },
  { slug: 'quark', zh: '夸克网盘', en: 'Quark Drive' },
  { slug: 'thunder', zh: '迅雷云盘', en: 'Thunder Drive' },
  { slug: 'ucpan', zh: 'UC 网盘', en: 'UC Drive' },
  { slug: 'wopan', zh: '联通云盘', en: 'Unicom Cloud Drive' },
  {
    slug: 'unilink',
    zh: '域联 UniLink',
    en: 'UniLink',
    descs: {
      privacy: {
        zh: 'API 凭据、域名与解析数据、证书私钥、日志与 AI 功能数据的处理方式。',
        en: 'How API credentials, domain and DNS data, private keys, logs and AI feature data are handled.',
      },
      terms: {
        zh: '闭源软件的使用许可、DNS 变更风险、第三方服务与责任限制。',
        en: 'License grant, DNS change risk, third-party services and liability limits.',
      },
      'third-party': {
        zh: 'DNS 服务商、证书颁发机构、开源组件与专有组件的许可说明。',
        en: 'DNS providers, certificate authorities, open-source and proprietary components.',
      },
      support: {
        zh: '凭据配置、解析生效、证书签发、DDNS 与日志排查方法。',
        en: 'Credentials, record propagation, certificate issuance, DDNS and log troubleshooting.',
      },
    },
  },
]

const docs = [
  {
    id: 'privacy',
    zh: '隐私政策',
    en: 'Privacy Policy',
    descZh: '账号凭据、文件信息、日志与 AI 功能数据的处理方式。',
    descEn: 'How credentials, file information, logs and AI feature data are handled.',
  },
  {
    id: 'terms',
    zh: '用户许可协议',
    en: 'License Agreement',
    descZh: '闭源软件的使用许可、禁止行为、第三方服务与责任限制。',
    descEn: 'License grant, restrictions, third-party services and liability limits.',
  },
  {
    id: 'third-party',
    zh: '第三方组件说明',
    en: 'Third-Party Notices',
    descZh: '云服务提供方、开源组件与专有组件的许可说明。',
    descEn: 'Cloud providers, open-source components and proprietary components.',
  },
  {
    id: 'support',
    zh: '技术支持',
    en: 'Support',
    descZh: '目录授权、数据位置、登录失效、播放与备份问题的排查方法。',
    descEn: 'Folder authorization, data locations, sign-in expiry and troubleshooting.',
  },
]

const escape = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const baseHtml = await readFile(join(dist, 'index.html'), 'utf8')

/** Rewrite <html lang>, <title>, description, canonical and hreflang links. */
const renderPage = ({ locale, title, description, selfUrl, alternates, noindex }) => {
  let html = baseHtml.replace(/<html lang="[^"]*"/, `<html lang="${locale}"`)

  if (title) {
    html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escape(title)}</title>`)
  }

  if (description) {
    html = html.replace(
      /<meta\s+name="description"\s+content="[\s\S]*?"\s*\/?>/,
      `<meta name="description" content="${escape(description)}" />`,
    )
  }

  const links = noindex
    ? '    <meta name="robots" content="noindex" />'
    : [
        `    <link rel="canonical" href="${selfUrl}" />`,
        `    <link rel="alternate" hreflang="zh-CN" href="${alternates.zh}" />`,
        `    <link rel="alternate" hreflang="en" href="${alternates.en}" />`,
        `    <link rel="alternate" hreflang="x-default" href="${alternates.zh}" />`,
      ].join('\n')

  html = html.replace(
    /    <link rel="canonical"[\s\S]*?<link rel="alternate" hreflang="en"[^>]*>\n?/,
    `${links}\n`,
  )

  return html
}

const written = []
const urls = []

const writePage = async (path, html) => {
  const target = join(dist, path)
  await mkdir(dirname(target), { recursive: true })
  await writeFile(target, html, 'utf8')
  written.push(path)
}

const pushUrl = (path, zhPath, enPath) => {
  urls.push({ loc: site + path, zh: site + zhPath, en: site + enPath })
}

/** Home pages: `/index.html` is produced by Vite itself, only `/en/index.html` is new. */
urls.push({ loc: `${site}/`, zh: `${site}/`, en: `${site}/en/index.html` })
await writePage(
  'en/index.html',
  renderPage({
    locale: 'en',
    title: 'NASPK · Apps for UGREEN NAS',
    description:
      'NASPK is an independent developer building apps for UGREEN NAS (UGOS Pro): cloud drive tools, domain and network management, with more app types on the way.',
    selfUrl: `${site}/en/index.html`,
    alternates: { zh: `${site}/`, en: `${site}/en/index.html` },
  }),
)
pushUrl('/en/index.html', '/', '/en/index.html')

await writePage(
  '404.html',
  renderPage({ locale: 'zh-CN', title: '页面不存在 · NASPK', noindex: true }),
)

for (const app of apps) {
  const zhPaths = {
    home: `/${app.slug}/index.html`,
    en: `/${app.slug}/en/index.html`,
  }
  const enPaths = {
    home: `/${app.slug}/en/index.html`,
    zh: `/${app.slug}/index.html`,
  }

  await writePage(
    `${app.slug}/index.html`,
    renderPage({
      locale: 'zh-CN',
      title: `${app.zh} 法律文档 · NASPK`,
      description: `${app.zh} 的隐私政策、用户许可协议、第三方组件说明与技术支持，独立维护于本应用目录。`,
      selfUrl: `${site}${zhPaths.home}`,
      alternates: { zh: `${site}${zhPaths.home}`, en: `${site}${zhPaths.en}` },
    }),
  )
  pushUrl(zhPaths.home, zhPaths.home, zhPaths.en)

  await writePage(
    `${app.slug}/en/index.html`,
    renderPage({
      locale: 'en',
      title: `${app.en} Legal · NASPK`,
      description: `Privacy policy, license agreement, third-party notices and support for ${app.en}.`,
      selfUrl: `${site}${enPaths.home}`,
      alternates: { zh: `${site}${enPaths.zh}`, en: `${site}${enPaths.home}` },
    }),
  )
  pushUrl(enPaths.home, enPaths.zh, enPaths.home)

  for (const doc of docs) {
    const descZh = app.descs?.[doc.id]?.zh ?? doc.descZh
    const descEn = app.descs?.[doc.id]?.en ?? doc.descEn
    const zhDocPath = `${zhPaths.home.replace('/index.html', '')}/${doc.id}.html`
    const enDocPath = `${enPaths.home.replace('/index.html', '')}/${doc.id}.html`

    await writePage(
      `${app.slug}/${doc.id}.html`,
      renderPage({
        locale: 'zh-CN',
        title: `${app.zh} ${doc.zh} · NASPK`,
        description: `${app.zh}${doc.zh}：${descZh}`,
        selfUrl: `${site}${zhDocPath}`,
        alternates: { zh: `${site}${zhDocPath}`, en: `${site}${enDocPath}` },
      }),
    )
    pushUrl(zhDocPath, zhDocPath, enDocPath)

    await writePage(
      `${app.slug}/en/${doc.id}.html`,
      renderPage({
        locale: 'en',
        title: `${app.en} ${doc.en} · NASPK`,
        description: `${app.en} ${doc.en}: ${descEn}`,
        selfUrl: `${site}${enDocPath}`,
        alternates: { zh: `${site}${zhDocPath}`, en: `${site}${enDocPath}` },
      }),
    )
    pushUrl(enDocPath, zhDocPath, enDocPath)
  }
}

const today = new Date().toISOString().slice(0, 10)

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ...urls.flatMap(({ loc, zh, en }) => [
    '  <url>',
    `    <loc>${loc}</loc>`,
    `    <lastmod>${today}</lastmod>`,
    `    <xhtml:link rel="alternate" hreflang="zh-CN" href="${zh}" />`,
    `    <xhtml:link rel="alternate" hreflang="en" href="${en}" />`,
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${zh}" />`,
    '  </url>',
  ]),
  '</urlset>',
  '',
].join('\n')

await writeFile(join(dist, 'sitemap.xml'), sitemap, 'utf8')

/** Vite may have copied legacy assets into dist during the public-dir pass. */
const legacy = join(dist, 'assets', 'site.css')
await rm(legacy, { force: true })

const files = await readdir(dist, { recursive: true })
const htmlCount = files.filter((file) => file.endsWith('.html')).length

console.log(`✓ ${written.length} alias pages written (${htmlCount} HTML files total)`)
console.log(`✓ sitemap.xml with ${urls.length} URLs`)
