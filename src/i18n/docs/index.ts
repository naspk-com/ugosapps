import enDocs from './en-US'
import zhDocs from './zh-CN'
import type { DocId, DocPage, DocSet, LocaleCode } from './types'
import type { AppInfo } from './apps'

const sets: Record<LocaleCode, DocSet> = {
  'zh-CN': zhDocs,
  'en-US': enDocs,
}

export const getDoc = (locale: LocaleCode, doc: DocId, app: AppInfo): DocPage =>
  sets[locale][doc](app)

export const docPath = (
  slug: string,
  doc: DocId | 'index',
  locale: LocaleCode,
): string =>
  locale === 'en-US' ? `/${slug}/en/${doc}.html` : `/${slug}/${doc}.html`

export const homePath = (locale: LocaleCode): string =>
  locale === 'en-US' ? '/en/index.html' : '/index.html'
