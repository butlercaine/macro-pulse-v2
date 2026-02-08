"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

type Timeframe = "1Y" | "5Y" | "10Y" | "Max"

interface TimeframeSelectorProps {
  selected: Timeframe
  onChange: (timeframe: Timeframe) => void
}

export function TimeframeSelector({ selected, onChange }: TimeframeSelectorProps) {
  const timeframes: Timeframe[] = ["1Y", "5Y", "10Y", "Max"]

  return (
    <div className="flex items-center gap-0.5 sm:gap-1 p-0.5 sm:p-1 bg-muted rounded-md sm:rounded-lg overflow-x-auto">
      {timeframes.map((timeframe) => (
        <Button
          key={timeframe}
          variant={selected === timeframe ? "default" : "ghost"}
          size="sm"
          onClick={() => onChange(timeframe)}
          className={`
            flex-shrink-0 px-2 sm:px-3 h-8 sm:h-9 text-xs sm:text-sm
            ${selected === timeframe 
              ? "bg-primary text-primary-foreground hover:bg-primary/90" 
              : "text-muted-foreground hover:text-foreground"
            }
          `}
        >
          {timeframe}
        </Button>
      ))}
    </div>
  )
}
