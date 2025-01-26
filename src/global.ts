/* eslint-disable @typescript-eslint/no-explicit-any */
export type ThemeMode = 'dark' | 'light'
export type LanguageType = 'en' | 'vi'

export interface Supplier {
  id: number
  name: string
  address: string
  phone: string
  email: string
  moreInfo: string
  contractDate: string
}

export interface Product {
  id: number
  name: string
  supplier: Supplier
  quantity: number
  createAt: string
  updateAt: string
}

export type LayoutType = {
  id: string
  title: string
  icon: string
  link: string
}

/*word types*/
export interface CategoryType {
  id: number
  title: string
  userId: number
  displayName: string
  username: string
}
export interface PairType {
  id: number
  en: string
  vi: string
  categoryId: number
}
/*end word types*/

/*api types*/
export type BaseApiType<T = any> = {
  status: 'OK' | 'FAIL'
  data: T
}

export type LoginApiType = BaseApiType<{ token: string }>
export type CategoryApiType = BaseApiType<Array<CategoryType>>
export type PairApiType = BaseApiType<Array<PairType>>
/*end api types*/
