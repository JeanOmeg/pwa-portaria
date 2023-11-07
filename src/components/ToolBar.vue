<template>
  <q-header elevated>
    <q-toolbar class='row justify-between bg-primary text-white'>
      <div>
        <q-btn v-if='logado' size='md' icon='menu' aria-label='Menu' @click='drawer = !drawer' />
      </div>
      <div>
        <q-toolbar-title style='font-size: 1.7rem'>
          OnPortaria
        </q-toolbar-title>
      </div>
      <div>
        <q-btn v-if='logado' icon='logout' color='negative' size='md' click='logoutService' />
      </div>
    </q-toolbar>
    <q-space />
  </q-header>
  <q-drawer v-model='drawer' :width='150' elevated mini-to-overlay :no-mini-animation='false' class='bg-white'>
    <q-list>
      <div>
        <EssentialLink v-for='link in link_list' :key='link.title' v-bind='link' />
      </div>
      <div v-if='verificaAdmin()'>
        <EssentialLink v-for='link in adminList' :key='link.title' v-bind='link' />
      </div>
    </q-list>
  </q-drawer>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import EssentialLink from 'components/EssentialLink.vue'
  import { LocalStorage, useQuasar } from 'quasar'
  import { useRouter } from 'vue-router'
  import { removeLoginStorage } from 'src/functions/remove-login-storage'

  export default defineComponent({
    name: 'tool-bar',

    components: {
      EssentialLink
    },

    created () {
      this.logado = LocalStorage.getItem('logado') as boolean
      if (!this.logado) {
        this.removeLoginStorage()
        this.$q.notify({
          message: 'Deslogado!',
          icon: 'error',
          color: 'negative'
        })
        this.router.push({ name: 'loginPage' })
      }
    },

    setup () {
      const $q = useQuasar()
      const router = useRouter()
      const logado = ref(false)
      const admin = ref(0)

      async function logoutService () {
        try {
          removeLoginStorage()
          $q.notify({
            message: 'Deslogado!',
            icon: 'error',
            color: 'negative'
          })
          router.push({ name: 'loginPage' })
        } catch (error) {
          console.log(error)
          $q.notify({
            message: 'Erro! Você não está logado!',
            icon: 'error',
            color: 'negative'
          })
        }
      }

      function verificaAdmin () {
        admin.value = LocalStorage.getItem('id_tipo_usuario') as number
        return admin.value === 5
      }

      const link_list = ref([
        {
          title: 'Tasks',
          caption: '',
          icon: 'library_add_check',
          route: { name: 'home' }
        },
        {
          title: 'New task',
          caption: '',
          icon: 'add_task',
          route: { name: 'home' }
        }
      ])

      const adminList = ref([
        {
          title: 'All tasks',
          caption: '',
          icon: 'fact_check',
          route: { name: 'allTasks' }
        },
        {
          title: 'All users',
          caption: '',
          icon: 'group',
          route: { name: 'allUsers' }
        }
      ])

      const drawer = ref(false)

      return {
        link_list,
        adminList,
        drawer,
        logado,
        admin,
        router,
        logoutService,
        removeLoginStorage,
        verificaAdmin
      }
    }
  })
</script>
