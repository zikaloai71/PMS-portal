<template>
  <teleport to="body">
    <div class="notification-container">
      <transition-group name="notification" tag="div">
        <v-alert
          v-for="(notification, index) in notifications"
          :key="notification.id"
          :type="notification.type"
          :title="notification.title"
          :text="notification.message"
          closable
          variant="elevated"
          density="comfortable"
          class="mb-3 notification-alert"
          :style="{ transform: `translateY(${index * 10}px)` }"
          @click:close="removeNotification(notification.id)"
        >
          <template v-if="notification.actions && notification.actions.length > 0" v-slot:append>
            <div class="gap-2 d-flex">
              <v-btn
                v-for="action in notification.actions"
                :key="action.label"
                variant="text"
                size="small"
                @click="action.action"
              >
                {{ action.label }}
              </v-btn>
            </div>
          </template>
        </v-alert>
      </transition-group>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useNotificationStore } from '@/stores/notification'

const notificationStore = useNotificationStore()

const notifications = computed(() => notificationStore.notifications)

const removeNotification = (id: string) => {
  notificationStore.remove(id)
}
</script>

<style scoped>
.notification-container {
  position: fixed;
  top: 20px;
  right: 16px;
  z-index: 9999;
  max-width: 400px;
  width: 100%;
  pointer-events: none;
}

.notification-alert {
  pointer-events: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.notification-move {
  transition: transform 0.3s ease;
}
</style>
