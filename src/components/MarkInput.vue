<script setup lang="ts">
import { ref, watch } from 'vue'
import { NInput } from 'naive-ui'
import { formatInputText } from '@/utils/formatInputText'
import type { TMark } from '@/types/account'
import { separateMarks } from '@/utils/separateInputMarks'

const props = defineProps<{
  modelValue: TMark
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: TMark): void
  (e: 'blur'): void
}>()

const inputText = ref('')

const parseAndEmit = (val: string) => {
  const parsed = formatInputText(val)

  emit('update:modelValue', parsed)
}

const onInput = (val: string) => {
  inputText.value = val
}

const onBlur = () => {
  parseAndEmit(inputText.value)
  inputText.value = separateMarks(props.modelValue)
  emit('blur')
}

watch(
  () => props.modelValue,
  (value) => {
    inputText.value = separateMarks(value)
  },
  { immediate: true },
)
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
