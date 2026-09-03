'use client'

import React, { useEffect, useState } from 'react'

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [isHovered, setIsHovered] = useState(false)
  const [isInput, setIsInput] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)

      const target = e.target as HTMLElement | null
      if (target) {
        const isInteractive = target.closest('a, button, [role="button"], [data-cursor="pointer"]')
        const isInputField = target.closest('input, select, textarea, [data-cursor="input"]')
        setIsHovered(!!isInteractive)
        setIsInput(!!isInputField)
      }
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <div
      className="pointer-events-none fixed z-50 transition-transform duration-75 ease-out will-change-transform hidden md:block"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Outer Precision Ring */}
      <div
        className={`relative flex items-center justify-center rounded-full transition-all duration-150 ${
          isInput
            ? 'w-6 h-6 border-2 border-amber-500 bg-amber-500/10 scale-110'
            : isHovered
            ? 'w-8 h-8 border-2 border-primary-600 bg-primary-600/10 scale-125 shadow-[0_0_12px_rgba(21,94,239,0.35)]'
            : 'w-5 h-5 border border-charcoal-700/60 bg-transparent'
        }`}
      >
        {/* Center Target Crosshair Dot */}
        <div
          className={`w-1.5 h-1.5 rounded-full transition-colors ${
            isInput ? 'bg-amber-600' : isHovered ? 'bg-primary-600' : 'bg-charcoal-900'
          }`}
        />

        {/* Precision Measurement Reticle Ticks when Hovering */}
        {isHovered && (
          <>
            <span className="absolute -top-1 w-0.5 h-1 bg-primary-600" />
            <span className="absolute -bottom-1 w-0.5 h-1 bg-primary-600" />
            <span className="absolute -left-1 h-0.5 w-1 bg-primary-600" />
            <span className="absolute -right-1 h-0.5 w-1 bg-primary-600" />
          </>
        )}
      </div>
    </div>
  )
}
