<script setup lang="ts">
import { useAccStore } from '@/store/accountStore'
import FormHead from './FormHead.vue'
import { type TAccount } from '@/types/accType'
import { EOptions } from '@/constants/account'
import { computed, ref } from 'vue'
import { NFlex, useMessage, NForm } from 'naive-ui'
import FormMain from './FormMain.vue'
import type { TError } from '@/types/errType'

const accStore = useAccStore()
const message = useMessage()

const allAccounts = computed(() => accStore.accounts)

const errorsMap = ref<TError>({})

const handleAdd = () => {
  const newAcc: TAccount = {
    id: Date.now(),
    accType: EOptions.Local,
    login: '',
    password: '',
    mark: [],
  }
  accStore.addAccount(newAcc)
  message.success('Учетная запись создана')
}

const deleteAcc = (id: number) => {
  accStore.deleteAccount(id)
  message.warning('Учетная запись удалена')
}

const validateAndUpdate = (acc: TAccount) => {
  const password = acc.accType === EOptions.Local ? (acc.password?.trim() ?? '') : null
  const errors = {
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
          @update="validateAndUpdate"
          @delete="deleteAcc(acc.id)"
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
