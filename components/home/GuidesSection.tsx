import React from 'react'
import Link from 'next/link'
import { BookOpen, ArrowRight, Clock } from 'lucide-react'
import { GUIDES } from '@/data/guides'

export function GuidesSection() {
  const guides = GUIDES.slice(0, 3)

  return (
    <section className="py-16 md:py-24 bg-surface border-t border-charcoal-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-4 border-b border-charcoal-200">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-primary-600 mb-1">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Educational Guides</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-charcoal-950 tracking-tight">
              Understand the numbers before you build
            </h2>
            <p className="text-sm text-charcoal-500 mt-1">
              Clear trade formulas, sub-grade preparation rules, and ordering guidelines.
            </p>
          </div>
          <Link
            href="/guides"
            className="mt-4 sm:mt-0 inline-flex items-center gap-1.5 text-xs font-bold text-primary-600 hover:text-primary-700 group"
          >
            <span>Browse all guides</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="group flex flex-col justify-between p-6 rounded-2xl border border-charcoal-200 bg-background hover:border-primary-300 hover:shadow-card-hover transition-all duration-200"
            >
              <div>
                <div className="flex items-center justify-between mb-3 text-xs text-charcoal-500">
                  <span className="font-semibold uppercase tracking-wider text-primary-700 text-[10px] px-2 py-0.5 rounded bg-primary-50">
                    {guide.categoryName}
                  </span>
                  <span className="flex items-center gap-1 font-mono text-[11px]">
                    <Clock className="w-3 h-3 text-charcoal-400" />
                    {guide.readTime}
                  </span>
                </div>

                <h3 className="text-base font-bold text-charcoal-900 group-hover:text-primary-600 transition-colors mb-2 line-clamp-2">
                  {guide.title}
                </h3>
                <p className="text-xs text-charcoal-500 leading-relaxed line-clamp-3">
                  {guide.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-charcoal-200/60 flex items-center justify-between text-xs font-semibold text-charcoal-700 group-hover:text-primary-600">
                <span>Read Full Guide</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
