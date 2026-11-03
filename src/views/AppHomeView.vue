<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import DocIcon from '@/components/DocIcon.vue'
import { appBySlug, apps } from '@/i18n/docs/apps'
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

const iconOf = (doc: (typeof docIds)[number]): 'shield' | 'file' | 'package' | 'life' =>
  doc === 'privacy' ? 'shield' : doc === 'terms' ? 'file' : doc === 'third-party' ? 'package' : 'life'

const others = computed(() =>
  apps
    .filter((item) => item.slug !== props.slug)
    .slice(0, 5)
    .map((item) => ({
      slug: item.slug,
      icon: item.icon,
      name: props.locale === 'en-US' ? item.name.en : item.name.zh,
    })),
)
</script>

<template>
  <div v-if="app" class="wrap">
    <nav class="crumbs" :aria-label="t('appHome.back')">
      <a :href="homePath(locale)">{{ t('nav.home') }}</a>
      <span aria-hidden="true">/</span>
      <a :href="`${homePath(locale)}#apps`">{{ t('nav.apps') }}</a>
      <span aria-hidden="true">/</span>
      <span>{{ name }}</span>
    </nav>

    <section class="app-hero">
      <img
        class="app-hero-mark"
        :src="app.icon"
        :alt="name"
        width="86"
        height="86"
        decoding="async"
      />
      <div class="app-hero-copy">
        <p class="eyebrow">{{ t('appHome.eyebrow') }}</p>
        <h1>{{ name }}</h1>
        <p class="id-chip mono">{{ app.id }}</p>
      </div>
      <div class="hero-actions" style="margin: 0 0 0 auto">
        <a class="btn btn-primary" :href="docPath(app.slug, 'privacy', locale)">
          {{ t('nav.privacy') }}
          <DocIcon name="arrow" />
        </a>
        <a class="btn btn-ghost" :href="`${homePath(locale)}#apps`">{{ t('appHome.back') }}</a>
      </div>
    </section>

    <p class="hero-lead" style="margin-top: 8px">{{ t('appHome.lead', { name, id: app.id }) }}</p>

    <section class="section">
      <div class="section-head">
        <span class="section-index">{{ t('appHome.docsTitle') }}</span>
        <h2>{{ t('appHome.docsTitle') }}</h2>
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
      <div class="section-head">
        <span class="section-index">{{ t('appHome.infoTitle') }}</span>
        <h2>{{ t('appHome.infoTitle') }}</h2>
      </div>
      <div class="table-wrap">
        <table class="info-table">
          <tbody>
            <tr>
              <th>{{ t('appHome.info.app') }}</th>
              <td>{{ name }}</td>
            </tr>
            <tr>
              <th>{{ t('appHome.info.id') }}</th>
              <td class="mono">{{ app.id }}</td>
            </tr>
            <tr>
              <th>{{ t('appHome.info.service') }}</th>
              <td>{{ name }}</td>
            </tr>
            <tr>
              <th>{{ t('appHome.info.provider') }}</th>
              <td>{{ provider }}</td>
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
          </tbody>
        </table>
      </div>
      <p class="notice">{{ t('appHome.closure') }}</p>
    </section>

    <section class="section">
      <div class="section-head">
        <span class="section-index">{{ t('appHome.moreTitle') }}</span>
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
        <a class="chip ghost" :href="`${homePath(locale)}#apps`">{{ t('appHome.back') }}</a>
      </div>
    </section>
  </div>
</template>
