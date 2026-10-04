import { NextResponse } from "next/server"

import { getNowPlayingItem } from "@/config/spotify"
import { NowPlaying } from "@/types"

export const dynamic = "force-dynamic"

export async function GET(): Promise<NextResponse> {
  try {
    const data = await getNowPlayingItem()
    return NextResponse.json(data)
  } catch (error) {
    console.error("GET /api/spotify error:", error)
    return NextResponse.json({ error: (error as Error)?.message || String(error) }, { status: 500 })
  }
}
