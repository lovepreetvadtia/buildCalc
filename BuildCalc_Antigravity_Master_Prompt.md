# Master Prompt --- Construction Calculator Hub (Next.js + Vercel)

## Role

Act as a **senior product designer, UX engineer, SEO architect, and
Next.js developer**. Build a production-ready, fast, attractive,
SEO-focused calculator website for construction, home improvement,
landscaping, and building-material calculations.

The website will be generated and developed in **Antigravity**, using
**Next.js** and deployed on **Vercel**.

The goal is not to create a generic calculator directory. Build a
**premium, trustworthy construction utility platform** that can attract
organic search traffic, provide genuinely useful calculations, and
eventually monetize through Google AdSense, affiliate links, and
commercial lead generation.

------------------------------------------------------------------------

# 1. Product Concept

Create a website tentatively called:

**BuildCalc**

Tagline:

**"Practical calculators for real-world building projects."**

The product should help homeowners, contractors, builders, DIY users,
landscapers, and tradespeople quickly calculate quantities, dimensions,
materials, and project costs.

Initial calculator categories:

-   Construction
-   Concrete
-   Home Improvement
-   Landscaping
-   Project Cost

Initial target calculators:

1.  House Construction Cost Calculator
2.  Construction Cost Per Square Foot Calculator
3.  Concrete Calculator
4.  Concrete Slab Material Calculator
5.  Concrete Mix Design Calculator
6.  Deck Footing Size Calculator
7.  Basement Materials Calculator
8.  Patio Slope Calculator
9.  Wall Paneling Calculator
10. Stone Wall Calculator
11. Pine Straw Mulch Calculator
12. Garage Door Cable Length Calculator

The architecture must make it extremely easy to add 50--200+ calculators
later without rebuilding the application.

------------------------------------------------------------------------

# 2. Most Important Requirement --- Attractive Homepage

The homepage must NOT look like a generic calculator directory, a basic
Bootstrap website, or a Canva-style landing page.

It should feel like a **modern SaaS/product website combined with a
professional engineering utility platform**.

Design references in terms of quality and usability:

-   Modern SaaS landing pages
-   Professional engineering software
-   Premium calculator websites
-   Clean editorial layouts
-   High-quality documentation websites

Do NOT copy any existing website.

## Visual direction

Use:

-   Clean white / warm off-white background
-   Very dark charcoal typography
-   One restrained accent color such as deep blue, emerald, or orange
-   Subtle borders
-   Soft shadows only where useful
-   Large whitespace
-   Strong typography hierarchy
-   Rounded cards, but avoid excessive pill-shaped UI
-   Subtle grid/background texture in selected sections
-   Small technical/engineering visual cues
-   Minimal line icons
-   Clear data hierarchy

Avoid:

-   Loud gradients everywhere
-   Excessive glassmorphism
-   Neon colors
-   Generic AI-generated illustrations
-   Huge decorative blobs
-   Overly rounded "mobile app" cards
-   Excessive animations
-   Cluttered dashboards
-   Stock-photo-heavy layouts

The design should communicate:

**Accurate + practical + trustworthy + fast.**

------------------------------------------------------------------------

# 3. Homepage Structure

Build the homepage with the following sections.

## Section 1 --- Header / Navigation

Create a premium responsive header.

Desktop:

-   Logo: BuildCalc
-   Calculators
-   Categories
-   Guides
-   About
-   Search icon / search field
-   Optional "Popular Calculators" CTA

Mobile:

-   Logo
-   Search icon
-   Hamburger menu

Header should become sticky after scrolling.

Use a subtle bottom border.

Do not make the header oversized.

------------------------------------------------------------------------

# 4. Hero Section

The hero must be visually strong.

Headline:

**"Calculate materials, dimensions, and project costs with
confidence."**

Supporting text:

**"Free construction and home-project calculators built for real-world
measurements --- from concrete and foundations to patios, decks,
landscaping, and construction costs."**

Primary CTA:

**Explore Calculators**

Secondary CTA:

**Popular Calculators**

On the right side, create a visually interesting **interactive
calculator preview card**, not a generic illustration.

Example:

### Concrete Slab Calculator

Length\
`20 ft`

Width\
`30 ft`

Depth\
`4 in`

Result:

**7.41 yd³**

Material estimate:

-   Concrete: 7.41 yd³
-   Area: 600 sq ft
-   Depth: 4 in

Button:

**Open Calculator →**

The preview should look like a real product interface.

Add tiny technical metadata around it such as:

`AREA • VOLUME • MATERIAL`

This gives the homepage a strong visual identity.

------------------------------------------------------------------------

# 5. Trust / Value Strip

Immediately below the hero, add a compact horizontal trust section.

Example:

**Free to use**\
No account required for basic calculations

**Built for real projects**\
Practical inputs and outputs

**Multiple units**\
Imperial + metric

**Fast results**\
Calculations happen instantly in the browser

Use simple icons.

Do not make unsupported claims such as "100% accurate" or "industry
certified."

------------------------------------------------------------------------

# 6. Popular Calculators Section

Heading:

**"Start with a calculator"**

Subheading:

**"Quick answers for the measurements and estimates you need most."**

Create a visually strong grid.

Featured cards:

### House Construction Cost

Estimate construction cost based on area, location, finish level, and
project assumptions.

### Concrete Calculator

Calculate concrete volume and estimated material requirements.

### Construction Cost Per Square Foot

Estimate project cost using floor area and construction cost
assumptions.

### Concrete Slab Calculator

Calculate slab volume and material requirements.

### Deck Footing Calculator

Estimate footing quantity and dimensions based on deck requirements.

### Patio Slope Calculator

Calculate required elevation change for drainage.

Each card should contain:

-   Small category label
-   Icon
-   Tool name
-   One-line explanation
-   "Calculate →"
-   Optional small visual calculation snippet

Make the first 2--3 cards visually featured.

------------------------------------------------------------------------

# 7. Search Experience

Create a prominent calculator search component.

Heading:

**"What are you calculating?"**

Search placeholder:

**"Search concrete, deck, patio, house cost..."**

Search should support:

-   Calculator name
-   Category
-   Synonyms
-   Keyword aliases

Examples:

Searching:

`slab`

should return:

-   Concrete Slab Calculator
-   Slab Material Calculator
-   Concrete Calculator

Searching:

`house`

should return:

-   House Construction Cost Calculator
-   Construction Cost Per Square Foot Calculator

Add keyboard accessibility.

Use `/` as a keyboard shortcut to focus search if practical.

------------------------------------------------------------------------

# 8. Category Section

Create five category cards:

## Construction

House building, foundations, framing, materials, and project estimates.

## Concrete

Volume, slabs, mix design, footings, and concrete materials.

## Home Improvement

Wall paneling, garages, flooring, decks, and renovation calculations.

## Landscaping

Mulch, patios, stone walls, gravel, soil, and outdoor projects.

## Project Costs

Construction costs, material costs, labor estimates, and renovation
budgets.

Each category card should show:

-   Icon
-   Description
-   Number of available tools
-   Arrow

Use real counts dynamically rather than hardcoding fake numbers.

------------------------------------------------------------------------

# 9. "Built for the Job" Section

Create a distinctive editorial section.

Heading:

**"From a quick measurement to a project estimate."**

Show a 3-step process:

### 01 --- Enter your measurements

Length, width, depth, quantity, location, material, or project type.

### 02 --- Get the calculation

Instantly see volume, area, quantity, slope, cost, or material
requirements.

### 03 --- Plan your project

Use the result to estimate materials, compare scenarios, and make better
purchasing decisions.

Use a technical diagram / calculation flow rather than generic
illustrations.

------------------------------------------------------------------------

# 10. Featured Tool Showcase

Create one large product-style section for the:

**House Construction Cost Calculator**

Layout:

Left:

-   Category label: PROJECT COST
-   Large title
-   Explanation
-   CTA

Right:

A realistic calculator UI preview.

Example fields:

-   Country
-   State / Region
-   ZIP / Postal Code
-   House Size
-   Construction Type
-   Finish Level

Result panel:

**Estimated construction cost**

`$285,000 – $345,000`

Show:

-   Cost / sq ft
-   Material estimate
-   Labor estimate
-   Contingency

Clearly label results as **estimates** and show assumptions.

This section should make the website feel like a serious product rather
than a blog.

------------------------------------------------------------------------

# 11. Guides / Educational Content

Add a content section:

Heading:

**"Understand the numbers before you build."**

Create cards for SEO-friendly educational guides.

Examples:

-   How much concrete do I need for a slab?
-   How to calculate construction cost per square foot
-   What is the correct patio slope for drainage?
-   How much material do I need for a stone wall?
-   How to estimate house construction costs
-   How much mulch do I need?

Each guide card should have:

-   Category
-   Title
-   Short excerpt
-   Reading time
-   Arrow

Build the architecture so Markdown/MDX or a CMS can be added later.

------------------------------------------------------------------------

# 12. Why Use BuildCalc?

Create a concise section with 4--6 benefits.

Examples:

### Practical Inputs

Calculators use measurements people actually have on a job site.

### Clear Results

Show the answer first, then the supporting breakdown.

### Imperial + Metric

Support common construction units.

### Transparent Assumptions

Explain what the calculator assumes.

### No Unnecessary Signup

Basic calculations should work without creating an account.

### Built for Real Projects

Connect related calculations so users can move from one project step to
the next.

------------------------------------------------------------------------

# 13. Newsletter / Return User Section

Create a subtle section rather than an aggressive marketing block.

Heading:

**"Build smarter, one calculation at a time."**

Text:

"Get occasional updates when we add useful calculators and construction
guides."

Email input:

`Enter your email`

Button:

**Subscribe**

Do not make this the dominant CTA.

------------------------------------------------------------------------

# 14. Footer

Professional multi-column footer.

Columns:

### Calculators

-   Construction
-   Concrete
-   Home Improvement
-   Landscaping
-   Project Costs

### Popular Tools

-   Concrete Calculator
-   House Construction Cost Calculator
-   Patio Slope Calculator
-   Deck Footing Calculator

### Resources

-   Guides
-   FAQs
-   About
-   Contact

### Legal

-   Privacy Policy
-   Terms
-   Disclaimer
-   Cookie Policy

Footer disclaimer:

"Calculations are estimates intended for planning and informational
purposes. Always verify project requirements with applicable building
codes, manufacturers, engineers, contractors, or other qualified
professionals."

------------------------------------------------------------------------

# 15. Calculator Page UX

Every calculator must use a consistent layout.

Example:

`/calculators/concrete-slab-calculator`

Top:

Breadcrumb:

Home → Calculators → Concrete → Concrete Slab Calculator

H1:

**Concrete Slab Calculator**

Short description.

Then main calculator interface.

Desktop layout:

Left = inputs\
Right = results

On mobile:

Inputs first\
Results second

------------------------------------------------------------------------

# 16. Calculator Interface Requirements

Every calculator should include:

-   Input labels
-   Units
-   Helpful placeholder values
-   Validation
-   Sensible defaults where appropriate
-   Instant calculation
-   Reset button
-   Clear result formatting
-   Copy result button
-   Print option
-   Optional share button
-   Error states
-   Accessible form controls

Do not make users submit a form just to see basic calculations.

Use client-side calculation wherever possible.

------------------------------------------------------------------------

# 17. Results Design

Results should be visually prioritized.

Example:

## Your result

**7.41 cubic yards**

Then:

### Calculation breakdown

Area: 600 sq ft\
Depth: 4 in\
Volume: 80.0 cubic ft\
Concrete required: 2.96 cubic yd

If relevant, add:

**Recommended ordering quantity**

`3.25 cubic yards`

Explain any waste/safety factor instead of silently adding it.

------------------------------------------------------------------------

# 18. Units

Create a reusable unit system.

Support as relevant:

### Imperial

-   inches
-   feet
-   yards
-   square feet
-   cubic feet
-   cubic yards
-   pounds
-   tons

### Metric

-   millimeters
-   centimeters
-   meters
-   square meters
-   cubic meters
-   kilograms
-   tonnes

Do not mix units silently.

Allow the user to switch unit systems.

------------------------------------------------------------------------

# 19. Calculation Engine

Do not hardcode calculations inside UI components.

Create a reusable calculation architecture.

Example concept:

``` text
/lib/calculators/
    concrete.ts
    concreteSlab.ts
    patioSlope.ts
    deckFooting.ts
    wallPaneling.ts
    stoneWall.ts
    houseConstructionCost.ts
```

Each calculator should have:

-   Input schema
-   Validation rules
-   Calculation function
-   Result schema
-   Unit conversion helpers
-   Assumptions
-   Formula metadata

Example conceptual interface:

``` ts
type CalculatorDefinition = {
  slug: string
  name: string
  category: string
  description: string
  inputs: InputDefinition[]
  calculate: (values) => CalculatorResult
  assumptions: string[]
}
```

Keep calculation logic independently testable.

------------------------------------------------------------------------

# 20. Accuracy and Testing

For every calculator:

-   Write unit tests
-   Test zero values
-   Test negative values
-   Test extremely large values
-   Test decimal inputs
-   Test unit conversion
-   Test empty fields
-   Test invalid values
-   Test expected example calculations

Do not claim engineering certification.

Where calculations depend on local building codes or structural design,
clearly state that the calculator is for preliminary planning and does
not replace professional engineering or local code requirements.

------------------------------------------------------------------------

# 21. SEO Architecture

SEO is a core requirement.

Use Next.js metadata API.

Every calculator page needs unique:

-   Title
-   Meta description
-   Canonical URL
-   Open Graph metadata
-   Twitter/X metadata

Example:

Title:

**Concrete Slab Calculator --- Calculate Concrete Volume & Materials \|
BuildCalc**

Description:

**Calculate concrete needed for a slab using length, width, and
thickness. Get cubic yards, cubic feet, and material estimates
instantly.**

Do not generate repetitive boilerplate metadata.

------------------------------------------------------------------------

# 22. URL Structure

Use clean URLs.

``` text
/
 /calculators
 /calculators/concrete
 /calculators/concrete-calculator
 /calculators/concrete-slab-calculator
 /calculators/concrete-mix-design-calculator
 /calculators/patio-slope-calculator
 /calculators/deck-footing-size-calculator
 /calculators/wall-paneling-calculator
 /calculators/stone-wall-calculator
 /calculators/pine-straw-mulch-calculator
 /calculators/house-construction-cost-calculator
 /calculators/construction-cost-per-square-foot-calculator

 /categories/construction
 /categories/concrete
 /categories/home-improvement
 /categories/landscaping
 /categories/project-cost

 /guides
 /about
 /contact
 /privacy
 /terms
 /disclaimer
```

Avoid unnecessary query-string URLs for indexable calculator pages.

------------------------------------------------------------------------

# 23. Structured Data

Implement relevant JSON-LD carefully.

Use:

-   WebSite
-   Organization
-   WebPage
-   BreadcrumbList
-   FAQPage only when genuine visible FAQs exist
-   Article for actual guide pages

Do not add fake FAQ content solely for schema.

Include a site search action where appropriate.

------------------------------------------------------------------------

# 24. Internal Linking

Every calculator should link to related calculators.

Example:

Concrete Slab Calculator →

-   Concrete Calculator
-   Concrete Mix Design Calculator
-   Deck Footing Calculator
-   Construction Cost Calculator

Every guide should link naturally to relevant calculators.

Every category should link to its calculators.

Build this from structured calculator metadata rather than manually
duplicating links everywhere.

------------------------------------------------------------------------

# 25. Programmatic SEO Architecture

The system should be designed for expansion.

Create calculator metadata in a centralized data structure.

Example:

``` text
data/calculators.ts
```

Each calculator:

-   slug
-   title
-   short description
-   category
-   icon
-   featured status
-   SEO title
-   SEO description
-   related calculators
-   calculation component
-   guide slug
-   keywords

Adding a new calculator should ideally require:

1.  Adding its calculation logic
2.  Adding metadata
3.  Creating its calculator UI/config

The routing and SEO system should automatically handle the rest.

Do NOT create hundreds of low-value pages automatically.

Only index pages that provide unique useful functionality/content.

------------------------------------------------------------------------

# 26. Technical Stack

Use:

-   Next.js latest stable version
-   App Router
-   TypeScript
-   Tailwind CSS
-   ESLint
-   Prettier
-   React
-   Lucide React or another lightweight icon library
-   Vitest or Jest for unit testing

Prefer Server Components by default.

Use Client Components only where interactivity is required.

Avoid unnecessary dependencies.

------------------------------------------------------------------------

# 27. Performance

The site must be extremely fast.

Target:

-   Excellent Core Web Vitals
-   Minimal JavaScript
-   Optimized fonts
-   Responsive images
-   Lazy loading where appropriate
-   No heavy animation libraries unless genuinely needed
-   Avoid blocking scripts
-   Use static generation where possible
-   Calculator logic should run locally in the browser

Homepage should feel instant.

------------------------------------------------------------------------

# 28. Responsive Design

Design mobile-first.

Test layouts for:

-   320px
-   375px
-   390px
-   430px
-   768px
-   1024px
-   1440px
-   1920px

Calculator UX on mobile is especially important.

Inputs should not feel cramped.

Results should remain easy to scan.

Buttons should have comfortable touch targets.

------------------------------------------------------------------------

# 29. Accessibility

Target WCAG 2.2 AA principles.

Include:

-   Semantic HTML
-   Proper labels
-   Keyboard navigation
-   Visible focus states
-   Accessible error messages
-   Sufficient contrast
-   ARIA only where necessary
-   Screen-reader-friendly result updates
-   No information conveyed by color alone

------------------------------------------------------------------------

# 30. AdSense Readiness

The site will eventually use Google AdSense.

Do NOT insert fake ads during development.

Create an ad-slot abstraction that can later be connected to AdSense.

Example locations:

### Desktop

-   One ad between selected content sections
-   One ad inside long-form guide content
-   Optional sidebar ad on long content pages

### Mobile

Use fewer ads.

Never place ads:

-   inside calculator input fields
-   directly over buttons
-   where they can be mistaken for calculator controls
-   excessively above the main result
-   in a way that damages usability

The calculator result must always remain the primary focus.

Create components such as:

``` text
/components/ads/AdSlot.tsx
/components/ads/ResponsiveAd.tsx
```

Use environment variables/configuration so ads can be disabled in
development.

------------------------------------------------------------------------

# 31. Monetization Architecture

Prepare the application for future:

### Display Ads

Google AdSense.

### Affiliate Links

For relevant construction materials, tools, software, and products.

### Lead Generation

For project estimates, contractors, builders, or local service
providers.

### Premium Features

Potential future features:

-   Save calculations
-   Export PDF
-   Export CSV
-   Project folders
-   Multiple scenarios
-   Material price tracking
-   Custom cost assumptions

Do not implement paid features unless necessary for the initial MVP.

Build the architecture so they can be added later.

------------------------------------------------------------------------

# 32. Trust Signals

Because calculations can influence real projects, make trust a core part
of the design.

Each calculator should have:

### How this calculator works

Brief explanation.

### Formula / Method

Explain the calculation in understandable language.

### Assumptions

List important assumptions.

### Example

Provide a realistic example.

### Important note

Explain when professional verification is required.

Do not use fake reviews.

Do not invent certifications.

Do not use fake user counts.

Do not make unsupported claims.

------------------------------------------------------------------------

# 33. Homepage Microinteractions

Use subtle interaction.

Examples:

-   Calculator cards lift slightly on hover
-   Search results animate gently
-   Number results transition smoothly
-   Input focus has a refined border/ring
-   Category cards have subtle movement
-   Header changes shadow/border on scroll

Avoid excessive animations.

Respect:

`prefers-reduced-motion`.

------------------------------------------------------------------------

# 34. Visual Details That Make It Feel Premium

Use small technical details throughout the design:

-   Measurement tick marks
-   Fine grid lines
-   Dimension arrows
-   Small unit labels
-   Blueprint-inspired separators
-   Monospace numbers for calculated values
-   Tiny category labels
-   Technical metadata
-   Calculation status indicators
-   Subtle ruler/measurement motifs

Do not turn the entire site into a blueprint theme.

Use these details sparingly.

The result should feel like:

**modern SaaS + professional construction tool**

not:

**old engineering software.**

------------------------------------------------------------------------

# 35. Typography

Use a high-quality modern sans-serif.

Recommended:

**Inter** for primary UI/body text.

Use a monospace font such as:

**JetBrains Mono**

for calculated numbers, measurements, formulas, and technical metadata
where appropriate.

Typography hierarchy should be strong.

Homepage hero headline should be large but not absurdly oversized.

------------------------------------------------------------------------

# 36. Color System

Start with a restrained palette.

Example:

``` text
Background: #FAFAF8
Surface: #FFFFFF
Text: #171717
Muted text: #666666
Border: #E7E5E4
Primary: #155EEF
Primary dark: #0F4AC6
Success: #16803C
Warning: #B54708
Error: #B42318
```

You may refine the exact colors if needed.

Do not use too many colors.

Calculated values should have strong visual hierarchy.

------------------------------------------------------------------------

# 37. Search / Discovery

Implement a client-side calculator search index.

Search should match:

-   Name
-   Description
-   Category
-   Keywords
-   Synonyms

Include:

-   Empty state
-   No-result state
-   Keyboard navigation
-   Clear button

Example:

Search:

`cement`

Results could include:

-   Concrete Calculator
-   Concrete Mix Design Calculator
-   Concrete Slab Calculator

------------------------------------------------------------------------

# 38. Calculator Data Examples

Create accurate initial implementations for:

### Concrete Calculator

Inputs:

-   Length
-   Width
-   Depth
-   Unit system

Outputs:

-   Area
-   Volume
-   Cubic feet
-   Cubic yards
-   Cubic meters
-   Optional waste allowance

### Patio Slope Calculator

Inputs:

-   Run length
-   Desired slope percentage

Outputs:

-   Required rise
-   Rise per foot
-   Rise in inches
-   Metric equivalent

### Wall Paneling Calculator

Inputs:

-   Wall width
-   Wall height
-   Panel width
-   Panel height
-   Waste percentage

Outputs:

-   Wall area
-   Panel area
-   Panels required
-   Recommended purchase quantity

### Stone Wall Calculator

Inputs:

-   Wall length
-   Wall height
-   Average wall thickness
-   Stone coverage/yield assumption

Outputs:

-   Wall volume
-   Estimated stone quantity
-   Optional waste

### Pine Straw Mulch Calculator

Inputs:

-   Area length
-   Area width
-   Desired depth
-   Bale coverage assumption

Outputs:

-   Area
-   Volume
-   Estimated bales
-   Suggested purchase quantity

### Deck Footing Calculator

Inputs should be framed as a preliminary planning tool.

Outputs:

-   Estimated footing count
-   Spacing assumptions
-   Basic quantity estimate

Clearly state that final footing design must follow local code, soil
conditions, loads, frost depth, and professional requirements.

------------------------------------------------------------------------

# 39. House Construction Cost Calculator

Make this one of the flagship tools.

Inputs:

-   Location
-   ZIP/postal code where applicable
-   House size
-   Stories
-   Construction type
-   Finish level
-   Basement
-   Garage
-   Optional custom cost/sq-ft assumptions

Outputs:

-   Estimated construction cost
-   Cost per square foot
-   Low estimate
-   Mid estimate
-   High estimate
-   Major cost categories
-   Assumptions

Important:

Do not pretend to know current local prices unless actual data sources
are implemented.

If no reliable live/local dataset exists, allow users to enter or adjust
the assumed cost per square foot.

Make the architecture ready for a future regional pricing database.

------------------------------------------------------------------------

# 40. Error Handling

Errors must be human-friendly.

Bad:

`NaN`

Good:

**Enter a valid positive number.**

For impossible calculations:

**Please check the measurements. Width and length must be greater than
zero.**

Never expose raw JavaScript errors to users.

------------------------------------------------------------------------

# 41. Empty States

Design thoughtful empty states for:

-   Search
-   Calculator directory
-   Saved calculations in future
-   Invalid inputs
-   No related tools

Avoid generic "Nothing here" messages.

------------------------------------------------------------------------

# 42. Security

Do not collect unnecessary personal data.

Validate all inputs.

If future server/API functionality is added:

-   Validate server-side
-   Rate-limit expensive operations
-   Never expose secrets to the browser
-   Use environment variables

For the initial calculators, prefer local computation.

------------------------------------------------------------------------

# 43. Project Structure

Use a clean structure similar to:

``` text
app/
  page.tsx
  calculators/
    page.tsx
    [slug]/
      page.tsx
  categories/
    [slug]/
      page.tsx
  guides/
    page.tsx
    [slug]/
      page.tsx
  about/
  contact/
  privacy/
  terms/
  disclaimer/

components/
  layout/
  home/
  calculators/
  search/
  ads/
  seo/
  ui/

lib/
  calculators/
  units/
  seo/
  utils/

data/
  calculators.ts
  categories.ts
  guides.ts

tests/
  calculators/

public/
  icons/
  images/
```

Adapt as necessary to modern Next.js conventions.

------------------------------------------------------------------------

# 44. Homepage SEO Copy

Use natural language.

Do NOT keyword-stuff.

Primary topical concepts:

-   construction calculators
-   concrete calculator
-   construction cost calculator
-   home improvement calculator
-   material calculator
-   building calculator
-   landscaping calculator

The homepage should clearly communicate what the website does within the
first viewport.

------------------------------------------------------------------------

# 45. Content Quality

Every calculator page must have enough useful supporting information to
stand on its own.

Do not create:

-   one sentence + calculator
-   duplicate descriptions
-   spun content
-   keyword-stuffed paragraphs
-   automatically generated nonsense

The tool itself is the primary value.

Supporting content should explain how to use it and understand the
result.

------------------------------------------------------------------------

# 46. Analytics

Prepare for:

-   Google Analytics / GA4
-   Google Search Console
-   Google AdSense

Create a lightweight analytics abstraction.

Track useful events such as:

-   calculator_view
-   calculator_start
-   calculator_complete
-   calculator_reset
-   result_copy
-   calculator_search
-   related_calculator_click

Do not collect sensitive data.

------------------------------------------------------------------------

# 47. Sitemap and Robots

Generate:

-   sitemap.xml
-   robots.txt

Only include canonical, useful indexable pages.

Ensure calculator pages are crawlable.

------------------------------------------------------------------------

# 48. PWA / Offline Consideration

Do not make PWA functionality mandatory for MVP.

However, structure calculator logic so basic calculations could
eventually work offline.

------------------------------------------------------------------------

# 49. Final UX Quality Bar

Before considering the project complete, inspect every major page as a
product designer.

Ask:

-   Does this look like a serious product?
-   Is the homepage immediately understandable?
-   Can a user find a calculator in under 10 seconds?
-   Is the calculator easier to use than competing tools?
-   Are results visually obvious?
-   Does the site feel trustworthy?
-   Is it fast?
-   Is it mobile-friendly?
-   Is there enough useful content around each calculator?
-   Are there natural internal links?
-   Is the site ready for SEO?
-   Can 100 more calculators be added without architectural chaos?
-   Can AdSense be integrated without redesigning the entire site?

------------------------------------------------------------------------

# 50. Build Order

Implement in this order:

## Phase 1 --- Foundation

1.  Next.js project
2.  TypeScript
3.  Tailwind
4.  Global design system
5.  Responsive layout
6.  Header
7.  Footer
8.  SEO utilities

## Phase 2 --- Homepage

1.  Hero
2.  Calculator preview
3.  Trust strip
4.  Popular calculators
5.  Search
6.  Categories
7.  Featured calculator
8.  Guides
9.  Benefits
10. Newsletter
11. Footer

## Phase 3 --- Calculator Engine

Build reusable calculator framework.

## Phase 4 --- Initial Calculators

Implement the 12 calculators listed above.

## Phase 5 --- SEO

Implement:

-   metadata
-   sitemap
-   robots
-   canonical URLs
-   structured data
-   breadcrumbs
-   internal linking

## Phase 6 --- Quality

-   tests
-   accessibility
-   responsive QA
-   performance optimization
-   error handling

## Phase 7 --- Monetization Preparation

Add configurable ad slots, affiliate components, and future
lead-generation placeholders without degrading UX.

------------------------------------------------------------------------

# 51. Critical Instructions

1.  **Do not build a generic-looking calculator site.**
2.  **Homepage attractiveness is a top priority.**
3.  The homepage should feel premium before the user scrolls.
4.  Prioritize usability over decorative design.
5.  Calculators must be genuinely functional.
6.  Do not fake data.
7.  Do not fake reviews.
8.  Do not claim guaranteed accuracy.
9.  Clearly explain assumptions.
10. Make every calculator mobile-friendly.
11. Make the architecture scalable to 100+ calculators.
12. Keep calculation logic separate from UI.
13. Use reusable components.
14. Keep JavaScript lightweight.
15. Make SEO a first-class concern.
16. Prepare for AdSense without cluttering the interface.
17. Never allow advertisements to compete visually with calculator
    results.
18. Use clean, descriptive URLs.
19. Do not create thin programmatic SEO pages.
20. Make the website feel like a trustworthy professional utility, not a
    content farm.

------------------------------------------------------------------------

# 52. Deliverables

Generate the complete working application, not a static mockup.

The final project must include:

-   Production-ready Next.js code
-   Responsive homepage
-   Calculator directory
-   Category pages
-   Reusable calculator engine
-   12 functional calculators
-   Search
-   Related calculators
-   Guide architecture
-   SEO metadata
-   JSON-LD
-   Sitemap
-   Robots
-   Accessibility
-   Unit tests
-   Ad-slot abstraction
-   Clean component architecture
-   Vercel-ready configuration
-   Environment variable example
-   README with local development and deployment instructions

The application should run with:

``` bash
npm install
npm run dev
```

and build successfully with:

``` bash
npm run build
```

Before finishing, check for TypeScript errors, lint errors, broken
links, hydration issues, responsive layout problems, and calculator
calculation errors.

The result should be a **real, scalable construction calculator product
suitable for launching on a public domain and growing through SEO**,
with the homepage acting as the primary brand and discovery experience.
