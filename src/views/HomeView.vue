<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import DocIcon from '@/components/DocIcon.vue'
import {
  appCategories,
  apps,
  categoryById,
  type AppCategoryId,
  type AppInfo,
} from '@/i18n/docs/apps'
import { docPath } from '@/i18n/docs'
import type { LocaleCode } from '@/i18n/docs/types'
import { CONTACT_EMAIL, QQ_GROUP_NO, QQ_GROUP_URL } from '@/contact'

const props = defineProps<{ locale: LocaleCode }>()

const { t, tm } = useI18n()

const query = ref('')
const activeCategory = ref<AppCategoryId | 'all'>('all')

type Feature = { num: string; title: string; desc: string }
type Step = { num: string; title: string; desc: string }
type Faq = { q: string; a: string }

const features = computed(() => tm('home.features') as unknown as Feature[])
const steps = computed(() => tm('home.steps') as unknown as Step[])
const faq = computed(() => tm('home.faq') as unknown as Faq[])

const categories = computed(() =>
  appCategories.map((category) => ({
    id: category.id,
    name: category.name,
    count: apps.filter((app) => app.category === category.id).length,
  })),
)

const filtered = computed(() => {
  const keyword = query.value.trim().toLowerCase()
  return apps.filter((app) => {
    if (activeCategory.value !== 'all' && app.category !== activeCategory.value) return false
    if (!keyword) return true
    return [app.name.zh, app.name.en, app.id, app.slug, app.provider.zh, app.provider.en]
      .join(' ')
      .toLowerCase()
      .includes(keyword)
  })
})

const nameOf = (app: AppInfo): string =>
  props.locale === 'en-US' ? app.name.en : app.name.zh

const providerOf = (app: AppInfo): string =>
  props.locale === 'en-US' ? app.provider.en : app.provider.zh

const categoryOf = (app: AppInfo): string => {
  const name = categoryById(app.category)
  return props.locale === 'en-US' ? name.en : name.zh
}

const unilink = computed(() => apps.find((app) => app.slug === 'unilink'))

const heroApps = computed(() => apps.filter((app) => app.slug !== 'unilink'))
const stackApps = computed(() => apps.slice(0, 6))

const marqueeViewport = ref<HTMLElement | null>(null)
const marqueeTrack = ref<HTMLElement | null>(null)
const marqueeSets = ref(2)
const marqueeStyle = ref<Record<string, string>>({})

const marqueeItems = computed(() =>
  Array.from({ length: marqueeSets.value * 2 }, (_, set) =>
    apps.map((app) => ({ key: `${app.slug}-${set}`, app })),
  ).flat(),
)

// 复制若干份应用列表，保证「一份」的宽度不短于视口，位移正好等于一份的宽度，循环处不会露出空白。
const measureMarquee = async (): Promise<void> => {
  const viewport = marqueeViewport.value
  const track = marqueeTrack.value
  if (!viewport || !track) return
  const total = track.scrollWidth
  if (total <= 0) return
  const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0
  const sets = marqueeSets.value
  const period = (total + gap) / (sets * 2)
  if (period <= 0) return
  const copies = Math.max(2, Math.ceil(viewport.clientWidth / period) + 1)
  if (copies > sets) {
    marqueeSets.value = copies
    await nextTick()
    measureMarquee()
    return
  }
  marqueeStyle.value = {
    '--marquee-shift': `${period}px`,
    animationDuration: `${Math.max(24, Math.round(period / 48))}s`,
  }
}

let marqueeObserver: ResizeObserver | null = null

onMounted(() => {
  measureMarquee()
  if (typeof ResizeObserver !== 'undefined') {
    marqueeObserver = new ResizeObserver(() => measureMarquee())
    if (marqueeViewport.value) marqueeObserver.observe(marqueeViewport.value)
    if (marqueeTrack.value) marqueeObserver.observe(marqueeTrack.value)
  }
})

onBeforeUnmount(() => {
  marqueeObserver?.disconnect()
  marqueeObserver = null
})

const orbStyle = (index: number): Record<string, string> => {
  const total = heroApps.value.length
  return {
    '--a': `${(index / total) * 360}deg`,
  }
}

const cardSize = (index: number): string =>
  index === 0 || index === 1 ? 'wide' : index === features.value.length - 1 ? 'full' : ''

const loginChips = ['扫码', 'Token', 'Cookie', 'API Key']
const langChips = ['简体中文', 'English', 'PC 端']

const resetFilters = (): void => {
  query.value = ''
  activeCategory.value = 'all'
}
</script>

<template>
  <div class="wrap">
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">{{ t('home.eyebrow') }}</p>
        <h1 class="hero-title">
          {{ t('home.title') }}
          <span class="gradient-text">{{ t('home.accent') }}</span>
        </h1>
        <p class="hero-lead">{{ t('home.lead') }}</p>
        <div class="hero-actions">
          <a class="btn btn-primary" href="#apps">
            {{ t('home.primary') }}
            <DocIcon name="arrow" />
          </a>
          <a class="btn btn-ghost" href="#product">{{ t('home.secondary') }}</a>
        </div>
        <div class="stat-strip">
          <div class="stat">
            <strong>{{ apps.length }}</strong>
            <span>{{ t('home.stats.apps') }}</span>
          </div>
          <div class="stat">
            <strong>{{ categories.length }}</strong>
            <span>{{ t('home.stats.types') }}</span>
          </div>
          <div class="stat">
            <strong>2</strong>
            <span>{{ t('home.stats.langs') }}</span>
          </div>
          <div class="stat">
            <strong>0</strong>
            <span>{{ t('home.stats.cloud') }}</span>
          </div>
        </div>
      </div>

      <div class="hero-visual" aria-hidden="true">
        <div class="orb">
          <div class="orb-ring" />
          <div class="orb-ring-2" />
          <div class="orb-core">
            <img src="/favicon.svg" alt="" width="60" height="60" />
          </div>
          <div class="orb-orbit">
            <span
              v-for="(app, index) in heroApps"
              :key="app.slug"
              class="orb-icon"
              :style="orbStyle(index)"
            >
              <span class="orb-icon-inner">
                <img :src="app.icon" alt="" width="34" height="34" loading="lazy" decoding="async" />
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  </div>

  <div class="marquee" aria-hidden="true">
    <div ref="marqueeViewport" class="marquee-viewport">
      <div ref="marqueeTrack" class="marquee-track" :style="marqueeStyle">
        <span v-for="item in marqueeItems" :key="item.key" class="marquee-item">
          <img :src="item.app.icon" alt="" width="22" height="22" loading="lazy" decoding="async" />
          {{ nameOf(item.app) }}
        </span>
      </div>
    </div>
  </div>

  <div class="wrap">
    <section id="product" class="section">
      <div class="section-head" data-reveal>
        <span class="section-index">01 / {{ t('home.featuresIndex') }}</span>
        <h2>{{ t('home.featuresTitle') }}</h2>
        <p class="section-desc">{{ t('home.featuresLead') }}</p>
      </div>

      <div class="bento">
        <article
          v-for="(feature, index) in features"
          :key="feature.num"
          class="bento-card"
          :class="cardSize(index)"
          data-reveal
          :style="{ '--reveal-delay': `${index * 70}ms` }"
        >
          <span class="bento-num mono">{{ feature.num }}</span>
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.desc }}</p>

          <div v-if="index === 0" class="bento-visual">
            <div class="icon-stack">
              <img
                v-for="app in stackApps"
                :key="app.slug"
                :src="app.icon"
                :alt="nameOf(app)"
                width="34"
                height="34"
                loading="lazy"
                decoding="async"
              />
              <span class="stack-more mono">+{{ apps.length - stackApps.length }}</span>
            </div>
          </div>
          <div v-else-if="index === 1" class="bento-visual">
            <span class="code-line">com.naspk.pan115</span>
            <span class="visual-chip mint">{{ t('home.native.chip') }}</span>
          </div>
          <div v-else-if="index === 2" class="bento-visual">
            <span class="visual-chip">{{ t('home.data.chip1') }}</span>
            <span class="visual-chip">{{ t('home.data.chip2') }}</span>
          </div>
          <div v-else-if="index === 3" class="bento-visual">
            <span v-for="chip in loginChips" :key="chip" class="visual-chip">{{ chip }}</span>
          </div>
          <div v-else-if="index === 4" class="bento-visual">
            <span v-for="chip in langChips" :key="chip" class="visual-chip">{{ chip }}</span>
          </div>
          <div v-else class="bento-visual">
            <span class="visual-chip mint">{{ t('home.more.chip1') }}</span>
            <span class="visual-chip mint">{{ t('home.more.chip2') }}</span>
            <span class="visual-chip">{{ t('home.more.chip3') }}</span>
            <a
              v-if="unilink"
              class="visual-chip"
              :href="docPath(unilink.slug, 'index', locale)"
            >
              {{ nameOf(unilink) }} →
            </a>
          </div>
        </article>
      </div>
    </section>

    <section id="apps" class="section">
      <div class="section-head row" data-reveal>
        <div>
          <span class="section-index">02 / {{ t('home.appsIndex') }}</span>
          <h2>{{ t('home.appsTitle') }}</h2>
          <p class="section-desc">{{ t('home.appsLead') }}</p>
        </div>
        <div class="search">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="M16.5 16.5L21 21" />
          </svg>
          <input
            v-model="query"
            type="search"
            :aria-label="t('home.searchLabel')"
            :placeholder="t('home.searchPlaceholder')"
          />
        </div>
      </div>

      <div class="filter-bar" role="group" :aria-label="t('home.filterLabel')">
        <button
          type="button"
          class="filter-chip"
          :class="{ 'is-active': activeCategory === 'all' }"
          @click="activeCategory = 'all'"
        >
          {{ t('home.allApps') }}
          <span class="mono">{{ apps.length }}</span>
        </button>
        <button
          v-for="category in categories"
          :key="category.id"
          type="button"
          class="filter-chip"
          :class="{ 'is-active': activeCategory === category.id }"
          @click="activeCategory = category.id"
        >
          {{ locale === 'en-US' ? category.name.en : category.name.zh }}
          <span class="mono">{{ category.count }}</span>
        </button>
      </div>

      <div v-if="filtered.length" class="app-grid">
        <a
          v-for="app in filtered"
          :key="app.slug"
          class="app-card"
          :href="docPath(app.slug, 'index', locale)"
        >
          <img
            class="app-mark"
            :src="app.icon"
            :alt="nameOf(app)"
            width="46"
            height="46"
            loading="lazy"
            decoding="async"
          />
          <span class="app-body">
            <span class="app-name">
              {{ nameOf(app) }}
              <span class="tag">{{ categoryOf(app) }}</span>
            </span>
            <span class="app-id mono">{{ app.id }}</span>
            <span class="app-provider">{{ providerOf(app) }}</span>
          </span>
          <span class="app-arrow" aria-hidden="true">
            <DocIcon name="arrow" />
          </span>
        </a>
      </div>

      <div v-else class="empty">
        <strong>{{ t('home.emptyTitle') }}</strong>
        <p>{{ t('home.emptyDesc') }}</p>
        <button type="button" class="ghost-button" @click="resetFilters">
          {{ t('home.clear') }}
        </button>
      </div>

      <p class="apps-disclaimer">{{ t('home.appsDisclaimer') }}</p>
    </section>

    <section id="install" class="section">
      <div class="section-head" data-reveal>
        <span class="section-index">03 / {{ t('home.stepsIndex') }}</span>
        <h2>{{ t('home.stepsTitle') }}</h2>
        <p class="section-desc">{{ t('home.stepsLead') }}</p>
      </div>
      <div class="steps">
        <article
          v-for="(step, index) in steps"
          :key="step.num"
          class="step"
          data-reveal
          :style="{ '--reveal-delay': `${index * 70}ms` }"
        >
          <span class="step-num">{{ step.num }}</span>
          <h3>{{ step.title }}</h3>
          <p>{{ step.desc }}</p>
        </article>
      </div>
    </section>

    <section id="faq" class="section">
      <div class="section-head" data-reveal>
        <span class="section-index">04 / {{ t('home.faqIndex') }}</span>
        <h2>{{ t('home.faqTitle') }}</h2>
      </div>
      <div class="faq">
        <details v-for="item in faq" :key="item.q">
          <summary>{{ item.q }}</summary>
          <p>{{ item.a }}</p>
        </details>
      </div>
    </section>

    <section id="community" class="section">
      <div class="community-card" data-reveal>
        <div class="community-copy">
          <span class="section-index">05 / {{ t('home.communityIndex') }}</span>
          <h2>{{ t('home.communityTitle') }}</h2>
          <p class="section-desc">{{ t('home.communityLead') }}</p>
        </div>
        <div class="community-actions">
          <a class="btn btn-primary" :href="QQ_GROUP_URL" target="_blank" rel="noopener">
            {{ t('home.communityJoin') }} {{ QQ_GROUP_NO }}
          </a>
          <a class="btn btn-ghost" :href="`mailto:${CONTACT_EMAIL}`">{{ CONTACT_EMAIL }}</a>
        </div>
      </div>
    </section>
  </div>
</template>
