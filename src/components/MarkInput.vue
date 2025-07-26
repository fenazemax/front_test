<script setup lang="ts">
import { ref, watch } from 'vue'
import { NInput } from 'naive-ui'

const props = defineProps<{
  modelValue: Array<{ text: string }>
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: Array<{ text: string }>): void
  (e: 'blur'): void
}>()
const inputText = ref('')
watch(
  () => props.modelValue,
  (val) => {
    inputText.value = val.map((m) => m.text).join('; ') + (val.length ? '; ' : '')
  },
  { immediate: true },
)
const parseAndEmit = (val: string) => {
  const parsed = val
    .split(/[\s;]+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((text) => ({ text }))

  emit('update:modelValue', parsed)
}
const onInput = (val: string) => {
  inputText.value = val
}
const onBlur = () => {
  parseAndEmit(inputText.value)
  inputText.value =
    props.modelValue.map((m) => m.text).join('; ') + (props.modelValue.length ? '; ' : '')
  emit('blur')
}
</script>

<template>
  <n-input
    :value="inputText"
    @input="onInput"
    @blur="onBlur"
    placeholder="Укажите метки через ;"
    :maxlength="50"
  />
</template>

<style scoped></style>
