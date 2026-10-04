"use client"

import React, { useState } from "react"
import { siteConfig } from "@/config/site"
import { Navbar } from "@/components/navbar"
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button"
import { Particles } from "@/components/magicui/particles"
import { Badge } from "@/components/ui/badge"
import {
  Check,
  Volume2,
  Zap,
  Shield,
  Monitor,
  Music,
  Bell,
  Mail,
  Gauge,
  Sparkles,
  ArrowRight,
} from "lucide-react"

// Easy-to-understand benchmark comparison
const BENCHMARKS = [
  {
    metric: "Memory Usage (RAM)",
    sink: "~75 MB",
    official: "600+ MB",
    highlight: "8x Lighter",
    desc: "Sink uses lightweight native desktop rendering instead of heavyweight browser wrappers.",
  },
  {
    metric: "Cold Startup Time",
    sink: "< 0.2s",
    official: "3.5s – 5.0s",
    highlight: "15x Faster",
    desc: "Launches instantly the moment you click the icon without splash screen delays.",
  },
  {
    metric: "Background CPU",
    sink: "< 1%",
    official: "6% – 12%",
    highlight: "Battery Saver",
    desc: "Optimized background audio playback that won't drain your laptop battery.",
  },
  {
    metric: "Audio Fidelity",
    sink: "Studio Grade",
    official: "Compressed",
    highlight: "Pure Audio",
    desc: "High dynamic range sound reproduction with rich bass warmth and crystal clear acoustics.",
  },
  {
    metric: "Storage Footprint",
    sink: "~15 MB",
    official: "180+ MB",
    highlight: "Zero Bloat",
    desc: "Compact native binary without bundled Chromium browser baggage.",
  },
]

const FEATURES = [
  {
    title: "Sound Quality Like No Other",
    description:
      "Experience rich, studio-grade audio with expansive dynamic range, crystal clear acoustic detail, and deep, punchy low-end response that standard compressed players cannot match.",
    icon: Volume2,
  },
  {
    title: "Rebuilt from Scratch",
    description:
      "A complete Spotify desktop client built natively from the ground up for maximum speed, instant responsiveness, and minimal memory footprint.",
    icon: Zap,
  },
  {
    title: "Native OS Integration",
    description:
      "Seamless hardware media key support, system tray quick controls, native window translucency, and instant keyboard shortcuts.",
    icon: Monitor,
  },
  {
    title: "Album Art Atmosphere",
    description:
      "Fluid dynamic background glows that softly adapt to the color palette of the album artwork you are currently enjoying.",
    icon: Sparkles,
  },
  {
    title: "Real-Time Synced Lyrics",
    description:
      "Line-by-line synchronized lyrics display with smooth scrolling and instant click-to-seek support.",
    icon: Music,
  },
  {
    title: "Private & Lightweight",
    description:
      "No background telemetries, no sluggish ad tracking processes, and no resource-heavy bloatware.",
    icon: Shield,
  },
]

export default function SinkPage() {
  // Email waitlist form state
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [subscribing, setSubscribing] = useState(false)
  const [subscribeError, setSubscribeError] = useState<string | null>(null)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes("@")) return
    setSubscribing(true)
    setSubscribeError(null)

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Failed to subscribe. Please try again.")
      }

      setIsSubscribed(true)
    } catch (err) {
      setSubscribeError((err as Error).message || "Something went wrong.")
    } finally {
      setSubscribing(false)
    }
  }

  return (
    <>
      <Navbar navbarData={siteConfig.pages.sink} accentColors={["#85c1ae", "#5a9583"]} />
      <main className="container mx-auto px-4 sm:px-6 max-w-7xl grow h-full relative space-y-4">
        <Particles
          className="absolute inset-0 z-0 pointer-events-none"
          quantity={60}
          ease={80}
          color={"#85c1ae"}
          refresh={false}
        />

        {/* 1. Hero Section (#home) */}
        <section
          id="home"
          className="flex flex-col items-center justify-center min-h-[82vh] text-center pt-12 pb-16 sm:py-20 relative z-10"
        >
          <div className="flex flex-col items-center max-w-4xl space-y-6">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#85c1ae]/10 text-[#85c1ae] border border-[#85c1ae]/30 backdrop-blur-md shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#85c1ae] animate-pulse" />
              <span>Spotify Client • Closed Beta Waitlist</span>
            </div>

            {/* App Icon with Glow */}
            <div className="relative group my-1">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-[#85c1ae] via-[#98c9b9] to-[#5a9583] opacity-40 blur-2xl group-hover:opacity-70 transition duration-500" />
              <img
                src="/sink.png"
                alt="Sink App Icon"
                className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-3xl shadow-2xl object-cover"
              />
            </div>

            <div className="space-y-3">
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white">
                Sink
              </h1>

              <p className="text-xl sm:text-2xl lg:text-3xl font-medium text-foreground/90 max-w-2xl leading-relaxed">
                The high-performance desktop Spotify client rebuilt from scratch.
              </p>
            </div>

            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl leading-relaxed">
              Engineered from the ground up for instant startup, zero background bloat, and sound
              quality like no other. Built natively for pure speed.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3 w-full max-w-md">
              <InteractiveHoverButton
                className="bg-[#85c1ae] text-zinc-950 font-semibold w-full sm:w-auto shadow-lg shadow-[#85c1ae]/25"
                onClick={() => {
                  document.getElementById("notify")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                <span className="flex items-center justify-center gap-2">
                  <Bell className="h-4 w-4" /> Get Early Access
                </span>
              </InteractiveHoverButton>

              <button
                type="button"
                onClick={() => {
                  document.getElementById("performance")?.scrollIntoView({ behavior: "smooth" })
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-border/80 bg-background/60 hover:bg-muted font-medium text-sm transition-colors backdrop-blur-md w-full sm:w-auto text-zinc-200 cursor-pointer"
              >
                <Gauge className="h-4 w-4 text-[#85c1ae]" /> View Benchmarks
              </button>
            </div>

            {/* Spotify Affiliation Disclaimer Banner */}
            <p className="text-[11px] text-muted-foreground/80 max-w-xl pt-3">
              Independent desktop application. Not affiliated with, maintained, authorized,
              sponsored, or endorsed by Spotify AB.
            </p>
          </div>
        </section>

        {/* 2. Performance & Benchmarks Section (#performance) */}
        <section id="performance" className="py-16 sm:py-24 border-t border-border/60">
          <div className="flex flex-col space-y-3 mb-12 text-center max-w-3xl mx-auto">
            <Badge className="bg-[#85c1ae]/10 text-[#85c1ae] border-[#85c1ae]/30 mx-auto mb-1">
              Engineered for Speed
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              A Complete Rebuild for Pure Performance
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Official desktop clients consume hundreds of megabytes of RAM running bloated
              web-browser wrappers. Sink replaces them with a streamlined native desktop core that
              opens instantly and runs quietly in the background.
            </p>
          </div>

          {/* Simple, Scannable Benchmark Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {BENCHMARKS.slice(0, 3).map((item) => (
              <div
                key={item.metric}
                className="p-6 rounded-2xl border border-white/10 bg-background/60 backdrop-blur-md relative overflow-hidden group hover:border-[#85c1ae]/40 hover:shadow-xl hover:shadow-[#85c1ae]/5 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {item.metric}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#85c1ae]/15 text-[#85c1ae] border border-[#85c1ae]/30">
                    {item.highlight}
                  </span>
                </div>

                <div className="space-y-2.5 mb-4">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-medium text-zinc-300">Sink</span>
                    <span className="text-2xl sm:text-3xl font-extrabold text-[#85c1ae] font-mono">
                      {item.sink}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between text-xs text-muted-foreground pt-1.5 border-t border-white/5">
                    <span>Standard Client</span>
                    <span className="font-mono text-zinc-400">{item.official}</span>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Benchmark Comparison Table with horizontal scroll safeguard */}
          <div className="overflow-x-auto rounded-2xl border border-border/80 bg-background/50 backdrop-blur-md">
            <table className="w-full text-left text-sm min-w-[620px]">
              <thead className="border-b border-border/60 bg-muted/20 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="p-4 sm:p-5">Metric</th>
                  <th className="p-4 sm:p-5 text-[#85c1ae] font-bold bg-[#85c1ae]/10">
                    Sink Native Client
                  </th>
                  <th className="p-4 sm:p-5">Standard Electron Client</th>
                  <th className="p-4 sm:p-5">Advantage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40 font-mono text-xs sm:text-sm">
                {BENCHMARKS.map((b) => (
                  <tr key={b.metric} className="hover:bg-muted/10 transition-colors">
                    <td className="p-4 sm:p-5 font-sans font-medium text-foreground">{b.metric}</td>
                    <td className="p-4 sm:p-5 font-bold text-[#85c1ae] bg-[#85c1ae]/5">{b.sink}</td>
                    <td className="p-4 sm:p-5 text-muted-foreground">{b.official}</td>
                    <td className="p-4 sm:p-5 font-sans text-xs text-emerald-400 font-semibold">
                      {b.highlight}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 3. Features Section (#features) - Clean, uniform 2x3 grid */}
        <section id="features" className="py-16 sm:py-24 border-t border-border/60">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <Badge className="bg-[#85c1ae]/10 text-[#85c1ae] border-[#85c1ae]/30 mx-auto">
              Client Highlights
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Everything You Love, None of the Bloat
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Crafted for music lovers who appreciate pristine audio fidelity, instant
              responsiveness, and fluid media controls.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="p-6 sm:p-7 rounded-2xl border border-border/80 bg-background/60 backdrop-blur-md hover:border-[#85c1ae]/40 hover:shadow-xl hover:shadow-[#85c1ae]/5 transition-all duration-300 space-y-3 group"
              >
                <div className="h-11 w-11 rounded-xl bg-[#85c1ae]/10 text-[#85c1ae] flex items-center justify-center">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-foreground group-hover:text-[#85c1ae] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Notify Me / Waitlist Section (#notify) */}
        <section id="notify" className="py-16 sm:py-24 border-t border-border/60 text-center">
          <div className="rounded-3xl border border-[#85c1ae]/30 bg-gradient-to-b from-[#85c1ae]/10 via-background to-background p-6 sm:p-12 md:p-16 backdrop-blur-xl relative overflow-hidden max-w-3xl mx-auto shadow-2xl">
            <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-[#85c1ae]/20 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-[#5a9583]/20 blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-6 max-w-xl mx-auto">
              <span className="text-xs font-semibold uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-[#85c1ae]/40 bg-[#85c1ae]/10 text-[#85c1ae]">
                Closed Beta Release
              </span>

              <div className="space-y-2">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
                  Get Notified When Sink Launches
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  Sink is currently in closed development. Sign up to get early access and be the
                  first to receive build updates for macOS, Windows, and Linux.
                </p>
              </div>

              {isSubscribed ? (
                <div className="p-6 rounded-2xl bg-[#85c1ae]/15 border border-[#85c1ae]/40 space-y-2 animate-in fade-in zoom-in-95 duration-300">
                  <div className="flex items-center justify-center gap-2 text-[#85c1ae] font-bold text-lg">
                    <Check className="w-5 h-5" /> You're on the early access list!
                  </div>
                  <p className="text-xs text-muted-foreground">
                    We've saved <strong className="text-white">{email}</strong>. We'll send an
                    invite the moment beta testing opens.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <div className="flex flex-col sm:flex-row items-center gap-2.5 max-w-md mx-auto">
                    <div className="relative w-full">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address..."
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/60 border border-white/15 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#85c1ae] focus:border-transparent transition-all"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={subscribing}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#85c1ae] hover:bg-[#98c9b9] text-zinc-950 font-bold text-sm transition-all duration-200 shadow-lg shadow-[#85c1ae]/25 shrink-0 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {subscribing ? (
                        <span>Subscribing...</span>
                      ) : (
                        <>
                          <span>Notify Me</span>
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>
                  {subscribeError && (
                    <p className="text-xs text-red-400 text-center font-medium">{subscribeError}</p>
                  )}
                  <p className="text-[11px] text-zinc-500">
                    Closed-source private release. No spam, ever. Unsubscribe at any time.
                  </p>
                </form>
              )}

              {/* Compatibility Footnote */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-[#85c1ae]" /> macOS (.dmg)
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-[#85c1ae]" /> Windows (.msi)
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-[#85c1ae]" /> Linux (.AppImage)
                </span>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="max-w-2xl mx-auto pt-10 text-center text-xs text-zinc-500 leading-relaxed">
            <p>
              <strong>Disclaimer:</strong> Sink is an independent, third-party software application
              developed by xbl4z3r. Sink is not affiliated with, maintained, authorized, sponsored,
              or endorsed by Spotify AB or any of its affiliates. All Spotify brand marks, logos,
              and trademarks remain the sole property of Spotify AB.
            </p>
          </div>
        </section>
      </main>
    </>
  )
}
