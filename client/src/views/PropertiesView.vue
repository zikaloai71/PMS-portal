<template>
        <v-container>
            <!-- Page Header -->
            <v-row justify="center" class="mb-8">
                <v-col cols="12" md="8" class="text-center">
                    <h1 class="mb-4 text-h3 font-weight-bold">
                        Available Properties
                    </h1>
                    <p class="text-h6 text-medium-emphasis">
                        Discover amazing places to stay. Browse through our curated selection of properties and book
                        your perfect getaway.
                    </p>
                </v-col>
            </v-row>

            <!-- Loading State -->
            <v-row v-if="isPending" justify="center">
                <v-col cols="12" class="text-center">
                    <LoadingSpinner message="Loading properties..." />
                </v-col>
            </v-row>

            <!-- Error State -->
            <v-row v-else-if="error">
                <v-col cols="12">
                    <AlertMessage type="error" title="Failed to load properties" :message="error.message"  />
                </v-col>
            </v-row>

            <!-- Properties Content -->
            <template v-else-if="properties && properties.length > 0">
                <!-- Filter/Stats Bar -->
                <v-row class="mb-6">
                    <v-col cols="12">
                        <v-card variant="outlined" class="pa-4">
                            <v-row align="center">
                                <v-col cols="12" md="6">
                                    <div class="text-body-1 text-medium-emphasis">
                                        Showing {{ availableCount }} of {{ properties.length }} properties
                                    </div>
                                </v-col>
                                <v-col cols="12" md="6" class="text-md-end">
                                    <v-chip color="success" size="small" class="me-2">
                                        <v-icon start>mdi-check-circle</v-icon>
                                        {{ availableCount }} Available
                                    </v-chip>
                                    <v-chip color="default" size="small">
                                        <v-icon start>mdi-close-circle</v-icon>
                                        {{ unavailableCount }} Unavailable
                                    </v-chip>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                </v-row>

                <!-- Properties Grid -->
                <v-row>
                    <v-col v-for="property in properties" :key="property.id" cols="12" sm="6" lg="4" xl="3">
                        <PropertyCard :property="property" @book-now="handleBookNow" />
                    </v-col>
                </v-row>
            </template>

            <!-- Empty State -->
            <v-row v-else justify="center">
                <v-col cols="12" md="6" class="text-center">
                    <v-icon size="64" color="grey-lighten-1" class="mb-4">
                        mdi-home-search
                    </v-icon>
                    <h3 class="mb-4 text-h5 font-weight-medium">No properties available</h3>
                    <p class="text-body-1 text-medium-emphasis">
                        We couldn't find any properties at the moment. Please check back later.
                    </p>
                </v-col>
            </v-row>

            <!-- Booking Modal -->
            <BookingModal v-if="selectedProperty" :property="selectedProperty" :is-submitting="isCreatingBooking"
                @close="selectedProperty = null" @submit="handleCreateBooking" />
        </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

import PropertyCard from '@/components/PropertyCard.vue'
import BookingModal from '@/components/BookingModal.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import AlertMessage from '@/components/ui/AlertMessage.vue'
import { useGetProperties, useCreateBooking } from '@/composables'
import { useAuthStore } from '@/stores/auth'
import { useNotificationStore } from '@/stores/notification'
import type { Property, BookingFormData } from '@/types'

const authStore = useAuthStore()
const notificationStore = useNotificationStore()

// API queries
const { data: properties, isPending, error } = useGetProperties({})
const createBookingMutation = useCreateBooking()

// Component state
const selectedProperty = ref<Property | null>(null)

// Computed properties
const availableCount = computed(() => {
    return properties.value?.filter(p => p.available).length || 0
})

const unavailableCount = computed(() => {
    return properties.value?.filter(p => !p.available).length || 0
})

const isCreatingBooking = computed(() => createBookingMutation.isPending.value)

// Methods
const handleBookNow = (property: Property) => {
    if (!authStore.isAuthenticated) {
        notificationStore.loginRequired('book a property')
        return
    }
    selectedProperty.value = property
}

const handleCreateBooking = async (bookingData: BookingFormData & { guestEmail: string }) => {
    if (!selectedProperty.value) return

    try {
        await createBookingMutation.mutateAsync({
            propertyId: selectedProperty.value.id,
            guestName: bookingData.guestName,
            guestEmail: bookingData.guestEmail,
            checkIn: bookingData.checkIn,
            checkOut: bookingData.checkOut,
        })

        // Close modal on success
        selectedProperty.value = null

    } catch (error) {
        console.error('Failed to create booking:', error)
        // Error handling is managed by the mutation
    }
}


</script>
