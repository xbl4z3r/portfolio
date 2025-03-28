import { NextResponse } from "next/server";

import {getNowPlayingItem, NowPlaying} from "@/config/spotify";

export const dynamic = "force-dynamic";

export async function GET(): Promise<NextResponse<NowPlaying>> {
  return NextResponse.json(await getNowPlayingItem());
}
