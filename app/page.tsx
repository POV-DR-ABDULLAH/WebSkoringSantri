"use client"

import { useState, useEffect } from "react"
import type { SantriData, ApiResponse, WeeklyData } from "@/types/santri"
import { getWeekRange, getCurrentWeekRange, calculateWeeklyPoints } from "@/lib/santri-utils"
import Header from "@/components/header"
import StatisticsCards from "@/components/statistics-cards"
import WeeklySummary from "@/components/weekly-summary"
import Filters from "@/components/filters"
import DataDisplay from "@/components/data-display"
import Footer from "@/components/footer"
import Loading from "@/components/loading"
import Error from "@/components/error"

export default function SantriDashboard() {
  const [data, setData] = useState<SantriData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [viewType, setViewType] = useState("daily") // "daily" or "weekly"
  const [sortBy, setSortBy] = useState("tanggal")
  const [currentWeekRange, setCurrentWeekRange] = useState({ start: "", end: "" })

  useEffect(() => {
    fetchData()
    setCurrentWeekRange(getCurrentWeekRange())
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await fetch("https://santri.pondokinformatika.id/api/skoring")

      if (!response.ok) {
        throw new Error("Failed to fetch data")
      }

      const result: ApiResponse = await response.json()
      setData(result.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setSearchTerm("")
    setSelectedDate("")
    setViewType("daily")
    setSortBy("tanggal")
  }

  // Get unique dates for filter - sorted with most recent first
  const uniqueDates = [...new Set(data.map((item) => item.tanggal))].sort().reverse()
  const latestDate = uniqueDates[0] || ""

  const getWeeklyAggregatedData = (): WeeklyData[] => {
    const weeklyMap = new Map<string, WeeklyData>()

    data.forEach((item) => {
      const weekRange = getWeekRange(item.tanggal)
      const weekKey = `${item.id_santri}_${weekRange.start}_${weekRange.end}`

      if (!weeklyMap.has(weekKey)) {
        weeklyMap.set(weekKey, {
          id_santri: item.id_santri,
          nama_lengkap_santri: item.nama_lengkap_santri,
          weekRange,
          totalPoints: 0,
          days: [],
        })
      }

      const weekData = weeklyMap.get(weekKey)!
      weekData.totalPoints += Number.parseInt(item.total_poin_harian)
      weekData.days.push(item)
    })

    return Array.from(weeklyMap.values())
  }

  // Filter and sort data
  const filteredData = data
    .filter((item) => {
      const matchesSearch = item.nama_lengkap_santri.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesDate =
        selectedDate === "" ||
        selectedDate === "all" ||
        (selectedDate === "latest" && item.tanggal === latestDate) ||
        item.tanggal === selectedDate
      return matchesSearch && matchesDate
    })
    .reduce((acc, item) => {
      if (selectedDate === "latest") {
        if (searchTerm.trim() === "") {
          // No search term: show only one entry per santri (latest date)
          const existingIndex = acc.findIndex((existing) => existing.id_santri === item.id_santri)
          if (existingIndex === -1) {
            acc.push(item)
          } else {
            // Keep the one with the latest date
            if (item.tanggal > acc[existingIndex].tanggal) {
              acc[existingIndex] = item
            }
          }
        } else {
          // Has search term: show all entries for searched person within current week
          const weekRange = getCurrentWeekRange()
          const itemDate = new Date(item.tanggal)
          const startDate = new Date(weekRange.start)
          const endDate = new Date(weekRange.end)

          if (itemDate >= startDate && itemDate <= endDate) {
            acc.push(item)
          }
        }
      } else {
        acc.push(item)
      }
      return acc
    }, [] as SantriData[])
    .sort((a, b) => {
      if (sortBy === "tanggal") {
        // Sort by date descending, then by name ascending
        const dateCompare = b.tanggal.localeCompare(a.tanggal)
        if (dateCompare !== 0) return dateCompare
        return a.nama_lengkap_santri.localeCompare(b.nama_lengkap_santri)
      }
      if (sortBy === "nama_lengkap_santri") {
        return a.nama_lengkap_santri.localeCompare(b.nama_lengkap_santri)
      }
      // For other sorting, sort by that field then by name
      const fieldCompare =
        Number.parseInt(b[sortBy as keyof SantriData] as string) -
        Number.parseInt(a[sortBy as keyof SantriData] as string)
      if (fieldCompare !== 0) return fieldCompare
      return a.nama_lengkap_santri.localeCompare(b.nama_lengkap_santri)
    })

  const filteredWeeklyData = getWeeklyAggregatedData()
    .filter((item) => {
      const matchesSearch = item.nama_lengkap_santri.toLowerCase().includes(searchTerm.toLowerCase())
      // Only show data from current week (Friday to Thursday)
      const isCurrentWeek =
        item.weekRange.start === currentWeekRange.start && item.weekRange.end === currentWeekRange.end
      return matchesSearch && isCurrentWeek
    })
    .sort((a, b) => a.nama_lengkap_santri.localeCompare(b.nama_lengkap_santri))

  // Calculate statistics
  const totalSantri = new Set(data.map((item) => item.id_santri)).size
  const weeklyPointsData = calculateWeeklyPoints(data)

  const weeklyTopPerformer = (() => {
    if (filteredWeeklyData.length === 0) return null

    let topPerformer = null
    let maxPoints = 0

    // Get the highest weekly points from current week only
    filteredWeeklyData.forEach((weekData) => {
      if (weekData.totalPoints > maxPoints) {
        maxPoints = weekData.totalPoints
        topPerformer = {
          nama_lengkap_santri: weekData.nama_lengkap_santri,
          totalPoints: weekData.totalPoints,
        }
      }
    })

    return topPerformer
  })()

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error error={error} onRetry={fetchData} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100">
      <Header onRefresh={fetchData} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StatisticsCards totalSantri={totalSantri} weeklyTopPerformer={weeklyTopPerformer} />

        <WeeklySummary weeklyPointsData={weeklyPointsData} />

        <Filters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          viewType={viewType}
          setViewType={setViewType}
          setSortBy={setSortBy}
          latestDate={latestDate}
          onReset={handleReset}
        />

        <DataDisplay viewType={viewType} filteredData={filteredData} filteredWeeklyData={filteredWeeklyData} />
      </div>

      <Footer />
    </div>
  )
}
