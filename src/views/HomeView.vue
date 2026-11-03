<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import DocIcon from '@/components/DocIcon.vue'
import { apps } from '@/i18n/docs/apps'
import { docPath } from '@/i18n/docs'
import type { LocaleCode } from '@/i18n/docs/types'

const props = defineProps<{ locale: LocaleCode }>()

const { t, tm } = useI18n()

const query = ref('')

type Feature = { num: string; title: string; desc: string }
type Step = { num: string; title: string; desc: string }
type Faq = { q: string; a: string }

const features = computed(() => tm('home.features') as unknown as Feature[])
const steps = computed(() => tm('home.steps') as unknown as Step[])
const faq = computed(() => tm('home.faq') as unknown as Faq[])
const compliance = computed(() => tm('home.compliance') as unknown as string[])

const filtered = computed(() => {
  const keyword = query.value.trim().toLowerCase()
  if (!keyword) return apps
  return apps.filter((app) =>
    [app.name.zh, app.name.en, app.id, app.slug, app.provider.zh, app.provider.en]
      .join(' ')
      .toLowerCase()
      .includes(keyword),
  )
})

const nameOf = (app: (typeof apps)[number]): string =>
  props.locale === 'en-US' ? app.name.en : app.name.zh

const providerOf = (app: (typeof apps)[number]): string =>
  props.locale === 'en-US' ? app.provider.en : app.provider.zh

const unilink = computed(() => apps.find((app) => app.slug === 'unilink'))

const heroApps = computed(() => apps.filter((app) => app.slug !== 'unilink'))
const stackApps = computed(() => apps.slice(0, 6))
const doubled = computed(() => [...apps, ...apps])

const orbStyle = (index: number): Record<string, string> => {
  const total = heroApps.value.length
  return {
    '--a': `${(index / total) * 360}deg`,
    '--d': `${index * 0.45}s`,
  }
}

const docsCount = apps.length * 4

const cardSize = (index: number): string =>
  index === 0 || index === 1 ? 'wide' : index === features.value.length - 1 ? 'full' : ''

const loginChips = ['扫码', 'Token', 'Cookie', 'API Key']
const langChips = ['简体中文', 'English', 'PC 端']
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
          <a class="btn btn-ghost" href="#legal">{{ t('home.secondary') }}</a>
        </div>
        <div class="stat-strip">
          <div class="stat">
            <strong>{{ apps.length }}</strong>
            <span>{{ t('home.stats.apps') }}</span>
          </div>
          <div class="stat">
            <strong>{{ docsCount }}</strong>
            <span>{{ t('home.stats.docs') }}</span>
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
          <span
            v-for="(app, index) in heroApps"
            :key="app.slug"
            class="orb-icon"
            :style="orbStyle(index)"
          >
            <img :src="app.icon" alt="" width="34" height="34" loading="lazy" decoding="async" />
          </span>
        </div>
      </div>
    </section>
  </div>

  <div class="marquee" aria-hidden="true">
    <span class="marquee-label">{{ t('home.marquee') }}</span>
    <div class="marquee-viewport">
      <div class="marquee-track">
        <span v-for="(app, index) in doubled" :key="`${app.slug}-${index}`" class="marquee-item">
          <img :src="app.icon" alt="" width="22" height="22" loading="lazy" decoding="async" />
          {{ nameOf(app) }}
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
            <span class="visual-chip mint">域名</span>
            <span class="visual-chip mint">DNS</span>
            <span class="visual-chip mint">SSL</span>
            <span class="visual-chip mint">DDNS</span>
            <a v-if="unilink" class="visual-chip" :href="docPath(unilink.slug, 'index', locale)">
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
              <span v-if="app.domainTool" class="tag">{{ t('home.tagTool') }}</span>
            </span>
            <span class="app-id mono">{{ app.id }}</span>
            <span class="app-provider">{{ providerOf(app) }}</span>
            <span class="app-docs">{{ t('home.docsHint') }}</span>
          </span>
          <span class="app-arrow" aria-hidden="true">
            <DocIcon name="arrow" />
          </span>
        </a>
      </div>

      <div v-else class="empty">
        <strong>{{ t('home.emptyTitle') }}</strong>
        <p>{{ t('home.emptyDesc') }}</p>
        <button type="button" class="ghost-button" @click="query = ''">
          {{ t('home.clear') }}
        </button>
      </div>
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

    <section id="legal" class="section">
      <div class="legal-panel" data-reveal>
        <div>
          <span class="section-index">04 / {{ t('home.legalIndex') }}</span>
          <h2>{{ t('home.legalTitle') }}</h2>
          <p class="section-desc">{{ t('home.legalLead') }}</p>
          <div class="hero-actions" style="margin: 24px 0 0">
            <a class="btn btn-primary" :href="docPath(apps[0].slug, 'index', locale)">
              {{ t('home.legalCta') }}
              <DocIcon name="arrow" />
            </a>
          </div>
          <p class="legal-note">{{ t('home.legalNote') }}</p>
        </div>
        <div class="legal-list">
          <a
            v-for="doc in ['privacy', 'terms', 'third-party', 'support'] as const"
            :key="doc"
            class="legal-row"
            :href="docPath(apps[0].slug, doc, locale)"
          >
            <span class="legal-icon">
              <DocIcon
                :name="
                  doc === 'privacy'
                    ? 'shield'
                    : doc === 'terms'
                      ? 'file'
                      : doc === 'third-party'
                        ? 'package'
                        : 'life'
                "
              />
            </span>
            <span>
              <strong>{{ t(`nav.${doc}`) }}</strong>
              <small>{{ t(`docDesc.${doc}`) }}</small>
            </span>
            <span class="app-arrow" aria-hidden="true"><DocIcon name="arrow" /></span>
          </a>
        </div>
      </div>
    </section>

    <section id="compliance" class="section">
      <div class="section-head" data-reveal>
        <span class="section-index">05 / {{ t('home.complianceIndex') }}</span>
        <h2>{{ t('home.complianceTitle') }}</h2>
      </div>
      <div class="compliance-card" data-reveal>
        <p class="compliance-lead">{{ t('home.complianceLead') }}</p>
        <ul class="check-list">
          <li v-for="item in compliance" :key="item">
            <DocIcon name="check" />
            <span>{{ item }}</span>
          </li>
        </ul>
      </div>
    </section>

    <section id="faq" class="section">
      <div class="section-head" data-reveal>
        <span class="section-index">06 / {{ t('home.faqIndex') }}</span>
        <h2>{{ t('home.faqTitle') }}</h2>
      </div>
      <div class="faq">
        <details v-for="item in faq" :key="item.q">
          <summary>{{ item.q }}</summary>
          <p>{{ item.a }}</p>
        </details>
      </div>
    </section>
  </div>
</template>
