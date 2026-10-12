'use client'

import React from 'react'
import { ConcreteCalculatorUI } from './tools/ConcreteCalculatorUI'
import { ConcreteSlabUI } from './tools/ConcreteSlabUI'
import { ConcreteMixDesignUI } from './tools/ConcreteMixDesignUI'
import { HouseCostUI } from './tools/HouseCostUI'
import { CostPerSqFtUI } from './tools/CostPerSqFtUI'
import { DeckFootingUI } from './tools/DeckFootingUI'
import { BasementMaterialsUI } from './tools/BasementMaterialsUI'
import { FoundationCostUI } from './tools/FoundationCostUI'
import { PatioSlopeUI } from './tools/PatioSlopeUI'
import { WallPanelingUI } from './tools/WallPanelingUI'
import { StoneWallUI } from './tools/StoneWallUI'
import { PineStrawMulchUI } from './tools/PineStrawMulchUI'
import { GarageDoorCableUI } from './tools/GarageDoorCableUI'

export function CalculatorToolRouter({ slug }: { slug: string }) {
  switch (slug) {
    case 'house-construction-cost-calculator':
      return <HouseCostUI />
    case 'foundation-cost-calculator':
      return <FoundationCostUI />
    case 'construction-cost-per-square-foot-calculator':
      return <CostPerSqFtUI />
    case 'concrete-calculator':
      return <ConcreteCalculatorUI />
    case 'concrete-slab-calculator':
      return <ConcreteSlabUI />
    case 'concrete-mix-design-calculator':
      return <ConcreteMixDesignUI />
    case 'deck-footing-size-calculator':
      return <DeckFootingUI />
    case 'basement-materials-calculator':
      return <BasementMaterialsUI />
    case 'patio-slope-calculator':
      return <PatioSlopeUI />
    case 'wall-paneling-calculator':
      return <WallPanelingUI />
    case 'stone-wall-calculator':
      return <StoneWallUI />
    case 'pine-straw-mulch-calculator':
      return <PineStrawMulchUI />
    case 'garage-door-cable-length-calculator':
      return <GarageDoorCableUI />
    default:
      return <ConcreteCalculatorUI />
  }
}
