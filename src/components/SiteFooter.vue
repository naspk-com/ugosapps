<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { homePath } from '@/i18n/docs'
import type { LocaleCode } from '@/i18n/docs/types'

const props = defineProps<{ locale: LocaleCode }>()

const { t } = useI18n()

const homeHref = computed(() => homePath(props.locale))
</script>

<template>
  <footer class="site-footer">
    <div class="wrap footer-grid">
      <div class="footer-brand">
        <img class="brand-mark small" src="/favicon.svg" alt="NASPK" width="32" height="32" />
        <div>
          <strong>NASPK</strong>
          <p>{{ t('footer.developer') }}：尘墨成</p>
          <p>
            {{ t('footer.website') }}：
            <a href="https://www.dustinky.com" target="_blank" rel="noopener">www.dustinky.com</a>
          </p>
        </div>
      </div>
      <div class="footer-links">
        <span class="footer-title">{{ t('footer.docs') }}</span>
        <a :href="homeHref">{{ t('footer.apps') }}</a>
        <a :href="`${homeHref}#compliance`">{{ t('footer.compliance') }}</a>
      </div>
      <div class="footer-note">
        <p>{{ t('footer.note') }}</p>
        <p class="mono">ugosapps.naspk.com</p>
      </div>
    </div>
  </footer>
</template>
