export interface ContactInterface {
  name: string
  phone: string
  key: string
}

export const emptyContactDto = ():ContactInterface => {
  return {
    name: '',
    phone: '',
    key: ''
  }
}