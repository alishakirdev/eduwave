import { DashboardStats, Student, Teacher, Parent, LessonPlan, Subject, Classroom, Grade, Attendance, Notification, Message } from '@/types'

export const mockSubjects: Subject[] = [
  { id: 's1', name: 'الرياضيات', targetGrade: '10', description: 'الجبر والهندسة', teachers: ['t1', 't2'], color: '#4f46e5' },
  { id: 's2', name: 'العلوم', targetGrade: '10', description: 'الفيزياء والكيمياء', teachers: ['t1'], color: '#14b8a6' },
  { id: 's3', name: 'اللغة العربية', targetGrade: '10', description: 'النحو والأدب', teachers: ['t2'], color: '#f59e0b' },
  { id: 's4', name: 'اللغة الإنجليزية', targetGrade: '10', description: 'قواعد ومفردات', teachers: ['t1'], color: '#f43f5e' },
]

export const mockStudents: Student[] = [
  { id: 'st1', name: 'أحمد محمد', email: 'ahmed@school.com', role: 'student', grade: '10', section: 'أ', parentId: 'p1', attendanceRate: 95, gpa: 92.5, status: 'active', subjects: ['s1', 's2', 's3', 's4'], createdAt: '2024-09-01', phone: '0555123456' },
  { id: 'st2', name: 'سارة خالد', email: 'sara@school.com', role: 'student', grade: '10', section: 'أ', parentId: 'p1', attendanceRate: 88, gpa: 87.3, status: 'active', subjects: ['s1', 's2', 's3', 's4'], createdAt: '2024-09-01', phone: '0555123457' },
  { id: 'st3', name: 'عمر حسن', email: 'omar@school.com', role: 'student', grade: '11', section: 'ب', parentId: 'p2', attendanceRate: 78, gpa: 75.0, status: 'active', subjects: ['s1', 's2'], createdAt: '2024-09-01', phone: '0555123458' },
  { id: 'st4', name: 'ليلى أحمد', email: 'laila@school.com', role: 'student', grade: '10', section: 'أ', parentId: 'p2', attendanceRate: 97, gpa: 95.8, status: 'active', subjects: ['s1', 's2', 's3', 's4'], createdAt: '2024-09-01', phone: '0555123459' },
  { id: 'st5', name: 'محمد علي', email: 'mohamed@school.com', role: 'student', grade: '12', section: 'ج', parentId: 'p3', attendanceRate: 92, gpa: 88.1, status: 'active', subjects: ['s1', 's3'], createdAt: '2024-09-01', phone: '0555123460' },
  { id: 'st6', name: 'نورة عبدالله', email: 'noura@school.com', role: 'student', grade: '11', section: 'ب', parentId: 'p3', attendanceRate: 65, gpa: 68.4, status: 'active', subjects: ['s2', 's3', 's4'], createdAt: '2024-09-01', phone: '0555123461' },
]

export const mockTeachers: Teacher[] = [
  { id: 't1', name: 'أ. خالد العلي', email: 'khaled@school.com', role: 'teacher', subjects: ['s1', 's2', 's4'], classrooms: ['c1', 'c2'], specialization: 'الرياضيات', createdAt: '2023-01-15', phone: '0555123401', avatar: '' },
  { id: 't2', name: 'أ. نورة السلمي', email: 'noura.t@school.com', role: 'teacher', subjects: ['s1', 's3'], classrooms: ['c1', 'c3'], specialization: 'اللغة العربية', createdAt: '2023-03-20', phone: '0555123402', avatar: '' },
  { id: 't3', name: 'أ. فيصل الحربي', email: 'faisal@school.com', role: 'teacher', subjects: ['s2'], classrooms: ['c2'], specialization: 'العلوم', createdAt: '2024-09-01', phone: '0555123403', avatar: '' },
]

export const mockParents: Parent[] = [
  { id: 'p1', name: 'محمد أحمد', email: 'parent1@example.com', role: 'parent', childrenIds: ['st1', 'st2'], createdAt: '2024-09-01', phone: '0555123411' },
  { id: 'p2', name: 'فاطمة حسن', email: 'parent2@example.com', role: 'parent', childrenIds: ['st3', 'st4'], createdAt: '2024-09-01', phone: '0555123412' },
  { id: 'p3', name: 'علي عبدالله', email: 'parent3@example.com', role: 'parent', childrenIds: ['st5', 'st6'], createdAt: '2024-09-01', phone: '0555123413' },
]

export const mockClassrooms: Classroom[] = [
  { id: 'c1', name: '10-أ', grade: '10', students: ['st1', 'st2', 'st4'], subjects: ['s1', 's2', 's3', 's4'], homeroomTeacher: 't1' },
  { id: 'c2', name: '11-ب', grade: '11', students: ['st3', 'st6'], subjects: ['s1', 's2'], homeroomTeacher: 't2' },
  { id: 'c3', name: '12-ج', grade: '12', students: ['st5'], subjects: ['s1', 's3'], homeroomTeacher: 't1' },
]

export const mockGrades: Grade[] = [
  { id: 'g1', studentId: 'st1', subjectId: 's1', type: 'exam', value: 95, maxValue: 100, weight: 0.4, date: '2025-03-01' },
  { id: 'g2', studentId: 'st1', subjectId: 's2', type: 'exam', value: 88, maxValue: 100, weight: 0.4, date: '2025-03-01' },
  { id: 'g3', studentId: 'st2', subjectId: 's1', type: 'exam', value: 82, maxValue: 100, weight: 0.4, date: '2025-03-01' },
  { id: 'g4', studentId: 'st2', subjectId: 's3', type: 'assignment', value: 90, maxValue: 100, weight: 0.2, date: '2025-03-05' },
  { id: 'g5', studentId: 'st3', subjectId: 's1', type: 'exam', value: 70, maxValue: 100, weight: 0.4, date: '2025-03-01' },
  { id: 'g6', studentId: 'st4', subjectId: 's1', type: 'exam', value: 98, maxValue: 100, weight: 0.4, date: '2025-03-01' },
  { id: 'g7', studentId: 'st4', subjectId: 's2', type: 'project', value: 95, maxValue: 100, weight: 0.3, date: '2025-03-10' },
  { id: 'g8', studentId: 'st5', subjectId: 's1', type: 'exam', value: 85, maxValue: 100, weight: 0.4, date: '2025-03-01' },
  { id: 'g9', studentId: 'st6', subjectId: 's3', type: 'exam', value: 65, maxValue: 100, weight: 0.4, date: '2025-03-01' },
  { id: 'g10', studentId: 'st6', subjectId: 's2', type: 'assignment', value: 72, maxValue: 100, weight: 0.2, date: '2025-03-05' },
]

export const mockAttendance: Attendance[] = [
  { id: 'a1', studentId: 'st1', date: '2025-03-01', status: 'present' },
  { id: 'a2', studentId: 'st2', date: '2025-03-01', status: 'present' },
  { id: 'a3', studentId: 'st3', date: '2025-03-01', status: 'late', notes: 'تأخر 10 دقائق' },
  { id: 'a4', studentId: 'st4', date: '2025-03-01', status: 'present' },
  { id: 'a5', studentId: 'st5', date: '2025-03-01', status: 'present' },
  { id: 'a6', studentId: 'st6', date: '2025-03-01', status: 'absent' },
]

export const mockLessons: LessonPlan[] = [
  {
    id: 'l1', title: 'حل المعادلات الخطية', subjectId: 's1', grade: '10', classroomId: 'c1',
    objectives: ['فهم مفهوم المعادلة الخطية', 'حل معادلات من الدرجة الأولى', 'تطبيق المعادلات في مسائل حياتية'],
    content: 'شرح مفهوم المعادلات الخطية وطرق حلها مع أمثلة تطبيقية',
    activities: [
      { type: 'lecture', description: 'شرح نظري مع أمثلة', duration: 15, order: 1 },
      { type: 'discussion', description: 'مناقشة تفاعلية', duration: 10, order: 2 },
      { type: 'group_work', description: 'حل تمارين مجموعات', duration: 20, order: 3 },
    ],
    resources: [{ title: 'شرح فيديو', url: 'https://example.com', type: 'video' }],
    assignment: { title: 'تمارين المعادلات', description: 'حل التمارين من 1 إلى 10', dueDate: '2025-03-10' },
    duration: 45, attachments: [], teacherId: 't1', status: 'completed', scheduledDate: '2025-03-01', createdAt: '2025-02-25',
  },
  {
    id: 'l2', title: 'تحليل النصوص الأدبية', subjectId: 's3', grade: '10', classroomId: 'c1',
    objectives: ['فهم عناصر النص الأدبي', 'تحليل الأسلوب البلاغي'],
    content: 'تحليل قصيدة مع شرح الصور البلاغية',
    activities: [
      { type: 'lecture', description: 'قراءة وتحليل', duration: 20, order: 1 },
      { type: 'quiz', description: 'اختبار فهم', duration: 10, order: 2 },
    ],
    resources: [{ title: 'النص الأدبي', type: 'file' }],
    duration: 45, attachments: [], teacherId: 't2', status: 'scheduled', scheduledDate: '2025-03-15', createdAt: '2025-03-01',
  },
  {
    id: 'l3', title: 'التفاعلات الكيميائية', subjectId: 's2', grade: '11', classroomId: 'c2',
    objectives: ['تصنيف التفاعلات الكيميائية', 'معادلة التفاعلات'],
    content: 'أنواع التفاعلات الكيميائية وطريقة معادلتها',
    activities: [
      { type: 'lecture', description: 'شرح أنواع التفاعلات', duration: 15, order: 1 },
      { type: 'project', description: 'تجربة عملية', duration: 30, order: 2 },
    ],
    resources: [{ title: 'دليل التجارب', type: 'file' }],
    assignment: { title: 'تقرير التجربة', description: 'كتابة تقرير عن التجربة', dueDate: '2025-03-20' },
    duration: 45, attachments: [], teacherId: 't1', status: 'draft', createdAt: '2025-03-10',
  },
]

export const mockNotifications: Notification[] = [
  { id: 'n1', type: 'grade', title: 'درجة جديدة', content: 'تم إضافة درجة جديدة في الرياضيات', priority: 'medium', recipientId: 'st1', createdAt: '2025-03-01T10:00:00' },
  { id: 'n2', type: 'attendance', title: 'تنبيه غياب', content: 'تغيب الطالب عمر حسن عن حصة العلوم', priority: 'high', recipientId: 'p2', createdAt: '2025-03-01T12:00:00' },
  { id: 'n3', type: 'assignment', title: 'واجب جديد', content: 'تم إضافة واجب جديد في مادة اللغة العربية', priority: 'low', recipientId: 'st4', createdAt: '2025-03-05T08:00:00' },
]

export const mockMessages: Message[] = [
  { id: 'm1', senderId: 'p1', recipientId: 't1', title: 'استفسار عن مستوى ابني', content: 'السلام عليكم، أريد الاستفسار عن مستوى ابني أحمد في مادة الرياضيات', createdAt: '2025-03-02T09:00:00' },
  { id: 'm2', senderId: 't1', recipientId: 'p1', title: 'رد: استفسار عن مستوى ابني', content: 'وعليكم السلام، مستوى أحمد ممتاز والحمد لله', createdAt: '2025-03-02T14:00:00', readAt: '2025-03-02T15:00:00' },
]

export function getDashboardStats(): DashboardStats {
  return {
    totalStudents: mockStudents.length,
    totalTeachers: mockTeachers.length,
    totalClassrooms: mockClassrooms.length,
    successRate: 85.5,
    studentsChange: 12,
    teachersChange: 5,
    classroomsChange: 8,
    successRateChange: 3.2,
  }
}

export function getStudentGrades(studentId: string): Grade[] {
  return mockGrades.filter(g => g.studentId === studentId)
}

export function getStudentAttendance(studentId: string): Attendance[] {
  return mockAttendance.filter(a => a.studentId === studentId)
}

export function getClassroomStudents(classroomId: string): Student[] {
  const classroom = mockClassrooms.find(c => c.id === classroomId)
  if (!classroom) return []
  return mockStudents.filter(s => classroom.students.includes(s.id))
}

export function getStudentParent(studentId: string): Parent | undefined {
  const student = mockStudents.find(s => s.id === studentId)
  if (!student) return undefined
  return mockParents.find(p => p.id === student.parentId)
}
