export const formatInputText = (value: string) => {
  return value
    .split(/[\s;]+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((text) => ({ text }))
}
