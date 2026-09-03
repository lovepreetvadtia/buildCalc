import { CalculatorResult, UnitSystem } from './types'
import { formatNumber } from '../units/conversions'

export interface WallPanelingInputs {
  wallLength: number // ft
  wallHeight: number // ft
  numberOfWalls?: number // default 1
  doorCount?: number // standard 21 sq ft (3x7)
  windowCount?: number // standard 12 sq ft (3x4)
  panelType?: 'sheet_4x8' | 'sheet_4x10' | 'shiplap_6in' | 'shiplap_8in' | 'board_batten' | 'custom'
  customPanelWidthInches?: number
  customPanelHeightFeet?: number
  cutWastePercent?: number // 10% standard, 15% complex
  unitSystem?: UnitSystem
}

export function calculateWallPaneling(inputs: WallPanelingInputs): CalculatorResult {
  const length = Math.max(1, inputs.wallLength || 14)
  const height = Math.max(1, inputs.wallHeight || 8)
  const wallCount = inputs.numberOfWalls || 1
  const doors = inputs.doorCount || 0
  const windows = inputs.windowCount || 0
  const waste = (inputs.cutWastePercent ?? 10) / 100

  const grossArea = length * height * wallCount
  const openingDeductions = (doors * 21) + (windows * 12)
  const netArea = Math.max(0, grossArea - openingDeductions)
  const netAreaWithWaste = netArea * (1 + waste)

  let panelUnitName = 'Sheets (4x8 ft)'
  let singlePanelArea = 32 // 4x8 = 32 sq ft
  let linearTrimFeet = length * wallCount

  switch (inputs.panelType) {
    case 'sheet_4x10':
      panelUnitName = 'Sheets (4x10 ft)'
      singlePanelArea = 40
      break
    case 'shiplap_6in':
      panelUnitName = 'Shiplap Boards (6" x 8 ft)'
      singlePanelArea = (5.25 / 12) * 8 // 5.25" exposed face
      break
    case 'shiplap_8in':
      panelUnitName = 'Shiplap Boards (8" x 8 ft)'
      singlePanelArea = (7.125 / 12) * 8 // 7.125" exposed face
      break
    case 'board_batten':
      panelUnitName = 'Sheets & Battens'
      singlePanelArea = 32
      break
    case 'custom':
      const wFt = (inputs.customPanelWidthInches || 48) / 12
      const hFt = inputs.customPanelHeightFeet || 8
      panelUnitName = `Panels (${inputs.customPanelWidthInches || 48}" × ${hFt}')`
      singlePanelArea = wFt * hFt
      break
    case 'sheet_4x8':
    default:
      panelUnitName = 'Sheets (4x8 ft)'
      singlePanelArea = 32
      break
  }

  const panelsNet = Math.ceil(netArea / singlePanelArea)
  const panelsWithWaste = Math.ceil(netAreaWithWaste / singlePanelArea)

  // Construction adhesive: approx 1 x 10oz tube per 3 sheets (or 100 sq ft)
  const adhesiveTubes = Math.max(1, Math.ceil(netArea / 80))

  return {
    primaryValue: formatNumber(panelsWithWaste, 0),
    primaryUnit: panelUnitName,
    primaryLabel: 'Total Panels / Sheets to Order',
    secondaryHighlight: `${formatNumber(netArea, 0)} sq ft net wall area (${formatNumber(grossArea, 0)} sq ft gross • ${doors} doors • ${windows} windows)`,
    breakdown: [
      {
        label: 'Gross Wall Surface Area',
        value: formatNumber(grossArea, 0),
        unit: 'sq ft',
      },
      {
        label: 'Door & Window Openings Subtracted',
        value: formatNumber(openingDeductions, 0),
        unit: 'sq ft',
        note: `${doors} door(s) & ${windows} window(s)`,
      },
      {
        label: 'Net Wall Coverage Required',
        value: formatNumber(netArea, 0),
        unit: 'sq ft',
      },
      {
        label: 'Net Panels Needed',
        value: formatNumber(panelsNet, 0),
        unit: 'panels',
      },
      {
        label: 'Total Recommended Order (with waste)',
        value: formatNumber(panelsWithWaste, 0),
        unit: 'panels',
        note: `Includes ${inputs.cutWastePercent ?? 10}% cut & pattern-match allowance`,
      },
      {
        label: 'Panel Construction Adhesive (10 oz tubes)',
        value: formatNumber(adhesiveTubes, 0),
        unit: 'tubes',
        note: 'Continuous bead pattern on studs / drywall backer',
      },
      {
        label: 'Perimeter Trim / Baseboard Footage',
        value: formatNumber(linearTrimFeet, 0),
        unit: 'linear ft',
      },
    ],
    recommendation: `For tongue-and-groove or shiplap installations, allow panels to acclimate in the conditioned room for 48–72 hours prior to installation to prevent seasonal buckling or gapping.`,
    assumptions: [
      `Standard interior door deduction estimated at 21 sq ft (3' x 7'); window estimated at 12 sq ft (3' x 4').`,
      `Includes ${inputs.cutWastePercent ?? 10}% cut waste allowance. For herringbone patterns, increase waste to 15–20%.`,
    ],
  }
}
