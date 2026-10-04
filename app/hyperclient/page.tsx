"use client"

import React, { useEffect, useState } from "react"
import { siteConfig } from "@/config/site"
import { Navbar } from "@/components/navbar"
import { LineShadowText } from "@/components/magicui/line-shadow-text"
import { useTheme } from "next-themes"
import { Ripple } from "@/components/magicui/ripple"
import { TextReveal } from "@/components/magicui/text-reveal"
import {
  Activity,
  Check,
  Cpu,
  Download,
  Eye,
  Gamepad2,
  GaugeIcon,
  Layers,
  Lock,
  PackageIcon,
  PaintbrushIcon,
  Server,
  ShieldCheck,
  Sliders,
  Sparkles,
  UserCheck,
  Zap,
  MousePointer2,
  ExternalLink,
} from "lucide-react"
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button"
import { RippleButton } from "@/components/magicui/ripple-button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Real versions supported in HyperClient
const SUPPORTED_VERSIONS = [
  {
    version: "1.8.9",
    tag: "PvP Edition",
    desc: "Classic competitive 1.8 combat, 1.7 blockhit animations, low input lag, and optimized hit registration.",
  },
  {
    version: "1.16.5",
    tag: "Nether Update",
    desc: "Modern shield combat, Nether survival optimizations, and high-framerate rendering pipelines.",
  },
  {
    version: "1.20+",
    tag: "Modern Release",
    desc: "Full shader pack support, modern block rendering, and reduced memory garbage collection overhead.",
  },
]

// User-friendly launcher benefits (no technical jargon or useless sliders)
const LAUNCHER_FEATURES = [
  {
    title: "Account Manager",
    desc: "Switch between multiple Microsoft and Mojang Minecraft accounts with secure token storage.",
    icon: UserCheck,
  },
  {
    title: "Automated Setup",
    desc: "Downloads game files, client assets, and Java runtimes automatically with one click.",
    icon: Download,
  },
  {
    title: "Optimized Performance",
    desc: "Pre-configured memory allocation and runtime flags tuned to eliminate micro-stutters.",
    icon: Zap,
  },
  {
    title: "Instant Version Switcher",
    desc: "Switch between 1.8.9 competitive PvP and modern survival profiles with zero configuration friction.",
    icon: Layers,
  },
]

// In-Game Suite Feature Cards
const CLIENT_FEATURES = [
  {
    title: "30+ Competitive PvP Mods",
    tag: "HUD & Combat",
    description:
      "Keystrokes with live CPS counters, Armor Status, Potion Effects, Direction HUD, AutoGG, and custom crosshairs.",
    icon: PaintbrushIcon,
    glowColor: "group-hover:border-cyan-500/50",
  },
  {
    title: "High-FPS Rendering Pipeline",
    tag: "Optimization",
    description:
      "Engineered on modern Fabric architecture with Sodium integration to deliver 300+ FPS on any hardware configuration.",
    icon: GaugeIcon,
    glowColor: "group-hover:border-blue-500/50",
  },
  {
    title: "Synchronized Cosmetics",
    tag: "Customization",
    description:
      "Custom animated capes, wings, bandanas, and cosmetics visible to all Hyper Client players globally across any server.",
    icon: PackageIcon,
    glowColor: "group-hover:border-purple-500/50",
  },
  {
    title: "Drag-and-Drop HUD Editor",
    tag: "Interface",
    description:
      "Intuitive in-game GUI with snap-to-grid, customizable scaling, color pickers, and live module previews.",
    icon: MousePointer2,
    glowColor: "group-hover:border-teal-500/50",
  },
]

export default function HyperClientPage() {
  const theme = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const shadowColor = mounted ? (theme.resolvedTheme === "dark" ? "white" : "black") : "transparent"

  return (
    <>
      <Navbar navbarData={siteConfig.pages.hyperclient} accentColors={["#3398db", "#a3f4ff"]} />
      <main className="container mx-auto max-w-7xl grow h-full px-4 sm:px-6">
        {/* Hero Section */}
        <section
          className="relative flex flex-col items-center justify-center bg-background min-h-[calc(100vh-5rem)] py-16"
          id="home"
        >
          <Ripple mainCircleSize={700} className="z-0" />
          <div className="relative z-10 flex flex-col max-w-4xl w-full items-center justify-center text-center space-y-6">
            <div className="relative w-28 h-28 md:w-36 md:h-36 group">
              <div className="absolute inset-0 rounded-3xl bg-cyan-500/25 blur-2xl group-hover:bg-cyan-500/40 transition-all duration-500" />
              <img
                src="/hyperclient.png"
                alt="Hyper Client Logo"
                className="relative z-10 w-full h-full object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-xs font-semibold text-cyan-400 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Hyper Client v3.0 • Multi-Version PvP Suite</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-6xl md:text-7xl lg:text-8xl text-center font-bold gradient text-transparent bg-clip-text bg-gradient-to-r from-[#3398db] via-[#68c7f9] to-[#a3f4ff] p-1 tracking-tight">
                Hyper Client
              </h1>

              <div className="flex flex-wrap items-center justify-center">
                <p className="text-lg md:text-xl lg:text-2xl text-foreground/90 max-w-2xl leading-relaxed">
                  A{" "}
                  <LineShadowText className="italic" shadowColor={shadowColor}>
                    modern
                  </LineShadowText>
                  ,{" "}
                  <LineShadowText className="italic" shadowColor={shadowColor}>
                    optimized
                  </LineShadowText>{" "}
                  Minecraft PvP client with a custom desktop launcher and in-game HUD modules.
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md pt-2">
              <InteractiveHoverButton
                className="bg-[#3398db] w-full sm:w-auto shadow-lg shadow-cyan-500/25"
                onClick={() =>
                  window.open("https://github.com/xbl4z3r/hyperclient/releases", "_blank")
                }
              >
                <span className="flex items-center justify-center gap-2 font-semibold">
                  <Download className="h-4 w-4" /> Download Launcher
                </span>
              </InteractiveHoverButton>

              <RippleButton
                rippleColor="#3398db"
                className="bg-muted hover:bg-muted/80 text-foreground transition-all duration-300 w-full sm:w-auto"
                onClick={() => window.open("https://github.com/xbl4z3r/hyperclient", "_blank")}
              >
                <span className="flex items-center gap-2">
                  View on GitHub
                  <ExternalLink className="h-3.5 w-3.5 opacity-60" />
                </span>
              </RippleButton>
            </div>

            {/* Compatibility Badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-cyan-400" /> Windows, macOS &amp; Linux
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> Server Friendly (No Cheats)
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-yellow-400" /> Automatic Java Bundling
              </span>
            </div>
          </div>
        </section>

        {/* Big Statement Reveal */}
        <section className="relative flex flex-col items-center justify-center bg-background py-16 border-y border-border/40">
          <TextReveal>Hyper Client will change the way you play Minecraft.</TextReveal>
        </section>

        {/* Multi-Version Support Showcase */}
        <section className="py-20" id="versions">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30 mb-2">
              Multi-Version Support
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Built for Every Playstyle
            </h2>
            <p className="text-muted-foreground mt-2 text-sm md:text-base">
              Optimized client builds tailored for competitive 1.8.9 PvP through modern survival
              releases.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SUPPORTED_VERSIONS.map((item) => (
              <Card
                key={item.version}
                className="border border-border/80 bg-background/60 backdrop-blur-md p-6 hover:border-cyan-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/5 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold font-mono text-cyan-400 group-hover:text-cyan-300 transition-colors">
                    MC {item.version}
                  </span>
                  <Badge className="bg-cyan-500/20 text-cyan-300 border-0 font-medium">
                    {item.tag}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Custom Desktop Launcher Showcase (Clean, user-friendly, no confusing sliders) */}
        <section className="py-20 border-t border-border/60" id="launcher">
          <div className="rounded-3xl border border-cyan-500/20 bg-muted/20 p-6 sm:p-10 md:p-12 relative overflow-hidden backdrop-blur-xl">
            <div className="max-w-2xl mb-10">
              <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30 mb-2">
                Desktop Launcher
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Custom Desktop Launcher
              </h2>
              <p className="text-muted-foreground mt-2 text-sm sm:text-base leading-relaxed">
                A clean, lightweight companion application designed for fast startup, seamless
                account management, and one-click version launching.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {LAUNCHER_FEATURES.map((item) => (
                <div
                  key={item.title}
                  className="p-5 rounded-2xl border border-border/60 bg-background/60 backdrop-blur-md space-y-3 hover:border-cyan-500/30 transition-all duration-200"
                >
                  <div className="h-10 w-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-base tracking-tight">{item.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* In-Game Suite Features Section (Clean, responsive layout with no overlapping text) */}
        <section className="py-20 border-t border-border/60" id="features">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30 mb-2">
              In-Game Suite
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              Built by a Player, for Players
            </h2>
            <p className="text-muted-foreground mt-3 text-sm md:text-base leading-relaxed">
              Complete control over your HUD elements, crosshairs, visual effects, and performance
              without installing dozens of individual mods.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CLIENT_FEATURES.map((feature) => (
              <div
                key={feature.title}
                className={`group relative p-6 sm:p-8 rounded-2xl border border-border/80 bg-background/60 backdrop-blur-md transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/5 ${feature.glowColor}`}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="h-12 w-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <span className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                    {feature.tag}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 text-foreground group-hover:text-cyan-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Call to Action */}
        <section className="py-20 text-center border-t border-border/60">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-5xl font-bold gradient text-transparent bg-clip-text bg-gradient-to-r from-[#3398db] to-[#a3f4ff]">
              Ready to Boost Your FPS?
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Download Hyper Client today for smooth hit-registration, customizable HUD modules, and
              zero bloat.
            </p>
            <div className="pt-2 flex justify-center">
              <InteractiveHoverButton
                className="bg-[#3398db] shadow-lg shadow-cyan-500/25"
                onClick={() =>
                  window.open("https://github.com/xbl4z3r/hyperclient/releases", "_blank")
                }
              >
                <span className="flex items-center gap-2 font-semibold">
                  <Download className="h-4 w-4" /> Download Hyper Client
                </span>
              </InteractiveHoverButton>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
