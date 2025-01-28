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

export type CheckDataType = {
  numberOfErrors: number
  numberOfRemaining: number
  detail: { [id: number]: boolean }
  description: string
  isOk: boolean
}

/*word types*/
export interface CategoryType {
  id: number
  title: string
  userId: number
  displayName: string
  username: string
}
export interface PairBaseType {
  id: number | string
  en: string
  vi: string
}
export interface PairType extends PairBaseType {
  id: number
  categoryId: number
}
export interface UpdatingPairType extends PairBaseType {
  mode: 'new' | 'delete' | 'retain'
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
