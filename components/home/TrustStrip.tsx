import React from 'react'
import { Zap, Unlock, Globe2, Ruler } from 'lucide-react'

export function TrustStrip() {
  const items = [
    {
      icon: Unlock,
      title: 'Free to use',
      description: 'No account or subscription required for calculations.',
    },
    {
      icon: Ruler,
      title: 'Built for real projects',
      description: 'Practical inputs matching actual job-site measurements.',
    },
    {
      icon: Globe2,
      title: 'Multiple units',
      description: 'Seamless switching between Imperial and Metric units.',
    },
    {
      icon: Zap,
      title: 'Fast results',
      description: 'Zero server roundtrips; calculations happen instantly.',
    },
  ]

  return (
    <section className="border-y border-charcoal-200/80 bg-surface py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((item, idx) => {
            const Icon = item.icon
            return (
              <div key={idx} className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-charcoal-50 text-charcoal-800 border border-charcoal-200 shrink-0">
                  <Icon className="w-4 h-4 text-primary-600" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-charcoal-900">{item.title}</h4>
                  <p className="text-xs text-charcoal-500 mt-0.5 leading-snug">
                    {item.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
