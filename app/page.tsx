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
import {BookHeartIcon} from "lucide-react";
import {SpinningText} from "@/components/magicui/spinning-text";
import {Badge} from "@/components/ui/badge";
import {MagicCard} from "@/components/magicui/magic-card";

const TaglineAnimation = memo(() => (
    <TextAnimate
        animation="blurInUp"
        by="character"
        once={true}
        className="animation-persistent"
    >
        Software Engineer. Game Developer. Guitarist.
    </TextAnimate>
));

const projects = [
    {
        name: "Hyper Bot",
        description: "Discord bot with moderation, utility, and fun commands for your server",
        className: "lg:row-start-1 lg:row-end-3 lg:col-start-1 lg:col-end-2",
        background: (
            <div className="absolute inset-0 rounded-lg bg-black">
                <img
                    src="/stock_discord.webp"
                    className="w-full h-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-110"
                    alt="Discord"
                />
            </div>
        ),
        category: "Multipurpose Discord Application",
        tooltip: "Credits to Shutterstock for the thumbnail",
        href: "/hyperbot",
        cta: "Learn more"
    },
    {
        name: "SpoTuya",
        description: "Tuya smart home integration with Spotify to sync your lights with your music and live the music",
        className: "lg:row-start-1 lg:row-end-2 lg:col-start-2 lg:col-end-4",
        background: <div className="absolute inset-0 rounded-lg bg-black">
            <img
                src="https://www.techhive.com/wp-content/uploads/2023/04/philips-hue-spotify-image-2-100901041-orig.jpeg?quality=50&strip=all"
                className="w-full h-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-110"
                alt="Discord"
            />
        </div>,
        category: "IOT Utility",
        tooltip: "Credits to Tech Hive for the thumbnail",
        href: "/spotuya",
        cta: "Learn more"
    },
    {
        name: "Hyper Client",
        description: "Minecraft client with advanced features and performance optimizations",
        className: "lg:row-start-2 lg:row-end-3 lg:col-start-2 lg:col-end-3",
        background: <div className="absolute inset-0 rounded-lg bg-black">
            <img
                src="https://i.ytimg.com/vi/VOL1PHXM-Kg/maxresdefault.jpg"
                className="w-full h-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-110"
                alt="Discord"
            />
        </div>,
        category: "Advanced Minecraft Client",
        tooltip: "Credits to zKevsh for the thumbnail",
        href: "/hyperclient",
        cta: "Learn more"
    },
    {
        name: "RoadPlanner",
        description: "Java application designed to help FTC teams plan their autonomous paths",
        className: "lg:row-start-2 lg:row-end-3 lg:col-start-3 lg:col-end-4",
        background: <div className="absolute inset-0 rounded-lg bg-black">
            <img
                src="https://www.firstinspires.org/sites/all/themes/first/assets/images/2020/ftc/event-experience.jpg"
                className="w-full h-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-110"
                alt="Discord"
            />
        </div>,
        category: "FTC Utility",
        tooltip: "Credits to FIRST Inspires for the thumbnail",
        href: "/roadplanner",
        cta: "Learn more"
    }
]

const skills = [
    {
        category: "Languages",
        values: ["C#", "Java", "C++", "TypeScript", "JavaScript", "Python", "SQL"]
    },
    {
        category: "Frontend",
        values: ["React", "Next.js", "Tailwind CSS", "HTML/CSS", "Framer Motion"]
    },
    {
        category: "Game Development",
        values: ["Unity", "Unreal Engine", "Godot", "OpenGL"]
    },
    {
        category: "Backend",
        values: ["Node.js", "Express", "Spring Boot", "ASP.NET", "REST APIs"]
    },
    {
        category: "Tools & DevOps",
        values: ["Git", "Docker", "GitHub Actions", "Azure", "VS Code", "WebStorm"]
    },
    {
        category: "Other",
        values: ["Agile Development", "CI/CD", "System Design", "Algorithms & Data Structures", "Database Design"]
    }
]

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
                        <div className={"flex flex-col gap-3"}>
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
                        </div>

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
                    className="flex flex-col items-left justify-evenly bg-background min-h-full py-16 md:gap-y-4 lg:gap-y-8 my-24"
                    id="skills"
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
                                <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold text-left justify-center">My Skills</h2>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                        {skills.map((skill, index) => (
                            <MagicCard
                                key={index}
                                className="rounded-xl p-6"
                                gradientFrom={colors.vibrant}
                                gradientTo={colors.muted}
                            >
                                <h3 className="text-xl font-bold mb-3">{skill.category}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {skill.values.map((value, valueIndex) => (
                                        <Badge key={valueIndex}>{value}</Badge>
                                    ))}
                                </div>
                            </MagicCard>
                        ))}
                    </div>
                </section>
                <section
                    className="flex flex-col items-left justify-evenly bg-background min-h-full py-16 gap-y-8 my-36"
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