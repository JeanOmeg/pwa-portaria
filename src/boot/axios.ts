import { boot } from 'quasar/wrappers'
import axios, { AxiosInstance } from 'axios'
import { removeLoginStorage } from 'src/functions/remove-login-storage'
import { LocalStorage } from 'quasar'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance
    $api: AxiosInstance
  }
}

const api = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

async function refreshToken (error: Error) {
  return new Promise((resolve, reject) => {
    try {
      const refresh_token = LocalStorage.getItem('refresh_token')
      const parameters = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${refresh_token}`
        }
      }

      const body = {}

      axios
        .post(process.env.API_URL + 'refresh', body, parameters)
        .then(async (res) => {
          LocalStorage.set('token', res.data.token)
          LocalStorage.set('refresh_token', res.data.refreshToken)
          return resolve(res.data.token)
        })
        .catch(() => {
          removeLoginStorage()
          window.location.href = '/'
          return reject(error)
        })
    } catch (err) {
      removeLoginStorage()
      window.location.href = '/'
      return reject(err)
    }
  })
}

api.interceptors.request.use((request) => {
  const token = localStorage.getItem('token')
  if (token) {
    request.headers.Authorization = `Bearer ${token}`
  }
  return request
})

api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const config = error.config
    if (error.response && error.response.status === 401) {
      const token = await refreshToken(error)
      config.headers['Authorization'] = `Bearer ${token}`
      return api(config)
    }
    removeLoginStorage()
    return Promise.reject(error)
  }
)

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { api }
