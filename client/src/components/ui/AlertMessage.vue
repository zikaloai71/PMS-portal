<template>
  <v-alert
    :type="alertType"
    :title="title"
    :text="message"
    :closable="dismissible"
    variant="tonal"
    class="mb-4"
    @click:close="$emit('dismiss')"
  >
    <template v-if="$slots.default">
      <slot />
    </template>
  </v-alert>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type AlertType = 'success' | 'error' | 'warning' | 'info'

interface Props {
  type: AlertType
  title?: string
  message: string
  dismissible?: boolean
}

const props = defineProps<Props>()
defineEmits<{
  'dismiss': []
}>()

const alertType = computed(() => {
  // Map our alert types to Vuetify alert types
  switch (props.type) {
    case 'error':
      return 'error'
    case 'warning':
      return 'warning'
    case 'info':
      return 'info'
    case 'success':
      return 'success'
    default:
      return 'info'
  }
})
</script>
