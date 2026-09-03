'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Search, X, ArrowRight, Calculator } from 'lucide-react'
import { CALCULATORS } from '@/data/calculators'
import { Icon } from '../ui/Icon'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
      setSelectedIndex(0)
    }
  }, [isOpen])

  // Filter calculators by query
  const trimmed = query.trim().toLowerCase()
  const results = trimmed
    ? CALCULATORS.filter((c) => {
        return (
          c.title.toLowerCase().includes(trimmed) ||
          c.categoryName.toLowerCase().includes(trimmed) ||
          c.keywords.some((k) => k.toLowerCase().includes(trimmed)) ||
          c.synonyms.some((s) => s.toLowerCase().includes(trimmed))
        )
      })
    : CALCULATORS.slice(0, 6)

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!isOpen) return

      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((prev) => (prev + 1) % (results.length || 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((prev) => (prev - 1 + results.length) % (results.length || 1))
      } else if (e.key === 'Enter' && results[selectedIndex]) {
        window.location.href = `/calculators/${results[selectedIndex].slug}`
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, results, selectedIndex, onClose])

  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search calculators"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-charcoal-950/40 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-xl bg-surface border border-charcoal-200 shadow-2xl overflow-hidden animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-charcoal-100">
          <Search className="w-5 h-5 text-charcoal-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelectedIndex(0)
            }}
            placeholder="Search concrete, deck footing, patio slope, house cost..."
            className="w-full text-base bg-transparent text-charcoal-900 placeholder:text-charcoal-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-charcoal-400 hover:text-charcoal-600 rounded"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="ml-2 px-1.5 py-0.5 text-xs text-charcoal-400 hover:text-charcoal-600 border border-charcoal-200 rounded"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2">
          {results.length > 0 ? (
            <div className="space-y-1">
              <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-charcoal-400">
                {trimmed ? `Matching Calculators (${results.length})` : 'Popular & Recent Calculators'}
              </div>
              {results.map((calc, idx) => {
                const isSelected = idx === selectedIndex
                return (
                  <Link
                    key={calc.slug}
                    href={`/calculators/${calc.slug}`}
                    onClick={onClose}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                      isSelected
                        ? 'bg-primary-50/70 text-primary-900 border border-primary-200'
                        : 'hover:bg-charcoal-50 text-charcoal-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-md ${
                          isSelected ? 'bg-primary-600 text-white' : 'bg-charcoal-100 text-charcoal-600'
                        }`}
                      >
                        <Icon name={calc.icon} className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm">{calc.title}</div>
                        <div className="text-xs text-charcoal-500 line-clamp-1">
                          {calc.shortDescription}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="hidden sm:inline text-[11px] font-medium px-2 py-0.5 rounded bg-charcoal-100 text-charcoal-600">
                        {calc.categoryName}
                      </span>
                      <ArrowRight className="w-4 h-4 text-charcoal-400" />
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="p-8 text-center">
              <Calculator className="w-8 h-8 mx-auto text-charcoal-300 mb-2" />
              <p className="text-sm font-semibold text-charcoal-800">No calculators found for &quot;{query}&quot;</p>
              <p className="text-xs text-charcoal-500 mt-1">
                Try searching for terms like &quot;concrete&quot;, &quot;slab&quot;, &quot;deck&quot;, &quot;slope&quot;, or &quot;cost&quot;.
              </p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-charcoal-50/80 border-t border-charcoal-100 flex items-center justify-between text-[11px] text-charcoal-500">
          <div className="flex items-center gap-2">
            <span>Navigation: <kbd className="px-1 py-0.5 bg-surface border border-charcoal-200 rounded">↑</kbd> <kbd className="px-1 py-0.5 bg-surface border border-charcoal-200 rounded">↓</kbd></span>
            <span>Select: <kbd className="px-1 py-0.5 bg-surface border border-charcoal-200 rounded">Enter</kbd></span>
          </div>
          <span>Press <kbd className="px-1 py-0.5 bg-surface border border-charcoal-200 rounded">/</kbd> anytime to open</span>
        </div>
      </div>
    </div>
  )
}
