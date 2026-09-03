import { CalculatorResult, UnitSystem, BreakdownItem } from './types'
import { formatNumber } from '../units/conversions'

export interface BasementMaterialsInputs {
  perimeterLength: number // linear ft (e.g. 140 ft for 30x40 basement)
  wallHeight: number // ft (e.g. 8 ft, 9 ft, 10 ft)
  wallThickness: number // inches (8, 10, 12)
  wallType: 'pouredConcrete' | 'cmuBlock'
  rebarSpacing?: number // inches (default 32" vertical, 16" horizontal)
  waterproofing?: boolean
  exteriorInsulation?: boolean
  wastePercentage?: number
  unitSystem?: UnitSystem
}

export function calculateBasementMaterials(inputs: BasementMaterialsInputs): CalculatorResult {
  const perimeter = Math.max(10, inputs.perimeterLength || 140)
  const height = Math.max(4, inputs.wallHeight || 8)
  const thicknessInches = inputs.wallThickness || 8
  const waste = (inputs.wastePercentage ?? 8) / 100

  const totalWallAreaSqFt = perimeter * height
  const thicknessFt = thicknessInches / 12

  // Poured Concrete calculations
  const concreteCuFt = totalWallAreaSqFt * thicknessFt
  const concreteCuYdNet = concreteCuFt / 27
  const concreteCuYdWithWaste = concreteCuYdNet * (1 + waste)

  // CMU Block calculations (Standard 8x8x16 block has face area of 8/12 * 16/12 = 0.888 sq ft => 1.125 blocks per sq ft)
  const blocksNet = Math.ceil(totalWallAreaSqFt * 1.125)
  const blocksWithWaste = Math.ceil(blocksNet * (1 + waste))

  // Mortar: 1 bag (80 lb) of Type S masonry mortar lays approx 30–35 standard 8" blocks
  const mortarBags = Math.ceil(blocksWithWaste / 32)

  // Rebar: Vertical bars (every 32") + Horizontal bond beam / courses (every 16" or 24")
  const vertBarsCount = Math.ceil((perimeter * 12) / (inputs.rebarSpacing || 32)) + 1
  const vertFootage = vertBarsCount * (height + 1.5) // 1.5 ft footing dowel overlap
  const horizCourses = Math.ceil(height / 2) // every 2 courses/4ft or bond beams
  const horizFootage = horizCourses * perimeter * 1.1
  const totalRebarFootage = (vertFootage + horizFootage) * 1.1
  const rebarSticks20ft = Math.ceil(totalRebarFootage / 20)

  // Waterproofing membrane (sq ft)
  const waterproofingSqFt = inputs.waterproofing !== false ? totalWallAreaSqFt * 1.1 : 0
  const waterproofingRolls = Math.ceil(waterproofingSqFt / 200) // 200 sq ft rolls

  // Rigid Foam Insulation (4x8 ft sheets = 32 sq ft each)
  const insulationSheets = inputs.exteriorInsulation ? Math.ceil((totalWallAreaSqFt * 1.05) / 32) : 0

  const isBlock = inputs.wallType === 'cmuBlock'
  const primaryValue = isBlock ? formatNumber(blocksWithWaste, 0) : formatNumber(concreteCuYdWithWaste, 2)
  const primaryUnit = isBlock ? 'CMU Blocks' : 'yd³ Concrete'
  const primaryLabel = isBlock ? 'Total 8x8x16 CMU Blocks Needed' : 'Poured Concrete Volume'

  const breakdown: BreakdownItem[] = [
    {
      label: 'Gross Wall Area',
      value: formatNumber(totalWallAreaSqFt, 0),
      unit: 'sq ft',
      note: `${perimeter} ft perimeter × ${height} ft wall height`,
    },
  ]

  if (isBlock) {
    breakdown.push(
      {
        label: 'CMU Concrete Blocks (8x8x16)',
        value: formatNumber(blocksWithWaste, 0),
        unit: 'blocks',
        note: `Includes ${inputs.wastePercentage ?? 8}% cut/breakage allowance`,
      },
      {
        label: 'Type S Mortar Bags (80 lb)',
        value: formatNumber(mortarBags, 0),
        unit: 'bags',
        note: 'Avg 32 blocks per bag with 3/8" bed joints',
      }
    )
  } else {
    breakdown.push(
      {
        label: 'Ready-Mix Concrete Volume',
        value: formatNumber(concreteCuYdWithWaste, 2),
        unit: 'cu yd',
        note: `${thicknessInches}" wall thickness with ${inputs.wastePercentage ?? 8}% pump/spillage allowance`,
      },
      {
        label: 'Concrete Net Volume',
        value: formatNumber(concreteCuYdNet, 2),
        unit: 'cu yd',
      }
    )
  }

  breakdown.push({
    label: '#4 (1/2") Rebar (20 ft lengths)',
    value: formatNumber(rebarSticks20ft, 0),
    unit: 'sticks',
    note: `Total ~${formatNumber(totalRebarFootage, 0)} linear ft (vertical + horizontal reinforcement)`,
  })

  if (waterproofingSqFt > 0) {
    breakdown.push({
      label: 'Foundation Waterproofing / Dampproofing',
      value: formatNumber(waterproofingSqFt, 0),
      unit: 'sq ft',
      note: `~${waterproofingRolls} self-adhering membrane rolls or emulsion buckets`,
    })
  }

  if (insulationSheets > 0) {
    breakdown.push({
      label: 'Exterior Rigid Foam (4x8 ft XPS/EPS)',
      value: formatNumber(insulationSheets, 0),
      unit: 'sheets',
      note: 'R-10 continuous perimeter insulation',
    })
  }

  return {
    primaryValue,
    primaryUnit,
    primaryLabel,
    secondaryHighlight: `${perimeter} ft perimeter • ${height} ft height • ${thicknessInches}" thickness`,
    breakdown,
    recommendation: `Ensure foundation footing drain tile (perforated 4" pipe with washed gravel sleeve) is installed along the entire exterior base perimeter before backfilling.`,
    assumptions: [
      `Standard CMU block nominal size 8" x 8" x 16" (actual 7-5/8" x 7-5/8" x 15-5/8" with 3/8" mortar joint).`,
      `Rebar vertical dowel tie-in assumes standard lap splices of 30 bar diameters.`,
      `Does not include window or egress well cutouts.`,
    ],
  }
}
