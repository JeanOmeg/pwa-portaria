export interface IUsuarioStorage {
  token: string
  refresh_token: string
  id_tipo_usuario: number
  id_usuario: number
  logado: boolean
}

export interface IUsuarioStorageString {
  token: string
  refresh_token: string
  id_tipo_usuario: string
  id_usuario: string
  admin: string
  logado: string
}
