import { CalculatorResult, UnitSystem } from './types'
import { formatNumber } from '../units/conversions'

export interface StoneWallInputs {
  wallLength: number // ft
  wallHeight: number // ft
  thicknessTopInches?: number // default 12"
  thicknessBottomInches?: number // default 18" for retaining or 12" for freestanding
  wallStyle?: 'dryStack' | 'mortared'
  stoneType?: 'fieldstone' | 'flagstone' | 'cutAshlar' | 'riverRock'
  backfillGravelWidthInches?: number // default 12" behind retaining wall
  isRetainingWall?: boolean
  wastePercentage?: number
  unitSystem?: UnitSystem
}

export function calculateStoneWall(inputs: StoneWallInputs): CalculatorResult {
  const length = Math.max(1, inputs.wallLength || 20)
  const height = Math.max(1, inputs.wallHeight || 3)
  const topThickIn = inputs.thicknessTopInches || 12
  const bottomThickIn = inputs.thicknessBottomInches || (inputs.isRetainingWall !== false ? 18 : 12)
  const isMortared = inputs.wallStyle === 'mortared'
  const isRetaining = inputs.isRetainingWall !== false
  const waste = (inputs.wastePercentage ?? 10) / 100

  // Average wall thickness
  const avgThickFt = ((topThickIn + bottomThickIn) / 2) / 12
  const faceAreaSqFt = length * height
  const wallVolumeCuFt = faceAreaSqFt * avgThickFt
  const wallVolumeCuYd = wallVolumeCuFt / 27

  // Stone densities:
  // Solid stone ≈ 165 lbs/cu ft
  // Dry stack void ratio ~ 25% (density ≈ 120-130 lbs/cu ft loose/stacked)
  // Mortared stone ≈ 140-150 lbs/cu ft (stone + mortar)
  let densityLbsPerCuFt = 125
  switch (inputs.stoneType) {
    case 'flagstone':
      densityLbsPerCuFt = isMortared ? 145 : 130
      break
    case 'cutAshlar':
      densityLbsPerCuFt = isMortared ? 155 : 140
      break
    case 'riverRock':
      densityLbsPerCuFt = isMortared ? 140 : 120
      break
    case 'fieldstone':
    default:
      densityLbsPerCuFt = isMortared ? 145 : 125
      break
  }

  const stoneWeightLbs = wallVolumeCuFt * densityLbsPerCuFt * (1 + waste)
  const stoneTons = stoneWeightLbs / 2000

  // Mortar (approx 1 x 80lb bag of Type S or Type N per 8–10 sq ft of 12" mortared stone wall face)
  const mortarBags = isMortared ? Math.ceil((faceAreaSqFt * (avgThickFt / 1.0)) / 7.5) : 0

  // Drainage Gravel Backfill (for retaining walls: 12" wide trench behind the wall along full height & length)
  const backfillWidthFt = (inputs.backfillGravelWidthInches || 12) / 12
  const backfillCuFt = isRetaining ? (length * height * backfillWidthFt) : 0
  const backfillCuYd = (backfillCuFt / 27) * 1.15
  const backfillTons = backfillCuYd * 1.4 // 3/4" clean crushed stone

  const primaryValue = formatNumber(stoneTons, 2)

  return {
    primaryValue,
    primaryUnit: 'Tons of Natural Stone',
    primaryLabel: 'Estimated Natural Stone Quantity Required',
    secondaryHighlight: `${formatNumber(faceAreaSqFt, 0)} sq ft face • ${formatNumber(wallVolumeCuYd, 2)} yd³ volume • ${topThickIn}"–${bottomThickIn}" thickness`,
    breakdown: [
      {
        label: 'Wall Face Area',
        value: formatNumber(faceAreaSqFt, 0),
        unit: 'sq ft',
      },
      {
        label: 'Total Wall Volume',
        value: formatNumber(wallVolumeCuYd, 2),
        unit: 'cu yd',
        note: `${formatNumber(wallVolumeCuFt, 1)} cubic feet`,
      },
      {
        label: 'Total Stone Weight (with waste)',
        value: formatNumber(stoneTons, 2),
        unit: 'tons',
        note: `~${formatNumber(stoneWeightLbs, 0)} lbs stone (includes ${inputs.wastePercentage ?? 10}% sorting margin)`,
      },
      ...(isMortared
        ? [
            {
              label: 'Type S Masonry Mortar (80 lb bags)',
              value: formatNumber(mortarBags, 0),
              unit: 'bags',
              note: 'Full deep bed joints with washed masonry sand',
            },
          ]
        : [
            {
              label: 'Dry-Stack Void Allowance',
              value: '~25%',
              note: 'Interlocking natural stone stacking without mortar',
            },
          ]),
      ...(isRetaining
        ? [
            {
              label: 'Drainage Clean Gravel Backfill',
              value: formatNumber(backfillTons, 2),
              unit: 'tons',
              note: `${formatNumber(backfillCuYd, 2)} cu yd of 3/4" washed stone behind wall to relieve hydrostatic pressure`,
            },
            {
              label: 'Perforated Drain Pipe',
              value: formatNumber(length, 0),
              unit: 'linear ft',
              note: '4" perforated pipe at base wrapped in non-woven geotextile',
            },
          ]
        : []),
    ],
    recommendation: isRetaining && height > 3
      ? `Walls exceeding 3 feet in height typically require tiered terracing, geogrid reinforcement, and municipal permits/structural engineering verification.`
      : `Begin with a compacted crushed stone trench footing buried at least 6" below grade for stability.`,
    assumptions: [
      `Assumes average stone density of ~${densityLbsPerCuFt} lbs/cu ft based on ${inputs.stoneType || 'fieldstone'}.`,
      `Includes ${inputs.wastePercentage ?? 10}% sorting, fitting, and trimming waste.`,
      isRetaining ? `Includes a 12" continuous free-draining stone zone behind wall.` : 'Freestanding two-sided garden wall design.',
    ],
  }
}
