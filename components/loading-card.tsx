"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface LoadingCardProps {
  title?: string
}

function LoadingCard({ title = "Loading..." }: LoadingCardProps) {
  return (
    <Card className="animate-pulse">
      <CardContent className="p-3 sm:p-4">
        <div className="flex items-center justify-between gap-2 mb-2 sm:mb-3">
          <Skeleton className="h-3 sm:h-4 w-20 sm:w-24" />
          <Skeleton className="h-5 sm:h-6 w-14 sm:w-16 rounded-full" />
        </div>

        <div className="mb-2 sm:mb-3">
          <Skeleton className="h-6 sm:h-8 w-16 sm:w-20 mb-1 sm:mb-2" />
          <Skeleton className="h-2.5 sm:h-3 w-20 sm:w-28" />
        </div>

        <div className="mb-2 sm:mb-3">
          <Skeleton className="h-6 sm:h-8 w-20 sm:w-28 rounded" />
        </div>

        <Skeleton className="h-2.5 sm:h-3 w-16 sm:w-20" />
      </CardContent>
    </Card>
  )
}

export { LoadingCard }
