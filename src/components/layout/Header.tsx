'use client'
import { useState } from 'react'
import { Bell, Search, ChevronDown } from 'lucide-react'
import { Avatar } from '@/components/ui/Avatar'
import { getCurrentUser } from '@/store/auth'
import { cn } from '@/lib/utils'

export function Header() {
  const [showProfile, setShowProfile] = useState(false)
  const user = getCurrentUser()

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between px-6 py-3">
        <button className="lg:hidden" />

        <div className="relative flex-1 max-w-md mx-auto lg:mx-0">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="بحث..."
            className="w-full pr-10 pl-4 py-2 text-small border-2 border-gray-200 dark:border-gray-600 rounded-btn bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-700 focus:border-primary-500 transition-all duration-200 outline-none dark:text-gray-200"
          />
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-btn transition-all duration-200">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full" />
          </button>

          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2 p-1.5 rounded-btn hover:bg-gray-100 transition-all duration-200"
            >
              <Avatar name={user?.name || 'مستخدم'} size="sm" />
              <div className="hidden md:block text-right">
                <p className="text-small font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-400">{user?.email}</p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            {showProfile && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowProfile(false)} />
                <div className={cn(
                  'absolute left-0 top-full mt-2 w-64 bg-white rounded-card shadow-lg border border-gray-200 z-20 animate-fade-in'
                )}>
                  <div className="p-4 border-b border-gray-100">
                    <p className="text-body font-medium text-gray-900">{user?.name}</p>
                    <p className="text-small text-gray-500">{user?.email}</p>
                  </div>
                  <div className="p-2">
                    <button className="w-full text-right px-3 py-2 text-small text-gray-700 hover:bg-gray-50 rounded-btn transition-colors">
                      الملف الشخصي
                    </button>
                    <button className="w-full text-right px-3 py-2 text-small text-gray-700 hover:bg-gray-50 rounded-btn transition-colors">
                      الإعدادات
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
