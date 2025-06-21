<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="text-center">
        <div class="text-6xl mb-4">🏨</div>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">
          Page Not Found
        </h1>
        <p class="text-gray-600 mb-8">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div class="space-y-3">
          <router-link
            :to="paths.home.properties.root"
            class="btn-primary inline-flex items-center"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
            </svg>
            Go to Properties
          </router-link>
          <div class="text-center">
            <button
              @click="$router.go(-1)"
              class="text-primary-600 hover:text-primary-700 font-medium"
            >
              ← Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { paths } from '@/router/paths'
</script>
