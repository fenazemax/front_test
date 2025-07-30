<script setup lang="ts">
import FormCard from './components/FormCard.vue'
import { NMessageProvider } from 'naive-ui'
</script>

<template>
  <main>
    <n-message-provider>
      <FormCard />
    </n-message-provider>
  </main>
</template>
