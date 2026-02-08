"use client"

import Link from "next/link"
import { ExternalLink, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export interface NewsArticle {
  id: string
  title: string
  summary: string
  source: string
  url: string
  publishedAt: string
  category?: string
}

interface NewsCardProps {
  article: NewsArticle
  className?: string
}

export function NewsCard({ article, className }: NewsCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all duration-200",
        "hover:shadow-md hover:border-primary/30",
        className
      )}
    >
      <CardContent className="p-4 space-y-2">
        {/* Header: Category and source */}
        <div className="flex items-center justify-between gap-2">
          {article.category && (
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
              {article.category}
            </span>
          )}
          <span className="text-xs text-muted-foreground">{article.source}</span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-sm leading-snug group-hover:text-primary transition-colors">
          {article.title}
        </h3>

        {/* Summary */}
        <p className="text-xs text-muted-foreground line-clamp-2">
          {article.summary}
        </p>

        {/* Footer: Timestamp and external link */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>{formatDate(article.publishedAt)}</span>
          </div>

          <Link
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
          >
            Read more
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export type { NewsCardProps }
