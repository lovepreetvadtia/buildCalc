import React from 'react'

export function Badge({
  children,
  variant = 'neutral',
  className = '',
}: {
  children: React.ReactNode
  variant?: 'primary' | 'neutral' | 'success' | 'amber'
  className?: string
}) {
  const styles = {
    primary: 'bg-primary-50 text-primary-700 border-primary-200',
    neutral: 'bg-charcoal-100 text-charcoal-700 border-charcoal-200',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
  }

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold border tracking-wide uppercase ${styles[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
