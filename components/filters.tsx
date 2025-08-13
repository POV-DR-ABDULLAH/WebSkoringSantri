"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search, Filter } from "lucide-react"

interface FiltersProps {
  searchTerm: string
  setSearchTerm: (value: string) => void
  selectedDate: string
  setSelectedDate: (value: string) => void
  viewType: string
  setViewType: (value: string) => void
  setSortBy: (value: string) => void
  latestDate: string
  onReset: () => void
}

export default function Filters({
  searchTerm,
  setSearchTerm,
  selectedDate,
  setSelectedDate,
  viewType,
  setViewType,
  setSortBy,
  latestDate,
  onReset,
}: FiltersProps) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filter & Pencarian
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Cari nama santri..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={selectedDate} onValueChange={setSelectedDate}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih tanggal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua</SelectItem>
              <SelectItem value="latest">Tanggal Terbaru ({latestDate})</SelectItem>
            </SelectContent>
          </Select>

          <Select value={viewType} onValueChange={setViewType}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih tampilan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Tanggal Terbaru</SelectItem>
              <SelectItem value="weekly">Semua Satu Minggu</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" onClick={onReset}>
            Reset Filter
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
