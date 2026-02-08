"use client"

import { MacroCountryCard, type CountryData, type Indicator } from "@/components/macro-country-card"

const countries: CountryData[] = [
  {
    code: "US",
    name: "United States",
    flag: "🇺🇸",
    indicators: {
      gdp: { label: "GDP Growth", value: 3.1, unit: "%", change: 0.5, trend: "up" },
      cpi: { label: "CPI", value: 3.4, unit: "%", change: -0.1, trend: "down" },
      unemployment: { label: "Unemployment", value: 3.7, unit: "%", change: 0.0, trend: "flat" },
    },
  },
  {
    code: "EU",
    name: "European Union",
    flag: "🇪🇺",
    indicators: {
      gdp: { label: "GDP Growth", value: 0.6, unit: "%", change: 0.2, trend: "up" },
      cpi: { label: "CPI", value: 2.6, unit: "%", change: -0.3, trend: "down" },
      unemployment: { label: "Unemployment", value: 6.5, unit: "%", change: -0.1, trend: "down" },
    },
  },
  {
    code: "GB",
    name: "United Kingdom",
    flag: "🇬🇧",
    indicators: {
      gdp: { label: "GDP Growth", value: 0.3, unit: "%", change: 0.1, trend: "up" },
      cpi: { label: "CPI", value: 3.9, unit: "%", change: -0.5, trend: "down" },
      unemployment: { label: "Unemployment", value: 4.2, unit: "%", change: 0.1, trend: "up" },
    },
  },
  {
    code: "JP",
    name: "Japan",
    flag: "🇯🇵",
    indicators: {
      gdp: { label: "GDP Growth", value: 1.2, unit: "%", change: -0.3, trend: "down" },
      cpi: { label: "CPI", value: 2.8, unit: "%", change: 0.1, trend: "up" },
      unemployment: { label: "Unemployment", value: 2.6, unit: "%", change: -0.1, trend: "down" },
    },
  },
  {
    code: "CN",
    name: "China",
    flag: "🇨🇳",
    indicators: {
      gdp: { label: "GDP Growth", value: 5.2, unit: "%", change: 0.3, trend: "up" },
      cpi: { label: "CPI", value: 0.8, unit: "%", change: -0.4, trend: "down" },
      unemployment: { label: "Youth Unemployment", value: 14.9, unit: "%", change: 0.5, trend: "up" },
    },
  },
  {
    code: "DE",
    name: "Germany",
    flag: "🇩🇪",
    indicators: {
      gdp: { label: "GDP Growth", value: -0.3, unit: "%", change: -0.2, trend: "down" },
      cpi: { label: "CPI", value: 2.9, unit: "%", change: -0.2, trend: "down" },
      unemployment: { label: "Unemployment", value: 5.9, unit: "%", change: 0.1, trend: "up" },
    },
  },
  {
    code: "FR",
    name: "France",
    flag: "🇫🇷",
    indicators: {
      gdp: { label: "GDP Growth", value: 1.1, unit: "%", change: 0.4, trend: "up" },
      cpi: { label: "CPI", value: 3.2, unit: "%", change: -0.1, trend: "down" },
      unemployment: { label: "Unemployment", value: 7.5, unit: "%", change: -0.2, trend: "down" },
    },
  },
  {
    code: "CA",
    name: "Canada",
    flag: "🇨🇦",
    indicators: {
      gdp: { label: "GDP Growth", value: 1.0, unit: "%", change: 0.2, trend: "up" },
      cpi: { label: "CPI", value: 2.8, unit: "%", change: -0.3, trend: "down" },
      unemployment: { label: "Unemployment", value: 5.7, unit: "%", change: 0.0, trend: "flat" },
    },
  },
  {
    code: "AU",
    name: "Australia",
    flag: "🇦🇺",
    indicators: {
      gdp: { label: "GDP Growth", value: 2.1, unit: "%", change: 0.1, trend: "up" },
      cpi: { label: "CPI", value: 4.1, unit: "%", change: -0.2, trend: "down" },
      unemployment: { label: "Unemployment", value: 3.9, unit: "%", change: -0.1, trend: "down" },
    },
  },
  {
    code: "BR",
    name: "Brazil",
    flag: "🇧🇷",
    indicators: {
      gdp: { label: "GDP Growth", value: 2.9, unit: "%", change: 0.5, trend: "up" },
      cpi: { label: "CPI", value: 3.9, unit: "%", change: -0.4, trend: "down" },
      unemployment: { label: "Unemployment", value: 7.9, unit: "%", change: -0.3, trend: "down" },
    },
  },
  {
    code: "IN",
    name: "India",
    flag: "🇮🇳",
    indicators: {
      gdp: { label: "GDP Growth", value: 7.8, unit: "%", change: 0.6, trend: "up" },
      cpi: { label: "CPI", value: 5.1, unit: "%", change: -0.2, trend: "down" },
      unemployment: { label: "Unemployment", value: 4.0, unit: "%", change: 0.1, trend: "up" },
    },
  },
  {
    code: "MX",
    name: "Mexico",
    flag: "🇲🇽",
    indicators: {
      gdp: { label: "GDP Growth", value: 2.4, unit: "%", change: 0.3, trend: "up" },
      cpi: { label: "CPI", value: 4.5, unit: "%", change: -0.1, trend: "down" },
      unemployment: { label: "Unemployment", value: 2.7, unit: "%", change: 0.0, trend: "flat" },
    },
  },
  {
    code: "KR",
    name: "South Korea",
    flag: "🇰🇷",
    indicators: {
      gdp: { label: "GDP Growth", value: 2.2, unit: "%", change: 0.1, trend: "up" },
      cpi: { label: "CPI", value: 3.0, unit: "%", change: -0.2, trend: "down" },
      unemployment: { label: "Unemployment", value: 3.0, unit: "%", change: 0.0, trend: "flat" },
    },
  },
]

interface MacroWorldGridProps {
  className?: string
}

export function MacroWorldGrid({ className }: MacroWorldGridProps) {
  return (
    <div className={`grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 ${className}`}>
      {countries.map((country) => (
        <MacroCountryCard key={country.code} country={country} />
      ))}
    </div>
  )
}

// Re-export types for convenience
export type { CountryData, Indicator }
