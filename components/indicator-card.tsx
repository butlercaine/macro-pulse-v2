"use client"

import Link from "next/link"
import { memo } from "react"
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkline } from "./sparkline"
import type { Indicator } from "@/lib/types"
import { formatValue, getRelativeTime } from "@/lib/utils"
import { getIndicatorById } from "@/lib/indicators"

interface IndicatorCardProps {
  indicator: Indicator
  color?: string
}

function IndicatorCardComponent({
  indicator,
  color,
}: IndicatorCardProps) {
  const isPositive = indicator.changeDirection === "up"
  const isNegative = indicator.changeDirection === "down"
  const isFlat = indicator.changeDirection === "flat"

  const ArrowIcon = isPositive
    ? ArrowUpRight
    : isNegative
    ? ArrowDownRight
    : Minus

  const badgeVariant: "default" | "success" | "destructive" | "secondary" | "outline" | undefined =
    isPositive
      ? "success"
      : isNegative
      ? "destructive"
      : "outline"

  const config = getIndicatorById(indicator.id)
  const slug = config?.slug || indicator.id
  const sparklineColor = color || config?.color || "#3b82f6"

  return (
    <Link href={`/indicator/${slug}`}>
      <Card
        className={`
          cursor-pointer transition-all duration-200
          hover:shadow-lg hover:scale-[1.02]
          active:scale-[0.98]
          h-full
        `}
      >
        <CardContent className="p-3 sm:p-4">
          {/* Header: Title and change badge */}
          <div className="flex items-center justify-between gap-2 mb-2 sm:mb-3">
            <span className="text-xs sm:text-sm text-muted-foreground font-medium line-clamp-1">
              {indicator.name}
            </span>
            <Badge variant={badgeVariant} className="flex items-center gap-0.5 flex-shrink-0">
              <ArrowIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              <span className="text-xs">{Math.abs(indicator.changePercent).toFixed(1)}%</span>
            </Badge>
          </div>

          {/* Value display */}
          <div className="mb-2 sm:mb-3">
            <div className="text-xl sm:text-2xl font-bold tracking-tight">
              {formatValue(indicator.currentValue, indicator.unit)}
            </div>
            <div
              className={`
                text-xs
                ${isPositive ? "text-emerald-500" : ""}
                ${isNegative ? "text-red-500" : ""}
                ${isFlat ? "text-muted-foreground" : ""}
              `}
            >
              {isPositive && "+"}
              {indicator.changePercent.toFixed(2)}% from previous
            </div>
          </div>

          {/* Sparkline */}
          {indicator.sparklineData.length > 0 && (
            <div className="flex justify-start mb-2 sm:mb-3">
              <Sparkline
                data={indicator.sparklineData}
                width={80}
                height={28}
                color={sparklineColor}
                strokeWidth={1.5}
              />
            </div>
          )}

          {/* Footer: Last updated */}
          <div className="text-[10px] sm:text-xs text-muted-foreground">
            Updated {getRelativeTime(indicator.lastUpdated)}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export const IndicatorCard = memo(IndicatorCardComponent)
