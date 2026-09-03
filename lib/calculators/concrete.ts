import { CalculatorResult, UnitSystem } from './types'
import { formatNumber, VolumeConversions, LengthConversions } from '../units/conversions'

export interface ConcreteInputs {
  shape: 'slab' | 'column' | 'curb'
  // Slab / Curb
  length?: number // ft (or m in metric)
  width?: number // ft (or m in metric)
  thickness?: number // inches (or cm in metric)
  // Column
  diameter?: number // inches (or cm in metric)
  depth?: number // ft (or m in metric)
  quantity?: number
  wastePercentage?: number // e.g. 10%
  unitSystem?: UnitSystem
}

export function calculateConcrete(inputs: ConcreteInputs): CalculatorResult {
  const isMetric = inputs.unitSystem === 'metric'
  const waste = Math.max(0, inputs.wastePercentage ?? 10) / 100
  const qty = Math.max(1, inputs.quantity ?? 1)

  let volumeCuFt = 0

  if (inputs.shape === 'column') {
    const diaIn = isMetric ? (inputs.diameter ?? 30) / 2.54 : (inputs.diameter ?? 12)
    const depthFt = isMetric ? (inputs.depth ?? 1.2) * 3.28084 : (inputs.depth ?? 4)
    const radiusFt = (diaIn / 2) / 12
    volumeCuFt = Math.PI * radiusFt * radiusFt * depthFt * qty
  } else {
    // slab or curb
    const lengthFt = isMetric ? (inputs.length ?? 6) * 3.28084 : (inputs.length ?? 20)
    const widthFt = isMetric ? (inputs.width ?? 3) * 3.28084 : (inputs.width ?? 10)
    const thickFt = isMetric ? ((inputs.thickness ?? 10) / 30.48) : ((inputs.thickness ?? 4) / 12)
    volumeCuFt = lengthFt * widthFt * thickFt * qty
  }

  const volumeCuYdNet = volumeCuFt / 27
  const volumeCuYdWithWaste = volumeCuYdNet * (1 + waste)
  const volumeCuMNet = volumeCuFt * 0.0283168
  const volumeCuMWithWaste = volumeCuMNet * (1 + waste)

  // Bag estimates (standard ready-mix bags yield: 80lb=0.60 cu ft, 60lb=0.45 cu ft, 50lb=0.375 cu ft, 40lb=0.30 cu ft)
  const totalVolumeCuFtWithWaste = volumeCuFt * (1 + waste)
  const bags80lb = Math.ceil(totalVolumeCuFtWithWaste / 0.60)
  const bags60lb = Math.ceil(totalVolumeCuFtWithWaste / 0.45)
  const bags50lb = Math.ceil(totalVolumeCuFtWithWaste / 0.375)
  const bags40lb = Math.ceil(totalVolumeCuFtWithWaste / 0.30)

  const primaryValue = isMetric
    ? formatNumber(volumeCuMWithWaste, 2)
    : formatNumber(volumeCuYdWithWaste, 2)
  const primaryUnit = isMetric ? 'm³' : 'yd³'

  return {
    primaryValue,
    primaryUnit,
    primaryLabel: 'Concrete Volume Needed (with waste allowance)',
    secondaryHighlight: isMetric
      ? `${formatNumber(volumeCuMNet, 2)} m³ net volume`
      : `${formatNumber(volumeCuYdNet, 2)} yd³ (${formatNumber(volumeCuFt, 1)} cu ft) net`,
    breakdown: [
      {
        label: isMetric ? 'Net Volume' : 'Net Volume (Cubic Yards)',
        value: isMetric ? formatNumber(volumeCuMNet, 2) : formatNumber(volumeCuYdNet, 2),
        unit: isMetric ? 'm³' : 'yd³',
      },
      {
        label: isMetric ? 'Volume with Waste' : 'Volume with Waste (Cubic Yards)',
        value: isMetric ? formatNumber(volumeCuMWithWaste, 2) : formatNumber(volumeCuYdWithWaste, 2),
        unit: isMetric ? 'm³' : 'yd³',
        note: `Includes ${inputs.wastePercentage ?? 10}% safety margin`,
      },
      {
        label: 'Cubic Feet',
        value: formatNumber(totalVolumeCuFtWithWaste, 1),
        unit: 'cu ft',
      },
      {
        label: 'Cubic Meters',
        value: formatNumber(volumeCuMWithWaste, 2),
        unit: 'm³',
      },
      {
        label: '80 lb Pre-mix Bags',
        value: formatNumber(bags80lb, 0),
        unit: 'bags',
        note: 'Yield approx 0.60 cu ft per bag',
      },
      {
        label: '60 lb Pre-mix Bags',
        value: formatNumber(bags60lb, 0),
        unit: 'bags',
        note: 'Yield approx 0.45 cu ft per bag',
      },
    ],
    recommendation: `For ready-mix truck delivery, round up to nearest 0.25–0.5 yd³ (order ~${formatNumber(Math.ceil(volumeCuYdWithWaste * 4) / 4, 2)} yd³). For small pours under 1 yd³, consider ~${bags80lb} bags of 80lb ready-mix.`,
    assumptions: [
      `Waste and spillage allowance is set to ${inputs.wastePercentage ?? 10}%.`,
      'Pre-mix bag yields: 80 lb bag = 0.60 cu ft; 60 lb bag = 0.45 cu ft.',
      'Slab sub-grade is assumed level and uniformly compacted.',
    ],
  }
}
