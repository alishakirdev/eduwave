'use client'
import { Card, CardHeader, CardTitle } from '@/components/ui/Card'
import { mockMessages } from '@/lib/data'
import { MessageSquare, Send } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function MessagesPage() {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-h1 text-gray-900">الرسائل</h1>
          <p className="text-small text-gray-500">التواصل المباشر</p>
        </div>
        <Button>
          <Send className="w-4 h-4" />
          رسالة جديدة
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>جميع الرسائل</CardTitle>
        </CardHeader>
        <div className="space-y-3">
          {mockMessages.map((msg, i) => (
            <div key={msg.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-subcard animate-fade-in cursor-pointer hover:bg-primary-50 transition-colors" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="w-10 h-10 bg-primary-100 rounded-btn flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-5 h-5 text-primary-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-small font-medium text-gray-900">{msg.title}</p>
                  <span className="text-xs text-gray-400">{new Date(msg.createdAt).toLocaleDateString('ar-SA')}</span>
                </div>
                <p className="text-small text-gray-500 mt-1 truncate">{msg.content}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </>
  )
}
