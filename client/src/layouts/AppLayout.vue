<template>
  <v-app>
    <!-- Navigation -->
    <Navbar />

    <!-- Main Content -->
    <v-main>
      <v-container fluid class="pa-6">
        <slot />
      </v-container>
    </v-main>

    <!-- Footer -->
    <Footer />

    <!-- Global Notifications -->
    <GlobalNotifications />
  </v-app>
</template>

<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import GlobalNotifications from '@/components/GlobalNotifications.vue'
</script>
