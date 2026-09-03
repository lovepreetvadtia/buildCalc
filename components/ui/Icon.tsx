import React from 'react'
import {
  HardHat,
  Layers,
  Home,
  Trees,
  DollarSign,
  Grid,
  Pipette,
  Columns,
  Building2,
  Compass,
  SquareDashedBottom,
  Shield,
  Cable,
  Calculator,
  Search,
  BookOpen,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Info,
  ExternalLink,
  Copy,
  Check,
  RotateCcw,
  Menu,
  X,
  Printer,
  ChevronDown,
} from 'lucide-react'

const iconMap: Record<string, React.ElementType> = {
  HardHat,
  Layers,
  Home,
  Trees,
  DollarSign,
  Grid,
  Pipette,
  Columns,
  Building2,
  Compass,
  SquareDashedBottom,
  Shield,
  Cable,
  Calculator,
  Search,
  BookOpen,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Info,
  ExternalLink,
  Copy,
  Check,
  RotateCcw,
  Menu,
  X,
  Printer,
  ChevronDown,
}

export function Icon({
  name,
  className = 'w-5 h-5',
}: {
  name: string
  className?: string
}) {
  const IconComponent = iconMap[name] || Calculator
  return <IconComponent className={className} />
}
