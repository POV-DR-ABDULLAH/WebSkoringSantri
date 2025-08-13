import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays } from "lucide-react"
import { getPointsColor } from "@/lib/santri-utils"

interface WeeklySummaryProps {
  weeklyPointsData: Map<any, any>
}

export default function WeeklySummary({ weeklyPointsData }: WeeklySummaryProps) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarDays className="h-5 w-5" />
          Ringkasan Poin Mingguan (Jumat - Kamis)
        </CardTitle>
        <CardDescription>
          Menampilkan total poin santri dalam satu minggu (dari hari Jumat sampai Kamis)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 max-h-96 overflow-y-auto">
          {Array.from(weeklyPointsData.entries()).map(([santriId, weeks]) => {
            const latestWeek = Array.from(weeks.values()).sort((a, b) =>
              b.weekRange.start.localeCompare(a.weekRange.start),
            )[0]

            return (
              <div key={santriId} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium">{latestWeek.nama}</div>
                  <div className="text-sm text-gray-600">
                    {latestWeek.weekRange.start} s/d {latestWeek.weekRange.end}
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold ${getPointsColor(latestWeek.totalPoints)}`}>
                    {latestWeek.totalPoints} Poin
                  </div>
                  <div className="text-sm text-gray-500">{latestWeek.days.length} hari</div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
