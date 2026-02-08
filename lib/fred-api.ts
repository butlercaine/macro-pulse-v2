// FRED API Client
// Documentation: https://fred.stlouisfed.org/docs/api/fred/series/observations.html

import { FredObservation } from "./types";

const FRED_BASE_URL = "https://api.stlouisfed.org/fred/series/observations";

/**
 * Fetch observations for a FRED series
 * 
 * @param seriesId - FRED series identifier (e.g., "CPIAUCSL", "FEDFUNDS")
 * @param options - Fetch options
 * @returns Array of observations with date and value
 * 
 * @example
 * ```typescript
 * const observations = await fetchSeries("FEDFUNDS", { limit: 12 });
 * ```
 */
export async function fetchSeries(
  seriesId: string,
  options: {
    /** Maximum number of observations to return (default: 120) */
    limit?: number;
    /** Start date in YYYY-MM-DD format */
    observationStart?: string;
    /** End date in YYYY-MM-DD format */
    observationEnd?: string;
    /** API key (defaults to environment variable) */
    apiKey?: string;
  } = {}
): Promise<FredObservation[]> {
  const apiKey = options.apiKey ?? process.env.FRED_API_KEY;

  if (!apiKey) {
    console.error(`[FRED API] No API key provided for series: ${seriesId}`);
    return [];
  }

  const params = new URLSearchParams({
    series_id: seriesId,
    api_key: apiKey,
    file_type: "json",
    sort_order: "desc",
    limit: String(options.limit ?? 120),
  });

  if (options.observationStart) {
    params.set("observation_start", options.observationStart);
  }

  if (options.observationEnd) {
    params.set("observation_end", options.observationEnd);
  }

  const url = `${FRED_BASE_URL}?${params.toString()}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[FRED API] Error fetching ${seriesId}: ${response.status} ${errorText}`);
      return [];
    }

    const data = await response.json();

    // Validate response structure
    if (!data.observations || !Array.isArray(data.observations)) {
      console.error(`[FRED API] Invalid response structure for ${seriesId}`);
      return [];
    }

    return data.observations as FredObservation[];
  } catch (error) {
    console.error(`[FRED API] Failed to fetch ${seriesId}:`, error);
    return [];
  }
}

/**
 * Fetch multiple series in parallel
 * 
 * @param seriesIds - Array of FRED series identifiers
 * @param options - Fetch options
 * @returns Map of series ID to observations array
 */
export async function fetchSeriesBatch(
  seriesIds: string[],
  options: {
    limit?: number;
    observationStart?: string;
    apiKey?: string;
  } = {}
): Promise<Map<string, FredObservation[]>> {
  const results = new Map<string, FredObservation[]>();

  await Promise.all(
    seriesIds.map(async (seriesId) => {
      const observations = await fetchSeries(seriesId, options);
      results.set(seriesId, observations);
    })
  );

  return results;
}
