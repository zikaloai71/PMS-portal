import axios from 'axios'
import { config } from './config'

// API configuration constants
const API_CONFIG = {
  baseURL: config.api.baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
} as const

// Create and configure axios instance
export const apiClient = axios.create(API_CONFIG)


// API endpoints configuration
export const API_ENDPOINTS = {
  // User endpoints
  users: {
    getByEmail:`/users`,
    getById: (id: string) => `/users/${id}`,
  },
  
  // Property endpoints
  properties: {
    getAll: '/properties',
    getById: (id: string) => `/properties/${id}`,
    // Booking actions on properties
    bookings: {
      getAll: '/bookings',
      getById: (id: string) => `/bookings/${id}`,
      create: '/bookings',
    },
  },
  
  // Auth endpoints
  auth: {
    login: "/users",
  },
} as const