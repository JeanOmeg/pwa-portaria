<template>
  <tool-bar />
  <q-page class="row items-center justify-evenly">
    <q-card>
      <div>
        {{ "TESTE" }}
      </div>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { LocalStorage } from 'quasar'
import { defineComponent, ref } from 'vue'
import ToolBar from 'src/components/ToolBar.vue'

export default defineComponent({
  name: 'homePage',

  components: {
    ToolBar,
  },

  created () {
    LocalStorage.set('tela_login', true)
  },

  setup () {
    const tela_login = ref(LocalStorage.getItem('tela_login'))

    return { tela_login }
  }
})
</script>
