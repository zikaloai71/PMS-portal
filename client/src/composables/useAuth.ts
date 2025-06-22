import {  useMutation } from '@tanstack/vue-query'
import { useAuthStore } from '@/stores/auth'
import { useNotificationStore } from '@/stores/notification'
import type { User } from '@/entities'
import { authService } from '@/services'



// User Mutation Composables
export function useLoginMutation() {

  const authStore = useAuthStore()
  const notificationStore = useNotificationStore()

  return useMutation({
    mutationFn: (email: string) => authService.login({ email }),
    onSuccess: (user: User) => {
      authStore.setUser(user)
      
      notificationStore.success(
        `Welcome back, ${user.name}!`,
        'Login Successful'
      )
    },
    onError: (error) => {
      console.error('Login failed:', error)
      notificationStore.error('No account found with this email address')
    },
  })
}



