'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { School, Eye, EyeOff, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { login, getRedirectPath } from '@/store/auth'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const user = login(email, password)
    if (user) {
      router.push(getRedirectPath(user.role))
    } else {
      setError('البريد الإلكتروني أو كلمة المرور غير صحيحة')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-900 via-[#1e1b4b] to-primary-800 p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto">
              <School className="w-8 h-8 text-primary-600" />
            </div>
            <h1 className="text-h1 text-gray-900">EduWave</h1>
            <p className="text-small text-gray-500">منصة إدارة المدرسة الشاملة</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="البريد الإلكتروني"
              type="email"
              placeholder="admin@eduwave.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              icon={null}
              required
            />

            <Input
              label="كلمة المرور"
              type="password"
              placeholder="••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-small text-gray-600 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                تذكرني
              </label>
              <button type="button" className="text-small text-primary-600 hover:text-primary-700 font-medium">
                نسيت كلمة المرور؟
              </button>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-btn text-small text-danger text-center animate-fade-in">
                {error}
              </div>
            )}

            <Button type="submit" size="lg" className="w-full" loading={loading}>
              تسجيل الدخول
            </Button>
          </form>

          <div className="text-center text-xs text-gray-400">
            <p>حسابات تجريبية:</p>
            <p className="mt-1">admin@eduwave.com / teacher / student / parent</p>
            <p className="text-gray-300">كلمة المرور: 123456</p>
          </div>
        </div>
      </div>
    </div>
  )
}
