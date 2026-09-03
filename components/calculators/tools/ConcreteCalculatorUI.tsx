'use client'

import React, { useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { UnitSystem } from '@/lib/calculators/types'
import { calculateConcrete, ConcreteInputs } from '@/lib/calculators/concrete'
import { UnitSelector } from '../UnitSelector'
import { ResultCard } from '../ResultCard'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'

export function ConcreteCalculatorUI() {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('imperial')
  const [shape, setShape] = useState<'slab' | 'column' | 'curb'>('slab')
  const [length, setLength] = useState(20)
  const [width, setWidth] = useState(10)
  const [thickness, setThickness] = useState(4)
  const [diameter, setDiameter] = useState(12)
  const [depth, setDepth] = useState(4)
  const [quantity, setQuantity] = useState(1)
  const [wastePercentage, setWastePercentage] = useState(10)

  const result = calculateConcrete({
    shape,
    length,
    width,
    thickness,
    diameter,
    depth,
    quantity,
    wastePercentage,
    unitSystem,
  })

  const handleReset = () => {
    setShape('slab')
    setLength(20)
    setWidth(10)
    setThickness(4)
    setDiameter(12)
    setDepth(4)
    setQuantity(1)
    setWastePercentage(10)
  }

  const isMetric = unitSystem === 'metric'

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Inputs Form Left */}
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

        {/* Structure Shape Selector */}
        <Select
          label="Pour Structure Shape"
          value={shape}
          onChange={(e) => setShape(e.target.value as any)}
          options={[
            { label: 'Slab / Flatwork / Patio / Walkway', value: 'slab' },
            { label: 'Round Column / Sonotube / Pier', value: 'column' },
            { label: 'Curb / Continuous Footing / Beam', value: 'curb' },
          ]}
        />

        {shape === 'column' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Column Diameter"
              type="number"
              min="1"
              value={diameter}
              onChange={(e) => setDiameter(Number(e.target.value))}
              unit={isMetric ? 'cm' : 'inches'}
            />
            <Input
              label="Column Depth / Height"
              type="number"
              min="0.5"
              step="0.5"
              value={depth}
              onChange={(e) => setDepth(Number(e.target.value))}
              unit={isMetric ? 'm' : 'feet'}
            />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Length"
                type="number"
                min="0.5"
                step="0.5"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                unit={isMetric ? 'meters' : 'feet'}
              />
              <Input
                label="Width"
                type="number"
                min="0.5"
                step="0.5"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                unit={isMetric ? 'meters' : 'feet'}
              />
            </div>
            <Input
              label="Thickness / Depth"
              type="number"
              min="1"
              step="0.5"
              value={thickness}
              onChange={(e) => setThickness(Number(e.target.value))}
              unit={isMetric ? 'cm' : 'inches'}
              helpText="Standard sidewalk: 4 inches; Residential driveway/garage: 5–6 inches."
            />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-charcoal-100">
          <Input
            label="Quantity of Pours"
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
          />
          <Input
            label="Waste Margin Factor"
            type="number"
            min="0"
            max="30"
            value={wastePercentage}
            onChange={(e) => setWastePercentage(Number(e.target.value))}
            unit="%"
            helpText="10% extra standard for ground irregularities & form bulge."
          />
        </div>
      </div>

      {/* Results Right */}
      <div className="lg:col-span-6">
        <ResultCard result={result} calculatorTitle="Concrete Calculator" />
      </div>
    </div>
  )
}
