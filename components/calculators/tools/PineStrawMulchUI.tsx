'use client'

import React, { useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { UnitSystem } from '@/lib/calculators/types'
import { calculatePineStrawMulch } from '@/lib/calculators/pineStrawMulch'
import { UnitSelector } from '../UnitSelector'
import { ResultCard } from '../ResultCard'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'

export function PineStrawMulchUI() {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('imperial')
  const [bedLength, setBedLength] = useState(30)
  const [bedWidth, setBedWidth] = useState(10)
  const [directAreaSqFt, setDirectAreaSqFt] = useState(0)
  const [depthInches, setDepthInches] = useState(3)
  const [baleType, setBaleType] = useState<'round_large' | 'square_standard' | 'mini_bale'>('square_standard')
  const [strawVariety, setStrawVariety] = useState<'longleaf' | 'slash' | 'loblolly'>('longleaf')
  const [isNewBed, setIsNewBed] = useState(false)

  const result = calculatePineStrawMulch({
    bedLength,
    bedWidth,
    directAreaSqFt,
    depthInches,
    baleType,
    strawVariety,
    isNewBed,
    unitSystem,
  })

  const handleReset = () => {
    setBedLength(30)
    setBedWidth(10)
    setDirectAreaSqFt(0)
    setDepthInches(3)
    setBaleType('square_standard')
    setStrawVariety('longleaf')
    setIsNewBed(false)
  }

  const isMetric = unitSystem === 'metric'

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-6 bg-surface p-6 rounded-2xl border border-charcoal-200 shadow-sm space-y-5">
        <div className="flex items-center justify-between pb-4 border-b border-charcoal-100">
          <UnitSelector value={unitSystem} onChange={setUnitSystem} />
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1 text-xs text-charcoal-500 hover:text-charcoal-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Bed Length"
            type="number"
            min="1"
            value={bedLength}
            onChange={(e) => {
              setBedLength(Number(e.target.value))
              setDirectAreaSqFt(0)
            }}
            unit={isMetric ? 'meters' : 'feet'}
          />
          <Input
            label="Bed Width"
            type="number"
            min="1"
            value={bedWidth}
            onChange={(e) => {
              setBedWidth(Number(e.target.value))
              setDirectAreaSqFt(0)
            }}
            unit={isMetric ? 'meters' : 'feet'}
          />
        </div>

        <Input
          label="Or Direct Total Area (Optional Override)"
          type="number"
          min="0"
          value={directAreaSqFt || ''}
          placeholder="e.g. 500"
          onChange={(e) => setDirectAreaSqFt(Number(e.target.value))}
          unit={isMetric ? 'sq m' : 'sq ft'}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Bale Packaging Form"
            value={baleType}
            onChange={(e) => setBaleType(e.target.value as any)}
            options={[
              { label: 'Standard Square Bale (~35 sq ft @ 3")', value: 'square_standard' },
              { label: 'Large Round Roll (~110 sq ft @ 3")', value: 'round_large' },
              { label: 'Mini Bale (~20 sq ft @ 3")', value: 'mini_bale' },
            ]}
          />
          <Select
            label="Pine Needle Variety"
            value={strawVariety}
            onChange={(e) => setStrawVariety(e.target.value as any)}
            options={[
              { label: 'Longleaf (Premium, durable, auburn red)', value: 'longleaf' },
              { label: 'Slash (Medium needle, rich brown)', value: 'slash' },
              { label: 'Loblolly (Short needle, fine texture)', value: 'loblolly' },
            ]}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-charcoal-100">
          <Input
            label="Mulch Layer Thickness"
            type="number"
            min="1"
            max="6"
            step="0.5"
            value={depthInches}
            onChange={(e) => setDepthInches(Number(e.target.value))}
            unit="inches"
            helpText="2&quot; for annual refresh, 3–4&quot; for new weed suppression"
          />
          <div className="flex items-center justify-between p-3 rounded-lg border border-charcoal-200 bg-charcoal-50 h-full">
            <div>
              <span className="text-xs font-semibold text-charcoal-800 block">New Bare Bed</span>
              <span className="text-[11px] text-charcoal-500">Auto-sets 4&quot; depth</span>
            </div>
            <input
              type="checkbox"
              checked={isNewBed}
              onChange={(e) => {
                setIsNewBed(e.target.checked)
                if (e.target.checked) setDepthInches(4)
              }}
              className="w-4 h-4 rounded text-primary-600 focus:ring-primary-500 border-charcoal-300"
            />
          </div>
        </div>
      </div>

      <div className="lg:col-span-6">
        <ResultCard result={result} calculatorTitle="Pine Straw Mulch Calculator" />
      </div>
    </div>
  )
}
