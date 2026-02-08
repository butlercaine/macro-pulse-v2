"use client"

import { memo } from "react"

interface SparklineProps {
  /** Array of numeric values to plot */
  data: number[]
  /** Width in pixels (default: 120) */
  width?: number
  /** Height in pixels (default: 40) */
  height?: number
  /** Stroke color (default: #3b82f6 - blue) */
  color?: string
  /** Stroke width in pixels (default: 2) */
  strokeWidth?: number
  /** Show gradient fill under the line */
  showGradient?: boolean
}

/**
 * Pure SVG Sparkline Component
 * Renders a line chart from an array of numeric values
 */
function SparklineComponent({
  data,
  width = 120,
  height = 40,
  color = "#3b82f6",
  strokeWidth = 2,
  showGradient = false,
}: SparklineProps) {
  // Handle empty or invalid data
  const validData = data.filter((val) => typeof val === "number" && !isNaN(val))
  
  if (validData.length < 2) {
    return (
      <svg
        width={width}
        height={height}
        className="overflow-visible"
        aria-hidden="true"
      >
        {validData.length === 1 && (
          <circle
            cx={width / 2}
            cy={height / 2}
            r={strokeWidth}
            fill={color}
          />
        )}
      </svg>
    )
  }

  // Calculate scales
  const min = Math.min(...validData)
  const max = Math.max(...validData)
  const range = max - min || 1
  
  // Add padding to avoid edge cases
  const padding = range * 0.1
  const effectiveMin = min - padding
  const effectiveMax = max + padding
  const effectiveRange = effectiveMax - effectiveMin

  // Generate SVG path
  const points = validData.map((value, index) => {
    const x = (index / (validData.length - 1)) * width
    const normalizedValue = (value - effectiveMin) / effectiveRange
    const y = height - (normalizedValue * height)
    return { x, y, value }
  })

  const linePath = points.map((p) => `${p.x},${p.y}`).join(" ")

  // Create gradient ID
  const gradientId = `sparkline-gradient-${Math.random().toString(36).slice(2, 9)}`

  return (
    <svg
      width={width}
      height={height}
      className="overflow-visible"
      aria-label="Sparkline chart"
      role="img"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.3} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>

      {showGradient && (
        <polygon
          points={`${width},${height} ${0},${height} ${linePath}`}
          fill={`url(#${gradientId})`}
        />
      )}

      <polyline
        points={linePath}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Current value dot */}
      <circle
        cx={points[points.length - 1].x}
        cy={points[points.length - 1].y}
        r={strokeWidth + 1}
        fill={color}
      />
    </svg>
  )
}

export const Sparkline = memo(SparklineComponent)
