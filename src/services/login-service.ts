import { api } from 'boot/axios'
import { ILogin } from 'src/interfaces/login-interface'
import { IUsuarioStorage } from 'src/interfaces/usuario-storage-interface'

export default async function loginService (login: ILogin) {
  try {
    const data: IUsuarioStorage = (await api.post('login', login)).data
    return data
  } catch (error: any) {
    throw new Error(error)
  }
}
