<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import DocIcon from '@/components/DocIcon.vue'
import { themeMode, cycleTheme } from '@/theme'
import { docPath, homePath } from '@/i18n/docs'
import { docIds } from '@/i18n/docs/types'
import { route } from '@/router'

const { t } = useI18n()

const locale = computed(() => route.value.locale)

const homeHref = computed(() => homePath(locale.value))

const langHref = computed(() => {
  const current = route.value
  const other = current.locale === 'zh-CN' ? 'en-US' : 'zh-CN'
  if (current.kind === 'doc') return docPath(current.slug, current.doc, other)
  if (current.kind === 'app') return docPath(current.slug, 'index', other)
  return homePath(other)
})

const isHome = computed(() => route.value.kind === 'home')

const docs = docIds

const themeTitle = computed(() => t(`theme.${themeMode.value}`))
</script>

<template>
  <header class="site-header">
    <div class="wrap header-inner">
      <a class="brand" :href="homeHref">
        <span class="brand-mark">N</span>
        <span class="brand-text">
          <strong>NASPK</strong>
          <small>{{ t('site.brand') }}</small>
        </span>
      </a>

      <nav class="nav">
        <template v-if="isHome">
          <a href="#apps">{{ t('nav.apps') }}</a>
          <a href="#compliance">{{ t('nav.compliance') }}</a>
        </template>
        <template v-else-if="route.kind === 'app' || route.kind === 'doc'">
          <a
            v-for="doc in docs"
            :key="doc"
            :href="docPath(route.slug, doc, route.locale)"
            :class="{ active: route.kind === 'doc' && route.doc === doc }"
          >
            {{ t(`nav.${doc}`) }}
          </a>
        </template>
      </nav>

      <div class="header-actions">
        <button class="icon-button" type="button" :title="themeTitle" @click="cycleTheme">
          <svg v-if="themeMode === 'auto'" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="7" />
            <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1" />
          </svg>
          <svg v-else-if="themeMode === 'light'" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="4.5" />
            <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1" />
          </svg>
          <svg v-else viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
          </svg>
          <span class="visually-hidden">{{ themeTitle }}</span>
        </button>
        <a class="lang-switch" :href="langHref">
          <DocIcon name="globe" />
          {{ t('lang.switch') }}
        </a>
      </div>
    </div>
  </header>
</template>
