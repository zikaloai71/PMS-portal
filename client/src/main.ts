import { createApp } from 'vue'
import App from './App.vue'
import {router} from './router'

// Import configured libraries
import { vuetify, pinia, VueQueryPlugin, queryClient } from '@/lib'

// Import global styles
import './main.css'

// Create Vue app
const app = createApp(App)

// Configure libraries
app.use(pinia)
app.use(vuetify)
app.use(VueQueryPlugin, queryClient)
app.use(router)

// Mount the app
app.mount('#app')
                     