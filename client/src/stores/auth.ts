import type { User } from '@/entities'
import { defineStore } from 'pinia'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
  }),

  getters: {
    currentUser: (state): User | null => state.user,
    userEmail: (state): string => state.user?.email || '',
    userName: (state): string => state.user?.name || '',
  },

  actions: {
    setUser(user: User | null) {
      this.user = user
      this.isAuthenticated = !!user
      
      // Persist user session in localStorage
      if (user) {
        localStorage.setItem('pms_user', JSON.stringify(user))
      } else {
        localStorage.removeItem('pms_user')
      }
    },

    setLoading(loading: boolean) {
      this.isLoading = loading
    },

    logout() {
      this.setUser(null)
      window.location.reload()
    },

    // Initialize auth from localStorage on app start
    initializeAuth() {
      try {
        const storedUser = localStorage.getItem('pms_user')
        if (storedUser) {
          const user = JSON.parse(storedUser) as User
          this.setUser(user)
        }
      } catch (error) {
        console.error('Error initializing auth from localStorage:', error)
        localStorage.removeItem('pms_user')
      }
    },
  },
})
