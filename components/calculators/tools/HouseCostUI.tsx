'use client'

import React, { useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { calculateHouseConstructionCost } from '@/lib/calculators/houseCost'
import { ResultCard } from '../ResultCard'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'

export function HouseCostUI() {
  const [houseSize, setHouseSize] = useState(2400)
  const [stories, setStories] = useState(2)
  const [qualityTier, setQualityTier] = useState<'economy' | 'standard' | 'premium' | 'luxury'>('standard')
  const [basementType, setBasementType] = useState<'none' | 'crawlspace' | 'unfinished' | 'finished'>('unfinished')
  const [garageStalls, setGarageStalls] = useState(2)
  const [regionMultiplier, setRegionMultiplier] = useState(1.0)
  const [customCostPerSqFt, setCustomCostPerSqFt] = useState(0)

  const result = calculateHouseConstructionCost({
    houseSize,
    stories,
    qualityTier,
    basementType,
    garageStalls,
    foundationType: 'slab',
    regionMultiplier,
    customCostPerSqFt,
  })

  const handleReset = () => {
    setHouseSize(2400)
    setStories(2)
    setQualityTier('standard')
    setBasementType('unfinished')
    setGarageStalls(2)
    setRegionMultiplier(1.0)
    setCustomCostPerSqFt(0)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-6 bg-surface p-6 rounded-2xl border border-charcoal-200 shadow-sm space-y-5">
        <div className="flex items-center justify-between pb-4 border-b border-charcoal-100">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-charcoal-600">
            Project Scope & Specifications
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
            label="Conditioned Floor Area"
            type="number"
            min="400"
            step="50"
            value={houseSize}
            onChange={(e) => setHouseSize(Number(e.target.value))}
            unit="sq ft"
            helpText="Interior heated/cooled living area"
          />
          <Select
            label="Structure Stories"
            value={stories}
            onChange={(e) => setStories(Number(e.target.value))}
            options={[
              { label: '1 Story (Ranch / Bungalow)', value: 1 },
              { label: '1.5 Story (Cape Cod / Loft)', value: 1.5 },
              { label: '2 Stories (Colonial / Traditional)', value: 2 },
              { label: '3 Stories (Townhouse / Multi-level)', value: 3 },
            ]}
          />
        </div>

        <Select
          label="Finish Quality Specification Tier"
          value={qualityTier}
          onChange={(e) => setQualityTier(e.target.value as any)}
          options={[
            { label: 'Economy ($120/sqft base) — Stock vinyl, laminate, basic fixtures', value: 'economy' },
            { label: 'Standard ($165/sqft base) — Hardwood, quartz, tiled showers, wood cabs', value: 'standard' },
            { label: 'Premium ($220/sqft base) — Custom millwork, stone, high-efficiency MEP', value: 'premium' },
            { label: 'Luxury ($340/sqft base) — Architect-designed, bespoke imported finishes', value: 'luxury' },
          ]}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Basement / Substructure"
            value={basementType}
            onChange={(e) => setBasementType(e.target.value as any)}
            options={[
              { label: 'Slab-on-Grade (No basement)', value: 'none' },
              { label: 'Crawlspace Foundation', value: 'crawlspace' },
              { label: 'Full Unfinished Basement', value: 'unfinished' },
              { label: 'Full Finished Walkout/Basement', value: 'finished' },
            ]}
          />
          <Select
            label="Attached Garage Stalls"
            value={garageStalls}
            onChange={(e) => setGarageStalls(Number(e.target.value))}
            options={[
              { label: 'No Garage', value: 0 },
              { label: '1-Car Garage (240 sq ft)', value: 1 },
              { label: '2-Car Garage (480 sq ft)', value: 2 },
              { label: '3-Car Garage (720 sq ft)', value: 3 },
              { label: '4-Car Garage (960 sq ft)', value: 4 },
            ]}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-charcoal-100">
          <Select
            label="Regional Cost Index"
            value={regionMultiplier}
            onChange={(e) => setRegionMultiplier(Number(e.target.value))}
            options={[
              { label: 'Low Cost Region (0.85x)', value: 0.85 },
              { label: 'National Average (1.00x)', value: 1.0 },
              { label: 'High Cost Metro (1.20x)', value: 1.2 },
              { label: 'Very High / Coastal Metro (1.40x)', value: 1.4 },
            ]}
          />
          <Input
            label="Custom Cost / Sq Ft (Optional Override)"
            type="number"
            min="0"
            value={customCostPerSqFt || ''}
            placeholder="e.g. 195"
            onChange={(e) => setCustomCostPerSqFt(Number(e.target.value))}
            unit="$/sqft"
            helpText="Enter specific contractor quote rate"
          />
        </div>
      </div>

      <div className="lg:col-span-6">
        <ResultCard result={result} calculatorTitle="House Construction Cost Calculator" />
      </div>
    </div>
  )
}
