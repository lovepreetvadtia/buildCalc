'use client'

import React, { useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { calculateGarageDoorCable } from '@/lib/calculators/garageDoorCable'
import { ResultCard } from '../ResultCard'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'

export function GarageDoorCableUI() {
  const [doorHeightFeet, setDoorHeightFeet] = useState(7)
  const [doorHeightExtraInches, setDoorHeightExtraInches] = useState(0)
  const [systemType, setSystemType] = useState<'torsion_standard' | 'torsion_high_lift' | 'torsion_vertical' | 'extension_spring'>('torsion_standard')
  const [highLiftInches, setHighLiftInches] = useState(24)
  const [doorWeightClass, setDoorWeightClass] = useState<'residential_light' | 'residential_heavy' | 'commercial'>('residential_light')

  const result = calculateGarageDoorCable({
    doorHeightFeet,
    doorHeightExtraInches,
    systemType,
    highLiftInches,
    doorWeightClass,
  })

  const handleReset = () => {
    setDoorHeightFeet(7)
    setDoorHeightExtraInches(0)
    setSystemType('torsion_standard')
    setHighLiftInches(24)
    setDoorWeightClass('residential_light')
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-6 bg-surface p-6 rounded-2xl border border-charcoal-200 shadow-sm space-y-5">
        <div className="flex items-center justify-between pb-4 border-b border-charcoal-100">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-charcoal-600">
            Overhead Door Specifications
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
          <Select
            label="Door Opening Height (Feet)"
            value={doorHeightFeet}
            onChange={(e) => setDoorHeightFeet(Number(e.target.value))}
            options={[
              { label: '7 Feet (Standard residential)', value: 7 },
              { label: '8 Feet (SUV / Tall residential)', value: 8 },
              { label: '9 Feet', value: 9 },
              { label: '10 Feet (RV / Workshop)', value: 10 },
              { label: '12 Feet (Commercial)', value: 12 },
              { label: '14 Feet (Commercial)', value: 14 },
            ]}
          />
          <Input
            label="Extra Height Inches"
            type="number"
            min="0"
            max="11"
            value={doorHeightExtraInches}
            onChange={(e) => setDoorHeightExtraInches(Number(e.target.value))}
            unit="inches"
            helpText="0 for exact foot heights"
          />
        </div>

        <Select
          label="Spring & Track Lift Mechanism"
          value={systemType}
          onChange={(e) => setSystemType(e.target.value as any)}
          options={[
            { label: 'Standard Torsion Springs (Standard 4" Cable Drum)', value: 'torsion_standard' },
            { label: 'High Lift Torsion (Extended vertical track rise)', value: 'torsion_high_lift' },
            { label: 'Vertical Lift Torsion (Straight up wall track)', value: 'torsion_vertical' },
            { label: 'Extension Springs (Side pulley & sheave system)', value: 'extension_spring' },
          ]}
        />

        {systemType === 'torsion_high_lift' && (
          <Input
            label="High Lift Track Rise (Distance from door top to horizontal track)"
            type="number"
            min="6"
            max="120"
            value={highLiftInches}
            onChange={(e) => setHighLiftInches(Number(e.target.value))}
            unit="inches"
          />
        )}

        <Select
          label="Door Construction Weight Class"
          value={doorWeightClass}
          onChange={(e) => setDoorWeightClass(e.target.value as any)}
          options={[
            { label: 'Standard Residential (1/8" cable — Up to 350 lbs / Single or Double steel)', value: 'residential_light' },
            { label: 'Heavy Residential (5/32" cable — 350–550 lbs / Solid wood or triple-layer)', value: 'residential_heavy' },
            { label: 'Commercial Overhead (3/16" cable — 550+ lbs / Heavy steel insulated)', value: 'commercial' },
          ]}
        />
      </div>

      <div className="lg:col-span-6">
        <ResultCard result={result} calculatorTitle="Garage Door Cable Length Calculator" />
      </div>
    </div>
  )
}
