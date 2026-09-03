// Unit Conversion Helpers for BuildCalc Engineering & Construction Calculators

export type UnitSystem = 'imperial' | 'metric'

// Length conversions (base unit: feet)
export const LengthConversions = {
  // to feet
  inToFt: (val: number) => val / 12,
  ydToFt: (val: number) => val * 3,
  mmToFt: (val: number) => val / 304.8,
  cmToFt: (val: number) => val / 30.48,
  mToFt: (val: number) => val * 3.28084,

  // from feet
  ftToIn: (val: number) => val * 12,
  ftToYd: (val: number) => val / 3,
  ftToMm: (val: number) => val * 304.8,
  ftToCm: (val: number) => val * 30.48,
  ftToM: (val: number) => val / 3.28084,
}

// Area conversions (base unit: sq feet)
export const AreaConversions = {
  // to sq feet
  sqInToSqFt: (val: number) => val / 144,
  sqYdToSqFt: (val: number) => val * 9,
  sqMToSqFt: (val: number) => val * 10.7639,
  sqCmToSqFt: (val: number) => val / 929.03,

  // from sq feet
  sqFtToSqIn: (val: number) => val * 144,
  sqFtToSqYd: (val: number) => val / 9,
  sqFtToSqM: (val: number) => val / 10.7639,
}

// Volume conversions (base unit: cubic feet)
export const VolumeConversions = {
  // to cubic feet
  cuYdToCuFt: (val: number) => val * 27,
  cuInToCuFt: (val: number) => val / 1728,
  cuMToCuFt: (val: number) => val * 35.3147,
  galToCuFt: (val: number) => val * 0.133681,
  lToCuFt: (val: number) => val * 0.0353147,

  // from cubic feet
  cuFtToCuYd: (val: number) => val / 27,
  cuFtToCuIn: (val: number) => val * 1728,
  cuFtToCuM: (val: number) => val / 35.3147,
  cuFtToGal: (val: number) => val / 0.133681,
  cuFtToL: (val: number) => val / 0.0353147,
}

// Weight conversions (base unit: pounds)
export const WeightConversions = {
  // to lbs
  tonToLbs: (val: number) => val * 2000,
  kgToLbs: (val: number) => val * 2.20462,
  tonneToLbs: (val: number) => val * 2204.62,

  // from lbs
  lbsToTon: (val: number) => val / 2000,
  lbsToKg: (val: number) => val / 2.20462,
  lbsToTonne: (val: number) => val / 2204.62,
}

/**
 * Format number with sensible precision and thousands separators
 */
export function formatNumber(val: number, maxDecimals: number = 2): string {
  if (isNaN(val) || !isFinite(val)) return '0'
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: maxDecimals,
    minimumFractionDigits: 0,
  }).format(val)
}

/**
 * Format currency with thousands separators
 */
export function formatCurrency(val: number): string {
  if (isNaN(val) || !isFinite(val)) return '$0'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(val)
}
