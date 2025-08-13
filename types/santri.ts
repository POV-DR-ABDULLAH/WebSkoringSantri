export interface SantriData {
  id_santri: string
  nama_lengkap_santri: string
  tanggal: string
  waktu_shubuh: string | null
  poin_shubuh: string
  waktu_produktif: string | null
  poin_produktif: string
  waktu_dzuhur: string | null
  poin_dzuhur: string
  waktu_ashar: string | null
  poin_ashar: string
  waktu_maghrib_isya: string | null
  poin_maghrib_isya: string
  total_poin_harian: string
  total_event: string
  poin_event: string
}

export interface ApiResponse {
  status: string
  count: number
  data: SantriData[]
}

export interface WeeklyData {
  id_santri: string
  nama_lengkap_santri: string
  weekRange: { start: string; end: string }
  totalPoints: number
  days: SantriData[]
}
