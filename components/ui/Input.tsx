import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  unit?: string
  helpText?: string
  error?: string
}

export function Input({
  label,
  unit,
  helpText,
  error,
  className = '',
  id,
  ...props
}: InputProps) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-1.5"
        >
          {label}
        </label>
      )}
      <div className="relative rounded-lg shadow-sm">
        <input
          id={inputId}
          className={`w-full rounded-lg border bg-surface px-3 py-2 text-sm text-charcoal-900 transition-colors placeholder:text-charcoal-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 ${
            unit ? 'pr-12' : ''
          } ${error ? 'border-red-500 ring-1 ring-red-500' : 'border-charcoal-200'} ${className}`}
          {...props}
        />
        {unit && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <span className="text-xs font-medium text-charcoal-400">{unit}</span>
          </div>
        )}
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
