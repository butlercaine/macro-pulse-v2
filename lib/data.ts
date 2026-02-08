// Data Fetching Layer
// Combines FRED API client with transformations

import { fetchSeries, fetchSeriesBatch } from "./fred-api";
import { INDICATORS, getIndicatorById, getIndicatorBySeriesId } from "./indicators";
import {
  Indicator,
  YieldCurvePoint,
  FredObservation,
} from "./types";
import {
  calculateChange,
  formatValue,
  transformToSparkline,
  getLatestValue,
  filterAndParseObservations,
  getRelativeTime,
} from "./utils";

/**
 * Fetch and transform a single indicator
 * 
 * @param indicatorId - Internal indicator ID (e.g., "cpi", "fedfunds")
 * @returns Processed Indicator object
 */
export async function getIndicator(indicatorId: string): Promise<Indicator | null> {
  const config = getIndicatorById(indicatorId);
  if (!config) {
    console.error(`[Data] Unknown indicator: ${indicatorId}`);
    return null;
  }

  const observations = await fetchSeries(config.seriesId, { limit: 13 });

  if (observations.length === 0) {
    console.error(`[Data] No observations for ${config.name}`);
    return null;
  }

  const values = filterAndParseObservations(observations);
  const currentValue = values[0];
  const previousValue = values[1] ?? values[0];

  if (currentValue === undefined) {
    console.error(`[Data] Invalid values for ${config.name}`);
    return null;
  }

  const change = calculateChange(currentValue, previousValue);

  return {
    id: config.id,
    name: config.name,
    seriesId: config.seriesId,
    currentValue,
    previousValue,
    changeDirection: change.direction,
    changePercent: change.percent,
    unit: config.unit,
    frequency: config.frequency,
    sparklineData: transformToSparkline(observations, 12),
    lastUpdated: observations[0]?.date ?? new Date().toISOString(),
  };
}

/**
 * Fetch all 6 dashboard indicators in parallel
 * 
 * @returns Array of Indicator objects (excludes yield curve only series)
 */
export async function getAllIndicators(): Promise<Indicator[]> {
  const indicatorIds = INDICATORS.filter((i) => i.showAsCard).map((i) => i.id);

  const results = await Promise.all(
    indicatorIds.map(async (id) => {
      const indicator = await getIndicator(id);
      return indicator;
    })
  );

  return results.filter((i): i is Indicator => i !== null);
}

/**
 * Fetch yield curve data for DGS2, DGS5, DGS10, DGS30
 * 
 * @returns Array of YieldCurvePoint objects sorted by maturity
 */
export async function getYieldCurve(): Promise<YieldCurvePoint[]> {
  const seriesIds = ["DGS2", "DGS5", "DGS10", "DGS30"];
  
  const batchResults = await fetchSeriesBatch(seriesIds, { limit: 1 });

  const yieldData: YieldCurvePoint[] = [];
  const maturityOrder: Record<string, number> = {
    DGS2: 1,
    DGS5: 2,
    DGS10: 3,
    DGS30: 4,
  };

  for (const seriesId of seriesIds) {
    const observations = batchResults.get(seriesId) ?? [];
    const values = filterAndParseObservations(observations);
    const latestYield = values[0];

    if (latestYield !== undefined) {
      const config = getIndicatorBySeriesId(seriesId);
      yieldData.push({
        maturity: config?.id?.replace("dgs", "").toUpperCase() ?? seriesId.replace("DGS", ""),
        yield: latestYield,
        date: observations[0]?.date ?? new Date().toISOString().split("T")[0],
      });
    }
  }

  // Sort by maturity
  yieldData.sort((a, b) => (maturityOrder[a.maturity] ?? 0) - (maturityOrder[b.maturity] ?? 0));

  return yieldData;
}

/**
 * Fetch historical data for a specific indicator
 * 
 * @param indicatorId - Internal indicator ID
 * @param months - Number of months of history (default: 24)
 * @returns Array of observations with date and value
 */
export async function getIndicatorHistory(
  indicatorId: string,
  months: number = 24
): Promise<FredObservation[]> {
  const config = getIndicatorById(indicatorId);
  if (!config) {
    return [];
  }

  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - months);

  const observations = await fetchSeries(config.seriesId, {
    observationStart: startDate.toISOString().split("T")[0],
    limit: 100,
  });

  return observations;
}

/** Data point format for trend charts */
export interface TrendDataPoint {
  date: string;
  value: number;
}

/**
 * Get trend data for a specific indicator and timeframe
 * 
 * @param indicatorId - Internal indicator ID
 * @param timeframe - Timeframe: "1Y", "5Y", "10Y", "Max"
 * @returns Array of {date, value} for charting
 */
export async function getIndicatorTrendHistory(
  indicatorId: string,
  timeframe: "1Y" | "5Y" | "10Y" | "Max" = "1Y"
): Promise<TrendDataPoint[]> {
  const config = getIndicatorById(indicatorId);
  if (!config) {
    return [];
  }

  // Map timeframe to months
  const monthsMap: Record<"1Y" | "5Y" | "10Y" | "Max", number> = {
    "1Y": 12,
    "5Y": 60,
    "10Y": 120,
    "Max": 480, // 40 years max for performance
  };

  const months = monthsMap[timeframe];
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - months);

  const observations = await fetchSeries(config.seriesId, {
    observationStart: startDate.toISOString().split("T")[0],
    limit: timeframe === "Max" ? 500 : 200,
  });

  // Filter and transform to chart format
  const validData = filterAndParseObservations(observations);

  return observations
    .filter((obs) => obs.value !== "." && obs.value !== "")
    .map((obs) => ({
      date: obs.date,
      value: parseFloat(obs.value),
    }))
    .filter((point) => !isNaN(point.value));
}

/**
 * Generate mock trend data for development
 */
export function getMockTrendHistory(
  timeframe: "1Y" | "5Y" | "10Y" | "Max" = "1Y"
): TrendDataPoint[] {
  const monthsMap: Record<"1Y" | "5Y" | "10Y" | "Max", number> = {
    "1Y": 12,
    "5Y": 60,
    "10Y": 120,
    "Max": 240,
  };

  const months = monthsMap[timeframe];
  const data: TrendDataPoint[] = [];
  const now = new Date();
  let value = 300;

  for (let i = months; i >= 0; i--) {
    const date = new Date(now);
    date.setMonth(date.getMonth() - i);
    
    // Generate somewhat realistic trending data with some volatility
    value = value + (Math.random() - 0.4) * 5;
    if (value < 280) value = 280;
    if (value > 350) value = 350;
    
    data.push({
      date: date.toISOString().split("T")[0],
      value: parseFloat(value.toFixed(2)),
    });
  }

  return data;
}

/**
 * Generate mock data for development/demo without API key
 * 
 * @returns Object with mock indicators and yield curve
 */
export function getMockData(): {
  indicators: Indicator[];
  yieldCurve: YieldCurvePoint[];
} {
  const mockIndicators: Indicator[] = [
    {
      id: "cpi",
      name: "Consumer Price Index",
      seriesId: "CPIAUCSL",
      currentValue: 314.8,
      previousValue: 312.5,
      changeDirection: "up",
      changePercent: 0.74,
      unit: "Index",
      frequency: "Monthly",
      sparklineData: [310.5, 311.2, 311.8, 312.0, 312.5, 312.8, 313.0, 313.2, 313.5, 314.0, 314.5, 314.8],
      lastUpdated: new Date().toISOString().split("T")[0],
    },
    {
      id: "unemployment",
      name: "Unemployment Rate",
      seriesId: "UNRATE",
      currentValue: 3.9,
      previousValue: 3.8,
      changeDirection: "up",
      changePercent: 2.63,
      unit: "%",
      frequency: "Monthly",
      sparklineData: [3.7, 3.7, 3.8, 3.8, 3.9, 3.9, 3.8, 3.8, 3.9, 3.9, 4.0, 3.9],
      lastUpdated: new Date().toISOString().split("T")[0],
    },
    {
      id: "gdp",
      name: "GDP Growth Rate",
      seriesId: "A191RL1Q225SBEA",
      currentValue: 3.1,
      previousValue: 2.1,
      changeDirection: "up",
      changePercent: 47.62,
      unit: "%",
      frequency: "Quarterly",
      sparklineData: [2.1, 2.2, 1.6, 3.0, 2.8, 3.0, 3.1],
      lastUpdated: new Date().toISOString().split("T")[0],
    },
    {
      id: "fedfunds",
      name: "Federal Funds Rate",
      seriesId: "FEDFUNDS",
      currentValue: 4.33,
      previousValue: 4.28,
      changeDirection: "up",
      changePercent: 1.17,
      unit: "%",
      frequency: "Monthly",
      sparklineData: [4.15, 4.18, 4.20, 4.22, 4.25, 4.27, 4.28, 4.30, 4.31, 4.32, 4.33, 4.33],
      lastUpdated: new Date().toISOString().split("T")[0],
    },
    {
      id: "dgs10",
      name: "10-Year Treasury Yield",
      seriesId: "DGS10",
      currentValue: 4.28,
      previousValue: 4.26,
      changeDirection: "up",
      changePercent: 0.47,
      unit: "%",
      frequency: "Daily",
      sparklineData: [4.15, 4.18, 4.20, 4.22, 4.24, 4.25, 4.26, 4.27, 4.27, 4.28, 4.28, 4.28],
      lastUpdated: new Date().toISOString().split("T")[0],
    },
    {
      id: "dgs2",
      name: "2-Year Treasury Yield",
      seriesId: "DGS2",
      currentValue: 4.52,
      previousValue: 4.48,
      changeDirection: "up",
      changePercent: 0.89,
      unit: "%",
      frequency: "Daily",
      sparklineData: [4.35, 4.40, 4.42, 4.45, 4.46, 4.47, 4.48, 4.49, 4.50, 4.51, 4.52, 4.52],
      lastUpdated: new Date().toISOString().split("T")[0],
    },
  ];

  const mockYieldCurve: YieldCurvePoint[] = [
    { maturity: "2Y", yield: 4.52, date: new Date().toISOString().split("T")[0] },
    { maturity: "5Y", yield: 4.35, date: new Date().toISOString().split("T")[0] },
    { maturity: "10Y", yield: 4.28, date: new Date().toISOString().split("T")[0] },
    { maturity: "30Y", yield: 4.52, date: new Date().toISOString().split("T")[0] },
  ];

  return { indicators: mockIndicators, yieldCurve: mockYieldCurve };
}
