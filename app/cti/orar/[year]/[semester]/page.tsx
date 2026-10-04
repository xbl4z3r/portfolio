import { Metadata } from "next"
import { cookies } from "next/headers"
import OrarClient from "@/app/cti/orar/orar-client"
import { timetableData, getAcademicWeekInfo } from "@/lib/orar"

interface PageProps {
  params: Promise<{
    year: string
    semester: string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { year, semester } = await params
  return {
    title: `Orar Dinamic ACS CTI - Anul ${year}, Semestrul ${semester}`,
    description: `Orar interactiv și dinamic pentru Facultatea de Automatică și Calculatoare (UPB) - CTI Anul ${year}, Semestrul ${semester}, seria CA.`,
  }
}

export default async function CtiOrarYearSemesterPage({ params }: PageProps) {
  const { year, semester } = await params
  const cookieStore = await cookies()
  const savedGroup = cookieStore.get("orar_group")?.value || "312 CA"
  const savedSemigroup = cookieStore.get("orar_semigroup")?.value || "1"
  const savedOptional = cookieStore.get("orar_optional")?.value || "none"

  const weekInfo = getAcademicWeekInfo()

  return (
    <OrarClient
      year={year}
      semester={semester}
      initialGroup={savedGroup}
      initialSemigroup={savedSemigroup}
      initialOptional={savedOptional}
      timetableData={timetableData}
      initialWeekInfo={weekInfo}
    />
  )
}
