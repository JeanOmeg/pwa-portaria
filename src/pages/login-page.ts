/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineComponent, ref } from 'vue'
import { useQuasar } from 'quasar'
import { Router, useRouter } from 'vue-router'

export default defineComponent({
  name: 'LoginPage',

  components: {
    toolbar,
  },

  mounted() {
    const logout = localStorage.getItem('logout')
    if (logout === 'false') {
      this.router.push({ name: 'home' })
    }
  },

  setup() {
    const { login } = loginService()
    const $q = useQuasar()
    const router = useRouter()

    const form = ref({
      email: '',
      password: '',
    })

    async function onSubmit(): Promise<any> {
      if (!form.value.email || !form.value.password) {
        $q.notify({
          message: 'Email and/or Password is required!',
          icon: 'error',
          color: 'negative',
        })
      } else {
        try {
          const usuario = {
            email: form.value.email,
            password: form.value.password,
          }
          const { data } = await login(usuario)
          localStorage['userToken'] = data.token
          localStorage['refreshToken'] = data.refreshToken
          localStorage['admin'] = data.user.admin
          localStorage['logout'] = 'false'
          $q.notify({
            message: 'Logged!',
            icon: 'check',
            color: 'positive',
          })
          router.push({ name: 'home' })
        } catch (error) {
          console.error(error)
          localStorage.removeItem('admin')
          localStorage.removeItem('userToken')
          localStorage.removeItem('logout')
          router.push({ name: 'loginPage' }).then($q.notify('teste'))
        }
      }
    }

    return {
      router,
      form,
      onSubmit,
    }
  },
})
