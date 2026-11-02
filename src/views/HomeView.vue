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

const markOf = (app: (typeof apps)[number]): string => nameOf(app).slice(0, 1)

const docsCount = apps.length * 4
</script>

<template>
  <div class="wrap">
    <section class="hero">
      <div class="hero-glow" aria-hidden="true" />
      <p class="eyebrow"><span class="dot" />{{ t('home.eyebrow') }}</p>
      <h1 class="hero-title">
        {{ t('home.title') }}
        <span class="gradient-text">{{ t('home.accent') }}</span>
      </h1>
      <p class="hero-lead">{{ t('home.lead') }}</p>
      <div class="stats">
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
      </div>
    </section>

    <section id="apps" class="section">
      <div class="section-head">
        <h2>{{ t('home.appsTitle') }}</h2>
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
          <span class="app-mark">{{ markOf(app) }}</span>
          <span class="app-body">
            <span class="app-name">{{ nameOf(app) }}</span>
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

    <section id="compliance" class="section">
      <div class="section-head">
        <h2>{{ t('home.complianceTitle') }}</h2>
      </div>
      <div class="compliance-card">
        <p class="compliance-lead">{{ t('home.complianceLead') }}</p>
        <ul class="check-list">
          <li v-for="item in compliance" :key="item">
            <DocIcon name="check" />
            <span>{{ item }}</span>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
