import React from 'react'

interface Option {
  label: string
  value: string | number
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: Option[]
  helpText?: string
  error?: string
}

export function Select({
  label,
  options,
  helpText,
  error,
  className = '',
  id,
  ...props
}: SelectProps) {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={selectId}
          className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-1.5"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          className={`w-full appearance-none rounded-lg border bg-surface px-3 py-2 text-sm text-charcoal-900 transition-colors focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 ${
            error ? 'border-red-500 ring-1 ring-red-500' : 'border-charcoal-200'
          } ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={String(opt.value)} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-charcoal-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {helpText && !error && (
        <p className="mt-1 text-xs text-charcoal-500">{helpText}</p>
      )}
      {error && (
        <p className="mt-1 text-xs font-medium text-red-600">{error}</p>
      )}
    </div>
  )
}
