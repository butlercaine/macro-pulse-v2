"use client"

import * as React from "react"
import { NewsCard, type NewsArticle } from "@/components/news-card"
import { cn } from "@/lib/utils"

export type NewsCategory = "All" | "Market Headlines" | "Earnings" | "Dividends"

interface NewsFeedProps {
  articles: NewsArticle[]
  className?: string
}

const categories: NewsCategory[] = ["All", "Market Headlines", "Earnings", "Dividends"]

export function NewsFeed({ articles, className }: NewsFeedProps) {
  const [activeCategory, setActiveCategory] = React.useState<NewsCategory>("All")

  const filteredArticles = React.useMemo(() => {
    if (activeCategory === "All") {
      return articles
    }
    return articles.filter((article) => article.category === activeCategory)
  }, [articles, activeCategory])

  const hasArticles = filteredArticles.length > 0

  return (
    <div className={cn("space-y-4", className)}>
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={cn(
              "px-3 py-1.5 text-sm font-medium rounded-full transition-colors",
              "border",
              activeCategory === category
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background text-muted-foreground border-border hover:bg-secondary"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Articles Grid or Empty State */}
      {hasArticles ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-sm text-muted-foreground">
            No articles found in the "{activeCategory}" category.
          </p>
          <button
            onClick={() => setActiveCategory("All")}
            className="mt-2 text-sm font-medium text-primary hover:underline"
          >
            View all articles
          </button>
        </div>
      )}
    </div>
  )
}

export type { NewsFeedProps }
