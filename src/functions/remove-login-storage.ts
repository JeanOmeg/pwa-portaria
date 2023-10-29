import { LocalStorage } from 'quasar'

export function removeLoginStorage (): void {
  LocalStorage.remove('admin')
  LocalStorage.remove('userToken')
  LocalStorage.remove('refreshToken')
  LocalStorage.remove('logout')
}
