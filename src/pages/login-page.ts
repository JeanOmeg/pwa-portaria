import { defineComponent, ref } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import loginService from 'src/services/login-service'
import { ILogin } from 'src/interfaces/login-interface'
import { setLoginStorage } from 'src/functions/set-login-storage'
import { removeLoginStorage } from 'src/functions/remove-login-storage'

export default defineComponent({
  name: 'login-page',

  created () {
    this.removeLoginStorage()
  },

  setup () {
    const $q = useQuasar()
    const router = useRouter()
    const formulario = ref({} as ILogin)

    async function enviarLogin () {
      try {
        if (!formulario.value.login || !formulario.value.senha) {
          $q.notify({ message: 'Email e/ou Senha obrigatório!', icon: 'error', color: 'negative' })
        } else {
          const usuario: ILogin = { login: formulario.value.login, senha: formulario.value.senha }
          const data = await loginService(usuario)

          console.log(data)

          setLoginStorage(data.token, data.refresh_token, data.id_tipo_usuario, data.id_usuario)

          $q.notify({ message: 'Logged!', icon: 'check', color: 'positive' })
          router.push({ name: 'homePage' })
        }
      } catch (error) {
        console.error(error)

        removeLoginStorage()

        router.push({ name: 'loginPage' }).then(() => {
          $q.notify({ message: 'Email ou senha incorreta', icon: 'error', color: 'negative' })
        })
      }
    }

    return {
      router,
      formulario,
      enviarLogin,
      removeLoginStorage
    }
  }
})
