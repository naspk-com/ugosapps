<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { apps } from '@/i18n/docs/apps'
import { docPath, homePath } from '@/i18n/docs'
import type { LocaleCode } from '@/i18n/docs/types'

const props = defineProps<{ locale: LocaleCode }>()

const { t } = useI18n()

const home = computed(() => homePath(props.locale))

const productLinks = [
  { href: '#product', key: 'nav.product' },
  { href: '#apps', key: 'nav.apps' },
  { href: '#install', key: 'footer.install' },
  { href: '#faq', key: 'footer.faq' },
]

const legalLinks = [
  { doc: 'privacy' as const },
  { doc: 'terms' as const },
  { doc: 'third-party' as const },
  { doc: 'support' as const },
]

const sample = apps[0]

const year = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <div class="wrap">
      <div class="footer-grid">
        <div class="footer-brand">
          <img class="brand-mark small" src="/favicon.svg" alt="" width="28" height="28" />
          <div>
            <strong>NASPK</strong>
            <p>{{ t('site.tagline') }}</p>
          </div>
        </div>

        <nav class="footer-links" :aria-label="t('footer.products')">
          <span class="footer-title">{{ t('footer.products') }}</span>
          <a v-for="link in productLinks" :key="link.key" :href="`${home}${link.href}`">
            {{ t(link.key) }}
          </a>
        </nav>

        <nav class="footer-links" :aria-label="t('footer.docs')">
          <span class="footer-title">{{ t('footer.docs') }}</span>
          <a v-for="link in legalLinks" :key="link.doc" :href="docPath(sample.slug, link.doc, locale)">
            {{ t(`nav.${link.doc}`) }}
          </a>
        </nav>

        <div class="footer-note">
          <span class="footer-title">{{ t('footer.developer') }}</span>
          <p>{{ t('footer.note') }}</p>
          <p class="mono">www.dustinky.com</p>
          <p>{{ t('footer.disclaimer') }}</p>
        </div>
      </div>

      <div class="footer-bottom">
        <span>© {{ year }} NASPK · {{ t('footer.rights') }}</span>
        <span class="mono">ugosapps.naspk.com</span>
      </div>
    </div>
  </footer>
</template>
