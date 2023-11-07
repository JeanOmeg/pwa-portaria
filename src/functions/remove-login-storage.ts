import { LocalStorage, QVueGlobals } from 'quasar'
import { IUsuarioStorageString } from 'src/interfaces/usuario-storage-interface'
import { Router } from 'vue-router'

const notificacao = 'Deslogado!'
const local_storage: IUsuarioStorageString = {
  token: 'token',
  refresh_token: 'refresh_token',
  id_tipo_usuario: 'id_tipo_usuario',
  id_usuario: 'id_usuario',
  admin: 'admin',
  logado: 'logado'
}

export async function removeLoginStorage (Q: QVueGlobals, router: Router): Promise<void> {
  const tela_login = LocalStorage.getItem('tela_login')
  for (const key of Object.values(local_storage)) {
    LocalStorage.remove(key)
  }

  if (!tela_login) {
    Q.notify({
      message: notificacao,
      icon: 'error',
      color: 'negative'
    })
    await router.push({ name: 'login-page' })
  }
}
