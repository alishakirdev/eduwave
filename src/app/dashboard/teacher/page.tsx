'use client'
import { StatCard } from '@/components/ui/StatCard'
import { Card, CardHeader, CardTitle } from '@/components/ui/Card'
import { LineChart } from '@/components/charts/LineChart'
import { BarChart } from '@/components/charts/BarChart'
import { BookOpen, Users, CheckSquare, Clock, Calendar } from 'lucide-react'

const todayClasses = [
  { subject: 'الرياضيات', class: '10-أ', time: '08:00 - 08:45' },
  { subject: 'العلوم', class: '11-ب', time: '09:00 - 09:45' },
  { subject: 'الرياضيات', class: '12-ج', time: '10:00 - 10:45' },
  { subject: 'اللغة الإنجليزية', class: '10-أ', time: '11:00 - 11:45' },
]

export default function TeacherDashboard() {
  return (
    <>
      <div className="space-y-1">
        <h1 className="text-h1 text-gray-900">لوحة التحكم</h1>
        <p className="text-small text-gray-500">مرحباً بعودتك، أ. خالد</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="حصص اليوم" value="4" icon={BookOpen} color="text-primary-600" />
        <StatCard title="الطلاب" value="45" icon={Users} change={2} changeLabel="هذا الأسبوع" color="text-accent-500" />
        <StatCard title="واجبات بانتظار التقييم" value="12" icon={CheckSquare} color="text-secondary-500" />
        <StatCard title="نسبة الحضور" value="91%" icon={Clock} change={1.5} changeLabel="هذا الأسبوع" color="text-green-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>حصص اليوم</CardTitle>
          </CardHeader>
          <div className="space-y-3">
            {todayClasses.map((cls, i) => (
              <div key={i} className="flex items-center gap-4 p-3 bg-gray-50 rounded-subcard animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="w-10 h-10 bg-primary-100 rounded-btn flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary-600" />
                </div>
                <div className="flex-1">
                  <p className="text-small font-medium text-gray-900">{cls.subject}</p>
                  <p className="text-xs text-gray-500">{cls.class} - {cls.time}</p>
                </div>
                <span className="text-xs text-gray-400">{cls.time}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>إحصائيات الحضور</CardTitle>
          </CardHeader>
          <BarChart data={[
            { name: '10-أ', value: 95, color: '#4f46e5' },
            { name: '11-ب', value: 82, color: '#14b8a6' },
            { name: '12-ج', value: 88, color: '#f59e0b' },
          ]} height={250} />
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>قريباً - مواعيد مهمة</CardTitle>
        </CardHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: 'اختبار الرياضيات', date: '15 مارس', type: 'اختبار' },
            { title: 'تسليم الدرجات', date: '20 مارس', type: 'إداري' },
            { title: 'اجتماع القسم', date: '22 مارس', type: 'اجتماع' },
          ].map((item, i) => (
            <div key={i} className="p-4 bg-gray-50 rounded-subcard animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
              <Calendar className="w-5 h-5 text-primary-600 mb-2" />
              <p className="text-small font-medium text-gray-900">{item.title}</p>
              <p className="text-xs text-gray-500">{item.date} - {item.type}</p>
            </div>
          ))}
        </div>
      </Card>
    </>
  )
}
