import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import { BookOpen, Clock, Calculator, ArrowRight } from 'lucide-react'
import { GUIDES, getGuideBySlug } from '@/data/guides'
import { getCalculatorBySlug } from '@/data/calculators'
import { constructMetadata, SITE_URL } from '@/lib/seo/metadata'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { BreadcrumbsJsonLd } from '@/components/seo/JsonLd'

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  return GUIDES.map((g) => ({
    slug: g.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const guide = getGuideBySlug(params.slug)
  if (!guide) {
    return constructMetadata({
      title: 'Guide Not Found',
      description: 'The requested guide could not be found.',
      noIndex: true,
    })
  }

  return constructMetadata({
    title: `${guide.title} — BuildCalc Guide`,
    description: guide.excerpt,
    path: `/guides/${guide.slug}`,
  })
}

export default function GuideDetailPage({ params }: PageProps) {
  const guide = getGuideBySlug(params.slug)

  if (!guide) {
    notFound()
  }

  const linkedCalc = getCalculatorBySlug(guide.calculatorSlug)

  const breadcrumbs = [
    { label: 'Guides', href: '/guides' },
    { label: guide.title },
  ]

  const jsonLdBreadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'Guides', url: `${SITE_URL}/guides` },
    { name: guide.title, url: `${SITE_URL}/guides/${guide.slug}` },
  ]

  return (
    <>
      <BreadcrumbsJsonLd items={jsonLdBreadcrumbs} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <Breadcrumbs items={breadcrumbs} />

        {/* Article Header */}
        <div className="mb-8 pb-6 border-b border-charcoal-200">
          <div className="flex items-center gap-3 text-xs text-charcoal-500 mb-3">
            <span className="font-semibold uppercase tracking-wider text-primary-700 text-[11px] px-2.5 py-0.5 rounded bg-primary-50 border border-primary-100">
              {guide.categoryName}
            </span>
            <span className="flex items-center gap-1 font-mono text-[11px]">
              <Clock className="w-3.5 h-3.5 text-charcoal-400" />
              {guide.readTime}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-charcoal-950 tracking-tight leading-tight">
            {guide.title}
          </h1>
          <p className="text-sm sm:text-base text-charcoal-600 mt-3 leading-relaxed">
            {guide.excerpt}
          </p>
        </div>

        {/* Companion Calculator Callout Card */}
        {linkedCalc && (
          <div className="my-8 p-5 rounded-2xl bg-charcoal-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md">
            <div>
              <div className="flex items-center gap-2 text-primary-400 text-xs font-mono font-bold uppercase tracking-wider mb-1">
                <Calculator className="w-4 h-4" />
                <span>Interactive Tool Available</span>
              </div>
              <h3 className="text-base font-bold text-white">
                Use the {linkedCalc.title}
              </h3>
              <p className="text-xs text-charcoal-300 mt-0.5">
                Calculate live material quantities and order margins for your exact dimensions.
              </p>
            </div>
            <Link
              href={`/calculators/${linkedCalc.slug}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white text-xs font-semibold shrink-0 transition-colors shadow-sm"
            >
              <span>Launch Calculator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

        {/* Guide Markdown-style text content */}
        <article className="prose prose-charcoal max-w-none text-charcoal-800 text-sm leading-relaxed space-y-6">
          <div
            className="space-y-4"
            dangerouslySetInnerHTML={{
              __html: guide.content
                .replace(/### (.*?)\n/g, '<h3 class="text-xl font-bold text-charcoal-950 mt-8 mb-3">$1</h3>')
                .replace(/#### (.*?)\n/g, '<h4 class="text-base font-bold text-charcoal-900 mt-6 mb-2">$1</h4>')
                .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-charcoal-950">$1</strong>')
                .replace(/\n\n/g, '</p><p class="leading-relaxed">')
                .replace(/^- (.*?)$/gm, '<li class="ml-4 list-disc">$1</li>')
                .replace(/^\d+\. (.*?)$/gm, '<li class="ml-4 list-decimal">$1</li>'),
            }}
          />
        </article>

        {/* Footer Link */}
        <div className="mt-12 pt-6 border-t border-charcoal-200 flex items-center justify-between">
          <Link
            href="/guides"
            className="text-xs font-semibold text-charcoal-600 hover:text-charcoal-950"
          >
            &larr; Back to all guides
          </Link>
          {linkedCalc && (
            <Link
              href={`/calculators/${linkedCalc.slug}`}
              className="inline-flex items-center gap-1 text-xs font-semibold text-primary-600 hover:text-primary-700"
            >
              <span>Open {linkedCalc.shortTitle || linkedCalc.title}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </div>
    </>
  )
}
