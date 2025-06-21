<template>
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
          <v-col cols="12" md="3">
            <v-card 
              :color="selectedFilter === 'all' ? 'primary' : 'default'"
              :variant="selectedFilter === 'all' ? 'flat' : 'outlined'"
              class="cursor-pointer"
              hover
              @click="selectedFilter = 'all'"
            >
              <v-card-text class="pa-6">
                <div class="d-flex align-center">
                  <v-avatar :color="selectedFilter === 'all' ? 'white' : 'blue-lighten-2'" size="48" class="me-4">
                    <v-icon :color="selectedFilter === 'all' ? 'primary' : 'white'">mdi-calendar-multiple</v-icon>
                  </v-avatar>
                  <div>
                    <div class="text-caption font-weight-medium text-nowrap" :class="selectedFilter === 'all' ? 'text-white' : ''">Total Bookings</div>
                    <div class="text-h4 font-weight-bold" :class="selectedFilter === 'all' ? 'text-white' : ''">{{ bookings.length }}</div>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="3">
            <v-card 
              :color="selectedFilter === 'upcoming' ? 'primary' : 'default'"
              :variant="selectedFilter === 'upcoming' ? 'flat' : 'outlined'"
              class="cursor-pointer"
              hover
              @click="selectedFilter = 'upcoming'"
            >
              <v-card-text class="pa-6">
                <div class="d-flex align-center">
                  <v-avatar :color="selectedFilter === 'upcoming' ? 'white' : 'green-lighten-2'" size="48" class="me-4">
                    <v-icon :color="selectedFilter === 'upcoming' ? 'primary' : 'white'">mdi-calendar-clock</v-icon>
                  </v-avatar>
                  <div>
                    <div class="text-caption font-weight-medium" :class="selectedFilter === 'upcoming' ? 'text-white' : 'text-medium-emphasis'">Upcoming</div>
                    <div class="text-h4 font-weight-bold" :class="selectedFilter === 'upcoming' ? 'text-white' : ''">{{ upcomingBookings.length }}</div>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="3">
            <v-card 
              :color="selectedFilter === 'current' ? 'primary' : 'default'"
              :variant="selectedFilter === 'current' ? 'flat' : 'outlined'"
              class="cursor-pointer"
              hover
              @click="selectedFilter = 'current'"
            >
              <v-card-text class="pa-6">
                <div class="d-flex align-center">
                  <v-avatar :color="selectedFilter === 'current' ? 'white' : 'orange-lighten-2'" size="48" class="me-4">
                    <v-icon :color="selectedFilter === 'current' ? 'primary' : 'white'">mdi-calendar-today</v-icon>
                  </v-avatar>
                  <div>
                    <div class="text-caption font-weight-medium" :class="selectedFilter === 'current' ? 'text-white' : 'text-medium-emphasis'">Current</div>
                    <div class="text-h4 font-weight-bold" :class="selectedFilter === 'current' ? 'text-white' : ''">{{ currentBookings.length }}</div>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="3">
            <v-card 
              :color="selectedFilter === 'past' ? 'primary' : 'default'"
              :variant="selectedFilter === 'past' ? 'flat' : 'outlined'"
              class="cursor-pointer"
              hover
              @click="selectedFilter = 'past'"
            >
              <v-card-text class="pa-6">
                <div class="d-flex align-center">
                  <v-avatar :color="selectedFilter === 'past' ? 'white' : 'grey-lighten-2'" size="48" class="me-4">
                    <v-icon :color="selectedFilter === 'past' ? 'primary' : 'white'">mdi-history</v-icon>
                  </v-avatar>
                  <div>
                    <div class="text-caption font-weight-medium" :class="selectedFilter === 'past' ? 'text-white' : 'text-medium-emphasis'">Past</div>
                    <div class="text-h4 font-weight-bold" :class="selectedFilter === 'past' ? 'text-white' : ''">{{ pastBookings.length }}</div>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Bookings Sections -->
        <div class="mb-8">
          <!-- Filter Header -->
          <h2 class="mb-6 text-h5 font-weight-bold d-flex align-center">
            <v-icon class="me-2" :color="filterConfig.color">{{ filterConfig.icon }}</v-icon>
            {{ filterConfig.title }}
            <v-chip class="ms-2" size="small" variant="outlined">{{ filteredBookings.length }}</v-chip>
          </h2>

          <!-- Filtered Bookings -->
          <v-row v-if="filteredBookings.length > 0">
            <v-col v-for="booking in filteredBookings" :key="booking.id" cols="12" lg="6">
              <BookingCard :booking="booking" />
            </v-col>
          </v-row>

          <!-- No bookings for filter -->
          <v-row v-else justify="center">
            <v-col cols="12" md="6" class="text-center">
              <v-icon size="48" :color="filterConfig.color" class="mb-4">
                {{ filterConfig.icon }}
              </v-icon>
              <h4 class="mb-2 text-h6 font-weight-medium">No {{ filterConfig.title.toLowerCase() }}</h4>
              <p class="text-body-2 text-medium-emphasis">
                {{ filterConfig.emptyMessage }}
              </p>
            </v-col>
          </v-row>
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

</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import BookingCard from '@/components/BookingCard.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import AlertMessage from '@/components/ui/AlertMessage.vue'
import { useBookings } from '@/composables'
import { isDateInFuture, isDateInPast } from '@/utils'
import { paths } from '@/router/paths'

const route = useRoute()

// Filter state
const selectedFilter = ref<'all' | 'upcoming' | 'current' | 'past'>('all')

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

// Computed properties for different booking categories
const upcomingBookings = computed(() => {
  if (!bookings.value) return []
  return bookings.value
    .filter(booking => isDateInFuture(booking.checkIn))
    .sort((a, b) => new Date(a.checkIn).getTime() - new Date(b.checkIn).getTime())
})

const currentBookings = computed(() => {
  if (!bookings.value) return []
  return bookings.value
    .filter(booking => !isDateInFuture(booking.checkIn) && !isDateInPast(booking.checkOut))
    .sort((a, b) => new Date(a.checkIn).getTime() - new Date(b.checkIn).getTime())
})

const pastBookings = computed(() => {
  if (!bookings.value) return []
  return bookings.value
    .filter(booking => isDateInPast(booking.checkOut))
    .sort((a, b) => new Date(b.checkOut).getTime() - new Date(a.checkOut).getTime())
})

// Filtered bookings based on selected filter
const filteredBookings = computed(() => {
  switch (selectedFilter.value) {
    case 'upcoming':
      return upcomingBookings.value
    case 'current':
      return currentBookings.value
    case 'past':
      return pastBookings.value
    case 'all':
    default:
      return bookings.value || []
  }
})

// Filter configuration for UI
const filterConfig = computed(() => {
  switch (selectedFilter.value) {
    case 'upcoming':
      return {
        title: 'Upcoming Bookings',
        icon: 'mdi-calendar-clock',
        color: 'green',
        emptyMessage: 'You have no upcoming bookings at the moment.'
      }
    case 'current':
      return {
        title: 'Current Bookings',
        icon: 'mdi-calendar-today',
        color: 'orange',
        emptyMessage: 'You have no current bookings at the moment.'
      }
    case 'past':
      return {
        title: 'Past Bookings',
        icon: 'mdi-history',
        color: 'grey',
        emptyMessage: 'You have no past bookings to display.'
      }
    case 'all':
    default:
      return {
        title: 'All Bookings',
        icon: 'mdi-calendar-multiple',
        color: 'blue',
        emptyMessage: 'No bookings found.'
      }
  }
})

</script>
