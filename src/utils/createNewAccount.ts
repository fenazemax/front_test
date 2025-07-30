import { EOptions } from '@/constants/account'
import type { TAccount } from '@/types/account'

export const createNewAccount = (): TAccount => {
  return { id: Date.now(), accType: EOptions.Local, login: '', password: '', mark: [] }
}
