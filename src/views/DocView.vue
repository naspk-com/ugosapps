<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import DocIcon from '@/components/DocIcon.vue'
import { appBySlug } from '@/i18n/docs/apps'
import { docPath, getDoc, homePath } from '@/i18n/docs'
import { docIds, type DocId, type LocaleCode } from '@/i18n/docs/types'

const props = defineProps<{ locale: LocaleCode; slug: string; doc: DocId }>()

const { t } = useI18n()

const app = computed(() => appBySlug(props.slug))

const name = computed(() =>
  app.value ? (props.locale === 'en-US' ? app.value.name.en : app.value.name.zh) : '',
)

const page = computed(() => (app.value ? getDoc(props.locale, props.doc, app.value) : null))

const toc = computed(() => page.value?.sections.filter((section) => section.id) ?? [])

const activeId = ref('')

const docIndex = computed(() => docIds.indexOf(props.doc))
const prevDoc = computed(() => (docIndex.value > 0 ? docIds[docIndex.value - 1] : null))
const nextDoc = computed(() =>
  docIndex.value >= 0 && docIndex.value < docIds.length - 1 ? docIds[docIndex.value + 1] : null,
)

let observer: IntersectionObserver | null = null

const observeSections = (): void => {
  observer?.disconnect()
  const headings = Array.from(document.querySelectorAll<HTMLElement>('[data-section]'))
  if (!headings.length) return
  observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
      if (visible[0]) activeId.value = visible[0].target.id
    },
    { rootMargin: '-88px 0px -65% 0px', threshold: [0, 1] },
  )
  headings.forEach((heading) => observer?.observe(heading))
}

onMounted(async () => {
  await nextTick()
  observeSections()
})

watch(
  () => props.doc,
  async () => {
    await nextTick()
    observeSections()
    activeId.value = ''
  },
)

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div v-if="app && page" class="wrap">
    <nav class="crumbs" :aria-label="t('nav.home')">
      <a :href="homePath(locale)">{{ t('nav.home') }}</a>
      <span aria-hidden="true">/</span>
      <a :href="docPath(app.slug, 'index', locale)">{{ name }}</a>
      <span aria-hidden="true">/</span>
      <span>{{ t(`nav.${doc}`) }}</span>
    </nav>

    <div class="doc-tabs">
      <a
        v-for="item in docIds"
        :key="item"
        :href="docPath(app.slug, item, locale)"
        :class="{ active: item === doc }"
      >
        {{ t(`nav.${item}`) }}
      </a>
    </div>

    <section class="hero compact doc-hero">
      <p class="eyebrow">{{ page.eyebrow }}</p>
      <h1 class="hero-title">{{ page.title }}</h1>
      <p class="hero-lead" v-html="page.lead" />
      <p class="meta" v-html="page.meta" />
    </section>

    <div class="doc-layout" :class="{ 'no-toc': !toc.length }">
      <aside v-if="toc.length" class="toc">
        <p class="toc-title">{{ t('doc.toc') }}</p>
        <a
          v-for="section in toc"
          :key="section.id"
          :href="`#${section.id}`"
          :class="{ active: activeId === section.id }"
        >
          {{ section.title }}
        </a>
      </aside>

      <article class="prose">
        <section
          v-for="(section, index) in page.sections"
          :key="index"
          :id="section.id"
          :data-section="section.id || undefined"
          class="doc-section"
        >
          <h2>{{ section.title }}</h2>
          <template v-for="(block, blockIndex) in section.blocks" :key="blockIndex">
            <div v-if="block.kind === 'text'" class="md" v-html="block.html" />
            <ul v-else-if="block.kind === 'list'" class="md-list">
              <li v-for="(item, itemIndex) in block.items" :key="itemIndex" v-html="item" />
            </ul>
            <div v-else-if="block.kind === 'notice'" class="notice" v-html="block.html" />
            <div v-else-if="block.kind === 'table'" class="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th v-for="(cell, headIndex) in block.head" :key="headIndex">{{ cell }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, rowIndex) in block.rows" :key="rowIndex">
                    <td v-for="(cell, cellIndex) in row" :key="cellIndex" v-html="cell" />
                  </tr>
                </tbody>
              </table>
            </div>
          </template>
        </section>

        <p class="doc-footnote">{{ t('doc.authoritative') }}</p>

        <nav class="doc-pager">
          <a v-if="prevDoc" class="pager-link" :href="docPath(app.slug, prevDoc, locale)">
            <small>{{ t('doc.prev') }}</small>
            <span>← {{ t(`nav.${prevDoc}`) }}</span>
          </a>
          <span v-else />
          <a v-if="nextDoc" class="pager-link right" :href="docPath(app.slug, nextDoc, locale)">
            <small>{{ t('doc.next') }}</small>
            <span>{{ t(`nav.${nextDoc}`) }} →</span>
          </a>
        </nav>
      </article>
    </div>

    <div class="doc-back">
      <a :href="docPath(app.slug, 'index', locale)">
        <DocIcon name="arrow" />
        {{ t('appHome.back') }}
      </a>
    </div>
  </div>
</template>
