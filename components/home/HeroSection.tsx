'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Sparkles, CheckCircle, Calculator, ChevronRight, Ruler, Eye, Layers } from 'lucide-react'
import { calculateConcreteSlab } from '@/lib/calculators/concreteSlab'
import { SlabCrossSectionSvg } from '../svgs/SlabCrossSectionSvg'

export function HeroSection() {
  const [length, setLength] = useState(20)
  const [width, setWidth] = useState(30)
  const [thickness, setThickness] = useState(4)
  const [activeTab, setActiveTab] = useState<'calculator' | 'diagram'>('calculator')

  const previewResult = calculateConcreteSlab({
    length,
    width,
    thickness,
    gravelBaseDepth: 4,
    reinforcement: 'rebar18',
    wastePercentage: 10,
    unitSystem: 'imperial',
  })

  const areaSqFt = length * width

  return (
    <section className="relative pt-8 pb-16 md:pt-16 md:pb-24 overflow-hidden bg-blueprint-grid">
      {/* Laser level alignment subtle guide line */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Value Prop */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Engineering Badge with Ruler Motif */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-charcoal-300/80 text-charcoal-900 text-xs font-mono font-bold tracking-wide shadow-subtle">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <Ruler className="w-3.5 h-3.5 text-primary-600" />
              <span>ENGINEERING UTILITY &bull; V1.0</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-charcoal-950 leading-[1.15]">
              Calculate materials, dimensions, and project costs{' '}
              <span className="text-primary-600 underline decoration-primary-300 underline-offset-8 decoration-wavy">
                with confidence.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-charcoal-600 leading-relaxed max-w-2xl">
              Free construction calculator tools and project estimators built for real-world measurements — from concrete and foundations to patios, decks, landscaping, and house costs.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/calculators"
                className="hover-lift inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-charcoal-950 text-white font-semibold text-sm hover:bg-primary-600 transition-all shadow-md"
              >
                <span>Explore Calculators</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#popular"
                className="hover-lift inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-surface border border-charcoal-300 text-charcoal-800 font-semibold text-sm hover:bg-charcoal-50 hover:text-charcoal-950 transition-colors shadow-subtle"
              >
                <span>Popular Calculators</span>
              </a>
            </div>

            {/* Quick trust metrics */}
            <div className="pt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-charcoal-600 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Instant In-Browser Logic</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Imperial & Metric Units</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Zero Sign-Up Required</span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive Calculator Card with SVG Blueprint toggle */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-surface border border-charcoal-300 shadow-2xl p-5 sm:p-6 overflow-hidden">
              {/* Construction Tape Accent Top Border */}
              <div className="absolute top-0 left-0 right-0 h-1.5 hazard-accent" />

              {/* Technical Header with View Switcher */}
              <div className="flex items-center justify-between pb-3 border-b border-charcoal-100 mt-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-charcoal-500 uppercase">
                    AREA &bull; VOLUME &bull; CAD
                  </span>
                </div>
                <div className="inline-flex rounded-lg border border-charcoal-200 bg-charcoal-50 p-0.5 text-[11px] font-semibold">
                  <button
                    onClick={() => setActiveTab('calculator')}
                    className={`px-2.5 py-1 rounded transition-colors flex items-center gap-1 ${
                      activeTab === 'calculator'
                        ? 'bg-surface text-charcoal-900 shadow-sm border border-charcoal-200'
                        : 'text-charcoal-500 hover:text-charcoal-900'
                    }`}
                  >
                    <Calculator className="w-3 h-3 text-primary-600" />
                    <span>Inputs</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('diagram')}
                    className={`px-2.5 py-1 rounded transition-colors flex items-center gap-1 ${
                      activeTab === 'diagram'
                        ? 'bg-surface text-charcoal-900 shadow-sm border border-charcoal-200'
                        : 'text-charcoal-500 hover:text-charcoal-900'
                    }`}
                  >
                    <Layers className="w-3 h-3 text-primary-600" />
                    <span>Blueprint</span>
                  </button>
                </div>
              </div>

              {activeTab === 'calculator' ? (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-base font-bold text-charcoal-900 flex items-center gap-2">
                      <Calculator className="w-4 h-4 text-primary-600" />
                      Concrete Slab Simulator
                    </h3>
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                      LIVE CAD
                    </span>
                  </div>
                  <p className="text-xs text-charcoal-500 mb-4">
                    Adjust measurements to see live material estimates & tonnage
                  </p>

                  {/* Micro Input Controls */}
                  <div className="grid grid-cols-3 gap-2.5 mb-4">
                    <div>
                      <label className="block text-[10px] font-mono font-bold text-charcoal-600 uppercase mb-1">
                        Length (ft)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="200"
                        value={length}
                        onChange={(e) => setLength(Math.max(1, Number(e.target.value) || 1))}
                        className="w-full text-xs font-mono font-bold px-2.5 py-1.5 rounded-lg border border-charcoal-200 bg-charcoal-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono font-bold text-charcoal-600 uppercase mb-1">
                        Width (ft)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="200"
                        value={width}
                        onChange={(e) => setWidth(Math.max(1, Number(e.target.value) || 1))}
                        className="w-full text-xs font-mono font-bold px-2.5 py-1.5 rounded-lg border border-charcoal-200 bg-charcoal-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono font-bold text-charcoal-600 uppercase mb-1">
                        Depth (in)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="24"
                        value={thickness}
                        onChange={(e) => setThickness(Math.max(1, Number(e.target.value) || 1))}
                        className="w-full text-xs font-mono font-bold px-2.5 py-1.5 rounded-lg border border-charcoal-200 bg-charcoal-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 transition-all"
                      />
                    </div>
                  </div>

                  {/* Primary Output Display */}
                  <div className="p-4 rounded-xl bg-charcoal-950 text-white shadow-inner mb-4 border border-charcoal-800">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <div className="text-[10px] uppercase font-mono text-charcoal-400 tracking-wider">
                          Required Ready-Mix
                        </div>
                        <div className="text-2xl sm:text-3xl font-mono font-black text-white tracking-tight">
                          {previewResult.primaryValue}{' '}
                          <span className="text-sm font-sans font-medium text-primary-400">
                            {previewResult.primaryUnit}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] uppercase font-mono text-charcoal-400">
                          Surface Area
                        </div>
                        <div className="text-sm font-mono font-bold text-charcoal-200">
                          {areaSqFt} sq ft
                        </div>
                      </div>
                    </div>

                    {/* Micro Breakdown List */}
                    <div className="mt-3 pt-3 border-t border-charcoal-800 grid grid-cols-2 gap-2 text-[11px] text-charcoal-300">
                      <div>
                        &bull; Gravel Base: <span className="font-mono text-white font-semibold">4.0 tons</span>
                      </div>
                      <div>
                        &bull; Safety Margin: <span className="font-mono text-emerald-400 font-semibold">+10% waste</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Link */}
                  <Link
                    href="/calculators/concrete-slab-calculator"
                    className="hover-lift w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold text-xs transition-colors shadow-sm"
                  >
                    <span>Open Full Slab Calculator</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-charcoal-900 flex items-center gap-1.5">
                      <Eye className="w-4 h-4 text-primary-600" />
                      Structural Cross-Section Blueprint
                    </h3>
                    <span className="text-[10px] font-mono text-charcoal-500">SCALE: N.T.S.</span>
                  </div>
                  <div className="p-2 bg-charcoal-50 rounded-xl border border-charcoal-200 overflow-hidden">
                    <SlabCrossSectionSvg className="w-full h-auto" />
                  </div>
                  <p className="text-[11px] text-charcoal-500 leading-snug">
                    Standard slab profile with compacted 4&quot; gravel drainage layer, 10-mil vapor barrier, and #4 rebar on high chairs.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
