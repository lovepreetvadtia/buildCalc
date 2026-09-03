import { HeroSection } from '@/components/home/HeroSection'
import { TrustStrip } from '@/components/home/TrustStrip'
import { PopularGrid } from '@/components/home/PopularGrid'
import { SearchSection } from '@/components/home/SearchSection'
import { CategorySection } from '@/components/home/CategorySection'
import { HowItWorksSection } from '@/components/home/HowItWorksSection'
import { FeaturedCostShowcase } from '@/components/home/FeaturedCostShowcase'
import { GuidesSection } from '@/components/home/GuidesSection'
import { BenefitsSection } from '@/components/home/BenefitsSection'
import { NewsletterSection } from '@/components/home/NewsletterSection'

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <TrustStrip />
      <PopularGrid />
      <SearchSection />
      <CategorySection />
      <HowItWorksSection />
      <FeaturedCostShowcase />
      <GuidesSection />
      <BenefitsSection />
      <NewsletterSection />
    </div>
  )
}
