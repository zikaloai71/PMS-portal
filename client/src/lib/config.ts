// Environment configuration
export const config = {
  api: {
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000',
  },
  app: {
    name: import.meta.env.VITE_APP_NAME || 'PMS Guest Portal',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
    environment: import.meta.env.MODE || 'development',
  },
} as const

export default config
