import { LocalStorage, QVueGlobals } from 'quasar'
import { IUsuarioStorage } from 'src/interfaces/usuario-storage-interface'
import { Router } from 'vue-router'

export async function setLoginStorage (data: IUsuarioStorage, $q: QVueGlobals, router: Router): Promise<void> {
  LocalStorage.remove('tela_login')

  if (!data.logado) {
    data.logado = true
  }

  const usuario_storage = Object.keys(data) as (keyof IUsuarioStorage)[]

  for (const key of usuario_storage) {
    LocalStorage.set(key, data[key] as any)
  }

  const notificacao = 'Logado!'
  $q.notify({ message: notificacao, icon: 'check', color: 'positive' })
  await router.push({ name: 'home-page' })
}
