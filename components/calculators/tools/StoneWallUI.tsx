'use client'

import React, { useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { calculateStoneWall } from '@/lib/calculators/stoneWall'
import { ResultCard } from '../ResultCard'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'

export function StoneWallUI() {
  const [wallLength, setWallLength] = useState(25)
  const [wallHeight, setWallHeight] = useState(3)
  const [thicknessTopInches, setThicknessTopInches] = useState(12)
  const [thicknessBottomInches, setThicknessBottomInches] = useState(18)
  const [wallStyle, setWallStyle] = useState<'dryStack' | 'mortared'>('dryStack')
  const [stoneType, setStoneType] = useState<'fieldstone' | 'flagstone' | 'cutAshlar' | 'riverRock'>('fieldstone')
  const [backfillGravelWidthInches, setBackfillGravelWidthInches] = useState(12)
  const [isRetainingWall, setIsRetainingWall] = useState(true)
  const [wastePercentage, setWastePercentage] = useState(10)

  const result = calculateStoneWall({
    wallLength,
    wallHeight,
    thicknessTopInches,
    thicknessBottomInches,
    wallStyle,
    stoneType,
    backfillGravelWidthInches,
    isRetainingWall,
    wastePercentage,
  })

  const handleReset = () => {
    setWallLength(25)
    setWallHeight(3)
    setThicknessTopInches(12)
    setThicknessBottomInches(18)
    setWallStyle('dryStack')
    setStoneType('fieldstone')
    setBackfillGravelWidthInches(12)
    setIsRetainingWall(true)
    setWastePercentage(10)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-6 bg-surface p-6 rounded-2xl border border-charcoal-200 shadow-sm space-y-5">
        <div className="flex items-center justify-between pb-4 border-b border-charcoal-100">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-charcoal-600">
            Wall Geometry & Stone Type
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
            label="Wall Length"
            type="number"
            min="1"
            value={wallLength}
            onChange={(e) => setWallLength(Number(e.target.value))}
            unit="feet"
          />
          <Input
            label="Wall Height (Exposed)"
            type="number"
            min="1"
            max="12"
            step="0.5"
            value={wallHeight}
            onChange={(e) => setWallHeight(Number(e.target.value))}
            unit="feet"
            helpText="Walls > 3–4 ft require engineering verification"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Top Thickness (Cap Width)"
            type="number"
            min="6"
            max="36"
            value={thicknessTopInches}
            onChange={(e) => setThicknessTopInches(Number(e.target.value))}
            unit="inches"
          />
          <Input
            label="Base / Bottom Thickness"
            type="number"
            min="8"
            max="48"
            value={thicknessBottomInches}
            onChange={(e) => setThicknessBottomInches(Number(e.target.value))}
            unit="inches"
            helpText="Tapered batter provides gravity retaining strength"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Construction Method"
            value={wallStyle}
            onChange={(e) => setWallStyle(e.target.value as any)}
            options={[
              { label: 'Dry-Stack (Interlocking gravity stone)', value: 'dryStack' },
              { label: 'Mortared Masonry (Type S deep joints)', value: 'mortared' },
            ]}
          />
          <Select
            label="Stone Variety"
            value={stoneType}
            onChange={(e) => setStoneType(e.target.value as any)}
            options={[
              { label: 'Natural Fieldstone / Glacial Boulders', value: 'fieldstone' },
              { label: 'Layered Flagstone / Ledge Stone', value: 'flagstone' },
              { label: 'Dressed / Sawn Cut Ashlar', value: 'cutAshlar' },
              { label: 'Rounded River Rock', value: 'riverRock' },
            ]}
          />
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg border border-charcoal-200 bg-charcoal-50">
          <div>
            <span className="text-xs font-semibold text-charcoal-800 block">
              Retaining Wall (Earth Backfill)
            </span>
            <span className="text-[11px] text-charcoal-500">
              Includes 12&quot; clean stone drainage trench & perforated drain pipe
            </span>
          </div>
          <input
            type="checkbox"
            checked={isRetainingWall}
            onChange={(e) => setIsRetainingWall(e.target.checked)}
            className="w-4 h-4 rounded text-primary-600 focus:ring-primary-500 border-charcoal-300"
          />
        </div>

        <Input
          label="Sorting & Breakage Margin"
          type="number"
          min="0"
          max="25"
          value={wastePercentage}
          onChange={(e) => setWastePercentage(Number(e.target.value))}
          unit="%"
          helpText="10% standard for irregular natural stone shape sorting"
        />
      </div>

      <div className="lg:col-span-6">
        <ResultCard result={result} calculatorTitle="Stone Wall Calculator" />
      </div>
    </div>
  )
}
