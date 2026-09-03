import { CalculatorResult, UnitSystem } from './types'
import { formatNumber } from '../units/conversions'

export interface ConcreteMixInputs {
  targetVolume: number // cu ft, cu yd, or cu m
  volumeUnit: 'cuyd' | 'cuft' | 'cum'
  mixRatio: '1:2:3' | '1:2:4' | '1:1.5:3' | '1:3:5' | 'custom'
  // Custom parts
  cementRatio?: number
  sandRatio?: number
  gravelRatio?: number
  waterRatio?: number // water-cement ratio by weight (e.g., 0.45 - 0.55)
  unitSystem?: UnitSystem
}

export function calculateConcreteMixDesign(inputs: ConcreteMixInputs): CalculatorResult {
  // Convert target volume to cubic feet
  let volumeCuFt = inputs.targetVolume
  if (inputs.volumeUnit === 'cuyd') {
    volumeCuFt = inputs.targetVolume * 27
  } else if (inputs.volumeUnit === 'cum') {
    volumeCuFt = inputs.targetVolume * 35.3147
  }

  // Pre-defined ratios (Cement : Sand : Gravel by loose volume)
  // Standard dry mix design dry volume factor is ~1.54 to account for voids when water is added
  let cPart = 1
  let sPart = 2
  let gPart = 3
  let psiEstimate = '3000 PSI (Standard foundations, slabs, footings)'

  switch (inputs.mixRatio) {
    case '1:2:4':
      cPart = 1; sPart = 2; gPart = 4
      psiEstimate = '2500 PSI (General purpose, paths, non-structural)'
      break
    case '1:1.5:3':
      cPart = 1; sPart = 1.5; gPart = 3
      psiEstimate = '3500–4000 PSI (High strength, heavy traffic driveways, structural beams)'
      break
    case '1:3:5':
      cPart = 1; sPart = 3; gPart = 5
      psiEstimate = '2000 PSI (Mass concrete, fill)'
      break
    case 'custom':
      cPart = inputs.cementRatio || 1
      sPart = inputs.sandRatio || 2
      gPart = inputs.gravelRatio || 3
      psiEstimate = 'Custom Mix Ratio'
      break
    case '1:2:3':
    default:
      cPart = 1; sPart = 2; gPart = 3
      psiEstimate = '3000 PSI (Standard foundations, slabs, footings)'
      break
  }

  const totalParts = cPart + sPart + gPart
  // Dry volume needed = Wet volume * 1.54
  const dryVolumeCuFt = volumeCuFt * 1.54

  // Volume of each constituent in cu ft
  const cementCuFt = (cPart / totalParts) * dryVolumeCuFt
  const sandCuFt = (sPart / totalParts) * dryVolumeCuFt
  const gravelCuFt = (gPart / totalParts) * dryVolumeCuFt

  // Weights:
  // 1 bag of Portland cement (94 lbs) ≈ 1 cu ft loose volume
  const cementBags94lb = Math.ceil(cementCuFt)
  const cementWeightLbs = cementBags94lb * 94

  // Sand bulk density ≈ 100 lbs/cu ft (approx 1.35 tons/cu yd)
  const sandWeightLbs = sandCuFt * 100
  const sandTons = sandWeightLbs / 2000
  const sandCuYd = sandCuFt / 27

  // Gravel bulk density ≈ 105 lbs/cu ft (approx 1.42 tons/cu yd)
  const gravelWeightLbs = gravelCuFt * 105
  const gravelTons = gravelWeightLbs / 2000
  const gravelCuYd = gravelCuFt / 27

  // Water requirement: Water-cement ratio ~ 0.50 by weight (approx 5.5 to 6 gallons per 94lb bag)
  const waterWeightLbs = cementWeightLbs * (inputs.waterRatio || 0.50)
  const waterGallons = waterWeightLbs / 8.34 // 1 gal water = 8.34 lbs
  const waterLiters = waterGallons * 3.78541

  const volumeCuYd = volumeCuFt / 27

  return {
    primaryValue: formatNumber(cementBags94lb, 0),
    primaryUnit: 'bags (94 lb)',
    primaryLabel: 'Portland Cement Needed',
    secondaryHighlight: `${formatNumber(volumeCuYd, 2)} yd³ wet concrete (${psiEstimate})`,
    breakdown: [
      {
        label: 'Portland Cement (Type I/II)',
        value: formatNumber(cementBags94lb, 0),
        unit: 'bags (94 lbs each)',
        note: `Total ~${formatNumber(cementWeightLbs, 0)} lbs cement`,
      },
      {
        label: 'Masonry / Concrete Sand',
        value: formatNumber(sandTons, 2),
        unit: 'tons',
        note: `${formatNumber(sandCuYd, 2)} cu yd (~${formatNumber(sandWeightLbs, 0)} lbs)`,
      },
      {
        label: 'Coarse Aggregate / Gravel (3/4")',
        value: formatNumber(gravelTons, 2),
        unit: 'tons',
        note: `${formatNumber(gravelCuYd, 2)} cu yd (~${formatNumber(gravelWeightLbs, 0)} lbs)`,
      },
      {
        label: 'Clean Mixing Water',
        value: formatNumber(waterGallons, 1),
        unit: 'gallons',
        note: `Approx ${formatNumber(waterLiters, 0)} liters (~5.5 gal per 94lb bag)`,
      },
      {
        label: 'Total Wet Concrete Batch',
        value: formatNumber(volumeCuYd, 2),
        unit: 'cu yd',
        note: `${formatNumber(volumeCuFt, 1)} cu ft`,
      },
    ],
    recommendation: `Add water gradually while mixing. Too much water will reduce the final compressive strength. Aim for a workable 3" to 4" slump.`,
    assumptions: [
      'Calculated using dry-to-wet bulking shrinkage factor of 1.54.',
      'One 94 lb bag of Portland Cement is assumed to occupy 1 cu ft loose volume.',
      'Aggregates assumed at standard moist-surface conditions.',
    ],
  }
}
