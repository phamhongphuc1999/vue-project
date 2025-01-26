import { defineStore } from 'pinia'

const useUserStore = defineStore('user', {
  state: () => ({
    accessToken: undefined as string | undefined,
  }),
  actions: {
    setAccessToken(accessToken: string | undefined) {
      this.accessToken = accessToken
    },
  },
})

export default useUserStore
