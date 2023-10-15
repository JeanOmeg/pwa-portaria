export interface IUsuarioStorage {
  token: string
  refreshToken: string
  user: {
    admin: boolean
  }
  logout: boolean
}
