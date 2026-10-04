import scheduleData from "@/public/orar_data.json"

export type ActivityType = "course" | "lab" | "seminar" | "sport" | "optional"
export type Parity = "all" | "odd" | "even"
export type Semigroup = "all" | "1" | "2"

export interface ScheduleItem {
  id: string
  groups: string[]
  semigroup: Semigroup
  day: "Luni" | "Marți" | "Miercuri" | "Joi" | "Vineri"
  dayIndex: number
  startHour: number
  endHour: number
  timeStr: string
  title: string
  shortName: string
  type: ActivityType
  room: string
  professor?: string
  parity: Parity
  optionalKey?: string
  startDate?: string
  description?: string
}

export interface OptionalOption {
  key: string
  name: string
}

export interface SemesterInfo {
  startDate: string
  faculty: string
  specialization: string
  academicYear: string
  semesterNum: number
  title: string
}

export interface TimetableData {
  semester: SemesterInfo
  groups: string[]
  semigroups: string[]
  days: ("Luni" | "Marți" | "Miercuri" | "Joi" | "Vineri")[]
  optionals?: OptionalOption[]
  items: ScheduleItem[]
}

export const timetableData = scheduleData as TimetableData

/**
 * Calculates academic week and day info automatically:
 * - Start date: 2026-09-28 (Week 1 = Odd / Impară)
 * - If current time is past 20:00 (hour >= 20), switches automatically to the next day
 * - If the next day falls on the weekend (Saturday or Sunday), it rolls over to Monday of the upcoming week
 * - Calculates parity ('odd' | 'even') automatically from the effective target date
 */
export function getAcademicWeekInfo(targetDate: Date = new Date()) {
  const [startYear, startMonth, startDay] = timetableData.semester.startDate.split("-").map(Number)
  const semesterStart = new Date(startYear, startMonth - 1, startDay, 0, 0, 0, 0)

  // Work with a mutable copy of targetDate
  const effectiveDate = new Date(targetDate.getTime())

  const isAfter20 = effectiveDate.getHours() >= 20
  if (isAfter20) {
    // Advance to the next day
    effectiveDate.setDate(effectiveDate.getDate() + 1)
  }

  // Check day of week: 0 = Sunday, 1 = Monday, ..., 5 = Friday, 6 = Saturday
  const dayOfWeek = effectiveDate.getDay()

  let dayIndex = 0 // 0 = Luni, 1 = Marți, 2 = Miercuri, 3 = Joi, 4 = Vineri
  let rolledOverToNextWeek = false

  if (dayOfWeek === 6) {
    // Saturday -> roll over to Monday (+2 days)
    effectiveDate.setDate(effectiveDate.getDate() + 2)
    dayIndex = 0
    rolledOverToNextWeek = true
  } else if (dayOfWeek === 0) {
    // Sunday -> roll over to Monday (+1 day)
    effectiveDate.setDate(effectiveDate.getDate() + 1)
    dayIndex = 0
    rolledOverToNextWeek = true
  } else {
    dayIndex = dayOfWeek - 1 // 1 (Mon) -> 0, 5 (Fri) -> 4
  }

  // Calculate week number from semesterStart (Monday) to effectiveDate (normalized to midnight)
  const normEffective = new Date(
    effectiveDate.getFullYear(),
    effectiveDate.getMonth(),
    effectiveDate.getDate(),
    0,
    0,
    0,
    0
  )
  const diffDays = Math.floor((normEffective.getTime() - semesterStart.getTime()) / (1000 * 60 * 60 * 24))
  const weekNumber = Math.max(1, Math.floor(diffDays / 7) + 1)
  const isOdd = weekNumber % 2 !== 0
  const parity: Parity = isOdd ? "odd" : "even"

  const year = normEffective.getFullYear()
  const month = String(normEffective.getMonth() + 1).padStart(2, "0")
  const day = String(normEffective.getDate()).padStart(2, "0")
  const effectiveDateStr = `${year}-${month}-${day}`

  return {
    weekNumber,
    isOdd,
    parity,
    dayIndex,
    isAfter20,
    rolledOverToNextWeek,
    startDateStr: timetableData.semester.startDate,
    effectiveDateStr,
  }
}
