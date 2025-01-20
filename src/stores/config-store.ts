import { LS } from '@/configs/constance'
import { type LanguageType, type ThemeMode } from '@/global'
import { defineStore } from 'pinia'

const useConfigStore = defineStore('config', {
  state: () => ({
    themeMode: 'dark' as ThemeMode,
    language: 'en' as LanguageType,
  }),
  actions: {
    initLocalStorage(params?: Partial<{ themeMode: ThemeMode; language: LanguageType }>) {
      const initialThemeMode = params?.themeMode ?? 'dark'
      const initialLanguage = params?.language ?? 'en'
      console.log('initialLanguage', initialLanguage)
      this.themeMode = initialThemeMode
      this.language = initialLanguage
      if (initialThemeMode == 'dark') document.documentElement.classList.add('vue-app-theme')
      else document.documentElement.classList.remove('vue-app-theme')
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
      document.documentElement.classList.toggle('vue-app-theme')
    },
    setLanguage(language: LanguageType) {
      this.language = language
      localStorage.setItem(LS.LANGUAGE, language)
    },
  },
})

export default useConfigStore
