"use client";

import React, {memo, useEffect, useState} from "react";

import {siteConfig} from "@/config/site";
import {Navbar} from "@/components/navbar";
import {LineShadowText} from "@/components/magicui/line-shadow-text";
import {useTheme} from "next-themes";
import {Ripple} from "@/components/magicui/ripple";
import {AuroraText} from "@/components/magicui/aurora-text";
import {TextReveal} from "@/components/magicui/text-reveal";

export default function HyperClientPage() {
    const theme = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);
    const shadowColor = mounted ? (theme.resolvedTheme === "dark" ? "white" : "black") : "transparent";

    return (
        <>
            <Navbar navbarData={siteConfig.pages.hyperclient} accentColors={["#3398db", "#a3f4ff"]}/>
            <main className="container mx-auto max-w-7xl px-6 flex-grow h-full">
                <section
                    className="relative flex flex-col items-center justify-center bg-background h-[calc(100vh-4rem)]"
                    id="home"
                >
                    <Ripple
                        mainCircleSize={700}
                        className="z-0"
                    />
                    <div
                        className="relative z-10 flex flex-col max-w-5xl w-full items-center justify-center">
                        <h1 className="text-6xl md:text-7xl lg:text-7xl text-center font-bold gradient text-transparent bg-clip-text bg-gradient-to-r from-[#3398db] to-[#a3f4ff] p-3 md:p-4 lg:p-5">
                            Hyper Client
                        </h1>
                        <div className="flex flex-wrap items-center justify-center">
                        <span className="text-lg md:text-xl lg:text-2xl">
                            A <AuroraText colors={["#3398db", "#49b8e4", "#71d2ef", "#8be3f9", "#a3f4ff"]}
                                          className="text-lg md:text-xl lg:text-2xl">modern</AuroraText> and{" "}
                            <LineShadowText className="italic" shadowColor={shadowColor}>powerful</LineShadowText>{" "}
                            Minecraft client.
                        </span>
                        </div>
                    </div>
                </section>
                <section
                    className="relative flex flex-col items-center justify-center bg-background"
                    id="features"
                >
                    <TextReveal>Hyper Client will change the way you play Minecraft.</TextReveal>
                </section>
            </main>
        </>
    );
}