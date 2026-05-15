'use client'
import { StatCard } from '@/components/ui/StatCard'
import { Card, CardHeader, CardTitle } from '@/components/ui/Card'
import { LineChart } from '@/components/charts/LineChart'
import { BarChart } from '@/components/charts/BarChart'
import { getDashboardStats } from '@/lib/data'
import { Users, GraduationCap, Building2, TrendingUp, Bell, Calendar } from 'lucide-react'

const performanceData = [
  { name: 'سبتمبر', value: 82 }, { name: 'أكتوبر', value: 85 }, { name: 'نوفمبر', value: 83 },
  { name: 'ديسمبر', value: 88 }, { name: 'يناير', value: 86 }, { name: 'فبراير', value: 90 },
  { name: 'مارس', value: 92 },
]

const subjectData = [
  { name: 'الرياضيات', value: 88, color: '#4f46e5' },
  { name: 'العلوم', value: 82, color: '#14b8a6' },
  { name: 'العربية', value: 90, color: '#f59e0b' },
  { name: 'الإنجليزية', value: 78, color: '#f43f5e' },
]

export default function AdminDashboard() {
  const stats = getDashboardStats()

  return (
    <>
      <div className="space-y-1">
        <h1 className="text-h1 text-gray-900">لوحة التحكم</h1>
        <p className="text-small text-gray-500">مرحباً بك في لوحة إدارة المدرسة</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="إجمالي الطلاب" value={stats.totalStudents} icon={GraduationCap} change={stats.studentsChange} changeLabel="عن العام الماضي" color="text-primary-600" />
        <StatCard title="إجمالي المعلمين" value={stats.totalTeachers} icon={Users} change={stats.teachersChange} changeLabel="عن العام الماضي" color="text-accent-500" />
        <StatCard title="إجمالي الفصول" value={stats.totalClassrooms} icon={Building2} change={stats.classroomsChange} changeLabel="عن العام الماضي" color="text-secondary-500" />
        <StatCard title="معدل النجاح" value={`${stats.successRate}%`} icon={TrendingUp} change={stats.successRateChange} changeLabel="عن الفصل الماضي" color="text-green-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>أداء المدرسة</CardTitle>
          </CardHeader>
          <LineChart data={performanceData} />
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>الأداء حسب المادة</CardTitle>
          </CardHeader>
          <BarChart data={subjectData} />
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>الأحداث القادمة</CardTitle>
          </CardHeader>
          <div className="space-y-4">
            {[
              { title: 'اختبار الرياضيات', date: '2025-03-15', type: 'exam' },
              { title: 'اجتماع أولياء الأمور', date: '2025-03-20', type: 'meeting' },
              { title: 'رحلة علمية', date: '2025-03-25', type: 'activity' },
            ].map((event, i) => (
              <div key={i} className="flex items-center gap-4 p-3 bg-gray-50 rounded-subcard animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="w-10 h-10 bg-primary-100 rounded-btn flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary-600" />
                </div>
                <div className="flex-1">
                  <p className="text-small font-medium text-gray-900">{event.title}</p>
                  <p className="text-xs text-gray-500">{event.date}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>آخر الأنشطة</CardTitle>
          </CardHeader>
          <div className="space-y-4">
            {[
              { action: 'إضافة طالب جديد', user: 'أحمد محمد', time: 'منذ ساعة' },
              { action: 'تحديث خطة درس', user: 'أ. خالد العلي', time: 'منذ 3 ساعات' },
              { action: 'تسجيل درجة جديدة', user: 'أ. نورة السلمي', time: 'منذ 5 ساعات' },
              { action: 'إرسال إشعار', user: 'النظام', time: 'منذ يوم' },
            ].map((activity, i) => (
              <div key={i} className="flex items-center gap-4 p-3 bg-gray-50 rounded-subcard animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="w-10 h-10 bg-accent-100 rounded-btn flex items-center justify-center">
                  <Bell className="w-5 h-5 text-accent-600" />
                </div>
                <div className="flex-1">
                  <p className="text-small font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.user} - {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  )
}
