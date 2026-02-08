"use client"

import { memo, useMemo } from "react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { TrendDataPoint } from "@/lib/data"

interface TrendChartProps {
  data: TrendDataPoint[]
  color?: string
  unit?: string
  height?: number
}

function TrendChartComponent({
  data,
  color = "#3b82f6",
  unit = "",
  height = 300,
}: TrendChartProps) {
  const gradientId = `trend-gradient-${Math.random().toString(36).slice(2, 9)}`

  const formattedData = useMemo(() => {
    return data.map((point) => ({
      ...point,
      formattedDate: new Date(point.date).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      }),
    }))
  }, [data])

  const yMin = useMemo(() => {
    if (data.length === 0) return 0
    const values = data.map((d) => d.value)
    const min = Math.min(...values)
    const range = Math.max(...values) - min || 1
    return min - range * 0.1
  }, [data])

  const yMax = useMemo(() => {
    if (data.length === 0) return 100
    const values = data.map((d) => d.value)
    const max = Math.max(...values)
    const range = max - Math.min(...values) || 1
    return max + range * 0.1
  }, [data])

  if (data.length === 0) {
    return (
      <div
        className="flex items-center justify-center bg-muted/20 rounded-lg w-full"
        style={{ height }}
      >
        <p className="text-muted-foreground text-sm">No data available</p>
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart 
        data={formattedData} 
        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.3} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} vertical={false} />

        <XAxis
          dataKey="formattedDate"
          stroke="#9ca3af"
          fontSize={11}
          tickLine={false}
          axisLine={false}
          minTickGap={30}
        />

        <YAxis
          domain={[yMin, yMax]}
          stroke="#9ca3af"
          fontSize={11}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value.toFixed(1)}${unit}`}
          width={45}
        />

        <Tooltip
          contentStyle={{
            backgroundColor: "#1f2937",
            border: "1px solid #374151",
            borderRadius: "8px",
            color: "#f9fafb",
          }}
          itemStyle={{ color: "#f9fafb" }}
          labelStyle={{ color: "#9ca3af", marginBottom: "4px", fontSize: "12px" }}
          formatter={(value: number | undefined) => [
            value !== undefined ? `${value.toFixed(2)}${unit}` : "N/A",
            "Value",
          ]}
          labelFormatter={(label) => new Date(label).toLocaleDateString("en-US", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        />

        <Area
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          fill={`url(#${gradientId})`}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export const TrendChart = memo(TrendChartComponent)
