import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Trophy } from "lucide-react"

interface StatisticsCardsProps {
  totalSantri: number
  weeklyTopPerformer: {
    nama_lengkap_santri: string
    totalPoints: number
  } | null
}

export default function StatisticsCards({ totalSantri, weeklyTopPerformer }: StatisticsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Santri</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-emerald-600">{totalSantri}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Top Performer (Mingguan)</CardTitle>
          <Trophy className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-sm font-bold text-green-600">
            {weeklyTopPerformer
              ? `${weeklyTopPerformer.nama_lengkap_santri} (${weeklyTopPerformer.totalPoints})`
              : "N/A"}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
