'use client'

import React, { useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { calculateCostPerSquareFoot } from '@/lib/calculators/costPerSqFt'
import { ResultCard } from '../ResultCard'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'

export function CostPerSqFtUI() {
  const [totalArea, setTotalArea] = useState(1600)
  const [projectType, setProjectType] = useState<'newConstruction' | 'homeAddition' | 'fullRemodel' | 'kitchenBath' | 'garageWorkshop'>('newConstruction')
  const [finishLevel, setFinishLevel] = useState<'builderGrade' | 'midRange' | 'highEnd' | 'customLuxury'>('midRange')
  const [customRate, setCustomRate] = useState(0)
  const [includeContingency, setIncludeContingency] = useState(true)
  const [contingencyPercent, setContingencyPercent] = useState(12)

  const result = calculateCostPerSquareFoot({
    totalArea,
    projectType,
    finishLevel,
    customRate,
    includeContingency,
    contingencyPercent,
  })

  const handleReset = () => {
    setTotalArea(1600)
    setProjectType('newConstruction')
    setFinishLevel('midRange')
    setCustomRate(0)
    setIncludeContingency(true)
    setContingencyPercent(12)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-6 bg-surface p-6 rounded-2xl border border-charcoal-200 shadow-sm space-y-5">
        <div className="flex items-center justify-between pb-4 border-b border-charcoal-100">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-charcoal-600">
            Project Scope & Tier
          </span>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1 text-xs text-charcoal-500 hover:text-charcoal-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>

        <Input
          label="Total Project Floor Area"
          type="number"
          min="50"
          step="50"
          value={totalArea}
          onChange={(e) => setTotalArea(Number(e.target.value))}
          unit="sq ft"
        />

        <Select
          label="Project Typology / Scope"
          value={projectType}
          onChange={(e) => setProjectType(e.target.value as any)}
          options={[
            { label: 'New Single Family Home Build', value: 'newConstruction' },
            { label: 'Home Addition / Extension', value: 'homeAddition' },
            { label: 'Full Gut Interior Remodel', value: 'fullRemodel' },
            { label: 'Kitchen & Bath Renovation Zone', value: 'kitchenBath' },
            { label: 'Detached Garage / Workshop', value: 'garageWorkshop' },
          ]}
        />

        <Select
          label="Finish Tier Quality"
          value={finishLevel}
          onChange={(e) => setFinishLevel(e.target.value as any)}
          options={[
            { label: 'Builder-Grade (Standard basic specifications)', value: 'builderGrade' },
            { label: 'Mid-Range (Quality fixtures, quartz, tile, solid wood)', value: 'midRange' },
            { label: 'High-End (Architectural details, custom millwork, premium MEP)', value: 'highEnd' },
            { label: 'Custom Luxury (Bespoke finishes, smart automation, luxury stone)', value: 'customLuxury' },
          ]}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-charcoal-100">
          <Input
            label="Custom Rate / Sq Ft (Optional Override)"
            type="number"
            min="0"
            value={customRate || ''}
            placeholder="e.g. 185"
            onChange={(e) => setCustomRate(Number(e.target.value))}
            unit="$/sqft"
          />
          <Input
            label="Contingency Reserve"
            type="number"
            min="0"
            max="30"
            value={contingencyPercent}
            onChange={(e) => setContingencyPercent(Number(e.target.value))}
            unit="%"
            helpText="10–15% recommended for unforeseen site conditions"
          />
        </div>
      </div>

      <div className="lg:col-span-6">
        <ResultCard result={result} calculatorTitle="Construction Cost Per Square Foot" />
      </div>
    </div>
  )
}
