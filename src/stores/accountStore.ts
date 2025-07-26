import type { TAccount } from '@/types/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAccStore = defineStore(
  'account',
  () => {
    const accounts = ref<TAccount[]>([])

    function addAccount(acc: TAccount) {
      if (!accounts.value.some((a) => a.id === acc.id)) accounts.value.push(acc)
    }

    function deleteAccount(accId: number) {
      if (accounts.value) {
        accounts.value = accounts.value.filter((a) => a.id !== accId)
      }
    }

    function updateAccount(updatedAcc: TAccount) {
      const index = accounts.value.findIndex((a) => a.id === updatedAcc.id)
      if (index !== -1) {
        accounts.value[index] = { ...accounts.value[index], ...updatedAcc }
      }
    }

    return {
      accounts,
      addAccount,
      deleteAccount,
      updateAccount,
    }
  },
  {
    persist: true,
  },
)
