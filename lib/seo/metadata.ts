import { Metadata } from 'next'

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://buildcalc.com'
export const SITE_NAME = 'BuildCalc'
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og-image.png`

export function constructMetadata({
  title,
  description,
  path = '',
  canonical,
  noIndex = false,
}: {
  title: string
  description: string
  path?: string
  canonical?: string
  noIndex?: boolean
}): Metadata {
  const url = `${SITE_URL}${path}`
  const canonicalUrl = canonical || url

  return {
    title: {
      default: title,
      template: `%s | ${SITE_NAME}`,
    },
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}
