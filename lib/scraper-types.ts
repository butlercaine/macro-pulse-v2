/**
 * TypeScript interfaces mirroring Python Pydantic models from scraper/models.py
 */

export type MarketCategory =
  | 'forex'
  | 'indices'
  | 'commodities'
  | 'bonds'
  | 'crypto'
  | 'stocks'
  | 'etfs'
  | 'derivatives';

export type CountryCode =
  | 'US'
  | 'UK'
  | 'EU'
  | 'JP'
  | 'CN'
  | 'DE'
  | 'FR'
  | 'IT'
  | 'ES'
  | 'CA'
  | 'AU'
  | 'BR'
  | 'IN';

export type Sentiment =
  | 'positive'
  | 'negative'
  | 'neutral'
  | 'bullish'
  | 'bearish';

export interface MarketInstrument {
  symbol: string;
  name: string;
  value: number;
  change?: number | null;
  pct_change?: number | null;
  category: MarketCategory;
  timestamp: string; // ISO datetime string
  bid?: number | null;
  ask?: number | null;
  high?: number | null;
  low?: number | null;
  open?: number | null;
  previous_close?: number | null;
}

export interface MacroIndicator {
  country: CountryCode;
  indicator_name: string;
  value?: number | null;
  previous?: number | null;
  unit: string;
  timestamp: string; // ISO datetime string
  frequency: string;
  source?: string | null;
  actual?: string | null;
  forecast?: number | null;
  period?: string | null;
}

export interface NewsArticle {
  title: string;
  summary?: string | null;
  timestamp: string; // ISO datetime string
  url: string;
  source?: string | null;
  category?: string | null;
  sentiment?: Sentiment | null;
}

export interface ScraperData {
  forex: MarketInstrument[];
  indices: MarketInstrument[];
  commodities: MarketInstrument[];
  bonds: MarketInstrument[];
  crypto: MarketInstrument[];
  stocks: MarketInstrument[];
  etfs: MarketInstrument[];
  derivatives: MarketInstrument[];
  macro_us: MacroIndicator[];
  macro_uk: MacroIndicator[];
  macro_eu: MacroIndicator[];
  macro_jp: MacroIndicator[];
  macro_cn: MacroIndicator[];
  macro_de: MacroIndicator[];
  macro_fr: MacroIndicator[];
  macro_it: MacroIndicator[];
  macro_es: MacroIndicator[];
  macro_ca: MacroIndicator[];
  macro_au: MacroIndicator[];
  macro_br: MacroIndicator[];
  macro_in: MacroIndicator[];
  market_headlines: NewsArticle[];
  earnings_announcements: NewsArticle[];
  dividend_news: NewsArticle[];
  metadata: Record<string, unknown>;
  errors: string[];
}

/**
 * Helper type for macro indicators by country key
 */
export type MacroKey = `macro_${Lowercase<CountryCode>}`;

/**
 * Helper function to get all macro indicators from ScraperData
 */
export function getAllMacroIndicators(data: ScraperData): MacroIndicator[] {
  const macroKeys = Object.keys(data).filter((key) =>
    key.startsWith('macro_')
  ) as (keyof Pick<ScraperData, `macro_${Lowercase<CountryCode>}`>)[];
  return macroKeys.flatMap((key) => data[key]);
}

/**
 * Helper function to get all news articles from ScraperData
 */
export function getAllNews(data: ScraperData): NewsArticle[] {
  return [
    ...data.market_headlines,
    ...data.earnings_announcements,
    ...data.dividend_news,
  ];
}

/**
 * Helper function to get all market instruments from ScraperData
 */
export function getAllMarketInstruments(data: ScraperData): MarketInstrument[] {
  return [
    ...data.forex,
    ...data.indices,
    ...data.commodities,
    ...data.bonds,
    ...data.crypto,
    ...data.stocks,
    ...data.etfs,
    ...data.derivatives,
  ];
}
