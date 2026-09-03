import React from 'react'
import Link from 'next/link'
import { ArrowRight, Layers, Hammer } from 'lucide-react'
import { CATEGORIES } from '@/data/categories'
import { CALCULATORS } from '@/data/calculators'
import { Icon } from '../ui/Icon'

export function CategorySection() {
  return (
    <section id="categories" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Title */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-charcoal-100 text-charcoal-800 text-xs font-mono font-bold uppercase tracking-wider mb-2">
          <Hammer className="w-3.5 h-3.5 text-primary-600" />
          <span>BROWSE BY TRADE</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-charcoal-950 tracking-tight">
          Explore by Project Category
        </h2>
        <p className="text-sm text-charcoal-500 mt-2">
          Specialized calculation engines grouped for general contractors, tradespeople, and DIY builders.
        </p>
      </div>

      {/* Grid of 5 Category Cards with Hover-Lift */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES.map((cat) => {
          const count = CALCULATORS.filter((c) => c.category === cat.slug).length

          return (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="hover-lift group flex flex-col justify-between p-6 rounded-2xl border border-charcoal-200 bg-surface hover:border-primary-300 transition-all shadow-subtle relative overflow-hidden"
            >
              {/* Subtle CAD grid corner */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-blueprint-grid opacity-20 pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-charcoal-50 text-charcoal-900 border border-charcoal-200 flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white group-hover:border-primary-600 transition-all shadow-sm">
                    <Icon name={cat.icon} className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-charcoal-100 text-charcoal-700 group-hover:bg-primary-100 group-hover:text-primary-800 transition-colors">
                    {count} {count === 1 ? 'tool' : 'tools'}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-charcoal-900 group-hover:text-primary-600 transition-colors mb-2">
                  {cat.name}
                </h3>
                <p className="text-xs text-charcoal-500 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-charcoal-100 flex items-center justify-between text-xs font-bold text-charcoal-700 group-hover:text-primary-600">
                <span>View {cat.name} Calculators</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
