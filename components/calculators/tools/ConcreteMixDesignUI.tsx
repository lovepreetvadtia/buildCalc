'use client'

import React, { useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { calculateConcreteMixDesign } from '@/lib/calculators/concreteMixDesign'
import { ResultCard } from '../ResultCard'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'

export function ConcreteMixDesignUI() {
  const [targetVolume, setTargetVolume] = useState(1)
  const [volumeUnit, setVolumeUnit] = useState<'cuyd' | 'cuft' | 'cum'>('cuyd')
  const [mixRatio, setMixRatio] = useState<'1:2:3' | '1:2:4' | '1:1.5:3' | '1:3:5' | 'custom'>('1:2:3')
  const [cementRatio, setCementRatio] = useState(1)
  const [sandRatio, setSandRatio] = useState(2)
  const [gravelRatio, setGravelRatio] = useState(3)
  const [waterRatio, setWaterRatio] = useState(0.50)

  const result = calculateConcreteMixDesign({
    targetVolume,
    volumeUnit,
    mixRatio,
    cementRatio,
    sandRatio,
    gravelRatio,
    waterRatio,
  })

  const handleReset = () => {
    setTargetVolume(1)
    setVolumeUnit('cuyd')
    setMixRatio('1:2:3')
    setCementRatio(1)
    setSandRatio(2)
    setGravelRatio(3)
    setWaterRatio(0.50)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-6 bg-surface p-6 rounded-2xl border border-charcoal-200 shadow-sm space-y-5">
        <div className="flex items-center justify-between pb-4 border-b border-charcoal-100">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-charcoal-600">
            Batching Parameters
          </span>
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
            label="Target Wet Volume"
            type="number"
            min="0.1"
            step="0.25"
            value={targetVolume}
            onChange={(e) => setTargetVolume(Number(e.target.value))}
          />
          <Select
            label="Volume Unit"
            value={volumeUnit}
            onChange={(e) => setVolumeUnit(e.target.value as any)}
            options={[
              { label: 'Cubic Yards (yd³)', value: 'cuyd' },
              { label: 'Cubic Feet (ft³)', value: 'cuft' },
              { label: 'Cubic Meters (m³)', value: 'cum' },
            ]}
          />
        </div>

        <Select
          label="Mix Design / Target Strength"
          value={mixRatio}
          onChange={(e) => setMixRatio(e.target.value as any)}
          options={[
            { label: '1 : 2 : 3 (~3000 PSI) — Slabs, footings, foundations', value: '1:2:3' },
            { label: '1 : 1.5 : 3 (~3500–4000 PSI) — High strength driveways & beams', value: '1:1.5:3' },
            { label: '1 : 2 : 4 (~2500 PSI) — Walkways, fence posts, non-structural', value: '1:2:4' },
            { label: '1 : 3 : 5 (~2000 PSI) — Mass concrete, thick sub-fill', value: '1:3:5' },
            { label: 'Custom Volumetric Parts Ratio', value: 'custom' },
          ]}
        />

        {mixRatio === 'custom' && (
          <div className="grid grid-cols-3 gap-3 p-3 bg-charcoal-50 rounded-lg border border-charcoal-200">
            <Input
              label="Cement Part"
              type="number"
              min="0.5"
              step="0.5"
              value={cementRatio}
              onChange={(e) => setCementRatio(Number(e.target.value))}
            />
            <Input
              label="Sand Part"
              type="number"
              min="0.5"
              step="0.5"
              value={sandRatio}
              onChange={(e) => setSandRatio(Number(e.target.value))}
            />
            <Input
              label="Gravel Part"
              type="number"
              min="0.5"
              step="0.5"
              value={gravelRatio}
              onChange={(e) => setGravelRatio(Number(e.target.value))}
            />
          </div>
        )}

        <Input
          label="Water-Cement Weight Ratio (w/c)"
          type="number"
          min="0.40"
          max="0.65"
          step="0.02"
          value={waterRatio}
          onChange={(e) => setWaterRatio(Number(e.target.value))}
          helpText="0.45 = Higher strength, lower slump; 0.55 = Higher workability/wetness."
        />
      </div>

      <div className="lg:col-span-6">
        <ResultCard result={result} calculatorTitle="Concrete Mix Design Calculator" />
      </div>
    </div>
  )
}
