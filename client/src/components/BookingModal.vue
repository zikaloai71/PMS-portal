<template>
  <v-dialog
    :model-value="true"
    @update:model-value="$emit('close')"
    max-width="600"
    persistent
  >
    <v-card>
      <!-- Modal Header -->
      <v-card-title class="d-flex align-center justify-space-between">
        <div class="d-flex align-center">
          <v-icon class="me-2" color="primary">mdi-calendar-plus</v-icon>
          <span>Book {{ property.title }}</span>
        </div>
        <v-btn
          icon
          variant="text"
          @click="$emit('close')"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-divider></v-divider>

      <!-- Property Summary -->
      <v-card-text>
        <v-card
          variant="tonal"
          color="primary"
          class="mb-6"
        >
          <v-card-title class="text-h6">{{ property.title }}</v-card-title>
          <v-card-subtitle>
            <v-icon size="small" class="me-1">mdi-map-marker</v-icon>
            {{ property.location }}
          </v-card-subtitle>
          <v-card-text>
            <div class="text-h5 font-weight-bold text-primary">
              {{ formatCurrency(property.pricePerNight) }}
              <span class="text-body-1 text-medium-emphasis">/night</span>
            </div>
          </v-card-text>
        </v-card>

        <!-- Booking Form -->
        <v-form @submit.prevent="handleSubmit">
          <v-row>
            <!-- Guest Name -->
            <v-col cols="12">
              <v-text-field
                v-model="formData.guestName"
                label="Full Name"
                :error-messages="errors.guestName"
                variant="outlined"
                density="comfortable"
                required
                prepend-inner-icon="mdi-account"
              ></v-text-field>
            </v-col>

            <!-- Check-in Date -->
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="formData.checkIn"
                label="Check-in Date"
                :error-messages="errors.checkIn"
                variant="outlined"
                density="comfortable"
                type="date"
                :min="minDate"
                required
                prepend-inner-icon="mdi-calendar-arrow-right"
              ></v-text-field>
            </v-col>

            <!-- Check-out Date -->
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="formData.checkOut"
                label="Check-out Date"
                :error-messages="errors.checkOut"
                variant="outlined"
                density="comfortable"
                type="date"
                :min="minCheckOutDate"
                required
                prepend-inner-icon="mdi-calendar-arrow-left"
              ></v-text-field>
            </v-col>
          </v-row>

          <!-- Booking Summary -->
          <v-card
            v-if="isValidDateRange"
            variant="outlined"
            color="info"
            class="mt-4"
          >
            <v-card-title class="text-h6">
              <v-icon class="me-2">mdi-calculator</v-icon>
              Booking Summary
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="8">Duration:</v-col>
                <v-col cols="4" class="text-end">{{ nights }} {{ nights === 1 ? 'night' : 'nights' }}</v-col>
              </v-row>
              <v-row>
                <v-col cols="8">Rate per night:</v-col>
                <v-col cols="4" class="text-end">{{ formatCurrency(property.pricePerNight) }}</v-col>
              </v-row>
              <v-divider class="my-2"></v-divider>
              <v-row class="font-weight-bold">
                <v-col cols="8" class="text-h6">Total:</v-col>
                <v-col cols="4" class="text-end text-h6 text-primary">{{ formatCurrency(totalPrice) }}</v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <!-- Form Actions -->
      <v-card-actions class="pa-4">
        <v-spacer></v-spacer>
        <v-btn
          variant="text"
          @click="$emit('close')"
        >
          Cancel
        </v-btn>
        <v-btn
          color="primary"
          variant="elevated"
          :disabled="isSubmitting || !isFormValid"
          :loading="isSubmitting"
          @click="handleSubmit"
        >
          <v-icon start>mdi-check</v-icon>
          Confirm Booking
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { Property, BookingFormData, FormErrors } from '@/types'
import { formatCurrency, validateRequired, validateBookingDates, calculateNights } from '@/utils'
import { useAuthStore } from '@/stores/auth'

interface Props {
  property: Property
  isSubmitting?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'close': []
  'submit': [data: BookingFormData & { guestEmail: string }]
}>()

const authStore = useAuthStore()

// Form data
const formData = ref<BookingFormData>({
  guestName: authStore.userName || '',
  checkIn: '',
  checkOut: '',
})

// Form validation
const errors = ref<FormErrors>({})

// Computed properties
const minDate = computed(() => {
  const today = new Date()
  return today.toISOString().split('T')[0]
})

const minCheckOutDate = computed(() => {
  if (formData.value.checkIn) {
    const checkInDate = new Date(formData.value.checkIn)
    checkInDate.setDate(checkInDate.getDate() + 1)
    return checkInDate.toISOString().split('T')[0]
  }
  return minDate.value
})

const isValidDateRange = computed(() => {
  return formData.value.checkIn && 
         formData.value.checkOut && 
         new Date(formData.value.checkOut) > new Date(formData.value.checkIn)
})

const nights = computed(() => {
  if (!isValidDateRange.value) return 0
  return calculateNights(formData.value.checkIn, formData.value.checkOut)
})

const totalPrice = computed(() => {
  return nights.value * props.property.pricePerNight
})

const isFormValid = computed(() => {
  return formData.value.guestName.trim() &&
         formData.value.checkIn &&
         formData.value.checkOut &&
         isValidDateRange.value &&
         Object.keys(errors.value).length === 0
})

// Validation
const validateForm = (): boolean => {
  const newErrors: FormErrors = {}

  // Validate guest name
  const nameError = validateRequired(formData.value.guestName, 'Guest name')
  if (nameError) newErrors.guestName = nameError

  // Validate dates
  const dateErrors = validateBookingDates(formData.value.checkIn, formData.value.checkOut)
  Object.assign(newErrors, dateErrors)

  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

// Watch for form changes to clear errors
watch(formData, () => {
  // Clear errors when user starts typing
  if (errors.value.guestName && formData.value.guestName.trim()) {
    delete errors.value.guestName
  }
  if (errors.value.checkIn && formData.value.checkIn) {
    delete errors.value.checkIn
  }
  if (errors.value.checkOut && formData.value.checkOut) {
    delete errors.value.checkOut
  }
}, { deep: true })

// Form submission
const handleSubmit = () => {
  if (validateForm()) {
    emit('submit', {
      ...formData.value,
      guestEmail: authStore.userEmail,
    })
  }
}
</script>
