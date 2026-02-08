"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { YieldCurveChart } from "./yield-curve-chart"
import { YieldCurvePoint } from "@/lib/types"
import { analyzeYieldCurve, formatSpread } from "@/lib/yield-utils"
import { getRelativeTime } from "@/lib/utils"

interface YieldCurveSectionProps {
  data: YieldCurvePoint[]
}

export function YieldCurveSection({ data }: YieldCurveSectionProps) {
  const analysis = analyzeYieldCurve(data)

  const badgeVariant = analysis.isInverted
    ? "destructive"
    : "success"

  const badgeText = analysis.isInverted
    ? "INVERTED"
    : analysis.status === "flat"
    ? "FLAT"
    : "NORMAL"

  const spreadValue = analysis.isInverted
    ? -analysis.spread
    : analysis.spread

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <CardTitle className="text-base sm:text-lg font-semibold">
            US Treasury Yield Curve
          </CardTitle>
          <Badge variant={badgeVariant}>{badgeText}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        {/* Spread display */}
        <div className="mb-3 sm:mb-4 flex flex-wrap items-center gap-2 text-xs sm:text-sm">
          <span className="text-muted-foreground">2Y-10Y Spread:</span>
          <span
            className={
              analysis.isInverted
                ? "text-red-500 font-semibold"
                : "text-emerald-500 font-semibold"
            }
          >
            {formatSpread(spreadValue)}
          </span>
          {analysis.isInverted && (
            <span className="text-xs text-red-400">(Recession Signal)</span>
          )}
        </div>

        {/* Chart - responsive height */}
        <div className="h-[220px] sm:h-[280px] lg:h-[320px]">
          <YieldCurveChart data={data} />
        </div>

        {/* Last updated */}
        {data.length > 0 && (
          <div className="mt-3 sm:mt-4 text-[10px] sm:text-xs text-muted-foreground text-right">
            Data as of {getRelativeTime(data[0]?.date ?? new Date().toISOString())}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
