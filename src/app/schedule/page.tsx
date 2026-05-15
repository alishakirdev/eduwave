'use client'
import { Card, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { mockSubjects, mockTeachers, mockClassrooms } from '@/lib/data'
import { Clock, BookOpen, User, MapPin } from 'lucide-react'

const weekDays = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس']

const scheduleData: Record<string, { time: string; subjectId: string; teacherId: string; classroomId: string }[]> = {
  'الأحد': [
    { time: '08:00 - 08:45', subjectId: 's1', teacherId: 't1', classroomId: 'c1' },
    { time: '09:00 - 09:45', subjectId: 's2', teacherId: 't1', classroomId: 'c1' },
    { time: '10:00 - 10:45', subjectId: 's3', teacherId: 't2', classroomId: 'c1' },
  ],
  'الإثنين': [
    { time: '08:00 - 08:45', subjectId: 's4', teacherId: 't1', classroomId: 'c1' },
    { time: '09:00 - 09:45', subjectId: 's1', teacherId: 't1', classroomId: 'c2' },
    { time: '10:00 - 10:45', subjectId: 's2', teacherId: 't3', classroomId: 'c2' },
  ],
  'الثلاثاء': [
    { time: '08:00 - 08:45', subjectId: 's3', teacherId: 't2', classroomId: 'c1' },
    { time: '09:00 - 09:45', subjectId: 's1', teacherId: 't1', classroomId: 'c3' },
    { time: '10:00 - 10:45', subjectId: 's4', teacherId: 't1', classroomId: 'c1' },
  ],
  'الأربعاء': [
    { time: '08:00 - 08:45', subjectId: 's2', teacherId: 't3', classroomId: 'c2' },
    { time: '09:00 - 09:45', subjectId: 's3', teacherId: 't2', classroomId: 'c1' },
    { time: '10:00 - 10:45', subjectId: 's1', teacherId: 't1', classroomId: 'c1' },
  ],
  'الخميس': [
    { time: '08:00 - 08:45', subjectId: 's1', teacherId: 't1', classroomId: 'c1' },
    { time: '09:00 - 09:45', subjectId: 's4', teacherId: 't1', classroomId: 'c1' },
  ],
}

export default function SchedulePage() {
  return (
    <>
      <div className="space-y-1">
        <h1 className="text-h1 text-gray-900">الجدول الدراسي</h1>
        <p className="text-small text-gray-500">الجدول الأسبوعي للحصص</p>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {weekDays.map((day, i) => {
          const slots = scheduleData[day] || []
          return (
            <Card key={day} className="animate-fade-in p-4" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="text-center mb-4">
                <h3 className="text-h3 text-primary-600">{day}</h3>
                <p className="text-xs text-gray-400">{slots.length} حصص</p>
              </div>
              <div className="space-y-3">
                {slots.map((slot, j) => {
                  const subject = mockSubjects.find(s => s.id === slot.subjectId)
                  const teacher = mockTeachers.find(t => t.id === slot.teacherId)
                  const classroom = mockClassrooms.find(c => c.id === slot.classroomId)
                  return (
                    <div
                      key={j}
                      className="p-3 rounded-subcard border-r-4 transition-all duration-200 hover:shadow-soft"
                      style={{ borderColor: subject?.color || '#4f46e5', backgroundColor: `${subject?.color}08` }}
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <BookOpen className="w-3.5 h-3.5" style={{ color: subject?.color }} />
                        <span className="text-small font-medium text-gray-900">{subject?.name}</span>
                      </div>
                      <div className="space-y-1 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {slot.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {teacher?.name}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {classroom?.name}
                        </span>
                      </div>
                    </div>
                  )
                })}
                {slots.length === 0 && (
                  <p className="text-center text-gray-400 text-small py-4">لا توجد حصص</p>
                )}
              </div>
            </Card>
          )
        })}
      </div>
    </>
  )
}
