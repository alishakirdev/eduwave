'use client'
import { Card, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { mockTeachers, mockSubjects, mockClassrooms } from '@/lib/data'
import { BookOpen, Users, Mail, Phone } from 'lucide-react'

export default function TeachersPage() {
  return (
    <>
      <div className="space-y-1">
        <h1 className="text-h1 text-gray-900">المعلمون</h1>
        <p className="text-small text-gray-500">إدارة وعرض بيانات المعلمين</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockTeachers.map((teacher, i) => {
          const subjects = mockSubjects.filter(s => teacher.subjects.includes(s.id))
          const classrooms = mockClassrooms.filter(c => teacher.classrooms.includes(c.id))

          return (
            <Card key={teacher.id} hover className="animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="flex items-center gap-4 mb-4">
                <Avatar name={teacher.name} size="lg" />
                <div className="flex-1">
                  <h3 className="text-h3 text-gray-900">{teacher.name}</h3>
                  <p className="text-small text-gray-500">{teacher.email}</p>
                  <Badge variant="info" className="mt-1">{teacher.specialization}</Badge>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-small text-gray-500">
                  <Mail className="w-4 h-4" />
                  {teacher.email}
                </div>
                <div className="flex items-center gap-2 text-small text-gray-500">
                  <Phone className="w-4 h-4" />
                  {teacher.phone || 'غير متوفر'}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 space-y-3">
                <div>
                  <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" />
                    المواد ({subjects.length})
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {subjects.map(sub => (
                      <span key={sub.id} className="px-2 py-1 text-xs rounded-btn font-medium" style={{ backgroundColor: `${sub.color}15`, color: sub.color }}>
                        {sub.name}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    الفصول ({classrooms.length})
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {classrooms.map(c => (
                      <span key={c.id} className="px-2 py-1 text-xs bg-primary-50 text-primary-700 rounded-btn">
                        {c.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </>
  )
}
