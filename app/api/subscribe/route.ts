import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "A valid email address is required." }, { status: 400 })
    }

    const apiKey = process.env.KIT_API_KEY
    if (!apiKey) {
      console.error("KIT_API_KEY is missing from environment variables.")
      return NextResponse.json({ error: "Email service is not configured." }, { status: 500 })
    }

    const response = await fetch("https://api.kit.com/v4/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Kit-Api-Key": apiKey,
      },
      body: JSON.stringify({
        email_address: email.trim().toLowerCase(),
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error("Kit API error:", data)
      const errorMessage =
        (Array.isArray(data?.errors) && data.errors.join(", ")) ||
        data?.message ||
        "Failed to subscribe email."
      return NextResponse.json({ error: errorMessage }, { status: response.status })
    }

    return NextResponse.json({
      success: true,
      subscriber: data.subscriber,
    })
  } catch (error) {
    console.error("POST /api/subscribe error:", error)
    return NextResponse.json(
      { error: (error as Error)?.message || "Internal server error." },
      { status: 500 }
    )
  }
}
