'use client'

import React, { useState } from 'react'
import { RotateCcw } from 'lucide-react'
import {
  calculateFoundationCost,
  FoundationType,
  SoilCondition,
} from '@/lib/calculators/foundationCost'
import { ResultCard } from '../ResultCard'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'

export function FoundationCostUI() {
  const [foundationType, setFoundationType] = useState<FoundationType>('monolithicSlab')
  const [length, setLength] = useState(40)
  const [width, setWidth] = useState(30)
  const [slabThickness, setSlabThickness] = useState(4)
  const [soilCondition, setSoilCondition] = useState<SoilCondition>('standard')
  const [includeExcavation, setIncludeExcavation] = useState(true)
  const [includeLabor, setIncludeLabor] = useState(true)
  const [customCostPerSqFt, setCustomCostPerSqFt] = useState(0)

  const result = calculateFoundationCost({
    foundationType,
    length,
    width,
    slabThickness,
    soilCondition,
    includeExcavation,
    includeLabor,
    customCostPerSqFt: customCostPerSqFt > 0 ? customCostPerSqFt : undefined,
  })

  const handleReset = () => {
    setFoundationType('monolithicSlab')
    setLength(40)
    setWidth(30)
    setSlabThickness(4)
    setSoilCondition('standard')
    setIncludeExcavation(true)
    setIncludeLabor(true)
    setCustomCostPerSqFt(0)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-6 bg-surface p-6 rounded-2xl border border-charcoal-200 shadow-sm space-y-5">
        <div className="flex items-center justify-between pb-4 border-b border-charcoal-100">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-charcoal-600">
            Foundation Specifications
          </span>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1 text-xs text-charcoal-500 hover:text-charcoal-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>

        <Select
          label="Foundation System Type"
          value={foundationType}
          onChange={(e) => {
            const nextType = e.target.value as FoundationType
            setFoundationType(nextType)
            if (nextType === 'raft') setSlabThickness(10)
            else if (nextType === 'monolithicSlab') setSlabThickness(4)
          }}
          options={[
            { label: 'Monolithic Slab-on-Grade (Thickened Edge)', value: 'monolithicSlab' },
            { label: 'T-Footing & Stem Wall (Crawlspace / Frost Wall)', value: 'stemWall' },
            { label: 'Pier & Beam Foundation (Grade Beam + Drilled Piers)', value: 'pierAndBeam' },
            { label: 'Raft / Mat Foundation (Heavy Engineered Slab)', value: 'raft' },
          ]}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Footprint Length"
            type="number"
            min="10"
            max="200"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            unit="feet"
            helpText="Exterior wall length"
          />
          <Input
            label="Footprint Width"
            type="number"
            min="10"
            max="200"
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
            unit="feet"
            helpText="Exterior wall width"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(foundationType === 'monolithicSlab' || foundationType === 'raft') && (
            <Select
              label="Slab Thickness"
              value={slabThickness}
              onChange={(e) => setSlabThickness(Number(e.target.value))}
              options={
                foundationType === 'raft'
                  ? [
                      { label: '8 inches (Light commercial / high bearing)', value: 8 },
                      { label: '10 inches (Standard engineered raft)', value: 10 },
                      { label: '12 inches (Expansive clay / heavy loads)', value: 12 },
                    ]
                  : [
                      { label: '4 inches (Standard residential living space)', value: 4 },
                      { label: '5 inches (Heavy utility / workshop)', value: 5 },
                      { label: '6 inches (Heavy vehicle / two-story load)', value: 6 },
                    ]
              }
            />
          )}

          <Select
            label="Site Soil Condition"
            value={soilCondition}
            onChange={(e) => setSoilCondition(e.target.value as SoilCondition)}
            options={[
              { label: 'Standard Loam / Coarse Sand (Optimal)', value: 'standard' },
              { label: 'Expansive Clay (Requires drainage buffer)', value: 'clay' },
              { label: 'Rocky / Ledge (Hammering needed)', value: 'rock' },
              { label: 'Sloped Hillside (Cut & fill grading)', value: 'sloped' },
            ]}
          />
        </div>

        <div className="space-y-3 pt-2 border-t border-charcoal-100">
          <div className="flex items-center justify-between p-3 rounded-lg border border-charcoal-200 bg-charcoal-50">
            <div>
              <span className="text-xs font-semibold text-charcoal-800 block">
                Include Excavation & Trenching
              </span>
              <span className="text-[11px] text-charcoal-500">
                Earthmoving machinery, trench digging, backfilling & leveling
              </span>
            </div>
            <input
              type="checkbox"
              checked={includeExcavation}
              onChange={(e) => setIncludeExcavation(e.target.checked)}
              className="w-4 h-4 rounded text-primary-600 focus:ring-primary-500 border-charcoal-300"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg border border-charcoal-200 bg-charcoal-50">
            <div>
              <span className="text-xs font-semibold text-charcoal-800 block">
                Include Masonry & Concrete Labor
              </span>
              <span className="text-[11px] text-charcoal-500">
                Form carpentry, rebar tying, placing, vibrator consolidating & power trowel
              </span>
            </div>
            <input
              type="checkbox"
              checked={includeLabor}
              onChange={(e) => setIncludeLabor(e.target.checked)}
              className="w-4 h-4 rounded text-primary-600 focus:ring-primary-500 border-charcoal-300"
            />
          </div>
        </div>

        <Input
          label="Custom Contractor Rate Override (Optional)"
          type="number"
          min="0"
          step="0.5"
          value={customCostPerSqFt || ''}
          onChange={(e) => setCustomCostPerSqFt(Number(e.target.value))}
          placeholder="e.g. 11.50"
          unit="$/sq ft"
          helpText="Leave blank or 0 to use algorithmic itemized estimate"
        />
      </div>

      <div className="lg:col-span-6">
        <ResultCard result={result} calculatorTitle="House Foundation Cost Calculator" />
      </div>
    </div>
  )
}
