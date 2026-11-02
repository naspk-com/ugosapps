<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { apps } from '@/i18n/docs/apps'
import { docPath, homePath } from '@/i18n/docs'
import type { LocaleCode } from '@/i18n/docs/types'

const props = defineProps<{ locale: LocaleCode }>()

const { t } = useI18n()

const suggestions = computed(() =>
  apps.slice(0, 3).map((app) => ({
    slug: app.slug,
    name: props.locale === 'en-US' ? app.name.en : app.name.zh,
  })),
)
</script>

<template>
  <div class="wrap notfound">
    <p class="notfound-code">{{ t('notFound.code') }}</p>
    <h1>{{ t('notFound.title') }}</h1>
    <p class="hero-lead">{{ t('notFound.desc') }}</p>
    <a class="primary-button" :href="homePath(locale)">{{ t('notFound.cta') }}</a>
    <div class="notfound-hints">
      <span>{{ t('notFound.hint') }}</span>
      <a v-for="item in suggestions" :key="item.slug" :href="docPath(item.slug, 'privacy', locale)">
        {{ item.name }}
      </a>
    </div>
  </div>
</template>
