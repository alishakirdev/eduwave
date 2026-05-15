'use client'
import { Card, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Tabs } from '@/components/ui/Tabs'
import { useState } from 'react'
import { Save, Bell, Shield, Palette, School, Sun, Moon, Monitor, Check } from 'lucide-react'
import { useTheme } from '@/components/ThemeProvider'
import { useSettings } from '@/components/SettingsProvider'

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const { settings, updateSettings } = useSettings()
  const [activeTab, setActiveTab] = useState('general')

  const tabs = [
    { id: 'general', label: 'عام', icon: <School className="w-4 h-4" /> },
    { id: 'notifications', label: 'الإشعارات', icon: <Bell className="w-4 h-4" /> },
    { id: 'security', label: 'الأمان', icon: <Shield className="w-4 h-4" /> },
    { id: 'appearance', label: 'المظهر', icon: <Palette className="w-4 h-4" /> },
  ]

  return (
    <>
      <div className="space-y-1">
        <h1 className="text-h1 text-gray-900 dark:text-gray-100">الإعدادات</h1>
        <p className="text-small text-gray-500 dark:text-gray-400">إعدادات المنصة والتفضيلات</p>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === 'general' && (
        <Card>
          <CardHeader>
            <CardTitle>معلومات المدرسة</CardTitle>
          </CardHeader>
          <div className="space-y-4 max-w-lg">
            <Input label="اسم المدرسة" defaultValue="مدرسة EduWave" />
            <Input label="البريد الإلكتروني" defaultValue="info@eduwave.com" />
            <Input label="رقم الهاتف" defaultValue="+964 123 456 789" />
            <Input label="العنوان" defaultValue="العراق - بغداد" />
            <Button><Save className="w-4 h-4" /> حفظ التغييرات</Button>
          </div>
        </Card>
      )}

      {activeTab === 'notifications' && (
        <Card>
          <CardHeader>
            <CardTitle>إعدادات الإشعارات</CardTitle>
          </CardHeader>
          <div className="space-y-4 max-w-lg">
            {[
              { key: 'grades' as const, label: 'إشعارات الدرجات الجديدة', desc: 'عند إضافة درجة جديدة للطالب' },
              { key: 'attendance' as const, label: 'إشعارات الحضور', desc: 'عند تسجيل غياب أو حضور' },
              { key: 'assignments' as const, label: 'إشعارات الواجبات', desc: 'عند إضافة واجب جديد' },
              { key: 'messages' as const, label: 'إشعارات الرسائل', desc: 'عند استلام رسالة جديدة' },
            ].map(item => (
              <div key={item.key} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-subcard">
                <div>
                  <p className="text-small font-medium text-gray-900 dark:text-gray-200">{item.label}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={settings.notifications[item.key]} onChange={e => updateSettings({ notifications: { ...settings.notifications, [item.key]: e.target.checked } })} />
                  <div className="w-9 h-5 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary-600" />
                </label>
              </div>
            ))}
          </div>
        </Card>
      )}

      {activeTab === 'security' && (
        <Card>
          <CardHeader>
            <CardTitle>الأمان وكلمة المرور</CardTitle>
          </CardHeader>
          <div className="space-y-4 max-w-lg">
            <Input label="كلمة المرور الحالية" type="password" />
            <Input label="كلمة المرور الجديدة" type="password" />
            <Input label="تأكيد كلمة المرور" type="password" />
            <Button><Save className="w-4 h-4" /> تغيير كلمة المرور</Button>
          </div>
        </Card>
      )}

      {activeTab === 'appearance' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>السمة</CardTitle>
            </CardHeader>
            <div className="flex gap-4">
              {([
                { id: 'light', label: 'فاتح', icon: <Sun className="w-5 h-5" /> },
                { id: 'dark', label: 'داكن', icon: <Moon className="w-5 h-5" /> },
                { id: 'system', label: 'النظام', icon: <Monitor className="w-5 h-5" /> },
              ] as { id: 'light' | 'dark' | 'system'; label: string; icon: React.ReactNode }[]).map(t => (
                <button key={t.id} onClick={() => setTheme(t.id)} className={`flex-1 p-4 rounded-subcard border-2 transition-all text-center space-y-2 ${theme === t.id ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-gray-200 dark:border-gray-600 hover:border-primary-300'}`}>
                  <div className={`flex justify-center ${theme === t.id ? 'text-primary-600' : 'text-gray-600 dark:text-gray-400'}`}>{t.icon}</div>
                  <p className={`text-small font-medium ${theme === t.id ? 'text-primary-700 dark:text-primary-400' : 'text-gray-900 dark:text-gray-200'}`}>{t.label}</p>
                </button>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>الألوان</CardTitle>
            </CardHeader>
            <div className="space-y-4">
              <div>
                <p className="text-small font-medium text-gray-700 dark:text-gray-300 mb-3">اللون الأساسي</p>
                <div className="flex gap-3">
                  {[
                    { color: '#4f46e5', name: 'نيلي' },
                    { color: '#14b8a6', name: 'فيروزي' },
                    { color: '#f59e0b', name: 'عنبر' },
                    { color: '#f43f5e', name: 'وردي' },
                    { color: '#10b981', name: 'أخضر' },
                    { color: '#8b5cf6', name: 'بنفسجي' },
                  ].map((c, i) => (
                    <button key={i} onClick={() => updateSettings({ primaryColor: c.color })} className="group relative w-10 h-10 rounded-full transition-transform hover:scale-110" style={{ backgroundColor: c.color }}>
                      {settings.primaryColor === c.color && <Check className="w-5 h-5 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />}
                      <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-gray-400 dark:text-gray-500 opacity-0 group-hover:opacity-100 whitespace-nowrap">{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-small font-medium text-gray-700 dark:text-gray-300 mb-3">لون التمييز</p>
                <div className="flex gap-3">
                  {[
                    { color: '#14b8a6', name: 'فيروزي' },
                    { color: '#f59e0b', name: 'عنبر' },
                    { color: '#6366f1', name: 'نيلي' },
                    { color: '#ec4899', name: 'زهري' },
                  ].map((c, i) => (
                    <button key={i} onClick={() => updateSettings({ accentColor: c.color })} className="group relative w-10 h-10 rounded-full transition-transform hover:scale-110" style={{ backgroundColor: c.color }}>
                      {settings.accentColor === c.color && <Check className="w-5 h-5 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />}
                      <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-gray-400 dark:text-gray-500 opacity-0 group-hover:opacity-100 whitespace-nowrap">{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>الطباعة</CardTitle>
            </CardHeader>
            <div className="space-y-4 max-w-lg">
              <div className="space-y-1.5">
                <label className="block text-small font-medium text-gray-700 dark:text-gray-300">حجم الخط العام</label>
                <div className="flex gap-2">
                  {[
                    { size: '14px', label: 'صغير', desc: 'أ', className: 'text-sm' },
                    { size: '16px', label: 'متوسط', desc: 'أ', className: 'text-body' },
                    { size: '18px', label: 'كبير', desc: 'أ', className: 'text-lg' },
                    { size: '20px', label: 'كبير جداً', desc: 'أ', className: 'text-xl' },
                  ].map((f, i) => (
                    <button key={i} onClick={() => updateSettings({ fontSize: f.size })} className={`flex-1 p-3 rounded-subcard border-2 transition-all text-center ${settings.fontSize === f.size ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-gray-200 dark:border-gray-600 hover:border-primary-300'} ${f.className}`}>
                      <p className={`font-medium ${settings.fontSize === f.size ? 'text-primary-700 dark:text-primary-400' : 'text-gray-900 dark:text-gray-200'}`}>{f.desc}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{f.label}</p>
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="block text-small font-medium text-gray-700 dark:text-gray-300">ارتفاع السطر: {settings.lineHeight}</label>
                <input type="range" min="1" max="2" step="0.1" value={settings.lineHeight} onChange={e => updateSettings({ lineHeight: Number(e.target.value) })} className="w-full accent-primary-600" />
                <div className="flex justify-between text-xs text-gray-400"><span>ضيق</span><span>واسع</span></div>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>الزوايا والظلال</CardTitle>
            </CardHeader>
            <div className="space-y-4 max-w-lg">
              <div className="space-y-1.5">
                <label className="block text-small font-medium text-gray-700 dark:text-gray-300">استدارة الزوايا: {settings.borderRadius}</label>
                <div className="flex gap-2">
                  {[
                    { value: '8px', label: 'خفيفة' },
                    { value: '12px', label: 'متوسطة' },
                    { value: '16px', label: 'كبيرة' },
                    { value: '24px', label: 'منحنية' },
                  ].map((r, i) => (
                    <button key={i} onClick={() => updateSettings({ borderRadius: r.value })} className={`flex-1 p-3 rounded-subcard border-2 transition-all text-center ${settings.borderRadius === r.value ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-gray-200 dark:border-gray-600 hover:border-primary-300'}`}>
                      <div className="w-8 h-8 mx-auto mb-1" style={{ borderRadius: r.value, backgroundColor: 'var(--primary)' }} />
                      <p className={`text-xs ${settings.borderRadius === r.value ? 'text-primary-700 dark:text-primary-400 font-medium' : 'text-gray-600 dark:text-gray-400'}`}>{r.label}</p>
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="block text-small font-medium text-gray-700 dark:text-gray-300">شدة الظل: {settings.shadowIntensity}px</label>
                <input type="range" min="0" max="20" value={settings.shadowIntensity} onChange={e => updateSettings({ shadowIntensity: Number(e.target.value) })} className="w-full accent-primary-600" />
                <div className="flex justify-between text-xs text-gray-400"><span>بدون ظل</span><span>ظل كثيف</span></div>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>الرسوم المتحركة</CardTitle>
            </CardHeader>
            <div className="space-y-4 max-w-lg">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-subcard">
                <div>
                  <p className="text-small font-medium text-gray-900 dark:text-gray-200">حركات الانتقال</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">تأثيرات الحركة عند التنقل</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={settings.animations} onChange={e => updateSettings({ animations: e.target.checked })} />
                  <div className="w-9 h-5 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary-600" />
                </label>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-subcard">
                <div>
                  <p className="text-small font-medium text-gray-900 dark:text-gray-200">تقليل الحركة</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">لمن يفضلون الحركات البسيطة</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={settings.reduceMotion} onChange={e => updateSettings({ reduceMotion: e.target.checked })} />
                  <div className="w-9 h-5 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary-600" />
                </label>
              </div>
              <div className="space-y-1.5">
                <label className="block text-small font-medium text-gray-700 dark:text-gray-300">سرعة الحركة: {settings.animationSpeed}ms</label>
                <input type="range" min="100" max="500" step="50" value={settings.animationSpeed} onChange={e => updateSettings({ animationSpeed: Number(e.target.value) })} className="w-full accent-primary-600" />
                <div className="flex justify-between text-xs text-gray-400"><span>سريع</span><span>بطيء</span></div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  )
}
