import { Metadata } from 'next'
import { constructMetadata } from '@/lib/seo/metadata'
import { CalculatorsDirectory } from '@/components/calculators/CalculatorsDirectory'

export const metadata: Metadata = constructMetadata({
  title: 'All Construction & Material Calculators — Free Estimators',
  description:
    'Browse all free construction calculators for concrete, house building costs, deck footings, patio slopes, landscaping, and framing.',
  path: '/calculators',
})

export default function CalculatorsDirectoryPage() {
  return <CalculatorsDirectory />
}
