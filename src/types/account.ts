import { EOptions } from '@/constants/account'

export type TMark = Array<{ text: string }>

export type TAccount = {
  id: number
  mark: TMark
  accType: EOptions
  login: string
  password: string | null
}
