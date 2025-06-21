<template>
  <v-dialog
    :model-value="isOpen"
    @update:model-value="$emit('close')"
    max-width="500"
    persistent
  >
    <v-card>
      <!-- Header -->
      <v-card-title class="d-flex align-center justify-space-between pa-6">
        <div class="d-flex align-center">
          <v-icon class="me-2" color="primary">mdi-hotel</v-icon>
          <span class="text-h5">Welcome to PMS Guest Portal</span>
        </div>
        <v-btn
          icon
          variant="text"
          @click="$emit('close')"
          :disabled="isLoading"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-divider></v-divider>

      <!-- Content -->
      <v-card-text class="pa-6">
        <p class="mb-6 text-center text-body-1 text-medium-emphasis">
          Please enter your email to continue with your booking or access your reservations.
        </p>

        <!-- Login Form -->
        <v-form @submit.prevent="handleLogin">
          <v-text-field
            v-model="email"
            label="Email Address"
            type="email"
            variant="outlined"
            density="comfortable"
            :error-messages="hasError ? [errorMessage] : []"
            :disabled="isLoading"
            prepend-inner-icon="mdi-email"
            autocomplete="email"
            required
            autofocus
          ></v-text-field>

          <v-btn
            type="submit"
            color="primary"
            variant="elevated"
            size="large"
            block
            :disabled="isLoading || !isEmailValid"
            :loading="isLoading"
            class="mt-4"
          >
            Sign In
          </v-btn>
        </v-form>

        <!-- Demo Accounts -->
        <div class="mt-8">
          <v-divider class="mb-4">
            <span class="px-3 text-medium-emphasis">Demo Accounts</span>
          </v-divider>

          <div class="gap-2 d-flex flex-column">
            <v-card
              v-for="demoAccount in demoAccounts"
              :key="demoAccount.email"
              variant="outlined"
              :disabled="isLoading"
              class="cursor-pointer"
              hover
              @click="loginWithDemo(demoAccount.email)"
            >
              <v-card-text class="d-flex align-center justify-space-between pa-3">
                <div>
                  <div class="font-weight-medium">{{ demoAccount.name }}</div>
                  <div class="text-caption text-medium-emphasis">{{ demoAccount.email }}</div>
                </div>
                <v-icon color="medium-emphasis">mdi-chevron-right</v-icon>
              </v-card-text>
            </v-card>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useLoginMutation } from '@/composables'
import { validateEmail } from '@/utils'
import { paths } from '@/router/paths'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  'close': []
  'success': []
}>()

const router = useRouter()
const loginMutation = useLoginMutation()

// Form state
const email = ref('')
const hasError = ref(false)
const errorMessage = ref('')

// Demo accounts
const demoAccounts = [
  { name: 'Zain Nasser', email: 'guest123@example.com' },
  { name: 'Kareem Khalid', email: 'guest456@example.com' },
  { name: 'Omar Ammar', email: 'admin123@example.com' },
]

// Computed
const isLoading = computed(() => loginMutation.isPending.value)
const isEmailValid = computed(() => email.value && validateEmail(email.value))

// Methods
const handleLogin = async () => {
  if (!isEmailValid.value) return

  try {
    clearError()
    await loginMutation.mutateAsync(email.value)
    
    // Check for redirect after login
    const redirectPath = localStorage.getItem('pms_redirect_after_login')
    if (redirectPath) {
      localStorage.removeItem('pms_redirect_after_login')
      await router.push(redirectPath)
    } else {
      // Default redirect to properties page
      await router.push(paths.home.properties.root)
    }
    
    emit('success')
    emit('close')
  } catch (error: any) {
    setError(error.message || 'Login failed. Please check your email.')
  }
}

const loginWithDemo = async (demoEmail: string) => {
  email.value = demoEmail
  await handleLogin()
}

const setError = (message: string) => {
  hasError.value = true
  errorMessage.value = message
}

const clearError = () => {
  hasError.value = false
  errorMessage.value = ''
}

// Clear error when email changes
const clearErrorOnChange = () => {
  if (hasError.value) {
    clearError()
  }
}

// Watch for email changes
import { watch } from 'vue'
watch(email, clearErrorOnChange)
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
