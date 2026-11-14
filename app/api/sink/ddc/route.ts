import { NextResponse } from "next/server"
import ddcList from "@/public/sink/ddc/index.json"

export const dynamic = "force-static"
export const revalidate = 86400

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")?.trim().toLowerCase()

  let results = ddcList

  if (query) {
    results = ddcList.filter((item: { name: string; filename: string }) =>
      item.name.toLowerCase().includes(query) ||
      item.filename.toLowerCase().includes(query)
    )
  }

  return NextResponse.json(
    {
      total: results.length,
      profiles: results,
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      },
    }
  )
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  })
}
