'use client'
import { Card } from './Card'
import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown, LucideIcon } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  change?: number
  changeLabel?: string
  color?: string
  className?: string
}

export function StatCard({ title, value, icon: Icon, change, changeLabel, color = 'text-primary-600', className }: StatCardProps) {
  const isPositive = change && change > 0

  return (
    <Card className={cn('animate-fade-in', className)} hover>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-small text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
          {change !== undefined && (
            <div className="flex items-center gap-1.5">
              <span className={cn(
                'flex items-center text-xs font-medium',
                isPositive ? 'text-green-600' : 'text-red-500'
              )}>
                {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                {Math.abs(change)}%
              </span>
              {changeLabel && <span className="text-xs text-gray-400">{changeLabel}</span>}
            </div>
          )}
        </div>
        <div className={cn('p-3 rounded-subcard bg-opacity-10', color.replace('text', 'bg'), color.replace('text', 'text'))}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </Card>
  )
}
