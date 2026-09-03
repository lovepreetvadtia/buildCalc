export interface GuideItem {
  slug: string
  title: string
  category: string
  categoryName: string
  excerpt: string
  readTime: string
  calculatorSlug: string
  content: string
}

export const GUIDES: GuideItem[] = [
  {
    slug: 'how-much-concrete-do-i-need-for-a-slab',
    title: 'How Much Concrete Do I Need for a Slab?',
    category: 'concrete',
    categoryName: 'Concrete',
    excerpt: 'Step-by-step method to calculate cubic yards, thickness tolerances, gravel base prep, and rebar reinforcement.',
    readTime: '4 min read',
    calculatorSlug: 'concrete-slab-calculator',
    content: `
### The Core Slab Volume Formula

Concrete for flatwork (patios, shed slabs, garage floors, driveways) is measured and ordered in **cubic yards**.

$$\\text{Cubic Yards} = \\frac{\\text{Length (ft)} \\times \\text{Width (ft)} \\times (\\text{Thickness (in)} / 12)}{27}$$

#### Practical Example: 20 ft × 24 ft Garage Slab at 4 inches thick:
1. Convert 4 inches into feet: $4 \\div 12 = 0.333\\text{ ft}$.
2. Calculate cubic feet: $20 \\times 24 \\times 0.333 = 160\\text{ cu ft}$.
3. Convert to cubic yards: $160 \\div 27 = 5.93\\text{ cu yd}$.
4. **Add 10% safety margin**: $5.93 \\times 1.10 = 6.52\\text{ cu yd}$.

### Why You Must Always Order 10% Extra
- **Sub-grade irregularities**: Even a well-graded crushed gravel base will have low spots averaging 1/4" to 1/2".
- **Formwork deflection**: Wooden 2x4 forms bow outward under the extreme hydrostatic pressure of wet concrete.
- **Truck pump & chute residue**: Material remains coating the pump hopper and delivery chute.

### Pre-Mix Bags vs Ready-Mix Truck Delivery
- **Under 1 cubic yard (under 45 bags of 80 lb)**: Hand-mixing in a wheelbarrow or rented electric drum mixer is cost-effective.
- **Over 1 cubic yard**: Order ready-mix truck delivery. Hand-mixing 50+ bags before early batches begin initial set is physically exhausting and risks cold joints.
    `,
  },
  {
    slug: 'how-to-calculate-construction-cost-per-square-foot',
    title: 'How to Calculate Construction Cost Per Square Foot',
    category: 'project-cost',
    categoryName: 'Project Cost',
    excerpt: 'Understand what is included in square-foot estimates, labor vs material splits, and regional cost multipliers.',
    readTime: '5 min read',
    calculatorSlug: 'construction-cost-per-square-foot-calculator',
    content: `
### What Is Cost Per Square Foot?

Cost per square foot is a standard benchmark used by builders, architects, and appraisers to estimate total construction budgets during early planning phases.

$$\\text{Total Project Cost} = \\text{Conditioned Living Area (sq ft)} \\times \\text{Cost per Sq Ft}$$

### What Factors Drive Cost Differences?
1. **Finish Specification Tier**:
   - *Builder-grade ($120–$140/sqft)*: Stock vinyl flooring, laminate countertops, prefabricated fiberglass showers.
   - *Mid-range ($160–$200/sqft)*: Engineered hardwood, quartz surfaces, tiled showers, solid wood cabinetry.
   - *High-end ($230–$320/sqft)*: Custom architectural millwork, natural stone, high-efficiency geothermal/heat-pump HVAC.
2. **Project Complexity**:
   - Kitchen and bathroom remodels cost significantly more per square foot ($175–$350/sqft) than open bedrooms or detached garages ($45–$80/sqft) due to concentrated plumbing, tile, and electrical trades.
3. **Contingency Reserves**:
   - Always budget a minimum 10% to 15% contingency for unforeseen structural, foundation, or code compliance items.
    `,
  },
  {
    slug: 'what-is-the-correct-patio-slope-for-drainage',
    title: 'What Is the Correct Patio Slope for Drainage?',
    category: 'landscaping',
    categoryName: 'Landscaping',
    excerpt: 'Calculate drop rates, pitch per linear foot, bedding sand depth, and drainage rules to protect your home foundation.',
    readTime: '3 min read',
    calculatorSlug: 'patio-slope-calculator',
    content: `
### The Golden Rule of Hardscape Drainage

Every patio, walkway, and driveway installed adjacent to a residential structure must slope **away from the foundation** to prevent standing water, hydrostatic basement leaks, and frost heave.

### The Standard Drainage Pitch: 1/4" Per Foot (2.08% Grade)
- **Minimum allowable pitch**: 1/8" per foot (~1%), acceptable only for smooth, impervious monolithic concrete slabs.
- **Recommended standard pitch**: **1/4" per linear foot (~2%)**, ideal for paver patios, flagstone, and textured masonry with surface joint friction.

#### Quick Drop Reference:
- 8-foot patio run $\\rightarrow$ **2.0 inches total drop**
- 12-foot patio run $\\rightarrow$ **3.0 inches total drop**
- 16-foot patio run $\\rightarrow$ **4.0 inches total drop**
- 20-foot patio run $\\rightarrow$ **5.0 inches total drop**

### Base Preparation Layers
1. **Compacted Sub-Base**: 4" to 6" of crushed aggregate (Class 5 / Road Base) tamped in 2" lifts.
2. **Bedding Sand Layer**: Exactly 1" of uncompacted coarse concrete sand, screeded true along the pitched grade.
3. **Polymeric Joint Sand**: Swept into paver joints and activated with light water mist to lock pavers and prevent weed intrusion.
    `,
  },
  {
    slug: 'how-much-material-do-i-need-for-a-stone-wall',
    title: 'How Much Material Do I Need for a Stone Wall?',
    category: 'landscaping',
    categoryName: 'Landscaping',
    excerpt: 'Estimate natural stone tonnage, battered retaining thickness, drainage stone backfill, and masonry mortar.',
    readTime: '4 min read',
    calculatorSlug: 'stone-wall-calculator',
    content: `
### Gravity Retaining Walls vs Freestanding Walls

When building with natural stone (fieldstone, flagstone, river rock, cut ashlar):
- **Freestanding Garden Walls**: Uniform thickness (typically 12" to 14" wide) across the full height.
- **Retaining Walls**: Must be **battered** (tapered) backward into the slope at a rate of 1" to 2" setback per foot of height to counteract earth pressure.

### Stone Weight Calculation
Natural stone weighs approximately 140 to 165 lbs per cubic foot solid. When stacked in a dry-stack retaining wall with natural air voids, density averages **125 to 135 lbs per cubic foot**.

$$\\text{Stone Tons} = \\frac{\\text{Length (ft)} \\times \\text{Height (ft)} \\times \\text{Avg Thickness (ft)} \\times 130\\text{ lbs/cuft} \\times 1.10}{2000}$$

### Essential Drainage Protection
The #1 cause of retaining wall failure is **hydrostatic water pressure**, not soil weight. Always install:
- A 12-inch wide zone of 3/4" clean washed gravel directly behind the stone wall.
- A 4" perforated drain pipe at the base, sloped to daylight.
    `,
  },
  {
    slug: 'how-to-estimate-house-construction-costs',
    title: 'How to Estimate House Construction Costs',
    category: 'project-cost',
    categoryName: 'Project Cost',
    excerpt: 'Detailed breakdown of major building phases: framing, mechanical trades, foundation, interior finishes, and permits.',
    readTime: '6 min read',
    calculatorSlug: 'house-construction-cost-calculator',
    content: `
### Step-by-Step House Construction Budgeting

Building a custom home involves dozens of trades. According to NAHB (National Association of Home Builders) benchmarks, the average single-family home budget breaks down into clear proportional buckets:

1. **Site Work & Foundation (~12%)**: Excavation, footings, poured concrete walls or slab-on-grade, backfilling, and waterproofing.
2. **Framing & Truss Structure (~18%)**: Dimensional lumber, engineered floor trusses, roof rafters, and OSB structural sheathing.
3. **Exterior Envelope (~14%)**: Roofing shingles, windows, exterior entry doors, siding/brick cladding, and weather-resistive barriers.
4. **Mechanical, Electrical & Plumbing (~15%)**: Rough-in plumbing, electrical wiring, main service panel, HVAC ductwork and heat pump units.
5. **Interior Finishes (~25%)**: Drywall hanging/finishing, interior doors, trim/casing, kitchen and bath cabinetry, countertops, tile, paint, and flooring.
6. **Builder Overhead, Permits & Contingency (~16%)**: Municipal plan check fees, general liability insurance, dumpster rentals, builder margin, and 10% contingency reserve.
    `,
  },
  {
    slug: 'how-much-mulch-do-i-need',
    title: 'How Much Pine Straw Mulch Do I Need for Landscaping?',
    category: 'landscaping',
    categoryName: 'Landscaping',
    excerpt: 'Calculate round rolls vs square bales, layer thickness, seasonal refresh rates, and weed suppression tips.',
    readTime: '3 min read',
    calculatorSlug: 'pine-straw-mulch-calculator',
    content: `
### Pine Straw Coverage Guidelines

Pine straw is one of the most natural, acid-loving, and aesthetically pleasing mulches for trees, shrubs, and perennial beds.

### Square Bales vs Large Round Rolls
- **Standard Square Bale**: Covers approximately **35 square feet** at a standard 3-inch depth (45 sq ft at 2" refresh depth).
- **Large Round Roll**: Covers approximately **100 to 120 square feet** at a 3-inch depth. One round roll equals roughly 3 to 3.5 square bales.

### Application Depth Recommendations
- **New Planting Beds**: 3 to 4 inches thick (suppresses weed seed germination and retains ground moisture).
- **Annual Spring/Fall Refresh**: 1.5 to 2 inches top-dress layer to restore vibrant copper color.

### Professional Finishing Tip: Trenching
Before laying pine straw, spade-trench a 3-inch deep clean V-groove along the bed perimeter. Roll the outer edge of the straw under into the groove with a garden fork for a crisp, wind-resistant border.
    `,
  },
]

export function getGuideBySlug(slug: string): GuideItem | undefined {
  return GUIDES.find((g) => g.slug === slug)
}
