import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

export interface BreadcrumbItem {
  label: string
  href?: string
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 flex items-center text-xs text-charcoal-500 font-medium">
      <Link
        href="/"
        className="flex items-center gap-1 hover:text-charcoal-900 transition-colors py-1"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </Link>
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center">
          <ChevronRight className="w-3.5 h-3.5 mx-1.5 text-charcoal-300" />
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-charcoal-900 transition-colors py-1"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-charcoal-900 font-semibold truncate max-w-[200px] sm:max-w-none">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  )
}
