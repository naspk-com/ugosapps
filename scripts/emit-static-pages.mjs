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
  { slug: 'yun139', zh: '移动云盘', en: 'China Mobile Cloud', kind: 'cloud' },
  { slug: 'alipan', zh: '阿里云盘', en: 'Alibaba Cloud Drive', kind: 'cloud' },
  { slug: 'cloud189', zh: '天翼云盘', en: 'Tianyi Cloud Drive', kind: 'cloud' },
  { slug: 'guangyapan', zh: '光鸭云盘', en: 'Guangya Drive', kind: 'cloud' },
  { slug: 'pan115', zh: '115 网盘', en: '115 Drive', kind: 'cloud' },
  { slug: 'pan123', zh: '123 云盘', en: '123 Cloud Drive', kind: 'cloud' },
  { slug: 'quark', zh: '夸克网盘', en: 'Quark Drive', kind: 'cloud' },
  { slug: 'thunder', zh: '迅雷云盘', en: 'Thunder Drive', kind: 'cloud' },
  { slug: 'ucpan', zh: 'UC 网盘', en: 'UC Drive', kind: 'cloud' },
  { slug: 'wopan', zh: '联通云盘', en: 'Unicom Cloud Drive', kind: 'cloud' },
  {
    slug: 'unilink',
    zh: '域联 UniLink',
    en: 'UniLink',
    kind: 'domain',
    tagline: {
      zh: '在绿联 NAS 上统一管理域名与 DNS：多服务商解析、证书签发与 DDNS。',
      en: 'Manage domains and DNS on UGREEN NAS: multi-provider records, certificates and DDNS.',
    },
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
  {
    slug: 'cftunnel',
    zh: 'Cloudflare Tunnel',
    en: 'Cloudflare Tunnel',
    kind: 'domain',
    tagline: {
      zh: '在绿联 NAS 上运行 Cloudflare Tunnel：无需公网 IP 即可安全发布内网服务。',
      en: 'Run Cloudflare Tunnel on UGREEN NAS: publish local services securely without a public IP.',
    },
    descs: {
      privacy: {
        zh: 'Cloudflare 凭据、隧道与 DNS 缓存、运行日志的处理方式。',
        en: 'How Cloudflare credentials, tunnel and DNS caches, and runtime logs are handled.',
      },
      terms: {
        zh: '闭源软件的使用许可、隧道暴露风险、第三方服务与责任限制。',
        en: 'License grant, tunnel exposure risk, third-party services and liability limits.',
      },
      'third-party': {
        zh: 'Cloudflare 服务、cloudflared（Apache-2.0）与开源组件的许可说明。',
        en: 'Cloudflare services, cloudflared (Apache-2.0) and open-source components.',
      },
      support: {
        zh: 'Token 权限、隧道创建与运行、DNS 记录与连接故障排查。',
        en: 'Token scopes, creating and running tunnels, DNS records and connectivity troubleshooting.',
      },
    },
  },
]

/** 云盘类应用的统一产品定位文案；域名/网络类在条目上用 tagline 覆盖。 */
const cloudTagline = {
  zh: (name) => `${name} 绿联 NAS 版：在 UGOS Pro 桌面上直接浏览、上传、下载与备份云端文件。`,
  en: (name) =>
    `${name} for UGREEN NAS: browse, upload, download and back up cloud files from the UGOS Pro desktop.`,
}

const appTagline = (app, locale) =>
  app.tagline?.[locale] ?? (app.kind === 'cloud' ? cloudTagline[locale](app[locale]) : '')

/**
 * Crawler fallback: real content placed inside #app for spiders that do not
 * execute JavaScript (Baiduspider 等). Vue mounts by replacing the container,
 * so regular visitors never see it.
 */
const docTitle = (doc, locale) => doc[locale]

const homeBody = (locale) => {
  const heading = locale === 'zh' ? 'NASPK · 绿联 NAS 应用' : 'NASPK · Apps for UGREEN NAS'
  const intro =
    locale === 'zh'
      ? 'NASPK 是独立的第三方开发者，为绿联 NAS（UGOS Pro）开发应用。这些应用未上架绿联官方应用商店，需先为设备取得开发者授权，再通过应用中心手动侧载 .upk 安装包。'
      : 'NASPK is an independent third-party developer building apps for UGREEN NAS (UGOS Pro). These apps are not listed in the official UGREEN App Center: request developer authorization for your device, then side-load the .upk package manually.'
  const items = apps
    .map(
      (app) =>
        `    <li><a href="${locale === 'zh' ? `/${app.slug}/index.html` : `/${app.slug}/en/index.html`}">${escape(app[locale])}</a> — ${escape(appTagline(app, locale))}</li>`,
    )
    .join('\n')
  return `<main data-crawler-fallback>\n  <h1>${heading}</h1>\n  <p>${intro}</p>\n  <ul>\n${items}\n  </ul>\n</main>`
}

const appBody = (app, locale) => {
  const base = locale === 'zh' ? `/${app.slug}` : `/${app.slug}/en`
  const items = docs
    .map((doc) => `    <li><a href="${base}/${doc.id}.html">${escape(docTitle(doc, locale))}</a></li>`)
    .join('\n')
  return `<main data-crawler-fallback>\n  <h1>${escape(app[locale])}</h1>\n  <p>${escape(appTagline(app, locale))}</p>\n  <ul>\n${items}\n  </ul>\n</main>`
}

const docBody = (app, doc, locale, description) => {
  const base = locale === 'zh' ? `/${app.slug}` : `/${app.slug}/en`
  const back = locale === 'zh' ? `返回${app.zh}首页` : `Back to ${app.en}`
  return `<main data-crawler-fallback>\n  <h1>${escape(app[locale])} · ${escape(docTitle(doc, locale))}</h1>\n  <p>${escape(description)}</p>\n  <p><a href="${base}/index.html">${escape(back)}</a></p>\n</main>`
}

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

/** Rewrite <html lang>, <title>, description, OG tags, canonical and hreflang links. */
const renderPage = ({ locale, title, description, selfUrl, alternates, noindex, jsonLd, body }) => {
  let html = baseHtml.replace(/<html lang="[^"]*"/, `<html lang="${locale}"`)

  if (body) {
    html = html.replace('<div id="app"></div>', `<div id="app">\n${body}\n    </div>`)
  }

  if (title) {
    html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escape(title)}</title>`)
  }

  if (description) {
    html = html.replace(
      /<meta\s+name="description"\s+content="[\s\S]*?"\s*\/?>/,
      `<meta name="description" content="${escape(description)}" />`,
    )
  }

  /* Per-page Open Graph values (base index.html carries the site defaults). */
  if (title) {
    html = html.replace(
      /<meta property="og:title" content="[^"]*" \/>/,
      `<meta property="og:title" content="${escape(title)}" />`,
    )
  }
  if (description) {
    html = html.replace(
      /<meta\s+property="og:description"[\s\S]*?\/>/,
      `<meta property="og:description" content="${escape(description)}" />`,
    )
  }
  if (selfUrl) {
    html = html.replace(
      /<meta property="og:url" content="[^"]*" \/>/,
      `<meta property="og:url" content="${escape(selfUrl)}" />`,
    )
  }

  if (jsonLd) {
    html = html.replace(
      '    <link rel="canonical"',
      `    <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>\n    <link rel="canonical"`,
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

const pushUrl = (path, zhPath, enPath, priority = 0.5) => {
  urls.push({ loc: site + path, zh: site + zhPath, en: site + enPath, priority })
}

/** Home pages: rewrite Vite's `/index.html` too, so crawlers see real content. */
pushUrl('/', '/', '/en/index.html', 1.0)
await writePage(
  'index.html',
  renderPage({
    locale: 'zh-CN',
    selfUrl: `${site}/`,
    alternates: { zh: `${site}/`, en: `${site}/en/index.html` },
    body: homeBody('zh'),
  }),
)
await writePage(
  'en/index.html',
  renderPage({
    locale: 'en',
    title: 'NASPK · Apps for UGREEN NAS',
    description:
      'NASPK is an independent third-party developer building apps for UGREEN NAS (UGOS Pro). These apps are self-distributed outside the official store and require developer authorization before side-loading.',
    selfUrl: `${site}/en/index.html`,
    alternates: { zh: `${site}/`, en: `${site}/en/index.html` },
    body: homeBody('en'),
  }),
)
pushUrl('/en/index.html', '/', '/en/index.html', 0.9)

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

  const categoryZh = app.kind === 'cloud' ? '绿联 NAS 云盘工具' : '绿联 NAS 域名与网络管理'
  const categoryEn = app.kind === 'cloud' ? 'cloud drive app for UGREEN NAS' : 'domain & network app for UGREEN NAS'

  const softwareJsonLd = (locale) => ({
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: app[locale],
    url: `${site}${locale === 'zh' ? zhPaths.home : enPaths.home}`,
    description: appTagline(app, locale),
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'UGOS Pro',
    inLanguage: locale === 'zh' ? 'zh-CN' : 'en',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'CNY' },
    author: { '@type': 'Organization', name: 'NASPK', url: site },
  })

  await writePage(
    `${app.slug}/index.html`,
    renderPage({
      locale: 'zh-CN',
      title: `${app.zh} · ${categoryZh} · NASPK`,
      description: appTagline(app, 'zh'),
      selfUrl: `${site}${zhPaths.home}`,
      alternates: { zh: `${site}${zhPaths.home}`, en: `${site}${zhPaths.en}` },
      jsonLd: softwareJsonLd('zh'),
      body: appBody(app, 'zh'),
    }),
  )
  pushUrl(zhPaths.home, zhPaths.home, zhPaths.en, 0.8)

  await writePage(
    `${app.slug}/en/index.html`,
    renderPage({
      locale: 'en',
      title: `${app.en} · ${categoryEn} · NASPK`,
      description: appTagline(app, 'en'),
      selfUrl: `${site}${enPaths.home}`,
      alternates: { zh: `${site}${enPaths.zh}`, en: `${site}${enPaths.home}` },
      jsonLd: softwareJsonLd('en'),
      body: appBody(app, 'en'),
    }),
  )
  pushUrl(enPaths.home, enPaths.zh, enPaths.home, 0.8)

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
        body: docBody(app, doc, 'zh', descZh),
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
        body: docBody(app, doc, 'en', descEn),
      }),
    )
    pushUrl(enDocPath, zhDocPath, enDocPath)
  }
}

const today = new Date().toISOString().slice(0, 10)

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ...urls.flatMap(({ loc, zh, en, priority }) => [
    '  <url>',
    `    <loc>${loc}</loc>`,
    `    <lastmod>${today}</lastmod>`,
    '    <changefreq>monthly</changefreq>',
    `    <priority>${priority.toFixed(1)}</priority>`,
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
