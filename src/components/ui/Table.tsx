import { cn } from '@/lib/utils'

interface Column<T> {
  key: string
  header: string
  render?: (item: T) => React.ReactNode
  className?: string
}

interface TableProps<T> {
  columns: Column<T>[]
  data: T[]
  onRowClick?: (item: T) => void
  className?: string
}

export function Table<T extends { id: string }>({ columns, data, onRowClick, className }: TableProps<T>) {
  return (
    <div className={cn('overflow-x-auto rounded-subcard border border-gray-200', className)}>
      <table className="w-full text-right">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            {columns.map(col => (
              <th
                key={col.key}
                className={cn('px-4 py-3 text-small font-semibold text-gray-700', col.className)}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr
              key={item.id}
              onClick={() => onRowClick?.(item)}
              className={cn(
                'border-b border-gray-100 transition-colors duration-150',
                onRowClick && 'cursor-pointer hover:bg-primary-50',
                'animate-fade-in'
              )}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              {columns.map(col => (
                <td key={col.key} className={cn('px-4 py-3 text-small text-gray-700', col.className)}>
                  {col.render ? col.render(item) : (item as any)[col.key]}
                </td>
              ))}
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8 text-center text-gray-400">
                لا توجد بيانات
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
