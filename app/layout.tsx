import type { Metadata } from 'next'
import Script from 'next/script'
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
  verification: {
    google: '3iVhPjJbfJ6OSy_uOjL7AFcxK6fcq-96hzcDExuY0pc',
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-J57STNSGYE"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-J57STNSGYE');
          `}
        </Script>
        <CustomCursor />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
