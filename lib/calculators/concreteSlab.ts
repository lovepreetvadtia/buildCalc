import { CalculatorResult, UnitSystem, BreakdownItem } from './types'
import { formatNumber } from '../units/conversions'

export interface ConcreteSlabInputs {
  length: number // ft (or m)
  width: number // ft (or m)
  thickness: number // inches (or cm)
  gravelBaseDepth?: number // inches (or cm)
  reinforcement?: 'none' | 'mesh' | 'rebar12' | 'rebar18' | 'rebar24'
  vaporBarrier?: boolean
  wastePercentage?: number // %
  unitSystem?: UnitSystem
}

export function calculateConcreteSlab(inputs: ConcreteSlabInputs): CalculatorResult {
  const isMetric = inputs.unitSystem === 'metric'
  const waste = Math.max(0, inputs.wastePercentage ?? 10) / 100

  const lengthFt = isMetric ? inputs.length * 3.28084 : inputs.length
  const widthFt = isMetric ? inputs.width * 3.28084 : inputs.width
  const thickFt = isMetric ? (inputs.thickness / 30.48) : (inputs.thickness / 12)
  const gravelDepthFt = isMetric ? ((inputs.gravelBaseDepth ?? 4) / 30.48) : ((inputs.gravelBaseDepth ?? 4) / 12)

  const areaSqFt = lengthFt * widthFt
  const areaSqM = areaSqFt * 0.092903
  const volumeCuFt = areaSqFt * thickFt
  const volumeCuYdNet = volumeCuFt / 27
  const volumeCuYdWithWaste = volumeCuYdNet * (1 + waste)
  const volumeCuMWithWaste = volumeCuYdWithWaste * 0.764555

  // Gravel Base: 1 cu yd of compacted gravel ≈ 1.4 to 1.5 tons
  const gravelCuFt = areaSqFt * gravelDepthFt
  const gravelCuYd = (gravelCuFt / 27) * 1.1 // 10% compaction/waste
  const gravelTons = gravelCuYd * 1.4

  // Reinforcement
  let rebarFootage = 0
  let rebarSticks20ft = 0
  let meshSqFt = 0

  if (inputs.reinforcement === 'mesh') {
    meshSqFt = areaSqFt * 1.15 // 15% overlap
  } else if (inputs.reinforcement && inputs.reinforcement.startsWith('rebar')) {
    const spacingInches = parseInt(inputs.reinforcement.replace('rebar', ''), 10) || 18
    const spacingFt = spacingInches / 12
    const rows = Math.ceil(widthFt / spacingFt) + 1
    const cols = Math.ceil(lengthFt / spacingFt) + 1
    rebarFootage = (rows * lengthFt + cols * widthFt) * 1.1 // 10% lap splice
    rebarSticks20ft = Math.ceil(rebarFootage / 20)
  }

  // Vapor barrier (rolls of 1000 sq ft, 10% overlap)
  const barrierSqFt = (inputs.vaporBarrier !== false) ? areaSqFt * 1.1 : 0
  const barrierRolls = barrierSqFt > 0 ? Math.ceil(barrierSqFt / 1000) : 0

  const primaryValue = isMetric
    ? formatNumber(volumeCuMWithWaste, 2)
    : formatNumber(volumeCuYdWithWaste, 2)
  const primaryUnit = isMetric ? 'm³' : 'yd³'

  const breakdown: BreakdownItem[] = [
    {
      label: 'Slab Area',
      value: isMetric ? formatNumber(areaSqM, 1) : formatNumber(areaSqFt, 0),
      unit: isMetric ? 'sq m' : 'sq ft',
    },
    {
      label: 'Concrete Volume (Net)',
      value: isMetric ? formatNumber(volumeCuFt * 0.0283168, 2) : formatNumber(volumeCuYdNet, 2),
      unit: isMetric ? 'm³' : 'yd³',
    },
    {
      label: 'Concrete Volume (with Waste)',
      value: primaryValue,
      unit: primaryUnit,
      note: `Includes ${inputs.wastePercentage ?? 10}% order margin`,
    },
    {
      label: 'Crushed Gravel Base',
      value: formatNumber(gravelTons, 1),
      unit: 'tons',
      note: `${formatNumber(gravelCuYd, 1)} yd³ compacted base (${inputs.gravelBaseDepth ?? 4}" depth)`,
    },
  ]

  if (inputs.reinforcement === 'mesh') {
    breakdown.push({
      label: 'Welded Wire Mesh',
      value: formatNumber(meshSqFt, 0),
      unit: 'sq ft',
      note: 'Includes 15% sheet overlap allowance',
    })
  } else if (inputs.reinforcement && inputs.reinforcement.startsWith('rebar')) {
    breakdown.push({
      label: '#4 (1/2") Rebar Sticks (20 ft)',
      value: formatNumber(rebarSticks20ft, 0),
      unit: 'sticks',
      note: `Total ~${formatNumber(rebarFootage, 0)} linear ft on ${inputs.reinforcement.replace('rebar', '')}" grid`,
    })
  }

  if (barrierSqFt > 0) {
    breakdown.push({
      label: '10-mil Vapor Barrier',
      value: formatNumber(barrierRolls, 0),
      unit: 'rolls (10x100 ft)',
      note: `${formatNumber(barrierSqFt, 0)} sq ft with 10% overlap`,
    })
  }

  return {
    primaryValue,
    primaryUnit,
    primaryLabel: 'Concrete Required for Slab',
    secondaryHighlight: `${formatNumber(areaSqFt, 0)} sq ft • ${inputs.thickness}" depth • ${formatNumber(gravelTons, 1)} tons gravel base`,
    breakdown,
    recommendation: `Order ${formatNumber(Math.ceil(volumeCuYdWithWaste * 4) / 4, 2)} yd³ ready-mix concrete to allow for minor grade irregularities. Ensure gravel base is thoroughly tamped/vibrated prior to pouring.`,
    assumptions: [
      `10% concrete waste / edge thickening margin applied.`,
      `Gravel base density estimated at 1.4 tons per cubic yard (compacted #57 or road base).`,
      'Rebar includes 30-diameter overlap splicing factor.',
    ],
  }
}
