import { LS } from '@/configs/constance'
import { type ThemeMode } from '@/global'
import { defineStore } from 'pinia'

const useConfigStore = defineStore('config', {
  state: () => ({
    themeMode: 'dark' as ThemeMode,
  }),
  actions: {
    initLocalStorage(themeMode?: ThemeMode) {
      const initialThemeMode = themeMode ?? 'dark'
      this.themeMode = initialThemeMode
      document.documentElement.setAttribute('data-theme', initialThemeMode)
    },
    switchTheme(themeMode?: ThemeMode) {
      if (themeMode) {
        this.themeMode = themeMode
        localStorage.setItem(LS.THEME, themeMode)
      } else {
        const newTheme = this.themeMode == 'light' ? 'dark' : 'light'
        this.themeMode = newTheme
        localStorage.setItem(LS.THEME, newTheme)
      }
      document.documentElement.setAttribute('data-theme', this.themeMode)
    },
  },
})

export default useConfigStore
