import React from 'react'
import { Ruler, Cpu, ClipboardCheck, Compass } from 'lucide-react'
import { PatioDrainageSvg } from '../svgs/PatioDrainageSvg'

export function HowItWorksSection() {
  const steps = [
    {
      num: '01',
      icon: Ruler,
      title: 'Enter your measurements',
      description:
        'Input length, width, depth, area, or project specification using jobsite numbers. Switch effortlessly between Imperial and Metric.',
      details: ['Feet, inches, yards', 'Meters & millimeters', 'Configurable waste %'],
    },
    {
      num: '02',
      icon: Cpu,
      title: 'Get instant calculations',
      description:
        'Mathematical formulas run instantly in your browser to compute volume, structural sizing, tonnage, and unit pricing.',
      details: ['Zero server lag', 'Full formula transparency', 'Itemized material lists'],
    },
    {
      num: '03',
      icon: ClipboardCheck,
      title: 'Plan & order materials',
      description:
        'Use verified estimates to order ready-mix concrete, schedule lumber packages, or cross-check contractor labor bids.',
      details: ['Copy & print results', 'Order safety allowances', 'Code-compliant guidance'],
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-surface border-y border-charcoal-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-charcoal-100 text-charcoal-800 text-xs font-mono font-bold uppercase tracking-wider mb-2">
            <Compass className="w-3.5 h-3.5 text-primary-600" />
            <span>ENGINEERED METHODOLOGY</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-charcoal-950 tracking-tight">
            How Our Free Construction Calculators Work
          </h2>
          <p className="text-sm text-charcoal-500 mt-2">
            A transparent calculation workflow designed to eliminate costly ordering errors and material shortages.
          </p>
        </div>

        {/* 3-Step Process Cards with Connecting Motifs & Hover-Lift */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <div
                key={step.num}
                className="hover-lift relative flex flex-col p-6 rounded-2xl border border-charcoal-200 bg-background hover:border-primary-300 transition-all shadow-subtle group"
              >
                {/* Step Header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-xl bg-charcoal-900 text-white flex items-center justify-center group-hover:bg-primary-600 transition-colors shadow-sm">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-3xl font-mono font-black text-charcoal-200 group-hover:text-primary-200 transition-colors">
                    {step.num}
                  </span>
                </div>

                <h3 className="text-base font-bold text-charcoal-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-charcoal-600 leading-relaxed mb-6">
                  {step.description}
                </p>

                {/* Sub-points */}
                <div className="mt-auto pt-4 border-t border-charcoal-200/60 space-y-1.5">
                  {step.details.map((detail, i) => (
                    <div key={i} className="flex items-center gap-2 text-[11px] font-medium text-charcoal-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-600" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Technical Hardscape Slope Diagram Highlight */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl border border-charcoal-200 bg-background shadow-subtle">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-md space-y-2 text-left">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-primary-600">
                SAMPLE ENGINEERING STANDARD
              </span>
              <h3 className="text-base sm:text-lg font-bold text-charcoal-950">
                Patio & Hardscape Slope Drainage Mechanics
              </h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Standard 1/4&quot; per linear foot pitch prevents pooling against the foundation while maintaining safe outdoor furniture stability.
              </p>
            </div>
            <div className="w-full md:w-1/2 max-w-lg bg-surface p-3 rounded-xl border border-charcoal-200 shadow-sm">
              <PatioDrainageSvg className="w-full h-auto" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
