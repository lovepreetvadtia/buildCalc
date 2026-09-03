import { CalculatorResult, UnitSystem } from './types'
import { formatNumber } from '../units/conversions'

export interface DeckFootingInputs {
  deckLength: number // ft along house
  deckWidth: number // ft projection from house
  beamSpan?: number // ft between posts
  attachedToHouse?: boolean
  soilBearingCapacity?: number // psf (1500=clay/soft, 2000=sandy silt, 3000=dense gravel/hardpan)
  designLoad?: number // psf (default 50 psf: 40 live + 10 dead; 60-70 for snow/hot tubs)
  frostDepth?: number // inches
  footingShape?: 'round' | 'square'
  unitSystem?: UnitSystem
}

export function calculateDeckFooting(inputs: DeckFootingInputs): CalculatorResult {
  const length = Math.max(4, inputs.deckLength || 16)
  const width = Math.max(4, inputs.deckWidth || 12)
  const soilCapacity = inputs.soilBearingCapacity || 2000
  const designLoad = inputs.designLoad || 50 // psf
  const frostDepthInches = Math.max(12, inputs.frostDepth || 36)
  const isAttached = inputs.attachedToHouse !== false

  // Number of footings and post calculation
  const maxSpan = inputs.beamSpan || 8
  const numPostsAlongLength = Math.ceil(length / maxSpan) + 1
  const beamLines = isAttached ? 1 : 2 // 1 line if ledger attached, 2 lines if freestanding
  const totalFootings = numPostsAlongLength * beamLines

  // Tributary area per exterior beam footing
  // Ledger carries 50% of the joist span if attached
  const tributaryWidth = isAttached ? (width / 2) : (width / 2)
  const tributaryLength = length / (numPostsAlongLength - 1)
  const tributaryAreaSqFt = tributaryWidth * tributaryLength

  // Load per footing
  const totalLoadLbs = tributaryAreaSqFt * designLoad

  // Required footing base area (sq ft) = Load (lbs) / Soil Bearing Capacity (psf)
  const requiredBaseAreaSqFt = totalLoadLbs / soilCapacity
  const requiredBaseAreaSqIn = requiredBaseAreaSqFt * 144

  // Minimum diameter for round footing: Area = pi * r^2 = pi * (d/2)^2 => d = sqrt(4 * Area / pi)
  const calcDiameterInches = Math.sqrt((4 * requiredBaseAreaSqIn) / Math.PI)
  // Round up to standard form tubes (8", 10", 12", 14", 16", 18", 20", 24")
  const standardSizes = [8, 10, 12, 14, 16, 18, 20, 24, 30]
  const recommendedDiameter = standardSizes.find(s => s >= calcDiameterInches) || 24

  // Footing thickness / pad thickness rule of thumb: thickness >= (diameter - post width) / 2 or min 6"-8"
  const footingPadThicknessInches = Math.max(8, Math.round(recommendedDiameter / 2))

  // Concrete volume per footing
  // Column: frost depth height
  const columnRadiusFt = (recommendedDiameter / 2) / 12
  const depthFt = frostDepthInches / 12
  const volumePerFootingCuFt = Math.PI * columnRadiusFt * columnRadiusFt * depthFt
  const totalConcreteCuFt = volumePerFootingCuFt * totalFootings
  const totalConcreteCuYd = (totalConcreteCuFt / 27) * 1.1 // 10% waste
  const bags80lbTotal = Math.ceil((totalConcreteCuFt * 1.1) / 0.60)

  return {
    primaryValue: `${recommendedDiameter}"`,
    primaryUnit: 'diameter',
    primaryLabel: 'Recommended Footing Base Diameter',
    secondaryHighlight: `${totalFootings} footings • ${formatNumber(totalConcreteCuYd, 2)} yd³ total concrete (${frostDepthInches}" depth)`,
    breakdown: [
      {
        label: 'Total Footings Needed',
        value: totalFootings,
        unit: 'posts / footings',
        note: `${numPostsAlongLength} posts per beam line across ${length} ft length`,
      },
      {
        label: 'Tributary Load per Footing',
        value: formatNumber(Math.round(totalLoadLbs), 0),
        unit: 'lbs',
        note: `${formatNumber(tributaryAreaSqFt, 1)} sq ft tributary area @ ${designLoad} psf`,
      },
      {
        label: 'Minimum Soil Bearing Requirement',
        value: formatNumber(Math.ceil(requiredBaseAreaSqIn), 0),
        unit: 'sq inches',
        note: `At assumed ${formatNumber(soilCapacity, 0)} psf soil capacity`,
      },
      {
        label: 'Recommended Form / Bell Diameter',
        value: `${recommendedDiameter}"`,
        unit: 'inches',
        note: `Standard Sonotube form or flared bell base`,
      },
      {
        label: 'Frost Depth Excavation',
        value: `${frostDepthInches}"`,
        unit: 'inches',
        note: 'Must extend below your local frost line',
      },
      {
        label: 'Total Ready-Mix Concrete',
        value: formatNumber(totalConcreteCuYd, 2),
        unit: 'cu yd',
        note: `Or approx ${bags80lbTotal} bags (80 lb) total across all ${totalFootings} footings`,
      },
    ],
    recommendation: `Always verify local frost line depth with your municipal building department (typically 12" in warm climates to 48"+ in northern states). Use flared plastic footing bases (e.g. Bigfoot / Pro-Base) if wide diameter is needed.`,
    assumptions: [
      `Design load calculated at ${designLoad} psf (40 psf live + 10 psf dead load).`,
      `Soil bearing capacity assumed at ${soilCapacity} psf.`,
      `Ledger board securely fastened to house structure bearing 50% of inner joist span.`,
    ],
  }
}
