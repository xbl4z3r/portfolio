import {NextResponse} from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    return NextResponse.json({
        users: 0,
        guilds: 0,
        commands: 0,
    });
}
