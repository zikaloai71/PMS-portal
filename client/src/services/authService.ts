import type { 
  User, 
  LoginRequest, 
} from '@/entities/user'
import { userService } from './userService'

// User API Service
export const authService = {

  async login(loginData: LoginRequest): Promise<User> {
    try {
      const user = await userService.getUserByEmail(loginData.email)
      if (!user) {
        throw new Error('User not found')
      }
      return user
    } catch (error) {
      console.error('Error during login:', error)
      throw error
    }
  },
}
