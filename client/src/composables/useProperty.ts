import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

import { propertyService } from '@/services'

import type { VueQueryOptions } from '@/lib'
import type { BookingFilters, PropertyFilters } from '@/entities'
import { useNotificationStore } from '@/stores/notification'

export const PropertiesQueryKey = 'properties'
export const BookingsQueryKey = 'bookings'

// Property Query Composables
export function useGetProperties({propertiesFilters,queryOptions}:{
    propertiesFilters?: PropertyFilters,
    queryOptions?: VueQueryOptions<typeof propertyService.getAllProperties>
}) {
    return useQuery({
        queryKey: [PropertiesQueryKey, propertiesFilters],
        queryFn: ()=>propertyService.getAllProperties(propertiesFilters),
        ...queryOptions,
    })
}

export function useGetProperty({
    propertyId,
    queryOptions
}: {
    propertyId: string,
    queryOptions?: VueQueryOptions<typeof propertyService.getPropertyById>
}) {
    return useQuery({
        queryKey: [PropertiesQueryKey, propertyId],
        queryFn: () => propertyService.getPropertyById(propertyId),
        enabled: !!propertyId,
        ...queryOptions,
    })
}



// Booking Query Composables (as actions on properties)
export function useBookings({
    bookingFilters,
    queryOptions
}:{
    bookingFilters?: BookingFilters,
    queryOptions?: VueQueryOptions<typeof propertyService.getBookings>
}) {
    return useQuery({
        queryKey: [BookingsQueryKey,bookingFilters],
        queryFn: () => propertyService.getBookings(bookingFilters),
        ...queryOptions,
    })
}

export function useCreateBooking() {
    const queryClient = useQueryClient()
    const notificationStore = useNotificationStore()
    return useMutation({
        mutationFn:propertyService.createBooking,
        onMutate: () => {
            queryClient.cancelQueries({ queryKey: [BookingsQueryKey] })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [BookingsQueryKey] })
            notificationStore.success('Booking created successfully')
        },
        onError: (error) => {
            notificationStore.error(`Failed to create booking: ${error.message}`)
        },
    });
}

