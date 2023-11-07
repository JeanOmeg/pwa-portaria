<template>
  <tool-bar />
  <q-page class='row items-center justify-evenly'>
    <q-card>
      <div>
        {{ 'TESTE' }}
      </div>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ToolBar from 'src/components/ToolBar.vue'

export default defineComponent({
  name: 'home-page',

  components: {
    ToolBar
  },

  setup () {
    return {}
  }
})
</script>
