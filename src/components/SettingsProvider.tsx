'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

interface Settings {
  primaryColor: string
  accentColor: string
  fontSize: string
  lineHeight: number
  borderRadius: string
  shadowIntensity: number
  animations: boolean
  reduceMotion: boolean
  animationSpeed: number
  notifications: { grades: boolean; attendance: boolean; assignments: boolean; messages: boolean }
}

interface SettingsContextType {
  settings: Settings
  updateSettings: (partial: Partial<Settings>) => void
}

const defaults: Settings = {
  primaryColor: '#4f46e5',
  accentColor: '#14b8a6',
  fontSize: '16px',
  lineHeight: 1.5,
  borderRadius: '16px',
  shadowIntensity: 8,
  animations: true,
  reduceMotion: false,
  animationSpeed: 200,
  notifications: { grades: true, attendance: true, assignments: true, messages: true },
}

const SettingsContext = createContext<SettingsContextType>({
  settings: defaults,
  updateSettings: () => {},
})

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(defaults)

  useEffect(() => {
    const stored = localStorage.getItem('eduwave_settings')
    if (stored) {
      try { setSettings({ ...defaults, ...JSON.parse(stored) }) } catch {}
    }
  }, [])

  const updateSettings = (partial: Partial<Settings>) => {
    setSettings(prev => {
      const next = { ...prev, ...partial }
      localStorage.setItem('eduwave_settings', JSON.stringify(next))
      return next
    })
  }

  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--primary', settings.primaryColor)
    root.style.setProperty('--accent', settings.accentColor)
    root.style.setProperty('--font-size-base', settings.fontSize)
    root.style.setProperty('--line-height', String(settings.lineHeight))
    root.style.setProperty('--radius-card', settings.borderRadius)
    root.style.setProperty('--shadow-intensity', `${settings.shadowIntensity}px`)
    root.style.setProperty('--anim-speed', `${settings.animationSpeed}ms`)
    root.classList.toggle('no-animations', !settings.animations)
    root.classList.toggle('reduce-motion', settings.reduceMotion)
  }, [settings])

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  )
}

export const useSettings = () => useContext(SettingsContext)
