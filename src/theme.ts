import { ref } from 'vue'

export type ThemeMode = 'auto' | 'light' | 'dark'

const STORAGE_KEY = 'naspk-legal-theme'

const read = (): ThemeMode => {
  const value = window.localStorage.getItem(STORAGE_KEY)
  return value === 'light' || value === 'dark' ? value : 'auto'
}

export const themeMode = ref<ThemeMode>(read())

const apply = (): void => {
  const root = document.documentElement
  if (themeMode.value === 'auto') root.removeAttribute('data-theme')
  else root.dataset.theme = themeMode.value
}

apply()

export const setThemeMode = (mode: ThemeMode): void => {
  themeMode.value = mode
  window.localStorage.setItem(STORAGE_KEY, mode)
  apply()
}

export const cycleTheme = (): void => {
  setThemeMode(themeMode.value === 'auto' ? 'light' : themeMode.value === 'light' ? 'dark' : 'auto')
}
