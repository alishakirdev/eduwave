'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { mockSubjects, mockClassrooms } from '@/lib/data'
import { ArrowRight, Check, Plus, Trash2, BookOpen, Target, FileText, Activity, Link as LinkIcon, ClipboardList } from 'lucide-react'

type Step = 'basic' | 'objectives' | 'content' | 'activities' | 'resources' | 'assignment'

const steps: { id: Step; label: string; icon: React.ReactNode }[] = [
  { id: 'basic', label: 'أساسيات', icon: <BookOpen className="w-4 h-4" /> },
  { id: 'objectives', label: 'الأهداف', icon: <Target className="w-4 h-4" /> },
  { id: 'content', label: 'المحتوى', icon: <FileText className="w-4 h-4" /> },
  { id: 'activities', label: 'الأنشطة', icon: <Activity className="w-4 h-4" /> },
  { id: 'resources', label: 'الموارد', icon: <LinkIcon className="w-4 h-4" /> },
  { id: 'assignment', label: 'الواجب', icon: <ClipboardList className="w-4 h-4" /> },
]

export default function NewLessonPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<Step>('basic')

  const [form, setForm] = useState({
    title: '', subjectId: '', grade: '', classroomId: '', duration: 45,
  })
  const [objectives, setObjectives] = useState<string[]>([''])
  const [content, setContent] = useState('')
  const [activities, setActivities] = useState<{ type: string; description: string; duration: number }[]>([])
  const [resources, setResources] = useState<{ title: string; url: string; type: string }[]>([])
  const [assignment, setAssignment] = useState({ title: '', description: '', dueDate: '' })

  const addObjective = () => setObjectives([...objectives, ''])
  const removeObjective = (i: number) => setObjectives(objectives.filter((_, idx) => idx !== i))
  const updateObjective = (i: number, value: string) => {
    const newObjs = [...objectives]
    newObjs[i] = value
    setObjectives(newObjs)
  }

  const addActivity = () => setActivities([...activities, { type: 'lecture', description: '', duration: 15 }])
  const removeActivity = (i: number) => setActivities(activities.filter((_, idx) => idx !== i))
  const updateActivity = (i: number, field: string, value: any) => {
    const newActs = [...activities]
    ;(newActs[i] as any)[field] = value
    setActivities(newActs)
  }

  const addResource = () => setResources([...resources, { title: '', url: '', type: 'link' }])
  const removeResource = (i: number) => setResources(resources.filter((_, idx) => idx !== i))
  const updateResource = (i: number, field: string, value: any) => {
    const newRes = [...resources]
    ;(newRes[i] as any)[field] = value
    setResources(newRes)
  }

  const stepIndex = steps.findIndex(s => s.id === currentStep)
  const canNext = currentStep !== 'assignment'

  const handleSave = (status: 'draft' | 'scheduled') => {
    router.push('/lessons')
  }

  const renderStep = () => {
    switch (currentStep) {
      case 'basic':
        return (
          <div className="space-y-4">
            <Input label="عنوان الخطة" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="مثال: حل المعادلات الخطية" />
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-small font-medium text-gray-700">المادة</label>
                <select className="w-full px-4 py-2.5 text-body border-2 border-gray-200 rounded-btn bg-white focus:border-primary-500 outline-none" value={form.subjectId} onChange={e => setForm({ ...form, subjectId: e.target.value })}>
                  <option value="">اختر المادة</option>
                  {mockSubjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="block text-small font-medium text-gray-700">الصف</label>
                <select className="w-full px-4 py-2.5 text-body border-2 border-gray-200 rounded-btn bg-white focus:border-primary-500 outline-none" value={form.grade} onChange={e => setForm({ ...form, grade: e.target.value })}>
                  <option value="">اختر الصف</option>
                  {['10', '11', '12'].map(g => <option key={g} value={g}>الصف {g}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-small font-medium text-gray-700">الفصل</label>
                <select className="w-full px-4 py-2.5 text-body border-2 border-gray-200 rounded-btn bg-white focus:border-primary-500 outline-none" value={form.classroomId} onChange={e => setForm({ ...form, classroomId: e.target.value })}>
                  <option value="">اختر الفصل</option>
                  {mockClassrooms.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <Input label="المدة (بالدقائق)" type="number" value={form.duration} onChange={e => setForm({ ...form, duration: +e.target.value })} />
            </div>
          </div>
        )

      case 'objectives':
        return (
          <div className="space-y-4">
            <p className="text-small text-gray-500">أضف الأهداف التعليمية لهذه الخطة</p>
            {objectives.map((obj, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  value={obj}
                  onChange={e => updateObjective(i, e.target.value)}
                  placeholder={`الهدف ${i + 1}`}
                  className="flex-1 px-4 py-2 text-body border-2 border-gray-200 rounded-btn focus:border-primary-500 outline-none"
                />
                {objectives.length > 1 && (
                  <button onClick={() => removeObjective(i)} className="p-2 text-gray-400 hover:text-danger transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={addObjective}>
              <Plus className="w-4 h-4" /> إضافة هدف
            </Button>
          </div>
        )

      case 'content':
        return (
          <div className="space-y-4">
            <p className="text-small text-gray-500">اكتب محتوى الدرس وطريقة الشرح</p>
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="اكتب محتوى الدرس هنا..."
              rows={10}
              className="w-full px-4 py-3 text-body border-2 border-gray-200 rounded-subcard focus:border-primary-500 outline-none resize-none transition-colors"
            />
          </div>
        )

      case 'activities':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-small text-gray-500">أضف الأنشطة التعليمية</p>
              <Button variant="outline" size="sm" onClick={addActivity}>
                <Plus className="w-4 h-4" /> إضافة نشاط
              </Button>
            </div>
            {activities.length === 0 && (
              <p className="text-center text-gray-400 py-8 text-small">لم يتم إضافة أنشطة بعد</p>
            )}
            {activities.map((act, i) => (
              <div key={i} className="p-4 bg-gray-50 rounded-subcard space-y-3 animate-fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-500">النشاط {i + 1}</span>
                  <button onClick={() => removeActivity(i)} className="text-gray-400 hover:text-danger">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <select className="px-3 py-2 text-small border-2 border-gray-200 rounded-btn bg-white focus:border-primary-500 outline-none" value={act.type} onChange={e => updateActivity(i, 'type', e.target.value)}>
                    <option value="lecture">شرح</option>
                    <option value="discussion">مناقشة</option>
                    <option value="group_work">عمل جماعي</option>
                    <option value="quiz">اختبار</option>
                    <option value="project">مشروع</option>
                  </select>
                  <input placeholder="الوصف" value={act.description} onChange={e => updateActivity(i, 'description', e.target.value)} className="col-span-1 px-3 py-2 text-small border-2 border-gray-200 rounded-btn focus:border-primary-500 outline-none" />
                  <input placeholder="المدة (دقيقة)" type="number" value={act.duration} onChange={e => updateActivity(i, 'duration', +e.target.value)} className="px-3 py-2 text-small border-2 border-gray-200 rounded-btn focus:border-primary-500 outline-none" />
                </div>
              </div>
            ))}
          </div>
        )

      case 'resources':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-small text-gray-500">أضف الموارد التعليمية</p>
              <Button variant="outline" size="sm" onClick={addResource}>
                <Plus className="w-4 h-4" /> إضافة مورد
              </Button>
            </div>
            {resources.length === 0 && (
              <p className="text-center text-gray-400 py-8 text-small">لم يتم إضافة موارد بعد</p>
            )}
            {resources.map((res, i) => (
              <div key={i} className="flex items-center gap-2 animate-fade-in">
                <select className="px-3 py-2 text-small border-2 border-gray-200 rounded-btn bg-white focus:border-primary-500 outline-none" value={res.type} onChange={e => updateResource(i, 'type', e.target.value)}>
                  <option value="link">رابط</option>
                  <option value="file">ملف</option>
                  <option value="video">فيديو</option>
                </select>
                <input placeholder="العنوان" value={res.title} onChange={e => updateResource(i, 'title', e.target.value)} className="flex-1 px-3 py-2 text-small border-2 border-gray-200 rounded-btn focus:border-primary-500 outline-none" />
                <input placeholder={res.type === 'link' ? 'URL' : 'اسم الملف'} value={res.url} onChange={e => updateResource(i, 'url', e.target.value)} className="flex-1 px-3 py-2 text-small border-2 border-gray-200 rounded-btn focus:border-primary-500 outline-none" />
                <button onClick={() => removeResource(i)} className="text-gray-400 hover:text-danger">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )

      case 'assignment':
        return (
          <div className="space-y-4">
            <p className="text-small text-gray-500">اختياري: أضف واجباً مرتبطاً بالدرس</p>
            <Input label="عنوان الواجب" value={assignment.title} onChange={e => setAssignment({ ...assignment, title: e.target.value })} placeholder="مثال: تمارين المعادلات" />
            <div className="space-y-1.5">
              <label className="block text-small font-medium text-gray-700">الوصف</label>
              <textarea
                value={assignment.description}
                onChange={e => setAssignment({ ...assignment, description: e.target.value })}
                placeholder="وصف الواجب..."
                rows={4}
                className="w-full px-4 py-3 text-body border-2 border-gray-200 rounded-btn focus:border-primary-500 outline-none resize-none"
              />
            </div>
            <Input label="تاريخ التسليم" type="date" value={assignment.dueDate} onChange={e => setAssignment({ ...assignment, dueDate: e.target.value })} />
          </div>
        )
    }
  }

  return (
    <>
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowRight className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-h1 text-gray-900">خطة درس جديدة</h1>
          <p className="text-small text-gray-500">أنشئ خطة درس متكاملة خطوة بخطوة</p>
        </div>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {steps.map((step, i) => (
          <button
            key={step.id}
            onClick={() => setCurrentStep(step.id)}
            className={`flex items-center gap-2 px-4 py-2 text-small rounded-btn whitespace-nowrap transition-all duration-200 ${
              currentStep === step.id
                ? 'bg-primary-600 text-white shadow-soft'
                : i < stepIndex
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-100 text-gray-500'
            }`}
          >
            {i < stepIndex ? <Check className="w-3.5 h-3.5" /> : step.icon}
            {step.label}
          </button>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{steps.find(s => s.id === currentStep)?.label}</CardTitle>
        </CardHeader>
        {renderStep()}

        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
          <Button
            variant="outline"
            onClick={() => {
              const prev = steps[stepIndex - 1]
              if (prev) setCurrentStep(prev.id)
            }}
            disabled={stepIndex === 0}
          >
            السابق
          </Button>

          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => handleSave('draft')}>
              حفظ كمسودة
            </Button>
            {canNext ? (
              <Button onClick={() => { const next = steps[stepIndex + 1]; if (next) setCurrentStep(next.id) }}>
                التالي
              </Button>
            ) : (
              <Button onClick={() => handleSave('scheduled')}>
                جدولة الخطة
              </Button>
            )}
          </div>
        </div>
      </Card>
    </>
  )
}
