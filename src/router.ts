import { ref } from 'vue'
import { appBySlug } from '@/i18n/docs/apps'
import { docIds, type DocId, type LocaleCode } from '@/i18n/docs/types'

export type Route =
  | { kind: 'home'; locale: LocaleCode }
  | { kind: 'app'; locale: LocaleCode; slug: string }
  | { kind: 'doc'; locale: LocaleCode; slug: string; doc: DocId }
  | { kind: 'notfound'; locale: LocaleCode }

const knownDocs = new Set<string>(docIds)

export const parsePath = (pathname: string): Route => {
  const segments = pathname.split('/').filter(Boolean)
  if (segments[segments.length - 1] === 'index.html') segments.pop()

  let locale: LocaleCode = 'zh-CN'
  if (segments[0] === 'en') {
    locale = 'en-US'
    segments.shift()
  }
  if (segments.length === 0) return { kind: 'home', locale }

  const app = appBySlug(segments[0])
  if (!app) return { kind: 'notfound', locale }

  const rest = segments.slice(1)
  if (rest[0] === 'en') {
    locale = 'en-US'
    rest.shift()
  }
  if (rest.length === 0) return { kind: 'app', locale, slug: app.slug }
  if (rest.length > 1) return { kind: 'notfound', locale }

  const doc = rest[0].replace(/\.html$/, '')
  if (doc === 'index') return { kind: 'app', locale, slug: app.slug }
  if (knownDocs.has(doc)) return { kind: 'doc', locale, slug: app.slug, doc: doc as DocId }
  return { kind: 'notfound', locale }
}

export const route = ref<Route>(parsePath(window.location.pathname))
export const currentPath = ref(window.location.pathname + window.location.search)

declare global {
  interface Window {
    _hmt?: [string, ...unknown[]][]
  }
}

const trackPageview = (): void => {
  window._hmt = window._hmt || []
  window._hmt.push(['_trackPageview', window.location.pathname + window.location.search])
}

const sync = (): void => {
  route.value = parsePath(window.location.pathname)
  currentPath.value = window.location.pathname + window.location.search
  trackPageview()
}

window.addEventListener('popstate', sync)

export const navigate = (to: string, replace = false): void => {
  if (replace) window.history.replaceState(null, '', to)
  else window.history.pushState(null, '', to)
  sync()
}
