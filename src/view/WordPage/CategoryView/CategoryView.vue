<script setup lang="ts">
import { ROUTE } from '@/configs/layout-config'
import useWordStore from '@/stores/word-store'
import moment from 'moment'
import { Column, DataTable, Dialog, InputText, Paginator, type PageState } from 'primevue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import CategoryAdd from '../CategoryAdd.vue'
import CategoryDelete from '../CategoryDelete.vue'
import CategoryEdit from '../CategoryEdit.vue'

const router = useRouter()
const editSignal = ref(false)
const deleteSignal = ref(false)
const editId = ref<number | null>(null)
const deleteId = ref<number | null>(null)
const wordStore = useWordStore()

function onRowClick(id: number) {
  router.push(`${ROUTE.WORD}/${id}`)
}

async function onPageChange(event: PageState) {
  router.replace({ query: { page: event.page } })
}
</script>

<template>
  <div class="flex items-center gap-3">
    <CategoryAdd />
    <InputText
      type="text"
      placeholder="Search categories"
      class="border-gray-[100] my-[1rem] rounded-[8px] border-[1px] px-[8px] py-[4px]"
    />
  </div>
  <DataTable :value="Object.values(wordStore.categories)" stripedRows>
    <Column header="Id">
      <template #body="category">
        {{ category.data.id }}
      </template>
    </Column>
    <Column header="Title">
      <template #body="category">
        {{ category.data.title }}
      </template>
    </Column>
    <Column header="Create at">
      <template #body="category">
        {{ moment(category.data.createAt).format('MMM DD, YYYY - hh:mm') }}
      </template>
    </Column>
    <Column header="Update at">
      <template #body="category">
        {{ moment(category.data.updateAt).format('MMM DD, YYYY - hh:mm') }}
      </template>
    </Column>
    <Column header="Features">
      <template #body="category">
        <button
          class="border-gray-[100] rounded-[8px] border-[1px] px-[8px] py-[4px]"
          :onclick="() => onRowClick(category.data.id)"
        >
          Detail
        </button>
        <button
          class="border-gray-[100] ml-[1rem] rounded-[8px] border-[1px] px-[8px] py-[4px]"
          :onclick="
            () => {
              editId = category.data.id
              editSignal = true
            }
          "
        >
          Edit
        </button>
        <button
          class="ml-[1rem] rounded-[8px] border-[1px] border-[red] px-[8px] py-[4px]"
          :onclick="
            () => {
              deleteId = category.data.id
              deleteSignal = true
            }
          "
        >
          Delete
        </button>
      </template>
    </Column>
  </DataTable>
  <Dialog modal v-model:visible="editSignal" header="Edit Category" :style="{ width: '25rem' }">
    <CategoryEdit
      v-if="editId"
      :id="editId"
      :onClose="
        () => {
          editId = null
          editSignal = false
        }
      "
    />
  </Dialog>
  <Dialog modal :visible="Boolean(deleteId)" header="Delete Category" :style="{ width: '25rem' }">
    <CategoryDelete
      v-if="deleteId"
      :id="deleteId"
      :onClose="
        () => {
          deleteId = null
          deleteSignal = false
        }
      "
    />
  </Dialog>
  <div v-if="wordStore.totalCategories > 0">
    <Paginator :rows="10" :totalRecords="wordStore.totalCategories" @page="onPageChange" />
  </div>
</template>
