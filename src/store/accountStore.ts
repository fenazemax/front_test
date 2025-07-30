import { STORE_NAME } from './constants/names'
import type { TAccount } from '@/types/account'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAccStore = defineStore(
  STORE_NAME,
  () => {
    const accounts = ref<TAccount[]>([])

    const addAccount = (acc: TAccount) => {
      if (!accounts.value.some((a) => a.id === acc.id)) {
        accounts.value.push(acc)
      }
    }

    const deleteAccount = (accId: number) => {
      if (accounts.value) {
        accounts.value = accounts.value.filter((a) => a.id !== accId)
      }
    }

    const updateAccount = (updatedAcc: TAccount) => {
      accounts.value = accounts.value.map((account) => {
        if (account.id === updatedAcc.id) {
          return { ...account, ...updatedAcc }
        } else {
          return account
        }
      })
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
