import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { paths } from './paths'

// Lazy load components for better performance
const PropertiesView = () => import('@/views/PropertiesView.vue')
const BookingsView = () => import('@/views/BookingsView.vue')
const NotFoundView = () => import('@/views/NotFoundView.vue')

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: paths.home.properties.root
    },
    {
      path: paths.home.properties.root,
      name: 'properties',
      component: PropertiesView,
      meta: {
        title: 'Properties - PMS Guest Portal'
      }
    },
    {
      path: '/bookings/:email',
      name: 'bookings',
      component: BookingsView,
      meta: {
        requiresAuth: true,
        title: 'My Bookings - PMS Guest Portal',
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
      meta: {
        title: 'Page Not Found - PMS Guest Portal'
      }
    }
  ]
})

// Navigation guards
router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore()

  // Update page title
  if (to.meta.title) {
    document.title = to.meta.title as string
  }

  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next(paths.home.properties.root)
  }
  else if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next(paths.home.properties.root)
  }
  else {
    next()
  }
})

