import { LocalStorage } from 'quasar'

export function setLoginStorage (token: string, refreshToken: string, id_tipo_usuario: number, logout: boolean): void {
  LocalStorage.set('userToken', token)
  LocalStorage.set('refreshToken', refreshToken)
  LocalStorage.set('id_tipo_usuario', id_tipo_usuario)
  LocalStorage.set('logout', logout)
}
