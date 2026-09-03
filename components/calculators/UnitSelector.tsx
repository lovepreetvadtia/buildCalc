'use client'

import React from 'react'
import { UnitSystem } from '@/lib/calculators/types'

export function UnitSelector({
  value,
  onChange,
}: {
  value: UnitSystem
  onChange: (system: UnitSystem) => void
}) {
  return (
    <div className="inline-flex rounded-lg border border-charcoal-200 bg-charcoal-50 p-0.5 text-xs font-semibold">
      <button
        type="button"
        onClick={() => onChange('imperial')}
        className={`px-3 py-1 rounded-md transition-colors ${
          value === 'imperial'
            ? 'bg-surface text-charcoal-900 shadow-sm border border-charcoal-200'
            : 'text-charcoal-500 hover:text-charcoal-800'
        }`}
      >
        Imperial (ft / in / yd)
      </button>
      <button
        type="button"
        onClick={() => onChange('metric')}
        className={`px-3 py-1 rounded-md transition-colors ${
          value === 'metric'
            ? 'bg-surface text-charcoal-900 shadow-sm border border-charcoal-200'
            : 'text-charcoal-500 hover:text-charcoal-800'
        }`}
      >
        Metric (m / cm / mm)
      </button>
    </div>
  )
}
