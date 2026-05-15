'use client'
import { StatCard } from '@/components/ui/StatCard'
import { Card, CardHeader, CardTitle } from '@/components/ui/Card'
import { BarChart } from '@/components/charts/BarChart'
import { LineChart } from '@/components/charts/LineChart'
import { Avatar } from '@/components/ui/Avatar'
import { GraduationCap, TrendingUp, Clock, Bell, AlertCircle, MessageSquare } from 'lucide-react'
import { mockStudents, mockSubjects, mockGrades } from '@/lib/data'

const parentsKids = mockStudents.filter(s => s.parentId === 'p1')

export default function ParentDashboard() {
  return (
    <>
      <div className="space-y-1">
        <h1 className="text-h1 text-gray-900">لوحة التحكم</h1>
        <p className="text-small text-gray-500">مرحباً بعودتك، محمد أحمد</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {parentsKids.map((kid, i) => {
          const kidGrades = mockGrades.filter(g => g.studentId === kid.id)
          const avg = kidGrades.length > 0
            ? (kidGrades.reduce((sum, g) => sum + (g.value / g.maxValue) * 100, 0) / kidGrades.length).toFixed(1)
            : '--'

          return (
            <Card key={kid.id} hover className="animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="flex items-center gap-4 mb-6">
                <Avatar name={kid.name} size="lg" />
                <div>
                  <h2 className="text-h2 text-gray-900">{kid.name}</h2>
                  <p className="text-small text-gray-500">{kid.grade} - شعبة {kid.section}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 bg-primary-50 rounded-subcard">
                  <p className="text-h2 text-primary-600">{avg}%</p>
                  <p className="text-xs text-gray-500">المعدل</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-subcard">
                  <p className="text-h2 text-green-600">{kid.attendanceRate}%</p>
                  <p className="text-xs text-gray-500">الحضور</p>
                </div>
                <div className="text-center p-3 bg-secondary-50 rounded-subcard">
                  <p className="text-h2 text-secondary-600">3</p>
                  <p className="text-xs text-gray-500">واجبات</p>
                </div>
              </div>

              <BarChart data={[
                { name: 'الرياضيات', value: 92, color: '#4f46e5' },
                { name: 'العلوم', value: 88, color: '#14b8a6' },
                { name: 'العربية', value: 85, color: '#f59e0b' },
                { name: 'الإنجليزية', value: 90, color: '#f43f5e' },
              ]} height={200} />
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>التنبيهات المهمة</CardTitle>
          </CardHeader>
          <div className="space-y-3">
            {[
              { level: 'high', message: 'تغيب عمر عن حصة العلوم', time: 'منذ ساعتين' },
              { level: 'medium', message: 'درجة جديدة في الرياضيات لأحمد', time: 'منذ يوم' },
              { level: 'low', message: 'موعد تسليم واجب قريب', time: 'غداً' },
            ].map((alert, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-subcard animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                <AlertCircle className={`w-5 h-5 mt-0.5 ${
                  alert.level === 'high' ? 'text-danger' : alert.level === 'medium' ? 'text-secondary-500' : 'text-primary-600'
                }`} />
                <div className="flex-1">
                  <p className="text-small text-gray-900">{alert.message}</p>
                  <p className="text-xs text-gray-500">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>المواعيد القادمة</CardTitle>
          </CardHeader>
          <div className="space-y-3">
            {[
              { title: 'اختبار رياضيات', for: 'أحمد', date: '15 مارس' },
              { title: 'اجتماع أولياء الأمور', for: 'عام', date: '20 مارس' },
              { title: 'تسليم مشروع العلوم', for: 'سارة', date: '18 مارس' },
            ].map((ev, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-subcard animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="w-10 h-10 bg-accent-100 rounded-btn flex items-center justify-center">
                  <Clock className="w-5 h-5 text-accent-600" />
                </div>
                <div className="flex-1">
                  <p className="text-small font-medium text-gray-900">{ev.title}</p>
                  <p className="text-xs text-gray-500">{ev.for} - {ev.date}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  )
}
