export type UserRole = 'guest' | 'admin'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
}


// User authentication types
export interface LoginRequest {
  email: string
}

