'use client'
import { useState, useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { Modal } from '@/components/ui/Modal'
import { mockParents, mockClassrooms, mockSubjects } from '@/lib/data'
import { useStudents } from '@/lib/useStudentsStore'
import { Search, Plus, ChevronLeft, ChevronRight, ArrowUpDown, Users, Award, TrendingUp, GraduationCap } from 'lucide-react'

const ITEMS_PER_PAGE = 5

type SortKey = 'name' | 'grade' | 'gpa' | 'attendanceRate' | 'createdAt'
type SortDir = 'asc' | 'desc'

export default function StudentsPage() {
  const router = useRouter()
  const { students, addStudent } = useStudents()
  const [search, setSearch] = useState('')
  const [gradeFilter, setGradeFilter] = useState('all')
  const [sectionFilter, setSectionFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'graduated' | 'suspended'>('all')
  const [page, setPage] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [sortKey, setSortKey] = useState<SortKey>('name')
  const [sortDir, setSortDir] = useState<SortDir>('asc')
  const [form, setForm] = useState({ name: '', email: '', phone: '', grade: '10', section: 'أ' })

  const grades = useMemo(() => [...new Set(students.map(s => s.grade))], [students])
  const sections = useMemo(() => [...new Set(students.map(s => s.section))], [students])

  const avgGpa = useMemo(() => {
    const total = students.reduce((sum, s) => sum + s.gpa, 0)
    return students.length ? (total / students.length).toFixed(1) : '0'
  }, [students])

  const avgAttendance = useMemo(() => {
    const total = students.reduce((sum, s) => sum + s.attendanceRate, 0)
    return students.length ? (total / students.length).toFixed(1) : '0'
  }, [students])

  const activeCount = useMemo(() => students.filter(s => s.status === 'active').length, [students])

  const handleAdd = useCallback(() => {
    if (!form.name.trim() || !form.email.trim()) return
    addStudent({
      name: form.name, email: form.email,
      phone: form.phone, grade: form.grade,
      section: form.section, parentId: '',
      subjects: [],
    })
    setForm({ name: '', email: '', phone: '', grade: '10', section: 'أ' })
    setShowModal(false)
  }, [form, addStudent])

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const filtered = useMemo(() => {
    let list = students.filter(s => {
      const matchSearch = s.name.includes(search) || s.email.includes(search) || s.id.includes(search)
      const matchGrade = gradeFilter === 'all' || s.grade === gradeFilter
      const matchSection = sectionFilter === 'all' || s.section === sectionFilter
      const matchStatus = statusFilter === 'all' || s.status === statusFilter
      return matchSearch && matchGrade && matchSection && matchStatus
    })
    list.sort((a, b) => {
      const dir = sortDir === 'asc' ? 1 : -1
      if (sortKey === 'name') return a.name.localeCompare(b.name) * dir
      if (sortKey === 'grade') return a.grade.localeCompare(b.grade) * dir
      if (sortKey === 'gpa') return (a.gpa - b.gpa) * dir
      if (sortKey === 'attendanceRate') return (a.attendanceRate - b.attendanceRate) * dir
      return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * dir
    })
    return list
  }, [search, gradeFilter, sectionFilter, statusFilter, sortKey, sortDir])

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  const SortHeader = ({ label, sortId }: { label: string; sortId: SortKey }) => (
    <th className="px-4 py-3 text-small font-semibold text-gray-600 dark:text-gray-400 cursor-pointer select-none" onClick={() => toggleSort(sortId)}>
      <div className="flex items-center gap-1">
        {label}
        {sortKey === sortId ? (
          <ArrowUpDown className={`w-3.5 h-3.5 transition-transform ${sortDir === 'desc' ? 'rotate-180' : ''}`} />
        ) : (
          <ArrowUpDown className="w-3.5 h-3.5 opacity-30" />
        )}
      </div>
    </th>
  )

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-h1 text-gray-900 dark:text-gray-100">إدارة الطلاب</h1>
          <p className="text-small text-gray-500 dark:text-gray-400">عرض وإدارة بيانات الطلاب</p>
        </div>
        <Button onClick={() => setShowModal(true)}>
          <Plus className="w-4 h-4" />
          إضافة طالب
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card className="text-center">
          <Users className="w-6 h-6 text-primary-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{students.length}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">إجمالي الطلاب</p>
        </Card>
        <Card className="text-center">
          <Award className="w-6 h-6 text-amber-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{avgGpa}%</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">متوسط المعدل</p>
        </Card>
        <Card className="text-center">
          <TrendingUp className="w-6 h-6 text-green-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{avgAttendance}%</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">متوسط الحضور</p>
        </Card>
        <Card className="text-center">
          <GraduationCap className="w-6 h-6 text-accent-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{activeCount}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">طلاب نشطون</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>قائمة الطلاب</CardTitle>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="بحث بالاسم أو البريد أو المعرف..."
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1) }}
                className="pr-9 pl-3 py-2 text-small border-2 border-gray-200 dark:border-gray-600 rounded-btn bg-white dark:bg-gray-800 focus:border-primary-500 dark:focus:border-primary-400 outline-none transition-colors dark:text-gray-200 w-56"
              />
            </div>
            <select
              value={gradeFilter}
              onChange={e => { setGradeFilter(e.target.value); setPage(1) }}
              className="px-3 py-2 text-small border-2 border-gray-200 dark:border-gray-600 rounded-btn focus:border-primary-500 outline-none bg-white dark:bg-gray-800 dark:text-gray-200"
            >
              <option value="all">جميع الصفوف</option>
              {grades.map(g => <option key={g} value={g}>الصف {g}</option>)}
            </select>
            <select
              value={sectionFilter}
              onChange={e => { setSectionFilter(e.target.value); setPage(1) }}
              className="px-3 py-2 text-small border-2 border-gray-200 dark:border-gray-600 rounded-btn focus:border-primary-500 outline-none bg-white dark:bg-gray-800 dark:text-gray-200"
            >
              <option value="all">جميع الشعب</option>
              {sections.map(s => <option key={s} value={s}>شعبة {s}</option>)}
            </select>
            <select
              value={statusFilter}
              onChange={e => { setStatusFilter(e.target.value as typeof statusFilter); setPage(1) }}
              className="px-3 py-2 text-small border-2 border-gray-200 dark:border-gray-600 rounded-btn focus:border-primary-500 outline-none bg-white dark:bg-gray-800 dark:text-gray-200"
            >
              <option value="all">جميع الحالات</option>
              <option value="active">نشط</option>
              <option value="graduated">خريج</option>
              <option value="suspended">موقوف</option>
            </select>
          </div>
        </CardHeader>

        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <SortHeader label="الطالب" sortId="name" />
                <th className="px-4 py-3 text-small font-semibold text-gray-600 dark:text-gray-400">المعرف</th>
                <SortHeader label="الصف" sortId="grade" />
                <th className="px-4 py-3 text-small font-semibold text-gray-600 dark:text-gray-400">الشعبة</th>
                <SortHeader label="المعدل" sortId="gpa" />
                <SortHeader label="الحضور" sortId="attendanceRate" />
                <th className="px-4 py-3 text-small font-semibold text-gray-600 dark:text-gray-400">ولي الأمر</th>
                <th className="px-4 py-3 text-small font-semibold text-gray-600 dark:text-gray-400">المواد</th>
                <th className="px-4 py-3 text-small font-semibold text-gray-600 dark:text-gray-400">الحالة</th>
                <th className="px-4 py-3 text-small font-semibold text-gray-600 dark:text-gray-400">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((student, i) => {
                const parent = mockParents.find(p => p.id === student.parentId)
                return (
                  <tr key={student.id} className="border-b border-gray-100 dark:border-gray-700/50 hover:bg-primary-50 dark:hover:bg-primary-900/10 transition-colors cursor-pointer animate-fade-in" style={{ animationDelay: `${i * 50}ms` }} onClick={() => router.push(`/students/${student.id}`)}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar name={student.name} size="sm" />
                        <div>
                          <p className="text-small font-medium text-gray-900 dark:text-gray-100">{student.name}</p>
                          <p className="text-xs text-gray-400 dark:text-gray-500">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs font-mono text-gray-500 dark:text-gray-400">{student.id}</td>
                    <td className="px-4 py-3 text-small text-gray-900 dark:text-gray-200">الصف {student.grade}</td>
                    <td className="px-4 py-3 text-small text-gray-900 dark:text-gray-200">شعبة {student.section}</td>
                    <td className="px-4 py-3">
                      <span className={`text-small font-medium ${student.gpa >= 90 ? 'text-green-600 dark:text-green-400' : student.gpa >= 75 ? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400'}`}>
                        {student.gpa}%
                      </span>
                      <div className="w-16 h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full mt-1">
                        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${student.gpa}%`, backgroundColor: student.gpa >= 90 ? '#10b981' : student.gpa >= 75 ? '#f59e0b' : '#f43f5e' }} />
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-small font-medium ${student.attendanceRate >= 90 ? 'text-green-600 dark:text-green-400' : student.attendanceRate >= 75 ? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400'}`}>
                        {student.attendanceRate}%
                      </span>
                      <div className="w-16 h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full mt-1">
                        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${student.attendanceRate}%`, backgroundColor: student.attendanceRate >= 90 ? '#10b981' : student.attendanceRate >= 75 ? '#f59e0b' : '#f43f5e' }} />
                      </div>
                    </td>
                    <td className="px-4 py-3 text-small text-gray-700 dark:text-gray-300">{parent?.name || '—'}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        {student.subjects.slice(0, 2).map(sid => {
                          const sub = mockSubjects.find(s => s.id === sid)
                          return <span key={sid} className="w-2 h-2 rounded-full" style={{ backgroundColor: sub?.color }} title={sub?.name} />
                        })}
                        {student.subjects.length > 2 && <span className="text-xs text-gray-400">+{student.subjects.length - 2}</span>}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={student.status === 'active' ? 'success' : student.status === 'graduated' ? 'info' : 'danger'}>
                        {student.status === 'active' ? 'نشط' : student.status === 'graduated' ? 'خريج' : 'موقوف'}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Button variant="ghost" size="sm" onClick={e => { e.stopPropagation(); router.push(`/students/${student.id}`) }}>عرض</Button>
                    </td>
                  </tr>
                )
              })}
              {paginated.length === 0 && (
                <tr><td colSpan={10} className="text-center py-8 text-gray-400 dark:text-gray-500">لا يوجد طلاب مطابقون لمعايير البحث</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 dark:border-gray-700">
          <p className="text-small text-gray-500 dark:text-gray-400">إجمالي {filtered.length} طالب</p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(p => p - 1)}>
              <ChevronRight className="w-4 h-4" />
            </Button>
            <span className="text-small text-gray-700 dark:text-gray-300">{page} من {totalPages}</span>
            <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="إضافة طالب جديد">
        <div className="space-y-4">
          <Input label="الاسم الكامل" placeholder="أدخل اسم الطالب" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          <Input label="البريد الإلكتروني" type="email" placeholder="student@school.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
          <Input label="رقم الهاتف" placeholder="05xxxxxxxx" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-small font-medium text-gray-700 dark:text-gray-300">الصف</label>
              <select value={form.grade} onChange={e => setForm(f => ({ ...f, grade: e.target.value }))} className="w-full px-3 py-2 border-2 border-gray-200 dark:border-gray-600 rounded-btn bg-white dark:bg-gray-800 dark:text-gray-200 outline-none focus:border-primary-500">
                <option>10</option><option>11</option><option>12</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-small font-medium text-gray-700 dark:text-gray-300">الشعبة</label>
              <select value={form.section} onChange={e => setForm(f => ({ ...f, section: e.target.value }))} className="w-full px-3 py-2 border-2 border-gray-200 dark:border-gray-600 rounded-btn bg-white dark:bg-gray-800 dark:text-gray-200 outline-none focus:border-primary-500">
                <option>أ</option><option>ب</option><option>ج</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <Button className="flex-1" onClick={handleAdd}>حفظ</Button>
            <Button variant="outline" className="flex-1" onClick={() => setShowModal(false)}>إلغاء</Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
