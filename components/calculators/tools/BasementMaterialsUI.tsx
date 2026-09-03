'use client'

import React, { useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { calculateBasementMaterials } from '@/lib/calculators/basementMaterials'
import { ResultCard } from '../ResultCard'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'

export function BasementMaterialsUI() {
  const [perimeterLength, setPerimeterLength] = useState(140)
  const [wallHeight, setWallHeight] = useState(8)
  const [wallThickness, setWallThickness] = useState(8)
  const [wallType, setWallType] = useState<'pouredConcrete' | 'cmuBlock'>('cmuBlock')
  const [rebarSpacing, setRebarSpacing] = useState(32)
  const [waterproofing, setWaterproofing] = useState(true)
  const [exteriorInsulation, setExteriorInsulation] = useState(true)
  const [wastePercentage, setWastePercentage] = useState(8)

  const result = calculateBasementMaterials({
    perimeterLength,
    wallHeight,
    wallThickness,
    wallType,
    rebarSpacing,
    waterproofing,
    exteriorInsulation,
    wastePercentage,
  })

  const handleReset = () => {
    setPerimeterLength(140)
    setWallHeight(8)
    setWallThickness(8)
    setWallType('cmuBlock')
    setRebarSpacing(32)
    setWaterproofing(true)
    setExteriorInsulation(true)
    setWastePercentage(8)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-6 bg-surface p-6 rounded-2xl border border-charcoal-200 shadow-sm space-y-5">
        <div className="flex items-center justify-between pb-4 border-b border-charcoal-100">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-charcoal-600">
            Foundation Wall Parameters
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
          label="Wall Construction Method"
          value={wallType}
          onChange={(e) => setWallType(e.target.value as any)}
          options={[
            { label: 'Hollow CMU Concrete Masonry Blocks (8x8x16)', value: 'cmuBlock' },
            { label: 'Monolithic Poured Concrete Formed Walls', value: 'pouredConcrete' },
          ]}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Total Foundation Perimeter"
            type="number"
            min="20"
            value={perimeterLength}
            onChange={(e) => setPerimeterLength(Number(e.target.value))}
            unit="linear ft"
            helpText="e.g. 140 ft for 30' x 40' house"
          />
          <Input
            label="Wall Height (Footing to Sill)"
            type="number"
            min="4"
            max="14"
            step="0.5"
            value={wallHeight}
            onChange={(e) => setWallHeight(Number(e.target.value))}
            unit="feet"
            helpText="Standard 8 ft, 9 ft, or 10 ft height"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Wall Thickness"
            value={wallThickness}
            onChange={(e) => setWallThickness(Number(e.target.value))}
            options={[
              { label: '8 inches (Standard residential single story)', value: 8 },
              { label: '10 inches (Two story / heavy backfill soil)', value: 10 },
              { label: '12 inches (Severe hydrostatic / commercial)', value: 12 },
            ]}
          />
          <Input
            label="Vertical Rebar Spacing"
            type="number"
            min="16"
            max="48"
            step="8"
            value={rebarSpacing}
            onChange={(e) => setRebarSpacing(Number(e.target.value))}
            unit="inches o.c."
          />
        </div>

        <div className="space-y-3 pt-2 border-t border-charcoal-100">
          <div className="flex items-center justify-between p-3 rounded-lg border border-charcoal-200 bg-charcoal-50">
            <div>
              <span className="text-xs font-semibold text-charcoal-800 block">
                Exterior Dampproofing / Waterproofing Membrane
              </span>
              <span className="text-[11px] text-charcoal-500">
                Self-adhering peel-and-stick or polymer-modified asphalt
              </span>
            </div>
            <input
              type="checkbox"
              checked={waterproofing}
              onChange={(e) => setWaterproofing(e.target.checked)}
              className="w-4 h-4 rounded text-primary-600 focus:ring-primary-500 border-charcoal-300"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg border border-charcoal-200 bg-charcoal-50">
            <div>
              <span className="text-xs font-semibold text-charcoal-800 block">
                Exterior Rigid Foam Insulation (R-10 XPS)
              </span>
              <span className="text-[11px] text-charcoal-500">
                Continuous exterior thermal break per energy code
              </span>
            </div>
            <input
              type="checkbox"
              checked={exteriorInsulation}
              onChange={(e) => setExteriorInsulation(e.target.checked)}
              className="w-4 h-4 rounded text-primary-600 focus:ring-primary-500 border-charcoal-300"
            />
          </div>
        </div>

        <Input
          label="Cutting & Breakage Margin"
          type="number"
          min="0"
          max="20"
          value={wastePercentage}
          onChange={(e) => setWastePercentage(Number(e.target.value))}
          unit="%"
        />
      </div>

      <div className="lg:col-span-6">
        <ResultCard result={result} calculatorTitle="Basement Materials Calculator" />
      </div>
    </div>
  )
}
