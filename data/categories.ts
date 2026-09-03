export interface CategoryDefinition {
  slug: string
  name: string
  description: string
  icon: string
  badgeText?: string
}

export const CATEGORIES: CategoryDefinition[] = [
  {
    slug: 'construction',
    name: 'Construction',
    description: 'House building, foundations, framing, materials, and project estimates.',
    icon: 'HardHat',
    badgeText: 'Structural & Framing',
  },
  {
    slug: 'concrete',
    name: 'Concrete',
    description: 'Volume, slabs, mix design, footings, and concrete materials.',
    icon: 'Layers',
    badgeText: 'Pours & Foundation',
  },
  {
    slug: 'home-improvement',
    name: 'Home Improvement',
    description: 'Wall paneling, garages, flooring, decks, and renovation calculations.',
    icon: 'Home',
    badgeText: 'Renovations & DIY',
  },
  {
    slug: 'landscaping',
    name: 'Landscaping',
    description: 'Mulch, patios, stone walls, gravel, soil, and outdoor projects.',
    icon: 'Trees',
    badgeText: 'Hardscape & Outdoor',
  },
  {
    slug: 'project-cost',
    name: 'Project Cost',
    description: 'Construction costs, material costs, labor estimates, and renovation budgets.',
    icon: 'DollarSign',
    badgeText: 'Budgeting & Bids',
  },
]
