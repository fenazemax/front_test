<script setup lang="ts">
import PlusIcon from './icons/PlusIcon.vue'
import { NButton, NFlex, NIcon } from 'naive-ui'
import TipIcon from './icons/TipIcon.vue'

const emit = defineEmits<{
  (e: 'add'): void
}>()
</script>

<template>
  <n-flex vertical>
    <n-flex align="center">
      <h1 class="form__title">Учетные записи</h1>
      <n-button @click="emit('add')" size="medium">
        <template #icon>
          <PlusIcon />
        </template>
      </n-button>
    </n-flex>
    <p class="form__tip">
      <n-icon size="24">
        <TipIcon />
      </n-icon>
      Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
    </p>
  </n-flex>
</template>

<style scoped>
.form__title {
  margin: 0;
  padding: 0;
}

.form__tip {
  display: flex;
  align-items: center;
  gap: 5px;
  max-width: fit-content;
  margin: 0;
  padding: 10px;
  border-radius: 20px;
  background-color: aliceblue;
}
.align-gap {
  align-items: center;
  gap: 20px;
}
</style>
