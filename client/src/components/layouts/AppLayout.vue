<template>
  <v-app>
    <!-- Navigation Header -->
    <v-app-bar :elevation="1" color="white" height="64" prominent>
      <v-container fluid class="d-flex align-center pa-0">
        <!-- Logo/Brand -->
        <v-btn :to="paths.home.properties.root" variant="text" class="text-h6 font-weight-bold text-primary">
          <v-icon start>mdi-hotel</v-icon>
          PMS Guest Portal
        </v-btn>

        <v-spacer></v-spacer>

        <!-- Navigation Links -->
    

        <template v-if="isAuthenticated">
          <v-btn 
          :to="paths.home.bookings.root(email)" 
          variant="text" :color="$route.name === paths.home.bookings.root(email) ? 'primary' : 'default'"
            class="d-none d-md-flex">
            <v-icon start>mdi-calendar-check</v-icon>
            My Bookings
          </v-btn>

          <!-- User Menu -->
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" variant="text" class="ml-2">
                <v-icon start>mdi-account-circle</v-icon>
                {{ userName }}
                <v-icon end>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="handleLogout">
                <template v-slot:prepend>
                  <v-icon>mdi-logout</v-icon>
                </template>
                <v-list-item-title>Logout</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>

        <template v-else>
          <!-- Login Button for non-authenticated users -->
          <v-btn color="primary" variant="elevated" @click="showLoginDialog = true" class="d-none d-md-flex">
            <v-icon start>mdi-login</v-icon>
            Sign In
          </v-btn>
        </template>

        <!-- Mobile Navigation -->
        <v-btn icon class="d-md-none" @click="drawer = !drawer">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </v-container>
    </v-app-bar>

    <!-- Mobile Navigation Drawer -->
    <v-navigation-drawer v-model="drawer" temporary location="right">
      <v-list>
       
        <template v-if="isAuthenticated">
          <v-list-item :to="paths.home.bookings.root(email)" :active="$route.name === paths.home.bookings.root(email)" @click="drawer = false">
            <template v-slot:prepend>
              <v-icon>mdi-calendar-check</v-icon>
            </template>
            <v-list-item-title>My Bookings</v-list-item-title>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item @click="handleLogout">
            <template v-slot:prepend>
              <v-icon>mdi-logout</v-icon>
            </template>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </template>

        <template v-else>
          <v-divider></v-divider>

          <v-list-item @click="showLoginDialog = true; drawer = false">
            <template v-slot:prepend>
              <v-icon>mdi-login</v-icon>
            </template>
            <v-list-item-title>Sign In</v-list-item-title>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <!-- Main Content -->
    <v-main>
      <v-container fluid class="pa-6">
        <slot />
      </v-container>
    </v-main>

    <!-- Footer -->
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

    <!-- Login Dialog -->
    <LoginDialog :is-open="showLoginDialog" @close="showLoginDialog = false" @success="handleLoginSuccess" />

    <!-- Global Notifications -->
    <GlobalNotifications />
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import LoginDialog from '@/components/LoginDialog.vue'
import GlobalNotifications from '@/components/GlobalNotifications.vue'
import {paths} from '@/router'

const authStore = useAuthStore()


const drawer = ref(false)
const showLoginDialog = ref(false)

const isAuthenticated = computed(() => authStore.isAuthenticated)
const userName = computed(() => authStore.userName)
const email = computed(() => authStore.userEmail)
const currentYear = computed(() => new Date().getFullYear())

const handleLogout = async () => {
  try {
    await authStore.logout()
    drawer.value = false
    window.location.reload()
  } catch (error) {
    console.error('Logout error:', error)
  }
}



// Expose method for other components to trigger login
defineExpose({
  showLogin: () => {
    showLoginDialog.value = true
  }
})
</script>
