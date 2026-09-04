import React from 'react'
import { Ruler, CheckCircle2, Globe, FileText, LockOpen, Workflow } from 'lucide-react'

export function BenefitsSection() {
  const benefits = [
    {
      icon: Ruler,
      title: 'Practical Inputs',
      description: 'Calculators use measurements you actually have on a real job site or architectural plan.',
    },
    {
      icon: CheckCircle2,
      title: 'Clear Results First',
      description: 'Primary answer is front and center, followed by itemized material quantities and safety margins.',
    },
    {
      icon: Globe,
      title: 'Imperial + Metric',
      description: 'Seamless unit support across feet, inches, yards, meters, millimeters, tons, and tonnes.',
    },
    {
      icon: FileText,
      title: 'Transparent Assumptions',
      description: 'Formulas and waste percentages are explicitly detailed rather than hidden in black-box code.',
    },
    {
      icon: LockOpen,
      title: 'No Unnecessary Signup',
      description: 'Instant, unrestricted access to all computation engines without logins or paywalls.',
    },
    {
      icon: Workflow,
      title: 'Built for Real Projects',
      description: 'Connected tooling lets you move smoothly from foundation footings to framing and hardscaping.',
    },
  ]

  return (
    <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary-600 mb-2 block">
          Designed For Precision
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-charcoal-950 tracking-tight">
          Why Choose Our Free Construction Calculator Platform
        </h2>
        <p className="text-sm text-charcoal-500 mt-2">
          An engineering utility platform crafted for speed, reliability, and mathematical clarity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.map((benefit, idx) => {
          const Icon = benefit.icon
          return (
            <div
              key={idx}
              className="p-6 rounded-2xl border border-charcoal-200 bg-surface hover:border-charcoal-300 transition-colors shadow-subtle"
            >
              <div className="w-10 h-10 rounded-lg bg-charcoal-50 border border-charcoal-200 flex items-center justify-center text-primary-600 mb-4">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-charcoal-900 mb-2">
                {benefit.title}
              </h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
