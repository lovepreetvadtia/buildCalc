import { CalculatorResult, UnitSystem } from './types'
import { formatCurrency, formatNumber } from '../units/conversions'

export interface CostPerSqFtInputs {
  totalArea: number // sq ft
  projectType: 'newConstruction' | 'homeAddition' | 'fullRemodel' | 'kitchenBath' | 'garageWorkshop' | 'custom'
  finishLevel: 'builderGrade' | 'midRange' | 'highEnd' | 'customLuxury'
  customRate?: number
  includeContingency?: boolean
  contingencyPercent?: number
  unitSystem?: UnitSystem
}

export function calculateCostPerSquareFoot(inputs: CostPerSqFtInputs): CalculatorResult {
  const sqFt = Math.max(10, inputs.totalArea || 1500)
  const contingency = (inputs.includeContingency !== false)
    ? (inputs.contingencyPercent ?? 12) / 100
    : 0

  // Base rate by project type & finish tier
  const baseRates: Record<string, Record<string, number>> = {
    newConstruction: {
      builderGrade: 130,
      midRange: 175,
      highEnd: 245,
      customLuxury: 360,
    },
    homeAddition: {
      builderGrade: 160,
      midRange: 215,
      highEnd: 290,
      customLuxury: 420,
    },
    fullRemodel: {
      builderGrade: 75,
      midRange: 125,
      highEnd: 190,
      customLuxury: 280,
    },
    kitchenBath: {
      builderGrade: 175,
      midRange: 260,
      highEnd: 375,
      customLuxury: 550,
    },
    garageWorkshop: {
      builderGrade: 45,
      midRange: 65,
      highEnd: 95,
      customLuxury: 140,
    },
  }

  let rate = baseRates[inputs.projectType]?.[inputs.finishLevel] || 175
  if (inputs.customRate && inputs.customRate > 0) {
    rate = inputs.customRate
  }

  const subtotal = sqFt * rate
  const contingencyAmount = subtotal * contingency
  const totalCost = Math.round(subtotal + contingencyAmount)
  const effectiveSqFtRate = totalCost / sqFt

  // Labor vs. Material split (avg 55% labor & subs, 45% materials & equipment)
  const materialsCost = Math.round(subtotal * 0.45)
  const laborCost = Math.round(subtotal * 0.55)

  return {
    primaryValue: formatCurrency(totalCost),
    primaryUnit: '',
    primaryLabel: 'Total Estimated Project Cost',
    secondaryHighlight: `${formatCurrency(effectiveSqFtRate)} / sq ft total (${formatNumber(sqFt, 0)} sq ft)`,
    breakdown: [
      {
        label: 'Base Rate per Sq Ft',
        value: formatCurrency(rate),
        unit: '/ sq ft',
      },
      {
        label: 'Base Construction Estimate',
        value: formatCurrency(subtotal),
      },
      {
        label: 'Estimated Materials & Equipment',
        value: formatCurrency(materialsCost),
        note: '~45% of direct cost',
      },
      {
        label: 'Estimated Labor & Trade Subcontractors',
        value: formatCurrency(laborCost),
        note: '~55% of direct cost',
      },
      {
        label: `Contingency Buffer (${inputs.contingencyPercent ?? 12}%)`,
        value: formatCurrency(contingencyAmount),
        note: 'Covers unforeseen framing, plumbing, or code adjustments',
      },
    ],
    recommendation: `For accurate contractor bidding, request itemized quotes separating material allowance from fixed labor scope.`,
    assumptions: [
      `Assumes standard accessible site conditions without hazardous material remediation.`,
      `Includes general contractor management overhead and direct jobsite labor.`,
    ],
  }
}
