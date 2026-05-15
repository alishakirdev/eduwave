export type UserRole = 'admin' | 'teacher' | 'student' | 'parent'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  phone?: string
  createdAt: string
  lastLogin?: string
}

export interface Student extends User {
  role: 'student'
  grade: string
  section: string
  parentId: string
  attendanceRate: number
  gpa: number
  status: 'active' | 'graduated' | 'suspended'
  subjects: string[]
}

export interface Teacher extends User {
  role: 'teacher'
  subjects: string[]
  classrooms: string[]
  specialization: string
}

export interface Parent extends User {
  role: 'parent'
  childrenIds: string[]
}

export interface Subject {
  id: string
  name: string
  targetGrade: string
  description: string
  teachers: string[]
  color: string
}

export interface Classroom {
  id: string
  name: string
  grade: string
  students: string[]
  subjects: string[]
  homeroomTeacher: string
}

export interface LessonPlan {
  id: string
  title: string
  subjectId: string
  grade: string
  classroomId: string
  objectives: string[]
  content: string
  activities: Activity[]
  resources: Resource[]
  assignment?: Assignment
  duration: number
  attachments: string[]
  teacherId: string
  status: 'draft' | 'scheduled' | 'completed'
  scheduledDate?: string
  createdAt: string
}

export interface Activity {
  type: 'lecture' | 'discussion' | 'group_work' | 'quiz' | 'project'
  description: string
  duration: number
  order: number
}

export interface Resource {
  title: string
  url?: string
  type: 'link' | 'file' | 'video'
}

export interface Assignment {
  title: string
  description: string
  dueDate: string
}

export interface Grade {
  id: string
  studentId: string
  subjectId: string
  type: 'exam' | 'assignment' | 'project' | 'participation'
  value: number
  maxValue: number
  weight: number
  date: string
  notes?: string
}

export interface Attendance {
  id: string
  studentId: string
  date: string
  status: 'present' | 'absent' | 'late' | 'excused'
  notes?: string
}

export interface Notification {
  id: string
  type: string
  title: string
  content: string
  priority: 'low' | 'medium' | 'high'
  recipientId: string
  relatedEntityId?: string
  readAt?: string
  createdAt: string
}

export interface Message {
  id: string
  senderId: string
  recipientId: string
  title: string
  content: string
  readAt?: string
  createdAt: string
}

export interface DashboardStats {
  totalStudents: number
  totalTeachers: number
  totalClassrooms: number
  successRate: number
  studentsChange: number
  teachersChange: number
  classroomsChange: number
  successRateChange: number
}
