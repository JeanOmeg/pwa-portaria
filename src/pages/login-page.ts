import { defineComponent, ref } from 'vue'
import { LocalStorage, useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import loginService from 'src/services/login-service'
import { ILogin } from 'src/interfaces/login-interface'
import { setLoginStorage } from 'src/functions/set-login-storage'
import { removeLoginStorage } from 'src/functions/remove-login-storage'
import ToolBar from 'src/components/ToolBar.vue'

export default defineComponent({
  name: 'LoginPage',

  components: {
    ToolBar,
  },

  created() {
    LocalStorage.set('tela_login', false)
  },

  mounted() {
    this.tela_login = LocalStorage.getItem('tela_login')
    const logout = LocalStorage.getItem('logout')
    !logout ?? this.router.push({ name: 'home' })
  },

  setup() {
    const $q = useQuasar()
    const router = useRouter()
    const formulario = ref({ email: '', senha: '' })
    const tela_login = ref(LocalStorage.getItem('tela_login'))

    async function enviarLogin() {
      try {
        if (!formulario.value.email || !formulario.value.senha) {
          $q.notify({ message: 'Email e/ou Senha obrigatório!', icon: 'error', color: 'negative' })
        } else {
          const usuario: ILogin = { email: formulario.value.email, senha: formulario.value.senha }
          const data = await loginService(usuario)

          setLoginStorage(data.token, data.refreshToken, data.user.admin, data.logout)

          $q.notify({ message: 'Logged!', icon: 'check', color: 'positive' })
          router.push({ name: 'home' })
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
      tela_login,
      enviarLogin,
    }
  },
})
