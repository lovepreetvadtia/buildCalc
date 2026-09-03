import React from 'react'

export function DeckFootingSvg({ className = 'w-full h-auto' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 360 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Deck Pier Footing Diagram"
    >
      {/* Ground Grade Line */}
      <line x1="20" y1="90" x2="340" y2="90" stroke="#64748B" strokeWidth="2" strokeDasharray="6 3" />
      <text x="25" y="82" fill="#475569" fontSize="9" fontFamily="monospace" fontWeight="700">
        FINISH GRADE LINE (0&quot;)
      </text>

      {/* Frost Line Depth */}
      <line x1="20" y1="210" x2="340" y2="210" stroke="#DC2626" strokeWidth="1.5" strokeDasharray="3 3" />
      <text x="25" y="204" fill="#DC2626" fontSize="9" fontFamily="monospace" fontWeight="700">
        LOCAL FROST LINE DEPTH (-36&quot; TO -48&quot;)
      </text>

      {/* 6x6 Wood Post above grade */}
      <rect x="165" y="20" width="30" height="70" fill="#FDE68A" stroke="#B45309" strokeWidth="1.5" />
      <text x="171" y="55" fill="#92400E" fontSize="9" fontFamily="monospace" fontWeight="bold">6x6</text>

      {/* Galvanized Post Base Anchor Bracket */}
      <rect x="160" y="85" width="40" height="10" fill="#94A3B8" stroke="#475569" strokeWidth="1" rx="1" />

      {/* Sonotube Concrete Column Pier */}
      <rect x="150" y="90" width="60" height="130" fill="#F1F5F9" stroke="#334155" strokeWidth="1.5" />

      {/* Rebar Dowels inside pier */}
      <line x1="165" y1="75" x2="165" y2="235" stroke="#DC2626" strokeWidth="2" strokeDasharray="8 4" />
      <line x1="195" y1="75" x2="195" y2="235" stroke="#DC2626" strokeWidth="2" strokeDasharray="8 4" />

      {/* Flared Bell Base / Bigfoot Footing Pad */}
      <path d="M 150 220 L 110 255 L 250 255 L 210 220 Z" fill="#E2E8F0" stroke="#334155" strokeWidth="1.5" />
      <text x="135" y="246" fill="#0F172A" fontSize="9" fontFamily="monospace" fontWeight="800">
        FLARED SPREAD BASE
      </text>

      {/* Crushed gravel drainage under pad */}
      <rect x="100" y="255" width="160" height="15" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1" strokeDasharray="3 3" />

      {/* Dimension Line on Right */}
      <line x1="280" y1="90" x2="280" y2="255" stroke="#1E293B" strokeWidth="1" />
      <line x1="275" y1="90" x2="285" y2="90" stroke="#1E293B" strokeWidth="1" />
      <line x1="275" y1="255" x2="285" y2="255" stroke="#1E293B" strokeWidth="1" />
      <text x="290" y="175" fill="#0F172A" fontSize="10" fontFamily="monospace" fontWeight="bold">
        BELOW FROST
      </text>
    </svg>
  )
}
