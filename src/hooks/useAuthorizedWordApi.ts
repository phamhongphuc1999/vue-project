import WordQuery from '@/services/word-query'
import useUserStore from '@/stores/user-store'
import { computed } from 'vue'

export default function useAuthorizedWordApi() {
  const userConfig = useUserStore()

  const _api = computed(() => {
    if (userConfig.accessToken)
      return new WordQuery({ headers: { Authorization: userConfig.accessToken } })
    return undefined
  })

  return { authorizedApi: _api.value }
}
