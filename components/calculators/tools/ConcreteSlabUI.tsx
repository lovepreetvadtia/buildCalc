'use client'

import React, { useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { UnitSystem } from '@/lib/calculators/types'
import { calculateConcreteSlab } from '@/lib/calculators/concreteSlab'
import { UnitSelector } from '../UnitSelector'
import { ResultCard } from '../ResultCard'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'

export function ConcreteSlabUI() {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('imperial')
  const [length, setLength] = useState(24)
  const [width, setWidth] = useState(24)
  const [thickness, setThickness] = useState(4)
  const [gravelBaseDepth, setGravelBaseDepth] = useState(4)
  const [reinforcement, setReinforcement] = useState<'none' | 'mesh' | 'rebar12' | 'rebar18' | 'rebar24'>('rebar18')
  const [vaporBarrier, setVaporBarrier] = useState(true)
  const [wastePercentage, setWastePercentage] = useState(10)

  const result = calculateConcreteSlab({
    length,
    width,
    thickness,
    gravelBaseDepth,
    reinforcement,
    vaporBarrier,
    wastePercentage,
    unitSystem,
  })

  const handleReset = () => {
    setLength(24)
    setWidth(24)
    setThickness(4)
    setGravelBaseDepth(4)
    setReinforcement('rebar18')
    setVaporBarrier(true)
    setWastePercentage(10)
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
            label="Slab Length"
            type="number"
            min="1"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            unit={isMetric ? 'meters' : 'feet'}
          />
          <Input
            label="Slab Width"
            type="number"
            min="1"
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
            unit={isMetric ? 'meters' : 'feet'}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Slab Thickness"
            type="number"
            min="2"
            step="0.5"
            value={thickness}
            onChange={(e) => setThickness(Number(e.target.value))}
            unit={isMetric ? 'cm' : 'inches'}
            helpText="4 inches standard; 5-6 inches for vehicles"
          />
          <Input
            label="Compacted Gravel Base Depth"
            type="number"
            min="0"
            step="1"
            value={gravelBaseDepth}
            onChange={(e) => setGravelBaseDepth(Number(e.target.value))}
            unit={isMetric ? 'cm' : 'inches'}
            helpText="Recommended 4–6 inches crushed stone base"
          />
        </div>

        <Select
          label="Internal Reinforcement"
          value={reinforcement}
          onChange={(e) => setReinforcement(e.target.value as any)}
          options={[
            { label: '#4 (1/2") Rebar Grid — 18" on center (Standard)', value: 'rebar18' },
            { label: '#4 (1/2") Rebar Grid — 12" on center (Heavy Duty)', value: 'rebar12' },
            { label: '#4 (1/2") Rebar Grid — 24" on center (Light Duty)', value: 'rebar24' },
            { label: '6x6 Welded Wire Mesh Sheets (WWF)', value: 'mesh' },
            { label: 'None (Plain unreinforced concrete)', value: 'none' },
          ]}
        />

        <div className="flex items-center justify-between p-3 rounded-lg border border-charcoal-200 bg-charcoal-50">
          <div>
            <span className="text-xs font-semibold text-charcoal-800 block">
              10-Mil Vapor Barrier Membrane
            </span>
            <span className="text-[11px] text-charcoal-500">
              Required under indoor/garage slabs to stop ground moisture
            </span>
          </div>
          <input
            type="checkbox"
            checked={vaporBarrier}
            onChange={(e) => setVaporBarrier(e.target.checked)}
            className="w-4 h-4 rounded text-primary-600 focus:ring-primary-500 border-charcoal-300"
          />
        </div>

        <Input
          label="Order Waste & Settlement Factor"
          type="number"
          min="0"
          max="30"
          value={wastePercentage}
          onChange={(e) => setWastePercentage(Number(e.target.value))}
          unit="%"
        />
      </div>

      <div className="lg:col-span-6">
        <ResultCard result={result} calculatorTitle="Concrete Slab Material Calculator" />
      </div>
    </div>
  )
}
