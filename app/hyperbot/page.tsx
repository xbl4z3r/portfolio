"use client";

import React, {memo, useEffect, useState} from "react";

import {siteConfig} from "@/config/site";
import {Navbar} from "@/components/navbar";
import {AnimatedGridPattern} from "@/components/magicui/animated-grid-pattern";
import {cn} from "@/lib/utils";
import {LineShadowText} from "@/components/magicui/line-shadow-text";
import {useTheme} from "next-themes";
import {InteractiveHoverButton} from "@/components/magicui/interactive-hover-button";
import {RippleButton} from "@/components/magicui/ripple-button";

export default function Home() {
    const theme = useTheme();

    const [mounted, setMounted] = useState(false);

    // Wait for client-side hydration to complete
    useEffect(() => {
        setMounted(true);
    }, []);

    const shadowColor = mounted ? (theme.resolvedTheme === "dark" ? "white" : "black") : "transparent";

    return (
        <>
            <Navbar navbarData={siteConfig.pages.hyperbot} accentColors={["#c754fb", "#db7dfa"]}/>
            <main className="container mx-auto max-w-7xl px-6 flex-grow h-full">
                <section
                    className="flex flex-col items-center justify-evenly bg-background min-h-screen"
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
                        className="flex flex-col max-w-5xl justify-evenly h-screen">
                        <div className="gap-2">
                            <h1 className={"text-6xl md:text-7xl lg:text-9xl text-center font-bold gradient text-transparent bg-clip-text bg-gradient-to-r from-[#c754fb] to-[#db7dfa] p-3 md:p-4 lg:p-5"}>
                                Hyper Bot
                            </h1>
                            <div className="flex flex-wrap items-center justify-center">
                                <p className={"text-xl md:text-2xl lg:text-4xl"}>
                                    A <LineShadowText className="italic" shadowColor={shadowColor}>fast</LineShadowText>
                                    {" "}multipurpose Discord application.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 w-full p-10">
                            <div className="flex flex-row justify-between w-full">
                                <InteractiveHoverButton className="bg-[#c754fb]">
                                    Invite Hyper Bot
                                </InteractiveHoverButton>
                                <RippleButton rippleColor="#C754fB" className="hover:scale-105 transition duration-300 bg-muted">
                                    Vote for Hyper Bot
                                </RippleButton>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}