<script setup lang="ts">
import { type TAccount } from '@/types/accType'
import { EOptions } from '@/constants/account'
import DeleteIcon from './icons/DeleteIcon.vue'
import { NFormItem, NInput, NSelect, NButton, NIcon, NFlex } from 'naive-ui'
import MarkInput from './MarkInput.vue'
import { reactive } from 'vue'

const props = defineProps<{
  account: TAccount
  errors?: {
    login?: boolean
    password?: boolean
  }
}>()

const emit = defineEmits<{
  (e: 'update', acc: TAccount): void
  (e: 'delete', acc: TAccount): void
}>()

const account = reactive({ ...props.account })

const onUpdate = () => {
  emit('update', account)
}
</script>

<template>
  <n-flex :wrap="false" align="center">
    <n-form-item>
      <MarkInput v-model="account.mark" @blur="onUpdate" />
    </n-form-item>
    <n-form-item>
      <n-select
        v-model:value="account.accType"
        :options="[
          { label: 'Local', value: EOptions.Local },
          { label: 'LDAP', value: EOptions.LDAP },
        ]"
        @update:value="onUpdate"
      />
    </n-form-item>
    <n-form-item :validation-status="props.errors?.login ? 'error' : undefined">
      <n-input
        v-model:value="account.login"
        placeholder="Логин"
        @blur="onUpdate"
        :maxlength="100"
      />
    </n-form-item>
    <n-form-item
      v-if="account.accType === EOptions.Local"
      :validation-status="props.errors?.password ? 'error' : undefined"
    >
      <n-input
        type="password"
        show-password-on="click"
        placeholder="Пароль"
        v-model:value="account.password"
        @blur="onUpdate"
        :maxlength="100"
      />
    </n-form-item>
    <n-button @click="emit('delete', account)" quaternary round>
      <n-icon size="24">
        <DeleteIcon />
      </n-icon>
    </n-button>
  </n-flex>
</template>
