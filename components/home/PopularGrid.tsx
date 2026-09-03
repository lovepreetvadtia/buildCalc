import React from 'react'
import Link from 'next/link'
import { ArrowRight, Sparkles, Ruler } from 'lucide-react'
import { getPopularCalculators } from '@/data/calculators'
import { Icon } from '../ui/Icon'

export function PopularGrid() {
  const popularTools = getPopularCalculators().slice(0, 6)

  return (
    <section id="popular" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-charcoal-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-primary-600 mb-1">
            <Ruler className="w-3.5 h-3.5" />
            <span>POPULAR UTILITIES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-charcoal-950 tracking-tight">
            Start with a calculator
          </h2>
          <p className="text-sm text-charcoal-500 mt-1">
            Quick answers for the measurements and estimates you need most.
          </p>
        </div>
        <Link
          href="/calculators"
          className="mt-4 sm:mt-0 inline-flex items-center gap-1.5 text-xs font-bold text-primary-600 hover:text-primary-700 group"
        >
          <span>View all 12 calculators</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Grid of Featured Cards with Hover-Lift and Technical Border Motifs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {popularTools.map((calc, idx) => {
          const isFlagship = idx < 2
          return (
            <Link
              key={calc.slug}
              href={`/calculators/${calc.slug}`}
              className={`hover-lift group relative flex flex-col justify-between p-6 rounded-2xl border bg-surface transition-all duration-200 overflow-hidden ${
                isFlagship
                  ? 'border-charcoal-300 ring-1 ring-charcoal-200/80 shadow-md'
                  : 'border-charcoal-200 shadow-subtle'
              }`}
            >
              {/* Subtle top indicator bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-primary-600 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Header: Icon & Category */}
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-charcoal-50 text-charcoal-900 border border-charcoal-200 group-hover:bg-primary-600 group-hover:text-white group-hover:border-primary-600 transition-all shadow-sm">
                    <Icon name={calc.icon} className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-charcoal-100 text-charcoal-700 group-hover:bg-primary-50 group-hover:text-primary-800 transition-colors">
                    {calc.categoryName}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-base font-bold text-charcoal-900 group-hover:text-primary-600 transition-colors mb-2">
                  {calc.title}
                </h3>
                <p className="text-xs text-charcoal-500 leading-relaxed line-clamp-2 mb-6">
                  {calc.shortDescription}
                </p>
              </div>

              {/* Card Footer: Action */}
              <div className="pt-4 border-t border-charcoal-100 flex items-center justify-between">
                <span className="text-[11px] font-mono text-charcoal-400">
                  /{calc.slug.replace('-calculator', '')}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-charcoal-900 group-hover:text-primary-600">
                  <span>Calculate</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
