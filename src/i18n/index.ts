import { createI18n } from 'vue-i18n'
import en from './ui/en-US'
import zh from './ui/zh-CN'
import type { LocaleCode } from './docs/types'

export const defaultLocale: LocaleCode = 'zh-CN'

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: defaultLocale,
  fallbackLocale: 'zh-CN',
  messages: {
    'zh-CN': zh,
    'en-US': en,
  },
})

export const setLocale = (locale: LocaleCode): void => {
  i18n.global.locale.value = locale
  document.documentElement.lang = locale
}
