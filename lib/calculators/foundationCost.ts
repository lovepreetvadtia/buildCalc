import { CalculatorResult, UnitSystem, BreakdownItem } from './types'
import { formatCurrency, formatNumber } from '../units/conversions'

export type FoundationType = 'monolithicSlab' | 'stemWall' | 'pierAndBeam' | 'raft'
export type SoilCondition = 'standard' | 'clay' | 'rock' | 'sloped'

export interface FoundationCostInputs {
  foundationType: FoundationType
  length: number // ft
  width: number // ft
  slabThickness?: number // inches (default 4" for slab, 10" for raft)
  soilCondition?: SoilCondition
  includeExcavation?: boolean
  includeLabor?: boolean
  customCostPerSqFt?: number
  unitSystem?: UnitSystem
}

export function calculateFoundationCost(inputs: FoundationCostInputs): CalculatorResult {
  const length = Math.max(10, inputs.length || 40)
  const width = Math.max(10, inputs.width || 30)
  const foundationType = inputs.foundationType || 'monolithicSlab'
  const soilCondition = inputs.soilCondition || 'standard'
  const includeExcavation = inputs.includeExcavation !== false
  const includeLabor = inputs.includeLabor !== false

  const footprintArea = length * width
  const perimeter = 2 * (length + width)

  // 1. Concrete Volume Calculation (in cubic yards with 10% standard waste)
  let netConcreteCuYd = 0
  let defaultThicknessInches = 4

  switch (foundationType) {
    case 'monolithicSlab': {
      defaultThicknessInches = inputs.slabThickness || 4
      const slabCuYd = (footprintArea * (defaultThicknessInches / 12)) / 27
      // Thickened edge beam around perimeter (12" wide x 12" deep below slab)
      const edgeBeamCuYd = (perimeter * 1.0 * 1.0) / 27
      netConcreteCuYd = slabCuYd + edgeBeamCuYd
      break
    }
    case 'stemWall': {
      defaultThicknessInches = 4
      // Continuous footing (16" wide x 8" deep)
      const footingCuYd = (perimeter * (16 / 12) * (8 / 12)) / 27
      // 8" thick x 36" high stem wall
      const stemCuYd = (perimeter * (8 / 12) * 3.0) / 27
      // 4" floating interior slab
      const slabCuYd = (footprintArea * (4 / 12)) / 27
      netConcreteCuYd = footingCuYd + stemCuYd + slabCuYd
      break
    }
    case 'pierAndBeam': {
      defaultThicknessInches = 0
      // Perimeter grade beam (12" wide x 24" deep)
      const gradeBeamCuYd = (perimeter * 1.0 * 2.0) / 27
      // Interior drilled piers (12" diameter x 36" deep @ 8ft grid)
      const pierCols = Math.max(2, Math.floor(length / 8))
      const pierRows = Math.max(2, Math.floor(width / 8))
      const piersCount = pierCols * pierRows
      const singlePierCuYd = (Math.PI * Math.pow(0.5, 2) * 3.0) / 27
      const totalPiersCuYd = piersCount * singlePierCuYd
      netConcreteCuYd = gradeBeamCuYd + totalPiersCuYd
      break
    }
    case 'raft': {
      defaultThicknessInches = inputs.slabThickness || 10
      // Heavy continuous mat slab (10" to 14" thick)
      const matCuYd = (footprintArea * (defaultThicknessInches / 12)) / 27
      // Thickened exterior perimeter haunch (18" x 18")
      const haunchCuYd = (perimeter * 1.5 * 1.5) / 27
      netConcreteCuYd = matCuYd + haunchCuYd
      break
    }
  }

  const concreteCuYdWithWaste = netConcreteCuYd * 1.10

  // 2. Rebar & Steel Reinforcement (linear feet)
  let totalRebarFootage = 0
  switch (foundationType) {
    case 'monolithicSlab':
      // Grid @ 16" O.C. each way + 2 perimeter continuous bars
      totalRebarFootage = footprintArea * 1.5 + perimeter * 2
      break
    case 'stemWall':
      // Footing bars (3 continuous) + vertical dowels @ 32" + stem bond beam (2 bars) + slab mesh
      totalRebarFootage = perimeter * 5 + (perimeter / 2.66) * 4 + footprintArea * 1.2
      break
    case 'pierAndBeam':
      // Grade beam cage (4 bars) + pier vertical cages
      totalRebarFootage = perimeter * 4 + (footprintArea / 64) * 24
      break
    case 'raft':
      // Double mat reinforcement (top and bottom heavy grid #5 @ 12" O.C.)
      totalRebarFootage = footprintArea * 3.8 + perimeter * 4
      break
  }
  const rebarSticks20ft = Math.ceil(totalRebarFootage / 20)

  // 3. Sub-base Aggregates (4" compacted crushed gravel)
  const gravelCuYd = (footprintArea * (4 / 12)) / 27
  const gravelTons = gravelCuYd * 1.4

  // 4. Cost Estimates Breakdown
  // Excavation
  let baseExcavationRate = 1.90
  if (foundationType === 'stemWall') baseExcavationRate = 3.60
  else if (foundationType === 'pierAndBeam') baseExcavationRate = 2.80
  else if (foundationType === 'raft') baseExcavationRate = 2.40

  let soilMultiplier = 1.0
  if (soilCondition === 'clay') soilMultiplier = 1.35
  else if (soilCondition === 'rock') soilMultiplier = 2.15
  else if (soilCondition === 'sloped') soilMultiplier = 1.55

  const excavationCost = includeExcavation ? footprintArea * baseExcavationRate * soilMultiplier : 0

  // Material Costs
  const concreteUnitPrice = 158 // ready-mix per cubic yard delivered
  const rebarUnitPrice = 0.72 // per linear foot (#4 grade 60)
  const gravelUnitPrice = 36 // per ton delivered crushed stone
  const formworkMaterialCost = perimeter * 2.40 // lumber, stakes, release agent
  const vaporBarrierCost = footprintArea * 0.45 // 10-mil poly + tape

  const concreteCost = concreteCuYdWithWaste * concreteUnitPrice
  const rebarCost = totalRebarFootage * rebarUnitPrice
  const gravelCost = gravelTons * gravelUnitPrice
  const materialsCostTotal = concreteCost + rebarCost + gravelCost + formworkMaterialCost + vaporBarrierCost

  // Labor & Finishing Costs
  let baseLaborRatePerSqFt = 4.80 // Monolithic slab forming, pouring, power troweling
  if (foundationType === 'stemWall') baseLaborRatePerSqFt = 7.90 // multi-step trenching, forming, dual pour
  else if (foundationType === 'pierAndBeam') baseLaborRatePerSqFt = 6.20
  else if (foundationType === 'raft') baseLaborRatePerSqFt = 6.40

  const laborCostTotal = includeLabor ? footprintArea * baseLaborRatePerSqFt : 0

  let totalCost = excavationCost + materialsCostTotal + laborCostTotal

  if (inputs.customCostPerSqFt && inputs.customCostPerSqFt > 0) {
    totalCost = footprintArea * inputs.customCostPerSqFt
  }

  const costPerSqFt = totalCost / footprintArea

  // Type labels for display
  const typeLabels: Record<FoundationType, string> = {
    monolithicSlab: 'Monolithic Slab-on-Grade',
    stemWall: 'Stem Wall & T-Footing (Crawlspace/Slab)',
    pierAndBeam: 'Pier & Beam (Grade Beam Foundation)',
    raft: 'Raft / Mat Engineered Foundation',
  }

  const breakdown: BreakdownItem[] = [
    {
      label: 'Footprint Area',
      value: formatNumber(footprintArea, 0),
      unit: 'sq ft',
      note: `${length} ft × ${width} ft rectangle`,
    },
    {
      label: 'Perimeter Footing Length',
      value: formatNumber(perimeter, 0),
      unit: 'linear ft',
      note: 'Total exterior forming perimeter',
    },
    {
      label: 'Ready-Mix Concrete Volume',
      value: formatNumber(concreteCuYdWithWaste, 2),
      unit: 'yd³',
      note: 'Includes 10% standard delivery and over-excavation buffer',
    },
    {
      label: 'Rebar Reinforcement (#4)',
      value: formatNumber(totalRebarFootage, 0),
      unit: 'linear ft',
      note: `Approx. ${rebarSticks20ft} standard 20-ft rebar sticks`,
    },
    {
      label: 'Crushed Gravel Sub-Base (4")',
      value: formatNumber(gravelTons, 1),
      unit: 'tons',
      note: 'Compacted granular leveling pad',
    },
    {
      label: 'Concrete Material Cost',
      value: formatCurrency(concreteCost),
      note: `@ $${concreteUnitPrice}/yd³ delivered ready-mix`,
    },
    {
      label: 'Steel, Forms & Vapor Barrier',
      value: formatCurrency(rebarCost + formworkMaterialCost + vaporBarrierCost),
      note: 'Reinforcing steel, lumber forms, 10-mil poly',
    },
    {
      label: 'Excavation & Site Prep',
      value: formatCurrency(excavationCost),
      note: `${soilCondition.toUpperCase()} soil condition factor`,
    },
    {
      label: 'Masonry & Concrete Labor',
      value: formatCurrency(laborCostTotal),
      note: 'Forming, placing, finishing, stripping',
    },
  ]

  return {
    primaryValue: formatCurrency(totalCost),
    primaryUnit: 'Estimated Total Cost',
    primaryLabel: `House Foundation Cost (${typeLabels[foundationType]})`,
    secondaryHighlight: `${formatCurrency(costPerSqFt)} / sq ft`,
    breakdown,
    recommendation:
      foundationType === 'monolithicSlab'
        ? 'Monolithic slabs are the most cost-effective foundation for level sites with stable soils. Ensure a 4" to 6" crushed gravel capillary break is installed beneath the 10-mil vapor barrier.'
        : foundationType === 'stemWall'
        ? 'Stem wall foundations provide superior frost protection and easy crawlspace utility access. Verify local frost line depth with building code requirements.'
        : foundationType === 'raft'
        ? 'Raft/mat foundations distribute building loads uniformly across expansive clay or low-bearing capacity soils, minimizing differential settlement.'
        : 'Pier and beam systems elevate the structure above ground moisture and allow convenient crawlspace routing of HVAC, plumbing, and electrical lines.',
    warnings:
      soilCondition === 'rock'
        ? ['Rock or shallow ledge excavation may require hydraulic breakers or blasting, adding $1,500 to $4,500+ in equipment fees.']
        : soilCondition === 'sloped'
        ? ['Sloped sites require stepped footings and engineered cut-and-fill retaining profiles to avoid downslope erosion.']
        : undefined,
    assumptions: [
      'Standard residential rectangular footprint; complex corners increase forming labor by 10–15%.',
      'Concrete price estimated at $158/cu yd for 3,000–3,500 PSI mix delivered within 20 miles.',
      'Includes 10% safety margin for sub-grade irregularities and pump line residue.',
      'Excludes deep pile driving or municipal tree mitigation fees.',
    ],
  }
}
