import type { SantriData } from "@/types/santri"

export const getWeekRange = (dateStr: string) => {
  const date = new Date(dateStr)
  const dayOfWeek = date.getDay() // 0 = Sunday, 1 = Monday, ..., 5 = Friday, 6 = Saturday

  // Calculate days to subtract to get to Friday
  let daysToFriday
  if (dayOfWeek >= 5) {
    daysToFriday = dayOfWeek - 5
  } else {
    daysToFriday = dayOfWeek + 2
  }

  const friday = new Date(date)
  friday.setDate(date.getDate() - daysToFriday)

  const thursday = new Date(friday)
  thursday.setDate(friday.getDate() + 6)

  return {
    start: friday.toISOString().split("T")[0],
    end: thursday.toISOString().split("T")[0],
  }
}

export const getCurrentWeekRange = () => {
  const today = new Date()
  const dayOfWeek = today.getDay()

  let daysToFriday
  if (dayOfWeek >= 5) {
    daysToFriday = dayOfWeek - 5
  } else {
    daysToFriday = dayOfWeek + 2
  }

  const friday = new Date(today)
  friday.setDate(today.getDate() - daysToFriday)

  const thursday = new Date(friday)
  thursday.setDate(friday.getDate() + 6)

  return {
    start: friday.toISOString().split("T")[0],
    end: thursday.toISOString().split("T")[0],
  }
}

export const getPrayerStatus = (waktu: string | null, poin: string) => {
  if (waktu && Number.parseInt(poin) > 0) {
    return { status: "Hadir", color: "bg-green-500", points: Number.parseInt(poin) }
  } else if (Number.parseInt(poin) > 0) {
    return { status: "Terlambat", color: "bg-yellow-500", points: Number.parseInt(poin) }
  }
  return { status: "Tidak Hadir", color: "bg-red-500", points: 0 }
}

export const getPointsColor = (points: number) => {
  if (points >= 40) return "text-green-600 font-bold"
  if (points >= 25) return "text-blue-600 font-semibold"
  if (points >= 15) return "text-yellow-600"
  return "text-red-600"
}

export const calculateWeeklyPoints = (data: SantriData[]) => {
  const weeklyData = new Map()

  data.forEach((item) => {
    const weekRange = getWeekRange(item.tanggal)
    const weekKey = `${weekRange.start}_${weekRange.end}`

    if (!weeklyData.has(item.id_santri)) {
      weeklyData.set(item.id_santri, new Map())
    }

    const santriWeeks = weeklyData.get(item.id_santri)
    if (!santriWeeks.has(weekKey)) {
      santriWeeks.set(weekKey, {
        nama: item.nama_lengkap_santri,
        weekRange,
        totalPoints: 0,
        days: [],
      })
    }

    const weekData = santriWeeks.get(weekKey)
    weekData.totalPoints += Number.parseInt(item.total_poin_harian)
    weekData.days.push(item)
  })

  return weeklyData
}
