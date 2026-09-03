import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { CALCULATORS, getCalculatorBySlug } from '@/data/calculators'
import { constructMetadata } from '@/lib/seo/metadata'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { CalculatorJsonLd, BreadcrumbsJsonLd } from '@/components/seo/JsonLd'
import { CalculatorToolRouter } from '@/components/calculators/CalculatorToolRouter'
import { FormulaSection } from '@/components/calculators/FormulaSection'
import { RelatedCalculators } from '@/components/calculators/RelatedCalculators'
import { AdSlot } from '@/components/ads/AdSlot'

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  return CALCULATORS.map((calc) => ({
    slug: calc.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const calc = getCalculatorBySlug(params.slug)
  if (!calc) {
    return constructMetadata({
      title: 'Calculator Not Found',
      description: 'The requested construction calculator could not be found.',
      noIndex: true,
    })
  }

  return constructMetadata({
    title: calc.seoTitle,
    description: calc.seoDescription,
    path: `/calculators/${calc.slug}`,
  })
}

export default function CalculatorPage({ params }: PageProps) {
  const calc = getCalculatorBySlug(params.slug)

  if (!calc) {
    notFound()
  }

  const breadcrumbItems = [
    { label: 'Calculators', href: '/calculators' },
    { label: calc.categoryName, href: `/categories/${calc.category}` },
    { label: calc.shortTitle || calc.title },
  ]

  const jsonLdBreadcrumbs = [
    { name: 'Home', url: 'https://buildcalc.com' },
    { name: 'Calculators', url: 'https://buildcalc.com/calculators' },
    { name: calc.categoryName, url: `https://buildcalc.com/categories/${calc.category}` },
    { name: calc.title, url: `https://buildcalc.com/calculators/${calc.slug}` },
  ]

  return (
    <>
      <CalculatorJsonLd
        title={calc.title}
        description={calc.shortDescription}
        url={`https://buildcalc.com/calculators/${calc.slug}`}
        category={calc.categoryName}
      />
      <BreadcrumbsJsonLd items={jsonLdBreadcrumbs} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <Breadcrumbs items={breadcrumbItems} />

        {/* Page Title & Intro */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono font-bold uppercase tracking-wider text-primary-700 bg-primary-50 border border-primary-100 mb-2">
            <span>{calc.categoryName}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-charcoal-950 tracking-tight">
            {calc.title}
          </h1>
          <p className="text-sm sm:text-base text-charcoal-600 mt-2 max-w-3xl leading-relaxed">
            {calc.shortDescription}
          </p>
        </div>

        {/* Ad slot before tool if enabled */}
        <AdSlot slotId="calc-top" format="horizontal" />

        {/* Main Interactive Calculator Tool (2-column layout) */}
        <div className="my-6">
          <CalculatorToolRouter slug={calc.slug} />
        </div>

        {/* Transparent Formula & Methodology Section */}
        <FormulaSection metadata={calc} />

        {/* Mid-content Ad slot if enabled */}
        <AdSlot slotId="calc-middle" format="rectangle" />

        {/* Internal Linking: Related Tools & Guide */}
        <RelatedCalculators
          relatedSlugs={calc.relatedSlugs}
          guideSlug={calc.guideSlug}
        />
      </div>
    </>
  )
}
