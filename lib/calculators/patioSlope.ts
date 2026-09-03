import { CalculatorResult, UnitSystem } from './types'
import { formatNumber } from '../units/conversions'

export interface PatioSlopeInputs {
  runLength: number // ft along slope direction
  patioWidth?: number // ft perpendicular to slope
  slopePreset?: 'standard_quarter' | 'gentle_eighth' | 'steep_half' | 'custom'
  customPitchInchesPerFoot?: number // e.g. 0.25 (1/4 in/ft)
  baseGravelDepth?: number // inches (default 4" for walkways, 6" for heavy patios)
  sandBeddingDepth?: number // inches (default 1")
  unitSystem?: UnitSystem
}

export function calculatePatioSlope(inputs: PatioSlopeInputs): CalculatorResult {
  const isMetric = inputs.unitSystem === 'metric'
  const runFt = isMetric ? (inputs.runLength || 5) * 3.28084 : (inputs.runLength || 16)
  const widthFt = isMetric ? (inputs.patioWidth || 3.5) * 3.28084 : (inputs.patioWidth || 12)

  let pitchInchesPerFoot = 0.25 // standard 1/4" per foot = 2.08%
  switch (inputs.slopePreset) {
    case 'gentle_eighth':
      pitchInchesPerFoot = 0.125 // 1/8" per ft = 1.04% (minimum allowed by code)
      break
    case 'steep_half':
      pitchInchesPerFoot = 0.50 // 1/2" per ft = 4.17%
      break
    case 'custom':
      pitchInchesPerFoot = inputs.customPitchInchesPerFoot || 0.25
      break
    case 'standard_quarter':
    default:
      pitchInchesPerFoot = 0.25
      break
  }

  // Elevation change (Total drop)
  const totalDropInches = runFt * pitchInchesPerFoot
  const totalDropCm = totalDropInches * 2.54
  const slopePercentage = (pitchInchesPerFoot / 12) * 100
  const slopeRatio = 12 / pitchInchesPerFoot // e.g. 1 in 48

  // Base materials estimation
  const areaSqFt = runFt * widthFt
  const gravelDepthFt = ((inputs.baseGravelDepth ?? 4)) / 12
  const sandDepthFt = ((inputs.sandBeddingDepth ?? 1)) / 12

  const gravelCuYd = (areaSqFt * gravelDepthFt / 27) * 1.15 // 15% compaction & waste
  const gravelTons = gravelCuYd * 1.45 // dense graded aggregate ~ 1.45 tons/yd3

  const sandCuYd = (areaSqFt * sandDepthFt / 27) * 1.10
  const sandTons = sandCuYd * 1.35

  // Polymeric sand (approx 1 x 50lb bag per 80-100 sq ft for standard pavers)
  const polymericSandBags = Math.ceil(areaSqFt / 85)

  const primaryValue = isMetric
    ? `${formatNumber(totalDropCm, 1)} cm`
    : `${formatNumber(totalDropInches, 2)} inches`

  return {
    primaryValue,
    primaryUnit: 'total elevation drop',
    primaryLabel: 'Required Total Elevation Drop',
    secondaryHighlight: `${formatNumber(pitchInchesPerFoot, 3)}" per foot pitch (1 in ${formatNumber(slopeRatio, 0)} • ${formatNumber(slopePercentage, 2)}% slope)`,
    breakdown: [
      {
        label: 'Total Elevation Drop',
        value: isMetric ? formatNumber(totalDropCm, 1) : formatNumber(totalDropInches, 2),
        unit: isMetric ? 'cm' : 'inches',
        note: `Across ${formatNumber(runFt, 1)} ft total run length away from foundation`,
      },
      {
        label: 'Slope Pitch',
        value: `${formatNumber(pitchInchesPerFoot, 3)}" per foot`,
        note: `Standard drainage pitch is 1/4" per ft (~2.08%)`,
      },
      {
        label: 'Drop per 10 Linear Feet',
        value: isMetric ? `${formatNumber(10 * pitchInchesPerFoot * 2.54, 1)} cm` : `${formatNumber(10 * pitchInchesPerFoot, 2)} inches`,
        note: 'Quick gauge for leveling string lines',
      },
      {
        label: 'Patio Surface Area',
        value: formatNumber(areaSqFt, 0),
        unit: 'sq ft',
      },
      {
        label: 'Crushed Base Gravel (Class 5 / Road Base)',
        value: formatNumber(gravelTons, 2),
        unit: 'tons',
        note: `${formatNumber(gravelCuYd, 2)} cu yd at ${inputs.baseGravelDepth ?? 4}" compacted depth`,
      },
      {
        label: 'Concrete Sand (Bedding Layer)',
        value: formatNumber(sandTons, 2),
        unit: 'tons',
        note: `${formatNumber(sandCuYd, 2)} cu yd at ${inputs.sandBeddingDepth ?? 1}" uncompacted screed layer`,
      },
      {
        label: 'Polymeric Joint Sand (50 lb)',
        value: formatNumber(polymericSandBags, 0),
        unit: 'bags',
        note: 'For interlocking pavers and joint lock',
      },
    ],
    recommendation: `Always slope the patio surface downward and away from your home's foundation to prevent water pooling or basement water intrusion. Maintain at least 1/4" per foot (2%).`,
    assumptions: [
      `Standard recommended minimum slope for hardscape drainage is 1/4" per foot (1:48 or ~2.08%).`,
      `Gravel base includes 15% compaction factor using plate compactor.`,
      `Bedding sand screeded consistently at 1" thickness across the pitched sub-base.`,
    ],
  }
}
