'use client'
import { useRouter } from 'next/navigation'
import { Card, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { LineChart } from '@/components/charts/LineChart'
import { BarChart } from '@/components/charts/BarChart'
import { mockSubjects, mockGrades, mockAttendance, mockClassrooms, mockParents, mockLessons } from '@/lib/data'
import { useStudents } from '@/lib/useStudentsStore'
import { ArrowRight, Mail, Phone, Calendar, Award, TrendingUp, BookOpen, UserCheck, AlertTriangle, ClipboardList } from 'lucide-react'

export default function StudentDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { getStudent } = useStudents()
  const student = getStudent(params.id)
  if (!student) return <div className="p-8 text-center text-gray-500 dark:text-gray-400">الطالب غير موجود</div>

  const grades = mockGrades.filter(g => g.studentId === student.id)
  const attendance = mockAttendance.filter(a => a.studentId === student.id)
  const parent = mockParents.find(p => p.id === student.parentId)
  const classroom = mockClassrooms.find(c => c.students.includes(student.id))
  const studentSubjects = mockSubjects.filter(s => student.subjects.includes(s.id))

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

  const presentCount = attendance.filter(a => a.status === 'present').length
  const absentCount = attendance.filter(a => a.status === 'absent').length
  const lateCount = attendance.filter(a => a.status === 'late').length
  const excusedCount = attendance.filter(a => a.status === 'excused').length

  const recentGrades = [...grades].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const gradeTypeLabels: Record<string, string> = {
    exam: 'امتحان', assignment: 'واجب', project: 'مشروع', participation: 'مشاركة',
  }

  const studentLessons = mockLessons.filter(l => l.grade === student.grade)

  return (
    <>
      <Button variant="ghost" onClick={() => router.back()} className="mb-4">
        <ArrowRight className="w-4 h-4" />
        عودة
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-6">
          <Card>
            <div className="text-center space-y-4">
              <Avatar name={student.name} size="lg" className="mx-auto" />
              <div>
                <h2 className="text-h2 text-gray-900 dark:text-gray-100">{student.name}</h2>
                <p className="text-small text-gray-500 dark:text-gray-400">{student.email}</p>
              </div>
              <Badge variant={student.status === 'active' ? 'success' : student.status === 'graduated' ? 'info' : 'danger'}>
                {student.status === 'active' ? 'نشط' : student.status === 'graduated' ? 'خريج' : 'موقوف'}
              </Badge>
            </div>

            <div className="space-y-3 mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3 text-small text-gray-600 dark:text-gray-400">
                <Mail className="w-4 h-4" /> {student.email}
              </div>
              <div className="flex items-center gap-3 text-small text-gray-600 dark:text-gray-400">
                <Phone className="w-4 h-4" /> {student.phone || 'غير متوفر'}
              </div>
              <div className="flex items-center gap-3 text-small text-gray-600 dark:text-gray-400">
                <Calendar className="w-4 h-4" /> الصف {student.grade} - شعبة {student.section}
              </div>
              <div className="flex items-center gap-3 text-small text-gray-600 dark:text-gray-400">
                <BookOpen className="w-4 h-4" /> المعرف: {student.id}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
              <h3 className="text-h3 text-gray-900 dark:text-gray-100 mb-3">المواد الدراسية</h3>
              <div className="space-y-2">
                {studentSubjects.map(subject => (
                  <div key={subject.id} className="flex items-center gap-2 text-small text-gray-700 dark:text-gray-300">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: subject.color }} />
                    {subject.name}
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {parent && (
            <Card>
              <CardHeader>
                <CardTitle>ولي الأمر</CardTitle>
              </CardHeader>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Avatar name={parent.name} size="sm" />
                  <div>
                    <p className="text-small font-medium text-gray-900 dark:text-gray-100">{parent.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{parent.email}</p>
                  </div>
                </div>
                {parent.phone && (
                  <div className="flex items-center gap-2 text-small text-gray-600 dark:text-gray-400">
                    <Phone className="w-4 h-4" /> {parent.phone}
                  </div>
                )}
                <Button variant="outline" size="sm" className="w-full" onClick={() => router.push('/parents')}>
                  عرض الملف
                </Button>
              </div>
            </Card>
          )}

          {classroom && (
            <Card>
              <CardHeader>
                <CardTitle>الفصل</CardTitle>
              </CardHeader>
              <div className="space-y-2 text-small">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">اسم الفصل</span>
                  <span className="text-gray-900 dark:text-gray-100 font-medium">{classroom.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">عدد الطلاب</span>
                  <span className="text-gray-900 dark:text-gray-100 font-medium">{classroom.students.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">عدد المواد</span>
                  <span className="text-gray-900 dark:text-gray-100 font-medium">{classroom.subjects.length}</span>
                </div>
              </div>
            </Card>
          )}
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-subcard text-center">
              <Award className="w-6 h-6 text-primary-600 mx-auto mb-2" />
              <p className="text-h2 text-primary-600">{student.gpa}%</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">المعدل التراكمي</p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-subcard text-center">
              <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
              <p className="text-h2 text-green-600 dark:text-green-400">{student.attendanceRate}%</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">نسبة الحضور</p>
            </div>
            <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-subcard text-center">
              <ClipboardList className="w-6 h-6 text-amber-600 dark:text-amber-400 mx-auto mb-2" />
              <p className="text-h2 text-amber-600 dark:text-amber-400">{grades.length}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">عدد التقييمات</p>
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
              <CardTitle>آخر التقييمات</CardTitle>
            </CardHeader>
            <div className="overflow-x-auto">
              {recentGrades.length === 0 ? (
                <p className="text-small text-gray-400 dark:text-gray-500 text-center py-4">لا توجد تقييمات</p>
              ) : (
                <table className="w-full text-right">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400">المادة</th>
                      <th className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400">النوع</th>
                      <th className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400">الدرجة</th>
                      <th className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400">النسبة</th>
                      <th className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400">التاريخ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentGrades.map((g, i) => {
                      const subject = mockSubjects.find(s => s.id === g.subjectId)
                      const pct = Math.round((g.value / g.maxValue) * 100)
                      return (
                        <tr key={g.id} className="border-b border-gray-100 dark:border-gray-700/50 animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
                          <td className="px-4 py-2.5 text-small text-gray-900 dark:text-gray-200">{subject?.name}</td>
                          <td className="px-4 py-2.5"><Badge variant={g.type === 'exam' ? 'info' : g.type === 'project' ? 'warning' : 'success'}>{gradeTypeLabels[g.type]}</Badge></td>
                          <td className="px-4 py-2.5 text-small text-gray-900 dark:text-gray-200">{g.value}/{g.maxValue}</td>
                          <td className="px-4 py-2.5">
                            <span className={`text-small font-medium ${pct >= 85 ? 'text-green-600 dark:text-green-400' : pct >= 65 ? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400'}`}>{pct}%</span>
                          </td>
                          <td className="px-4 py-2.5 text-small text-gray-500 dark:text-gray-400">{g.date}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>سجل الحضور</CardTitle>
            </CardHeader>
            <div className="grid grid-cols-4 gap-3 mb-4">
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-subcard text-center">
                <UserCheck className="w-5 h-5 text-green-600 mx-auto mb-1" />
                <p className="text-lg font-bold text-green-600 dark:text-green-400">{presentCount}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">حاضر</p>
              </div>
              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-subcard text-center">
                <AlertTriangle className="w-5 h-5 text-red-600 mx-auto mb-1" />
                <p className="text-lg font-bold text-red-600 dark:text-red-400">{absentCount}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">غائب</p>
              </div>
              <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-subcard text-center">
                <Calendar className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                <p className="text-lg font-bold text-amber-600 dark:text-amber-400">{lateCount}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">متأخر</p>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-subcard text-center">
                <Calendar className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{excusedCount}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">معذور</p>
              </div>
            </div>
            <div className="space-y-2">
              {attendance.length === 0 && (
                <p className="text-small text-gray-400 dark:text-gray-500 text-center py-4">لا توجد سجلات حضور</p>
              )}
              {attendance.map((a, i) => (
                <div key={a.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-subcard animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-small text-gray-700 dark:text-gray-300">{a.date}</span>
                    {a.notes && <span className="text-xs text-gray-400 dark:text-gray-500">({a.notes})</span>}
                  </div>
                  <Badge variant={a.status === 'present' ? 'success' : a.status === 'late' ? 'warning' : a.status === 'excused' ? 'info' : 'danger'}>
                    {a.status === 'present' ? 'حاضر' : a.status === 'absent' ? 'غائب' : a.status === 'late' ? 'متأخر' : 'معذور'}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>الدروس ذات الصلة</CardTitle>
            </CardHeader>
            <div className="space-y-2">
              {studentLessons.length === 0 && (
                <p className="text-small text-gray-400 dark:text-gray-500 text-center py-4">لا توجد دروس</p>
              )}
              {studentLessons.slice(0, 5).map((lesson, i) => {
                const subject = mockSubjects.find(s => s.id === lesson.subjectId)
                return (
                  <div key={lesson.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-subcard animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: subject?.color }} />
                      <div>
                        <p className="text-small font-medium text-gray-900 dark:text-gray-100">{lesson.title}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{subject?.name} • {lesson.duration} دقيقة</p>
                      </div>
                    </div>
                    <Badge variant={lesson.status === 'completed' ? 'success' : lesson.status === 'scheduled' ? 'info' : 'default'}>
                      {lesson.status === 'completed' ? 'مكتمل' : lesson.status === 'scheduled' ? 'مجدول' : 'مسودة'}
                    </Badge>
                  </div>
                )
              })}
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}
