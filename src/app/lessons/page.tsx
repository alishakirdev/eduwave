'use client'
import { useRouter } from 'next/navigation'
import { Card, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { mockLessons, mockSubjects } from '@/lib/data'
import { Plus, BookOpen, Clock, Calendar, Filter } from 'lucide-react'
import { useState } from 'react'

export default function LessonsPage() {
  const router = useRouter()
  const [filter, setFilter] = useState<string>('all')

  const filtered = filter === 'all' ? mockLessons : mockLessons.filter(l => l.status === filter)

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-h1 text-gray-900">خطط الدروس</h1>
          <p className="text-small text-gray-500">إدارة وتحضير خطط الدروس</p>
        </div>
        <Button onClick={() => router.push('/lessons/new')}>
          <Plus className="w-4 h-4" />
          خطة درس جديدة
        </Button>
      </div>

      <div className="flex gap-2">
        {[
          { id: 'all', label: 'الكل' },
          { id: 'draft', label: 'مسودة' },
          { id: 'scheduled', label: 'مجدولة' },
          { id: 'completed', label: 'مكتملة' },
        ].map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-4 py-2 text-small rounded-btn transition-all duration-200 ${
              filter === f.id ? 'bg-primary-600 text-white shadow-soft' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((lesson, i) => {
          const subject = mockSubjects.find(s => s.id === lesson.subjectId)
          return (
            <Card key={lesson.id} hover className="animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="flex items-start justify-between mb-4">
                <Badge variant={lesson.status === 'completed' ? 'success' : lesson.status === 'scheduled' ? 'info' : 'default'}>
                  {lesson.status === 'completed' ? 'مكتملة' : lesson.status === 'scheduled' ? 'مجدولة' : 'مسودة'}
                </Badge>
                <div className="w-10 h-10 rounded-subcard flex items-center justify-center" style={{ backgroundColor: `${subject?.color}20` }}>
                  <BookOpen className="w-5 h-5" style={{ color: subject?.color }} />
                </div>
              </div>

              <h3 className="text-h3 text-gray-900 mb-2">{lesson.title}</h3>
              <p className="text-small text-gray-500 mb-1">{subject?.name} - الصف {lesson.grade}</p>

              <div className="flex items-center gap-4 mt-4 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {lesson.duration} دقيقة
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {lesson.scheduledDate || 'غير مجدولة'}
                </span>
              </div>

              {lesson.objectives && (
                <div className="mt-4 p-3 bg-gray-50 rounded-btn">
                  <p className="text-xs font-medium text-gray-600 mb-1">الأهداف:</p>
                  {lesson.objectives.slice(0, 2).map((obj, j) => (
                    <p key={j} className="text-xs text-gray-500">• {obj}</p>
                  ))}
                  {lesson.objectives.length > 2 && (
                    <p className="text-xs text-gray-400 mt-1">+{lesson.objectives.length - 2} أهداف أخرى</p>
                  )}
                </div>
              )}

              <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                <Button variant="outline" size="sm" className="flex-1">عرض</Button>
                <Button variant="ghost" size="sm" className="flex-1">تعديل</Button>
              </div>
            </Card>
          )
        })}
      </div>
    </>
  )
}
