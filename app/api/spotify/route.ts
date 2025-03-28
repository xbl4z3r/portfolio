import { NextResponse } from "next/server";

import {getNowPlayingItem} from "@/config/spotify";
import {NowPlaying} from "@/types";

export const dynamic = "force-dynamic";

export async function GET(): Promise<NextResponse<NowPlaying>> {
  return NextResponse.json(await getNowPlayingItem());
}
