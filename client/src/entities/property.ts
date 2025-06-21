export interface Property {
  id: string
  title: string
  description: string
  pricePerNight: number
  imageUrl: string
  available: boolean
  type: string
  location: string
}


export interface PropertyFilters {
  query?: string
  filters?: {
    available?: boolean
  }
}


export type BookingStatus = 'pending' | 'confirmed' | 'completed'
export interface Booking {
  id: string
  propertyId: string
  guestName: string
  guestEmail: string
  checkIn: string
  checkOut: string
  status: BookingStatus
}


export interface CreateBookingRequest {
  propertyId: string
  guestName: string
  guestEmail: string
  checkInDate: string
  checkOutDate: string
}


export interface BookingFilters {
  guestEmail?: string
  status?: BookingStatus
}






