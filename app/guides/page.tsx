import Link from 'next/link'
import { BookOpen, Clock, ArrowRight } from 'lucide-react'
import { GUIDES } from '@/data/guides'
import { constructMetadata } from '@/lib/seo/metadata'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'

export const metadata = constructMetadata({
  title: 'Construction & Building Guides — Formulas & Best Practices',
  description: 'Practical guides on calculating concrete volume, construction costs per square foot, patio slopes, stone wall materials, and mulch.',
  path: '/guides',
})

export default function GuidesDirectoryPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <Breadcrumbs items={[{ label: 'Guides' }]} />

      <div className="mb-10 pb-6 border-b border-charcoal-200">
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-primary-600 mb-1">
          <BookOpen className="w-4 h-4" />
          <span>Knowledge Base</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-charcoal-950 tracking-tight">
          Construction & Material Guides
        </h1>
        <p className="text-sm sm:text-base text-charcoal-600 mt-2 max-w-2xl leading-relaxed">
          Learn the trade formulas, compaction standards, waste factors, and installation principles behind real-world calculations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {GUIDES.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="group flex flex-col justify-between p-6 rounded-2xl border border-charcoal-200 bg-surface hover:border-primary-300 hover:shadow-card-hover transition-all duration-200"
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

              <h2 className="text-base font-bold text-charcoal-900 group-hover:text-primary-600 transition-colors mb-2">
                {guide.title}
              </h2>
              <p className="text-xs text-charcoal-500 leading-relaxed line-clamp-3">
                {guide.excerpt}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-charcoal-100 flex items-center justify-between text-xs font-semibold text-charcoal-700 group-hover:text-primary-600">
              <span>Read Guide</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
