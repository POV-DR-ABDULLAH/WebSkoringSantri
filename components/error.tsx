"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ErrorProps {
  error: string
  onRetry: () => void
}

export default function Error({ error, onRetry }: ErrorProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center">
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle className="text-red-600">Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={onRetry} className="w-full">
            Coba Lagi
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
