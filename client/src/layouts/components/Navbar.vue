<template>
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
                <v-btn :to="toBookingsPage" variant="text" :color="$route.name === toBookingsPage ? 'primary' : 'default'"
                    class="d-none d-md-flex">
                    <v-icon start>mdi-calendar-check</v-icon>
                    My Bookings
                </v-btn>

                <!-- User Menu -->
                <v-menu>
                    <template v-slot:activator="{ props }">
                        <v-btn v-bind="props" class="d-none d-md-flex me-2" variant="text">
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
                <!-- Login Dialog Component with Trigger -->
                <LoginDialog class="d-md-flex me-2" />
            </template>

            <!-- Mobile Navigation -->
            <v-btn v-if="isAuthenticated" icon class="d-md-none" @click="drawer = !drawer">
                <v-icon>mdi-menu</v-icon>
            </v-btn>
        </v-container>
    </v-app-bar>

    <!-- Mobile Navigation Drawer -->
    <v-navigation-drawer v-model="drawer" temporary location="right">
        <!-- Top navigation items -->
        <v-list>
            <template v-if="isAuthenticated">
                <v-list-item :to="toBookingsPage" :active="$route.name === toBookingsPage" @click="drawer = false">
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
        </v-list>

        <!-- User info positioned at bottom -->
        <template v-if="isAuthenticated">
            <div class="absolute bottom-0 left-0 right-0">
                <v-divider></v-divider>
                <v-list>
                    <v-list-item variant="text">
                        <template v-slot:prepend>
                            <v-icon>mdi-account-circle</v-icon>
                        </template>
                        <v-list-item-title>{{ userName }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </div>
        </template>
    </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { paths } from '@/router'
import LoginDialog from '@/components/LoginDialog.vue'

// Store
const authStore = useAuthStore()

// Local state
const drawer = ref(false)

// Computed properties
const isAuthenticated = computed(() => authStore.isAuthenticated)
const userName = computed(() => authStore.userName)
const userEmail = computed(() => authStore.userEmail)

const toBookingsPage = computed(() => paths.home.bookings.root(userEmail.value))

// Methods
const handleLogout = async () => {
    try {
        await authStore.logout()
        drawer.value = false
        window.location.reload()
    } catch (error) {
        console.error('Logout error:', error)
    }
}
</script>
