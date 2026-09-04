'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Search, ArrowRight, CornerDownLeft } from 'lucide-react'
import { CALCULATORS } from '@/data/calculators'
import { Icon } from '../ui/Icon'

export function SearchSection() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const trimmed = searchTerm.trim().toLowerCase()
  const results = trimmed
    ? CALCULATORS.filter((c) => {
        return (
          c.title.toLowerCase().includes(trimmed) ||
          c.categoryName.toLowerCase().includes(trimmed) ||
          c.keywords.some((k) => k.toLowerCase().includes(trimmed)) ||
          c.synonyms.some((s) => s.toLowerCase().includes(trimmed))
        )
      })
    : []

  const quickPills = [
    { label: 'Concrete Slab', query: 'slab' },
    { label: 'House Cost', query: 'house cost' },
    { label: 'Patio Slope', query: 'patio' },
    { label: 'Deck Footings', query: 'deck' },
    { label: 'Pine Straw', query: 'mulch' },
    { label: 'Shiplap / Paneling', query: 'paneling' },
  ]

  return (
    <section className="py-12 bg-charcoal-900 text-white relative overflow-hidden">
      {/* Decorative engineering background line */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
          Find the Right Free Construction Calculator
        </h2>
        <p className="text-xs sm:text-sm text-charcoal-400 mb-6">
          Search across 12+ specialized building material, dimension, and cost estimators.
        </p>

        {/* Search Input Box */}
        <div className="relative max-w-2xl mx-auto text-left">
          <div
            className={`flex items-center px-4 py-3.5 rounded-xl bg-surface text-charcoal-900 shadow-2xl transition-all ${
              isFocused ? 'ring-2 ring-primary-500' : 'border border-charcoal-700'
            }`}
          >
            <Search className="w-5 h-5 text-charcoal-400 mr-3 shrink-0" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              placeholder="Search concrete, deck, patio, house cost..."
              className="w-full text-sm sm:text-base bg-transparent text-charcoal-900 placeholder:text-charcoal-400 focus:outline-none"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-xs text-charcoal-400 hover:text-charcoal-600 px-2"
              >
                Clear
              </button>
            )}
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-mono font-semibold bg-charcoal-100 text-charcoal-600 rounded border border-charcoal-200">
              <CornerDownLeft className="w-3 h-3" />
            </kbd>
          </div>

          {/* Live Search Suggestions Dropdown */}
          {isFocused && trimmed && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-surface rounded-xl shadow-2xl border border-charcoal-200 overflow-hidden z-30 max-h-80 overflow-y-auto">
              {results.length > 0 ? (
                <div className="p-2 space-y-1">
                  {results.map((calc) => (
                    <Link
                      key={calc.slug}
                      href={`/calculators/${calc.slug}`}
                      className="flex items-center justify-between p-2.5 rounded-lg hover:bg-primary-50/70 transition-colors text-charcoal-800 hover:text-primary-900"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded bg-charcoal-100 text-charcoal-700">
                          <Icon name={calc.icon} className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold">{calc.title}</div>
                          <div className="text-xs text-charcoal-500 line-clamp-1">{calc.shortDescription}</div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-charcoal-400" />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-xs text-charcoal-500">
                  No matching calculator found. Try &quot;concrete&quot;, &quot;deck&quot;, or &quot;cost&quot;.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Quick Suggestion Pills */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-charcoal-400 mr-1">Popular:</span>
          {quickPills.map((pill) => (
            <button
              key={pill.label}
              onClick={() => setSearchTerm(pill.query)}
              className="px-2.5 py-1 rounded-full text-xs bg-charcoal-800 hover:bg-charcoal-700 text-charcoal-200 border border-charcoal-700 transition-colors"
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
