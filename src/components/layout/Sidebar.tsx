'use client'
import { cn } from '@/lib/utils'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard, Users, BookOpen, GraduationCap, Calendar,
  MessageSquare, Settings, LogOut, ChevronLeft, UserCheck, Menu, X, School
} from 'lucide-react'
import { useState } from 'react'
import { UserRole } from '@/types'
import { logout } from '@/store/auth'

interface NavItem {
  label: string
  icon: React.ReactNode
  href: string
  roles: UserRole[]
}

const navItems: NavItem[] = [
  { label: 'لوحة التحكم', icon: <LayoutDashboard className="w-5 h-5" />, href: '/dashboard', roles: ['admin', 'teacher', 'student', 'parent'] },
  { label: 'الطلاب', icon: <GraduationCap className="w-5 h-5" />, href: '/students', roles: ['admin', 'teacher'] },
  { label: 'المعلمون', icon: <Users className="w-5 h-5" />, href: '/teachers', roles: ['admin'] },
  { label: 'أولياء الأمور', icon: <UserCheck className="w-5 h-5" />, href: '/parents', roles: ['admin', 'teacher'] },
  { label: 'خطط الدروس', icon: <BookOpen className="w-5 h-5" />, href: '/lessons', roles: ['admin', 'teacher'] },
  { label: 'الجدول الدراسي', icon: <Calendar className="w-5 h-5" />, href: '/schedule', roles: ['admin', 'teacher', 'student', 'parent'] },
  { label: 'الرسائل', icon: <MessageSquare className="w-5 h-5" />, href: '/messages', roles: ['admin', 'teacher', 'parent'] },
  { label: 'الإعدادات', icon: <Settings className="w-5 h-5" />, href: '/settings', roles: ['admin'] },
]

interface SidebarProps {
  userRole: UserRole
}

export function Sidebar({ userRole }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const filteredItems = navItems.filter(item => item.roles.includes(userRole))

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-6 py-6">
        <div className="w-10 h-10 bg-accent-500 rounded-subcard flex items-center justify-center">
          <School className="w-6 h-6 text-white" />
        </div>
        {!collapsed && (
          <div className="animate-fade-in">
            <h2 className="text-white font-bold text-body">EduWave</h2>
            <p className="text-gray-400 text-xs">منصة إدارة المدارس</p>
          </div>
        )}
      </div>

      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        {filteredItems.map(item => (
          <button
            key={item.href}
            onClick={() => { router.push(item.href); setMobileOpen(false) }}
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2.5 rounded-btn transition-all duration-200 group',
              pathname.startsWith(item.href)
                ? 'bg-primary-600/20 text-white'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            )}
          >
            <span className="flex-shrink-0">{item.icon}</span>
            {!collapsed && (
              <span className="text-small font-medium">{item.label}</span>
            )}
          </button>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-btn text-gray-400 hover:text-red-400 hover:bg-white/5 transition-all duration-200"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="text-small">تسجيل خروج</span>}
        </button>
      </div>

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="hidden lg:flex items-center justify-center py-3 border-t border-white/10 text-gray-400 hover:text-white transition-colors"
      >
        <ChevronLeft className={cn('w-5 h-5 transition-transform', collapsed && 'rotate-180')} />
      </button>
    </div>
  )

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-primary-600 text-white rounded-btn shadow-soft"
      >
        <Menu className="w-5 h-5" />
      </button>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-[#1e1b4b] shadow-sidebar">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 left-4 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            {sidebarContent}
          </div>
        </div>
      )}

      <aside className={cn(
        'hidden lg:flex flex-col h-screen bg-[#1e1b4b] shadow-sidebar transition-all duration-300',
        collapsed ? 'w-20' : 'w-64'
      )}>
        {sidebarContent}
      </aside>
    </>
  )
}
