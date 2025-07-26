<script setup lang="ts">
import { useAccStore } from '@/stores/accountStore'
import FormHead from './FormHead.vue'
import { EOptions, type TAccount } from '@/types/types'
import { computed, ref } from 'vue'
import { NFlex, useMessage, NForm } from 'naive-ui'
import FormMain from './FormMain.vue'

const accStore = useAccStore()
const message = useMessage()
const allAccounts = computed(() => accStore.accounts)
const errorsMap = ref<Record<number, { login?: boolean; password?: boolean }>>({})
const handleAdd = () => {
  try {
    const newAcc: TAccount = {
      id: Date.now(),
      accType: EOptions.Local,
      login: '',
      password: '',
      mark: [],
    }
    accStore.addAccount(newAcc)
    message.success('Учетная запись создана')
  } catch (error) {
    message.info('Учетная запись не создалась')
    throw error
  }
}
const deleteAcc = (acc: TAccount) => {
  try {
    accStore.deleteAccount(acc.id)
    message.warning('Учетная запись удалена')
  } catch (error) {
    message.info('Учетная запись не удалилась, возникла ошибка')
    throw error
  }
}

const validateAndUpdate = (acc: TAccount) => {
  const password = acc.accType === EOptions.Local ? acc.password?.trim() || '' : null
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
  console.log(accStore.accounts)
}
</script>

<template>
  <div class="form" style="padding: 50px">
    <div class="form__head">
      <FormHead @add="handleAdd" />
    </div>
    <n-flex vertical>
      <n-form>
        <FormMain
          v-for="acc in allAccounts"
          :key="acc.id"
          :account="acc"
          @update="validateAndUpdate"
          @delete="deleteAcc"
          :errors="errorsMap[acc.id]"
        />
      </n-form>
    </n-flex>
  </div>
</template>

<style scoped></style>
