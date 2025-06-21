<template>
  <v-card elevation="2" class="ma-2">
    <!-- Booking Header -->
    <v-card-title class="d-flex justify-space-between align-center">
      <div>
        <div class="text-h6">{{ propertyTitle }}</div>
        <div class="text-caption text-medium-emphasis">
          Booking #{{ booking.id }}
        </div>
      </div>
      <v-chip
        :color="statusColor"
        size="small"
        variant="flat"
      >
        <v-icon start>{{ statusIcon }}</v-icon>
        {{ booking.status? booking.status.charAt(0).toUpperCase() + booking.status.slice(1) :'pending' }}
      </v-chip>
    </v-card-title>

    <!-- Booking Details -->
    <v-card-text>
      <v-list density="compact" class="pa-0">
        <v-list-item class="px-0">
          <template v-slot:prepend>
            <v-icon color="primary">mdi-calendar-arrow-right</v-icon>
          </template>
          <v-list-item-title>Check-in</v-list-item-title>
          <v-list-item-subtitle>{{ formatDate(booking.checkIn) }}</v-list-item-subtitle>
        </v-list-item>

        <v-list-item class="px-0">
          <template v-slot:prepend>
            <v-icon color="primary">mdi-calendar-arrow-left</v-icon>
          </template>
          <v-list-item-title>Check-out</v-list-item-title>
          <v-list-item-subtitle>{{ formatDate(booking.checkOut) }}</v-list-item-subtitle>
        </v-list-item>

        <v-list-item class="px-0">
          <template v-slot:prepend>
            <v-icon color="primary">mdi-clock-outline</v-icon>
          </template>
          <v-list-item-title>Duration</v-list-item-title>
          <v-list-item-subtitle>{{ nightsCount }} {{ nightsCount === 1 ? 'night' : 'nights' }}</v-list-item-subtitle>
        </v-list-item>

        <v-list-item class="px-0" v-if="totalPrice > 0">
          <template v-slot:prepend>
            <v-icon color="success">mdi-currency-usd</v-icon>
          </template>
          <v-list-item-title>Total</v-list-item-title>
          <v-list-item-subtitle class="font-weight-bold">{{ formatCurrency(totalPrice) }}</v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-card-text>

    <!-- Booking Timeline -->
    <v-card-actions>
      <v-chip
        :color="timeStatusColor"
        size="small"
        variant="outlined"
      >
        <v-icon start>{{ timeStatusIcon }}</v-icon>
        {{ bookingTimeStatus }}
      </v-chip>
      <v-spacer></v-spacer>
      <span class="text-caption text-medium-emphasis">
        {{ formatShortDate(booking.checkIn) }} - {{ formatShortDate(booking.checkOut) }}
      </span>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Booking } from '@/types'
import { useGetProperty } from '@/composables'
import { formatDate, formatShortDate, formatCurrency, calculateNights, isDateInFuture, isDateInPast } from '@/utils'

interface Props {
  booking: Booking
}

const props = defineProps<Props>()

// Fetch property data using the property ID from booking
const { data: property } = useGetProperty({
  propertyId: props.booking.propertyId.toString()
})

const propertyTitle = computed(() => {
  return property.value?.title || `Property #${props.booking.propertyId}`
})

const statusColor = computed(() => {
  switch (props.booking.status) {
    case 'confirmed':
      return 'success'
    case 'pending':
      return 'warning'
    case 'cancelled':
      return 'error'
    default:
      return 'warning'
  }
})

const statusIcon = computed(() => {
  switch (props.booking.status) {
    case 'confirmed':
      return 'mdi-check-circle'
    case 'pending':
      return 'mdi-clock-outline'
    case 'cancelled':
      return 'mdi-close-circle'
    default:
      return 'mdi-clock-outline'
  }
})

const nightsCount = computed(() => {
  return calculateNights(props.booking.checkIn, props.booking.checkOut)
})

const totalPrice = computed(() => {
  const nights = nightsCount.value
  const pricePerNight = property.value?.pricePerNight || 0
  return nights * pricePerNight
})

const bookingTimeStatus = computed(() => {
  if (isDateInFuture(props.booking.checkIn)) {
    return 'Upcoming'
  } else if (isDateInPast(props.booking.checkOut)) {
    return 'Completed'
  } else {
    return 'Current'
  }
})

const timeStatusColor = computed(() => {
  const status = bookingTimeStatus.value
  switch (status) {
    case 'Upcoming':
      return 'primary'
    case 'Current':
      return 'success'
    case 'Completed':
      return 'default'
    default:
      return 'default'
  }
})

const timeStatusIcon = computed(() => {
  const status = bookingTimeStatus.value
  switch (status) {
    case 'Upcoming':
      return 'mdi-calendar-clock'
    case 'Current':
      return 'mdi-calendar-today'
    case 'Completed':
      return 'mdi-calendar-check'
    default:
      return 'mdi-calendar'
  }
})
</script>
