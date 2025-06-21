<template>
  <div class="d-flex flex-column align-center justify-center py-8">
    <!-- Spinner -->
    <v-progress-circular
      :size="60"
      :width="4"
      color="primary"
      indeterminate
    ></v-progress-circular>
    
    <!-- Message -->
    <div v-if="message" class="mt-4 text-center">
      <span class="text-body-2 text-medium-emphasis">{{ message }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  message?: string
}

defineProps<Props>()
</script>
