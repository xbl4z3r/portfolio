"use client"

import React, { useState, useTransition, useMemo } from "react"
import { Navbar } from "@/components/navbar"
import { siteConfig } from "@/config/site"
import { Badge } from "@/components/ui/badge"
import { TimetableData, ScheduleItem, ActivityType, getAcademicWeekInfo } from "@/lib/orar"
import { Clock, MapPin, User, GraduationCap, Moon, Coffee, Sun, BookOpen } from "lucide-react"

interface OrarClientProps {
  year?: string
  semester?: string
  initialGroup: string
  initialSemigroup: string
  initialOptional: string
  timetableData: TimetableData
  initialWeekInfo: ReturnType<typeof getAcademicWeekInfo>
}

// Clean, high-contrast, modern accent colors for activity types
const TYPE_CONFIG: Record<
  ActivityType,
  {
    label: string
    badgeClass: string
    indicatorClass: string
    borderClass: string
    timeColor: string
    dotBg: string
    bgTint: string
  }
> = {
  course: {
    label: "Curs",
    badgeClass: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    indicatorClass: "bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.7)]",
    borderClass: "border-blue-500/30 hover:border-blue-500/60",
    timeColor: "text-blue-400",
    dotBg: "bg-blue-500",
    bgTint: "bg-blue-500/[0.03]",
  },
  lab: {
    label: "Laborator",
    badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    indicatorClass: "bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.7)]",
    borderClass: "border-emerald-500/30 hover:border-emerald-500/60",
    timeColor: "text-emerald-400",
    dotBg: "bg-emerald-500",
    bgTint: "bg-emerald-500/[0.03]",
  },
  seminar: {
    label: "Seminar",
    badgeClass: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    indicatorClass: "bg-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.7)]",
    borderClass: "border-purple-500/30 hover:border-purple-500/60",
    timeColor: "text-purple-400",
    dotBg: "bg-purple-500",
    bgTint: "bg-purple-500/[0.03]",
  },
  sport: {
    label: "Sport",
    badgeClass: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    indicatorClass: "bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.7)]",
    borderClass: "border-amber-500/30 hover:border-amber-500/60",
    timeColor: "text-amber-400",
    dotBg: "bg-amber-500",
    bgTint: "bg-amber-500/[0.03]",
  },
  optional: {
    label: "Opțional",
    badgeClass: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    indicatorClass: "bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.7)]",
    borderClass: "border-rose-500/30 hover:border-rose-500/60",
    timeColor: "text-rose-400",
    dotBg: "bg-rose-500",
    bgTint: "bg-rose-500/[0.03]",
  },
}

// Timeline item union type: either a scheduled class or a break (pauză / fereastră)
export type TimelineBlock =
  | {
      kind: "class"
      item: ScheduleItem
    }
  | {
      kind: "break"
      startHour: number
      endHour: number
      timeStr: string
      durationHours: number
    }

export default function OrarClient({
  year = "1",
  semester = "1",
  initialGroup,
  initialSemigroup,
  initialOptional,
  timetableData,
  initialWeekInfo,
}: OrarClientProps) {
  const [selectedGroup, setSelectedGroup] = useState(initialGroup)
  const [selectedSemigroup, setSelectedSemigroup] = useState(initialSemigroup)
  const [selectedOptional, setSelectedOptional] = useState(initialOptional)

  // Parity is 100% automated based on current date & time ('odd' | 'even')
  const autoParity = initialWeekInfo.parity

  // Active day defaults automatically to the target day (today, or tomorrow if past 20:00)
  const [activeDayIndex, setActiveDayIndex] = useState<number | "all">(initialWeekInfo.dayIndex)
  const [, startTransition] = useTransition()

  // Save selection seamlessly into cookies
  const handleGroupChange = (grp: string) => {
    setSelectedGroup(grp)
    startTransition(() => {
      document.cookie = `orar_group=${encodeURIComponent(
        grp
      )}; path=/; max-age=31536000; SameSite=Lax`
    })
  }

  const handleSemigroupChange = (sg: string) => {
    setSelectedSemigroup(sg)
    startTransition(() => {
      document.cookie = `orar_semigroup=${encodeURIComponent(
        sg
      )}; path=/; max-age=31536000; SameSite=Lax`
    })
  }

  const handleOptionalChange = (optKey: string) => {
    setSelectedOptional(optKey)
    startTransition(() => {
      document.cookie = `orar_optional=${encodeURIComponent(
        optKey
      )}; path=/; max-age=31536000; SameSite=Lax`
    })
  }

  // Filter timetable for selected group, semigroup, optional, and the automatic week parity
  const filteredItems = useMemo(() => {
    return timetableData.items.filter((item) => {
      // 1. Group match
      const groupMatch = item.groups.includes(selectedGroup)
      // 2. Semigroup match
      const sgMatch = item.semigroup === "all" || item.semigroup === selectedSemigroup
      // 3. Parity match
      const parityMatch = item.parity === "all" || item.parity === autoParity
      // 4. Optional course match
      if (item.type === "optional" && item.optionalKey) {
        if (selectedOptional === "none" || selectedOptional !== item.optionalKey) {
          return false
        }
      }

      // 5. Start date check (e.g. course starts only after a specific date)
      if (item.startDate && initialWeekInfo.effectiveDateStr) {
        if (initialWeekInfo.effectiveDateStr < item.startDate) {
          return false
        }
      }

      return groupMatch && sgMatch && parityMatch
    })
  }, [
    timetableData.items,
    selectedGroup,
    selectedSemigroup,
    selectedOptional,
    autoParity,
    initialWeekInfo.effectiveDateStr,
  ])

  // Group items by day and compute timeline with visual breaks
  const timelineByDay = useMemo(() => {
    const map: Record<number, TimelineBlock[]> = { 0: [], 1: [], 2: [], 3: [], 4: [] }

    for (let dayIdx = 0; dayIdx < 5; dayIdx++) {
      const dayClasses = filteredItems
        .filter((it) => it.dayIndex === dayIdx)
        .sort((a, b) => a.startHour - b.startHour)

      if (dayClasses.length === 0) {
        map[dayIdx] = []
        continue
      }

      const blocks: TimelineBlock[] = []
      let lastEndHour = dayClasses[0].startHour

      for (let i = 0; i < dayClasses.length; i++) {
        const cls = dayClasses[i]

        // Check if there is a gap (pauză / fereastră) before this class
        if (cls.startHour > lastEndHour) {
          const gap = cls.startHour - lastEndHour
          const startStr = `${String(lastEndHour).padStart(2, "0")}:00`
          const endStr = `${String(cls.startHour).padStart(2, "0")}:00`
          blocks.push({
            kind: "break",
            startHour: lastEndHour,
            endHour: cls.startHour,
            timeStr: `${startStr} - ${endStr}`,
            durationHours: gap,
          })
        }

        blocks.push({
          kind: "class",
          item: cls,
        })

        lastEndHour = Math.max(lastEndHour, cls.endHour)
      }

      map[dayIdx] = blocks
    }

    return map
  }, [filteredItems])

  const totalClassesThisWeek = filteredItems.length
  const targetDayName = timetableData.days[initialWeekInfo.dayIndex]

  const optionalsList = timetableData.optionals || [
    { key: "none", name: "Fără opțional" },
    { key: "tc", name: "TC (Tehnici de Comunicare)" },
    { key: "if", name: "IF (Istoria Filosofiei)" },
    { key: "ant", name: "Ant (Antropologie)" },
    { key: "log", name: "Log (Logică)" },
    { key: "ifr", name: "IFR (Istoria și Filosofia Religiilor)" },
    { key: "idst", name: "IDST (Istoria Dezvoltării Științei)" },
    { key: "psiho", name: "Psihologia Educației (facultativ)" },
  ]

  return (
    <main className="relative min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20">
      {/* Top Navbar */}
      <Navbar
        navbarData={{
          title: siteConfig.pages.orar.title,
          navItems: siteConfig.pages.orar.navItems,
        }}
        accentColors={["#3b82f6", "#8b5cf6"]}
      />

      <div className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 flex flex-col gap-6">
        {/* Header Bar */}
        <section className="relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-r from-card/90 via-card/50 to-card/90 p-5 sm:p-6 backdrop-blur-xl shadow-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="bg-primary/10 text-primary border-primary/20 text-xs font-semibold px-2.5 py-0.5 flex items-center gap-1.5"
              >
                <GraduationCap className="h-3.5 w-3.5" />
                UPB • ACS
              </Badge>
              <span className="text-xs text-muted-foreground font-medium">
                Anul {year} • Semestrul {semester} ({timetableData.semester.academicYear})
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Orar <span className="text-primary">{selectedGroup}</span>
            </h1>
          </div>

          {/* Automatic Parity & Schedule Status */}
          <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-auto">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-muted/40 border border-border/50 text-xs">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-muted-foreground">Săpt. {initialWeekInfo.weekNumber}:</span>
              <strong className="text-foreground font-bold">
                Săptămână {autoParity === "even" ? "pară" : "impară"}
              </strong>
            </div>

            {initialWeekInfo.isAfter20 && (
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
                <Moon className="h-3.5 w-3.5" />
                <span>După 20:00 → Afișat: {targetDayName}</span>
              </div>
            )}
          </div>
        </section>

        {/* Clean Controls Card: Group, Semigroup & Optional Selectors */}
        <section className="rounded-2xl border border-border/50 bg-card/60 backdrop-blur-xl p-4 sm:p-5 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* 1. Group Selector */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Grupă
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                {timetableData.groups.map((group) => {
                  const isSelected = selectedGroup === group
                  return (
                    <button
                      key={group}
                      onClick={() => handleGroupChange(group)}
                      className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
                        isSelected
                          ? "bg-primary text-primary-foreground border-primary shadow-sm shadow-primary/20"
                          : "bg-muted/30 hover:bg-muted/70 text-muted-foreground hover:text-foreground border-border/50"
                      }`}
                    >
                      {group}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* 2. Semigroup Selector */}
            <div className="space-y-1.5 sm:self-end">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Semigrupă
              </span>
              <div className="flex items-center gap-1.5 p-1 bg-muted/30 rounded-xl border border-border/50 w-fit">
                {timetableData.semigroups.map((sg) => {
                  const isSelected = selectedSemigroup === sg
                  return (
                    <button
                      key={sg}
                      onClick={() => handleSemigroupChange(sg)}
                      className={`px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                        isSelected
                          ? "bg-background text-foreground shadow-sm font-bold border border-border/40"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Semigrupa {sg}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* 3. Optional Selector */}
          <div className="pt-2 border-t border-border/40 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <BookOpen className="h-3.5 w-3.5 text-primary" />
                Curs Opțional ales
              </span>
              {selectedOptional !== "none" && (
                <button
                  onClick={() => handleOptionalChange("none")}
                  className="text-[11px] text-muted-foreground hover:text-foreground underline transition-colors"
                >
                  Ascunde opțional
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {optionalsList.map((opt) => {
                const isSelected = selectedOptional === opt.key
                return (
                  <button
                    key={opt.key}
                    onClick={() => handleOptionalChange(opt.key)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all border ${
                      isSelected
                        ? "bg-rose-500 text-white border-rose-500 shadow-sm font-bold"
                        : "bg-muted/30 hover:bg-muted/70 text-muted-foreground hover:text-foreground border-border/40"
                    }`}
                  >
                    {opt.name}
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        {/* Days Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setActiveDayIndex("all")}
            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap border ${
              activeDayIndex === "all"
                ? "bg-foreground text-background border-foreground shadow-sm"
                : "bg-muted/30 hover:bg-muted/70 text-muted-foreground hover:text-foreground border-border/40"
            }`}
          >
            Toată săptămâna ({totalClassesThisWeek})
          </button>
          {timetableData.days.map((day, idx) => {
            const isTargetDay = initialWeekInfo.dayIndex === idx
            const isSelected = activeDayIndex === idx
            const dayClassCount = filteredItems.filter((i) => i.dayIndex === idx).length

            return (
              <button
                key={day}
                onClick={() => setActiveDayIndex(idx)}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 border ${
                  isSelected
                    ? "bg-primary text-primary-foreground border-primary shadow-sm shadow-primary/25"
                    : "bg-muted/30 hover:bg-muted/70 text-muted-foreground hover:text-foreground border-border/40"
                }`}
              >
                <span>{day}</span>
                {dayClassCount > 0 && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isSelected
                        ? "bg-primary-foreground/20 text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {dayClassCount}
                  </span>
                )}
                {isTargetDay && (
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                    title={initialWeekInfo.isAfter20 ? "Următoarea zi de cursuri" : "Ziua curentă"}
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* Timeline Schedule Display with Breaks */}
        <section className="space-y-6">
          {timetableData.days.map((dayName, dayIdx) => {
            if (activeDayIndex !== "all" && activeDayIndex !== dayIdx) {
              return null
            }

            const dayBlocks = timelineByDay[dayIdx] || []
            const isTargetDay = initialWeekInfo.dayIndex === dayIdx
            const dayClassCount = dayBlocks.filter((b) => b.kind === "class").length

            return (
              <div
                key={dayName}
                className="space-y-5 rounded-2xl border border-border/50 bg-card/40 p-4 sm:p-6 backdrop-blur-xl shadow-sm"
              >
                {/* Day Header */}
                <div className="flex items-center justify-between border-b border-border/30 pb-3">
                  <div className="flex items-center gap-2.5">
                    <h2 className="text-lg sm:text-xl font-bold tracking-tight">{dayName}</h2>
                    {isTargetDay && (
                      <Badge
                        variant="secondary"
                        className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-[10px] font-semibold px-2 py-0.5"
                      >
                        {initialWeekInfo.isAfter20 ? "Mâine / Următoarea zi" : "Azi"}
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground font-medium">
                    {dayClassCount === 0
                      ? "Zi liberă"
                      : `${dayClassCount} ${dayClassCount === 1 ? "activitate" : "activități"}`}
                  </span>
                </div>

                {/* Day Timeline */}
                {dayBlocks.length === 0 ? (
                  <div className="py-8 text-center text-muted-foreground text-xs sm:text-sm flex flex-col items-center justify-center gap-1.5">
                    <Sun className="h-6 w-6 text-muted-foreground/40" />
                    <p className="font-medium text-foreground">Zi complet liberă!</p>
                    <p className="text-xs text-muted-foreground">
                      Nu ai cursuri sau laboratoare programate în această zi.
                    </p>
                  </div>
                ) : (
                  <div className="relative pl-6 sm:pl-8 space-y-4 before:absolute before:left-2 sm:before:left-3 before:top-2 before:bottom-2 before:w-[2px] before:bg-border/60">
                    {dayBlocks.map((block, bIdx) => {
                      if (block.kind === "break") {
                        return (
                          <div
                            key={`break-${bIdx}`}
                            className="relative flex items-center gap-3 py-1 my-1"
                          >
                            {/* Break Node Dot on Timeline */}
                            <div className="absolute -left-6 sm:-left-8 flex items-center justify-center w-4 sm:w-6">
                              <span className="w-2.5 h-2.5 rounded-full bg-border border-2 border-background" />
                            </div>

                            {/* Break Banner */}
                            <div className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-muted/20 border border-dashed border-border/60 text-xs text-muted-foreground">
                              <div className="flex items-center gap-2 font-medium">
                                <Coffee className="h-3.5 w-3.5 text-amber-500/80" />
                                <span>
                                  Pauză / Fereastră ({block.durationHours}{" "}
                                  {block.durationHours === 1 ? "oră" : "ore"})
                                </span>
                              </div>
                              <span className="font-semibold text-foreground/70">
                                {block.timeStr}
                              </span>
                            </div>
                          </div>
                        )
                      }

                      // Class Block
                      const item = block.item
                      const cfg = TYPE_CONFIG[item.type]

                      return (
                        <div key={item.id} className="relative flex items-start gap-4">
                          {/* Timeline Node Dot */}
                          <div className="absolute -left-6 sm:-left-8 mt-4 flex items-center justify-center w-4 sm:w-6">
                            <span
                              className={`w-3 h-3 rounded-full ${cfg.dotBg} ring-4 ring-background shadow-sm`}
                            />
                          </div>

                          {/* Class Card */}
                          <div
                            className={`w-full group rounded-xl border ${cfg.borderClass} ${cfg.bgTint} bg-card/90 p-4 backdrop-blur-md transition-all duration-200 hover:shadow-md flex flex-col justify-between gap-3`}
                          >
                            {/* Card Top: Type Badge & Time */}
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <Badge
                                  variant="outline"
                                  className={`text-[11px] font-bold px-2.5 py-0.5 ${cfg.badgeClass}`}
                                >
                                  {cfg.label}
                                </Badge>
                                {item.parity !== "all" && (
                                  <span className="text-[10px] font-medium text-muted-foreground bg-muted/40 px-2 py-0.5 rounded-md border border-border/40">
                                    Săpt. {item.parity === "even" ? "pară" : "impară"}
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center gap-1.5 font-bold text-foreground text-xs sm:text-sm">
                                <Clock className={`h-3.5 w-3.5 ${cfg.timeColor}`} />
                                <span>{item.timeStr}</span>
                              </div>
                            </div>

                            {/* Class Title & Details */}
                            <div className="space-y-1">
                              <h3 className="font-bold text-sm sm:text-base leading-snug group-hover:text-primary transition-colors">
                                {item.title}
                              </h3>
                              {item.description && (
                                <p className="text-xs text-muted-foreground">{item.description}</p>
                              )}
                            </div>

                            {/* Card Footer: Room & Professor */}
                            <div className="pt-2 border-t border-border/30 text-xs flex flex-wrap items-center justify-between gap-2">
                              <div className="flex items-center gap-1.5 font-bold text-foreground bg-muted/60 px-2.5 py-1 rounded-lg border border-border/40">
                                <MapPin className="h-3.5 w-3.5 text-primary" />
                                <span>Sala {item.room}</span>
                              </div>

                              {item.professor && (
                                <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                                  <User className="h-3.5 w-3.5 shrink-0" />
                                  <span>{item.professor}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </section>
      </div>
    </main>
  )
}
