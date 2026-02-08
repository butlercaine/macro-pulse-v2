"use client"

import { Indicator } from "@/lib/types"
import { IndicatorCard } from "./indicator-card"

interface IndicatorGridProps {
  indicators: Indicator[]
}

export function IndicatorGrid({ indicators }: IndicatorGridProps) {
  return (
    <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {indicators.map((indicator) => (
        <IndicatorCard
          key={indicator.id}
          indicator={indicator}
        />
      ))}
    </div>
  )
}
