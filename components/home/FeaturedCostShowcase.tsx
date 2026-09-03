'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, DollarSign, Calculator, ChevronRight, Layers, Eye } from 'lucide-react'
import { calculateHouseConstructionCost } from '@/lib/calculators/houseCost'
import { HouseFramingSvg } from '../svgs/HouseFramingSvg'

export function FeaturedCostShowcase() {
  const [houseSize, setHouseSize] = useState(2400)
  const [qualityTier, setQualityTier] = useState<'economy' | 'standard' | 'premium' | 'luxury'>('standard')
  const [stories, setStories] = useState(2)
  const [basementType, setBasementType] = useState<'none' | 'crawlspace' | 'unfinished' | 'finished'>('unfinished')
  const [garageStalls, setGarageStalls] = useState(2)
  const [viewMode, setViewMode] = useState<'calculator' | 'blueprint'>('calculator')

  const result = calculateHouseConstructionCost({
    houseSize,
    qualityTier,
    stories,
    basementType,
    garageStalls,
    foundationType: 'slab',
  })

  return (
    <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-charcoal-300 bg-surface p-6 sm:p-12 shadow-card overflow-hidden relative">
        {/* Subtle CAD grid corner backdrop */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blueprint-grid opacity-30 pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Product Info */}
          <div className="lg:col-span-5 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-50 text-amber-900 border border-amber-300 text-xs font-mono font-bold uppercase tracking-wider">
              <DollarSign className="w-3.5 h-3.5 text-amber-600" />
              <span>Flagship Estimator</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-charcoal-950 tracking-tight leading-tight">
              House Construction Cost Calculator
            </h2>

            <p className="text-sm text-charcoal-600 leading-relaxed">
              Estimate complete residential home building budgets based on square footage, finish tier, foundation type, stories, and garage capacity.
            </p>

            <ul className="space-y-2.5 text-xs text-charcoal-600 font-medium">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                <span>Standardized NAHB trade-by-trade breakdown</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                <span>Adjustable regional modifiers and finish tiers</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                <span>Recommended 10–15% contingency reserve planning</span>
              </li>
            </ul>

            <div className="pt-2 flex items-center gap-3">
              <Link
                href="/calculators/house-construction-cost-calculator"
                className="hover-lift inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold text-xs transition-colors shadow-sm"
              >
                <span>Launch Full House Estimator</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Interactive Live Calculator Sandbox with Blueprint Toggle */}
          <div className="lg:col-span-7 rounded-2xl bg-charcoal-950 text-white p-5 sm:p-7 shadow-2xl border border-charcoal-800">
            {/* View Switcher Header */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-charcoal-800">
              <div className="flex items-center gap-2 text-xs font-mono text-charcoal-400">
                <Calculator className="w-4 h-4 text-primary-400" />
                <span>ESTIMATOR SANDBOX</span>
              </div>
              <div className="inline-flex rounded-lg border border-charcoal-700 bg-charcoal-900 p-0.5 text-xs font-mono">
                <button
                  onClick={() => setViewMode('calculator')}
                  className={`px-2.5 py-1 rounded transition-colors flex items-center gap-1 ${
                    viewMode === 'calculator'
                      ? 'bg-primary-600 text-white font-bold'
                      : 'text-charcoal-400 hover:text-white'
                  }`}
                >
                  <Calculator className="w-3 h-3" />
                  <span>Budget</span>
                </button>
                <button
                  onClick={() => setViewMode('blueprint')}
                  className={`px-2.5 py-1 rounded transition-colors flex items-center gap-1 ${
                    viewMode === 'blueprint'
                      ? 'bg-primary-600 text-white font-bold'
                      : 'text-charcoal-400 hover:text-white'
                  }`}
                >
                  <Eye className="w-3 h-3" />
                  <span>Framing CAD</span>
                </button>
              </div>
            </div>

            {viewMode === 'calculator' ? (
              <>
                {/* Micro Controls */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
                  <div>
                    <label className="block text-[10px] font-mono font-bold uppercase text-charcoal-400 mb-1">
                      Living Area (Sq Ft)
                    </label>
                    <input
                      type="number"
                      step="100"
                      min="500"
                      max="15000"
                      value={houseSize}
                      onChange={(e) => setHouseSize(Math.max(300, Number(e.target.value) || 300))}
                      className="w-full text-xs font-mono font-bold bg-charcoal-900 border border-charcoal-700 rounded-lg px-2.5 py-2 text-white focus:outline-none focus:border-primary-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono font-bold uppercase text-charcoal-400 mb-1">
                      Finish Quality
                    </label>
                    <select
                      value={qualityTier}
                      onChange={(e) => setQualityTier(e.target.value as any)}
                      className="w-full text-xs font-medium bg-charcoal-900 border border-charcoal-700 rounded-lg px-2 py-2 text-white focus:outline-none focus:border-primary-500 transition-colors"
                    >
                      <option value="economy">Economy ($120/sqft)</option>
                      <option value="standard">Standard ($165/sqft)</option>
                      <option value="premium">Premium ($220/sqft)</option>
                      <option value="luxury">Luxury ($340/sqft)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono font-bold uppercase text-charcoal-400 mb-1">
                      Basement
                    </label>
                    <select
                      value={basementType}
                      onChange={(e) => setBasementType(e.target.value as any)}
                      className="w-full text-xs font-medium bg-charcoal-900 border border-charcoal-700 rounded-lg px-2 py-2 text-white focus:outline-none focus:border-primary-500 transition-colors"
                    >
                      <option value="none">Slab / None</option>
                      <option value="crawlspace">Crawlspace</option>
                      <option value="unfinished">Unfinished</option>
                      <option value="finished">Finished</option>
                    </select>
                  </div>
                </div>

                {/* Highlighted Result Display */}
                <div className="p-4 rounded-xl bg-charcoal-900/90 border border-charcoal-800 shadow-inner">
                  <div className="text-[11px] uppercase font-mono tracking-wider text-charcoal-400 mb-1">
                    Estimated Construction Cost Range
                  </div>
                  <div className="text-2xl sm:text-3xl font-mono font-black text-emerald-400 tracking-tight">
                    {result.primaryValue}
                  </div>
                  <div className="text-xs text-charcoal-400 mt-1">
                    {result.secondaryHighlight}
                  </div>

                  {/* Mini breakdown grid */}
                  <div className="mt-4 pt-3 border-t border-charcoal-800 grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] text-charcoal-300">
                    <div>
                      <span className="text-charcoal-400 block">Interior Finishes:</span>
                      <span className="font-mono text-white font-semibold">~25%</span>
                    </div>
                    <div>
                      <span className="text-charcoal-400 block">Framing & Structure:</span>
                      <span className="font-mono text-white font-semibold">~18%</span>
                    </div>
                    <div>
                      <span className="text-charcoal-400 block">Mechanical (MEP):</span>
                      <span className="font-mono text-white font-semibold">~15%</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-charcoal-400 font-bold">
                    ARCHITECTURAL FRAMING WIREFRAME
                  </span>
                  <span className="text-[10px] font-mono text-primary-400">IRC SECTION R301</span>
                </div>
                <div className="p-1 bg-charcoal-900 rounded-xl border border-charcoal-800 overflow-hidden">
                  <HouseFramingSvg className="w-full h-auto" />
                </div>
              </div>
            )}

            <div className="mt-4 text-center">
              <Link
                href="/calculators/house-construction-cost-calculator"
                className="inline-flex items-center gap-1 text-xs text-primary-400 hover:text-primary-300 font-medium transition-colors"
              >
                <span>Customize regional labor rates & custom specs</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
