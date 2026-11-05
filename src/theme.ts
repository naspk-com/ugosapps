import { computed, ref } from 'vue'

export type ThemeMode = 'auto' | 'light' | 'dark'

const STORAGE_KEY = 'naspk-theme'
const media = window.matchMedia('(prefers-color-scheme: dark)')

const readMode = (): ThemeMode => {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark' || stored === 'auto') return stored
  } catch {
    /* storage unavailable — fall back to the system preference */
  }
  return 'auto'
}

export const themeMode = ref<ThemeMode>(readMode())

const systemDark = ref(media.matches)

export const isDark = computed(
  () => themeMode.value === 'dark' || (themeMode.value === 'auto' && systemDark.value),
)

const apply = (): void => {
  const dark = isDark.value
  document.documentElement.classList.toggle('dark', dark)
  document.documentElement.classList.toggle('light', !dark)
  document.documentElement.dataset.theme = dark ? 'dark' : 'light'
  document
    .querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')
    .forEach((meta) => (meta.content = dark ? '#06070a' : '#f5f6f9'))
}

export const setThemeMode = (mode: ThemeMode): void => {
  themeMode.value = mode
  try {
    window.localStorage.setItem(STORAGE_KEY, mode)
  } catch {
    /* storage unavailable — the choice only applies to this session */
  }
  apply()
}

media.addEventListener('change', (event) => {
  systemDark.value = event.matches
  apply()
})

apply()
