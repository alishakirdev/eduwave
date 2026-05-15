'use client'
import { mockStudents, mockClassrooms } from '@/lib/data'
import { Search, Filter } from 'lucide-react'
import { useState } from 'react'

interface StudentFiltersProps {
  onFilter: (filters: { search: string; grade: string; section: string }) => void
}

export function StudentFilters({ onFilter }: StudentFiltersProps) {
  const [search, setSearch] = useState('')
  const [grade, setGrade] = useState('all')
  const [section, setSection] = useState('all')

  const grades = [...new Set(mockStudents.map(s => s.grade))]
  const sections = [...new Set(mockStudents.map(s => s.section))]

  const handleChange = () => {
    onFilter({ search, grade, section })
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="بحث..."
          value={search}
          onChange={e => { setSearch(e.target.value); handleChange() }}
          className="pr-9 pl-3 py-2 text-small border-2 border-gray-200 rounded-btn focus:border-primary-500 outline-none transition-colors"
        />
      </div>
      <select
        value={grade}
        onChange={e => { setGrade(e.target.value); handleChange() }}
        className="px-3 py-2 text-small border-2 border-gray-200 rounded-btn focus:border-primary-500 outline-none bg-white"
      >
        <option value="all">جميع الصفوف</option>
        {grades.map(g => <option key={g} value={g}>الصف {g}</option>)}
      </select>
      <select
        value={section}
        onChange={e => { setSection(e.target.value); handleChange() }}
        className="px-3 py-2 text-small border-2 border-gray-200 rounded-btn focus:border-primary-500 outline-none bg-white"
      >
        <option value="all">جميع الشعب</option>
        {sections.map(s => <option key={s} value={s}>شعبة {s}</option>)}
      </select>
    </div>
  )
}
