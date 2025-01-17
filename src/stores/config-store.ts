import { LS } from '@/configs/constance'
import { type ThemeMode } from '@/global'
import { defineStore } from 'pinia'

const useConfigStore = defineStore('config', {
  state: () => ({
    themeMode: 'dark' as ThemeMode,
  }),
  actions: {
    switchTheme(value?: ThemeMode) {
      console.log('🚀 ~ switchTheme ~ value:', value)
      if (value) {
        this.themeMode = value
        localStorage.setItem(LS.THEME, value)
      } else {
        const newTheme = this.themeMode == 'light' ? 'dark' : 'light'
        this.themeMode = newTheme
        localStorage.setItem(LS.THEME, newTheme)
      }
    },
  },
})

export default useConfigStore
