import { NextResponse } from "next/server";

export async function GET() {
  const distribution = require("../../../../../config/distribution.json");

  return NextResponse.json(distribution);
}
