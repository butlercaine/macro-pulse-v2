import { notFound } from "next/navigation"
import { getIndicatorBySlug, INDICATOR_SLUGS } from "@/lib/indicators"
import { getIndicator, getIndicatorTrendHistory, getMockData, getMockTrendHistory } from "@/lib/data"
import { IndicatorDetail } from "@/components/indicator-detail"

// ISR: Revalidate every 24 hours
export const revalidate = 86400

// Generate static params for all indicator slugs
export async function generateStaticParams() {
  return INDICATOR_SLUGS.map((slug) => ({
    slug,
  }))
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const config = getIndicatorBySlug(slug)
  
  if (!config) {
    return {
      title: "Indicator Not Found",
    }
  }
  
  return {
    title: `${config.name} | Macro Pulse`,
    description: config.description,
  }
}

export default async function IndicatorPage({ params }: PageProps) {
  const { slug } = await params
  const config = getIndicatorBySlug(slug)
  
  if (!config) {
    notFound()
  }

  // Fetch indicator data and trend history
  let indicator = await getIndicator(config.id)
  let trendData = await getIndicatorTrendHistory(config.id, "1Y")

  // Fall back to mock data if no API key
  const hasApiKey = !!process.env.FRED_API_KEY && process.env.FRED_API_KEY !== "your_fred_api_key_here"
  
  if (!hasApiKey || !indicator) {
    const mockData = getMockData()
    const mockIndicator = mockData.indicators.find((i) => i.id === config.id)
    
    if (mockIndicator) {
      indicator = mockIndicator
      trendData = getMockTrendHistory("1Y")
    }
  }

  if (!indicator) {
    notFound()
  }

  return (
    <IndicatorDetail
      indicator={indicator}
      trendData={trendData}
      color={config.color || "#3b82f6"}
    />
  )
}
