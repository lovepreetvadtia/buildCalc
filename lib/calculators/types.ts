export type UnitSystem = 'imperial' | 'metric'

export type InputType = 'number' | 'select' | 'text' | 'boolean'

export interface InputOption {
  label: string
  value: string | number
}

export interface InputFieldDefinition {
  id: string
  label: string
  type: InputType
  defaultValue: number | string | boolean
  unit?: string
  unitMetric?: string
  min?: number
  max?: number
  step?: number
  placeholder?: string
  helpText?: string
  options?: InputOption[]
}

export interface BreakdownItem {
  label: string
  value: string | number
  unit?: string
  note?: string
}

export interface CalculatorResult {
  primaryValue: string | number
  primaryUnit: string
  primaryLabel: string
  secondaryHighlight?: string
  breakdown: BreakdownItem[]
  recommendation?: string
  warnings?: string[]
  assumptions: string[]
}

export interface CalculatorMetadata {
  slug: string
  title: string
  shortTitle?: string
  category: 'construction' | 'concrete' | 'home-improvement' | 'landscaping' | 'project-cost'
  categoryName: string
  shortDescription: string
  seoTitle: string
  seoDescription: string
  icon: string
  featured?: boolean
  popularOrder?: number
  keywords: string[]
  synonyms: string[]
  formulaExplanation: {
    formula: string
    steps: string[]
    variables: { name: string; description: string }[]
  }
  defaultInputs: Record<string, any>
  relatedSlugs: string[]
  guideSlug?: string
}
