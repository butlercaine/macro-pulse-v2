// Data Transformation Utilities

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { FredObservation, ChangeResult } from "./types"

/** Merge class names with tailwind-merge */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Calculate the change between two values
 * 
 * @param current - Current period value
 * @param previous - Previous period value
 * @returns Object with direction, change amount, and percent change
 * 
 * @example
 * ```typescript
 * const result = calculateChange(3.5, 3.2);
 * // result: { direction: "up", change: 0.3, percent: 9.375 }
 * ```
 */
export function calculateChange(current: number, previous: number): ChangeResult {
  const change = current - previous;
  const percent = previous !== 0 ? (change / Math.abs(previous)) * 100 : 0;
  
  let direction: "up" | "down" | "flat";
  if (change > 0.0001) {
    direction = "up";
  } else if (change < -0.0001) {
    direction = "down";
  } else {
    direction = "flat";
  }

  return { direction, change, percent };
}

/**
 * Format a value with appropriate decimals based on unit
 * 
 * @param value - Numeric value to format
 * @param unit - Unit of measurement
 * @returns Formatted string
 * 
 * @example
 * ```typescript
 * formatValue(3.5, "%");      // "3.50%"
 * formatValue(314.8, "Index"); // "314.80"
 * formatValue(2.567, "%");     // "2.57%"
 * ```
 */
export function formatValue(value: number, unit: string): string {
  // Determine decimal places based on unit and value magnitude
  let decimals: number;
  
  if (unit === "%") {
    // Percent values typically have 2-3 decimal places
    decimals = Math.abs(value) < 1 ? 3 : 2;
  } else if (unit === "Index" || unit === "$ Billions") {
    // Index values: more decimals for small values
    decimals = Math.abs(value) < 10 ? 2 : 1;
  } else {
    decimals = 2;
  }

  return `${value.toFixed(decimals)}${unit === "%" ? "%" : ""}`;
}

/**
 * Filter out missing observations and extract numeric values
 * 
 * @param observations - Array of FRED observations
 * @returns Array of valid numeric values (oldest to newest)
 * 
 * @example
 * ```typescript
 * const values = filterAndParseObservations([
 *   { date: "2024-01-01", value: "3.1" },
 *   { date: "2024-01-02", value: "." },
 *   { date: "2024-01-03", value: "3.2" },
 * ]);
 * // values: [3.1, 3.2]
 * ```
 */
export function filterAndParseObservations(observations: FredObservation[]): number[] {
  return observations
    .filter((obs) => obs.value !== "." && obs.value !== "")
    .map((obs) => parseFloat(obs.value))
    .filter((val) => !isNaN(val));
}

/**
 * Extract the last N data points for sparkline visualization
 * 
 * @param observations - Array of FRED observations
 * @param count - Number of data points to extract
 * @returns Array of numeric values (oldest to newest)
 * 
 * @example
 * ```typescript
 * const sparkline = transformToSparkline(observations, 12);
 * // Returns last 12 valid numeric values
 * ```
 */
export function transformToSparkline(observations: FredObservation[], count: number): number[] {
  const validValues = filterAndParseObservations(observations);
  
  // Reverse to get most recent first, then take count, then reverse back
  const recent = validValues.slice(0, count).reverse();
  
  return recent;
}

/**
 * Get the latest value from observations
 * 
 * @param observations - Array of FRED observations
 * @returns Latest numeric value, or undefined if no valid data
 */
export function getLatestValue(observations: FredObservation[]): number | undefined {
  const validValues = filterAndParseObservations(observations);
  return validValues[0];
}

/**
 * Format date for display
 * 
 * @param dateString - ISO date string (YYYY-MM-DD)
 * @returns Formatted date string
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Generate a relative time description
 * 
 * @param dateString - ISO date string
 * @returns Human-readable relative time (e.g., "2 days ago")
 */
export function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}
