import type { Metadata, Viewport } from 'next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/ThemeProvider'
import { SettingsProvider } from '@/components/SettingsProvider'
import './globals.css'

export const metadata: Metadata = {
  title: 'EduWave - منصة إدارة المدارس',
  description: 'منصة تعليمية متكاملة تجمع بين الإدارة الأكاديمية والتتبع الذاتي والتواصل الأسري',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'EduWave',
  },
}

export const viewport: Viewport = {
  themeColor: '#4f46e5',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-tajawal bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 antialiased transition-colors duration-200">
        <ThemeProvider><SettingsProvider>{children}</SettingsProvider></ThemeProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
