<template>
  <AppLayout>
    <v-container>
      <!-- Page Header -->
      <v-row justify="center" class="mb-8">
        <v-col cols="12" md="8" class="text-center">
          <h1 class="mb-4 text-h3 font-weight-bold">
            My Bookings
          </h1>
          <p class="text-h6 text-medium-emphasis">
            View and manage your property reservations
          </p>
        </v-col>
      </v-row>

      <!-- Loading State -->
      <v-row v-if="isLoading" justify="center">
        <v-col cols="12" class="text-center">
          <LoadingSpinner message="Loading your bookings..." />
        </v-col>
      </v-row>

      <!-- Error State -->
      <v-row v-else-if="error">
        <v-col cols="12">
          <AlertMessage type="error" title="Failed to load bookings" :message="error.message" />
        </v-col>
      </v-row>

      <!-- Bookings Content -->
      <template v-else-if="bookings && bookings.length > 0">
        <!-- Bookings Stats -->
        <v-row class="mb-8">
          <v-col cols="12" md="4">
            <v-card>
              <v-card-text class="pa-6">
                <div class="d-flex align-center">
                  <v-avatar color="blue-lighten-2" size="48" class="me-4">
                    <v-icon color="white">mdi-calendar-multiple</v-icon>
                  </v-avatar>
                  <div>
                    <div class="text-caption font-weight-medium text-medium-emphasis">Total Bookings</div>
                    <div class="text-h4 font-weight-bold">{{ bookings.length }}</div>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card>
              <v-card-text class="pa-6">
                <div class="d-flex align-center">
                  <v-avatar color="green-lighten-2" size="48" class="me-4">
                    <v-icon color="white">mdi-calendar-clock</v-icon>
                  </v-avatar>
                  <div>
                    <div class="text-caption font-weight-medium text-medium-emphasis">Upcoming</div>
                    <div class="text-h4 font-weight-bold">{{ upcomingBookings.length }}</div>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card>
              <v-card-text class="pa-6">
                <div class="d-flex align-center">
                  <v-avatar color="grey-lighten-2" size="48" class="me-4">
                    <v-icon color="white">mdi-history</v-icon>
                  </v-avatar>
                  <div>
                    <div class="text-caption font-weight-medium text-medium-emphasis">Past</div>
                    <div class="text-h4 font-weight-bold">{{ pastBookings.length }}</div>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Bookings Sections -->
        <div class="mb-8">
          <!-- Upcoming Bookings -->
          <div v-if="upcomingBookings.length > 0" class="mb-12">
            <h2 class="mb-6 text-h5 font-weight-bold d-flex align-center">
              <v-icon class="me-2" color="green">mdi-calendar-clock</v-icon>
              Upcoming Bookings
            </h2>
            <v-row>
              <v-col v-for="booking in upcomingBookings" :key="booking.id" cols="12" lg="6">
                <BookingCard :booking="booking" :property="getPropertyById(booking.propertyId)" />
              </v-col>
            </v-row>
          </div>

          <!-- Past Bookings -->
          <div v-if="pastBookings.length > 0">
            <h2 class="mb-6 text-h5 font-weight-bold d-flex align-center">
              <v-icon class="me-2" color="grey">mdi-history</v-icon>
              Past Bookings
            </h2>
            <v-row>
              <v-col v-for="booking in pastBookings" :key="booking.id" cols="12" lg="6">
                <BookingCard :booking="booking" :property="getPropertyById(booking.propertyId)" />
              </v-col>
            </v-row>
          </div>
        </div>
      </template>

      <!-- Empty State -->
      <v-row v-else justify="center">
        <v-col cols="12" md="6" class="text-center">
          <v-icon size="64" color="grey-lighten-1" class="mb-4">
            mdi-calendar-remove
          </v-icon>
          <h3 class="mb-4 text-h5 font-weight-medium">No bookings yet</h3>
          <p class="mb-6 text-body-1 text-medium-emphasis">
            You haven't made any bookings yet. Start exploring our properties to make your first reservation.
          </p>
          <v-btn :to="paths.home.properties.root" color="primary" variant="elevated" size="large"
            prepend-icon="mdi-magnify">
            Browse Properties
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </AppLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppLayout from '@/components/layouts/AppLayout.vue'
import BookingCard from '@/components/BookingCard.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import AlertMessage from '@/components/ui/AlertMessage.vue'
import { useBookings, useGetProperties } from '@/composables'
import { isDateInFuture, isDateInPast } from '@/utils'
import { paths } from '@/router/paths'

const route = useRoute()



// Get email from route params or fallback to auth store
const guestEmail = computed(() => {
  return (route.params.email as string)
})



// API queries
const { data: bookings, isLoading, error } = useBookings({
  bookingFilters: {
    guestEmail: guestEmail.value,
  }
})


const { data: properties } = useGetProperties({ propertiesFilters: {} })

// Computed properties
const upcomingBookings = computed(() => {
  if (!bookings.value) return []
  return bookings.value
    .filter(booking => isDateInFuture(booking.checkIn))
    .sort((a, b) => new Date(a.checkIn).getTime() - new Date(b.checkIn).getTime())
})

const pastBookings = computed(() => {
  if (!bookings.value) return []
  return bookings.value
    .filter(booking => isDateInPast(booking.checkOut))
    .sort((a, b) => new Date(b.checkOut).getTime() - new Date(a.checkOut).getTime())
})

// Methods
const getPropertyById = (propertyId: string | number) => {
  if (!properties.value) return undefined
  return properties.value.find(p => p.id === propertyId.toString())
}

</script>
