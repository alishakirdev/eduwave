# PROJECT_MAP - EduWave

> آخر تحديث: 2026-05-15

## [TECH_STACK]

| الطبقة | التقنية | الإصدار |
|--------|---------|---------|
| Framework | Next.js | 16.2.6 |
| Runtime | React | 19.2.6 |
| Language | TypeScript | 5.9.3 |
| Styling | Tailwind CSS | 3.4.19 |
| Charts | Recharts | 2.15.4 |
| Icons | Lucide React | 0.400.0 |
| PWA | next-pwa | 5.6.0 (production only) |
| Analytics | @vercel/analytics | 2.0.1 |
| Speed Insights | @vercel/speed-insights | 2.0.0 |
| Utilities | clsx + tailwind-merge | latest |
| Package Manager | npm | 10.9.2 |
| Node.js | Node | 22.14.0 |

## [ARCHITECTURE]

```
src/
├── app/                          # Next.js App Router (RSC by default)
│   ├── layout.tsx                # Root layout - RTL, Tajawal font, PWA meta
│   ├── globals.css               # Tailwind + custom utility classes
│   ├── page.tsx                  # → redirect /login
│   ├── loading.tsx               # Global loading spinner
│   ├── login/page.tsx            # Login form (client component)
│   ├── dashboard/
│   │   ├── layout.tsx            # DashboardLayout wrapper
│   │   ├── page.tsx              # → redirect based on role
│   │   ├── admin/page.tsx        # Admin dashboard (stats + charts)
│   │   ├── teacher/page.tsx      # Teacher dashboard (classes + attendance)
│   │   ├── student/page.tsx      # Student dashboard (grades + schedule)
│   │   └── parent/page.tsx       # Parent dashboard (children + alerts)
│   ├── students/
│   │   └── page.tsx + [id]       # Student list + detail
│   ├── teachers/page.tsx         # Teacher cards
│   ├── lessons/
│   │   └── page.tsx + new/       # Lesson list + 6-step wizard
│   ├── parents/
│   │   └── page.tsx + [id]       # Parent list + detail
│   ├── schedule/page.tsx         # Weekly schedule grid
│   ├── messages/page.tsx         # Direct messages
│   └── settings/page.tsx         # Settings (general, notifications, security, appearance)
├── components/
│   ├── layout/                   # Sidebar, Header, DashboardLayout
│   ├── ui/                       # Button, Card, Input, Badge, Avatar, Table, Modal, Tabs, StatCard
│   ├── charts/                   # LineChart, BarChart (Recharts wrappers)
│   └── students/                 # StudentFilters
├── lib/
│   ├── utils.ts                  # cn(), formatDate(), color helpers
│   └── data.ts                   # Mock data store (students, teachers, grades, etc.)
├── store/
│   └── auth.ts                   # Simple auth (login/logout/getCurrentUser)
└── types/
    └── index.ts                  # All TypeScript interfaces
```

## [SYSTEM_FLOW]

### رحلة المستخدم - تسجيل الدخول
```
/ → redirect → /login → authenticate → redirect based on role:
                                       ├── admin → /dashboard/admin
                                       ├── teacher → /dashboard/teacher
                                       ├── student → /dashboard/student
                                       └── parent → /dashboard/parent
```

### تدفق البيانات (مؤقت - Mock Data)
```
mock data (lib/data.ts) → Client Components → UI Rendering
                                            ├── StatCard + Charts (Recharts)
                                            ├── Tables + Cards
                                            └── Detail pages
```

### خطط الدروس - Wizard Flow
```
/lessons → list all plans → /lessons/new → 6-step wizard:
  1. Basic Info (title, subject, grade, classroom, duration)
  2. Objectives (dynamic list)
  3. Content (textarea)
  4. Activities (dynamic list with type/duration)
  5. Resources (links/files/videos)
  6. Assignment (optional title, description, due date)
  → Save as Draft or Schedule
```

## [ORPHANS & PENDING]

| المعرف | العنصر | الحالة | ملاحظات |
|--------|--------|--------|---------|
| PWA-01 | next-pwa في الإنتاج | معلق | يحتاج اختبار build production مع next-pwa |
| API-01 | API endpoints حقيقية | معلق | حالياً mock data |
| AUTH-01 | مصادقة حقيقية (JWT/Session) | معلق | حالياً localStorage mock |
| DB-01 | قاعدة بيانات (PostgreSQL/MongoDB) | معلق | |
| TEST-01 | اختبارات تلقائية | معلق | |
| DEPLOY-01 | ربط GitHub مع Vercel | معلق | git remote جاهز، يحتاج ربط من Vercel dashboard |

## [VERIFIABLE GOALS]

- [x] Login page مع مصادقة وهمية (4 أدوار)
- [x] Dashboard لكل دور (Admin, Teacher, Student, Parent)
- [x] إدارة الطلاب (قائمة + تفاصيل مع رسوم بيانية)
- [x] إدارة المعلمين (بطاقات مع المواد والفصول)
- [x] خطط الدروس (قائمة + wizard 6 خطوات)
- [x] أولياء الأمور (قائمة + تفاصيل مع أبناء)
- [x] الجدول الدراسي (شبكي 5 أيام)
- [x] الرسائل
- [x] الإعدادات (عام، إشعارات، أمان، مظهر تفاعلي)
- [x] PWA manifest
- [x] Vercel Analytics + Speed Insights
- [x] نشر على Vercel (https://eduwave-delta.vercel.app)
