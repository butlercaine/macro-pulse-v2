"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { cn, formatValue } from "@/lib/utils"

interface Indicator {
  label: string
  value: number
  unit: string
  change?: number
  trend?: "up" | "down" | "flat"
}

interface CountryData {
  code: string // ISO country code
  name: string
  flag: string // Emoji flag
  indicators: {
    gdp: Indicator
    cpi: Indicator
    unemployment: Indicator
  }
}

interface MacroCountryCardProps {
  country: CountryData
  className?: string
}

export function MacroCountryCard({ country, className }: MacroCountryCardProps) {
  const { gdp, cpi, unemployment } = country.indicators

  const IndicatorRow = ({ indicator }: { indicator: Indicator }) => (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-xs text-muted-foreground">{indicator.label}</span>
      <div className="flex items-center gap-2">
        {indicator.change !== undefined && (
          <span
            className={cn(
              "text-xs font-medium",
              indicator.trend === "up" && "text-emerald-500",
              indicator.trend === "down" && "text-red-500",
              indicator.trend === "flat" && "text-muted-foreground"
            )}
          >
            {indicator.trend === "up" && "+"}
            {indicator.change.toFixed(2)}%
          </span>
        )}
        <span className="text-sm font-semibold">
          {formatValue(indicator.value, indicator.unit)}
        </span>
      </div>
    </div>
  )

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl" role="img" aria-label={`${country.name} flag`}>
            {country.flag}
          </span>
          <h3 className="font-semibold text-sm">{country.name}</h3>
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-1">
        <IndicatorRow indicator={gdp} />
        <IndicatorRow indicator={cpi} />
        <IndicatorRow indicator={unemployment} />
      </CardContent>
    </Card>
  )
}

export type { CountryData, Indicator }
