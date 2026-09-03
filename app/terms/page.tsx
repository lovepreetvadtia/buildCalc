import { constructMetadata } from '@/lib/seo/metadata'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'

export const metadata = constructMetadata({
  title: 'Terms of Service — BuildCalc',
  description: 'Terms of Service for BuildCalc website and calculation tools.',
  path: '/terms',
})

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <Breadcrumbs items={[{ label: 'Terms of Service' }]} />

      <div className="mb-8 pb-4 border-b border-charcoal-200">
        <h1 className="text-3xl font-extrabold text-charcoal-950 tracking-tight">
          Terms of Service
        </h1>
        <p className="text-xs text-charcoal-500 mt-1">Last updated: September 2026</p>
      </div>

      <div className="prose prose-charcoal max-w-none text-charcoal-800 text-xs sm:text-sm leading-relaxed space-y-5">
        <h3 className="text-base font-bold text-charcoal-950">1. Acceptance of Terms</h3>
        <p>
          By accessing and using <strong>BuildCalc</strong> (https://buildcalc.com), you accept and agree to be bound by the terms and provisions of this agreement.
        </p>

        <h3 className="text-base font-bold text-charcoal-950">2. Informational & Estimation Purpose Only</h3>
        <p>
          The tools, formulas, figures, and materials estimations provided on this website are for conceptual planning, budgetary estimation, and educational purposes only. BuildCalc does not guarantee absolute mathematical or structural suitability for specific site conditions.
        </p>

        <h3 className="text-base font-bold text-charcoal-950">3. Limitation of Liability</h3>
        <p>
          In no event shall BuildCalc, its owners, developers, or affiliates be liable for any direct, indirect, incidental, consequential, or exemplary damages resulting from the use or inability to use the calculations, or from material purchase shortages, structural deficiencies, or building code non-compliance.
        </p>

        <h3 className="text-base font-bold text-charcoal-950">4. Modifications</h3>
        <p>
          BuildCalc reserves the right to revise these terms of service at any time without notice. By using this website you are agreeing to be bound by the then-current version of these terms of service.
        </p>
      </div>
    </div>
  )
}
