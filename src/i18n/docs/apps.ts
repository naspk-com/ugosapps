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

export const apps: AppInfo[] = [
  {
    slug: 'yun139',
    id: 'com.naspk.yun139',
    name: { zh: '移动云盘', en: 'China Mobile Cloud' },
    provider: { zh: '中国移动', en: 'China Mobile' },
    category: 'cloud',
    icon: yun139Icon,
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
    login: { zh: '账号密码或 Cookie', en: 'account password or cookie' },
  },
  {
    slug: 'pan115',
    id: 'com.naspk.pan115',
    name: { zh: '115 网盘', en: '115 Drive' },
    provider: { zh: '115 科技', en: '115 Technology' },
    category: 'cloud',
    icon: pan115Icon,
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
    portal: 'https://www.dustinky.com',
    portalLabel: 'www.dustinky.com',
    login: { zh: '阿里云 / 腾讯云 / Cloudflare API 凭据', en: 'Aliyun, Tencent Cloud or Cloudflare API credentials' },
    domainTool: true,
  },
  {
    slug: 'cftunnel',
    id: 'com.naspk.cftunnel',
    name: { zh: 'Cloudflare Tunnel', en: 'Cloudflare Tunnel' },
    provider: { zh: 'Cloudflare', en: 'Cloudflare' },
    category: 'network',
    icon: cftunnelIcon,
    portal: 'https://www.cloudflare.com',
    portalLabel: 'www.cloudflare.com',
    login: { zh: 'Cloudflare API Token 或 Tunnel Token', en: 'Cloudflare API token or tunnel token' },
    tunnelTool: true,
  },
]

export const appBySlug = (slug: string): AppInfo | undefined =>
  apps.find((app) => app.slug === slug)
