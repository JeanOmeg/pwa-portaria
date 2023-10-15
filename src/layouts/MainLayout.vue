<template>
  <q-layout view="hHh lpR lFr">
    <q-page-container>
      <tool-bar />
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'
import ToolBar from 'src/components/ToolBar.vue'

export default defineComponent({
  name: 'MainLayout',
  components: {
    ToolBar,
  },

  setup () {
    return {}
  },
})
</script>
