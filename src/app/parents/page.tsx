'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Avatar } from '@/components/ui/Avatar'
import { mockParents, mockStudents } from '@/lib/data'
import { Search, Plus, Mail, Phone, ChevronLeft, ChevronRight } from 'lucide-react'

export default function ParentsPage() {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const filtered = mockParents.filter(p => p.name.includes(search) || p.email.includes(search))
  const totalPages = Math.ceil(filtered.length / 5)
  const paginated = filtered.slice((page - 1) * 5, page * 5)

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-h1 text-gray-900">أولياء الأمور</h1>
          <p className="text-small text-gray-500">إدارة ومتابعة أولياء الأمور</p>
        </div>
        <Button>
          <Plus className="w-4 h-4" />
          إضافة ولي أمر
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginated.map((parent, i) => {
          const children = mockStudents.filter(s => parent.childrenIds.includes(s.id))
          return (
            <Card key={parent.id} hover className="animate-fade-in cursor-pointer" style={{ animationDelay: `${i * 100}ms` }} onClick={() => router.push(`/parents/${parent.id}`)}>
              <div className="flex items-center gap-4 mb-4">
                <Avatar name={parent.name} size="md" />
                <div className="flex-1">
                  <h3 className="text-h3 text-gray-900">{parent.name}</h3>
                  <p className="text-small text-gray-500">{parent.email}</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-small text-gray-500">
                  <Phone className="w-4 h-4" />
                  {parent.phone || 'غير متوفر'}
                </div>
                <div className="flex items-center gap-2 text-small text-gray-500">
                  <Mail className="w-4 h-4" />
                  {parent.email}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500 mb-2">الأبناء المسجلون ({children.length})</p>
                <div className="flex flex-wrap gap-2">
                  {children.map(child => (
                    <span key={child.id} className="px-2 py-1 text-xs bg-primary-50 text-primary-700 rounded-btn">
                      {child.name}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(p => p - 1)}>
            <ChevronRight className="w-4 h-4" />
          </Button>
          <span className="text-small text-gray-700">{page} من {totalPages}</span>
          <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
        </div>
      )}
    </>
  )
}
