'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { mockStudents, mockClassrooms } from '@/lib/data'
import { getStatusColor } from '@/lib/utils'
import { Search, Plus, Filter, ChevronLeft, ChevronRight } from 'lucide-react'

const ITEMS_PER_PAGE = 5

export default function StudentsPage() {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [gradeFilter, setGradeFilter] = useState('all')
  const [page, setPage] = useState(1)

  const filtered = mockStudents.filter(s => {
    const matchSearch = s.name.includes(search) || s.email.includes(search)
    const matchGrade = gradeFilter === 'all' || s.grade === gradeFilter
    return matchSearch && matchGrade
  })

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  const grades = [...new Set(mockStudents.map(s => s.grade))]

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-h1 text-gray-900">إدارة الطلاب</h1>
          <p className="text-small text-gray-500">عرض وإدارة بيانات الطلاب</p>
        </div>
        <Button>
          <Plus className="w-4 h-4" />
          إضافة طالب
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>قائمة الطلاب</CardTitle>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="بحث..."
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1) }}
                className="pr-9 pl-3 py-2 text-small border-2 border-gray-200 rounded-btn focus:border-primary-500 outline-none transition-colors"
              />
            </div>
            <select
              value={gradeFilter}
              onChange={e => { setGradeFilter(e.target.value); setPage(1) }}
              className="px-3 py-2 text-small border-2 border-gray-200 rounded-btn focus:border-primary-500 outline-none bg-white"
            >
              <option value="all">جميع الصفوف</option>
              {grades.map(g => <option key={g} value={g}>الصف {g}</option>)}
            </select>
          </div>
        </CardHeader>

        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 text-small font-semibold text-gray-600">الطالب</th>
                <th className="px-4 py-3 text-small font-semibold text-gray-600">الصف</th>
                <th className="px-4 py-3 text-small font-semibold text-gray-600">الشعبة</th>
                <th className="px-4 py-3 text-small font-semibold text-gray-600">المعدل</th>
                <th className="px-4 py-3 text-small font-semibold text-gray-600">الحضور</th>
                <th className="px-4 py-3 text-small font-semibold text-gray-600">الحالة</th>
                <th className="px-4 py-3 text-small font-semibold text-gray-600">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((student, i) => (
                <tr key={student.id} className="border-b border-gray-100 hover:bg-primary-50 transition-colors cursor-pointer animate-fade-in" style={{ animationDelay: `${i * 50}ms` }} onClick={() => router.push(`/students/${student.id}`)}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={student.name} size="sm" />
                      <div>
                        <p className="text-small font-medium text-gray-900">{student.name}</p>
                        <p className="text-xs text-gray-400">{student.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-small">{student.grade}</td>
                  <td className="px-4 py-3 text-small">{student.section}</td>
                  <td className="px-4 py-3 text-small font-medium text-primary-600">{student.gpa}%</td>
                  <td className="px-4 py-3 text-small">{student.attendanceRate}%</td>
                  <td className="px-4 py-3">
                    <Badge variant={student.status === 'active' ? 'success' : student.status === 'graduated' ? 'info' : 'danger'}>
                      {student.status === 'active' ? 'نشط' : student.status === 'graduated' ? 'خريج' : 'موقوف'}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Button variant="ghost" size="sm">عرض</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
          <p className="text-small text-gray-500">إجمالي {filtered.length} طالب</p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(p => p - 1)}>
              <ChevronRight className="w-4 h-4" />
            </Button>
            <span className="text-small text-gray-700">{page} من {totalPages}</span>
            <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </>
  )
}
