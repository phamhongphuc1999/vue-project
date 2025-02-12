import type { CategoryType, PairType } from '@/global'
import { defineStore } from 'pinia'

const useWordStore = defineStore('word', {
  state: () => ({
    categories: {} as { [id: number]: CategoryType },
    totalCategories: 0,
    pairs: {} as { [categoryId: number]: { [pairId: number]: PairType } },
  }),
  actions: {
    setCategories(categories: Array<CategoryType>, totalCategories: number) {
      const result: { [id: number]: CategoryType } = {}
      for (const category of categories) result[category.id] = category
      this.categories = result
      if (totalCategories >= 0) this.totalCategories = totalCategories
    },
    updatePairs(categoryId: number, pairs: Array<PairType>) {
      const result: { [pairId: number]: PairType } = {}
      for (const pair of pairs) result[pair.id] = pair
      this.pairs[categoryId] = result
    },
  },
})

export default useWordStore
