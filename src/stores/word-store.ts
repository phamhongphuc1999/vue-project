import type { AllPairResultType, CategoryType, PairType } from '@/global'
import { defineStore } from 'pinia'

const useWordStore = defineStore('word', {
  state: () => ({
    categories: {} as { [id: number]: CategoryType },
    totalCategories: 0,
    pairs: {} as {
      [categoryId: number]: {
        pairs: { [pairId: number]: PairType }
        categoryId: number
        categoryTitle: string
      }
    },
  }),
  actions: {
    setCategories(categories: Array<CategoryType>, totalCategories: number) {
      const result: { [id: number]: CategoryType } = {}
      for (const category of categories) result[category.id] = category
      this.categories = result
      if (totalCategories >= 0) this.totalCategories = totalCategories
    },
    updatePairs(categoryId: number, pairs: AllPairResultType) {
      const result: { [pairId: number]: PairType } = {}
      for (const pair of pairs.pairs) result[pair.id] = pair
      this.pairs[categoryId] = {
        pairs: result,
        categoryId: pairs.categoryId,
        categoryTitle: pairs.categoryTitle,
      }
    },
  },
})

export default useWordStore
