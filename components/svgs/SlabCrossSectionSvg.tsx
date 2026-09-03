import React from 'react'

export function SlabCrossSectionSvg({ className = 'w-full h-auto' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 500 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Concrete Slab Cross-Section Engineering Diagram"
    >
      <defs>
        {/* Hatch pattern for compacted gravel sub-base */}
        <pattern id="gravelHatch" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <circle cx="4" cy="4" r="1.5" fill="#94A3B8" />
          <circle cx="12" cy="12" r="2" fill="#64748B" />
          <circle cx="12" cy="4" r="1" fill="#94A3B8" />
          <circle cx="4" cy="12" r="1.2" fill="#CBD5E1" />
        </pattern>
        {/* Concrete speckle pattern */}
        <pattern id="concreteHatch" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect width="20" height="20" fill="#F1F5F9" />
          <path d="M2 3L3 2M15 14L16 15M8 12L9 11M14 4L13 5M6 18L7 17" stroke="#94A3B8" strokeWidth="1" strokeLinecap="round" />
          <circle cx="5" cy="8" r="0.8" fill="#64748B" />
          <circle cx="16" cy="7" r="1" fill="#64748B" />
          <circle cx="11" cy="16" r="0.8" fill="#475569" />
        </pattern>
        {/* Earth / Subgrade hatch */}
        <pattern id="earthHatch" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
          <line x1="0" y1="0" x2="0" y2="20" stroke="#CBD5E1" strokeWidth="1" />
          <line x1="10" y1="0" x2="10" y2="20" stroke="#E2E8F0" strokeWidth="0.75" />
        </pattern>
      </defs>

      {/* Background blueprint grid lines */}
      <g stroke="#E2E8F0" strokeWidth="0.5" strokeDasharray="2 4">
        <line x1="20" y1="30" x2="480" y2="30" />
        <line x1="20" y1="80" x2="480" y2="80" />
        <line x1="20" y1="140" x2="480" y2="140" />
        <line x1="20" y1="190" x2="480" y2="190" />
      </g>

      {/* Layer 3: Native Subgrade / Soil Base */}
      <rect x="50" y="170" width="380" height="50" fill="url(#earthHatch)" stroke="#94A3B8" strokeWidth="1.5" />
      <text x="60" y="200" fill="#64748B" fontSize="10" fontFamily="monospace" fontWeight="600">
        COMPACTED SUBGRADE SOIL
      </text>

      {/* Layer 2: Compacted Crushed Gravel Base (4" - 6") */}
      <rect x="50" y="115" width="380" height="55" fill="url(#gravelHatch)" stroke="#64748B" strokeWidth="1.5" />
      <text x="60" y="145" fill="#475569" fontSize="10" fontFamily="monospace" fontWeight="700">
        CRUSHED STONE BASE (#57 GRAVEL) • 4&quot; COMPACTED
      </text>

      {/* Vapor Barrier Line */}
      <line x1="50" y1="115" x2="430" y2="115" stroke="#2563EB" strokeWidth="2.5" strokeDasharray="4 2" />
      <text x="310" y="110" fill="#2563EB" fontSize="9" fontFamily="monospace" fontWeight="700">
        10-MIL VAPOR BARRIER
      </text>

      {/* Layer 1: Concrete Slab (4" - 6") */}
      <rect x="50" y="45" width="380" height="70" fill="url(#concreteHatch)" stroke="#334155" strokeWidth="2" rx="2" />
      <text x="60" y="70" fill="#0F172A" fontSize="11" fontFamily="monospace" fontWeight="800">
        4000 PSI CONCRETE SLAB • 4&quot;–6&quot; THICKNESS
      </text>

      {/* Rebar Grid / WWF Mesh representation */}
      <g stroke="#DC2626" strokeWidth="2">
        <line x1="70" y1="80" x2="410" y2="80" strokeDasharray="16 8" />
        <circle cx="100" cy="80" r="3.5" fill="#DC2626" />
        <circle cx="160" cy="80" r="3.5" fill="#DC2626" />
        <circle cx="220" cy="80" r="3.5" fill="#DC2626" />
        <circle cx="280" cy="80" r="3.5" fill="#DC2626" />
        <circle cx="340" cy="80" r="3.5" fill="#DC2626" />
        <circle cx="400" cy="80" r="3.5" fill="#DC2626" />
      </g>
      <text x="60" y="96" fill="#DC2626" fontSize="9" fontFamily="monospace" fontWeight="700">
        #4 (1/2&quot;) REBAR @ 18&quot; O.C. ON CHAIRS
      </text>

      {/* Dimension Annotation Lines on Right */}
      <g stroke="#1E293B" strokeWidth="1">
        {/* Slab depth dimension */}
        <line x1="445" y1="45" x2="445" y2="115" />
        <line x1="440" y1="45" x2="450" y2="45" />
        <line x1="440" y1="115" x2="450" y2="115" />
        <text x="455" y="84" fill="#0F172A" fontSize="9" fontFamily="monospace" fontWeight="700">
          4&quot;
        </text>

        {/* Gravel base depth dimension */}
        <line x1="445" y1="115" x2="445" y2="170" />
        <line x1="440" y1="170" x2="450" y2="170" />
        <text x="455" y="146" fill="#475569" fontSize="9" fontFamily="monospace" fontWeight="700">
          4&quot;–6&quot;
        </text>
      </g>
    </svg>
  )
}
