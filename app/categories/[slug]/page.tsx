import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import { ArrowRight, Layers } from 'lucide-react'
import { CATEGORIES } from '@/data/categories'
import { CALCULATORS, getCalculatorsByCategory } from '@/data/calculators'
import { constructMetadata } from '@/lib/seo/metadata'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { BreadcrumbsJsonLd } from '@/components/seo/JsonLd'
import { Icon } from '@/components/ui/Icon'

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    slug: cat.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const cat = CATEGORIES.find((c) => c.slug === params.slug)
  if (!cat) {
    return constructMetadata({
      title: 'Category Not Found',
      description: 'The requested category could not be found.',
      noIndex: true,
    })
  }

  return constructMetadata({
    title: `${cat.name} Calculators — Construction & Building Tools`,
    description: `Free ${cat.name.toLowerCase()} calculators for real-world projects. ${cat.description}`,
    path: `/categories/${cat.slug}`,
  })
}

export default function CategoryPage({ params }: PageProps) {
  const cat = CATEGORIES.find((c) => c.slug === params.slug)

  if (!cat) {
    notFound()
  }

  const categoryCalculators = getCalculatorsByCategory(cat.slug)

  const breadcrumbs = [
    { label: 'Categories', href: '/#categories' },
    { label: cat.name },
  ]

  const jsonLdBreadcrumbs = [
    { name: 'Home', url: 'https://buildcalc.com' },
    { name: 'Categories', url: 'https://buildcalc.com/#categories' },
    { name: cat.name, url: `https://buildcalc.com/categories/${cat.slug}` },
  ]

  return (
    <>
      <BreadcrumbsJsonLd items={jsonLdBreadcrumbs} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <Breadcrumbs items={breadcrumbs} />

        {/* Category Header */}
        <div className="mb-10 pb-6 border-b border-charcoal-200">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-10 h-10 rounded-xl bg-charcoal-900 text-white flex items-center justify-center">
              <Icon name={cat.icon} className="w-5 h-5 text-primary-400" />
            </div>
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-charcoal-500">
                Trade Category
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-charcoal-950 tracking-tight">
                {cat.name} Calculators
              </h1>
            </div>
          </div>
          <p className="text-sm sm:text-base text-charcoal-600 mt-2 max-w-2xl leading-relaxed">
            {cat.description}
          </p>
        </div>

        {/* Grid of calculators in this category */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryCalculators.map((calc) => (
            <Link
              key={calc.slug}
              href={`/calculators/${calc.slug}`}
              className="group flex flex-col justify-between p-6 rounded-2xl border border-charcoal-200 bg-surface hover:border-primary-300 hover:shadow-card-hover transition-all duration-200"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-charcoal-50 text-charcoal-900 border border-charcoal-200 group-hover:bg-primary-50 group-hover:text-primary-700 group-hover:border-primary-200 transition-colors">
                    <Icon name={calc.icon} className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded bg-charcoal-100 text-charcoal-600">
                    {cat.name}
                  </span>
                </div>

                <h2 className="text-base font-bold text-charcoal-900 group-hover:text-primary-600 transition-colors mb-2">
                  {calc.title}
                </h2>
                <p className="text-xs text-charcoal-500 leading-relaxed line-clamp-3">
                  {calc.shortDescription}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-charcoal-100 flex items-center justify-between text-xs font-semibold text-charcoal-700 group-hover:text-primary-600">
                <span>Launch Tool</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
