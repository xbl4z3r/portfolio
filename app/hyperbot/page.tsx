"use client";

import React, { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { Navbar } from "@/components/navbar";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import { LineShadowText } from "@/components/magicui/line-shadow-text";
import { useTheme } from "next-themes";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { RippleButton } from "@/components/magicui/ripple-button";
import { VelocityScroll } from "@/components/magicui/scroll-based-velocity";
import {
    Activity,
    Coins,
    Crown,
    Flame,
    GaugeIcon,
    HammerIcon,
    MessageCircleHeartIcon,
    MusicIcon,
    Radio,
    Shield,
    Sparkles,
    Terminal,
    UserCheck,
    Volume2,
    SkipForward,
    Play,
    Pause,
    Shuffle,
    Repeat,
    ExternalLink
} from "lucide-react";
import { FeatureCard } from "@/components/magicui/feature-card";
import { Card, CardContent } from "@/components/ui/card";
import { ShineBorder } from "@/components/magicui/shine-border";
import { AnimatedNumber } from "@/components/animated-number";
import { Marquee } from "@/components/magicui/marquee";
import { ReviewCard } from "@/components/magicui/review-card";
import { Badge } from "@/components/ui/badge";

// Authentic commands directly from xbl4z3r/hyperbot repository
interface DiscordCommand {
    command: string;
    category: string;
    output: {
        title: string;
        color: string;
        description: string;
        fields?: { name: string; value: string; inline?: boolean }[];
        progressBar?: { current: string; total: string; percent: number };
        buttons?: { label: string; icon?: React.ReactNode; style?: "primary" | "secondary" | "success" | "danger" }[];
        footer: string;
    };
}

const DISCORD_COMMANDS: DiscordCommand[] = [
    {
        command: "/nowplaying",
        category: "Music",
        output: {
            title: "🎵 Now Playing",
            color: "border-l-[#5865F2]",
            description: "Currently streaming high-fidelity audio directly into voice channel.",
            fields: [
                { name: "Track", value: "Post Malone - Chemical", inline: true },
                { name: "Requested By", value: "<@xbl4z3r>", inline: true },
                { name: "Volume", value: "50%", inline: true }
            ],
            progressBar: { current: "1:15", total: "3:33", percent: 35 },
            buttons: [
                { label: "Previous", icon: <Repeat className="w-3.5 h-3.5" />, style: "secondary" },
                { label: "Pause", icon: <Pause className="w-3.5 h-3.5" />, style: "primary" },
                { label: "Skip", icon: <SkipForward className="w-3.5 h-3.5" />, style: "secondary" },
                { label: "Shuffle", icon: <Shuffle className="w-3.5 h-3.5" />, style: "secondary" }
            ],
            footer: "HyperBot Music Engine • Lavalink Audio Node #1"
        }
    },
    {
        command: "/daily",
        category: "Economy",
        output: {
            title: "🪙 | Daily Reward Claimed",
            color: "border-l-emerald-500",
            description: "You have successfully collected your daily reward allowance!\nCome back in **24 hours** to continue your login streak.",
            fields: [
                { name: "Reward Collected", value: "**+135 coins**", inline: true },
                { name: "Streak Multiplier", value: "🔥 **4 Days** (1.25x)", inline: true },
                { name: "New Balance", value: "🪙 **1,420 coins**", inline: true }
            ],
            buttons: [
                { label: "View Balance (/balance)", style: "secondary" },
                { label: "Visit Server Shop", style: "primary" }
            ],
            footer: "HyperBot Economy • Persistent MongoDB Storage"
        }
    },
    {
        command: "/ping",
        category: "Status",
        output: {
            title: "🏓 Pong! Cluster Latency",
            color: "border-l-purple-500",
            description: "Bot websocket heartbeat and Discord API roundtrip metrics.",
            fields: [
                { name: "API Latency", value: "⚡ **38 ms**", inline: true },
                { name: "Websocket Heartbeat", value: "💓 **19 ms**", inline: true },
                { name: "Cluster Shard", value: "#1 of 4", inline: true }
            ],
            footer: "HyperBot Cluster • 99.98% Uptime"
        }
    },
    {
        command: "/help command: play",
        category: "Help",
        output: {
            title: "📖 Command Details: /play",
            color: "border-l-blue-500",
            description: "Search and play any track, album, or playlist from YouTube, Spotify, or SoundCloud directly inside your current voice channel.",
            fields: [
                { name: "Usage", value: "`/play <query or url>`", inline: true },
                { name: "Permissions", value: "Connect, Speak", inline: true },
                { name: "Cooldown", value: "2.0s", inline: true }
            ],
            buttons: [
                { label: "Invite HyperBot", icon: <ExternalLink className="w-3.5 h-3.5" />, style: "primary" },
                { label: "Support Discord", style: "secondary" }
            ],
            footer: "Made with ❤️ by xbl4z3r • Slash Commands v14"
        }
    },
    {
        command: "/purge amount: 25",
        category: "Moderation",
        output: {
            title: "🧹 Bulk Message Cleanup",
            color: "border-l-emerald-500",
            description: "Channel moderation action executed successfully by staff.",
            fields: [
                { name: "Messages Purged", value: "**25 messages**", inline: true },
                { name: "Target Channel", value: "#general", inline: true },
                { name: "Audit Reason", value: "Automated queue maintenance", inline: true }
            ],
            footer: "Executed by xbl4z3r#0001 • Only you can see this message"
        }
    }
];

const features = [
    {
        name: "Lavalink Music Engine",
        description: "High-fidelity audio streaming with YouTube, Spotify, and SoundCloud playback, dynamic queues, volume normalization, and filters.",
        className: "col-span-1",
        background: (<div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent rounded-lg" />),
        icon: <MusicIcon className="text-purple-400" />
    },
    {
        name: "Full Server Economy",
        description: "Dynamic economy system with bank accounts, daily bonuses, roulette, blackjack, coin transfers, and server leaderboards.",
        className: "col-span-1",
        background: (<div className="absolute inset-0 bg-gradient-to-br from-purple-800/20 to-transparent rounded-lg" />),
        icon: <Coins className="text-amber-400" />
    },
    {
        name: "Chat & Voice Leveling",
        description: "Rewards active members with experience points, customizable level-up cards, and automated progression roles.",
        className: "col-span-1",
        background: (<div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent rounded-lg" />),
        icon: <Crown className="text-cyan-400" />
    },
    {
        name: "Sharded High Availability",
        description: "Built with Discord.js v14 and sharded clustering across multiple servers to guarantee 99.9% uptime with sub-40ms response.",
        className: "col-span-1",
        background: (<div className="absolute inset-0 bg-gradient-to-br from-purple-700/20 to-transparent rounded-lg" />),
        icon: <GaugeIcon className="text-emerald-400" />
    },
    {
        name: "Automated Moderation",
        description: "Intelligent spam filtering, raid mitigation, mass-mention safeguards, warning systems, and detailed staff audit logging.",
        className: "col-span-1",
        background: (<div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-transparent rounded-lg" />),
        icon: <Shield className="text-red-400" />
    },
    {
        name: "Custom Server Utility",
        description: "Role management, custom welcome embeds, poll creation, reminders, and self-assignable reaction roles.",
        className: "col-span-1",
        background: (<div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-transparent rounded-lg" />),
        icon: <HammerIcon className="text-pink-400" />
    }
];

const reviews = [
    {
        name: "Luke",
        username: "@luke333z",
        body: "One of the best bots I've ever used. It has everything you need and more.",
        img: "/users/luke333z.webp",
        rating: 5,
    },
    {
        name: "!Sk1te_.",
        username: "@sk1te_.",
        body: "Love your bot , it has many useful features and isn't buggy, unlike other bots i have tried for my discord server! I recommend it to all of you !<3",
        img: "/users/sk1te.webp",
        rating: 5,
    },
    {
        name: "Bogz",
        username: "@bogz06",
        body: "good bot! i like it",
        img: "/users/bogz06.webp",
        rating: 4,
    },
    {
        name: "Antoke",
        username: "@mihaigoodman",
        body: "great overall bot, has a lot of features and is very easy to use, would recommend",
        img: "/users/mihaigoodman.webp",
        rating: 4,
    },
    {
        name: "Vlod",
        username: "@vlod_",
        body: "easy to use my members love itt",
        img: "/users/vlod_.webp",
        rating: 5,
    },
    {
        name: "razvan",
        username: "@razvan_24",
        body: "Great bot, has a lot of features and is very easy to use. Would recommend.",
        img: "/users/razvan_24.webp",
        rating: 4,
    }
];

// Discord Markdown Parser Component
function DiscordMarkdown({ text }: { text: string }) {
    const lines = text.split("\n");
    return (
        <div className="space-y-1">
            {lines.map((line, lIdx) => {
                const parts = line.split(/(\*\*.*?\*\*|<@.*?>|`.*?`)/g);
                return (
                    <div key={lIdx} className="leading-relaxed">
                        {parts.map((part, pIdx) => {
                            if (part.startsWith("**") && part.endsWith("**")) {
                                return (
                                    <strong key={pIdx} className="font-semibold text-white">
                                        {part.slice(2, -2)}
                                    </strong>
                                );
                            }
                            if (part.startsWith("<@") && part.endsWith(">")) {
                                const username = part.slice(2, -1);
                                return (
                                    <span
                                        key={pIdx}
                                        className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] bg-[#5865F2]/20 text-[#c9cdfb] font-medium"
                                    >
                                        @{username}
                                    </span>
                                );
                            }
                            if (part.startsWith("`") && part.endsWith("`")) {
                                return (
                                    <code key={pIdx} className="px-1.5 py-0.5 rounded bg-[#1e1f22] text-[#e0e1e5] font-mono text-[11px]">
                                        {part.slice(1, -1)}
                                    </code>
                                );
                            }
                            return <span key={pIdx}>{part}</span>;
                        })}
                    </div>
                );
            })}
        </div>
    );
}

export default function HyperBotPage() {
    const theme = useTheme();
    const [mounted, setMounted] = useState(false);
    const [selectedCommandIndex, setSelectedCommandIndex] = useState(0);

    const [userCount, setUserCount] = useState(0);
    const [guildCount, setGuildCount] = useState(0);

    useEffect(() => {
        setMounted(true);
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        setUserCount(15000);
                        setGuildCount(50);
                    }, 100);
                }
            });
        });
        const el = document.getElementById("userCountCard");
        if (el) {
            observer.observe(el);
        }
        return () => observer.disconnect();
    }, []);

    const shadowColor = mounted ? (theme.resolvedTheme === "dark" ? "white" : "black") : "transparent";
    const activeCommand = DISCORD_COMMANDS[selectedCommandIndex];

    return (
        <>
            <Navbar navbarData={siteConfig.pages.hyperbot} accentColors={["#c754fb", "#db7dfa"]} />
            <main className="container mx-auto px-4 sm:px-6 max-w-7xl grow h-full">
                {/* Hero Section */}
                <section
                    className="relative flex flex-col items-center justify-center bg-background min-h-[calc(100vh-5rem)] py-16"
                    id="home"
                >
                    <AnimatedGridPattern
                        numSquares={30}
                        maxOpacity={0.1}
                        duration={3}
                        repeatDelay={1}
                        className={cn(
                            "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
                            "inset-x-0 skew-y-12",
                        )}
                    />
                    <div className="flex flex-col max-w-4xl justify-center items-center text-center relative z-10 space-y-6">
                        <div className="relative w-32 h-32 md:w-40 md:h-40 group">
                            <div className="absolute inset-0 rounded-3xl bg-purple-500/25 blur-2xl group-hover:bg-purple-500/40 transition-all duration-500" />
                            <img
                                src="/hyperbot.png"
                                alt="Hyper Bot Logo"
                                className="relative z-10 w-full h-full object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>

                        <div className="space-y-3">
                            <h1 className="text-5xl sm:text-7xl lg:text-8xl text-center font-bold gradient text-transparent bg-clip-text bg-gradient-to-r from-[#c754fb] via-[#d369fb] to-[#db7dfa] p-1 tracking-tight">
                                Hyper Bot
                            </h1>
                            <div className="flex flex-wrap items-center justify-center">
                                <p className="text-xl md:text-2xl lg:text-3xl text-center text-foreground/90 max-w-2xl leading-relaxed">
                                    A <LineShadowText className="italic" shadowColor={shadowColor}>fast</LineShadowText>, sharded multipurpose Discord application for music, economy, leveling, and moderation.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md pt-4">
                            <InteractiveHoverButton
                                className="bg-[#c754fb] w-full sm:w-auto shadow-lg shadow-purple-500/25"
                                onClick={() => window.open("/hyperbot/invite", "_blank")}
                            >
                                Invite Hyper Bot
                            </InteractiveHoverButton>

                            <RippleButton
                                rippleColor="#c754fb"
                                className="bg-muted hover:bg-muted/80 text-foreground transition-all duration-300 w-full sm:w-auto"
                                onClick={() => window.open("/hyperbot/vote", "_blank")}
                            >
                                Vote on Top.gg
                            </RippleButton>
                        </div>
                    </div>
                </section>

                {/* Animated Marquee Separator */}
                <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-6 border-y border-border/40">
                    <VelocityScroll>Hyper Bot • Discord.js v14 • Sharded Music &amp; Economy • </VelocityScroll>
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background" />
                </div>

                {/* About & Stats Section */}
                <section
                    className="flex flex-col items-center justify-center bg-background py-20 w-full"
                    id="about"
                >
                    <div className="flex flex-col gap-4 max-w-3xl text-center mb-12">
                        <span className="text-xs font-semibold uppercase tracking-widest text-purple-400">
                            Community Trusted
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold gradient text-transparent bg-clip-text bg-gradient-to-r from-[#c754fb] to-[#db7dfa]">
                            Reliable &amp; Feature-Rich
                        </h2>
                        <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                            With over 7 years of active development, Hyper Bot has grown into a trusted companion for dozens of Discord servers and thousands of members. No premium paywalls or gated commands — completely free.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl">
                        <Card
                            id="userCountCard"
                            className="overflow-hidden backdrop-blur-md relative transition-all duration-300 hover:translate-y-[-4px] hover:shadow-[0_20px_30px_-10px_#c754fb30]"
                        >
                            <ShineBorder shineColor={["#c754fb"]} className="absolute inset-0 rounded-lg" />
                            <CardContent className="p-6 text-center flex flex-col items-center justify-center">
                                <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Total Served Members</span>
                                <div className="text-4xl md:text-5xl font-extrabold tracking-tight text-purple-400 font-mono tabular-nums whitespace-nowrap">
                                    <AnimatedNumber value={userCount} stiffness={10} />
                                    <span>+</span>
                                </div>
                                <span className="text-xs text-muted-foreground/80 mt-1 font-medium">Discord Users</span>
                            </CardContent>
                        </Card>

                        <Card className="overflow-hidden backdrop-blur-md relative transition-all duration-300 hover:translate-y-[-4px] hover:shadow-[0_20px_30px_-10px_#db7dfa30]">
                            <ShineBorder shineColor={["#db7dfa"]} className="absolute inset-0 rounded-lg" />
                            <CardContent className="p-6 text-center flex flex-col items-center justify-center">
                                <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Active Discord Servers</span>
                                <div className="text-4xl md:text-5xl font-extrabold tracking-tight text-pink-400 font-mono tabular-nums whitespace-nowrap">
                                    <AnimatedNumber value={guildCount} stiffness={10} />
                                    <span>+</span>
                                </div>
                                <span className="text-xs text-muted-foreground/80 mt-1 font-medium">Guilds &amp; Communities</span>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-20 border-t border-border/60" id="features">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/30 mb-2">
                            Command Suite
                        </Badge>
                        <h2 className="text-4xl font-bold tracking-tight">Everything Your Server Needs</h2>
                        <p className="text-muted-foreground mt-2 text-sm md:text-base">
                            Built with modular command handlers, real-time event listeners, and persistent MongoDB schemas.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature) => (
                            <FeatureCard key={feature.name} {...feature} />
                        ))}
                    </div>
                </section>

                {/* Discord Slash Command Demonstration */}
                <section className="py-20 border-t border-border/60" id="commands">
                    <div className="w-full max-w-4xl mx-auto rounded-2xl border border-purple-500/20 bg-muted/20 p-5 sm:p-8 md:p-10 backdrop-blur-xl relative overflow-hidden">
                        <div className="text-center max-w-xl mx-auto mb-8">
                            <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/30 mb-2">
                                Command Demonstration
                            </Badge>
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Discord Command Demonstration</h2>
                            <p className="text-sm text-muted-foreground mt-2">
                                Preview how HyperBot executes commands and formats rich responses inside Discord.
                            </p>
                        </div>

                        {/* Command selector tabs */}
                        <div className="flex flex-wrap gap-2 justify-center mb-8">
                            {DISCORD_COMMANDS.map((item, idx) => (
                                <button
                                    key={item.command}
                                    onClick={() => setSelectedCommandIndex(idx)}
                                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono transition-all duration-200 cursor-pointer ${
                                        selectedCommandIndex === idx
                                            ? "bg-purple-600 text-white font-bold shadow-lg shadow-purple-600/30 scale-[1.02]"
                                            : "bg-background/80 border border-border/70 text-muted-foreground hover:text-foreground hover:bg-muted/40"
                                    }`}
                                >
                                    <span className="font-bold">{item.command.split(" ")[0]}</span>
                                    <span className="text-[10px] opacity-75 px-1.5 py-0.5 rounded bg-black/30 font-sans">
                                        {item.category}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* Discord Chat Container Mockup */}
                        <div className="rounded-xl border border-[#1e1f22] bg-[#313338] p-4 sm:p-6 font-sans text-[#dbdee1] space-y-3.5 shadow-2xl overflow-hidden">
                            {/* User slash command trigger indication */}
                            <div className="flex items-center gap-2 text-xs text-[#949ba4] font-medium pl-1">
                                <div className="w-4 h-4 rounded-full bg-neutral-600 flex items-center justify-center text-[10px] text-white">
                                    👤
                                </div>
                                <span><strong className="text-[#f2f3f5] font-semibold">User</strong> used</span>
                                <span className="px-1.5 py-0.5 rounded bg-[#2b2d31] text-[#c9cdfb] font-mono text-[11px] font-semibold">
                                    {activeCommand.command}
                                </span>
                            </div>

                            {/* Message Header with Bot Info */}
                            <div className="flex items-start gap-3 pt-1">
                                <img
                                    src="/hyperbot.png"
                                    alt="Hyper Bot"
                                    className="h-10 w-10 rounded-full bg-neutral-900 border border-purple-500/40 shrink-0 mt-0.5"
                                />
                                <div className="flex-1 min-w-0 space-y-3">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="font-semibold text-sm text-[#f2f3f5]">Hyper Bot</span>
                                        <span className="px-1.5 py-0.2 rounded text-[10px] bg-[#5865F2] text-white font-bold tracking-wide">
                                            BOT
                                        </span>
                                        <span className="text-[11px] text-[#949ba4]">Today at 12:00 PM</span>
                                    </div>

                                    {/* Discord Embed */}
                                    <div className={`rounded-lg bg-[#2b2d31] p-4 border-l-4 ${activeCommand.output.color} space-y-3 shadow-md max-w-xl`}>
                                        <h4 className="font-bold text-base text-white tracking-tight">
                                            {activeCommand.output.title}
                                        </h4>

                                        <div className="text-xs text-[#dbdee1] leading-relaxed">
                                            <DiscordMarkdown text={activeCommand.output.description} />
                                        </div>

                                        {/* Optional Progress Bar (for music) */}
                                        {activeCommand.output.progressBar && (
                                            <div className="space-y-1.5 pt-1">
                                                <div className="w-full h-1.5 bg-[#4e5058] rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-white rounded-full transition-all duration-300"
                                                        style={{ width: `${activeCommand.output.progressBar.percent}%` }}
                                                    />
                                                </div>
                                                <div className="flex justify-between text-[11px] font-mono text-[#949ba4]">
                                                    <span>{activeCommand.output.progressBar.current}</span>
                                                    <span>{activeCommand.output.progressBar.total}</span>
                                                </div>
                                            </div>
                                        )}

                                        {/* Embed Fields */}
                                        {activeCommand.output.fields && (
                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
                                                {activeCommand.output.fields.map((field, idx) => (
                                                    <div key={idx} className="space-y-0.5">
                                                        <div className="text-[11px] font-semibold uppercase tracking-wider text-[#949ba4]">
                                                            {field.name}
                                                        </div>
                                                        <div className="text-xs text-[#f2f3f5]">
                                                            <DiscordMarkdown text={field.value} />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Embed Footer */}
                                        <div className="pt-2 text-[10px] text-[#949ba4] border-t border-[#3f4147] flex items-center gap-1.5">
                                            <span>{activeCommand.output.footer}</span>
                                        </div>
                                    </div>

                                    {/* Interactive Action Row Buttons */}
                                    {activeCommand.output.buttons && (
                                        <div className="flex flex-wrap gap-2 pt-1">
                                            {activeCommand.output.buttons.map((btn, bIdx) => (
                                                <button
                                                    key={bIdx}
                                                    type="button"
                                                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                                                        btn.style === "primary"
                                                            ? "bg-[#5865F2] hover:bg-[#4752C4] text-white"
                                                            : "bg-[#4e5058] hover:bg-[#6d6f78] text-white"
                                                    }`}
                                                >
                                                    {btn.icon}
                                                    <span>{btn.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Reviews Marquee */}
                <section className="py-20 border-t border-border/60 overflow-hidden" id="reviews">
                    <div className="text-center max-w-2xl mx-auto mb-10">
                        <h2 className="text-3xl md:text-4xl font-bold">Community Feedback</h2>
                        <p className="text-muted-foreground mt-2 text-sm">Real reviews from server owners on Top.gg</p>
                    </div>
                    <Marquee className="[--duration:25s]">
                        {reviews.map((review) => (
                            <ReviewCard key={review.username} {...review} ratingColor={"#c754fb"} />
                        ))}
                    </Marquee>
                </section>

                {/* Final Call to Action */}
                <section className="py-20 text-center border-t border-border/60" id="invite">
                    <div className="max-w-3xl mx-auto space-y-6">
                        <h2 className="text-4xl md:text-6xl font-bold gradient text-transparent bg-clip-text bg-gradient-to-r from-[#c754fb] to-[#db7dfa]">
                            Ready to Upgrade Your Server?
                        </h2>
                        <p className="text-muted-foreground text-base max-w-xl mx-auto">
                            Add Hyper Bot today and consolidate your music, economy, moderation, and leveling into one fast application.
                        </p>
                        <div className="pt-4 flex justify-center">
                            <InteractiveHoverButton
                                className="bg-[#c754fb] shadow-lg shadow-purple-500/25"
                                onClick={() => window.open("/hyperbot/invite", "_blank")}
                            >
                                Invite Hyper Bot Now
                            </InteractiveHoverButton>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}