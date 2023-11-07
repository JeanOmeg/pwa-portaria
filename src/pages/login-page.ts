import { defineComponent, ref } from 'vue'
import { LocalStorage, useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import loginService from 'src/services/login-service'
import { ILogin } from 'src/interfaces/login-interface'
import { setLoginStorage } from 'src/functions/set-login-storage'
import { removeLoginStorage } from 'src/functions/remove-login-storage'

export default defineComponent({
  name: 'login-page',

  async created () {
    LocalStorage.set('tela_login', true)
    await this.removeLoginStorage(this.Q, this.router)
  },

  setup () {
    const Q = useQuasar()
    const router = useRouter()
    const formulario = ref({} as ILogin)

    async function enviarLogin () {
      try {
        if (!formulario.value.login || !formulario.value.senha) {
          Q.notify({ message: 'Email e/ou Senha obrigatório!', icon: 'error', color: 'negative' })
        } else {
          const usuario: ILogin = { login: formulario.value.login, senha: formulario.value.senha }
          const data = await loginService(usuario)

          await setLoginStorage(data, Q, router)
        }
      } catch (error) {
        await removeLoginStorage(Q, router)
      }
    }

    return {
      Q,
      router,
      formulario,
      enviarLogin,
      removeLoginStorage
    }
  }
})
