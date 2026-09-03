import { CalculatorResult, UnitSystem } from './types'
import { formatNumber } from '../units/conversions'

export interface PineStrawInputs {
  bedLength?: number // ft
  bedWidth?: number // ft
  directAreaSqFt?: number // direct area override
  depthInches?: number // default 3" (2" for refresh, 4" for new bed weed suppression)
  baleType?: 'round_large' | 'square_standard' | 'mini_bale'
  strawVariety?: 'longleaf' | 'slash' | 'loblolly'
  isNewBed?: boolean
  unitSystem?: UnitSystem
}

export function calculatePineStrawMulch(inputs: PineStrawInputs): CalculatorResult {
  const isMetric = inputs.unitSystem === 'metric'
  let areaSqFt = inputs.directAreaSqFt || 0

  if (!areaSqFt) {
    const l = isMetric ? (inputs.bedLength || 10) * 3.28084 : (inputs.bedLength || 30)
    const w = isMetric ? (inputs.bedWidth || 3) * 3.28084 : (inputs.bedWidth || 10)
    areaSqFt = l * w
  }

  const depthIn = inputs.depthInches || (inputs.isNewBed ? 4 : 3)
  const depthFt = depthIn / 12

  const volumeCuFt = areaSqFt * depthFt
  const volumeCuYd = volumeCuFt / 27

  // Bale coverages:
  // Base coverage at standard 3-inch depth:
  // - Square bale (approx 14"x18"x36"): ~35 sq ft @ 3" depth (~45 sq ft @ 2")
  // - Round bale (approx 4ft diameter roll): ~100-120 sq ft @ 3" depth (~150 sq ft @ 2")
  // - Mini bale: ~20 sq ft @ 3" depth
  let sqFtCoverageAt3In = 35
  let baleName = 'Square Bales (standard)'

  switch (inputs.baleType) {
    case 'round_large':
      sqFtCoverageAt3In = 110
      baleName = 'Large Round Rolls'
      break
    case 'mini_bale':
      sqFtCoverageAt3In = 20
      baleName = 'Mini Bales'
      break
    case 'square_standard':
    default:
      sqFtCoverageAt3In = 35
      baleName = 'Square Bales'
      break
  }

  // Adjust coverage based on requested depth: Coverage = BaseCoverage * (3 / requestedDepth)
  const effectiveCoveragePerBale = sqFtCoverageAt3In * (3 / depthIn)
  const balesNeededNet = areaSqFt / effectiveCoveragePerBale
  const balesRecommended = Math.ceil(balesNeededNet * 1.08) // 8% edge tuck & fluff settling

  // Annual refresh: typically 1.5" top dress (approx 50% of original depth)
  const annualRefreshBales = Math.ceil(balesRecommended * 0.55)

  // Landscape pins / staples for edges (every 3 ft of perimeter)
  const estimatedPerimeterFt = Math.sqrt(areaSqFt) * 4
  const staplesNeeded = Math.ceil(estimatedPerimeterFt / 3) + 10

  const primaryValue = formatNumber(balesRecommended, 0)
  const primaryUnit = baleName

  return {
    primaryValue,
    primaryUnit,
    primaryLabel: `Total ${baleName} to Order`,
    secondaryHighlight: `${formatNumber(areaSqFt, 0)} sq ft • ${depthIn}" compacted layer depth • ${formatNumber(volumeCuYd, 2)} yd³`,
    breakdown: [
      {
        label: 'Total Landscape Bed Area',
        value: formatNumber(areaSqFt, 0),
        unit: 'sq ft',
        note: `Approx ${formatNumber(areaSqFt * 0.0929, 1)} sq meters`,
      },
      {
        label: 'Mulch Layer Depth',
        value: `${depthIn}"`,
        unit: 'inches',
        note: inputs.isNewBed ? 'Heavy 4" application for weed barrier' : 'Standard 3" bed application',
      },
      {
        label: 'Total Volume',
        value: formatNumber(volumeCuYd, 2),
        unit: 'cu yd',
        note: `${formatNumber(volumeCuFt, 1)} cu ft of fluffed needles`,
      },
      {
        label: `Coverage per ${baleName.slice(0, -1)}`,
        value: formatNumber(effectiveCoveragePerBale, 1),
        unit: 'sq ft / bale',
        note: `At ${depthIn}" thickness`,
      },
      {
        label: 'Recommended Purchase Quantity',
        value: formatNumber(balesRecommended, 0),
        unit: 'bales',
        note: 'Includes 8% settling and trench-tucking margin',
      },
      {
        label: 'Annual Refresh Maintenance',
        value: formatNumber(annualRefreshBales, 0),
        unit: 'bales / year',
        note: 'To restore vibrant color and 1.5" fresh layer next season',
      },
      {
        label: 'Tuck-Edge Landscape Staples',
        value: formatNumber(staplesNeeded, 0),
        unit: 'staples',
        note: '6-gauge steel pins along bed edges and slopes',
      },
    ],
    recommendation: `Longleaf pine straw is rich in natural resin, lasting 2–3 times longer with superior vibrant copper-auburn color compared to short-needle Slash or Loblolly varieties. Trench edges 3" deep and roll the needle edges under for a crisp golf-course finish.`,
    assumptions: [
      `Assumes pine straw is shaken out and fluffed during installation.`,
      `Includes 8% buffer for natural rain/gravity settling and deep border trench tucking.`,
    ],
  }
}
