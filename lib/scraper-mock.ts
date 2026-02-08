import { ScraperData, MarketInstrument, MacroIndicator, NewsArticle } from './scraper-types';

const NOW = new Date().toISOString();

export const mockScraperData: ScraperData = {
  forex: [
    { symbol: 'EURUSD', name: 'Euro/US Dollar', value: 1.0483, change: 0.0021, pct_change: 0.2, category: 'forex', timestamp: NOW },
    { symbol: 'GBPUSD', name: 'British Pound/US Dollar', value: 1.2654, change: -0.0032, pct_change: -0.25, category: 'forex', timestamp: NOW },
    { symbol: 'USDJPY', name: 'US Dollar/Japanese Yen', value: 149.85, change: 0.45, pct_change: 0.3, category: 'forex', timestamp: NOW },
    { symbol: 'AUDUSD', name: 'Australian Dollar/US Dollar', value: 0.6521, change: 0.0018, pct_change: 0.28, category: 'forex', timestamp: NOW },
    { symbol: 'USDCAD', name: 'US Dollar/Canadian Dollar', value: 1.3589, change: -0.0021, pct_change: -0.15, category: 'forex', timestamp: NOW },
  ],
  indices: [
    { symbol: 'SPX', name: 'S&P 500', value: 5894.25, change: 15.32, pct_change: 0.26, category: 'indices', timestamp: NOW, high: 5902.18, low: 5875.43 },
    { symbol: 'NDX', name: 'Nasdaq 100', value: 20567.89, change: 78.45, pct_change: 0.38, category: 'indices', timestamp: NOW, high: 20589.12, low: 20492.34 },
    { symbol: 'DJI', name: 'Dow Jones Industrial', value: 43211.15, change: -45.67, pct_change: -0.11, category: 'indices', timestamp: NOW, high: 43289.23, low: 43165.89 },
    { symbol: 'FTSE', name: 'FTSE 100', value: 8521.42, change: 23.18, pct_change: 0.27, category: 'indices', timestamp: NOW },
    { symbol: 'DAX', name: 'DAX Performance', value: 21045.76, change: 56.32, pct_change: 0.27, category: 'indices', timestamp: NOW },
    { symbol: 'NIKKEI', name: 'Nikkei 225', value: 39126.23, change: 125.67, pct_change: 0.32, category: 'indices', timestamp: NOW },
    { symbol: 'HSI', name: 'Hang Seng Index', value: 19885.45, change: -89.34, pct_change: -0.45, category: 'indices', timestamp: NOW },
  ],
  commodities: [
    { symbol: 'GC', name: 'Gold Futures', value: 2034.56, change: 8.92, pct_change: 0.44, category: 'commodities', timestamp: NOW },
    { symbol: 'SI', name: 'Silver Futures', value: 22.34, change: 0.28, pct_change: 1.27, category: 'commodities', timestamp: NOW },
    { symbol: 'CL', name: 'Crude Oil WTI', value: 73.45, change: -1.23, pct_change: -1.65, category: 'commodities', timestamp: NOW },
    { symbol: 'NG', name: 'Natural Gas', value: 2.567, change: 0.045, pct_change: 1.78, category: 'commodities', timestamp: NOW },
    { symbol: 'HG', name: 'Copper', value: 3.8945, change: 0.0234, pct_change: 0.6, category: 'commodities', timestamp: NOW },
  ],
  bonds: [
    { symbol: 'US10Y', name: 'US 10Y Treasury', value: 4.234, change: 0.023, pct_change: 0.55, category: 'bonds', timestamp: NOW },
    { symbol: 'US2Y', name: 'US 2Y Treasury', value: 4.567, change: 0.012, pct_change: 0.26, category: 'bonds', timestamp: NOW },
    { symbol: 'US5Y', name: 'US 5Y Treasury', value: 4.123, change: 0.018, pct_change: 0.44, category: 'bonds', timestamp: NOW },
    { symbol: 'DE10Y', name: 'Germany 10Y Bund', value: 2.456, change: 0.015, pct_change: 0.61, category: 'bonds', timestamp: NOW },
    { symbol: 'UK10Y', name: 'UK 10Y Gilt', value: 3.987, change: -0.008, pct_change: -0.2, category: 'bonds', timestamp: NOW },
  ],
  crypto: [
    { symbol: 'BTC', name: 'Bitcoin', value: 67543.21, change: 1234.56, pct_change: 1.86, category: 'crypto', timestamp: NOW, high: 68234.12, low: 66821.45 },
    { symbol: 'ETH', name: 'Ethereum', value: 3456.78, change: 89.12, pct_change: 2.65, category: 'crypto', timestamp: NOW, high: 3512.34, low: 3412.67 },
    { symbol: 'SOL', name: 'Solana', value: 178.45, change: -3.21, pct_change: -1.77, category: 'crypto', timestamp: NOW },
    { symbol: 'XRP', name: 'Ripple', value: 0.6234, change: 0.0123, pct_change: 2.01, category: 'crypto', timestamp: NOW },
  ],
  stocks: [
    { symbol: 'AAPL', name: 'Apple Inc.', value: 185.92, change: 1.23, pct_change: 0.67, category: 'stocks', timestamp: NOW },
    { symbol: 'MSFT', name: 'Microsoft Corp.', value: 415.34, change: 2.87, pct_change: 0.7, category: 'stocks', timestamp: NOW },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', value: 172.56, change: -0.89, pct_change: -0.51, category: 'stocks', timestamp: NOW },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', value: 201.23, change: 1.56, pct_change: 0.78, category: 'stocks', timestamp: NOW },
    { symbol: 'NVDA', name: 'NVIDIA Corp.', value: 875.45, change: 12.34, pct_change: 1.43, category: 'stocks', timestamp: NOW, high: 882.12, low: 865.23 },
  ],
  etfs: [
    { symbol: 'SPY', name: 'SPDR S&P 500 ETF', value: 589.12, change: 1.45, pct_change: 0.25, category: 'etfs', timestamp: NOW },
    { symbol: 'QQQ', name: 'Invesco QQQ Trust', value: 523.67, change: 3.21, pct_change: 0.62, category: 'etfs', timestamp: NOW },
    { symbol: 'IWM', name: 'iShares Russell 2000', value: 198.34, change: -0.56, pct_change: -0.28, category: 'etfs', timestamp: NOW },
  ],
  derivatives: [],
  macro_us: [
    { country: 'US', indicator_name: 'GDP Growth Rate', value: 3.1, previous: 4.9, unit: '%', timestamp: NOW, frequency: 'quarterly', actual: '3.1', forecast: 2.8, period: '2024-Q4' },
    { country: 'US', indicator_name: 'Inflation Rate CPI', value: 2.9, previous: 3.2, unit: '%', timestamp: NOW, frequency: 'monthly', actual: '2.9', forecast: 3.0, period: '2025-01' },
    { country: 'US', indicator_name: 'Unemployment Rate', value: 3.7, previous: 3.5, unit: '%', timestamp: NOW, frequency: 'monthly', actual: '3.7', forecast: 3.6, period: '2025-01' },
    { country: 'US', indicator_name: 'Fed Funds Rate', value: 4.5, previous: 4.5, unit: '%', timestamp: NOW, frequency: 'daily', source: 'Federal Reserve' },
    { country: 'US', indicator_name: 'Consumer Confidence', value: 114.8, previous: 110.7, unit: 'index', timestamp: NOW, frequency: 'monthly', period: '2025-01' },
    { country: 'US', indicator_name: 'Retail Sales MoM', value: 0.6, previous: 0.8, unit: '%', timestamp: NOW, frequency: 'monthly', period: '2024-12' },
    { country: 'US', indicator_name: 'Industrial Production MoM', value: 0.1, previous: 0.9, unit: '%', timestamp: NOW, frequency: 'monthly', period: '2024-12' },
    { country: 'US', indicator_name: 'Housing Starts MoM', value: -4.6, previous: 8.3, unit: '%', timestamp: NOW, frequency: 'monthly', period: '2024-12' },
  ],
  macro_uk: [
    { country: 'UK', indicator_name: 'GDP Growth Rate', value: 0.1, previous: 0.0, unit: '%', timestamp: NOW, frequency: 'monthly', period: '2024-12' },
    { country: 'UK', indicator_name: 'Inflation Rate CPI', value: 3.0, previous: 3.2, unit: '%', timestamp: NOW, frequency: 'monthly', period: '2025-01' },
    { country: 'UK', indicator_name: 'Bank of England Rate', value: 4.5, previous: 4.5, unit: '%', timestamp: NOW, frequency: 'daily', source: 'Bank of England' },
  ],
  macro_eu: [
    { country: 'EU', indicator_name: 'GDP Growth Rate', value: 0.4, previous: 0.2, unit: '%', timestamp: NOW, frequency: 'quarterly', period: '2024-Q4' },
    { country: 'EU', indicator_name: 'Inflation Rate', value: 2.5, previous: 2.7, unit: '%', timestamp: NOW, frequency: 'monthly', period: '2025-01' },
    { country: 'EU', indicator_name: 'ECB Rate', value: 3.5, previous: 3.5, unit: '%', timestamp: NOW, frequency: 'daily', source: 'ECB' },
    { country: 'EU', indicator_name: 'Unemployment Rate', value: 6.1, previous: 6.2, unit: '%', timestamp: NOW, frequency: 'monthly', period: '2024-12' },
  ],
  macro_jp: [
    { country: 'JP', indicator_name: 'GDP Growth Rate', value: 1.1, previous: -3.3, unit: '%', timestamp: NOW, frequency: 'quarterly', period: '2024-Q4' },
    { country: 'JP', indicator_name: 'Inflation Rate CPI', value: 2.6, previous: 2.7, unit: '%', timestamp: NOW, frequency: 'monthly', period: '2024-12' },
    { country: 'JP', indicator_name: 'BoJ Rate', value: 0.1, previous: 0.1, unit: '%', timestamp: NOW, frequency: 'daily', source: 'Bank of Japan' },
    { country: 'JP', indicator_name: 'Manufacturing PMI', value: 48.5, previous: 49.1, unit: 'index', timestamp: NOW, frequency: 'monthly', period: '2025-01' },
  ],
  macro_cn: [
    { country: 'CN', indicator_name: 'GDP Growth Rate', value: 5.0, previous: 4.6, unit: '%', timestamp: NOW, frequency: 'quarterly', period: '2024-Q4' },
    { country: 'CN', indicator_name: 'Inflation Rate CPI', value: 0.5, previous: 1.8, unit: '%', timestamp: NOW, frequency: 'monthly', period: '2024-12' },
    { country: 'CN', indicator_name: 'Caixin Manufacturing PMI', value: 50.2, previous: 49.1, unit: 'index', timestamp: NOW, frequency: 'monthly', period: '2025-01' },
  ],
  macro_de: [
    { country: 'DE', indicator_name: 'GDP Growth Rate', value: -0.2, previous: 0.1, unit: '%', timestamp: NOW, frequency: 'quarterly', period: '2024-Q4' },
    { country: 'DE', indicator_name: 'Inflation Rate CPI', value: 2.9, previous: 3.2, unit: '%', timestamp: NOW, frequency: 'monthly', period: '2025-01' },
    { country: 'DE', indicator_name: 'Unemployment Rate', value: 5.9, previous: 5.9, unit: '%', timestamp: NOW, frequency: 'monthly', period: '2024-12' },
  ],
  macro_fr: [
    { country: 'FR', indicator_name: 'GDP Growth Rate', value: 0.4, previous: 0.4, unit: '%', timestamp: NOW, frequency: 'quarterly', period: '2024-Q4' },
    { country: 'FR', indicator_name: 'Inflation Rate CPI', value: 2.9, previous: 3.1, unit: '%', timestamp: NOW, frequency: 'monthly', period: '2025-01' },
  ],
  macro_it: [
    { country: 'IT', indicator_name: 'GDP Growth Rate', value: 0.2, previous: 0.1, unit: '%', timestamp: NOW, frequency: 'quarterly', period: '2024-Q4' },
    { country: 'IT', indicator_name: 'Public Debt to GDP', value: 137.3, previous: 137.0, unit: '%', timestamp: NOW, frequency: 'quarterly', period: '2024-Q3' },
  ],
  macro_es: [
    { country: 'ES', indicator_name: 'GDP Growth Rate', value: 0.6, previous: 0.4, unit: '%', timestamp: NOW, frequency: 'quarterly', period: '2024-Q4' },
    { country: 'ES', indicator_name: 'Unemployment Rate', value: 11.2, previous: 11.4, unit: '%', timestamp: NOW, frequency: 'monthly', period: '2024-12' },
  ],
  macro_ca: [
    { country: 'CA', indicator_name: 'GDP Growth Rate', value: 1.2, previous: 1.1, unit: '%', timestamp: NOW, frequency: 'quarterly', period: '2024-Q4' },
    { country: 'CA', indicator_name: 'Inflation Rate CPI', value: 2.6, previous: 2.8, unit: '%', timestamp: NOW, frequency: 'monthly', period: '2024-12' },
    { country: 'CA', indicator_name: 'BoC Rate', value: 5.0, previous: 5.0, unit: '%', timestamp: NOW, frequency: 'daily', source: 'Bank of Canada' },
  ],
  macro_au: [
    { country: 'AU', indicator_name: 'GDP Growth Rate', value: 0.6, previous: 0.4, unit: '%', timestamp: NOW, frequency: 'quarterly', period: '2024-Q4' },
    { country: 'AU', indicator_name: 'Inflation Rate CPI', value: 2.8, previous: 3.0, unit: '%', timestamp: NOW, frequency: 'quarterly', period: '2024-Q4' },
    { country: 'AU', indicator_name: 'RBA Rate', value: 4.35, previous: 4.35, unit: '%', timestamp: NOW, frequency: 'daily', source: 'RBA' },
  ],
  macro_br: [
    { country: 'BR', indicator_name: 'GDP Growth Rate', value: 2.1, previous: 1.9, unit: '%', timestamp: NOW, frequency: 'quarterly', period: '2024-Q4' },
    { country: 'BR', indicator_name: 'Inflation Rate IPCA', value: 5.0, previous: 5.5, unit: '%', timestamp: NOW, frequency: 'monthly', period: '2024-12' },
    { country: 'BR', indicator_name: 'Selic Rate', value: 13.25, previous: 13.0, unit: '%', timestamp: NOW, frequency: 'daily', source: 'BCB' },
  ],
  macro_in: [
    { country: 'IN', indicator_name: 'GDP Growth Rate', value: 7.2, previous: 6.7, unit: '%', timestamp: NOW, frequency: 'quarterly', period: '2024-Q4' },
    { country: 'IN', indicator_name: 'Inflation Rate CPI', value: 5.1, previous: 5.5, unit: '%', timestamp: NOW, frequency: 'monthly', period: '2024-12' },
    { country: 'IN', indicator_name: 'Repo Rate', value: 6.5, previous: 6.5, unit: '%', timestamp: NOW, frequency: 'daily', source: 'RBI' },
  ],
  market_headlines: [
    {
      title: 'Federal Reserve Signals Patience on Rate Cuts Amid Strong Economic Data',
      summary: 'Fed officials emphasized they are in no rush to cut interest rates, citing robust labor market and persistent inflation pressures.',
      timestamp: NOW,
      url: 'https://www.reuters.com/markets/us/fed-signals-patience-rate-cuts-2025-02-07/',
      source: 'Reuters',
      category: 'Central Banks',
      sentiment: 'neutral',
    },
    {
      title: 'Tech Rally Extends as AI Demand Surges',
      summary: 'Semiconductor and AI-related stocks continue their upward momentum driven by strong earnings and optimistic guidance.',
      timestamp: NOW,
      url: 'https://www.bloomberg.com/news/articles/2025-02-07/tech-rally-ai-demand',
      source: 'Bloomberg',
      category: 'Technology',
      sentiment: 'bullish',
    },
    {
      title: 'China Manufacturing Shows Signs of Recovery',
      summary: 'Caixin manufacturing PMI beats expectations, suggesting the Chinese economy may be bottoming out.',
      timestamp: NOW,
      url: 'https://www.ft.com/content/china-manufacturing-recovery',
      source: 'Financial Times',
      category: 'Global Economy',
      sentiment: 'positive',
    },
    {
      title: 'Oil Prices Slide on Demand Concerns',
      summary: 'Crude oil falls as concerns about global demand outweigh geopolitical tensions.',
      timestamp: NOW,
      url: 'https://www.wsj.com/articles/oil-prices-demand-concerns',
      source: 'Wall Street Journal',
      category: 'Commodities',
      sentiment: 'negative',
    },
  ],
  earnings_announcements: [
    {
      title: 'Apple Earnings Preview: Services Revenue in Focus',
      summary: 'Analysts expect strong services growth to offset modest iPhone sales ahead of quarterly report.',
      timestamp: NOW,
      url: 'https://www.cnbc.com/2025/02/07/apple-earnings-preview.html',
      source: 'CNBC',
      category: 'Earnings',
      sentiment: 'neutral',
    },
    {
      title: 'NVIDIA Sets Record Dates for Q4 Earnings',
      summary: 'NVIDIA will report Q4 results on February 26, with analyst consensus pointing to another beat.',
      timestamp: NOW,
      url: 'https://www.marketwatch.com/nvidia-earnings-dates',
      source: 'MarketWatch',
      category: 'Earnings',
      sentiment: 'bullish',
    },
    {
      title: 'Tesla Earnings Miss Marks Third Consecutive Quarter of Disappointment',
      summary: 'Electric vehicle maker reports weaker-than-expected margins amid price cuts and demand uncertainty.',
      timestamp: NOW,
      url: 'https://www.reuters.com/tesla-earnings-miss',
      source: 'Reuters',
      category: 'Earnings',
      sentiment: 'negative',
    },
  ],
  dividend_news: [
    {
      title: 'Johnson & Johnson Increases Dividend for 62nd Consecutive Year',
      summary: 'Healthcare giant raises quarterly dividend by 5.4%, maintaining its status as a Dividend King.',
      timestamp: NOW,
      url: 'https://www.businesswire.com/news/home/20250207005001/',
      source: 'Business Wire',
      category: 'Dividends',
      sentiment: 'positive',
    },
    {
      title: '3M to Spin Off Healthcare Unit, Maintain Dividend',
      summary: 'Industrial conglomerate announces plan to separate healthcare division while preserving shareholder returns.',
      timestamp: NOW,
      url: 'https://www.prnewswire.com/news/3m-dividend-2025',
      source: 'PR Newswire',
      category: 'Dividends',
      sentiment: 'neutral',
    },
    {
      title: 'REITs Face Dividend Pressure as Rates Stay Elevated',
      summary: 'Real estate investment trusts adjust payouts as high borrowing costs compress margins.',
      timestamp: NOW,
      url: 'https://www.barrons.com/reits-dividend-pressure',
      source: 'Barrons',
      category: 'Dividends',
      sentiment: 'negative',
    },
  ],
  metadata: {
    generated_at: NOW,
    source: 'mock-data',
    version: '1.0.0',
  },
  errors: [],
};

/**
 * Returns mock scraper data for development without Blob credentials.
 */
export function getMockScraperData(): ScraperData {
  return mockScraperData;
}
