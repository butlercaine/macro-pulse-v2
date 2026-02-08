"use client"

import * as React from "react"
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"
import { cn } from "@/lib/utils"

export interface MarketInstrument {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume?: string
}

interface MarketTableProps {
  instruments: MarketInstrument[]
  className?: string
}

type SortKey = keyof MarketInstrument
type SortDirection = "asc" | "desc"

export function MarketTable({ instruments, className }: MarketTableProps) {
  const [sortKey, setSortKey] = React.useState<SortKey>("changePercent")
  const [sortDirection, setSortDirection] = React.useState<SortDirection>("desc")

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortKey(key)
      setSortDirection("desc")
    }
  }

  const sortedInstruments = React.useMemo(() => {
    const sorted = [...instruments].sort((a, b) => {
      const aVal = a[sortKey]
      const bVal = b[sortKey]

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDirection === "asc" ? aVal - bVal : bVal - aVal
      }

      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortDirection === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal)
      }

      return 0
    })
    return sorted
  }, [instruments, sortKey, sortDirection])

  const SortIcon = ({ column }: { column: SortKey }) => {
    if (sortKey !== column) {
      return <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
    }
    return sortDirection === "asc" ? (
      <ArrowUp className="w-4 h-4" />
    ) : (
      <ArrowDown className="w-4 h-4" />
    )
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  const formatChange = (change: number) => {
    const sign = change >= 0 ? "+" : ""
    return `${sign}${change.toFixed(2)}`
  }

  const formatPercent = (percent: number) => {
    const sign = percent >= 0 ? "+" : ""
    return `${sign}${percent.toFixed(2)}%`
  }

  return (
    <div className={cn("overflow-x-auto rounded-md border", className)}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/50">
            <th
              className="px-4 py-3 text-left font-medium cursor-pointer hover:bg-muted/80 transition-colors"
              onClick={() => handleSort("symbol")}
            >
              <div className="flex items-center gap-1">
                Symbol
                <SortIcon column="symbol" />
              </div>
            </th>
            <th
              className="px-4 py-3 text-left font-medium cursor-pointer hover:bg-muted/80 transition-colors"
              onClick={() => handleSort("name")}
            >
              <div className="flex items-center gap-1">
                Name
                <SortIcon column="name" />
              </div>
            </th>
            <th
              className="px-4 py-3 text-right font-medium cursor-pointer hover:bg-muted/80 transition-colors"
              onClick={() => handleSort("price")}
            >
              <div className="flex items-center justify-end gap-1">
                Price
                <SortIcon column="price" />
              </div>
            </th>
            <th
              className="px-4 py-3 text-right font-medium cursor-pointer hover:bg-muted/80 transition-colors"
              onClick={() => handleSort("change")}
            >
              <div className="flex items-center justify-end gap-1">
                Change
                <SortIcon column="change" />
              </div>
            </th>
            <th
              className="px-4 py-3 text-right font-medium cursor-pointer hover:bg-muted/80 transition-colors"
              onClick={() => handleSort("changePercent")}
            >
              <div className="flex items-center justify-end gap-1">
                %
                <SortIcon column="changePercent" />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedInstruments.map((instrument) => (
            <tr
              key={instrument.symbol}
              className="border-b last:border-0 hover:bg-muted/30 transition-colors"
            >
              <td className="px-4 py-3 font-semibold">{instrument.symbol}</td>
              <td className="px-4 py-3 text-muted-foreground">{instrument.name}</td>
              <td className="px-4 py-3 text-right font-medium">
                {formatPrice(instrument.price)}
              </td>
              <td
                className={cn(
                  "px-4 py-3 text-right font-medium",
                  instrument.change >= 0 ? "text-emerald-500" : "text-red-500"
                )}
              >
                {formatChange(instrument.change)}
              </td>
              <td
                className={cn(
                  "px-4 py-3 text-right",
                  instrument.changePercent >= 0
                    ? "text-emerald-500"
                    : "text-red-500"
                )}
              >
                {formatPercent(instrument.changePercent)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export type { MarketTableProps, MarketInstrument }
