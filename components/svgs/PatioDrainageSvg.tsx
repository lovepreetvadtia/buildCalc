import React from 'react'

export function PatioDrainageSvg({ className = 'w-full h-auto' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 460 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Patio Drainage Slope Cross-Section Diagram"
    >
      {/* Foundation Wall on Left */}
      <rect x="20" y="20" width="50" height="160" fill="#334155" stroke="#0F172A" strokeWidth="2" />
      <text x="25" y="100" fill="#F8FAFC" fontSize="9" fontFamily="monospace" fontWeight="bold" transform="rotate(-90 25 100)">
        FOUNDATION
      </text>

      {/* Siding / Water line marker */}
      <line x1="70" y1="50" x2="85" y2="50" stroke="#DC2626" strokeWidth="1.5" />
      <text x="90" y="53" fill="#DC2626" fontSize="8" fontFamily="monospace">
        MIN 4&quot; CLEARANCE
      </text>

      {/* Sloped Patio Polygon (starts at (70, 70), slopes down to (420, 100)) */}
      {/* Paver Layer */}
      <polygon points="70,70 420,100 420,115 70,85" fill="#CBD5E1" stroke="#475569" strokeWidth="1.5" />
      <text x="180" y="80" fill="#0F172A" fontSize="9" fontFamily="monospace" fontWeight="bold">
        INTERLOCKING PAVERS (2-3/8&quot;)
      </text>

      {/* Bedding Sand Layer */}
      <polygon points="70,85 420,115 420,125 70,95" fill="#FDE68A" stroke="#D97706" strokeWidth="1" />

      {/* Crushed Road Base Stone (4" - 6") */}
      <polygon points="70,95 420,125 420,165 70,135" fill="#94A3B8" stroke="#64748B" strokeWidth="1.5" />
      <text x="180" y="145" fill="#1E293B" fontSize="9" fontFamily="monospace" fontWeight="bold">
        COMPACTED CRUSHED BASE (4&quot;–6&quot;)
      </text>

      {/* Subgrade */}
      <polygon points="70,135 420,165 420,185 70,185" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1" />

      {/* Slope Direction Arrow and Callout */}
      <g stroke="#2563EB" strokeWidth="2">
        <line x1="120" y1="40" x2="360" y2="60" />
        <polyline points="350,53 362,60 355,67" fill="none" strokeWidth="2" strokeLinecap="round" />
      </g>
      <text x="170" y="35" fill="#2563EB" fontSize="10" fontFamily="monospace" fontWeight="bold">
        1/4&quot; PER FOOT DRAINAGE SLOPE (2.08% GRADE)
      </text>
    </svg>
  )
}
