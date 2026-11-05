<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { appCategories, apps, cloudApps } from '@/i18n/docs/apps'
import { docPath, homePath } from '@/i18n/docs'
import { CONTACT_EMAIL, QQ_GROUP_NO, QQ_GROUP_URL } from '@/contact'
import type { LocaleCode } from '@/i18n/docs/types'

const props = defineProps<{ locale: LocaleCode }>()

const { t } = useI18n()

const home = computed(() => homePath(props.locale))
const sample = apps[0]
const year = new Date().getFullYear()

const appLinks = computed(() => [
  { label: t('footer.cloudCategory'), href: `${home.value}#apps`, count: cloudApps.length },
  {
    label: t('footer.networkCategory'),
    href: `${home.value}#apps`,
    count: apps.length - cloudApps.length,
  },
  { label: t('footer.allApps'), href: `${home.value}#apps`, count: apps.length },
])

const resourceLinks = computed(() => [
  { label: t('footer.install'), href: `${home.value}#install` },
  { label: t('footer.faq'), href: `${home.value}#faq` },
  { label: t('footer.support'), href: docPath(sample.slug, 'support', props.locale) },
])

const legalLinks = computed(() => [
  { label: t('footer.privacy'), href: docPath(sample.slug, 'privacy', props.locale) },
  { label: t('footer.terms'), href: docPath(sample.slug, 'terms', props.locale) },
  { label: t('footer.thirdParty'), href: docPath(sample.slug, 'third-party', props.locale) },
])

const summary = computed(() =>
  t('footer.summary', {
    apps: apps.length,
    cloud: cloudApps.length,
    types: appCategories.length,
  }),
)

const appName = (name: { zh: string; en: string }): string =>
  props.locale === 'en-US' ? name.en : name.zh
</script>

<template>
  <footer class="site-footer">
    <div class="wrap">
      <div class="footer-top">
        <div class="footer-brand-block">
          <a class="footer-brand" :href="home">
            <img class="brand-mark" src="/favicon.svg" alt="NASPK" width="38" height="38" />
            <span class="footer-brand-text">
              <strong>NASPK</strong>
              <small>{{ t('site.brand') }}</small>
            </span>
          </a>
          <p class="footer-summary">{{ summary }}</p>
          <p class="footer-tagline">{{ t('footer.tagline') }}</p>

          <div class="footer-apps" :aria-label="t('footer.allApps')">
            <a
              v-for="app in apps"
              :key="app.slug"
              class="footer-app"
              :href="docPath(app.slug, 'index', locale)"
              :title="appName(app.name)"
            >
              <img
                :src="app.icon"
                :alt="appName(app.name)"
                width="26"
                height="26"
                loading="lazy"
                decoding="async"
              />
            </a>
          </div>
        </div>

        <nav class="footer-col" :aria-label="t('footer.catalogTitle')">
          <span class="footer-title">{{ t('footer.catalogTitle') }}</span>
          <a v-for="link in appLinks" :key="link.label" :href="link.href">
            {{ link.label }}
            <span class="footer-count mono">{{ link.count }}</span>
          </a>
        </nav>

        <nav class="footer-col" :aria-label="t('footer.resourceTitle')">
          <span class="footer-title">{{ t('footer.resourceTitle') }}</span>
          <a v-for="link in resourceLinks" :key="link.label" :href="link.href">
            {{ link.label }}
          </a>
        </nav>

        <nav class="footer-col" :aria-label="t('footer.legalTitle')">
          <span class="footer-title">{{ t('footer.legalTitle') }}</span>
          <a v-for="link in legalLinks" :key="link.label" :href="link.href">
            {{ link.label }}
          </a>
          <p class="footer-note">{{ t('footer.note') }}</p>
        </nav>

        <div class="footer-col footer-contact" :aria-label="t('footer.contactTitle')">
          <span class="footer-title">{{ t('footer.contactTitle') }}</span>
          <a :href="QQ_GROUP_URL" target="_blank" rel="noopener">
            {{ t('footer.qqGroup') }} · {{ QQ_GROUP_NO }}
          </a>
          <a :href="`mailto:${CONTACT_EMAIL}`">{{ t('footer.email') }} · {{ CONTACT_EMAIL }}</a>
          <a href="https://www.dustinky.com" target="_blank" rel="noopener">
            {{ t('footer.website') }} · dustinky.com
          </a>
          <a class="footer-join" :href="QQ_GROUP_URL" target="_blank" rel="noopener">
            {{ t('footer.qqJoin') }}
          </a>
        </div>
      </div>

      <div class="footer-bottom">
        <span class="footer-copy">© {{ year }} NASPK · {{ t('footer.rights') }}</span>
        <span class="footer-disclaimer">{{ t('footer.disclaimer') }}</span>
        <span class="footer-meta">
          <a
            class="footer-icp"
            href="https://beian.miit.gov.cn/"
            target="_blank"
            rel="noopener nofollow"
          >
            {{ t('footer.icp') }}
          </a>
          <a class="footer-domain mono" href="https://ugosapps.naspk.com">ugosapps.naspk.com</a>
        </span>
      </div>
    </div>
  </footer>
</template>
