import { WORD_APP_URL } from '@/configs/constance'
import type { CategoryApiType, CategoryFilterType, PairApiType, PairBaseType } from '@/global'
import type { AxiosRequestConfig } from 'axios'
import ApiQuery from './api-query'

export default class WordQuery extends ApiQuery {
  constructor(config?: AxiosRequestConfig) {
    super(WORD_APP_URL, config)
  }

  async getCategories(params?: CategoryFilterType) {
    return await this.get<CategoryApiType>('/category', { params })
  }

  async getDetailPairs(categoryId: string | number) {
    return await this.get<PairApiType>(`/pairs/all?categoryId=${categoryId}`)
  }

  async addCategory(params: { title: string; pairs: Array<PairBaseType> }) {
    return await this.post('/category', params)
  }

  async deleteCategory(categoryId: string | number) {
    return await this.del(`/category?categoryId=${categoryId}`)
  }

  async updateCategory(
    categoryId: string | number,
    params: { title: string; pairs: Array<PairBaseType>; removedIds: Array<string | number> }
  ) {
    return await this.put(`/category?categoryId=${categoryId}`, params)
  }
}

export const wordQuery = new WordQuery()
