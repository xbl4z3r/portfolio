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
import {Particles} from "@/components/magicui/particles";

export default function SpoTuyaPage() {
    return (
        <>
            <Navbar navbarData={siteConfig.pages.spotuya} accentColors={["#1db954", "#a2e59e"]}/>
            <main className="container mx-auto px-6 max-w-7xl grow h-full">
                <Particles
                        className="absolute inset-0 z-0"
                        quantity={100}
                        ease={80}
                        color={"#1db954"}
                        refresh
                    />
                <section
                    className="relative flex flex-col items-center justify-evenly min-h-screen"
                    id="home"
                >
                    <div
                        className="flex flex-col max-w-5xl justify-evenly h-screen relative x-20">
                        <div className="gap-2">
                            <h1 className={"text-6xl md:text-7xl lg:text-9xl text-center font-bold gradient text-transparent bg-clip-text bg-linear-to-r from-[#1db954] to-[#a2e59e] p-3 md:p-4 lg:p-5"}>
                                SpoTuya
                            </h1>
                            <div className="flex flex-wrap items-center justify-center">
                                <p className={"text-xl md:text-2xl lg:text-4xl text-center"}>
                                    A background service to control your Tuya lights with Spotify.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 w-full p-10">
                            <div className="flex flex-row justify-evenly w-full">
                                <InteractiveHoverButton className="bg-[#1db954]"
                                                        onClick={() => window.open("/spotuya/download", "_blank")}>
                                    Download
                                </InteractiveHoverButton>
                                <RippleButton rippleColor="#1db954"
                                              className="hover:scale-105 transition duration-300 bg-muted"
                                                onClick={() => {
                                                    document.getElementById("about")?.scrollIntoView({behavior: "smooth"});
                                                }}>
                                    Learn More
                                </RippleButton>
                            </div>
                        </div>
                    </div>
                </section>
                <section
                    className="flex flex-col items-center justify-evenly bg-background min-h-screen"
                    id="about">
                    <div className="flex flex-col max-w-5xl justify-center gap-5">
                        <h1 className="text-left justify-start text-[#1db954] font-bold lg:text-6xl text-5xl">
                            What is SpoTuya?
                        </h1>
                        <p className="text-md md:text-lg lg:text-xl text-left">
                            SpoTuya is a tool to help anyone get one step closer to smart home without the need to buy
                            extra hardware. We leverage the Tuya Cloud API to control your lights based on the music you
                            listen to on Spotify. Just setup the service and forget about it. SpoTuya will take care of
                            the rest. Host it somewhere in the cloud or run it on your local machine. The choice is
                            yours.
                        </p>
                    </div>
                    <div className="flex flex-col max-w-5xl justify-center gap-5">
                        <h1 className="text-left justify-start text-[#1db954] font-bold lg:text-6xl text-5xl">
                            What do I need to get started?
                        </h1>
                        <p className="text-md md:text-lg lg:text-xl text-left">
                            Just head to the <a href="/spotuya/download" className="underline hover:text-[#a2e59e]">download</a> page and grab the latest release. You will need a Tuya account
                            with all your lights setup and connected to the Tuya Cloud. You will also need a Spotify
                            account and a Spotify Developer account to create an application to get the necessary
                            credentials to run SpoTuya. Once you have all that, you can start the service, go
                            through the setup process and you're good to go.
                        </p>
                    </div>
                    <div className="flex flex-col max-w-5xl justify-center gap-5">
                        <h1 className="text-left justify-start text-[#1db954] font-bold lg:text-6xl text-5xl">
                            How much does it cost?
                        </h1>
                        <p className="text-md md:text-lg lg:text-xl text-left">
                            SpoTuya is open source and free to use. You can host it on your own server or run it on your
                            local machine. You can also contribute to the project by submitting a pull request or
                            opening an issue on the <a href="/spotuya/github" className="underline hover:text-[#a2e59e]">GitHub repository</a>.
                            If you like the project, consider <a href="/sponsor" className="underline hover:text-[#a2e59e]">donating</a> to help keep the project alive.
                        </p>
                    </div>
                </section>
            </main>
        </>
    );
}