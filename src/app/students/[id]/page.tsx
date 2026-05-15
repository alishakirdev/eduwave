'use client'
import { useRouter } from 'next/navigation'
import { Card, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { LineChart } from '@/components/charts/LineChart'
import { BarChart } from '@/components/charts/BarChart'
import { mockStudents, mockSubjects, mockGrades, mockAttendance, mockClassrooms } from '@/lib/data'
import { ArrowRight, Mail, Phone, Calendar, Award, TrendingUp } from 'lucide-react'

export default function StudentDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const student = mockStudents.find(s => s.id === params.id)
  if (!student) return <div className="p-8 text-center text-gray-500">الطالب غير موجود</div>

  const grades = mockGrades.filter(g => g.studentId === student.id)
  const attendance = mockAttendance.filter(a => a.studentId === student.id)

  const subjectPerformance = student.subjects.map(sid => {
    const subject = mockSubjects.find(s => s.id === sid)
    const subjectGrades = grades.filter(g => g.subjectId === sid)
    const avg = subjectGrades.length > 0
      ? (subjectGrades.reduce((sum, g) => sum + (g.value / g.maxValue) * 100, 0) / subjectGrades.length)
      : 0
    return { name: subject?.name || sid, value: Math.round(avg), color: subject?.color || '#4f46e5' }
  })

  const progressData = [
    { name: 'سبتمبر', value: 82 }, { name: 'أكتوبر', value: 85 }, { name: 'نوفمبر', value: 83 },
    { name: 'ديسمبر', value: 88 }, { name: 'يناير', value: 86 }, { name: 'فبراير', value: 90 },
  ]

  return (
    <>
      <Button variant="ghost" onClick={() => router.back()} className="mb-4">
        <ArrowRight className="w-4 h-4" />
        عودة
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <div className="text-center space-y-4">
            <Avatar name={student.name} size="lg" className="mx-auto" />
            <div>
              <h2 className="text-h2 text-gray-900">{student.name}</h2>
              <p className="text-small text-gray-500">{student.email}</p>
            </div>
            <Badge variant={student.status === 'active' ? 'success' : student.status === 'graduated' ? 'info' : 'danger'}>
              {student.status === 'active' ? 'نشط' : student.status === 'graduated' ? 'خريج' : 'موقوف'}
            </Badge>
          </div>

          <div className="space-y-3 mt-6 pt-6 border-t border-gray-100">
            <div className="flex items-center gap-3 text-small text-gray-600">
              <Mail className="w-4 h-4" /> {student.email}
            </div>
            <div className="flex items-center gap-3 text-small text-gray-600">
              <Phone className="w-4 h-4" /> {student.phone || 'غير متوفر'}
            </div>
            <div className="flex items-center gap-3 text-small text-gray-600">
              <Calendar className="w-4 h-4" /> الصف {student.grade} - شعبة {student.section}
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100">
            <h3 className="text-h3 text-gray-900 mb-3">المواد الدراسية</h3>
            <div className="space-y-2">
              {student.subjects.map(sid => {
                const subject = mockSubjects.find(s => s.id === sid)
                return (
                  <div key={sid} className="flex items-center gap-2 text-small text-gray-700">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: subject?.color }} />
                    {subject?.name}
                  </div>
                )
              })}
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-primary-50 rounded-subcard text-center">
              <Award className="w-6 h-6 text-primary-600 mx-auto mb-2" />
              <p className="text-h2 text-primary-600">{student.gpa}%</p>
              <p className="text-xs text-gray-500">المعدل التراكمي</p>
            </div>
            <div className="p-4 bg-green-50 rounded-subcard text-center">
              <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <p className="text-h2 text-green-600">{student.attendanceRate}%</p>
              <p className="text-xs text-gray-500">نسبة الحضور</p>
            </div>
            <div className="p-4 bg-secondary-50 rounded-subcard text-center">
              <Award className="w-6 h-6 text-secondary-600 mx-auto mb-2" />
              <p className="text-h2 text-secondary-600">{grades.length}</p>
              <p className="text-xs text-gray-500">عدد التقييمات</p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>الأداء حسب المادة</CardTitle>
            </CardHeader>
            <BarChart data={subjectPerformance} height={250} />
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>تطور الأداء</CardTitle>
            </CardHeader>
            <LineChart data={progressData} />
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>سجل الحضور</CardTitle>
            </CardHeader>
            <div className="space-y-2">
              {attendance.length === 0 && (
                <p className="text-small text-gray-400 text-center py-4">لا توجد سجلات حضور</p>
              )}
              {attendance.map((a, i) => (
                <div key={a.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-subcard animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-small text-gray-700">{a.date}</span>
                  </div>
                  <Badge variant={a.status === 'present' ? 'success' : a.status === 'late' ? 'warning' : a.status === 'excused' ? 'info' : 'danger'}>
                    {a.status === 'present' ? 'حاضر' : a.status === 'absent' ? 'غائب' : a.status === 'late' ? 'متأخر' : 'معذور'}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}
