'use client'

import React, { useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { calculateWallPaneling } from '@/lib/calculators/wallPaneling'
import { ResultCard } from '../ResultCard'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'

export function WallPanelingUI() {
  const [wallLength, setWallLength] = useState(16)
  const [wallHeight, setWallHeight] = useState(8)
  const [numberOfWalls, setNumberOfWalls] = useState(1)
  const [doorCount, setDoorCount] = useState(0)
  const [windowCount, setWindowCount] = useState(1)
  const [panelType, setPanelType] = useState<'sheet_4x8' | 'sheet_4x10' | 'shiplap_6in' | 'shiplap_8in' | 'board_batten' | 'custom'>('sheet_4x8')
  const [customPanelWidthInches, setCustomPanelWidthInches] = useState(48)
  const [customPanelHeightFeet, setCustomPanelHeightFeet] = useState(8)
  const [cutWastePercent, setCutWastePercent] = useState(10)

  const result = calculateWallPaneling({
    wallLength,
    wallHeight,
    numberOfWalls,
    doorCount,
    windowCount,
    panelType,
    customPanelWidthInches,
    customPanelHeightFeet,
    cutWastePercent,
  })

  const handleReset = () => {
    setWallLength(16)
    setWallHeight(8)
    setNumberOfWalls(1)
    setDoorCount(0)
    setWindowCount(1)
    setPanelType('sheet_4x8')
    setCustomPanelWidthInches(48)
    setCustomPanelHeightFeet(8)
    setCutWastePercent(10)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-6 bg-surface p-6 rounded-2xl border border-charcoal-200 shadow-sm space-y-5">
        <div className="flex items-center justify-between pb-4 border-b border-charcoal-100">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-charcoal-600">
            Wall & Material Specs
          </span>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1 text-xs text-charcoal-500 hover:text-charcoal-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Input
            label="Wall Length"
            type="number"
            min="1"
            value={wallLength}
            onChange={(e) => setWallLength(Number(e.target.value))}
            unit="feet"
          />
          <Input
            label="Wall Height"
            type="number"
            min="1"
            value={wallHeight}
            onChange={(e) => setWallHeight(Number(e.target.value))}
            unit="feet"
          />
          <Input
            label="No. of Walls"
            type="number"
            min="1"
            max="10"
            value={numberOfWalls}
            onChange={(e) => setNumberOfWalls(Number(e.target.value))}
          />
        </div>

        <Select
          label="Paneling Material Typology"
          value={panelType}
          onChange={(e) => setPanelType(e.target.value as any)}
          options={[
            { label: 'Standard 4x8 ft Sheets (32 sq ft sheet)', value: 'sheet_4x8' },
            { label: 'Tall 4x10 ft Sheets (40 sq ft sheet)', value: 'sheet_4x10' },
            { label: 'Nickel Gap Shiplap (6" x 8 ft boards)', value: 'shiplap_6in' },
            { label: 'Wide Tongue & Groove (8" x 8 ft boards)', value: 'shiplap_8in' },
            { label: 'Board & Batten Accent Paneling', value: 'board_batten' },
            { label: 'Custom Dimension Panels', value: 'custom' },
          ]}
        />

        {panelType === 'custom' && (
          <div className="grid grid-cols-2 gap-4 p-3 bg-charcoal-50 rounded-lg border border-charcoal-200">
            <Input
              label="Panel Width"
              type="number"
              value={customPanelWidthInches}
              onChange={(e) => setCustomPanelWidthInches(Number(e.target.value))}
              unit="inches"
            />
            <Input
              label="Panel Height"
              type="number"
              value={customPanelHeightFeet}
              onChange={(e) => setCustomPanelHeightFeet(Number(e.target.value))}
              unit="feet"
            />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-charcoal-100">
          <Input
            label="Doors Deducted (21 sq ft each)"
            type="number"
            min="0"
            value={doorCount}
            onChange={(e) => setDoorCount(Number(e.target.value))}
          />
          <Input
            label="Windows Deducted (12 sq ft each)"
            type="number"
            min="0"
            value={windowCount}
            onChange={(e) => setWindowCount(Number(e.target.value))}
          />
        </div>

        <Input
          label="Cutting & Pattern Waste Factor"
          type="number"
          min="0"
          max="30"
          value={cutWastePercent}
          onChange={(e) => setCutWastePercent(Number(e.target.value))}
          unit="%"
          helpText="10% standard; use 15–20% for diagonal/herringbone layouts"
        />
      </div>

      <div className="lg:col-span-6">
        <ResultCard result={result} calculatorTitle="Wall Paneling Calculator" />
      </div>
    </div>
  )
}
