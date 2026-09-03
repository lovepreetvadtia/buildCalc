import React from 'react'
import Link from 'next/link'
import { ArrowRight, Calculator, BookOpen } from 'lucide-react'
import { CALCULATORS, getCalculatorBySlug } from '@/data/calculators'
import { getGuideBySlug } from '@/data/guides'
import { Icon } from '../ui/Icon'

export function RelatedCalculators({
  relatedSlugs,
  guideSlug,
}: {
  relatedSlugs: string[]
  guideSlug?: string
}) {
  const relatedTools = relatedSlugs
    .map((slug) => getCalculatorBySlug(slug))
    .filter(Boolean) as typeof CALCULATORS

  const guide = guideSlug ? getGuideBySlug(guideSlug) : undefined

  return (
    <div className="mt-12 pt-8 border-t border-charcoal-200/80 space-y-6">
      <h3 className="text-lg font-bold text-charcoal-950">
        Related Construction Tools & Guides
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {relatedTools.slice(0, 3).map((tool) => (
          <Link
            key={tool.slug}
            href={`/calculators/${tool.slug}`}
            className="group flex flex-col justify-between p-4 rounded-xl border border-charcoal-200 bg-surface hover:border-primary-300 hover:shadow-card transition-all"
          >
            <div>
              <div className="flex items-center gap-2 mb-2 text-primary-600">
                <Icon name={tool.icon} className="w-4 h-4" />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-charcoal-500">
                  {tool.categoryName}
                </span>
              </div>
              <h4 className="text-sm font-bold text-charcoal-900 group-hover:text-primary-600 transition-colors">
                {tool.title}
              </h4>
            </div>
            <div className="mt-3 pt-2 border-t border-charcoal-100 flex items-center justify-between text-xs font-semibold text-charcoal-600 group-hover:text-primary-600">
              <span>Open Tool</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}

        {guide && (
          <Link
            href={`/guides/${guide.slug}`}
            className="group flex flex-col justify-between p-4 rounded-xl border border-primary-200 bg-primary-50/40 hover:bg-primary-50/80 transition-all"
          >
            <div>
              <div className="flex items-center gap-2 mb-2 text-primary-700">
                <BookOpen className="w-4 h-4" />
                <span className="text-[10px] font-semibold uppercase tracking-wider">
                  Companion Guide
                </span>
              </div>
              <h4 className="text-sm font-bold text-charcoal-900 group-hover:text-primary-700 transition-colors">
                {guide.title}
              </h4>
              <p className="text-xs text-charcoal-600 mt-1 line-clamp-2">
                {guide.excerpt}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-primary-100 flex items-center justify-between text-xs font-semibold text-primary-700">
              <span>Read Guide</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        )}
      </div>
    </div>
  )
}
