'use client'
import { useRouter } from 'next/navigation'
import { Card, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Avatar } from '@/components/ui/Avatar'
import { BarChart } from '@/components/charts/BarChart'
import { mockParents, mockStudents, mockGrades, mockMessages, mockSubjects } from '@/lib/data'
import { ArrowRight, Mail, Phone, MessageSquare, Send } from 'lucide-react'
import { useState } from 'react'

export default function ParentDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const parent = mockParents.find(p => p.id === params.id)
  if (!parent) return <div className="p-8 text-center text-gray-500">ولي الأمر غير موجود</div>

  const children = mockStudents.filter(s => parent.childrenIds.includes(s.id))

  return (
    <>
      <Button variant="ghost" onClick={() => router.back()} className="mb-4">
        <ArrowRight className="w-4 h-4" />
        عودة
      </Button>

      <Card className="mb-6">
        <div className="flex items-center gap-6">
          <Avatar name={parent.name} size="lg" />
          <div className="flex-1">
            <h1 className="text-h1 text-gray-900">{parent.name}</h1>
            <div className="flex items-center gap-6 mt-2">
              <span className="flex items-center gap-2 text-small text-gray-500">
                <Mail className="w-4 h-4" /> {parent.email}
              </span>
              <span className="flex items-center gap-2 text-small text-gray-500">
                <Phone className="w-4 h-4" /> {parent.phone || 'غير متوفر'}
              </span>
            </div>
          </div>
          <Button>
            <Send className="w-4 h-4" />
            إرسال رسالة
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {children.map((kid, i) => {
          const kidGrades = mockGrades.filter(g => g.studentId === kid.id)
          const subjectPerformance = kid.subjects.map(sid => {
            const subject = mockSubjects.find(s => s.id === sid)
            const subjectGrades = kidGrades.filter(g => g.subjectId === sid)
            const avg = subjectGrades.length > 0
              ? (subjectGrades.reduce((sum, g) => sum + (g.value / g.maxValue) * 100, 0) / subjectGrades.length)
              : 0
            return { name: subject?.name || sid, value: Math.round(avg), color: subject?.color || '#4f46e5' }
          })

          return (
            <Card key={kid.id} hover>
              <div className="flex items-center gap-4 mb-4">
                <Avatar name={kid.name} size="md" />
                <div className="flex-1">
                  <h3 className="text-h3 text-gray-900">{kid.name}</h3>
                  <p className="text-small text-gray-500">الصف {kid.grade} - شعبة {kid.section}</p>
                </div>
                <div className="text-center">
                  <p className="text-h2 text-primary-600">{kid.gpa}%</p>
                  <p className="text-xs text-gray-400">المعدل</p>
                </div>
              </div>
              <BarChart data={subjectPerformance} height={200} />
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>تاريخ التواصل</CardTitle>
        </CardHeader>
        <div className="space-y-3">
          {mockMessages
            .filter(m => m.senderId === parent.id || m.recipientId === parent.id)
            .map((msg, i) => (
              <div key={msg.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-subcard animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                <MessageSquare className="w-5 h-5 text-primary-600 mt-0.5" />
                <div className="flex-1">
                  <p className="text-small font-medium text-gray-900">{msg.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{msg.content}</p>
                  <p className="text-xs text-gray-400 mt-1">{new Date(msg.createdAt).toLocaleDateString('ar-SA')}</p>
                </div>
              </div>
            ))}
          {mockMessages.filter(m => m.senderId === parent.id || m.recipientId === parent.id).length === 0 && (
            <p className="text-center text-gray-400 py-4 text-small">لا توجد رسائل سابقة</p>
          )}
        </div>
      </Card>
    </>
  )
}
