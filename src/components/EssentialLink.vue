<template>
  <q-item clickable :to='route' exact>
    <q-item-section v-if='icon' avatar>
      <q-icon :name='icon' />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>
        {{ caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'essential-link',
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    route: {
      type: [String, Object] as const,
      default: ''
    },

    icon: {
      type: String,
      default: ''
    }
  }
})
</script>
