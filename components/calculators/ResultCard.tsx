'use client'

import React, { useState } from 'react'
import { Copy, Check, Printer, Info, ShieldAlert, Sparkles, Ruler } from 'lucide-react'
import { CalculatorResult } from '@/lib/calculators/types'

export function ResultCard({
  result,
  calculatorTitle,
}: {
  result: CalculatorResult
  calculatorTitle: string
}) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    let copyText = `${calculatorTitle} Result: ${result.primaryValue} ${result.primaryUnit}\n`
    if (result.secondaryHighlight) {
      copyText += `${result.secondaryHighlight}\n\n`
    }
    copyText += `Itemized Breakdown:\n`
    result.breakdown.forEach((item) => {
      copyText += `- ${item.label}: ${item.value} ${item.unit || ''} ${item.note ? `(${item.note})` : ''}\n`
    })
    copyText += `\nCalculated on BuildCalc (https://buildcalc-tan.vercel.app)`

    navigator.clipboard.writeText(copyText).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="rounded-2xl border border-charcoal-300 bg-surface shadow-lg overflow-hidden transition-all">
      {/* Top Precision Metric Display */}
      <div className="p-6 bg-charcoal-950 text-white relative overflow-hidden">
        {/* Subtle CAD grid lines inside result box */}
        <div className="absolute inset-0 bg-blueprint-dark opacity-40 pointer-events-none" />

        {/* Laser level red line top accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-primary-500 to-amber-500" />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] uppercase font-mono tracking-widest text-charcoal-400 font-bold">
                {result.primaryLabel || 'CALCULATED SPECIFICATION'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="hover-lift inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-charcoal-800 hover:bg-charcoal-700 text-charcoal-200 text-xs font-mono font-medium transition-colors border border-charcoal-700 shadow-sm"
                title="Copy calculation summary to clipboard"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
              <button
                onClick={handlePrint}
                className="hover-lift inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-charcoal-800 hover:bg-charcoal-700 text-charcoal-200 text-xs font-mono font-medium transition-colors border border-charcoal-700 shadow-sm"
                title="Print calculation sheet"
              >
                <Printer className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Large Primary Value Output */}
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl sm:text-4xl lg:text-5xl font-mono font-black tracking-tight text-white drop-shadow-sm">
              {result.primaryValue}
            </span>
            {result.primaryUnit && (
              <span className="text-base font-sans font-semibold text-primary-400">
                {result.primaryUnit}
              </span>
            )}
          </div>

          {result.secondaryHighlight && (
            <div className="text-xs text-charcoal-300 mt-2.5 font-mono flex items-center gap-1.5">
              <Ruler className="w-3.5 h-3.5 text-primary-400" />
              <span>{result.secondaryHighlight}</span>
            </div>
          )}
        </div>
      </div>

      {/* Itemized Material Breakdown */}
      <div className="p-6">
        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-charcoal-700 mb-3 pb-2 border-b border-charcoal-100 flex items-center justify-between">
          <span>Itemized Material Schedule</span>
          <span className="text-[10px] text-charcoal-400 font-normal">ESTIMATES & MARGINS</span>
        </h4>

        <div className="divide-y divide-charcoal-100 text-xs">
          {result.breakdown.map((item, idx) => (
            <div key={idx} className="py-2.5 flex items-start justify-between gap-4 group hover:bg-charcoal-50/70 px-1 rounded transition-colors">
              <div>
                <span className="font-semibold text-charcoal-800 group-hover:text-primary-700 transition-colors">
                  {item.label}
                </span>
                {item.note && (
                  <span className="block text-[11px] text-charcoal-500 mt-0.5">{item.note}</span>
                )}
              </div>
              <div className="text-right shrink-0">
                <span className="font-mono font-bold text-charcoal-900 text-sm">{item.value}</span>
                {item.unit && <span className="text-charcoal-500 ml-1 text-xs">{item.unit}</span>}
              </div>
            </div>
          ))}
        </div>

        {/* Recommendation Box */}
        {result.recommendation && (
          <div className="mt-5 p-4 rounded-xl bg-primary-50/80 border border-primary-200 text-xs text-primary-950 flex items-start gap-2.5 shadow-subtle">
            <Info className="w-4 h-4 text-primary-600 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong className="font-bold text-primary-900">Trade Recommendation: </strong>
              {result.recommendation}
            </div>
          </div>
        )}

        {/* Assumptions List */}
        {result.assumptions && result.assumptions.length > 0 && (
          <div className="mt-4 pt-4 border-t border-charcoal-100">
            <span className="text-[10px] font-mono uppercase tracking-wider text-charcoal-500 font-bold block mb-1.5">
              Assumptions & Calculation Rules
            </span>
            <ul className="space-y-1 text-[11px] text-charcoal-500 font-medium">
              {result.assumptions.map((asm, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-primary-500 font-bold">&bull;</span>
                  <span>{asm}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
