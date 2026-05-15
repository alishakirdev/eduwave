'use client'
import { useState, useCallback } from 'react'
import { Student } from '@/types'
import { mockStudents } from '@/lib/data'

const STORAGE_KEY = 'eduwave_students'

function loadStudents(): Student[] {
  if (typeof window === 'undefined') return mockStudents
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
  } catch {}
  return mockStudents
}

export function useStudents() {
  const [students, setStudents] = useState<Student[]>(loadStudents)

  const persist = useCallback((list: Student[]) => {
    setStudents(list)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  }, [])

  const addStudent = useCallback((data: Omit<Student, 'id' | 'createdAt' | 'role' | 'attendanceRate' | 'gpa' | 'status'>) => {
    const newStudent: Student = {
      ...data,
      id: `st${Date.now()}`,
      role: 'student',
      status: 'active',
      attendanceRate: 100,
      gpa: 0,
      createdAt: new Date().toISOString().split('T')[0],
    }
    persist([...students, newStudent])
    return newStudent
  }, [students, persist])

  const updateStudent = useCallback((id: string, data: Partial<Student>) => {
    persist(students.map(s => s.id === id ? { ...s, ...data } : s))
  }, [students, persist])

  const removeStudent = useCallback((id: string) => {
    persist(students.filter(s => s.id !== id))
  }, [students, persist])

  const getStudent = useCallback((id: string) => {
    return students.find(s => s.id === id) || mockStudents.find(s => s.id === id)
  }, [students])

  const resetStudents = useCallback(() => {
    persist(mockStudents)
  }, [persist])

  return { students, addStudent, updateStudent, removeStudent, getStudent, resetStudents }
}
