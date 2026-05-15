import { User, UserRole } from '@/types'

const MOCK_USERS: User[] = [
  { id: 'admin1', name: 'مدير النظام', email: 'admin@eduwave.com', role: 'admin', createdAt: '2024-01-01' },
  { id: 't1', name: 'أ. خالد العلي', email: 'khaled@school.com', role: 'teacher', createdAt: '2024-01-01' },
  { id: 'st1', name: 'أحمد محمد', email: 'ahmed@school.com', role: 'student', createdAt: '2024-01-01' },
  { id: 'p1', name: 'محمد أحمد', email: 'parent1@example.com', role: 'parent', createdAt: '2024-01-01' },
]

let currentUser: User | null = null

export function login(email: string, password: string): User | null {
  const user = MOCK_USERS.find(u => u.email === email)
  if (user && password === '123456') {
    currentUser = user
    if (typeof window !== 'undefined') {
      localStorage.setItem('eduwave_user', JSON.stringify(user))
    }
    return user
  }
  return null
}

export function logout() {
  currentUser = null
  if (typeof window !== 'undefined') {
    localStorage.removeItem('eduwave_user')
  }
}

export function getCurrentUser(): User | null {
  if (currentUser) return currentUser
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('eduwave_user')
    if (stored) {
      try {
        currentUser = JSON.parse(stored)
        return currentUser
      } catch { }
    }
  }
  return null
}

export function getRedirectPath(role: UserRole): string {
  const paths: Record<UserRole, string> = {
    admin: '/dashboard/admin',
    teacher: '/dashboard/teacher',
    student: '/dashboard/student',
    parent: '/dashboard/parent',
  }
  return paths[role]
}
