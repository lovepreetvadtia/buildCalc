import React from 'react'
import Link from 'next/link'
import { Hammer, ShieldCheck } from 'lucide-react'
import { CATEGORIES } from '@/data/categories'
import { getPopularCalculators } from '@/data/calculators'

export function Footer() {
  const popularTools = getPopularCalculators().slice(0, 5)

  return (
    <footer className="border-t border-charcoal-200 bg-surface mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 pb-12 border-b border-charcoal-100">
          {/* Brand Col */}
          <div className="col-span-2 lg:col-span-2 pr-0 lg:pr-8">
            <Link href="/" className="flex items-center gap-2.5 mb-3 group">
              <div className="w-8 h-8 rounded-lg bg-charcoal-900 flex items-center justify-center text-white">
                <Hammer className="w-4 h-4" />
              </div>
              <span className="font-bold text-lg text-charcoal-950 tracking-tight">
                BuildCalc
              </span>
            </Link>
            <p className="text-sm text-charcoal-600 mb-4 max-w-sm">
              Practical, fast, and transparent calculators built for real-world construction,
              structural, landscaping, and home improvement estimates.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-charcoal-500 bg-charcoal-50 px-3 py-1.5 rounded border border-charcoal-200 max-w-max">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Free &bull; No Login Required &bull; Fast Client Logic</span>
            </div>
          </div>

          {/* Categories Col */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-charcoal-900 mb-3">
              Categories
            </h3>
            <ul className="space-y-2 text-sm text-charcoal-600">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/categories/${cat.slug}`}
                    className="hover:text-primary-600 transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Tools Col */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-charcoal-900 mb-3">
              Popular Tools
            </h3>
            <ul className="space-y-2 text-sm text-charcoal-600">
              {popularTools.map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={`/calculators/${tool.slug}`}
                    className="hover:text-primary-600 transition-colors"
                  >
                    {tool.shortTitle || tool.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources & Legal Col */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-charcoal-900 mb-3">
              Resources & Legal
            </h3>
            <ul className="space-y-2 text-sm text-charcoal-600">
              <li>
                <Link href="/guides" className="hover:text-primary-600 transition-colors">
                  Building Guides
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary-600 transition-colors">
                  About BuildCalc
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary-600 transition-colors">
                  Contact & Feedback
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-primary-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary-600 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-primary-600 transition-colors">
                  Engineering Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer Notice */}
        <div className="py-6 border-b border-charcoal-100">
          <p className="text-xs leading-relaxed text-charcoal-500">
            <strong className="text-charcoal-700">Disclaimer:</strong> Calculations are estimates
            intended for planning and informational purposes. Always verify project requirements
            with applicable local building codes, structural engineers, licensed contractors,
            and materials manufacturers before ordering or executing work.
          </p>
        </div>

        {/* Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-charcoal-400 gap-4">
          <p>&copy; {new Date().getFullYear()} BuildCalc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px]">v1.0.0 Production Ready</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
