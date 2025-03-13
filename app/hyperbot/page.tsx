"use client";

import React, {useEffect, useState} from "react";

import {siteConfig} from "@/config/site";
import {Navbar} from "@/components/navbar";
import {AnimatedGridPattern} from "@/components/magicui/animated-grid-pattern";
import {cn} from "@/lib/utils";
import {LineShadowText} from "@/components/magicui/line-shadow-text";
import {useTheme} from "next-themes";
import {InteractiveHoverButton} from "@/components/magicui/interactive-hover-button";
import {RippleButton} from "@/components/magicui/ripple-button";
import {VelocityScroll} from "@/components/magicui/scroll-based-velocity";
import {BitcoinIcon, GaugeIcon, HammerIcon, MessageCircleHeartIcon, MusicIcon} from "lucide-react";
import {FeatureCard} from "@/components/magicui/feature-card";
import {BentoGrid} from "@/components/magicui/bento-grid";
import {Card, CardContent} from "@/components/ui/card";
import {ShineBorder} from "@/components/magicui/shine-border";
import {Progress} from "@/components/ui/progress";
import {AnimatedNumber} from "@/components/animated-number";

const features = [
    {
        name: "Fast",
        description: "Hyper Bot is sharded and hosted around the world to ensure that it responds quickly to your commands and never goes down.",
        className: "lg:row-start-1 lg:row-end-3 lg:col-start-1 lg:col-end-2",
        background: (
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent rounded-lg"/>),
        icon: <GaugeIcon/>
    },
    {
        name: "Economy",
        description: "Hyper Bot has a fully-featured economy system, with a variety of ways to earn and spend money, helping server admins to establish a market economy. This also rewards active members for their participation.",
        className: "lg:row-start-1 lg:row-end-2 lg:col-start-2 lg:col-end-4",
        background: (
            <div className="absolute inset-0 bg-gradient-to-br from-purple-800/20 to-transparent rounded-lg"/>),
        icon: <BitcoinIcon/>
    },
    {
        name: "Music",
        description: "Hyper Bot has a powerful music system that allows you to play music from YouTube, Spotify, SoundCloud, and more. You can also create playlists, queue songs, and more to keep your server entertained and the voice channels lively.",
        className: "lg:row-start-2 lg:row-end-3 lg:col-start-2 lg:col-end-3",
        background: (
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent rounded-lg"/>),
        icon: <MusicIcon/>
    },
    {
        name: "Leveling",
        description: "Hyper Bot has a leveling system that rewards active members with experience points and levels. You can also set up custom roles for each level, making it easy to reward your most active members.",
        className: "lg:row-start-3 lg:row-end-4 lg:col-start-1 lg:col-end-2",
        background: (
            <div className="absolute inset-0 bg-gradient-to-br from-purple-700/20 to-transparent rounded-lg"/>),
        icon: <MessageCircleHeartIcon/>
    },
    {
        name: "Moderation",
        description: "Hyper Bot has a variety of moderation commands to help you keep your server safe and clean. You can ban, kick, mute, and more with ease.",
        className: "lg:row-start-3 lg:row-end-4 lg:col-start-2 lg:col-end-3",
        background: (
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-transparent rounded-lg"/>),
        icon: <HammerIcon/>
    },
    {
        name: "Fun",
        description: "Hyper Bot has a variety of fun commands to keep your server entertained. You can play games, roll dice, and more.",
        className: "lg:row-start-2 lg:row-end-4 lg:col-start-3 lg:col-end-4",
        background: (
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-transparent rounded-lg"/>),
        icon: <MessageCircleHeartIcon/>
    }
]

export default function HyperBotPage() {
    const theme = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);
    const shadowColor = mounted ? (theme.resolvedTheme === "dark" ? "white" : "black") : "transparent";

    const [userCount, setUserCount] = useState(0);
    const [guildCount, setGuildCount] = useState(0);

    useEffect(() => {
        fetch("/api/hyperbot").then(res => res.json()).then(data => {
            setUserCount(data.users);
            setGuildCount(data.guilds);
        });
    }, []);

    return (
        <>
            <Navbar navbarData={siteConfig.pages.hyperbot} accentColors={["#c754fb", "#db7dfa"]}/>
            <main className="container mx-auto px-6 max-w-7xl grow h-full">
                <section
                    className="relative flex flex-col items-center justify-evenly bg-background min-h-screen"
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
                    <div
                        className="flex flex-col max-w-5xl justify-evenly h-screen relative x-20">
                        <div className="gap-2">
                            <img src="/hyperbot.png" alt="Hyper Bot Logo" className="w-64 h-64 mx-auto"/>
                            <h1 className={"text-6xl md:text-7xl lg:text-9xl text-center font-bold gradient text-transparent bg-clip-text bg-linear-to-r from-[#c754fb] to-[#db7dfa] p-3 md:p-4 lg:p-5"}>
                                Hyper Bot
                            </h1>
                            <div className="flex flex-wrap items-center justify-center">
                                <p className={"text-xl md:text-2xl lg:text-4xl text-center"}>
                                    A <LineShadowText className="italic" shadowColor={shadowColor}>fast</LineShadowText>
                                    {" "}multipurpose Discord application.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 w-full p-10">
                            <div className="flex flex-row justify-between w-full">
                                <InteractiveHoverButton className="bg-[#c754fb]"
                                                        onClick={() => window.open("/hyperbot/invite", "_blank")}>
                                    Invite Hyper Bot
                                </InteractiveHoverButton>
                                <RippleButton rippleColor="#C754fB"
                                              className="hover:scale-105 transition duration-300 bg-muted"
                                              onClick={() => window.open("/hyperbot/vote", "_blank")}>
                                    Vote for Hyper Bot
                                </RippleButton>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
                <VelocityScroll>Hyper Bot</VelocityScroll>
                <div
                    className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
                <div
                    className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
            </div>
            <main className="container mx-auto px-6 max-w-7xl grow h-full">
                <section
                    className="flex flex-col items-center justify-evenly bg-background min-h-screen w-full"
                    id="about"
                >
                    <div
                        className="relative flex flex-col items-center justify-evenly bg-background h-screen w-full my-20 lg:my-30 gap-20 lg:gap-30">
                        <div className="flex flex-col gap-2 max-w-2xl pr-10">
                            <h1 className="text-6xl text-center font-bold gradient text-transparent bg-clip-text bg-linear-to-r from-[#c754fb] to-[#db7dfa]">
                                About
                            </h1>
                            <p className="text-lg text-center text-white/90">
                                Hyper Bot is a multipurpose Discord bot that can help you manage your server, keep your
                                members entertained, and more.
                            </p>
                        </div>
                        <div className="flex flex-row gap-4 w-full justify-evenly">
                            <Card
                                className="overflow-hidden bg-muted backdrop-blur-md max-w-md relative transition-all duration-300 hover:translate-y-[-8px] hover:scale-[1.01] hover:shadow-[0_20px_30px_-10px_#c754fb30,0_10px_20px_-10px_#db7dfa40]"
                            >
                                <ShineBorder
                                    shineColor={["#c754fb", "#db7dfa"]}
                                    className="absolute inset-0 rounded-lg"
                                />
                                <CardContent className="p-6 md:p-8">
                                    <div className="flex flex-col items-start justify-start text-left">
                                        <h3 className="text-xl md:text-2xl font-semibold mb-4 text-left">
                                            Hyper Bot has thousands of activate users that use it daily...
                                        </h3>
                                        <div
                                            className="flex items-center justify-center text-4xl md:text-5xl lg:text-6xl font-bold gradient text-transparent bg-clip-text bg-linear-to-r from-[#c754fb] to-[#db7dfa]">
                                            <AnimatedNumber
                                                value={userCount}
                                                stiffness={100}
                                            />
                                            <span>+</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card
                                className="overflow-hidden bg-muted backdrop-blur-md max-w-md relative transition-all duration-300 hover:translate-y-[-8px] hover:scale-[1.01] hover:shadow-[0_20px_30px_-10px_#c754fb30,0_10px_20px_-10px_#db7dfa40]"
                            >
                                <ShineBorder
                                    shineColor={["#c754fb", "#db7dfa"]}
                                    className="absolute inset-0 rounded-lg"
                                />
                                <CardContent className="p-6 md:p-8">
                                    <div className="flex flex-col items-start justify-start text-left">
                                        <h3 className="text-xl md:text-2xl font-semibold mb-4 text-left">
                                            Hyper Bot is trusted by thousands of active users and counting...
                                        </h3>
                                        <div
                                            className="flex items-center justify-center text-4xl md:text-5xl lg:text-6xl font-bold gradient text-transparent bg-clip-text bg-linear-to-r from-[#c754fb] to-[#db7dfa]">
                                            <AnimatedNumber
                                                value={guildCount}
                                                stiffness={100}
                                            />
                                            <span>+</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>
                <section
                    className="flex flex-col items-center justify-evenly bg-background min-h-screen"
                    id="features"
                >
                    <div
                        className="relative flex flex-col items-center justify-evenly bg-background h-screen my-20 lg:my-30 gap-20 lg:gap-30">
                        <div className="flex flex-col gap-2 max-w-2xl pr-10">
                            <h1 className="text-6xl text-center font-bold gradient text-transparent bg-clip-text bg-linear-to-r from-[#c754fb] to-[#db7dfa]">
                                Features
                            </h1>
                            <p className="text-lg text-center text-white/90">
                                Hyper Bot has a variety of features that can help you manage your server and make it
                                more fun.
                            </p>
                        </div>
                        <div>
                            <BentoGrid className="gap-4 grid-cols-3">
                                {features.map((feature) => (
                                    <FeatureCard key={feature.name} {...feature} />
                                ))}
                            </BentoGrid>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}