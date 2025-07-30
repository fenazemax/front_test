import { EOptions } from '@/constants/account'

export type TAccount = {
  id: number
  mark: Array<{ text: string }>
  accType: EOptions
  login: string
  password: string | null
}
