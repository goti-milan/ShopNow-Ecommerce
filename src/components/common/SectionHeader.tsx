import React from 'react'

type Props = {
  label?: string        // Small uppercase label above the heading
  heading?: string      // Main bold heading
  description?: string  // Optional subtext description
  align?: 'left' | 'center' | 'right'
  // Legacy props for backward compatibility
  title?: string
  subtitle?: string
}

const SectionHeader = ({ label, heading, description, align = 'center', title, subtitle }: Props) => {
  // Support legacy prop names: title = label, subtitle = heading
  const resolvedLabel = label || title
  const resolvedHeading = heading || subtitle

  const alignClass = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right',
  }[align]

  return (
    <div className={`flex flex-col gap-2 mb-10 ${alignClass}`}>
      {resolvedLabel && (
        <span className="text-primary font-medium tracking-widest uppercase text-xs">
          {resolvedLabel}
        </span>
      )}
      {resolvedHeading && (
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
          {resolvedHeading}
        </h2>
      )}
      {description && (
        <p className="text-muted-foreground text-sm max-w-md">
          {description}
        </p>
      )}
    </div>
  )
}

export default SectionHeader
