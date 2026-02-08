import { YieldCurvePoint } from "./types"

/**
 * Check if the yield curve is inverted
 * 
 * @param points - Array of yield curve points
 * @returns Object with inversion status and details
 */
export function analyzeYieldCurve(points: YieldCurvePoint[]): {
  isInverted: boolean
  spread: number
  status: "inverted" | "normal" | "flat"
  shortTermYield: number | null
  longTermYield: number | null
} {
  // Find 2Y and 10Y yields
  const shortTerm = points.find((p) => p.maturity === "2Y")
  const longTerm = points.find((p) => p.maturity === "10Y")

  const shortTermYield = shortTerm?.yield ?? null
  const longTermYield = longTerm?.yield ?? null

  if (shortTermYield === null || longTermYield === null) {
    return {
      isInverted: false,
      spread: 0,
      status: "flat",
      shortTermYield: null,
      longTermYield: null,
    }
  }

  const spread = longTermYield - shortTermYield
  const isInverted = shortTermYield > longTermYield

  // Determine status
  let status: "inverted" | "normal" | "flat"
  if (isInverted) {
    status = "inverted"
  } else if (Math.abs(spread) < 0.1) {
    // Consider "flat" if spread is less than 0.1%
    status = "flat"
  } else {
    status = "normal"
  }

  return {
    isInverted,
    spread,
    status,
    shortTermYield,
    longTermYield,
  }
}

/**
 * Format spread value with sign
 */
export function formatSpread(spread: number): string {
  const sign = spread >= 0 ? "+" : ""
  return `${sign}${spread.toFixed(2)}%`
}
