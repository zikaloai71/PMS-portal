<template>
  <div class="notification-container">
    <v-snackbar
      v-for="notification in notifications"
      :key="notification.id"
      :model-value="true"
      :color="getColor(notification.type)"
      :timeout="0"
      location="top right"
      :multi-line="!!notification.title"
      class="mb-2"
    >
      <div class="d-flex align-center">
        <v-icon :icon="getIcon(notification.type)" class="me-3"></v-icon>
        <div class="flex-grow-1">
          <div v-if="notification.title" class="mb-1 font-weight-medium">
            {{ notification.title }}
          </div>
          <div class="text-body-2">
            {{ notification.message }}
          </div>
        </div>
      </div>

      <template v-slot:actions>
        <div class="gap-2 d-flex">
          <!-- Custom actions -->
          <v-btn
            v-for="action in notification.actions"
            :key="action.label"
            variant="text"
            size="small"
            @click="action.action"
          >
            {{ action.label }}
          </v-btn>
          
          <!-- Close button -->
          <v-btn
            variant="text"
            size="small"
            icon
            @click="removeNotification(notification.id)"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useNotificationStore, type NotificationType } from '@/stores/notification'

const notificationStore = useNotificationStore()

const notifications = computed(() => notificationStore.notifications)

const getColor = (type: NotificationType): string => {
  switch (type) {
    case 'success':
      return 'success'
    case 'error':
      return 'error'
    case 'warning':
      return 'warning'
    case 'info':
      return 'info'
    default:
      return 'default'
  }
}

const getIcon = (type: NotificationType): string => {
  switch (type) {
    case 'success':
      return 'mdi-check-circle'
    case 'error':
      return 'mdi-alert-circle'
    case 'warning':
      return 'mdi-alert'
    case 'info':
      return 'mdi-information'
    default:
      return 'mdi-bell'
  }
}

const removeNotification = (id: string) => {
  notificationStore.remove(id)
}
</script>

<style scoped>
.notification-container {
  position: fixed;
  top: 80px;
  right: 16px;
  z-index: 9999;
  pointer-events: none;
}

.notification-container :deep(.v-snackbar) {
  pointer-events: auto;
  position: relative !important;
  margin-bottom: 8px;
}
</style>
