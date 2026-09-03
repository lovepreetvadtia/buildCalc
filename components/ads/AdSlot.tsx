interface AdSlotProps {
  slotId?: string
  format?: 'horizontal' | 'rectangle' | 'vertical' | 'auto'
  className?: string
  label?: string
}

export function AdSlot({
  slotId = 'default-slot',
  format = 'auto',
  className = '',
  label = 'Advertisement',
}: AdSlotProps) {
  // In development, or if AdSense is not configured, render a clean non-intrusive container or hide
  const isEnabled = process.env.NEXT_PUBLIC_ADS_ENABLED === 'true'

  if (!isEnabled) {
    return null
  }

  return (
    <div
      className={`w-full my-6 flex flex-col items-center justify-center p-2 rounded-lg bg-surface border border-charcoal-100 ${className}`}
      data-ad-slot={slotId}
      data-ad-format={format}
    >
      <span className="text-[10px] uppercase tracking-wider text-charcoal-400 mb-1">
        {label}
      </span>
      <div className="w-full min-h-[90px] flex items-center justify-center text-xs text-charcoal-400">
        {/* Real AdSense tag script injected here when enabled */}
      </div>
    </div>
  )
}
