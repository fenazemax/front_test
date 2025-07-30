<script setup lang="ts">
import { type TAccount } from '@/types/account'
import { EOptions } from '@/constants/account'
import DeleteIcon from './icons/DeleteIcon.vue'
import { NFormItem, NInput, NSelect, NButton, NIcon, NFlex } from 'naive-ui'
import MarkInput from './MarkInput.vue'
import { computed, reactive } from 'vue'
import type { TCredentials } from '@/types/error'

const props = defineProps<{
  account: TAccount
  errors?: TCredentials
}>()

const emit = defineEmits<{
  (e: 'update', acc: TAccount): void
  (e: 'delete', id: number): void
}>()

const account = reactive({ ...props.account })

const handleUpdate = () => {
  emit('update', account)
}

const errorStatusStyle = computed(() => (props.errors?.login ? 'error' : undefined))
</script>

<template>
  <n-flex :wrap="false" align="center">
    <n-form-item>
      <MarkInput v-model="account.mark" @blur="handleUpdate" />
    </n-form-item>
    <n-form-item>
      <n-select
        v-model:value="account.accType"
        :options="[
          { label: EOptions.Local, value: EOptions.Local },
          { label: EOptions.LDAP, value: EOptions.LDAP },
        ]"
        @update:value="handleUpdate"
      />
    </n-form-item>
    <n-form-item :validation-status="errorStatusStyle">
      <n-input
        v-model:value="account.login"
        placeholder="Логин"
        @blur="handleUpdate"
        :maxlength="100"
      />
    </n-form-item>
    <n-form-item v-if="account.accType === EOptions.Local" :validation-status="errorStatusStyle">
      <n-input
        type="password"
        show-password-on="click"
        placeholder="Пароль"
        v-model:value="account.password"
        @blur="handleUpdate"
        :maxlength="100"
      />
    </n-form-item>
    <n-button @click="emit('delete', account.id)" quaternary round>
      <n-icon size="24">
        <DeleteIcon />
      </n-icon>
    </n-button>
  </n-flex>
</template>
