import { LocalStorage } from 'quasar'

export function setLoginStorage (token: string, refresh_token: string, id_tipo_usuario: number, id_usuario: number): void {
  LocalStorage.set('token', token)
  LocalStorage.set('refresh_token', refresh_token)
  LocalStorage.set('id_tipo_usuario', id_tipo_usuario)
  LocalStorage.set('id_usuario', id_usuario)
  LocalStorage.set('admin', id_tipo_usuario)
  LocalStorage.set('logado', true)
}
