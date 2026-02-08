// FRED API Types

export interface FredObservation {
  /** Date in YYYY-MM-DD format */
  date: string;
  /** Value as string (may be "." for missing data) */
  value: string;
}

/** Represents a processed macroeconomic indicator */
export interface Indicator {
  /** Internal ID: "cpi", "unemployment", etc. */
  id: string;
  /** Display name for UI */
  name: string;
  /** FRED series identifier */
  seriesId: string;
  /** Most recent value */
  currentValue: number;
  /** Previous period value */
  previousValue: number;
  /** Direction of change from previous period */
  changeDirection: "up" | "down" | "flat";
  /** Percentage change from previous period */
  changePercent: number;
  /** Unit of measurement: "%", "Index", "$ Billions", etc. */
  unit: string;
  /** Data frequency: "Monthly", "Quarterly", "Daily" */
  frequency: string;
  /** Last 12 data points for sparkline visualization */
  sparklineData: number[];
  /** ISO timestamp of last update */
  lastUpdated: string;
}

/** Represents a single point on the yield curve */
export interface YieldCurvePoint {
  /** Maturity label: "1M", "3M", "1Y", "2Y", "5Y", "10Y", "20Y", "30Y" */
  maturity: string;
  /** Yield as percentage (e.g., 4.25 for 4.25%) */
  yield: number;
  /** Date of this observation */
  date: string;
}

/** Configuration for a FRED series */
export interface IndicatorConfig {
  /** Internal ID */
  id: string;
  /** URL slug for detail pages */
  slug: string;
  /** Display name */
  name: string;
  /** FRED series ID */
  seriesId: string;
  /** Unit of measurement */
  unit: string;
  /** Data frequency */
  frequency: "Daily" | "Weekly" | "Monthly" | "Quarterly" | "Annual";
  /** Whether to display as a main indicator card */
  showAsCard: boolean;
  /** Color for charts */
  color: string;
  /** Brief description for detail page */
  description?: string;
}

/** Result of change calculation */
export interface ChangeResult {
  direction: "up" | "down" | "flat";
  change: number;
  percent: number;
}
