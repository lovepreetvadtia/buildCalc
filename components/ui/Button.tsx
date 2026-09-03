import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'
  
  const variantStyles = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 shadow-sm active:translate-y-px',
    secondary: 'bg-charcoal-900 text-white hover:bg-charcoal-800 shadow-sm active:translate-y-px',
    outline: 'border border-charcoal-200 bg-surface text-charcoal-800 hover:bg-charcoal-50 hover:border-charcoal-300',
    ghost: 'text-charcoal-700 hover:bg-charcoal-100 hover:text-charcoal-900',
  }

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-5 py-2.5 gap-2.5',
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
