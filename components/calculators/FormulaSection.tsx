import React from 'react'
import { CalculatorMetadata } from '@/lib/calculators/types'
import { BookOpen, ShieldAlert, CheckCircle } from 'lucide-react'

export function FormulaSection({ metadata }: { metadata: CalculatorMetadata }) {
  const { formulaExplanation } = metadata

  return (
    <div className="mt-12 pt-8 border-t border-charcoal-200/80 space-y-8">
      {/* Methodology & Formula */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-primary-600 mb-2">
          <BookOpen className="w-4 h-4" />
          <span>Formula & Calculation Methodology</span>
        </div>
        <h3 className="text-xl font-bold text-charcoal-950 mb-3">
          How the {metadata.title} Works
        </h3>

        {/* Formula Box */}
        <div className="p-4 rounded-xl bg-charcoal-900 text-white font-mono text-xs sm:text-sm border border-charcoal-800 shadow-inner overflow-x-auto my-4">
          <span className="text-primary-400 block text-[10px] uppercase tracking-wider mb-1">
            Mathematical Expression:
          </span>
          <code className="text-emerald-300 font-bold">{formulaExplanation.formula}</code>
        </div>

        {/* Steps */}
        <div className="space-y-2 mt-4">
          <h4 className="text-xs font-mono uppercase tracking-wider text-charcoal-700 font-bold">
            Calculation Steps
          </h4>
          <ol className="space-y-2 text-xs sm:text-sm text-charcoal-600 list-decimal list-inside leading-relaxed">
            {formulaExplanation.steps.map((step, idx) => (
              <li key={idx} className="pl-1">
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Variables Definition Table */}
      {formulaExplanation.variables && formulaExplanation.variables.length > 0 && (
        <div>
          <h4 className="text-xs font-mono uppercase tracking-wider text-charcoal-700 font-bold mb-3">
            Variables & Factor Definitions
          </h4>
          <div className="border border-charcoal-200 rounded-xl overflow-hidden shadow-subtle">
            <table className="w-full text-left text-xs">
              <thead className="bg-charcoal-50 text-charcoal-700 border-b border-charcoal-200 font-mono text-[11px] uppercase">
                <tr>
                  <th className="py-2.5 px-4 font-semibold w-1/3">Variable</th>
                  <th className="py-2.5 px-4 font-semibold">Description & Scope</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-100 bg-surface text-charcoal-600">
                {formulaExplanation.variables.map((v, idx) => (
                  <tr key={idx}>
                    <td className="py-2.5 px-4 font-semibold text-charcoal-900">{v.name}</td>
                    <td className="py-2.5 px-4 leading-relaxed">{v.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Engineering / Building Code Notice */}
      <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-950 flex items-start gap-3">
        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="font-semibold text-amber-900">Important Planning Notice: </strong>
          Estimates provided by this utility are intended for conceptual planning and material purchase estimates.
          Structural designs, footing loads, retaining wall stabilization, and foundation reinforcement must
          comply with your local municipality&apos;s adopted International Building Code (IBC/IRC) requirements.
        </div>
      </div>
    </div>
  )
}
