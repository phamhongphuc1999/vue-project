import { WORD_APP_URL } from '@/configs/constance'
import ApiQuery from '@/services/api-query'
import useUserStore from '@/stores/user-store'
import { computed } from 'vue'

export default function useAuthorizedApi(root?: string) {
  const userConfig = useUserStore()
  const realRoot = root ?? WORD_APP_URL

  const _api = computed(() => {
    if (userConfig.accessToken)
      return new ApiQuery(realRoot, { headers: { Authorization: userConfig.accessToken } })
    return undefined
  })

  return { authorizedApi: _api.value }
}
