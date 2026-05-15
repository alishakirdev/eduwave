'use client'
import { StatCard } from '@/components/ui/StatCard'
import { Card, CardHeader, CardTitle } from '@/components/ui/Card'
import { LineChart } from '@/components/charts/LineChart'
import { BarChart } from '@/components/charts/BarChart'
import { BookOpen, FileText, TrendingUp, Clock, AlertCircle } from 'lucide-react'

const gradeData = [
  { name: 'الرياضيات', value: 88 }, { name: 'العلوم', value: 92 },
  { name: 'العربية', value: 85 }, { name: 'الإنجليزية', value: 78 },
]

const weeklySchedule = [
  { day: 'الأحد', classes: ['الرياضيات', 'العلوم', 'اللغة العربية'] },
  { day: 'الإثنين', classes: ['اللغة الإنجليزية', 'الرياضيات', 'التربية البدنية'] },
  { day: 'الثلاثاء', classes: ['العلوم', 'اللغة العربية', 'الرياضيات'] },
  { day: 'الأربعاء', classes: ['اللغة الإنجليزية', 'العلوم', 'التربية الفنية'] },
  { day: 'الخميس', classes: ['الرياضيات', 'اللغة العربية', 'النشاط'] },
]

export default function StudentDashboard() {
  return (
    <>
      <div className="space-y-1">
        <h1 className="text-h1 text-gray-900">لوحة التحكم</h1>
        <p className="text-small text-gray-500">مرحباً بعودتك، أحمد</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="المعدل التراكمي" value="92.5%" icon={TrendingUp} change={2.1} changeLabel="عن الفصل الماضي" color="text-primary-600" />
        <StatCard title="نسبة الحضور" value="95%" icon={Clock} color="text-green-600" />
        <StatCard title="الواجبات القادمة" value="3" icon={FileText} color="text-secondary-500" />
        <StatCard title="مواد تحتاج متابعة" value="1" icon={AlertCircle} color="text-orange-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>أدائي حسب المادة</CardTitle>
          </CardHeader>
          <BarChart data={gradeData.map(d => ({ ...d, color: d.value >= 85 ? '#10b981' : d.value >= 70 ? '#f59e0b' : '#f43f5e' }))} />
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>تطور الدرجات</CardTitle>
          </CardHeader>
          <LineChart data={[
            { name: 'سبتمبر', value: 82 }, { name: 'أكتوبر', value: 85 }, { name: 'نوفمبر', value: 88 },
            { name: 'ديسمبر', value: 87 }, { name: 'يناير', value: 90 }, { name: 'فبراير', value: 92 },
          ]} color="#14b8a6" />
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>الجدول الأسبوعي</CardTitle>
        </CardHeader>
        <div className="grid grid-cols-5 gap-3">
          {weeklySchedule.map((day, i) => (
            <div key={i} className="p-3 bg-gray-50 rounded-subcard animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
              <p className="text-xs font-bold text-primary-600 mb-2">{day.day}</p>
              <div className="space-y-1.5">
                {day.classes.map((cls, j) => (
                  <div key={j} className="text-xs text-gray-700 bg-white rounded-btn px-2 py-1">
                    {cls}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>الواجبات القريبة</CardTitle>
        </CardHeader>
        <div className="space-y-3">
          {[
            { subject: 'الرياضيات', title: 'تمارين المعادلات', due: '2025-03-10', status: 'قيد التسليم' },
            { subject: 'العلوم', title: 'تقرير التجربة', due: '2025-03-12', status: 'لم يبدأ' },
            { subject: 'اللغة العربية', title: 'تحليل النص', due: '2025-03-15', status: 'قيد التسليم' },
          ].map((hw, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-subcard animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-primary-600" />
                <div>
                  <p className="text-small font-medium text-gray-900">{hw.title}</p>
                  <p className="text-xs text-gray-500">{hw.subject} - تسليم: {hw.due}</p>
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                hw.status === 'قيد التسليم' ? 'bg-secondary-100 text-secondary-700' : 'bg-gray-100 text-gray-600'
              }`}>
                {hw.status}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </>
  )
}
