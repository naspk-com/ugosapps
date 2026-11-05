import yun139Icon from '@/assets/apps/yun139.png'
import alipanIcon from '@/assets/apps/alipan.png'
import cloud189Icon from '@/assets/apps/cloud189.png'
import guangyapanIcon from '@/assets/apps/guangyapan.png'
import pan115Icon from '@/assets/apps/pan115.png'
import pan123Icon from '@/assets/apps/pan123.png'
import quarkIcon from '@/assets/apps/quark.png'
import thunderIcon from '@/assets/apps/thunder.png'
import ucpanIcon from '@/assets/apps/ucpan.png'
import wopanIcon from '@/assets/apps/wopan.png'
import unilinkIcon from '@/assets/apps/unilink.png'
import cftunnelIcon from '@/assets/apps/cftunnel.png'

export interface Localized {
  zh: string
  en: string
}

export const appCategories = [
  { id: 'cloud', name: { zh: '云盘工具', en: 'Cloud drives' } },
  { id: 'network', name: { zh: '域名与网络', en: 'Domains & network' } },
] as const

export type AppCategoryId = (typeof appCategories)[number]['id']

export const categoryById = (id: AppCategoryId): Localized =>
  appCategories.find((category) => category.id === id)?.name ?? { zh: id, en: id }

export interface Highlight {
  title: Localized
  desc: Localized
}

export interface AppInfo {
  /** URL segment, e.g. `yun139` */
  slug: string
  /** UGOS app id */
  id: string
  name: Localized
  provider: Localized
  /** Catalog grouping; more categories will be added as new app types ship */
  category: AppCategoryId
  /** App icon taken from the app project itself */
  icon: string
  /** One-line product summary shown on cards and app pages */
  tagline: Localized
  /** Feature highlights taken from each app's project.yaml */
  highlights: Highlight[]
  /** Package version from project.yaml */
  version: string
  /** Local service port from project.yaml */
  port: number
  /** Help / usage documentation address */
  help: string
  /** Official portal, may be empty when the provider has no public site */
  portal?: string
  portalLabel?: string
  login: Localized
  /** The Thunder app ships a proprietary Xunlei engine */
  thunderEngine?: boolean
  /** Domain / DNS management tool, uses its own document set */
  domainTool?: boolean
  /** Cloudflare Tunnel tool, uses its own document set */
  tunnelTool?: boolean
}

/* ---------- shared highlights ---------- */

const native: Highlight = {
  title: { zh: '原生 UGOS 应用', en: 'Native UGOS app' },
  desc: {
    zh: '以 .upk 应用商店安装包交付，从桌面图标打开，窗口与账号走 UGOS 原生能力，不是 Docker 套壳。',
    en: 'Delivered as a .upk App Center package and opened from the desktop icon, using native UGOS windows and accounts — not a Docker wrapper.',
  },
}

const files: Highlight = {
  title: { zh: '文件管理', en: 'File management' },
  desc: {
    zh: '浏览、搜索、新建目录、重命名、移动、复制与删除，缩略图直接预览。',
    en: 'Browse, search, create folders, rename, move, copy and delete, with inline thumbnail previews.',
  },
}

const filesBasic: Highlight = {
  title: { zh: '文件管理', en: 'File management' },
  desc: {
    zh: '浏览目录、上传下载、重命名、移动、复制与删除，缩略图直接预览。',
    en: 'Browse folders, upload and download, rename, move, copy and delete, with inline thumbnail previews.',
  },
}

const transfer: Highlight = {
  title: { zh: '任务队列与断点续传', en: 'Queue with resume' },
  desc: {
    zh: '上传下载进入任务队列，进度实时推送；中断后可续传，重启不丢任务。',
    en: 'Uploads and downloads run through a queue with live progress; interrupted transfers resume and tasks survive a restart.',
  },
}

const media: Highlight = {
  title: { zh: '在线播放与相册', en: 'Streaming and gallery' },
  desc: {
    zh: '音视频在线播放，图片相册视图，云端的媒体直接在 NAS 上看。',
    en: 'Stream audio and video in place and browse photos in a gallery view, straight from the NAS.',
  },
}

const backup: Highlight = {
  title: { zh: '目录自动备份', en: 'Folder backup' },
  desc: {
    zh: '选定目录按文件指纹增量同步到云端，失败退避，重启后继续。',
    en: 'Chosen folders sync incrementally by file fingerprint, back off on failure and continue after a restart.',
  },
}

const shareCreate: Highlight = {
  title: { zh: '外链分享', en: 'Share links' },
  desc: {
    zh: '创建或取消分享外链，集中查看已经分享出去的内容。',
    en: 'Create and revoke share links, and review everything you have shared.',
  },
}

const shareSave: Highlight = {
  title: { zh: '链接解析与转存', en: 'Parse and save shares' },
  desc: {
    zh: '粘贴分享链接即可解析目录，把文件转存到自己的云盘。',
    en: 'Paste a share link to browse its contents and save files into your own drive.',
  },
}

const localCreds: Highlight = {
  title: { zh: '凭据只在本机', en: 'Credentials stay local' },
  desc: {
    zh: '登录凭据加密保存在 NAS 应用数据目录，不上传开发者服务器。',
    en: 'Sign-in credentials are encrypted in the app data directory and never reach a developer server.',
  },
}

const member: Highlight = {
  title: { zh: '容量与会员信息', en: 'Quota and membership' },
  desc: {
    zh: '在应用内查看存储容量、会员状态与到期时间。',
    en: 'See storage quota, membership status and expiry dates inside the app.',
  },
}

const offline: Highlight = {
  title: { zh: '离线下载', en: 'Offline downloads' },
  desc: {
    zh: '把磁力与下载任务交给迅雷云端，完成后在 NAS 上直接播放或下载。',
    en: 'Send magnet and download tasks to the Xunlei cloud, then stream or download the result on the NAS.',
  },
}

const multiRegistrar: Highlight = {
  title: { zh: '多家注册商统一管理', en: 'Multi-registrar overview' },
  desc: {
    zh: '阿里云、腾讯云与 Cloudflare 的域名集中在一处查看，到期时间一目了然。',
    en: 'Aliyun, Tencent Cloud and Cloudflare domains in one list, with expiry dates at a glance.',
  },
}

const dnsRecords: Highlight = {
  title: { zh: 'DNS 解析记录', en: 'DNS records' },
  desc: {
    zh: '增删改查 A、AAAA、CNAME、TXT、MX 等记录，保存后即时生效。',
    en: 'Add, edit and remove A, AAAA, CNAME, TXT, MX and other records with immediate effect.',
  },
}

const ssl: Highlight = {
  title: { zh: '免费 SSL 证书', en: 'Free SSL certificates' },
  desc: {
    zh: '通过 ACME 申请与续期证书，私钥只保存在你的 NAS 上。',
    en: 'Issue and renew certificates over ACME, with private keys kept on your NAS.',
  },
}

const ddns: Highlight = {
  title: { zh: '动态域名（DDNS）', en: 'Dynamic DNS' },
  desc: {
    zh: '公网 IP 变化时自动更新解析，家庭宽带的远程访问不断线。',
    en: 'Update records automatically when your public IP changes, so home broadband access keeps working.',
  },
}

const noPorts: Highlight = {
  title: { zh: '无需公网 IP 与端口映射', en: 'No public IP or port forwarding' },
  desc: {
    zh: '连接由 NAS 主动发起，不必改路由器、不必开放入站端口。',
    en: 'Connections are outbound from the NAS, so no router changes or inbound ports are needed.',
  },
}

const ingress: Highlight = {
  title: { zh: 'Tunnel 与 ingress 规则', en: 'Tunnels and ingress rules' },
  desc: {
    zh: '创建或删除隧道，编辑 ingress 规则，为自定义域名写入 DNS 记录。',
    en: 'Create and delete tunnels, edit ingress rules and write DNS records for custom hostnames.',
  },
}

const liveLogs: Highlight = {
  title: { zh: '启停与实时日志', en: 'Controls and live logs' },
  desc: {
    zh: '启停连接器、查看实时日志，NAS 重启后自动恢复连接。',
    en: 'Start and stop connectors, follow live logs, and reconnect automatically after a reboot.',
  },
}

/* ---------- catalog ---------- */

export const apps: AppInfo[] = [
  {
    slug: 'yun139',
    id: 'com.naspk.yun139',
    name: { zh: '移动云盘', en: 'China Mobile Cloud' },
    provider: { zh: '中国移动', en: 'China Mobile' },
    category: 'cloud',
    icon: yun139Icon,
    tagline: {
      zh: '移动云盘在绿联 NAS 上的原生客户端，凭证只留在本机。',
      en: 'China Mobile Cloud as a native desktop client on your UGREEN NAS.',
    },
    highlights: [native, member, files, transfer, media, backup],
    version: '1.0.1',
    port: 21010,
    help: 'https://ugosapps.naspk.com/yun139/support.html',
    portal: 'https://yun.139.com',
    portalLabel: 'yun.139.com',
    login: { zh: '扫码、短信验证码或 Cookie', en: 'QR code, SMS code or cookie' },
  },
  {
    slug: 'alipan',
    id: 'com.naspk.alipan',
    name: { zh: '阿里云盘', en: 'Alibaba Cloud Drive' },
    provider: { zh: '阿里云盘', en: 'Alipan' },
    category: 'cloud',
    icon: alipanIcon,
    tagline: {
      zh: '阿里云盘的原生桌面客户端，上传下载与分享转存都在 NAS 上完成。',
      en: 'Aliyun Drive with a native desktop client for transfers, sharing and saving.',
    },
    highlights: [native, files, transfer, media, shareSave, backup],
    version: '1.0.1',
    port: 21011,
    help: 'https://ugosapps.naspk.com/alipan/support.html',
    portal: 'https://www.alipan.com',
    portalLabel: 'www.alipan.com',
    login: { zh: '扫码或 Token', en: 'QR code or token' },
  },
  {
    slug: 'cloud189',
    id: 'com.naspk.cloud189',
    name: { zh: '天翼云盘', en: 'Tianyi Cloud Drive' },
    provider: { zh: '中国电信', en: 'China Telecom' },
    category: 'cloud',
    icon: cloud189Icon,
    tagline: {
      zh: '天翼云盘的原生桌面客户端，文件管理与备份一次装好。',
      en: 'Tianyi Cloud Drive with native file management and folder backup.',
    },
    highlights: [native, files, transfer, media, shareCreate, backup],
    version: '1.0.1',
    port: 21012,
    help: 'https://ugosapps.naspk.com/cloud189/support.html',
    portal: 'https://cloud.189.cn',
    portalLabel: 'cloud.189.cn',
    login: { zh: '扫码或账号密码', en: 'QR code or account password' },
  },
  {
    slug: 'guangyapan',
    id: 'com.naspk.guangyapan',
    name: { zh: '光鸭云盘', en: 'Guangya Drive' },
    provider: { zh: '光鸭云盘', en: 'Guangya' },
    category: 'cloud',
    icon: guangyapanIcon,
    tagline: {
      zh: '光鸭云盘的原生桌面客户端，支持分享外链与目录备份。',
      en: 'Guangya Drive with native browsing, share links and folder backup.',
    },
    highlights: [native, files, transfer, media, shareCreate, backup],
    version: '1.0.1',
    port: 21013,
    help: 'https://ugosapps.naspk.com/guangyapan/support.html',
    login: { zh: '账号密码或 Cookie', en: 'account password or cookie' },
  },
  {
    slug: 'pan115',
    id: 'com.naspk.pan115',
    name: { zh: '115 网盘', en: '115 Drive' },
    provider: { zh: '115 科技', en: '115 Technology' },
    category: 'cloud',
    icon: pan115Icon,
    tagline: {
      zh: '115 网盘的原生桌面客户端，支持链接解析、转存与在线播放。',
      en: '115 Cloud with share parsing, saving and media playback on the NAS.',
    },
    highlights: [native, files, transfer, media, shareSave, backup],
    version: '1.0.0',
    port: 21014,
    help: 'https://ugosapps.naspk.com/pan115/support.html',
    portal: 'https://115.com',
    portalLabel: '115.com',
    login: { zh: '扫码或 Cookie', en: 'QR code or cookie' },
  },
  {
    slug: 'pan123',
    id: 'com.naspk.pan123',
    name: { zh: '123 云盘', en: '123 Cloud Drive' },
    provider: { zh: '123 云盘', en: '123Pan' },
    category: 'cloud',
    icon: pan123Icon,
    tagline: {
      zh: '123 云盘的原生桌面客户端，轻量、直接、支持在线播放。',
      en: '123 Cloud Drive as a lean native client with in-app media playback.',
    },
    highlights: [native, filesBasic, transfer, media, shareCreate, backup],
    version: '1.0.1',
    port: 21015,
    help: 'https://ugosapps.naspk.com/pan123/support.html',
    portal: 'https://www.123pan.com',
    portalLabel: 'www.123pan.com',
    login: { zh: '账号密码或 Token', en: 'account password or token' },
  },
  {
    slug: 'quark',
    id: 'com.naspk.quark',
    name: { zh: '夸克网盘', en: 'Quark Drive' },
    provider: { zh: '夸克', en: 'Quark' },
    category: 'cloud',
    icon: quarkIcon,
    tagline: {
      zh: '夸克网盘的原生桌面客户端，分享转存与备份都在本地完成。',
      en: 'Quark Cloud with native sharing, saving and backup.',
    },
    highlights: [native, files, transfer, media, shareSave, backup],
    version: '1.0.0',
    port: 21016,
    help: 'https://ugosapps.naspk.com/quark/support.html',
    portal: 'https://pan.quark.cn',
    portalLabel: 'pan.quark.cn',
    login: { zh: '扫码或 Cookie', en: 'QR code or cookie' },
  },
  {
    slug: 'thunder',
    id: 'com.naspk.thunder',
    name: { zh: '迅雷云盘', en: 'Thunder Drive' },
    provider: { zh: '迅雷', en: 'Xunlei' },
    category: 'cloud',
    icon: thunderIcon,
    tagline: {
      zh: '迅雷云盘的原生客户端，云端离线下载完成后再从 NAS 取回。',
      en: 'Thunder Drive with cloud offline downloads, retrieved straight to your NAS.',
    },
    highlights: [native, offline, files, transfer, media, backup],
    version: '1.0.1',
    port: 21017,
    help: 'https://ugosapps.naspk.com/thunder/support.html',
    portal: 'https://www.xunlei.com',
    portalLabel: 'www.xunlei.com',
    login: { zh: '账号密码或扫码', en: 'account password or QR code' },
    thunderEngine: true,
  },
  {
    slug: 'ucpan',
    id: 'com.naspk.ucpan',
    name: { zh: 'UC 网盘', en: 'UC Drive' },
    provider: { zh: 'UC', en: 'UC' },
    category: 'cloud',
    icon: ucpanIcon,
    tagline: {
      zh: 'UC 网盘的原生桌面客户端，分享转存与在线播放齐全。',
      en: 'UC Drive with native sharing, saving and media playback.',
    },
    highlights: [native, files, transfer, media, shareSave, backup],
    version: '1.0.0',
    port: 21018,
    help: 'https://ugosapps.naspk.com/ucpan/support.html',
    portal: 'https://drive.uc.cn',
    portalLabel: 'drive.uc.cn',
    login: { zh: '扫码或 Cookie', en: 'QR code or cookie' },
  },
  {
    slug: 'wopan',
    id: 'com.naspk.wopan',
    name: { zh: '联通云盘', en: 'Unicom Cloud Drive' },
    provider: { zh: '中国联通', en: 'China Unicom' },
    category: 'cloud',
    icon: wopanIcon,
    tagline: {
      zh: '联通云盘的原生桌面客户端，备份与分享都在 NAS 上管理。',
      en: 'China Unicom Cloud with native backup and share management.',
    },
    highlights: [native, files, transfer, media, shareCreate, backup],
    version: '1.0.0',
    port: 21019,
    help: 'https://ugosapps.naspk.com/wopan/support.html',
    portal: 'https://pan.wo.cn',
    portalLabel: 'pan.wo.cn',
    login: { zh: '账号密码或 Token', en: 'account password or token' },
  },
  {
    slug: 'unilink',
    id: 'com.naspk.unilink',
    name: { zh: '域联 UniLink', en: 'UniLink' },
    provider: { zh: '尘墨成', en: 'Dustinky' },
    category: 'network',
    icon: unilinkIcon,
    tagline: {
      zh: '域名、DNS、SSL 证书与动态域名，一个应用全管。',
      en: 'Domains, DNS records, SSL certificates and dynamic DNS in one app.',
    },
    highlights: [native, multiRegistrar, dnsRecords, ssl, ddns, localCreds],
    version: '1.0.0',
    port: 21020,
    help: 'https://ugosapps.naspk.com/unilink/help.html',
    portal: 'https://www.dustinky.com',
    portalLabel: 'www.dustinky.com',
    login: {
      zh: '阿里云 / 腾讯云 / Cloudflare API 凭据',
      en: 'Aliyun, Tencent Cloud or Cloudflare API credentials',
    },
    domainTool: true,
  },
  {
    slug: 'cftunnel',
    id: 'com.naspk.cftunnel',
    name: { zh: 'Cloudflare Tunnel', en: 'Cloudflare Tunnel' },
    provider: { zh: 'Cloudflare', en: 'Cloudflare' },
    category: 'network',
    icon: cftunnelIcon,
    tagline: {
      zh: '不开放入站端口，把 NAS 服务安全发布到公网。',
      en: 'Publish NAS services to the internet without opening inbound ports.',
    },
    highlights: [native, noPorts, ingress, liveLogs, localCreds],
    version: '1.0.0',
    port: 21021,
    help: 'https://tunnel.naspk.com/',
    portal: 'https://www.cloudflare.com',
    portalLabel: 'www.cloudflare.com',
    login: {
      zh: 'Cloudflare API Token 或 Tunnel Token',
      en: 'Cloudflare API token or tunnel token',
    },
    tunnelTool: true,
  },
]

export const appBySlug = (slug: string): AppInfo | undefined =>
  apps.find((app) => app.slug === slug)

export const cloudApps = apps.filter((app) => app.category === 'cloud')
