<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import DocIcon from '@/components/DocIcon.vue'
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

const appSlug = computed(() =>
  route.value.kind === 'app' || route.value.kind === 'doc' ? route.value.slug : '',
)

const activeDoc = computed(() => (route.value.kind === 'doc' ? route.value.doc : null))

const sections = [
  { id: 'product', key: 'nav.product' },
  { id: 'apps', key: 'nav.apps' },
  { id: 'legal', key: 'nav.legal' },
  { id: 'compliance', key: 'nav.compliance' },
] as const
</script>

<template>
  <header class="site-header">
    <div class="wrap header-inner">
      <a class="brand" :href="homeHref">
        <img class="brand-mark" src="/favicon.svg" alt="NASPK" width="34" height="34" />
        <span class="brand-text">
          <strong>NASPK</strong>
          <small>{{ t('site.brand') }}</small>
        </span>
      </a>

      <nav class="nav">
        <template v-if="appSlug">
          <a
            v-for="doc in docIds"
            :key="doc"
            :href="docPath(appSlug, doc, route.locale)"
            :class="{ active: activeDoc === doc }"
          >
            {{ t(`nav.${doc}`) }}
          </a>
        </template>
        <template v-else>
          <a
            v-for="section in sections"
            :key="section.id"
            :href="isHome ? `#${section.id}` : `${homeHref}#${section.id}`"
          >
            {{ t(section.key) }}
          </a>
        </template>
      </nav>

      <div class="header-actions">
        <a v-if="!isHome" class="header-cta" :href="`${homeHref}#apps`">{{ t('nav.apps') }}</a>
        <a class="lang-switch" :href="langHref">
          <DocIcon name="globe" />
          {{ t('lang.switch') }}
        </a>
      </div>
    </div>
  </header>
</template>
