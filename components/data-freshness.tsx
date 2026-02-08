"use client"

import * as React from "react"
import { AlertCircle, CheckCircle2, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface DataFreshnessProps {
  lastUpdated: string | null
  thresholdHours?: number
  className?: string
}

const FRESHNESS_THRESHOLDS = {
  fresh: 4, // Fresh if under 4 hours
  stale: 24, // Stale if over 24 hours
}

export function DataFreshness({
  lastUpdated,
  thresholdHours = FRESHNESS_THRESHOLDS.fresh,
  className,
}: DataFreshnessProps) {
  const hoursSinceUpdate = React.useMemo(() => {
    if (!lastUpdated) return null

    const now = new Date()
    const updated = new Date(lastUpdated)
    const diffMs = now.getTime() - updated.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))

    return diffHours
  }, [lastUpdated])

  const getStatus = () => {
    if (hoursSinceUpdate === null) {
      return { type: "unavailable", label: "Data unavailable", icon: AlertCircle }
    }

    if (hoursSinceUpdate <= thresholdHours) {
      return { type: "fresh", label: `Scraped ${hoursSinceUpdate}h ago`, icon: CheckCircle2 }
    }

    if (hoursSinceUpdate <= FRESHNESS_THRESHOLDS.stale) {
      return { type: "stale", label: `Scraped ${hoursSinceUpdate}h ago`, icon: Clock }
    }

    return { type: "very-stale", label: "Data may be outdated", icon: AlertCircle }
  }

  const status = getStatus()
  const Icon = status.icon

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium",
        "border",
        className,
        status.type === "fresh" && "bg-emerald-50 border-emerald-200 text-emerald-700",
        status.type === "stale" && "bg-amber-50 border-amber-200 text-amber-700",
        status.type === "very-stale" && "bg-red-50 border-red-200 text-red-700",
        status.type === "unavailable" && "bg-gray-50 border-gray-200 text-gray-600"
      )}
    >
      <Icon className="w-3.5 h-3.5" />
      <span>{status.label}</span>
    </div>
  )
}

export type { DataFreshnessProps }
