import { defineStore } from 'pinia'
import type { Property, Booking } from '@/types'

interface AppState {
  properties: Property[]
  bookings: Booking[]
  isLoading: boolean
  error: string | null
}

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    properties: [],
    bookings: [],
    isLoading: false,
    error: null,
  }),

  getters: {
    availableProperties: (state): Property[] => 
      state.properties.filter(property => property.available),
    
    getPropertyById: (state) => (id: string): Property | undefined => 
      state.properties.find(property => property.id === id),
    
    upcomingBookings: (state): Booking[] => {
      const today = new Date().toISOString().split('T')[0]
      return state.bookings.filter(booking => booking.checkIn >= today)
    },
    
    pastBookings: (state): Booking[] => {
      const today = new Date().toISOString().split('T')[0]
      return state.bookings.filter(booking => booking.checkOut < today)
    },
  },

  actions: {
    setProperties(properties: Property[]) {
      this.properties = properties
    },

    setBookings(bookings: Booking[]) {
      this.bookings = bookings
    },

    addBooking(booking: Booking) {
      this.bookings.push(booking)
    },

    setLoading(loading: boolean) {
      this.isLoading = loading
    },

    setError(error: string | null) {
      this.error = error
    },

    clearError() {
      this.error = null
    },
  },
})
