<template>
  <q-header elevated>
    <q-toolbar class='row justify-between bg-primary text-white'>
      <div>
        <q-btn v-if='logado' size='md' icon='menu' aria-label='Menu' @click='drawer = !drawer' />
      </div>
      <div>
        <q-toolbar-title style='font-size: 1.7rem'>
          OnPort
        </q-toolbar-title>
      </div>
      <div>
        <q-btn v-if='logado' icon='logout' color='negative' size='md' @click='logoutService' />
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

  async created () {
    this.logado = LocalStorage.getItem('logado') as boolean
    if (!this.logado) {
      await this.logoutService()
    }
  },

  setup () {
    const router = useRouter()
    const logado = ref(false)
    const admin = ref(false)
    const Q = useQuasar()

    async function logoutService () {
      await removeLoginStorage(Q, router)
    }

    function verificaAdmin () {
      return admin.value = (LocalStorage.getItem('id_tipo_usuario') as number) === 5
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
