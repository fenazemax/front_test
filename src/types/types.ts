export enum EOptions {
  'LDAP' = 'LDAP',
  'Local' = 'Локальная',
}

export type TAccount = {
  id: number
  mark: Array<{ text: string }>
  accType: EOptions
  login: string
  password: string | null
}
