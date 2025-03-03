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
import { CodeIcon, FrameIcon, LayersIcon, LaptopIcon } from "@radix-ui/react-icons";

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

const skills = [
    {
        Icon: CodeIcon,
        name: "C#",
        description: "Game development with Unity, desktop applications, and backend services",
        className: "lg:row-start-1 lg:row-end-3 lg:col-start-1 lg:col-end-2",
        background: <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent rounded-lg" />,
        href: "",
        cta: ""
    },
    {
        Icon: CodeIcon,
        name: "Game Development",
        description: "Creating interactive experiences and games using Unity and other engines",
        className: "lg:row-start-1 lg:row-end-2 lg:col-start-2 lg:col-end-4",
        background: <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-lg" />,
        href: "",
        cta: ""
    },
    {
        Icon: LaptopIcon,
        name: "Frontend Development",
        description: "Building responsive user interfaces with React, Next.js, and TypeScript",
        className: "lg:row-start-2 lg:row-end-3 lg:col-start-2 lg:col-end-3",
        background: <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent rounded-lg" />,
        href: "",
        cta: ""
    },
    {
        Icon: FrameIcon,
        name: "Backend Development",
        description: "Creating robust APIs and services with Node.js, Express, and databases",
        className: "lg:row-start-2 lg:row-end-3 lg:col-start-3 lg:col-end-4",
        background: <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-lg" />,
        href: "",
        cta: ""
    },
    {
        Icon: FrameIcon,
        name: "TypeScript",
        description: "Building type-safe applications for web and backend services",
        className: "lg:row-start-3 lg:row-end-4 lg:col-start-1 lg:col-end-2",
        background: <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent rounded-lg" />,
        href: "",
        cta: ""
    },
    {
        Icon: LayersIcon,
        name: "C/C++",
        description: "Low-level systems programming and performance-critical applications",
        className: "lg:row-start-3 lg:row-end-4 lg:col-start-2 lg:col-end-3",
        background: <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-transparent rounded-lg" />,
        href: "",
        cta: ""
    },
    {
        Icon: CodeIcon,
        name: "Java",
        description: "Enterprise applications, Android development, and cross-platform solutions",
        className: "lg:row-start-3 lg:row-end-4 lg:col-start-3 lg:col-end-4",
        background: <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-transparent rounded-lg" />,
        href: "",
        cta: ""
    }
];

export default function Home() {
    const {colors} = useColor();
    return (
        <>
            <Navbar navbarData={siteConfig.navItems.portfolio} accentColors={[colors.vibrant, colors.muted]}/>
            <main className="container mx-auto max-w-7xl pt-6 px-6 flex-grow h-full">
                <Meteors number={250} colors={[colors.vibrant, colors.muted, colors.light_vibrant, colors.light_muted, colors.dark_vibrant, colors.dark_muted]}/>
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
                    className="flex flex-col items-center justify-evenly bg-background min-h-full py-16 gap-y-8"
                    id="about"
                >
                    <h2 className="text-4xl font-bold text-center">My Skills</h2>
                    <BentoGrid className="lg:grid-rows-3 lg:grid-cols-3 gap-4 w-full">
                        {skills.map((skill) => (
                            <BentoCard key={skill.name} {...skill} />
                        ))}
                    </BentoGrid>
                </section>
                <section
                    className="flex flex-col items-center justify-evenly bg-background min-h-full py-16 gap-y-8"
                    id="projects"
                >
                    <h2 className="text-4xl font-bold text-center">My Skills</h2>
                    <BentoGrid className="lg:grid-rows-3 lg:grid-cols-3 gap-4 w-full">
                        {skills.map((skill) => (
                            <BentoCard key={skill.name} {...skill} />
                        ))}
                    </BentoGrid>
                </section>
            </main>
        </>
    );
}