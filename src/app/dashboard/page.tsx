'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser, getRedirectPath } from '@/store/auth'

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    const user = getCurrentUser()
    if (user) {
      router.push(getRedirectPath(user.role))
    } else {
      router.push('/login')
    }
  }, [router])

  return null
}
