import en from '@/locale/en.json'
import vi from '@/locale/vi.json'
import useConfigStore from '@/stores/config-store'
import { computed } from 'vue'

interface Params {
  [param: string]: string
}

interface Item {
  [item: string]: string | Item
}

export interface LocaleType {
  [local: string]: {
    [key: string]: string | Item
  }
}

function replace(text: string, params?: Params) {
  if (params) {
    const paramArray = Object.entries(params)
    let result = text
    for (const _param of paramArray) {
      result = result.replace(`%{${_param[0]}}`, _param[1])
    }
    return result
  }
  return text
}

function translate(locale: LocaleType, language: string, key: string, params?: Params) {
  let keys = key.split('.')
  let result = locale[language][keys[0]]
  keys = keys.slice(1)
  for (const _key of keys) {
    const _check = result instanceof String || typeof result === 'string'
    if (!_check) result = (result as Item)[_key]
    else return key
  }
  if (result instanceof String || typeof result === 'string')
    return replace(result.toString(), params)
  else return key
}

const _locale = { en, vi } as LocaleType

export default function useLocalTranslate() {
  const config = useConfigStore()

  const _translate = computed(() => {
    return (key: string, params?: Params) => {
      return translate(_locale, config.language, key, params)
    }
  })

  return { t: _translate }
}
