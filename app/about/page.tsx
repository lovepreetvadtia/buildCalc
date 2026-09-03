import Link from 'next/link'
import { Hammer, ShieldCheck, Ruler, ArrowRight, Zap, Target } from 'lucide-react'
import { constructMetadata } from '@/lib/seo/metadata'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'

export const metadata = constructMetadata({
  title: 'About BuildCalc — Engineered Construction Utilities',
  description: 'Learn why we created BuildCalc to provide accurate, transparent, and fast construction and building calculations for professionals and homeowners.',
  path: '/about',
})

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <Breadcrumbs items={[{ label: 'About' }]} />

      <div className="mb-10 pb-6 border-b border-charcoal-200">
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-primary-600 mb-1">
          <Hammer className="w-4 h-4" />
          <span>Our Mission</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-charcoal-950 tracking-tight">
          About BuildCalc
        </h1>
        <p className="text-sm sm:text-base text-charcoal-600 mt-2 leading-relaxed">
          Practical calculators for real-world building, remodeling, and landscaping projects.
        </p>
      </div>

      <div className="prose prose-charcoal max-w-none text-charcoal-800 text-sm leading-relaxed space-y-6">
        <p>
          Construction estimation is often plagued by clunky spreadsheets, bloated software requiring expensive logins, or simplistic ad-farm widgets that hide their underlying assumptions.
        </p>
        <p>
          <strong>BuildCalc</strong> was engineered to bridge the gap between heavy enterprise software and simple pocket estimation. We provide transparent, fast, and mathematically sound calculation tools that run directly in your browser.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8 not-prose">
          <div className="p-5 rounded-xl border border-charcoal-200 bg-surface shadow-subtle">
            <div className="w-9 h-9 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center mb-3">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-charcoal-900 text-sm mb-1">Practical Accuracy</h3>
            <p className="text-xs text-charcoal-600 leading-relaxed">
              Every formula accounts for real-world job site conditions, including compaction settling, cutting waste, and sub-grade variations.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-charcoal-200 bg-surface shadow-subtle">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-charcoal-900 text-sm mb-1">Formula Transparency</h3>
            <p className="text-xs text-charcoal-600 leading-relaxed">
              No black-box math. We publish full formulas, step-by-step variables, and code notes on every calculator page.
            </p>
          </div>
        </div>

        <h3 className="text-xl font-bold text-charcoal-950 pt-4">Who Is BuildCalc For?</h3>
        <ul className="list-disc list-inside space-y-1 text-charcoal-700">
          <li><strong>General Contractors & Builders:</strong> Quick field estimates for concrete pours, gravel tonnage, and budget cross-checks.</li>
          <li><strong>Homeowners & DIY Builders:</strong> Planning patio drainage, shiplap accent walls, deck footings, or mulch refreshes.</li>
          <li><strong>Architects & Project Managers:</strong> Rough order-of-magnitude (ROM) cost estimation per square foot.</li>
        </ul>
      </div>

      <div className="mt-12 pt-6 border-t border-charcoal-200 flex items-center justify-between">
        <Link
          href="/calculators"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-charcoal-900 hover:bg-primary-600 text-white text-xs font-semibold transition-colors"
        >
          <span>Explore All Calculators</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <Link
          href="/contact"
          className="text-xs font-semibold text-charcoal-600 hover:text-charcoal-950"
        >
          Have a suggestion? Contact us &rarr;
        </Link>
      </div>
    </div>
  )
}
