"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight, ArrowDownRight, Minus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TimeframeSelector } from "@/components/timeframe-selector"
import { TrendChart } from "@/components/trend-chart"
import type { Indicator } from "@/lib/types"
import type { TrendDataPoint } from "@/lib/data"
import { formatValue, getRelativeTime } from "@/lib/utils"

interface IndicatorDetailProps {
  indicator: Indicator
  trendData: TrendDataPoint[]
  color: string
}

export function IndicatorDetail({ indicator, trendData, color }: IndicatorDetailProps) {
  const [timeframe, setTimeframe] = useState<"1Y" | "5Y" | "10Y" | "Max">("1Y")

  const isPositive = indicator.changeDirection === "up"
  const isNegative = indicator.changeDirection === "down"
  const isFlat = indicator.changeDirection === "flat"

  const ArrowIcon = isPositive
    ? ArrowUpRight
    : isNegative
    ? ArrowDownRight
    : Minus

  const badgeVariant: "success" | "destructive" | "secondary" | "outline" | undefined =
    isPositive
      ? "success"
      : isNegative
      ? "destructive"
      : "outline"

  const timeframeMonths: Record<"1Y" | "5Y" | "10Y" | "Max", number> = {
    "1Y": 12,
    "5Y": 60,
    "10Y": 120,
    "Max": Infinity,
  }

  const filteredData = trendData.slice(-timeframeMonths[timeframe])

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <Link
            href="/"
            className="inline-flex items-center text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5 sm:mr-2" />
            <span className="hidden sm:inline">Back to Dashboard</span>
            <span className="sm:hidden">Back</span>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-5xl">
        {/* Title and current value */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
            {indicator.name}
          </h1>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              {formatValue(indicator.currentValue, indicator.unit)}
            </div>
            <Badge variant={badgeVariant} className="flex items-center gap-1 text-xs sm:text-sm h-7 sm:h-8">
              <ArrowIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              {Math.abs(indicator.changePercent).toFixed(2)}%
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-2">
            Last updated {getRelativeTime(indicator.lastUpdated)}
          </p>
        </div>

        {/* Chart section */}
        <Card className="mb-6 sm:mb-8">
          <CardHeader className="pb-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <CardTitle className="text-base sm:text-lg">Historical Trend</CardTitle>
              <TimeframeSelector selected={timeframe} onChange={setTimeframe} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] sm:h-[320px] lg:h-[380px]">
              <TrendChart
                data={filteredData}
                color={color}
                unit={indicator.unit === "%" ? "%" : ""}
              />
            </div>
          </CardContent>
        </Card>

        {/* Description */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">About This Indicator</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm sm:text-base text-muted-foreground">
              {indicator.name} is reported {indicator.frequency.toLowerCase()} with a{' '}
              {indicator.unit === "%" ? "percentage" : indicator.unit.toLowerCase()} unit of measurement.
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-4">
              Data source: Federal Reserve Economic Data (FRED)
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
