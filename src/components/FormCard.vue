<script setup lang="ts">
import { useAccStore } from '@/store/accountStore'
import FormHead from './FormHead.vue'
import { type TAccount } from '@/types/account'
import { EOptions } from '@/constants/account'
import { computed, ref } from 'vue'
import { NFlex, useMessage, NForm } from 'naive-ui'
import FormMain from './FormMain.vue'
import type { TCredentials, TError } from '@/types/error'
import { createNewAccount } from '@/utils/createNewAccount'

const accStore = useAccStore()
const message = useMessage()

const allAccounts = computed(() => accStore.accounts)

const errorsMap = ref<TError>({})

const handleAdd = () => {
  accStore.addAccount(createNewAccount())
  message.success('Учетная запись создана')
}

const handleDelete = (id: number) => {
  accStore.deleteAccount(id)
  message.warning('Учетная запись удалена')
}

const handleUpdate = (acc: TAccount) => {
  const password = acc.accType === EOptions.Local ? (acc.password?.trim() ?? '') : null
  const errors: TCredentials = {
    login: !acc.login.trim(),
    password: acc.accType === EOptions.Local ? !password : false,
  }

  errorsMap.value[acc.id] = errors

  if (errors.login || errors.password) {
    message.error('Проверьте логин и пароль')
    return
  }

  accStore.updateAccount({ ...acc, password })
}
</script>

<template>
  <div class="form">
    <FormHead @add="handleAdd" />
    <n-flex vertical>
      <n-form>
        <FormMain
          v-for="acc in allAccounts"
          :key="acc.id"
          :account="acc"
          @update="handleUpdate"
          @delete="handleDelete(acc.id)"
          :errors="errorsMap[acc.id]"
        />
      </n-form>
    </n-flex>
  </div>
</template>

<style scoped>
.form {
  padding: 50px;
}
</style>
