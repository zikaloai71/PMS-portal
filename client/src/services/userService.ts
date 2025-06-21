import { apiClient, API_ENDPOINTS } from '@/lib/axios'
import type { 
  User, 
} from '@/entities'

// User API Service
export const userService = {
  async getUserByEmail(email: string): Promise<User | null> {
    try {
      const response = await apiClient.get<User[]>(API_ENDPOINTS.users.getByEmail,{
        params: { email },
      })
      return response.data.length > 0 ? response.data[0] : null
    } catch (error) {
      console.error('Error fetching user:', error)
      throw new Error('Failed to authenticate user')
    }
  },

  async getUserById(id: string): Promise<User | null> {
    try {
      const response = await apiClient.get<User>(API_ENDPOINTS.users.getById(id))
      return response.data
    } catch (error) {
      console.error('Error fetching user:', error)
      return null
    }
  },

}
