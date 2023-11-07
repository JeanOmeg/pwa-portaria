import { LocalStorage } from 'quasar'

export function removeLoginStorage (): void {
  LocalStorage.remove('token')
  LocalStorage.remove('refresh_token')
  LocalStorage.remove('id_tipo_usuario')
  LocalStorage.remove('id_usuario')
  LocalStorage.remove('admin')
  LocalStorage.remove('logado')
}
