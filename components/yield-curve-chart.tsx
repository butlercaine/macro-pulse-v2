"use client"

import { memo } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts"
import { YieldCurvePoint } from "@/lib/types"
import { analyzeYieldCurve } from "@/lib/yield-utils"

interface YieldCurveChartProps {
  data: YieldCurvePoint[]
}

function YieldCurveChartComponent({ data }: YieldCurveChartProps) {
  const analysis = analyzeYieldCurve(data)

  const chartData = data.map((point) => ({
    maturity: point.maturity,
    yield: point.yield,
    fullMaturity: `${point.maturity} Treasury`,
  }))

  const lineColor = analysis.isInverted
    ? "#ef4444"
    : "#22c55e"

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} vertical={false} />
        
        <XAxis
          dataKey="maturity"
          stroke="#9ca3af"
          fontSize={11}
          tickLine={false}
          axisLine={false}
        />
        
        <YAxis
          domain={["auto", "auto"]}
          stroke="#9ca3af"
          fontSize={11}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value.toFixed(2)}%`}
          width={45}
        />
        
        <Tooltip
          contentStyle={{
            backgroundColor: "#1f2937",
            border: "1px solid #374151",
            borderRadius: "8px",
            color: "#f9fafb",
          }}
          itemStyle={{ color: "#f9fafb", fontSize: "12px" }}
          labelStyle={{ color: "#9ca3af", marginBottom: "4px" }}
          formatter={(value: number | undefined) => [
            value !== undefined ? `${value.toFixed(3)}%` : "N/A",
            "Yield",
          ]}
        />
        
        {analysis.isInverted && analysis.shortTermYield !== null && (
          <ReferenceLine
            y={analysis.shortTermYield}
            stroke="#ef4444"
            strokeDasharray="5 5"
            label={{
              value: "Short > Long",
              fill: "#ef4444",
              fontSize: 9,
              position: "right",
            }}
          />
        )}
        
        <Line
          type="monotone"
          dataKey="yield"
          stroke={lineColor}
          strokeWidth={2.5}
          dot={{ fill: lineColor, r: 4, strokeWidth: 2, stroke: "#fff" }}
          activeDot={{ r: 6, fill: lineColor }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export const YieldCurveChart = memo(YieldCurveChartComponent)
