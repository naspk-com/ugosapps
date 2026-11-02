<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import SiteFooter from '@/components/SiteFooter.vue'
import SiteHeader from '@/components/SiteHeader.vue'
import { appBySlug } from '@/i18n/docs/apps'
import { setLocale } from '@/i18n'
import { navigate, route } from '@/router'
import AppHomeView from '@/views/AppHomeView.vue'
import DocView from '@/views/DocView.vue'
import HomeView from '@/views/HomeView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const { t, te } = useI18n()

const app = computed(() => {
  const current = route.value
  return current.kind === 'app' || current.kind === 'doc'
    ? appBySlug(current.slug)
    : undefined
})

const isDoc = computed(() => route.value.kind === 'doc')

const progress = ref(0)

const onScroll = (): void => {
  const max = document.documentElement.scrollHeight - window.innerHeight
  progress.value = max > 0 ? Math.min(1, window.scrollY / max) : 0
}

const updateCanonical = (): void => {
  const link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (link) link.setAttribute('href', `https://legal.naspk.com${window.location.pathname}`)
}

const updateTitle = (): void => {
  const current = route.value
  if (current.kind === 'home') {
    document.title = t('site.name')
    return
  }
  if (current.kind === 'app' || current.kind === 'doc') {
    const info = appBySlug(current.slug)
    if (!info) return
    const name = current.locale === 'en-US' ? info.name.en : info.name.zh
    document.title =
      current.kind === 'app' ? `${name} · NASPK` : `${name} ${t(`nav.${current.doc}`)} · NASPK`
    return
  }
  document.title = `404 · NASPK`
}

watch(
  route,
  (current) => {
    setLocale(current.locale)
    updateCanonical()
    updateTitle()
    window.scrollTo({ top: 0, behavior: 'auto' })
  },
  { immediate: true },
)

watch([() => t('site.name'), app], updateTitle)

const onClick = (event: MouseEvent): void => {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return
  }
  const anchor = (event.target as HTMLElement | null)?.closest('a')
  if (!anchor) return
  const href = anchor.getAttribute('href')
  if (!href || !href.startsWith('/') || anchor.target === '_blank') return
  if (anchor.hasAttribute('download')) return
  if (new URL(href, window.location.href).origin !== window.location.origin) return
  event.preventDefault()
  navigate(href)
}

onMounted(() => {
  document.addEventListener('click', onClick)
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onClick)
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <a class="skip-link" href="#main">{{ t('site.skip') }}</a>
  <div
    v-if="isDoc"
    class="progress"
    :style="{ transform: `scaleX(${progress})` }"
    aria-hidden="true"
  />
  <SiteHeader />
  <main id="main" class="page">
    <HomeView v-if="route.kind === 'home'" :locale="route.locale" />
    <AppHomeView
      v-else-if="route.kind === 'app'"
      :locale="route.locale"
      :slug="route.slug"
    />
    <DocView
      v-else-if="route.kind === 'doc'"
      :locale="route.locale"
      :slug="route.slug"
      :doc="route.doc"
    />
    <NotFoundView v-else :locale="route.locale" />
  </main>
  <SiteFooter :locale="route.locale" />
  <span v-if="te('site.name')" class="visually-hidden">{{ t('site.tagline') }}</span>
</template>
