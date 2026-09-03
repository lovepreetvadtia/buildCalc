'use client'

import React, { useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { UnitSystem } from '@/lib/calculators/types'
import { calculatePatioSlope } from '@/lib/calculators/patioSlope'
import { UnitSelector } from '../UnitSelector'
import { ResultCard } from '../ResultCard'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'

export function PatioSlopeUI() {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('imperial')
  const [runLength, setRunLength] = useState(16)
  const [patioWidth, setPatioWidth] = useState(12)
  const [slopePreset, setSlopePreset] = useState<'standard_quarter' | 'gentle_eighth' | 'steep_half' | 'custom'>('standard_quarter')
  const [customPitchInchesPerFoot, setCustomPitchInchesPerFoot] = useState(0.25)
  const [baseGravelDepth, setBaseGravelDepth] = useState(4)
  const [sandBeddingDepth, setSandBeddingDepth] = useState(1)

  const result = calculatePatioSlope({
    runLength,
    patioWidth,
    slopePreset,
    customPitchInchesPerFoot,
    baseGravelDepth,
    sandBeddingDepth,
    unitSystem,
  })

  const handleReset = () => {
    setRunLength(16)
    setPatioWidth(12)
    setSlopePreset('standard_quarter')
    setCustomPitchInchesPerFoot(0.25)
    setBaseGravelDepth(4)
    setSandBeddingDepth(1)
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
            label="Run Length (Slope Direction Away from House)"
            type="number"
            min="1"
            value={runLength}
            onChange={(e) => setRunLength(Number(e.target.value))}
            unit={isMetric ? 'meters' : 'feet'}
          />
          <Input
            label="Patio Width"
            type="number"
            min="1"
            value={patioWidth}
            onChange={(e) => setPatioWidth(Number(e.target.value))}
            unit={isMetric ? 'meters' : 'feet'}
          />
        </div>

        <Select
          label="Desired Drainage Pitch / Grade"
          value={slopePreset}
          onChange={(e) => setSlopePreset(e.target.value as any)}
          options={[
            { label: '1/4" per foot (2.08% — Standard Industry Drainage)', value: 'standard_quarter' },
            { label: '1/8" per foot (1.04% — Minimum allowable for smooth slabs)', value: 'gentle_eighth' },
            { label: '1/2" per foot (4.17% — Aggressive runoff / washouts)', value: 'steep_half' },
            { label: 'Custom Pitch Value', value: 'custom' },
          ]}
        />

        {slopePreset === 'custom' && (
          <Input
            label="Custom Pitch Rate"
            type="number"
            step="0.05"
            min="0.05"
            max="1.5"
            value={customPitchInchesPerFoot}
            onChange={(e) => setCustomPitchInchesPerFoot(Number(e.target.value))}
            unit="in / ft"
          />
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-charcoal-100">
          <Input
            label="Crushed Base Gravel Depth"
            type="number"
            min="2"
            max="12"
            value={baseGravelDepth}
            onChange={(e) => setBaseGravelDepth(Number(e.target.value))}
            unit="inches"
            helpText="4 inches for pedestrian, 6–8 inches for vehicular"
          />
          <Input
            label="Bedding Sand Screed Layer"
            type="number"
            min="0.5"
            max="2"
            step="0.25"
            value={sandBeddingDepth}
            onChange={(e) => setSandBeddingDepth(Number(e.target.value))}
            unit="inches"
            helpText="Uniform 1 inch coarse concrete sand"
          />
        </div>
      </div>

      <div className="lg:col-span-6">
        <ResultCard result={result} calculatorTitle="Patio Slope Calculator" />
      </div>
    </div>
  )
}
