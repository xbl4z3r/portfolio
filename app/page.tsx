"use client";

import React, {memo} from "react";

import {SpotifyCard} from "@/components/spotify-card";
import {siteConfig} from "@/config/site";
import {Navbar} from "@/components/navbar";
import {SparklesText} from "@/components/magicui/sparkles-text";
import {TextAnimate} from "@/components/magicui/text-animate";
import {useColor} from "@/hooks/useColor";
import {Meteors} from "@/components/magicui/meteors";
import {BentoCard, BentoGrid} from "@/components/magicui/bento-grid";
import {CodeIcon, FrameIcon, LayersIcon, LaptopIcon} from "@radix-ui/react-icons";
import {BookHeartIcon} from "lucide-react";
import {SpinningText} from "@/components/magicui/spinning-text";
import {projects} from "@/config/projects";

const TaglineAnimation = memo(() => (
    <TextAnimate
        animation="blurInUp"
        by="character"
        once={true}
        className="animation-persistent" // Add a persistent class
    >
        Software Engineer. Game Developer. Guitarist.
    </TextAnimate>
));

export default function Home() {
    const {colors} = useColor();
    return (
        <>
            <Navbar navbarData={siteConfig.navItems.portfolio} accentColors={[colors.vibrant, colors.muted]}/>
            <main className="container mx-auto max-w-7xl pt-6 px-6 flex-grow h-full">
                <Meteors number={250}
                         colors={[colors.vibrant, colors.muted, colors.light_vibrant, colors.light_muted, colors.dark_vibrant, colors.dark_muted]}/>
                <section
                    className="flex flex-col items-center justify-evenly bg-background min-h-screen"
                    id="home"
                >
                    <div className="inline-block max-w-lg text-center justify-center items-center">
                        <div className="flex flex-wrap items-center justify-center">
                            <h1 className={"text-4xl md:text-5xl lg:text-6xl"}>Hi, I'm&nbsp;</h1>
                            <SparklesText text="xbl4z3r" colors={{first: colors.vibrant, second: colors.muted}}
                                          className={"text-4xl md:text-5xl lg:text-6xl"}/>
                        </div>
                        <TaglineAnimation/>
                    </div>
                    <SpotifyCard/>
                </section>
                <section
                    className="flex flex-col items-left justify-evenly bg-background min-h-full py-16 md:gap-y-4 lg:gap-y-8 my-24"
                    id="about"
                >
                    <div className="flex flex-wrap items-left gap-8">
                        <div className="flex flex-col items-left justify-center">
                            <div className="flex flex-row items-center justify-center gap-4">
                                <h2
                                    className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold text-left justify-center bg-clip-text text-transparent"
                                    style={{
                                        backgroundImage: `linear-gradient(to right, ${colors.vibrant}, ${colors.muted})`,
                                    }}
                                >•</h2>

                                <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold text-left justify-center">About
                                    Me</h2>
                            </div>
                        </div>
                        <div className="relative items-center justify-center w-32 h-32 flex lg:hidden">
                            <div className="absolute bg-gradient-to-br from-vibrant to-muted rounded-lg">
                                <SpinningText radius={4} className="absolute">
                                    about me • about me • about me •
                                </SpinningText>
                            </div>
                            <BookHeartIcon
                                className="absolute w-8 h-8 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                color={colors.vibrant}/>
                        </div>
                    </div>

                    <div className={"flex flex-wrap items-center justify-between"}>
                        <p className="text-left max-w-3xl text-sm sm:text-md md:text-xl lg:text-xl font-normal">
                            I'm a software engineer and game developer with a passion for creating interactive
                            experiences.
                            I've always been fascinated by physics, mathematics, and computer science, and I love to
                            experiment with new technologies and tools. I'm currently working on a variety of projects,
                            including game development, web development, and backend services, all part of my journey to
                            become a better developer. I'm also the guitarist of a band I started with some friends. I'm
                            always looking for new opportunities to learn and grow, so feel free to reach out if you'd
                            like
                            to chat!
                        </p>
                        <div className="relative items-center justify-center w-48 h-48 hidden lg:flex">
                            <div className="absolute bg-gradient-to-br from-vibrant to-muted rounded-lg">
                                <SpinningText radius={10} className="absolute">
                                    about me • about me • about me • about me • about me •
                                </SpinningText>
                            </div>
                            <BookHeartIcon color={colors.vibrant}
                                           className="absolute w-12 h-12 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"/>
                        </div>
                    </div>
                </section>
                <section
                    className="flex flex-col items-left justify-evenly bg-background min-h-full py-16 gap-y-8 my-24"
                    id="projects"
                >
                    <div className="flex flex-row items-left justify-left gap-4">
                        <h2
                            className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold text-left justify-center bg-clip-text text-transparent"
                            style={{
                                backgroundImage: `linear-gradient(to right, ${colors.vibrant}, ${colors.muted})`,
                            }}
                        >•</h2>
                        <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold text-left justify-center">Projects</h2>
                    </div>
                    <BentoGrid className="gap-4 w-full">
                        {projects.map((project) => (
                            <BentoCard key={project.name} {...project} />
                        ))}
                    </BentoGrid>
                </section>
            </main>
        </>
    );
}