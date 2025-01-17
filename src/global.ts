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
