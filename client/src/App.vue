<template>
  <div id="app">
   <AppLayout>
    <router-view />
    <GlobalNotifications />
  </AppLayout>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import GlobalNotifications from '@/components/GlobalNotifications.vue'
import AppLayout from '@/layouts/AppLayout.vue'
const authStore = useAuthStore()

// Initialize auth state from localStorage on app start
onMounted(() => {
  authStore.initializeAuth()
})
</script>

<style>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
