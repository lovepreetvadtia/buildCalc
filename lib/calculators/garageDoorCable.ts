import { CalculatorResult, UnitSystem } from './types'
import { formatNumber } from '../units/conversions'

export interface GarageDoorCableInputs {
  doorHeightFeet: number // 7, 8, 9, 10, 12, 14
  doorHeightExtraInches?: number // 0 to 11
  systemType?: 'torsion_standard' | 'torsion_high_lift' | 'torsion_vertical' | 'extension_spring'
  highLiftInches?: number // only for high lift
  doorWeightClass?: 'residential_light' | 'residential_heavy' | 'commercial'
  unitSystem?: UnitSystem
}

export function calculateGarageDoorCable(inputs: GarageDoorCableInputs): CalculatorResult {
  const heightFt = inputs.doorHeightFeet || 7
  const heightExtraIn = inputs.doorHeightExtraInches || 0
  const totalDoorHeightInches = (heightFt * 12) + heightExtraIn

  let cableLengthInches = 0
  let systemDescription = 'Standard Torsion Lift (Standard 4" Drum)'
  let safetyAllowanceInches = 18 // dead wraps + bottom fixture loop
  let drumTypeNote = 'Standard 400-8 or 400-12 cable drum'

  switch (inputs.systemType) {
    case 'torsion_high_lift':
      const hlInches = inputs.highLiftInches || 24
      cableLengthInches = totalDoorHeightInches + hlInches + 24
      systemDescription = `High Lift Torsion (+${hlInches}" track elevation)`
      drumTypeNote = 'Tapered High-Lift drum (e.g. 5250-54 or 54-HL)'
      safetyAllowanceInches = 24
      break
    case 'torsion_vertical':
      cableLengthInches = (totalDoorHeightInches * 2) + 12
      systemDescription = 'Vertical Lift Track (Zero Horizontal Radius)'
      drumTypeNote = 'Flat Commercial Vertical Lift drum (e.g. 850-11 or 1100-18)'
      safetyAllowanceInches = 18
      break
    case 'extension_spring':
      // Extension spring systems need main lift cable + safety containment cable
      cableLengthInches = totalDoorHeightInches + 38 // loop through spring pulley and front teardrop bracket
      systemDescription = 'Extension Spring Pulley System'
      drumTypeNote = 'Stationary pulley / Sheave wheels'
      safetyAllowanceInches = 38
      break
    case 'torsion_standard':
    default:
      // Standard lift: Door Height + 18" (for 4" drum standard 1.5 - 2 dead wraps)
      cableLengthInches = totalDoorHeightInches + 18
      systemDescription = 'Standard Lift Torsion Drum'
      drumTypeNote = 'Standard 4" (400-8) cable drums'
      safetyAllowanceInches = 18
      break
  }

  // Recommended cable diameter based on weight class
  let recommendedDiameter = '1/8" (7x19 Galvanized Aircraft Cable)'
  let workingLoadLimit = '400 lbs per pair'
  switch (inputs.doorWeightClass) {
    case 'residential_heavy':
      recommendedDiameter = '5/32" (7x19 Galvanized Aircraft Cable)'
      workingLoadLimit = '560 lbs per pair (Heavy insulated or wood doors)'
      break
    case 'commercial':
      recommendedDiameter = '3/16" (7x19 Galvanized Aircraft Cable)'
      workingLoadLimit = '840 lbs per pair (Full commercial overhead)'
      break
    case 'residential_light':
    default:
      recommendedDiameter = '1/8" (7x19 Galvanized Aircraft Cable)'
      workingLoadLimit = '350–400 lbs per pair (Standard 1 or 2 layer steel)'
      break
  }

  const lengthFtPart = Math.floor(cableLengthInches / 12)
  const lengthInRemainder = cableLengthInches % 12
  const formattedLength = `${lengthFtPart}' ${lengthInRemainder}" (${cableLengthInches} inches)`

  return {
    primaryValue: formattedLength,
    primaryUnit: 'per cable',
    primaryLabel: 'Required Cut Cable Length (Each Side)',
    secondaryHighlight: `Pair of 2 matching cables required • ${recommendedDiameter}`,
    breakdown: [
      {
        label: 'Door Height',
        value: `${heightFt}' ${heightExtraIn}"`,
        note: `${totalDoorHeightInches} inches total travel height`,
      },
      {
        label: 'System Lift Type',
        value: systemDescription,
      },
      {
        label: 'Drum Wrap & Loop Margin',
        value: `+${safetyAllowanceInches}"`,
        note: 'Ensures min 2 full dead wraps on drum at floor level + stop sleeves',
      },
      {
        label: 'Exact Cable Length (Each)',
        value: `${cableLengthInches} inches`,
        note: `${lengthFtPart} ft ${lengthInRemainder} in`,
      },
      {
        label: 'Recommended Cable Wire Gauge',
        value: recommendedDiameter,
        note: workingLoadLimit,
      },
      {
        label: 'Drum / Sheave Type',
        value: drumTypeNote,
      },
      ...(inputs.systemType === 'extension_spring'
        ? [
            {
              label: 'Safety Containment Cable Length',
              value: `${totalDoorHeightInches + 24} inches`,
              note: 'Threaded through center of spring to contain spring if breakage occurs',
            },
          ]
        : []),
    ],
    recommendation: `Always replace cables in pairs to maintain balanced tension. Ensure at least two complete safety wraps remain around the drum when the garage door is in the fully closed position.`,
    assumptions: [
      `Assumes standard bottom bracket corner bracket loop pin attachment.`,
      `Includes safety allowance for drum dead wraps and end ferrule/stop crimps.`,
      `Garage door springs operate under extreme mechanical tension; exercise caution or consult a certified technician.`,
    ],
  }
}
