'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Search, Calculator, ArrowRight, Filter } from 'lucide-react'
import { CALCULATORS } from '@/data/calculators'
import { CATEGORIES } from '@/data/categories'
import { Icon } from '@/components/ui/Icon'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'

export default function CalculatorsDirectoryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')

  const filtered = CALCULATORS.filter((calc) => {
    const matchesCat = selectedCategory === 'all' || calc.category === selectedCategory
    const trimmed = searchQuery.trim().toLowerCase()
    const matchesQuery =
      !trimmed ||
      calc.title.toLowerCase().includes(trimmed) ||
      calc.shortDescription.toLowerCase().includes(trimmed) ||
      calc.keywords.some((k) => k.toLowerCase().includes(trimmed)) ||
      calc.synonyms.some((s) => s.toLowerCase().includes(trimmed))

    return matchesCat && matchesQuery
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <Breadcrumbs items={[{ label: 'All Calculators' }]} />

      {/* Directory Header */}
      <div className="mb-8 pb-6 border-b border-charcoal-200">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-charcoal-950 tracking-tight">
          Construction & Material Calculators
        </h1>
        <p className="text-sm sm:text-base text-charcoal-500 mt-2 max-w-3xl">
          Browse all {CALCULATORS.length} specialized engineering, building cost, concrete, foundation, and landscaping calculators.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-stretch md:items-center">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === 'all'
                ? 'bg-charcoal-900 text-white shadow-sm'
                : 'bg-surface border border-charcoal-200 text-charcoal-600 hover:bg-charcoal-50'
            }`}
          >
            All ({CALCULATORS.length})
          </button>
          {CATEGORIES.map((cat) => {
            const count = CALCULATORS.filter((c) => c.category === cat.slug).length
            const isSelected = selectedCategory === cat.slug
            return (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  isSelected
                    ? 'bg-charcoal-900 text-white shadow-sm'
                    : 'bg-surface border border-charcoal-200 text-charcoal-600 hover:bg-charcoal-50'
                }`}
              >
                {cat.name} ({count})
              </button>
            )
          })}
        </div>

        {/* Live Filter Input */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search className="w-4 h-4 text-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter calculators..."
            className="w-full pl-9 pr-4 py-1.5 text-xs rounded-lg border border-charcoal-200 bg-surface text-charcoal-900 placeholder:text-charcoal-400 focus:outline-none focus:border-primary-500"
          />
        </div>
      </div>

      {/* Calculators Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((calc) => (
            <Link
              key={calc.slug}
              href={`/calculators/${calc.slug}`}
              className="group flex flex-col justify-between p-6 rounded-2xl border border-charcoal-200 bg-surface hover:border-primary-300 hover:shadow-card-hover transition-all duration-200"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-charcoal-50 text-charcoal-900 border border-charcoal-200 group-hover:bg-primary-50 group-hover:text-primary-700 group-hover:border-primary-200 transition-colors">
                    <Icon name={calc.icon} className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded bg-charcoal-100 text-charcoal-600">
                    {calc.categoryName}
                  </span>
                </div>

                <h2 className="text-base font-bold text-charcoal-900 group-hover:text-primary-600 transition-colors mb-2">
                  {calc.title}
                </h2>
                <p className="text-xs text-charcoal-500 leading-relaxed line-clamp-3">
                  {calc.shortDescription}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-charcoal-100 flex items-center justify-between text-xs font-semibold text-charcoal-700 group-hover:text-primary-600">
                <span>Open Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center bg-surface rounded-2xl border border-charcoal-200 p-8">
          <Calculator className="w-10 h-10 mx-auto text-charcoal-300 mb-3" />
          <h3 className="text-base font-bold text-charcoal-900 mb-1">No calculators matched your filter</h3>
          <p className="text-xs text-charcoal-500 mb-4">
            Try adjusting your search query or switching category filters.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all')
              setSearchQuery('')
            }}
            className="px-4 py-2 rounded-lg bg-charcoal-900 text-white text-xs font-semibold"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  )
}
