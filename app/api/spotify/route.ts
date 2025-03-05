import { NextResponse } from "next/server";

import { getNowPlayingItem } from "@/config/spotify";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getNowPlayingItem());
}
