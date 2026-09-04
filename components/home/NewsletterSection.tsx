'use client'

import React, { useState } from 'react'
import { Mail, CheckCircle2 } from 'lucide-react'

export function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
    }
  }

  return (
    <section className="py-14 bg-charcoal-900 text-white rounded-3xl mx-4 sm:mx-6 lg:mx-8 mb-16 overflow-hidden relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <div className="w-10 h-10 rounded-xl bg-charcoal-800 border border-charcoal-700 flex items-center justify-center mx-auto mb-4 text-primary-400">
          <Mail className="w-5 h-5" />
        </div>

        <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mb-2">
          Get New Free Construction Calculator Updates
        </h2>
        <p className="text-xs sm:text-sm text-charcoal-400 max-w-md mx-auto mb-6">
          Get occasional updates when we publish new construction calculators and engineering guides.
        </p>

        {subscribed ? (
          <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-950/80 border border-emerald-700/50 text-emerald-300 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Thank you! You are on the early release list.</span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center justify-center gap-2 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full sm:w-72 px-4 py-2.5 rounded-lg text-xs bg-charcoal-800 border border-charcoal-700 text-white placeholder:text-charcoal-500 focus:outline-none focus:border-primary-500"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-semibold text-xs transition-colors shadow-sm shrink-0"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
