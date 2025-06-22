import { apiClient, API_ENDPOINTS } from '@/lib/axios'
import type {
  Property,
  Booking,
  CreateBookingRequest,
  PropertyFilters,
  BookingFilters,
} from '@/entities/property'

// Property API Service
export const propertyService = {
  async getAllProperties(propertiesFilters?: PropertyFilters): Promise<Property[]> {
    try {
      const response = await apiClient.get<Property[]>(API_ENDPOINTS.properties.getAll, {
        params: {
          available: propertiesFilters?.filters?.available === undefined ? undefined : propertiesFilters?.filters?.available,
        }
      })
      return response.data
    } catch (error) {
      console.error('Error fetching properties:', error)
      throw new Error('Failed to fetch properties')
    }
  },

  async getPropertyById(id: string): Promise<Property | null> {
    try {
      const response = await apiClient.get<Property>(API_ENDPOINTS.properties.getById(id))
      return response.data
    } catch (error) {
      console.error('Error fetching property:', error)
      return null
    }
  },



  // Booking actions on properties
  async getBookings(bookingFilters?: BookingFilters): Promise<Booking[]> {

    try {
      const response = await apiClient.get<Booking[]>(API_ENDPOINTS.properties.bookings.getAll, {
        params: {
          guestEmail: bookingFilters?.guestEmail || undefined,
          status: bookingFilters?.status || undefined,
        }
      })
      return response.data
    } catch (error) {
      console.error('Error fetching bookings:', error)
      throw new Error('Failed to fetch bookings')
    }
  },




  async createBooking(bookingData: CreateBookingRequest): Promise<Booking> {
    try {
      const response = await apiClient.post<Booking>(API_ENDPOINTS.properties.bookings.create, {
        ...bookingData,
        status: 'pending', 
      })
      return response.data
    } catch (error) {
      console.error('Error creating booking:', error)
      throw new Error('Failed to create booking')
    }
  },

}
