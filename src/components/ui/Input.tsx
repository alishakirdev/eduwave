'use client'
import { forwardRef, InputHTMLAttributes, useState } from 'react'
import { cn } from '@/lib/utils'
import { Eye, EyeOff, LucideIcon } from 'lucide-react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: LucideIcon
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon: Icon, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)
    const isPassword = type === 'password'

    return (
      <div className="space-y-1.5">
        {label && (
          <label className="block text-small font-medium text-gray-700">{label}</label>
        )}
        <div className="relative">
          {Icon && (
            <Icon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          )}
          <input
            ref={ref}
            type={isPassword && showPassword ? 'text' : type}
            className={cn(
              'w-full px-4 py-2.5 text-body border-2 border-gray-200 rounded-btn',
              'bg-white text-gray-900 placeholder-gray-400',
              'transition-all duration-200',
              'focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100',
              error && 'border-danger focus:border-danger focus:ring-red-100',
              Icon && 'pr-10',
              isPassword && 'pl-10',
              className
            )}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          )}
        </div>
        {error && <p className="text-xs text-danger mt-1">{error}</p>}
      </div>
    )
  }
)
Input.displayName = 'Input'
