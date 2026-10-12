import { describe, it, expect } from 'vitest'
import { calculateConcrete } from '@/lib/calculators/concrete'
import { calculateConcreteSlab } from '@/lib/calculators/concreteSlab'
import { calculateConcreteMixDesign } from '@/lib/calculators/concreteMixDesign'
import { calculateHouseConstructionCost } from '@/lib/calculators/houseCost'
import { calculateCostPerSquareFoot } from '@/lib/calculators/costPerSqFt'
import { calculateDeckFooting } from '@/lib/calculators/deckFooting'
import { calculateBasementMaterials } from '@/lib/calculators/basementMaterials'
import { calculatePatioSlope } from '@/lib/calculators/patioSlope'
import { calculateWallPaneling } from '@/lib/calculators/wallPaneling'
import { calculateStoneWall } from '@/lib/calculators/stoneWall'
import { calculatePineStrawMulch } from '@/lib/calculators/pineStrawMulch'
import { calculateGarageDoorCable } from '@/lib/calculators/garageDoorCable'
import { calculateFoundationCost } from '@/lib/calculators/foundationCost'

describe('BuildCalc Calculation Engine Test Suite', () => {
  // 1. Concrete Calculator
  describe('Concrete Calculator', () => {
    it('calculates slab volume and bag counts accurately', () => {
      // 20 ft x 10 ft x 4 in = 200 sq ft * (4/12) ft = 66.67 cu ft = 2.47 cu yd net
      // with 10% waste = 2.72 cu yd
      const result = calculateConcrete({
        shape: 'slab',
        length: 20,
        width: 10,
        thickness: 4,
        wastePercentage: 10,
      })
      expect(result.primaryValue).toBe('2.72')
      expect(result.primaryUnit).toBe('yd³')
      expect(result.breakdown.length).toBeGreaterThan(3)
    })

    it('calculates column / cylinder volume accurately', () => {
      const result = calculateConcrete({
        shape: 'column',
        diameter: 12,
        depth: 4,
        quantity: 4,
        wastePercentage: 5,
      })
      expect(parseFloat(result.primaryValue as string)).toBeGreaterThan(0.4)
    })
  })

  // 2. Concrete Slab Calculator
  describe('Concrete Slab Material Calculator', () => {
    it('calculates slab volume, gravel base, and rebar', () => {
      const result = calculateConcreteSlab({
        length: 20,
        width: 30,
        thickness: 4,
        gravelBaseDepth: 4,
        reinforcement: 'rebar18',
        wastePercentage: 10,
      })
      // 600 sq ft * 4" = 200 cu ft = 7.41 cu yd net -> 8.15 cu yd with 10% waste
      expect(result.primaryValue).toBe('8.15')
      expect(result.breakdown.some(b => b.label.includes('Crushed Gravel Base'))).toBe(true)
      expect(result.breakdown.some(b => b.label.includes('Rebar'))).toBe(true)
    })
  })

  // 3. Concrete Mix Design
  describe('Concrete Mix Design Calculator', () => {
    it('calculates Portland cement bags and sand/gravel weight for 1 yd³', () => {
      const result = calculateConcreteMixDesign({
        targetVolume: 1,
        volumeUnit: 'cuyd',
        mixRatio: '1:2:3',
      })
      // 1 cu yd wet = 27 cu ft * 1.54 = 41.58 cu ft dry. Cement part = 1/6 * 41.58 = 6.93 => 7 bags
      expect(result.primaryValue).toBe('7')
      expect(result.primaryUnit).toBe('bags (94 lb)')
    })
  })

  // 4. House Construction Cost
  describe('House Construction Cost Calculator', () => {
    it('provides realistic cost ranges for 2500 sq ft standard house', () => {
      const result = calculateHouseConstructionCost({
        houseSize: 2500,
        stories: 2,
        qualityTier: 'standard',
        basementType: 'unfinished',
        garageStalls: 2,
        foundationType: 'slab',
      })
      expect(result.primaryLabel).toBe('Estimated Construction Cost')
      expect(result.breakdown.length).toBeGreaterThan(5)
    })
  })

  // 5. Cost Per Square Foot
  describe('Cost Per Square Foot Calculator', () => {
    it('computes total with contingency correctly', () => {
      const result = calculateCostPerSquareFoot({
        totalArea: 1000,
        projectType: 'newConstruction',
        finishLevel: 'midRange',
        includeContingency: true,
        contingencyPercent: 10,
      })
      // 1000 * 175 = $175,000 + 10% = $192,500
      expect(result.primaryValue).toBe('$192,500')
    })
  })

  // 6. Deck Footing Size
  describe('Deck Footing Size Calculator', () => {
    it('recommends valid diameter based on load and soil bearing', () => {
      const result = calculateDeckFooting({
        deckLength: 16,
        deckWidth: 12,
        soilBearingCapacity: 2000,
        designLoad: 50,
        frostDepth: 36,
      })
      expect(result.primaryUnit).toBe('diameter')
      expect(result.breakdown.some(b => b.label.includes('Frost Depth'))).toBe(true)
    })
  })

  // 7. Basement Materials
  describe('Basement Materials Calculator', () => {
    it('calculates CMU block count for given perimeter and height', () => {
      const result = calculateBasementMaterials({
        perimeterLength: 140,
        wallHeight: 8,
        wallThickness: 8,
        wallType: 'cmuBlock',
        wastePercentage: 8,
      })
      // 140 * 8 = 1120 sq ft * 1.125 = 1260 blocks * 1.08 = ~1361 blocks
      expect(result.primaryUnit).toBe('CMU Blocks')
      expect(parseInt((result.primaryValue as string).replace(/,/g, ''), 10)).toBeGreaterThan(1200)
    })
  })

  // 8. Patio Slope
  describe('Patio Slope Calculator', () => {
    it('calculates 1/4" per foot elevation drop on 16ft run', () => {
      const result = calculatePatioSlope({
        runLength: 16,
        patioWidth: 12,
        slopePreset: 'standard_quarter',
      })
      // 16 ft * 0.25 in/ft = 4.00 inches
      expect(result.primaryValue).toBe('4 inches')
    })
  })

  // 9. Wall Paneling
  describe('Wall Paneling Calculator', () => {
    it('calculates 4x8 sheets subtracting door & window openings', () => {
      const result = calculateWallPaneling({
        wallLength: 20,
        wallHeight: 8,
        numberOfWalls: 1,
        doorCount: 1,
        windowCount: 1,
        panelType: 'sheet_4x8',
        cutWastePercent: 10,
      })
      // Gross 160 sq ft - 21 (door) - 12 (window) = 127 sq ft * 1.1 = 139.7 sq ft / 32 = 5 sheets
      expect(result.primaryValue).toBe('5')
    })
  })

  // 10. Stone Wall
  describe('Stone Wall Calculator', () => {
    it('estimates natural stone tonnage and gravel backfill', () => {
      const result = calculateStoneWall({
        wallLength: 20,
        wallHeight: 3,
        thicknessTopInches: 12,
        thicknessBottomInches: 18,
        wallStyle: 'dryStack',
        stoneType: 'fieldstone',
      })
      expect(result.primaryUnit).toBe('Tons of Natural Stone')
      expect(parseFloat(result.primaryValue as string)).toBeGreaterThan(4)
    })
  })

  // 11. Pine Straw Mulch
  describe('Pine Straw Mulch Calculator', () => {
    it('estimates bales for 300 sq ft bed at 3 inch depth', () => {
      const result = calculatePineStrawMulch({
        bedLength: 30,
        bedWidth: 10,
        depthInches: 3,
        baleType: 'square_standard',
      })
      // 300 sq ft / 35 = 8.57 * 1.08 = 10 bales
      expect(result.primaryValue).toBe('10')
    })
  })

  // 12. Garage Door Cable Length
  describe('Garage Door Cable Length Calculator', () => {
    it('calculates exact cut length for standard 7ft door', () => {
      const result = calculateGarageDoorCable({
        doorHeightFeet: 7,
        doorHeightExtraInches: 0,
        systemType: 'torsion_standard',
      })
      // 7ft (84 in) + 18 in = 102 in = 8' 6"
      expect(result.primaryValue).toContain('8\' 6"')
    })
  })

  // 13. Foundation Cost Calculator
  describe('House Foundation Cost Calculator', () => {
    it('calculates monolithic slab foundation cost, concrete yards, and breakdown', () => {
      const result = calculateFoundationCost({
        foundationType: 'monolithicSlab',
        length: 40,
        width: 30,
        slabThickness: 4,
        soilCondition: 'standard',
        includeExcavation: true,
        includeLabor: true,
      })
      // 1200 sq ft footprint
      expect(result.primaryUnit).toBe('Estimated Total Cost')
      expect(result.breakdown.length).toBeGreaterThan(6)
      expect(result.secondaryHighlight).toContain('/ sq ft')
      // Footprint 1200 sq ft, perimeter 140 ft
      const concreteItem = result.breakdown.find(b => b.label.includes('Concrete Volume'))
      expect(concreteItem).toBeDefined()
      expect(parseFloat(concreteItem!.value as string)).toBeGreaterThan(15)
    })

    it('adjusts costs for stem wall and clay soil condition', () => {
      const result = calculateFoundationCost({
        foundationType: 'stemWall',
        length: 50,
        width: 30,
        soilCondition: 'clay',
      })
      expect(result.recommendation).toContain('Stem wall')
    })
  })
})
