import { Metadata } from 'next'
import { constructMetadata } from '@/lib/seo/metadata'
import { ContactForm } from '@/components/contact/ContactForm'

export const metadata: Metadata = constructMetadata({
  title: 'Contact & Feedback — BuildCalc',
  description:
    'Contact the BuildCalc engineering team for calculator feature requests, formula corrections, and partnership inquiries.',
  path: '/contact',
})

export default function ContactPage() {
  return <ContactForm />
}
