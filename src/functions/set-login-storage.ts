import { LocalStorage } from 'quasar'

export function setLoginStorage (token: string, refreshToken: string, admin: boolean, logout: boolean): void {
  LocalStorage.set('userToken', token)
  LocalStorage.set('refreshToken', refreshToken)
  LocalStorage.set('admin', admin)
  LocalStorage.set('logout', logout)
}
