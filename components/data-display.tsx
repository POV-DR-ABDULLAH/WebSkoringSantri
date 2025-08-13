import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { SantriData, WeeklyData } from "@/types/santri"
import { getPrayerStatus, getPointsColor } from "@/lib/santri-utils"

interface DataDisplayProps {
  viewType: string
  filteredData: SantriData[]
  filteredWeeklyData: WeeklyData[]
}

export default function DataDisplay({ viewType, filteredData, filteredWeeklyData }: DataDisplayProps) {
  if (
    (viewType === "daily" && filteredData.length === 0) ||
    (viewType === "weekly" && filteredWeeklyData.length === 0)
  ) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <p className="text-gray-500">Tidak ada data yang sesuai dengan filter yang dipilih.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-4">
      {viewType === "daily"
        ? // Daily View
          filteredData.map((santri, index) => (
            <Card key={`${santri.id_santri}-${santri.tanggal}`} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{santri.nama_lengkap_santri}</CardTitle>
                    <CardDescription>
                      ID: {santri.id_santri} • Tanggal: {santri.tanggal}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${getPointsColor(Number.parseInt(santri.total_poin_harian))}`}>
                      {santri.total_poin_harian} Poin
                    </div>
                    <div className="text-sm text-gray-500">Total Harian</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {/* Shubuh */}
                  <div className="text-center">
                    <div className="font-medium text-sm mb-2">Shubuh</div>
                    <Badge
                      className={`${getPrayerStatus(santri.waktu_shubuh, santri.poin_shubuh).color} text-white mb-1`}
                    >
                      {getPrayerStatus(santri.waktu_shubuh, santri.poin_shubuh).status}
                    </Badge>
                    <div className="text-xs text-gray-600">{santri.waktu_shubuh || "Tidak hadir"}</div>
                    <div className="font-bold text-sm">{santri.poin_shubuh} poin</div>
                  </div>

                  {/* Produktif */}
                  <div className="text-center">
                    <div className="font-medium text-sm mb-2">Produktif</div>
                    <Badge
                      className={`${getPrayerStatus(santri.waktu_produktif, santri.poin_produktif).color} text-white mb-1`}
                    >
                      {getPrayerStatus(santri.waktu_produktif, santri.poin_produktif).status}
                    </Badge>
                    <div className="text-xs text-gray-600">{santri.waktu_produktif || "Tidak hadir"}</div>
                    <div className="font-bold text-sm">{santri.poin_produktif} poin</div>
                  </div>

                  {/* Dzuhur */}
                  <div className="text-center">
                    <div className="font-medium text-sm mb-2">Dzuhur</div>
                    <Badge
                      className={`${getPrayerStatus(santri.waktu_dzuhur, santri.poin_dzuhur).color} text-white mb-1`}
                    >
                      {getPrayerStatus(santri.waktu_dzuhur, santri.poin_dzuhur).status}
                    </Badge>
                    <div className="text-xs text-gray-600">{santri.waktu_dzuhur || "Tidak hadir"}</div>
                    <div className="font-bold text-sm">{santri.poin_dzuhur} poin</div>
                  </div>

                  {/* Ashar */}
                  <div className="text-center">
                    <div className="font-medium text-sm mb-2">Ashar</div>
                    <Badge
                      className={`${getPrayerStatus(santri.waktu_ashar, santri.poin_ashar).color} text-white mb-1`}
                    >
                      {getPrayerStatus(santri.waktu_ashar, santri.poin_ashar).status}
                    </Badge>
                    <div className="text-xs text-gray-600">{santri.waktu_ashar || "Tidak hadir"}</div>
                    <div className="font-bold text-sm">{santri.poin_ashar} poin</div>
                  </div>

                  {/* Maghrib & Isya */}
                  <div className="text-center">
                    <div className="font-medium text-sm mb-2">Maghrib & Isya</div>
                    <Badge
                      className={`${getPrayerStatus(santri.waktu_maghrib_isya, santri.poin_maghrib_isya).color} text-white mb-1`}
                    >
                      {getPrayerStatus(santri.waktu_maghrib_isya, santri.poin_maghrib_isya).status}
                    </Badge>
                    <div className="text-xs text-gray-600">{santri.waktu_maghrib_isya || "Tidak hadir"}</div>
                    <div className="font-bold text-sm">{santri.poin_maghrib_isya} poin</div>
                  </div>
                </div>

                {/* Event Points */}
                {Number.parseInt(santri.poin_event) > 0 && (
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Poin Event:</span>
                      <Badge variant="secondary">{santri.poin_event} poin</Badge>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        : // Weekly View
          filteredWeeklyData.map((weeklyData, index) => (
            <Card
              key={`${weeklyData.id_santri}-${weeklyData.weekRange.start}`}
              className="hover:shadow-md transition-shadow"
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{weeklyData.nama_lengkap_santri}</CardTitle>
                    <CardDescription>
                      ID: {weeklyData.id_santri} • Periode: {weeklyData.weekRange.start} s/d {weeklyData.weekRange.end}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${getPointsColor(weeklyData.totalPoints)}`}>
                      {weeklyData.totalPoints} Poin
                    </div>
                    <div className="text-sm text-gray-500">Total Mingguan</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium mb-2">Statistik Mingguan:</div>
                    <div className="space-y-1 text-sm">
                      <div>
                        Jumlah hari aktif: <span className="font-bold">{weeklyData.days.length} hari</span>
                      </div>
                      <div>
                        Rata-rata poin harian:{" "}
                        <span className="font-bold">
                          {(weeklyData.totalPoints / weeklyData.days.length).toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-2">Rincian Hari:</div>
                    <div className="space-y-1 text-xs">
                      {weeklyData.days.map((day, dayIndex) => (
                        <div key={dayIndex} className="flex justify-between">
                          <span>{day.tanggal}</span>
                          <span className="font-bold">{day.total_poin_harian} poin</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
    </div>
  )
}
