'use client'

import React, { useState } from 'react'
import { Mail, CheckCircle2, MessageSquare } from 'lucide-react'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <Breadcrumbs items={[{ label: 'Contact' }]} />

      <div className="mb-8 pb-6 border-b border-charcoal-200">
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-primary-600 mb-1">
          <MessageSquare className="w-4 h-4" />
          <span>Get in Touch</span>
        </div>
        <h1 className="text-3xl font-extrabold text-charcoal-950 tracking-tight">
          Contact & Feedback
        </h1>
        <p className="text-sm text-charcoal-600 mt-2">
          Have a calculator feature request, formula correction, or partnership inquiry? We&apos;d love to hear from you.
        </p>
      </div>

      {submitted ? (
        <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
          <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
          <h2 className="text-lg font-bold text-emerald-950">Message Received!</h2>
          <p className="text-xs text-emerald-800 max-w-sm mx-auto">
            Thank you for reaching out. Our engineering team reviews all formula feedback and calculator requests.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 bg-surface rounded-2xl border border-charcoal-200 shadow-sm space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-charcoal-700 uppercase mb-1">
                Your Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                className="w-full text-xs px-3 py-2 rounded-lg border border-charcoal-200 bg-background focus:bg-white focus:outline-none focus:border-primary-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-charcoal-700 uppercase mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
                className="w-full text-xs px-3 py-2 rounded-lg border border-charcoal-200 bg-background focus:bg-white focus:outline-none focus:border-primary-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal-700 uppercase mb-1">
              Subject / Topic
            </label>
            <input
              type="text"
              required
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="e.g. New Calculator Request or Formula Feedback"
              className="w-full text-xs px-3 py-2 rounded-lg border border-charcoal-200 bg-background focus:bg-white focus:outline-none focus:border-primary-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal-700 uppercase mb-1">
              Message
            </label>
            <textarea
              rows={5}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Provide details about your project or calculation requirement..."
              className="w-full text-xs px-3 py-2 rounded-lg border border-charcoal-200 bg-background focus:bg-white focus:outline-none focus:border-primary-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-semibold text-xs transition-colors shadow-sm"
          >
            Submit Message
          </button>
        </form>
      )}
    </div>
  )
}
