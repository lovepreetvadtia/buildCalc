import { constructMetadata } from '@/lib/seo/metadata'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'

export const metadata = constructMetadata({
  title: 'Privacy Policy — BuildCalc',
  description: 'Privacy Policy for BuildCalc construction and building calculator platform.',
  path: '/privacy',
})

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />

      <div className="mb-8 pb-4 border-b border-charcoal-200">
        <h1 className="text-3xl font-extrabold text-charcoal-950 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs text-charcoal-500 mt-1">Last updated: September 2026</p>
      </div>

      <div className="prose prose-charcoal max-w-none text-charcoal-800 text-xs sm:text-sm leading-relaxed space-y-5">
        <p>
          At <strong>BuildCalc</strong>, accessible from https://buildcalc-tan.vercel.app, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by BuildCalc and how we use it.
        </p>

        <h3 className="text-base font-bold text-charcoal-950">1. Information We Collect</h3>
        <p>
          BuildCalc calculations run <strong>client-side in your web browser</strong>. We do not store or transmit your individual calculation inputs, dimensions, or custom cost parameters to our servers for general calculator usage.
        </p>

        <h3 className="text-base font-bold text-charcoal-950">2. Log Files & Analytics</h3>
        <p>
          BuildCalc follows a standard procedure of using log files and privacy-friendly web analytics (e.g., Google Analytics 4) to monitor aggregate traffic patterns, browser types, and popular calculator tools to improve user experience.
        </p>

        <h3 className="text-base font-bold text-charcoal-950">3. Cookies and Web Beacons</h3>
        <p>
          Like any other website, BuildCalc may use cookies to store information including visitors&apos; preferences and the pages on the website that the visitor accessed or visited.
        </p>

        <h3 className="text-base font-bold text-charcoal-950">4. Advertising Partners (Google AdSense)</h3>
        <p>
          Third-party ad servers or ad networks may use technologies like cookies, JavaScript, or Web Beacons in their respective advertisements. They automatically receive your IP address when this occurs. You may consult the respective Privacy Policies of these third-party ad servers for more detailed information.
        </p>

        <h3 className="text-base font-bold text-charcoal-950">5. Contact Us</h3>
        <p>
          If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us via our <a href="/contact" className="underline hover:text-primary-600">Contact page</a>.
        </p>
      </div>
    </div>
  )
}
