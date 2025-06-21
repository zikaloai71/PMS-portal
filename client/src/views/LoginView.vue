<template>
  <v-app>
    <v-main>
      <v-container fluid fill-height>
        <v-row justify="center" align="center">
          <v-col cols="12" sm="8" md="6" lg="4">
            <v-card elevation="8" class="mx-auto">
              <!-- Logo/Brand Header -->
              <v-card-title class="text-center py-6">
                <v-col cols="12">
                  <div class="d-flex align-center justify-center mb-4">
                    <v-icon size="48" color="primary" class="me-3">mdi-hotel</v-icon>
                    <div>
                      <div class="text-h4 font-weight-bold text-primary">PMS Guest Portal</div>
                      <div class="text-subtitle-1 text-medium-emphasis">Welcome back! Please enter your email to continue.</div>
                    </div>
                  </div>
                </v-col>
              </v-card-title>

              <v-card-text class="px-6 pb-6">
                <!-- Login Form -->
                <v-form @submit.prevent="handleLogin">
                  <v-text-field
                    v-model="email"
                    label="Email Address"
                    type="email"
                    variant="outlined"
                    density="comfortable"
                    :error-messages="hasError ? errorMessage : []"
                    :loading="isLoading"
                    :disabled="isLoading"
                    prepend-inner-icon="mdi-email"
                    placeholder="Enter your email"
                    autocomplete="email"
                    required
                    class="mb-4"
                  ></v-text-field>

                  <v-btn
                    type="submit"
                    color="primary"
                    size="large"
                    block
                    :disabled="isLoading || !isEmailValid"
                    :loading="isLoading"
                    variant="elevated"
                  >
                    <v-icon start>mdi-login</v-icon>
                    Sign In
                  </v-btn>
                </v-form>

                <!-- Demo Accounts -->
                <v-divider class="my-6">
                  <span class="text-caption text-medium-emphasis px-4">Demo Accounts</span>
                </v-divider>

                <div class="d-flex flex-column ga-2">
                  <v-card
                    v-for="demoAccount in demoAccounts"
                    :key="demoAccount.email"
                    variant="outlined"
                    :disabled="isLoading"
                    class="cursor-pointer"
                    @click="loginWithDemo(demoAccount.email)"
                    hover
                  >
                    <v-card-text class="py-3">
                      <v-row align="center" no-gutters>
                        <v-col>
                          <div class="font-weight-medium">{{ demoAccount.name }}</div>
                          <div class="text-caption text-medium-emphasis">{{ demoAccount.email }}</div>
                        </v-col>
                        <v-col cols="auto">
                          <v-icon>mdi-chevron-right</v-icon>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useLoginMutation } from '@/composables/useApi'
import { validateEmail } from '@/utils'
import { paths } from '@/router/paths'

const router = useRouter()
const loginMutation = useLoginMutation()

// Form state
const email = ref('')
const hasError = ref(false)
const errorMessage = ref('')

// Demo accounts
const demoAccounts = [
  {
    name: 'Zain Nasser',
    email: 'guest123@example.com',
  },
  {
    name: 'Kareem Khalid',
    email: 'guest456@example.com',
  },
]

// Computed properties
const isEmailValid = computed(() => {
  return email.value.trim() && validateEmail(email.value)
})

const isLoading = computed(() => loginMutation.isPending.value)

// Methods
const handleLogin = async () => {
  if (!isEmailValid.value) return

  try {
    hasError.value = false
    errorMessage.value = ''

    await loginMutation.mutateAsync(email.value.trim())
    
    // Redirect to properties page
    await router.push(paths.home.properties.root)
  } catch (error) {
    hasError.value = true
    errorMessage.value = error instanceof Error 
      ? error.message 
      : 'Login failed. Please check your email and try again.'
  }
}

const loginWithDemo = async (demoEmail: string) => {
  email.value = demoEmail
  await handleLogin()
}
</script>
