<template>
  <v-footer class="justify-center bg-white border-t d-flex">
    <v-container>
      <v-row justify="center">
        <v-col cols="auto">
          <span class="text-caption text-medium-emphasis">
            &copy; {{ currentYear }} PMS Guest Portal. All rights reserved.
          </span>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Computed properties
const currentYear = computed(() => new Date().getFullYear())
</script>
