import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://macropulse.app"),
  title: {
    default: "Macro Pulse — US Economy + Global Markets",
    template: "%s | Macro Pulse",
  },
  description: "Daily economic indicators from FRED + Trading Economics. Track US CPI, GDP, unemployment, global macro data, and market news.",
  keywords: ["economics", "GDP", "CPI", "unemployment", "federal reserve", "treasury yields", "FRED", "global markets", "macro", "trading economics"],
  authors: [{ name: "Macro Pulse" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://macropulse.app",
    siteName: "Macro Pulse",
    title: "Macro Pulse — US Economy + Global Markets",
    description: "Daily economic indicators from FRED + Trading Economics",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Macro Pulse Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Macro Pulse — US Economy + Global Markets",
    description: "Daily economic indicators from FRED + Trading Economics",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background`}>
        {children}
      </body>
    </html>
  )
}
