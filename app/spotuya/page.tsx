"use client";

import React, { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { Navbar } from "@/components/navbar";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { RippleButton } from "@/components/magicui/ripple-button";
import { Particles } from "@/components/magicui/particles";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { AnimatedSpan, Terminal } from "@/components/magicui/terminal";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Activity,
    Check,
    Cloud,
    Download,
    Github,
    Lightbulb,
    Palette,
    Radio,
    RefreshCw,
    Shield,
    Sliders,
    Sparkles,
    TerminalSquare,
    Zap
} from "lucide-react";

// The 5 official palettes supported by SpoTuya's Palette.ts
const PALETTES = [
    { name: "Vibrant", hex: "#1DB954", description: "Brightest saturated artwork color" },
    { name: "Dark Vibrant", hex: "#0E6B2E", description: "Deep mood lighting with punchy saturation" },
    { name: "Light Vibrant", hex: "#43E67B", description: "Soft neon ambient glow" },
    { name: "Muted", hex: "#486B56", description: "Understated balanced natural tones" },
    { name: "Dark Muted", hex: "#1C3325", description: "Subtle nighttime accent backlight" },
];

export default function SpoTuyaPage() {
    const [isClient, setIsClient] = useState(false);
    const [activePaletteIndex, setActivePaletteIndex] = useState(0);
    const [activeCommandTab, setActiveCommandTab] = useState<"start" | "setup" | "list">("start");

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;

    const currentPalette = PALETTES[activePaletteIndex];

    return (
        <>
            <Navbar navbarData={siteConfig.pages.spotuya} accentColors={["#1db954", "#a2e59e"]} />
            <main className="container mx-auto px-6 max-w-7xl grow h-full">
                <Particles
                    className="absolute inset-0 z-0"
                    quantity={90}
                    ease={80}
                    color={"#1db954"}
                    refresh
                />

                {/* Hero Section */}
                <section
                    className="relative flex flex-col items-center justify-evenly min-h-[calc(100vh-4rem)] py-12"
                    id="home"
                >
                    <div className="flex flex-col max-w-5xl justify-evenly items-center text-center relative z-10 space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-xs font-medium text-emerald-400 backdrop-blur-md">
                            <Sparkles className="h-3.5 w-3.5" />
                            SpoTuya v2.2.0 • Tuya Cloud API & Spotify Integration
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 mb-6 group">
                                <div className="absolute -inset-4 rounded-3xl bg-emerald-500/25 blur-3xl group-hover:bg-emerald-500/35 transition-all duration-500" />
                                <img
                                    src="/spotuya.png"
                                    alt="SpoTuya Logo"
                                    className="relative z-10 w-full h-full object-contain drop-shadow-[0_20px_35px_rgba(29,185,84,0.3)] transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>

                            <h1 className="text-6xl md:text-7xl lg:text-8xl text-center font-bold gradient text-transparent bg-clip-text bg-gradient-to-r from-[#1db954] via-[#43e67b] to-[#a2e59e] p-2">
                                SpoTuya
                            </h1>
                            <p className="text-xl md:text-2xl text-center text-foreground/90 max-w-2xl mx-auto mt-2">
                                Smart lights synced to your music in real time. Powered by Tuya Cloud API, Spotify Web OAuth, and Node-Vibrant palette quantization.
                            </p>
                        </div>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md pt-2">
                            <InteractiveHoverButton
                                className="bg-[#1db954] w-full sm:w-auto"
                                onClick={() => window.open("/spotuya/download", "_blank")}
                            >
                                <span className="flex items-center gap-2">
                                    <Download className="h-4 w-4" /> Download v2.2.0
                                </span>
                            </InteractiveHoverButton>

                            <RippleButton
                                rippleColor="#1db954"
                                className="bg-muted hover:bg-muted/80 text-foreground transition-all duration-300 w-full sm:w-auto"
                                onClick={() => window.open("https://github.com/xbl4z3r/spotuya", "_blank")}
                            >
                                <span className="flex items-center gap-2">
                                    <Github className="h-4 w-4" /> View GitHub Repo
                                </span>
                            </RippleButton>
                        </div>

                        {/* Real Features Highlights */}
                        <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1.5">
                                <Check className="h-3.5 w-3.5 text-emerald-400" /> Cloud API (No LAN restriction)
                            </span>
                            <span className="flex items-center gap-1.5">
                                <RefreshCw className="h-3.5 w-3.5 text-emerald-400" /> Dynamic Remaining-Time Polling
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Palette className="h-3.5 w-3.5 text-emerald-400" /> 5 Vibrant Color Palettes + Auto-Cycle
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Activity className="h-3.5 w-3.5 text-emerald-400" /> Automatic Pause Reset
                            </span>
                        </div>
                    </div>
                </section>

                {/* Interactive Palette Simulator */}
                <section
                    className="relative flex flex-col items-center justify-center py-20"
                    id="simulator"
                >
                    <div className="w-full max-w-4xl rounded-2xl border border-emerald-500/20 bg-muted/20 p-6 md:p-10 backdrop-blur-xl relative overflow-hidden">
                        <div className="text-center max-w-xl mx-auto mb-8">
                            <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 mb-2">
                                Real Palette Modes
                            </Badge>
                            <h2 className="text-3xl md:text-4xl font-bold">Palette.ts in Action</h2>
                            <p className="text-sm text-muted-foreground mt-2">
                                SpoTuya extracts 5 distinct color harmonics from every track's artwork. Switch between them to see how your room responds.
                            </p>
                        </div>

                        {/* Simulated Room Ambiance */}
                        <div className="relative rounded-xl border border-border/80 bg-neutral-950 p-8 overflow-hidden min-h-[300px] flex flex-col items-center justify-center text-center transition-all duration-700">
                            {/* Dynamic Ambient Glow */}
                            <div
                                className="absolute inset-0 transition-all duration-700 pointer-events-none"
                                style={{
                                    background: `radial-gradient(circle at 50% 50%, ${currentPalette.hex}77 0%, transparent 70%)`,
                                    filter: "blur(40px)",
                                }}
                            />

                            {/* Center Virtual Smart Light */}
                            <div className="relative z-10 flex flex-col items-center gap-4">
                                <div
                                    className="h-20 w-20 rounded-full border-2 flex items-center justify-center transition-all duration-700 shadow-2xl"
                                    style={{
                                        backgroundColor: currentPalette.hex,
                                        borderColor: `${currentPalette.hex}dd`,
                                        boxShadow: `0 0 50px ${currentPalette.hex}aa`,
                                    }}
                                >
                                    <Lightbulb className="h-10 w-10 text-black/80 drop-shadow-md" />
                                </div>
                                <div className="space-y-1">
                                    <span className="font-bold text-xl text-white">Mode: {currentPalette.name}</span>
                                    <p className="text-xs font-mono text-white/70">
                                        Hex: {currentPalette.hex} • Tuya Payload: {currentPalette.description}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Palette Selector Buttons */}
                        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                            {PALETTES.map((palette, idx) => (
                                <button
                                    key={palette.name}
                                    onClick={() => setActivePaletteIndex(idx)}
                                    className={`p-3 rounded-xl border text-left transition-all duration-300 flex items-center gap-3 ${
                                        activePaletteIndex === idx
                                            ? "border-emerald-500 bg-emerald-500/10 shadow-sm ring-1 ring-emerald-500"
                                            : "border-border/60 bg-background/50 hover:bg-muted"
                                    }`}
                                >
                                    <span
                                        className="h-4 w-4 rounded-full shrink-0 border border-white/20"
                                        style={{ backgroundColor: palette.hex }}
                                    />
                                    <div className="overflow-hidden">
                                        <p className="text-xs font-bold truncate">{palette.name}</p>
                                        <p className="text-[10px] text-muted-foreground truncate">{palette.hex}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Actual CLI Terminal Showcase */}
                <section
                    className="relative flex flex-col items-center py-16"
                    id="cli"
                >
                    <div className="w-full max-w-4xl space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setActiveCommandTab("start")}
                                    className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                                        activeCommandTab === "start" ? "bg-emerald-500 text-black font-bold" : "bg-muted text-muted-foreground hover:text-foreground"
                                    }`}
                                >
                                    spotuya start
                                </button>
                                <button
                                    onClick={() => setActiveCommandTab("setup")}
                                    className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                                        activeCommandTab === "setup" ? "bg-emerald-500 text-black font-bold" : "bg-muted text-muted-foreground hover:text-foreground"
                                    }`}
                                >
                                    spotuya setup
                                </button>
                                <button
                                    onClick={() => setActiveCommandTab("list")}
                                    className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                                        activeCommandTab === "list" ? "bg-emerald-500 text-black font-bold" : "bg-muted text-muted-foreground hover:text-foreground"
                                    }`}
                                >
                                    spotuya list
                                </button>
                            </div>
                            <span className="text-xs text-emerald-400 font-mono flex items-center gap-1.5">
                                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                                CLI READY
                            </span>
                        </div>

                        {activeCommandTab === "start" && (
                            <Terminal className="bg-neutral-950 border border-neutral-800 text-white w-full">
                                <TypingAnimation>&gt; spotuya start</TypingAnimation>
                                <AnimatedSpan delay={400} className="text-emerald-400 font-mono text-[11px] sm:text-xs">
                                    <span>{"> Made with ♥ by xbl4z3r | v2.2.1 | Not affiliated with Spotify® or Tuya®"}</span>
                                </AnimatedSpan>
                                <AnimatedSpan delay={800} className="text-zinc-400 font-mono">
                                    <span>[SpoTuya - 17:05:01] Initializing Tuya Cloud API client (eu)...</span>
                                </AnimatedSpan>
                                <AnimatedSpan delay={1200} className="text-emerald-400 font-mono">
                                    <span>[SpoTuya - 17:05:02] Successfully loaded device Desk RGB Strip (bf84e62...).</span>
                                </AnimatedSpan>
                                <AnimatedSpan delay={1600} className="text-emerald-400 font-mono">
                                    <span>[SpoTuya - 17:05:02] Successfully loaded device Ceiling Bulb (bf391a2...).</span>
                                </AnimatedSpan>
                                <AnimatedSpan delay={2000} className="text-emerald-400 font-mono">
                                    <span>[SpoTuya - 17:05:02] Successfully loaded 2/2 devices.</span>
                                </AnimatedSpan>
                                <AnimatedSpan delay={2400} className="text-cyan-400 font-mono">
                                    <span>[SpoTuya - 17:05:02] Starting dynamic color sync with a base poll rate of 1000ms</span>
                                </AnimatedSpan>
                                <AnimatedSpan delay={2800} className="text-emerald-400 font-mono">
                                    <span>[SpoTuya - 17:05:03] SpoTuya has started successfully!</span>
                                </AnimatedSpan>
                                <AnimatedSpan delay={3300} className="text-white font-mono">
                                    <span>[SpoTuya - 17:05:04] Now Playing: "Starboy" by The Weeknd, Daft Punk</span>
                                </AnimatedSpan>
                                <AnimatedSpan delay={3700} className="text-emerald-400 font-mono">
                                    <span>[SpoTuya - 17:05:04] Extracted Vibrant palette #E02636 -&gt; HSV [355°, 83%, 88%]</span>
                                </AnimatedSpan>
                                <AnimatedSpan delay={4100} className="text-purple-400 font-mono">
                                    <span>[SpoTuya - 17:05:04] Applied color to 2 devices: Desk RGB Strip, Ceiling Bulb</span>
                                </AnimatedSpan>
                                <AnimatedSpan delay={4600} className="text-zinc-400 font-mono">
                                    <span>[SpoTuya - 17:05:08] Dynamic polling: next poll in 3s (45000/230453ms)</span>
                                </AnimatedSpan>
                            </Terminal>
                        )}

                        {activeCommandTab === "setup" && (
                            <Terminal className="bg-neutral-950 border border-neutral-800 text-white w-full">
                                <TypingAnimation>&gt; spotuya setup --devices --spotify --spotuya</TypingAnimation>
                                <AnimatedSpan delay={400} className="text-emerald-400 font-mono text-[11px] sm:text-xs">
                                    <span>{"> Made with ♥ by xbl4z3r | v2.2.1 | Not affiliated with Spotify® or Tuya®"}</span>
                                </AnimatedSpan>
                                <AnimatedSpan delay={900} className="text-cyan-400 font-mono">
                                    <span>? Enter your Tuya Cloud Client ID: ********************</span>
                                </AnimatedSpan>
                                <AnimatedSpan delay={1400} className="text-cyan-400 font-mono">
                                    <span>? Enter your Tuya Cloud Secret: ********************</span>
                                </AnimatedSpan>
                                <AnimatedSpan delay={1900} className="text-cyan-400 font-mono">
                                    <span>? Select your Tuya Cloud Region: Central Europe (eu)</span>
                                </AnimatedSpan>
                                <AnimatedSpan delay={2400} className="text-emerald-400 font-mono">
                                    <span>[SpoTuya - 17:00:14] Successfully imported 2 devices from Tuya Cloud!</span>
                                </AnimatedSpan>
                                <AnimatedSpan delay={2900} className="text-cyan-400 font-mono">
                                    <span>? Enter your Spotify Client ID: ********************</span>
                                </AnimatedSpan>
                                <AnimatedSpan delay={3400} className="text-cyan-400 font-mono">
                                    <span>? Enter your Spotify Client Secret: ********************</span>
                                </AnimatedSpan>
                                <AnimatedSpan delay={3900} className="text-zinc-400 font-mono">
                                    <span>[SpoTuya - 17:00:20] Opening Spotify OAuth login in default browser...</span>
                                </AnimatedSpan>
                                <AnimatedSpan delay={4400} className="text-emerald-400 font-mono">
                                    <span>[SpoTuya - 17:00:26] Successfully saved your Spotify credentials!</span>
                                </AnimatedSpan>
                                <AnimatedSpan delay={4900} className="text-cyan-400 font-mono">
                                    <span>? Polling mode: dynamic</span>
                                </AnimatedSpan>
                                <AnimatedSpan delay={5300} className="text-emerald-400 font-mono">
                                    <span>[SpoTuya - 17:00:30] Successfully set up configuration! Run `spotuya start` to begin.</span>
                                </AnimatedSpan>
                            </Terminal>
                        )}

                        {activeCommandTab === "list" && (
                            <Terminal className="bg-neutral-950 border border-neutral-800 text-white w-full">
                                <TypingAnimation>&gt; spotuya list</TypingAnimation>
                                <AnimatedSpan delay={400} className="text-emerald-400 font-mono text-[11px] sm:text-xs">
                                    <span>{"> Made with ♥ by xbl4z3r | v2.2.1 | Not affiliated with Spotify® or Tuya®"}</span>
                                </AnimatedSpan>
                                <AnimatedSpan delay={800} className="text-zinc-400 font-mono">
                                    <span>Configured Tuya Devices:</span>
                                </AnimatedSpan>
                                <AnimatedSpan delay={1300} className="text-emerald-400 font-mono">
                                    <span>  1. Desk RGB Strip (ID: bf84e62a149f | Type: strip | Status: online)</span>
                                </AnimatedSpan>
                                <AnimatedSpan delay={1800} className="text-emerald-400 font-mono">
                                    <span>  2. Ceiling Bulb (ID: bf391a27e02b | Type: bulb | Status: online)</span>
                                </AnimatedSpan>
                                <AnimatedSpan delay={2300} className="text-zinc-400 font-mono">
                                    <span>Data Provider: Spotify Web API (Dynamic Polling, 1000ms base)</span>
                                </AnimatedSpan>
                                <AnimatedSpan delay={2800} className="text-zinc-400 font-mono">
                                    <span>Default Palette Mode: 0 (Vibrant)</span>
                                </AnimatedSpan>
                            </Terminal>
                        )}
                    </div>
                </section>

                {/* Architecture & Real Features */}
                <section
                    className="py-16"
                    id="about"
                >
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 mb-2">
                            How It Works
                        </Badge>
                        <h2 className="text-4xl font-bold">Built for Real Smart Homes</h2>
                        <p className="text-muted-foreground mt-2 text-sm md:text-base">
                            Everything you need to know about SpoTuya’s architecture and installation.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="border border-border/80 bg-background/50 backdrop-blur-sm p-6">
                            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
                                <Cloud className="h-5 w-5" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Tuya Cloud API v2.0</h3>
                            <p className="text-sm text-muted-foreground">
                                Rewritten in v2.0 to use official Tuya Cloud OpenAPI endpoints. No local Wi-Fi pairing or developer board needed. Run it from any cloud VM, VPS, or desktop.
                            </p>
                        </Card>

                        <Card className="border border-border/80 bg-background/50 backdrop-blur-sm p-6">
                            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
                                <Radio className="h-5 w-5" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Dynamic Poll Rate</h3>
                            <p className="text-sm text-muted-foreground">
                                Prevents rate limits by querying Spotify’s playback endpoint dynamically based on remaining track duration, checking instantly when tracks change.
                            </p>
                        </Card>

                        <Card className="border border-border/80 bg-background/50 backdrop-blur-sm p-6">
                            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
                                <Sliders className="h-5 w-5" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Custom Data APIs (v2.2.0)</h3>
                            <p className="text-sm text-muted-foreground">
                                Supports custom REST data providers conforming to the <code className="text-xs bg-muted px-1 py-0.5 rounded font-mono">NowPlaying</code> interface. Share one sync instance across multiple machines!
                            </p>
                        </Card>
                    </div>
                </section>
            </main>
        </>
    );
}