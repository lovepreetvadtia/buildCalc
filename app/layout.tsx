import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { WebSiteJsonLd } from '@/components/seo/JsonLd'
import { CustomCursor } from '@/components/ui/CustomCursor'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'BuildCalc — Practical Construction & Building Calculators',
    template: '%s | BuildCalc',
  },
  description:
    'Free construction, concrete, foundation, landscaping, and home project calculators built for real-world measurements and accurate material estimates.',
  keywords: [
    'construction calculators',
    'concrete calculator',
    'house construction cost',
    'patio slope calculator',
    'deck footing size',
    'building material estimator',
  ],
  authors: [{ name: 'BuildCalc Engineering Team' }],
  creator: 'BuildCalc',
  metadataBase: new URL('https://buildcalc.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://buildcalc.com',
    siteName: 'BuildCalc',
    title: 'BuildCalc — Practical Construction & Building Calculators',
    description:
      'Free construction, concrete, foundation, landscaping, and home project calculators built for real-world measurements.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BuildCalc — Practical Construction & Building Calculators',
    description:
      'Free construction, concrete, foundation, landscaping, and home project calculators.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <WebSiteJsonLd />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-charcoal-900 selection:bg-primary-100 selection:text-primary-900">
        <CustomCursor />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
