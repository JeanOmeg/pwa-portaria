<template>
  <q-layout view='hHh lpR lFr'>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'main-layout',

  setup () {
    return {}
  }
})
</script>
