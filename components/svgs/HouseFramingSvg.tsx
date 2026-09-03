import React from 'react'

export function HouseFramingSvg({ className = 'w-full h-auto' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 540 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="House Construction Framing Isometric Blueprint"
    >
      <defs>
        <pattern id="frameGrid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1E293B" strokeWidth="0.5" strokeOpacity="0.15" />
        </pattern>
      </defs>

      {/* Blueprint Backdrop */}
      <rect width="540" height="320" rx="12" fill="#090D16" />
      <rect width="540" height="320" rx="12" fill="url(#frameGrid)" />

      {/* Outer Cad Frame Border with Measurement Marks */}
      <rect x="12" y="12" width="516" height="296" rx="8" stroke="#1E293B" strokeWidth="1.5" fill="none" />
      
      {/* Corner Drafting Marks */}
      <path d="M 20 30 L 30 30 M 30 20 L 30 30" stroke="#38BDF8" strokeWidth="1.5" />
      <path d="M 520 30 L 510 30 M 510 20 L 510 30" stroke="#38BDF8" strokeWidth="1.5" />
      <path d="M 20 290 L 30 290 M 30 300 L 30 290" stroke="#38BDF8" strokeWidth="1.5" />
      <path d="M 520 290 L 510 290 M 510 300 L 510 290" stroke="#38BDF8" strokeWidth="1.5" />

      {/* Foundation Footing Base (Ground line) */}
      <line x1="40" y1="260" x2="500" y2="260" stroke="#475569" strokeWidth="2" strokeDasharray="6 3" />
      <text x="50" y="278" fill="#64748B" fontSize="9" fontFamily="monospace" fontWeight="600">
        GRADE LEVEL • -36&quot; FROST DEPTH FOUNDATION
      </text>

      {/* Foundation Stem Wall */}
      <rect x="100" y="225" width="340" height="35" fill="#1E293B" stroke="#38BDF8" strokeWidth="1.5" />
      <text x="210" y="247" fill="#94A3B8" fontSize="10" fontFamily="monospace" fontWeight="700">
        REINFORCED CONCRETE FOOTING
      </text>

      {/* First Floor Framing Studs */}
      <rect x="100" y="145" width="340" height="80" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.5" />
      {/* Vertical Stud Lines (16" o.c. representation) */}
      <line x1="140" y1="145" x2="140" y2="225" stroke="#38BDF8" strokeWidth="0.75" strokeOpacity="0.6" />
      <line x1="180" y1="145" x2="180" y2="225" stroke="#38BDF8" strokeWidth="0.75" strokeOpacity="0.6" />
      <line x1="220" y1="145" x2="220" y2="225" stroke="#38BDF8" strokeWidth="0.75" strokeOpacity="0.6" />
      <line x1="260" y1="145" x2="260" y2="225" stroke="#38BDF8" strokeWidth="0.75" strokeOpacity="0.6" />
      <line x1="300" y1="145" x2="300" y2="225" stroke="#38BDF8" strokeWidth="0.75" strokeOpacity="0.6" />
      <line x1="340" y1="145" x2="340" y2="225" stroke="#38BDF8" strokeWidth="0.75" strokeOpacity="0.6" />
      <line x1="380" y1="145" x2="380" y2="225" stroke="#38BDF8" strokeWidth="0.75" strokeOpacity="0.6" />
      <line x1="420" y1="145" x2="420" y2="225" stroke="#38BDF8" strokeWidth="0.75" strokeOpacity="0.6" />

      {/* Window Opening Header Box */}
      <rect x="150" y="165" width="50" height="40" stroke="#F59E0B" strokeWidth="1.5" fill="#F59E0B" fillOpacity="0.1" />
      <text x="154" y="188" fill="#F59E0B" fontSize="8" fontFamily="monospace">HEADER</text>

      {/* Door Opening Box */}
      <rect x="245" y="160" width="40" height="65" stroke="#10B981" strokeWidth="1.5" fill="#10B981" fillOpacity="0.1" />
      <text x="252" y="195" fill="#10B981" fontSize="8" fontFamily="monospace">ENTRY</text>

      {/* Second Floor Framing Deck / Floor Joists */}
      <line x1="90" y1="145" x2="450" y2="145" stroke="#38BDF8" strokeWidth="3" />
      <rect x="100" y="75" width="340" height="70" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.5" />
      <line x1="160" y1="75" x2="160" y2="145" stroke="#38BDF8" strokeWidth="0.75" strokeOpacity="0.6" />
      <line x1="220" y1="75" x2="220" y2="145" stroke="#38BDF8" strokeWidth="0.75" strokeOpacity="0.6" />
      <line x1="280" y1="75" x2="280" y2="145" stroke="#38BDF8" strokeWidth="0.75" strokeOpacity="0.6" />
      <line x1="340" y1="75" x2="340" y2="145" stroke="#38BDF8" strokeWidth="0.75" strokeOpacity="0.6" />
      <line x1="400" y1="75" x2="400" y2="145" stroke="#38BDF8" strokeWidth="0.75" strokeOpacity="0.6" />

      {/* Roof Truss Gable (Triangle) */}
      <polygon points="270,25 80,75 460,75" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />
      {/* Web Bracing inside Truss */}
      <line x1="270" y1="25" x2="270" y2="75" stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 2" />
      <line x1="270" y1="25" x2="175" y2="75" stroke="#38BDF8" strokeWidth="1" />
      <line x1="270" y1="25" x2="365" y2="75" stroke="#38BDF8" strokeWidth="1" />

      {/* Technical Labels & Badges */}
      <g fontFamily="monospace" fontSize="8" fontWeight="bold">
        <rect x="28" y="40" width="90" height="18" rx="4" fill="#1E293B" stroke="#38BDF8" strokeWidth="0.75" />
        <text x="34" y="52" fill="#38BDF8">ROOF PITCH 6:12</text>

        <rect x="420" y="100" width="90" height="18" rx="4" fill="#1E293B" stroke="#F59E0B" strokeWidth="0.75" />
        <text x="426" y="112" fill="#F59E0B">2x6 EXT. WALLS</text>

        <rect x="28" y="170" width="94" height="18" rx="4" fill="#1E293B" stroke="#10B981" strokeWidth="0.75" />
        <text x="34" y="182" fill="#10B981">SUBFLOOR R-30</text>
      </g>
    </svg>
  )
}
