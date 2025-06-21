import { defineStore } from 'pinia'

export type NotificationType = 'success' | 'error' | 'warning' | 'info'

export interface Notification {
  id: string
  type: NotificationType
  title?: string
  message: string
  timeout?: number
  actions?: Array<{
    label: string
    action: () => void
  }>
}

interface NotificationState {
  notifications: Notification[]
}

export const useNotificationStore = defineStore('notification', {
  state: (): NotificationState => ({
    notifications: [],
  }),

  actions: {
    show(notification: Omit<Notification, 'id'>) {
      const id = Math.random().toString(36).substr(2, 9)
      const newNotification: Notification = {
        id,
        timeout: 5000, // Default 5 seconds
        ...notification,
      }
      
      this.notifications.push(newNotification)
      
      // Auto-remove after timeout (unless timeout is 0 for persistent notifications)
      if (newNotification.timeout && newNotification.timeout > 0) {
        setTimeout(() => {
          this.remove(id)
        }, newNotification.timeout)
      }
      
      return id
    },

    success(message: string, title?: string, timeout?: number) {
      return this.show({
        type: 'success',
        title,
        message,
        timeout,
      })
    },

    error(message: string, title?: string, timeout?: number) {
      return this.show({
        type: 'error',
        title,
        message,
        timeout: timeout || 7000, // Errors stay longer
      })
    },

    warning(message: string, title?: string, timeout?: number) {
      return this.show({
        type: 'warning',
        title,
        message,
        timeout,
      })
    },

    info(message: string, title?: string, timeout?: number) {
      return this.show({
        type: 'info',
        title,
        message,
        timeout,
      })
    },

    loginRequired(action?: string) {
      return this.warning(
        `Please log in to ${action || 'perform this action'}`,
        'Login Required',
        6000
      )
    },

    remove(id: string) {
      const index = this.notifications.findIndex(n => n.id === id)
      if (index > -1) {
        this.notifications.splice(index, 1)
      }
    },

    clear() {
      this.notifications = []
    },
  },
})
