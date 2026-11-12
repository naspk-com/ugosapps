<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import DocIcon from '@/components/DocIcon.vue'
import { appBySlug, apps, categoryById } from '@/i18n/docs/apps'
import { docPath, homePath } from '@/i18n/docs'
import { docIds, type LocaleCode } from '@/i18n/docs/types'
import { isDark } from '@/theme'

const props = defineProps<{ locale: LocaleCode; slug: string }>()

const { t } = useI18n()

const app = computed(() => appBySlug(props.slug))

const name = computed(() =>
  app.value ? (props.locale === 'en-US' ? app.value.name.en : app.value.name.zh) : '',
)

const provider = computed(() =>
  app.value ? (props.locale === 'en-US' ? app.value.provider.en : app.value.provider.zh) : '',
)

const login = computed(() =>
  app.value ? (props.locale === 'en-US' ? app.value.login.en : app.value.login.zh) : '',
)

const tagline = computed(() =>
  app.value ? (props.locale === 'en-US' ? app.value.tagline.en : app.value.tagline.zh) : '',
)

const categoryName = computed(() => {
  if (!app.value) return ''
  const category = categoryById(app.value.category)
  return props.locale === 'en-US' ? category.en : category.zh
})

const highlights = computed(() =>
  (app.value?.highlights ?? []).map((item) => ({
    title: props.locale === 'en-US' ? item.title.en : item.title.zh,
    desc: props.locale === 'en-US' ? item.desc.en : item.desc.zh,
  })),
)

const permission = computed(() =>
  app.value?.domainTool || app.value?.tunnelTool
    ? t('appHome.permissionNetwork')
    : t('appHome.permissionCloud'),
)

const iconOf = (doc: (typeof docIds)[number]): 'shield' | 'file' | 'package' | 'life' =>
  doc === 'privacy' ? 'shield' : doc === 'terms' ? 'file' : doc === 'third-party' ? 'package' : 'life'

const others = computed(() =>
  apps
    .filter((item) => item.slug !== props.slug)
    .slice(0, 6)
    .map((item) => ({
      slug: item.slug,
      icon: item.icon,
      name: props.locale === 'en-US' ? item.name.en : item.name.zh,
    })),
)

/* 从应用图标拾取主色/辅色，作为本页强调色（失败时回退到全局 mint） */
const APP_COLOR_VARS = [
  '--app-1',
  '--app-2',
  '--app-glow',
  '--app-tint',
  '--app-line',
  '--app-on',
  '--aurora-1',
  '--aurora-2',
] as const

const resetAppColor = (): void => {
  const root = document.documentElement
  APP_COLOR_VARS.forEach((name) => root.style.removeProperty(name))
}

type Rgb = [number, number, number]

const rgba = (rgb: Rgb, alpha: number): string =>
  `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`

const toHex = (rgb: Rgb): string =>
  `#${rgb.map((v) => v.toString(16).padStart(2, '0')).join('')}`

const channelLuminance = (value: number): number => {
  const c = value / 255
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
}

const luminanceOf = (rgb: Rgb): number =>
  0.2126 * channelLuminance(rgb[0]) +
  0.7152 * channelLuminance(rgb[1]) +
  0.0722 * channelLuminance(rgb[2])

const contrastRatio = (a: Rgb, b: Rgb): number => {
  const la = luminanceOf(a)
  const lb = luminanceOf(b)
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05)
}

const ON_LIGHT = '#10231c'
const ON_DARK = '#ffffff'
const onLightRgb: Rgb = [16, 35, 28]
const whiteRgb: Rgb = [255, 255, 255]

const onColor = (rgb: Rgb): string =>
  contrastRatio(rgb, whiteRgb) >= contrastRatio(rgb, onLightRgb) ? ON_DARK : ON_LIGHT

/* 亮色底要求深一些、暗色底要求浅一些，保证强调色当文字用时仍可读 */
const readableAccent = (rgb: Rgb, dark: boolean): Rgb => {
  const target = dark ? 0.42 : 0.17
  const fits = (candidate: Rgb): boolean => {
    const l = luminanceOf(candidate)
    return dark ? l >= target : l <= target
  }
  if (fits(rgb)) return rgb
  const toward = dark ? 255 : 0
  let low = 0
  let high = 1
  for (let i = 0; i < 14; i += 1) {
    const t = (low + high) / 2
    const candidate = rgb.map((v) => Math.round(v + (toward - v) * t)) as Rgb
    if (fits(candidate)) high = t
    else low = t
  }
  return rgb.map((v) => Math.round(v + (toward - v) * high)) as Rgb
}

const loadImage = (src: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })

/* 缩小采样 + 颜色桶聚类：只取饱和的品牌色，白/黑/灰像素全部剔除 */
const extractPalette = (img: HTMLImageElement): Rgb[] => {
  const size = 48
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  if (!ctx) return []
  ctx.drawImage(img, 0, 0, size, size)
  const { data } = ctx.getImageData(0, 0, size, size)

  interface Bucket {
    rgb: Rgb
    count: number
  }
  const vivid = new Map<string, Bucket>()
  const tinted = new Map<string, Bucket>()

  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] < 125) continue
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const range = max - min
    /* 剔除近白、近黑与中性灰 */
    if ((max > 240 && min > 200) || max < 30 || range < 30) continue
    const key = `${r >> 4}-${g >> 4}-${b >> 4}`
    const target = range >= 60 ? vivid : tinted
    const bucket = target.get(key)
    if (bucket) {
      bucket.count += 1
      bucket.rgb = [bucket.rgb[0] + r, bucket.rgb[1] + g, bucket.rgb[2] + b]
    } else {
      target.set(key, { rgb: [r, g, b], count: 1 })
    }
  }

  const pool = vivid.size > 0 ? vivid : tinted
  return [...pool.values()]
    .sort((x, y) => y.count - x.count)
    .slice(0, 6)
    .map(
      (bucket) =>
        [
          Math.round(bucket.rgb[0] / bucket.count),
          Math.round(bucket.rgb[1] / bucket.count),
          Math.round(bucket.rgb[2] / bucket.count),
        ] as Rgb,
    )
}

let paletteCache: { src: string; colors: Rgb[] } | null = null

const getPalette = async (icon: string): Promise<Rgb[]> => {
  if (paletteCache?.src === icon) return paletteCache.colors
  const img = await loadImage(icon)
  const colors = extractPalette(img)
  paletteCache = { src: icon, colors }
  return colors
}

const applyAppColor = async (): Promise<void> => {
  const current = app.value
  if (!current) return
  try {
    const colors = await getPalette(current.icon)
    const [primary, secondary] = colors
    if (!primary) return
    const accent = readableAccent(primary, isDark.value)
    const root = document.documentElement
    root.style.setProperty('--app-1', toHex(accent))
    root.style.setProperty('--app-glow', rgba(primary, 0.42))
    root.style.setProperty('--app-tint', rgba(primary, 0.14))
    root.style.setProperty('--app-line', rgba(primary, 0.45))
    root.style.setProperty('--app-on', onColor(accent))
    root.style.setProperty('--aurora-1', rgba(primary, 0.5))
    if (secondary) {
      root.style.setProperty('--app-2', toHex(secondary))
      root.style.setProperty('--aurora-2', rgba(secondary, 0.5))
    } else {
      root.style.removeProperty('--app-2')
      root.style.removeProperty('--aurora-2')
    }
  } catch {
    /* 拾色失败时保持默认主题色 */
  }
}

onMounted(() => {
  void applyAppColor()
  window.addEventListener('keydown', onKeydown)
})

watch(app, () => {
  void applyAppColor()
})

watch(isDark, () => {
  void applyAppColor()
})

/* 下载弹层：展示公众号二维码与该应用可用的关键词 */
const downloadOpen = ref(false)
const copiedKeyword = ref('')

const closeDownload = (): void => {
  downloadOpen.value = false
}

const onKeydown = (event: KeyboardEvent): void => {
  if (event.key === 'Escape') closeDownload()
}

const copyKeyword = async (keyword: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(keyword)
    copiedKeyword.value = keyword
    window.setTimeout(() => {
      if (copiedKeyword.value === keyword) copiedKeyword.value = ''
    }, 1600)
  } catch {
    copiedKeyword.value = ''
  }
}

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  resetAppColor()
})
</script>

<template>
  <div v-if="app" class="wrap app-home">
    <nav class="crumbs" :aria-label="t('appHome.back')">
      <a :href="homePath(locale)">{{ t('nav.home') }}</a>
      <span aria-hidden="true">/</span>
      <a :href="`${homePath(locale)}#apps`">{{ t('nav.apps') }}</a>
      <span aria-hidden="true">/</span>
      <span>{{ name }}</span>
    </nav>

    <section class="app-landing">
      <div class="app-landing-mark-wrap" aria-hidden="true">
        <span class="app-landing-glow" />
        <img
          class="app-landing-mark"
          :src="app.icon"
          alt=""
          width="160"
          height="160"
          decoding="async"
        />
      </div>

      <div class="app-landing-copy">
        <h1>{{ name }}</h1>
        <p class="app-tagline">{{ tagline }}</p>
        <div class="app-badges">
          <span class="badge mint">{{ t('appHome.nativeTag') }}</span>
          <span class="badge">{{ categoryName }}</span>
          <span class="badge mono">{{ app.id }}</span>
        </div>
        <div class="app-cta">
          <button type="button" class="btn btn-primary" @click="downloadOpen = true">
            <DocIcon name="download" />
            {{ t('appHome.download') }}
          </button>
          <a
            v-if="app.portal"
            class="btn btn-ghost"
            :href="app.portal"
            target="_blank"
            rel="noopener"
          >
            {{ t('appHome.ctaSite') }}
            <DocIcon name="arrow" />
          </a>
          <a class="btn btn-ghost" :href="app.help" target="_blank" rel="noopener">
            {{ t('appHome.ctaHelp') }}
          </a>
          <a class="btn btn-ghost" :href="docPath(app.slug, 'support', locale)">
            {{ t('appHome.ctaSupport') }}
          </a>
        </div>
      </div>

      <aside class="app-specs-card">
        <div class="app-spec">
          <span>{{ t('appHome.info.version') }}</span>
          <strong class="mono">{{ app.version }}</strong>
        </div>
        <div class="app-spec">
          <span>{{ t('appHome.info.arch') }}</span>
          <strong>amd64 / arm64</strong>
        </div>
        <div class="app-spec">
          <span>{{ t('appHome.info.port') }}</span>
          <strong class="mono">{{ app.port }}</strong>
        </div>
        <div class="app-spec">
          <span>{{ t('appHome.info.login') }}</span>
          <strong>{{ login }}</strong>
        </div>
      </aside>
    </section>

    <p class="app-lead">{{ t('appHome.lead', { name, id: app.id }) }}</p>

    <div class="app-install-note">
      <span class="sideload-tag">{{ t('home.notice.tag') }}</span>
      <p>{{ t('appHome.installNote') }}</p>
      <a :href="`${homePath(locale)}#install`">
        {{ t('home.notice.cta') }}
        <DocIcon name="arrow" />
      </a>
    </div>

    <section class="section">
      <div class="section-head" data-reveal>
        <span class="section-index">01 / {{ t('appHome.highlightsIndex') }}</span>
        <h2>{{ t('appHome.highlightsTitle', { name }) }}</h2>
        <p class="section-desc">{{ t('appHome.highlightsLead') }}</p>
      </div>

      <div class="feature-grid">
        <article
          v-for="(item, index) in highlights"
          :key="item.title"
          class="feature-card"
          data-reveal
          :style="{ '--reveal-delay': `${index * 60}ms` }"
        >
          <span class="feature-num mono">{{ String(index + 1).padStart(2, '0') }}</span>
          <h3>{{ item.title }}</h3>
          <p>{{ item.desc }}</p>
        </article>
      </div>
    </section>

    <section class="section">
      <div class="section-head" data-reveal>
        <span class="section-index">02 / {{ t('appHome.specsIndex') }}</span>
        <h2>{{ t('appHome.specsTitle') }}</h2>
      </div>

      <div class="spec-layout">
        <div class="table-wrap">
          <table class="info-table">
            <tbody>
              <tr>
                <th>{{ t('appHome.info.app') }}</th>
                <td>{{ name }}<span class="spec-sub">{{ provider }}</span></td>
              </tr>
              <tr>
                <th>{{ t('appHome.info.id') }}</th>
                <td class="mono">{{ app.id }}</td>
              </tr>
              <tr>
                <th>{{ t('appHome.info.category') }}</th>
                <td>{{ categoryName }}</td>
              </tr>
              <tr>
                <th>{{ t('appHome.info.version') }}</th>
                <td class="mono">{{ app.version }}</td>
              </tr>
              <tr>
                <th>{{ t('appHome.info.arch') }}</th>
                <td>amd64 / arm64</td>
              </tr>
              <tr>
                <th>{{ t('appHome.info.port') }}</th>
                <td class="mono">{{ app.port }}</td>
              </tr>
              <tr>
                <th>{{ t('appHome.info.platform') }}</th>
                <td>{{ t('appHome.platformValue') }}</td>
              </tr>
              <tr>
                <th>{{ t('appHome.info.permission') }}</th>
                <td>{{ permission }}</td>
              </tr>
              <tr>
                <th>{{ t('appHome.info.login') }}</th>
                <td>{{ login }}</td>
              </tr>
              <tr>
                <th>{{ t('appHome.info.portal') }}</th>
                <td>
                  <a v-if="app.portal" :href="app.portal" target="_blank" rel="noopener">
                    {{ app.portalLabel }}
                  </a>
                  <span v-else>{{ t('appHome.providerFallback') }}</span>
                </td>
              </tr>
              <tr>
                <th>{{ t('appHome.info.help') }}</th>
                <td>
                  <a :href="app.help" target="_blank" rel="noopener">{{ app.help }}</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <aside class="spec-aside">
          <span class="spec-aside-icon"><DocIcon name="package" /></span>
          <h3>{{ t('appHome.nativeTag') }}</h3>
          <p>{{ t('appHome.closure') }}</p>
          <a class="app-aside-link" :href="docPath(app.slug, 'privacy', locale)">
            {{ t('appHome.ctaPrivacy') }}
            <DocIcon name="arrow" />
          </a>
        </aside>
      </div>
    </section>

    <section class="section">
      <div class="section-head" data-reveal>
        <span class="section-index">03 / {{ t('appHome.docsIndex') }}</span>
        <h2>{{ t('appHome.docsTitle') }}</h2>
        <p class="section-desc">{{ t('appHome.docsLead') }}</p>
      </div>
      <div class="doc-grid">
        <a
          v-for="doc in docIds"
          :key="doc"
          class="doc-card"
          :href="docPath(app.slug, doc, locale)"
        >
          <span class="doc-icon-tile"><DocIcon :name="iconOf(doc)" /></span>
          <strong>{{ t(`nav.${doc}`) }}</strong>
          <p>{{ t(`docDesc.${doc}`) }}</p>
          <span class="doc-open">{{ t('doc.open') }} →</span>
        </a>
      </div>
    </section>

    <section class="section">
      <div class="section-head" data-reveal>
        <h2>{{ t('appHome.moreTitle') }}</h2>
        <p class="section-desc">{{ t('appHome.moreDesc') }}</p>
      </div>
      <div class="chip-row">
        <a
          v-for="item in others"
          :key="item.slug"
          class="chip"
          :href="docPath(item.slug, 'index', locale)"
        >
          <img :src="item.icon" alt="" width="18" height="18" style="border-radius: 5px" />
          {{ item.name }}
        </a>
        <a class="chip ghost" :href="`${homePath(locale)}#apps`">{{ t('appHome.moreAll') }}</a>
      </div>
    </section>

    <div
      v-if="downloadOpen"
      class="dl-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dl-title"
      @click.self="closeDownload"
    >
      <div class="dl-dialog">
        <button
          type="button"
          class="dl-close"
          :aria-label="t('appHome.downloadModal.close')"
          @click="closeDownload"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <h2 id="dl-title">{{ t('appHome.downloadModal.title') }}</h2>
        <p class="dl-desc">{{ t('appHome.downloadModal.desc', { name }) }}</p>

        <div class="dl-body">
          <div class="dl-qr">
            <img
              src="/wechat-qrcode.jpg"
              :alt="t('appHome.downloadModal.qrAlt')"
              width="220"
              height="220"
              loading="lazy"
              decoding="async"
            />
            <span>{{ t('appHome.downloadModal.qrHint') }}</span>
          </div>

          <div class="dl-keywords-block">
            <span class="dl-keywords-label">{{ t('appHome.downloadModal.keywords') }}</span>
            <div class="dl-keywords">
              <button
                v-for="keyword in app.downloadKeywords"
                :key="keyword"
                type="button"
                class="dl-keyword"
                @click="copyKeyword(keyword)"
              >
                {{ keyword }}
                <span v-if="copiedKeyword === keyword" class="dl-copied">
                  {{ t('appHome.downloadModal.copied') }}
                </span>
              </button>
            </div>
            <p class="dl-note">{{ t('appHome.downloadModal.note') }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
