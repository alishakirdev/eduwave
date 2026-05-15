import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatPercentage(value: number) {
  return `${value.toFixed(1)}%`
}

export function getGradeColor(grade: number, max: number = 100) {
  const pct = (grade / max) * 100
  if (pct >= 90) return 'text-green-600'
  if (pct >= 75) return 'text-accent-500'
  if (pct >= 60) return 'text-secondary-500'
  return 'text-danger'
}

export function getAttendanceColor(rate: number) {
  if (rate >= 90) return 'text-green-600'
  if (rate >= 75) return 'text-secondary-500'
  return 'text-danger'
}

export function getStatusColor(status: string) {
  const map: Record<string, string> = {
    active: 'bg-green-100 text-green-700',
    graduated: 'bg-blue-100 text-blue-700',
    suspended: 'bg-red-100 text-red-700',
    present: 'bg-green-100 text-green-700',
    absent: 'bg-red-100 text-red-700',
    late: 'bg-secondary-100 text-secondary-700',
    excused: 'bg-gray-100 text-gray-700',
    draft: 'bg-gray-100 text-gray-600',
    scheduled: 'bg-accent-100 text-accent-700',
    completed: 'bg-green-100 text-green-700',
  }
  return map[status] || 'bg-gray-100 text-gray-600'
}
