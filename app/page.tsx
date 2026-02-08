import { Suspense } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { IndicatorGrid } from "@/components/indicator-grid"
import { YieldCurveSection } from "@/components/yield-curve-section"
import { LoadingCard } from "@/components/loading-card"
import { SectionHeader } from "@/components/section-header"
import { MarketTable, type MarketInstrument } from "@/components/market-table"
import { MacroWorldGrid } from "@/components/macro-world-grid"
import { NewsFeed } from "@/components/news-feed"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getAllIndicators, getYieldCurve, getMockData } from "@/lib/data"
import { getScraperData } from "@/lib/scraper-data"
import type { ScraperData, NewsArticle } from "@/lib/scraper-types"

// ISR: Revalidate every 24 hours
export const revalidate = 86400

// Static generation with ISR
export const dynamicParams = true

async function DashboardContent() {
  let indicators
  let yieldCurve
  let scraperData: ScraperData | null = null
  let error: Error | null = null

  try {
    const hasApiKey = !!process.env.FRED_API_KEY && process.env.FRED_API_KEY !== "your_fred_api_key_here"

    // Fetch FRED data and scraper data in parallel
    const [indicatorsResult, yieldCurveResult, scraperResult] = await Promise.all([
      hasApiKey ? getAllIndicators() : Promise.resolve(null),
      hasApiKey ? getYieldCurve() : Promise.resolve(null),
      getScraperData(),
    ])

    indicators = indicatorsResult
    yieldCurve = yieldCurveResult
    scraperData = scraperResult

    // Fall back to mock data if FRED fetch failed
    if (!indicators || !yieldCurve) {
      const mockData = getMockData()
      indicators = indicators || mockData.indicators
      yieldCurve = yieldCurve || mockData.yieldCurve
    }
  } catch (e) {
    error = e instanceof Error ? e : new Error("Failed to fetch data")
    const mockData = getMockData()
    indicators = mockData.indicators
    yieldCurve = mockData.yieldCurve
  }

  // Get last updated timestamp from scraper data or current time
  const lastUpdated = scraperData?.metadata?.timestamp
    ? new Date(scraperData.metadata.timestamp as string).toISOString()
    : new Date().toISOString()

  // Transform scraper market data for MarketTable
  const marketData: MarketInstrument[] = scraperData
    ? [
        ...(scraperData.indices || []),
        ...(scraperData.stocks || []),
        ...(scraperData.crypto || []),
      ]
        .slice(0, 12)
        .map((item) => ({
          symbol: item.symbol,
          name: item.name,
          price: item.value,
          change: item.change || 0,
          changePercent: item.pct_change || 0,
        }))
    : []

  // Transform scraper news data for NewsFeed
  const newsArticles: NewsArticle[] = scraperData
    ? [
        ...scraperData.market_headlines.map((a) => ({ ...a, id: a.url })),
        ...scraperData.earnings_announcements.map((a) => ({ ...a, id: a.url })),
        ...scraperData.dividend_news.map((a) => ({ ...a, id: a.url })),
      ]
    : []

  // Mock news if no scraper data
  const mockNews: NewsArticle[] = [
    {
      id: "1",
      title: "Fed Signals Potential Rate Cut Amid Cooling Inflation",
      summary: "Federal Reserve officials indicated they're considering lowering interest rates as recent data shows inflation continuing to moderate.",
      source: "Bloomberg",
      url: "https://example.com/1",
      publishedAt: new Date(Date.now - 2 * 60 * 60 * 1000).toISOString(),
      category: "Market Headlines",
    },
    {
      id: "2",
      title: "Apple Reports Record Q1 Services Revenue",
      summary: "Apple Inc. announced quarterly earnings that exceeded analyst expectations, driven by strong growth in services and wearables.",
      source: "CNBC",
      url: "https://example.com/2",
      publishedAt: new Date(Date.now - 5 * 60 * 60 * 1000).toISOString(),
      category: "Earnings",
    },
    {
      id: "3",
      title: "Schwabit Announces Special Dividend",
      summary: "Charles Schwab Corp. declared a special dividend for shareholders as the company reports strong quarterly results.",
      source: "Reuters",
      url: "https://example.com/3",
      publishedAt: new Date(Date.now - 8 * 60 * 60 * 1000).toISOString(),
      category: "Dividends",
    },
    {
      id: "4",
      title: "Tech Stocks Rally on AI Optimism",
      summary: "Major technology companies saw significant gains as investors bet on artificial intelligence growth opportunities.",
      source: "WSJ",
      url: "https://example.com/4",
      publishedAt: new Date(Date.now - 12 * 60 * 60 * 1000).toISOString(),
      category: "Market Headlines",
    },
  ]

  const finalNews = newsArticles.length > 0 ? newsArticles : mockNews

  return (
    <main className="min-h-screen bg-background">
      <DashboardHeader lastUpdated={lastUpdated} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-7xl">
        {error && (
          <div className="mb-6 p-3 sm:p-4 rounded-lg border border-yellow-500/50 bg-yellow-500/10">
            <p className="text-xs sm:text-sm text-yellow-500">
              ⚠️ Unable to fetch live data: {error.message}. Showing cached/mock data.
            </p>
          </div>
        )}

        {/* Section 1: US Indicators */}
        <SectionHeader
          title="US Economic Indicators"
          description="Key metrics from the Federal Reserve"
          defaultOpen={true}
          className="mb-6"
        >
          <IndicatorGrid indicators={indicators} />
        </SectionHeader>

        {/* Section 2: Yield Curve */}
        <SectionHeader
          title="US Treasury Yield Curve"
          description="Government bond yields across maturities"
          defaultOpen={true}
          className="mb-6"
        >
          <YieldCurveSection data={yieldCurve} />
        </SectionHeader>

        {/* Section 3: Markets (6 panels) */}
        <SectionHeader
          title="Global Markets"
          description="Equities, forex, commodities and crypto"
          defaultOpen={true}
          className="mb-6"
        >
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Major Indices</CardTitle>
              </CardHeader>
              <CardContent>
                <MarketTable
                  instruments={
                    marketData.length > 0
                      ? marketData.filter((m) =>
                          ["SPY", "QQQ", "DIA", "IWM", "^GSPC", "^DJI"].includes(m.symbol)
                        )
                      : [
                          { symbol: "SPY", name: "SPDR S&P 500 ETF", price: 512.34, change: 2.15, changePercent: 0.42 },
                          { symbol: "QQQ", name: "Invesco QQQ Trust", price: 445.67, change: -1.23, changePercent: -0.28 },
                          { symbol: "^GSPC", name: "S&P 500 Index", price: 5132.45, change: 18.92, changePercent: 0.37 },
                        ]
                  }
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Crypto</CardTitle>
              </CardHeader>
              <CardContent>
                <MarketTable
                  instruments={
                    marketData.length > 0
                      ? marketData.filter((m) =>
                          ["BTC", "ETH", "SOL", "XRP", "ADA"].includes(m.symbol)
                        )
                      : [
                          { symbol: "BTC", name: "Bitcoin", price: 68543.21, change: 1234.56, changePercent: 1.83 },
                          { symbol: "ETH", name: "Ethereum", price: 3456.78, change: -45.67, changePercent: -1.30 },
                          { symbol: "SOL", name: "Solana", price: 145.32, change: 8.91, changePercent: 6.53 },
                        ]
                  }
                />
              </CardContent>
            </Card>
          </div>
        </SectionHeader>

        {/* Section 4: Global Macro (13 countries) */}
        <SectionHeader
          title="Global Macro Overview"
          description="GDP, inflation and unemployment across major economies"
          defaultOpen={true}
          className="mb-6"
        >
          <MacroWorldGrid />
        </SectionHeader>

        {/* Section 5: News (3 categories) */}
        <SectionHeader
          title="Market News"
          description="Latest headlines, earnings and dividend announcements"
          defaultOpen={true}
          className="mb-6"
        >
          <NewsFeed articles={finalNews} />
        </SectionHeader>
      </div>

      <footer className="border-t py-6 sm:py-8 mt-10 sm:mt-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center text-xs sm:text-sm text-muted-foreground">
          <p>Data provided by Federal Reserve Economic Data (FRED) and market sources</p>
          <p className="mt-1">Next update in 24 hours</p>
        </div>
      </footer>
    </main>
  )
}

function LoadingSkeleton() {
  return (
    <main className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-7xl">
        <section className="mb-6">
          <h2 className="text-base sm:text-lg font-semibold mb-4">Loading...</h2>
        </section>
      </div>
    </main>
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <DashboardContent />
    </Suspense>
  )
}
