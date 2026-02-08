// Indicator Configuration for FRED Series
// All 6 primary indicators plus additional series for yield curve

import { IndicatorConfig } from "./types";

export const INDICATORS: IndicatorConfig[] = [
  // Primary Dashboard Indicators
  {
    id: "cpi",
    slug: "cpi",
    name: "Consumer Price Index",
    seriesId: "CPIAUCSL",
    unit: "Index",
    frequency: "Monthly",
    showAsCard: true,
    color: "#3b82f6", // blue
    description: "A measure of the average change over time in prices paid by urban consumers for a basket of goods and services.",
  },
  {
    id: "unemployment",
    slug: "unemployment",
    name: "Unemployment Rate",
    seriesId: "UNRATE",
    unit: "%",
    frequency: "Monthly",
    showAsCard: true,
    color: "#ef4444", // red
    description: "The percentage of the labor force that is jobless and actively seeking employment.",
  },
  {
    id: "gdp",
    slug: "gdp",
    name: "GDP Growth Rate",
    seriesId: "A191RL1Q225SBEA",
    unit: "%",
    frequency: "Quarterly",
    showAsCard: true,
    color: "#22c55e", // green
    description: "The quarterly percentage increase in a country's Gross Domestic Product, measuring economic growth.",
  },
  {
    id: "fedfunds",
    slug: "fed-funds",
    name: "Federal Funds Rate",
    seriesId: "FEDFUNDS",
    unit: "%",
    frequency: "Monthly",
    showAsCard: true,
    color: "#8b5cf6", // purple
    description: "The target interest rate set by the Federal Reserve at which commercial banks borrow and lend their excess reserves to each other overnight.",
  },
  {
    id: "dgs10",
    slug: "treasury-10y",
    name: "10-Year Treasury Yield",
    seriesId: "DGS10",
    unit: "%",
    frequency: "Daily",
    showAsCard: true,
    color: "#f59e0b", // amber
    description: "The interest rate on the U.S. government's 10-year treasury bond, a key benchmark for mortgage rates and long-term borrowing costs.",
  },
  {
    id: "dgs2",
    slug: "treasury-2y",
    name: "2-Year Treasury Yield",
    seriesId: "DGS2",
    unit: "%",
    frequency: "Daily",
    showAsCard: true,
    color: "#ec4899", // pink
    description: "The interest rate on the U.S. government's 2-year treasury bond, sensitive to Federal Reserve policy expectations.",
  },
  // Additional series for yield curve (not displayed as cards)
  {
    id: "dgs5",
    slug: "treasury-5y",
    name: "5-Year Treasury Yield",
    seriesId: "DGS5",
    unit: "%",
    frequency: "Daily",
    showAsCard: false,
    color: "#06b6d4", // cyan
    description: "The interest rate on the U.S. government's 5-year treasury bond.",
  },
  {
    id: "dgs30",
    slug: "treasury-30y",
    name: "30-Year Treasury Yield",
    seriesId: "DGS30",
    unit: "%",
    frequency: "Daily",
    showAsCard: false,
    color: "#84cc16", // lime
    description: "The interest rate on the U.S. government's 30-year treasury bond, the longest-dated U.S. government bond.",
  },
];

/** Series IDs for main dashboard indicator cards */
export const INDICATOR_CARD_IDS = INDICATORS.filter((i) => i.showAsCard).map((i) => i.id);

/** Series IDs for yield curve chart */
export const YIELD_CURVE_SERIES_IDS = INDICATORS.filter((i) => 
  ["dgs2", "dgs5", "dgs10", "dgs30"].includes(i.id)
).map((i) => i.seriesId);

/** Slugs for static page generation */
export const INDICATOR_SLUGS = INDICATORS.filter((i) => i.showAsCard).map((i) => i.slug);

/** Map from series ID to indicator config */
export const SERIES_ID_TO_CONFIG = new Map(
  INDICATORS.map((config) => [config.seriesId, config])
);

/** Map from slug to indicator config */
export const SLUG_TO_CONFIG = new Map(
  INDICATORS.map((config) => [config.slug, config])
);

/** Get indicator config by internal ID */
export function getIndicatorById(id: string): IndicatorConfig | undefined {
  return INDICATORS.find((i) => i.id === id);
}

/** Get indicator config by FRED series ID */
export function getIndicatorBySeriesId(seriesId: string): IndicatorConfig | undefined {
  return SERIES_ID_TO_CONFIG.get(seriesId);
}

/** Get indicator config by URL slug */
export function getIndicatorBySlug(slug: string): IndicatorConfig | undefined {
  return SLUG_TO_CONFIG.get(slug);
}
