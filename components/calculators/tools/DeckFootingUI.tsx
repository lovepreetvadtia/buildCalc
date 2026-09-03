'use client'

import React, { useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { calculateDeckFooting } from '@/lib/calculators/deckFooting'
import { ResultCard } from '../ResultCard'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'

export function DeckFootingUI() {
  const [deckLength, setDeckLength] = useState(16)
  const [deckWidth, setDeckWidth] = useState(12)
  const [beamSpan, setBeamSpan] = useState(8)
  const [attachedToHouse, setAttachedToHouse] = useState(true)
  const [soilBearingCapacity, setSoilBearingCapacity] = useState(2000)
  const [designLoad, setDesignLoad] = useState(50)
  const [frostDepth, setFrostDepth] = useState(36)

  const result = calculateDeckFooting({
    deckLength,
    deckWidth,
    beamSpan,
    attachedToHouse,
    soilBearingCapacity,
    designLoad,
    frostDepth,
  })

  const handleReset = () => {
    setDeckLength(16)
    setDeckWidth(12)
    setBeamSpan(8)
    setAttachedToHouse(true)
    setSoilBearingCapacity(2000)
    setDesignLoad(50)
    setFrostDepth(36)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-6 bg-surface p-6 rounded-2xl border border-charcoal-200 shadow-sm space-y-5">
        <div className="flex items-center justify-between pb-4 border-b border-charcoal-100">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-charcoal-600">
            Deck Dimensions & Load Specifications
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
            label="Deck Length (Along House)"
            type="number"
            min="4"
            value={deckLength}
            onChange={(e) => setDeckLength(Number(e.target.value))}
            unit="feet"
          />
          <Input
            label="Deck Width (Projection Out)"
            type="number"
            min="4"
            value={deckWidth}
            onChange={(e) => setDeckWidth(Number(e.target.value))}
            unit="feet"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Beam Post Spacing / Span"
            type="number"
            min="4"
            max="16"
            value={beamSpan}
            onChange={(e) => setBeamSpan(Number(e.target.value))}
            unit="feet"
            helpText="Distance between pier posts along the main beam"
          />
          <Input
            label="Local Frost Line Depth"
            type="number"
            min="12"
            max="72"
            value={frostDepth}
            onChange={(e) => setFrostDepth(Number(e.target.value))}
            unit="inches"
            helpText="Check local building code (12&quot; South to 48&quot;+ North)"
          />
        </div>

        <Select
          label="Assumed Soil Bearing Capacity"
          value={soilBearingCapacity}
          onChange={(e) => setSoilBearingCapacity(Number(e.target.value))}
          options={[
            { label: '1,500 PSF — Soft clay, loose sandy loam, wet soils', value: 1500 },
            { label: '2,000 PSF — Standard firm clay, silt, compacted sand (Typical default)', value: 2000 },
            { label: '2,500 PSF — Dense sand and gravel mix', value: 2500 },
            { label: '3,000 PSF — Sedimentary rock, cemented hardpan, dense gravel', value: 3000 },
          ]}
        />

        <Select
          label="Design Uniform Load (Live + Dead)"
          value={designLoad}
          onChange={(e) => setDesignLoad(Number(e.target.value))}
          options={[
            { label: '50 PSF (Standard residential: 40 psf live + 10 psf dead)', value: 50 },
            { label: '60 PSF (Heavy snow load zone / multi-level deck)', value: 60 },
            { label: '75 PSF (Heavy hot tub / swim spa platform zone)', value: 75 },
          ]}
        />

        <div className="flex items-center justify-between p-3 rounded-lg border border-charcoal-200 bg-charcoal-50">
          <div>
            <span className="text-xs font-semibold text-charcoal-800 block">
              Attached to House via Ledger Board
            </span>
            <span className="text-[11px] text-charcoal-500">
              House ledger carries 50% of inner joist span
            </span>
          </div>
          <input
            type="checkbox"
            checked={attachedToHouse}
            onChange={(e) => setAttachedToHouse(e.target.checked)}
            className="w-4 h-4 rounded text-primary-600 focus:ring-primary-500 border-charcoal-300"
          />
        </div>
      </div>

      <div className="lg:col-span-6">
        <ResultCard result={result} calculatorTitle="Deck Footing Size Calculator" />
      </div>
    </div>
  )
}
