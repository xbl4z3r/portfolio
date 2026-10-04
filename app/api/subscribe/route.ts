import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

// In-memory sliding window rate limiter
// Key: IP address, Value: array of request timestamps (ms)
const rateLimitMap = new Map<string, number[]>()
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000 // 1 hour window
const MAX_REQUESTS_PER_WINDOW = 5 // max 5 subscription attempts per IP per hour

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const timestamps = rateLimitMap.get(ip) || []

  // Filter timestamps within the current window
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS)

  if (recent.length >= MAX_REQUESTS_PER_WINDOW) {
    rateLimitMap.set(ip, recent)
    return true
  }

  recent.push(now)
  rateLimitMap.set(ip, recent)

  // Periodic cleanup if map grows large (> 1000 items)
  if (rateLimitMap.size > 1000) {
    rateLimitMap.forEach((times, key) => {
      const valid = times.filter((t) => now - t < RATE_LIMIT_WINDOW_MS)
      if (valid.length === 0) {
        rateLimitMap.delete(key)
      } else {
        rateLimitMap.set(key, valid)
      }
    })
  }

  return false
}

export async function POST(req: Request) {
  try {
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown-ip"

    if (clientIp !== "unknown-ip" && isRateLimited(clientIp)) {
      return NextResponse.json(
        { error: "Too many subscription attempts. Please try again later." },
        { status: 429 }
      )
    }

    const { email, honeypot } = await req.json()

    // Honeypot check: Bots usually fill hidden fields.
    // Return a fake success to avoid giving bots feedback.
    if (honeypot && String(honeypot).trim() !== "") {
      return NextResponse.json({
        success: true,
        message: "Subscription recorded.",
      })
    }

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "A valid email address is required." }, { status: 400 })
    }

    const trimmedEmail = email.trim().toLowerCase()
    // Simple email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(trimmedEmail)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 })
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
        email_address: trimmedEmail,
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
