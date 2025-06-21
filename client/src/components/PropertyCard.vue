<template>
  <v-card class="mx-auto" max-width="400" elevation="2">
    <!-- Property Image -->
    <v-img
      :src="property.imageUrl"
      :alt="property.title"
      height="240"
      cover
      @error="handleImageError"
    >
      <!-- Availability Badge -->
      <v-chip
        :color="property.available ? 'success' : 'error'"
        size="small"
        class="ma-2"
        style="position: absolute; top: 0; right: 0;"
      >
        <v-icon start>{{ property.available ? 'mdi-check-circle' : 'mdi-close-circle' }}</v-icon>
        {{ property.available ? 'Available' : 'Unavailable' }}
      </v-chip>

      <!-- Property Type Badge -->
      <v-chip
        color="white"
        text-color="black"
        size="small"
        class="ma-2"
        style="position: absolute; top: 0; left: 0;"
      >
        {{ formatPropertyType(property.type) }}
      </v-chip>
    </v-img>

    <!-- Property Content -->
    <v-card-title class="pb-2">
      {{ property.title }}
    </v-card-title>

    <v-card-subtitle class="pt-0">
      <v-icon size="small" class="me-1">mdi-map-marker</v-icon>
      {{ property.location }}
    </v-card-subtitle>

    <v-card-text class="py-2">
      <p class="text-body-2 text-medium-emphasis">
        {{ property.description }}
      </p>
    </v-card-text>

    <!-- Price and Action -->
    <v-card-actions class="px-4 pb-4">
      <v-row align="center" no-gutters>
        <v-col>
          <div class="text-h6 font-weight-bold text-primary">
            {{ formatCurrency(property.pricePerNight) }}
            <span class="text-body-2 text-medium-emphasis">/night</span>
          </div>
        </v-col>
        <v-col cols="auto">
          <v-btn
            @click="handleBookNow"
            :disabled="!property.available"
            color="primary"
            variant="elevated"
            size="default"
          >
            <v-icon start>{{ property.available ? 'mdi-calendar-plus' : 'mdi-cancel' }}</v-icon>
            {{ property.available ? 'Book Now' : 'Unavailable' }}
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import type { Property } from '@/types'
import { formatCurrency, formatPropertyType, getImageFallback } from '@/utils'

interface Props {
  property: Property
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'book-now': [property: Property]
}>()

const handleBookNow = () => {
  if (props.property.available) {
    emit('book-now', props.property)
  }
}

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = getImageFallback(props.property.type)
}
</script>
