import { CalculatorResult, UnitSystem } from './types'
import { formatCurrency, formatNumber } from '../units/conversions'

export interface HouseCostInputs {
  houseSize: number // sq ft
  stories: number // 1, 1.5, 2, 3
  qualityTier: 'economy' | 'standard' | 'premium' | 'luxury'
  basementType: 'none' | 'crawlspace' | 'unfinished' | 'finished'
  garageStalls: number // 0, 1, 2, 3, 4
  foundationType: 'slab' | 'crawlspace' | 'fullBasement' | 'piers'
  regionMultiplier?: number // 0.85 to 1.40 (default 1.0)
  customCostPerSqFt?: number // Optional override
  unitSystem?: UnitSystem
}

export function calculateHouseConstructionCost(inputs: HouseCostInputs): CalculatorResult {
  const sqFt = Math.max(200, inputs.houseSize || 2000)
  const stories = inputs.stories || 1
  const region = inputs.regionMultiplier || 1.0

  // Base cost per sq ft by finish tier (national averages for standard builds)
  let baseSqFtRate = 160 // standard
  switch (inputs.qualityTier) {
    case 'economy':
      baseSqFtRate = 120
      break
    case 'premium':
      baseSqFtRate = 220
      break
    case 'luxury':
      baseSqFtRate = 340
      break
    case 'standard':
    default:
      baseSqFtRate = 165
      break
  }

  if (inputs.customCostPerSqFt && inputs.customCostPerSqFt > 0) {
    baseSqFtRate = inputs.customCostPerSqFt
  }

  // Story adjustments: 2-story has slightly smaller foundation/roof per sqft, but more framing complexity
  let storyFactor = 1.0
  if (stories === 2) storyFactor = 0.96
  else if (stories === 3) storyFactor = 1.02

  // Foundation & Basement addition
  let basementCost = 0
  const footprintSqFt = sqFt / stories
  if (inputs.basementType === 'unfinished') {
    basementCost = footprintSqFt * 35 * region
  } else if (inputs.basementType === 'finished') {
    basementCost = footprintSqFt * 75 * region
  } else if (inputs.basementType === 'crawlspace') {
    basementCost = footprintSqFt * 18 * region
  }

  // Garage addition (avg $35–$50 per sq ft for garage, approx 240 sq ft per stall)
  const garageStalls = inputs.garageStalls || 0
  const garageSqFt = garageStalls * 240
  const garageCost = garageSqFt * 45 * region

  // Core living area cost
  const baseLivingCost = sqFt * baseSqFtRate * storyFactor * region

  // Subtotals
  const totalMid = Math.round(baseLivingCost + basementCost + garageCost)
  const totalLow = Math.round(totalMid * 0.88)
  const totalHigh = Math.round(totalMid * 1.18)

  const effectiveRatePerSqFt = totalMid / sqFt

  // Category breakdown percentages (NAHB industry standard proportions):
  // 1. Site work & Foundation: ~12%
  // 2. Framing & Structure: ~18%
  // 3. Exterior Finishes (Roof, Siding, Windows): ~14%
  // 4. Major Systems (Plumbing, HVAC, Electrical): ~15%
  // 5. Interior Finishes (Drywall, Flooring, Cabinets, Paint): ~25%
  // 6. Overhead, Permits, Contractor Margin & Contingency: ~16%

  const breakdown = [
    {
      label: 'Estimated Cost Range',
      value: `${formatCurrency(totalLow)} – ${formatCurrency(totalHigh)}`,
      note: `Mid-point estimate: ${formatCurrency(totalMid)}`,
    },
    {
      label: 'Effective Cost / Sq Ft',
      value: formatCurrency(effectiveRatePerSqFt),
      unit: '/ sq ft',
      note: `Based on ${formatNumber(sqFt, 0)} sq ft total living area`,
    },
    {
      label: 'Interior Finishes (Cabinets, Floors, Trim)',
      value: formatCurrency(totalMid * 0.25),
      note: '~25% of total budget',
    },
    {
      label: 'Framing & Structural Framing',
      value: formatCurrency(totalMid * 0.18),
      note: '~18% of total budget',
    },
    {
      label: 'Mechanical, Electrical & HVAC',
      value: formatCurrency(totalMid * 0.15),
      note: '~15% of total budget',
    },
    {
      label: 'Exterior Finishes (Siding, Roofing, Windows)',
      value: formatCurrency(totalMid * 0.14),
      note: '~14% of total budget',
    },
    {
      label: 'Foundation & Earthwork',
      value: formatCurrency(totalMid * 0.12 + basementCost * 0.5),
      note: '~12% of total budget',
    },
    {
      label: 'Builder Margin, Permits & Contingency (15%)',
      value: formatCurrency(totalMid * 0.16),
      note: 'Recommended 10–15% buffer for unforeseen site conditions',
    },
  ]

  return {
    primaryValue: `${formatCurrency(totalLow)} – ${formatCurrency(totalHigh)}`,
    primaryUnit: '',
    primaryLabel: 'Estimated Construction Cost',
    secondaryHighlight: `Average ${formatCurrency(effectiveRatePerSqFt)} / sq ft for ${formatNumber(sqFt, 0)} sq ft`,
    breakdown,
    recommendation: `Always budget a 10% to 15% contingency reserve above the mid-point estimate (${formatCurrency(Math.round(totalMid * 0.12))}) to handle material price swings and plan changes during construction.`,
    assumptions: [
      `Quality tier selected: ${inputs.qualityTier.toUpperCase()}.`,
      `Does not include land purchase price, extensive land clearing/grading, or utility tap-in connection fees.`,
      `Labor and regional costs assume an adjustment factor of ${region}x national benchmark.`,
    ],
  }
}
