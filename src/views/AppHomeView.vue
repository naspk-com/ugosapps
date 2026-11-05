<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import DocIcon from '@/components/DocIcon.vue'
import { appBySlug, apps, categoryById } from '@/i18n/docs/apps'
import { docPath, homePath } from '@/i18n/docs'
import { docIds, type LocaleCode } from '@/i18n/docs/types'

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
        <p class="eyebrow">{{ t('appHome.eyebrow') }}</p>
        <h1>{{ name }}</h1>
        <p class="app-tagline">{{ tagline }}</p>
        <div class="app-badges">
          <span class="badge mint">{{ t('appHome.nativeTag') }}</span>
          <span class="badge">{{ categoryName }}</span>
          <span class="badge mono">{{ app.id }}</span>
        </div>
        <div class="app-cta">
          <a
            v-if="app.portal"
            class="btn btn-primary"
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
  </div>
</template>
