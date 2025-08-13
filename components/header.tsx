"use client"

import { Button } from "@/components/ui/button"
import { Clock } from "lucide-react"

interface HeaderProps {
  onRefresh: () => void
}

export default function Header({ onRefresh }: HeaderProps) {
  return (
    <div className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Skoring Santri Pondok Informatika</h1>
            <p className="text-gray-600 mt-1">Sistem Monitoring Aktivitas Sholat Pondok Informatika</p>
          </div>
          <Button onClick={onRefresh} variant="outline" className="flex items-center gap-2 bg-transparent">
            <Clock className="h-4 w-4" />
            Refresh Data
          </Button>
        </div>
      </div>
    </div>
  )
}
