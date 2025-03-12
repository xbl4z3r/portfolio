"use client";

import React, {memo, useEffect, useState} from "react";

import {SpotifyCard} from "@/components/spotify-card";
import {siteConfig} from "@/config/site";
import {Navbar} from "@/components/navbar";
import {SparklesText} from "@/components/magicui/sparkles-text";
import {TextAnimate} from "@/components/magicui/text-animate";
import {useColor} from "@/hooks/useColor";
import {Meteors} from "@/components/magicui/meteors";
import {BentoGrid} from "@/components/magicui/bento-grid";
import {
    BookHeartIcon,
    Code2Icon, ComputerIcon,
    DatabaseZapIcon,
    GamepadIcon, Info, KeyboardIcon,
    LayoutIcon, SquareMenuIcon, WifiIcon,
    WorkflowIcon
} from "lucide-react";
import {SpinningText} from "@/components/magicui/spinning-text";
import {Badge} from "@/components/ui/badge";
import {MagicCard} from "@/components/magicui/magic-card";
import {
    Expandable,
    ExpandableCard, ExpandableCardContent,
    ExpandableCardHeader,
    ExpandableContent,
    ExpandableTrigger
} from "@/components/expandable-card";
import {
    SiCplusplus, SiDiscord, SiDocker,
    SiDotnet, SiExpress, SiFirst, SiGit,
    SiGithub, SiGithubactions,
    SiGradle, SiJetbrains, SiMongodb,
    SiNextdotjs, SiNodedotjs, SiOpengl,
    SiReact, SiShadcnui, SiSocketdotio, SiTailwindcss,
    SiTypescript, SiUnity, SiUnrealengine, SiX
} from "@icons-pack/react-simple-icons";
import {ShineBorder} from "@/components/magicui/shine-border";
import {PopoverContent, PopoverTrigger, Popover} from "@/components/ui/popover";
import {Card} from "@/components/ui/card";
import {cn} from "@/lib/utils";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {Button} from "@/components/ui/button";
import {ArrowRightIcon} from "@radix-ui/react-icons";

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

const skillsData = [
    {
        category: "Languages",
        icon: Code2Icon,
        badges: [
            {
                text: "C#",
                icon: SiDotnet,
            },
            {
                text: "Java",
                icon: SiGradle
            },
            {
                text: "C++",
                icon: SiCplusplus
            },
            {
                text: "TypeScript/JavaScript",
                icon: SiTypescript
            }
        ],
        detailed: <p>
            I believe that learning new languages is a great way to expand your horizons and improve your
            problem-solving
            as every language has its own unique features and quirks to suit different use cases. I'm most proficient in
            C# and Java, as I've used them the most in my projects. I've also had my fair share of projects done in
            TypeScript and JavaScript, especially in the frontend and backend web development space. I've also dabbled
            in
            C++ for game development and systems programming.
        </p>
    },
    {
        category: "Frontend",
        icon: LayoutIcon,
        badges: [
            {
                text: "React",
                icon: SiReact,
            },
            {
                text: "Next.js",
                icon: SiNextdotjs
            },
            {
                text: "Tailwind CSS",
                icon: SiTailwindcss
            },
            {
                text: "ShadCN",
                icon: SiShadcnui
            }
        ],
        detailed: <p>
            I've always been a fan of creating beautiful and interactive user interfaces, and I've experimented with
            various frontend technologies to achieve that goal. I'm most proficient in React and Next.js, as I've used
            them the most in my projects. To style my components, I mainly use Tailwind CSS and ShadCN, as they allow me
            to quickly prototype and style my components without having to write a lot of CSS.
        </p>
    },
    {
        category: "Game Development",
        icon: GamepadIcon,
        badges: [
            {
                text: "Unity",
                icon: SiUnity
            },
            {
                text: "OpenGL",
                icon: SiOpengl
            },
            {
                text: "LWJGL",
                icon: KeyboardIcon
            },
            {
                text: "Unreal Engine",
                icon: SiUnrealengine
            }
        ],
        detailed: <p>
            Game development has always been a passion of mine, and I've worked on various game projects to improve my
            skills in this area. I started my journey with Unreal, but I quickly switched to Unity due to its ease of
            use
            and vast community support. I've also experimented with OpenGL and LWJGL for more low-level game
            development.
            This has allowed me to understand the inner workings of game engines and graphics programming.
        </p>
    },
    {
        category: "Backend",
        icon: DatabaseZapIcon,
        badges: [
            {
                text: "Node.js",
                icon: SiNodedotjs,
            },
            {
                text: "Express",
                icon: SiExpress
            },
            {
                text: "MongoDB",
                icon: SiMongodb
            },
            {
                text: "WebSockets",
                icon: SiSocketdotio
            }
        ],
        detailed: <p>
            I've always been fascinated by the backend side of things. I love designing and implementing scalable and
            efficient backend services to support my frontend applications. I'm most proficient in Node.js and Express,
            as I've used them the most in my projects. I've also worked with MongoDB as my database of choice due to its
            flexibility and scalability. I've also experimented with WebSockets for real-time communication between
            clients and servers.
        </p>
    },
    {
        category: "Tools & DevOps",
        icon: WorkflowIcon,
        badges: [
            {
                text: "Git",
                icon: SiGit
            },
            {
                text: "Docker",
                icon: SiDocker
            },
            {
                text: "GitHub Actions",
                icon: SiGithubactions
            },
            {
                text: "JetBrains IDEs",
                icon: SiJetbrains
            }
        ],
        detailed: <p>
            I believe that having the right tools and workflows is essential to being a productive developer. I've
            adopted Git as my version control system of choice, and I use it in all my projects to keep track of changes
            and collaborate with others. I've also worked with Docker to containerize my applications and GitHub Actions
            for CI/CD pipelines. I'm a big fan of JetBrains IDEs, as they provide powerful features and integrations to
            make my development process smoother.
        </p>
    },
    {
        category: "Other",
        icon: SquareMenuIcon,
        badges: [
            {
                text: "CI/CD",
                icon: SiGithub
            },
            {
                text: "System Design",
                icon: ComputerIcon
            },
            {
                text: "Robotics",
                icon: SiFirst
            },
            {
                text: "IOT",
                icon: WifiIcon
            }
        ],
        detailed: <p>
            I'm always looking to expand my skill set and learn new things. I've worked on various projects that have
            allowed me to gain experience in CI/CD pipelines, system design, robotics, and IOT. I believe that having a
            diverse skill set is essential in today's fast-paced and ever-changing tech landscape, and I'm always
            looking
            for new opportunities to learn and grow.
        </p>
    }
]

const ProjectCard = ({
                         name,
                         className,
                         background,
                         description,
                         category,
                         tooltip,
                         href,
                         cta,
                         ...props
                     }: BentoCardProps) => {
    const [isTooltipVisible, setTooltipVisible] = useState(false);
    const [tooltipTimer, setTooltipTimer] = useState<NodeJS.Timeout | null>(null);

    const handleTooltipClick = () => {
        setTooltipVisible(!isTooltipVisible);
    };

    const handleMouseEnter = () => {
        const timer = setTimeout(() => {
            setTooltipVisible(true);
        }, 300);
        setTooltipTimer(timer);
    };

    const handleMouseLeave = () => {
        if (tooltipTimer) {
            clearTimeout(tooltipTimer);
            setTooltipTimer(null);
        }
        setTooltipVisible(false);
    };

    return (
        <div
            key={name}
            className={cn(
                "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
                "bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
                "transform-gpu dark:bg-background dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
                className,
            )}
            {...props}
        >
            <div>{background}</div>
            <div className="absolute p-3 flex flex-wrap w-full justify-between items-center z-10">
                <div className="flex flex-col gap-1">
                    <p className="text-xs font-semibold text-white/70">
                        {(category || "").toUpperCase()}
                    </p>
                    <p className="text-4xl font-semibold text-white">
                        {name}
                    </p>
                </div>
                {tooltip && (
                    <div className="mr-3">
                        <TooltipProvider>
                            <Tooltip open={isTooltipVisible}>
                                <TooltipTrigger
                                    onClick={handleTooltipClick}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <Info color="#BBBBBB"/>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{tooltip}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                )}
            </div>
            <div
                className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
                <p className="max-w-lg text-white/90">{description}</p>
            </div>

            <div
                className={cn(
                    "pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
                )}
            >
                <Button variant="ghost" asChild size="sm" className="pointer-events-auto">
                    <a href={href} className="text-white/90">
                        {cta}
                        <ArrowRightIcon className="ms-2 h-4 w-4 rtl:rotate-180"/>
                    </a>
                </Button>
            </div>
            <div
                className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] dark:group-hover:bg-neutral-800/10"/>
        </div>
    );
};

export default function Home() {
    const {colors} = useColor();
    const [isOpen, setIsOpen] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        if (isHovering) {
            setIsOpen(true);
        } else {
            const timer = setTimeout(() => {
                setIsOpen(false);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isHovering]);

    const skills = skillsData.map(skill => ({
        ...skill,
        // Replace the icon component with the styled version
        icon: <skill.icon className="w-6 h-6" style={{color: colors.vibrant}}/>
    }));

    return (
        <>
            <Navbar navbarData={siteConfig.pages.portfolio} accentColors={[colors.vibrant, colors.muted]}/>
            <main className="container mx-auto max-w-7xl pt-6 px-6 grow h-full">
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
                            <div className="absolute bg-linear-to-br from-vibrant to-muted rounded-lg">
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
                            <p className="text-left max-w-3xl text-md sm:text-xl md:text-xl lg:text-xl font-normal">
                                I'm a self-taught software engineer and game developer with a passion for creating
                                interactive experiences. I've always been fascinated by physics, mathematics, and
                                computer science, and I love to experiment with new technologies and tools. I'm
                                currently working on a variety of projects, including game development, web development,
                                and backend services, all part of my journey to become a better developer. I'm also the
                                guitarist of a band I started with some friends. I'm always looking for new
                                opportunities to learn and grow, so feel free to{" "}
                                <Popover
                                    open={isOpen}
                                    onOpenChange={(open) => {
                                        setIsOpen(open);
                                        if (!open) setIsHovering(false);
                                    }}
                                >
                                    <PopoverTrigger asChild>
                                    <span
                                        className="underline cursor-pointer"
                                        onMouseEnter={() => setIsHovering(true)}
                                        onMouseLeave={() => setIsHovering(false)}
                                    >
                                        reach out
                                    </span>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="w-80"
                                        onMouseEnter={() => setIsHovering(true)}
                                        onMouseLeave={() => setIsHovering(false)}
                                    >
                                        <Card className="flex justify-between">
                                            <ShineBorder
                                                shineColor={[colors.vibrant, colors.muted, colors.light_vibrant, colors.light_muted, colors.dark_vibrant, colors.dark_muted]}
                                                className="absolute inset-0 rounded-lg"
                                            />
                                            <div className="space-y-1">
                                                <h4 className="text-md font-semibold">xbl4z3r</h4>
                                                <p className="text-sm">
                                                    Software Engineer
                                                </p>
                                                <div className="flex items-center pt-2">
                                                    <SiX className="mr-2 h-4 w-4 opacity-70"/>{" "}
                                                    <span className="text-xs text-muted-foreground">
                                                    <a href={siteConfig.links.x} target="_blank">@xbl4z3r</a>
                                                </span>
                                                </div>
                                                <div className="flex items-center pt-2">
                                                    <SiDiscord className="mr-2 h-4 w-4 opacity-70"/>{" "}
                                                    <span className="text-xs text-muted-foreground">
                                                    <a href={siteConfig.links.discord} target="_blank">@xbl4z3r</a>
                                                </span>
                                                </div>
                                                <div className="flex items-center pt-2">
                                                    <SiGithub className="mr-2 h-4 w-4 opacity-70"/>{" "}
                                                    <span className="text-xs text-muted-foreground">
                                                    <a href={siteConfig.links.github} target="_blank">@xbl4z3r</a>
                                                </span>
                                                </div>
                                                <p className="pt-2 text-sm text-muted-foreground">These are the only
                                                    ways to
                                                    contact me. I don't use any other platforms.</p>
                                            </div>
                                        </Card>
                                    </PopoverContent>
                                </Popover> if you'd like to chat!
                            </p>
                        </div>
                        <div className="relative items-center justify-center w-48 h-48 hidden lg:flex">
                            <div className="absolute bg-linear-to-br from-vibrant to-muted rounded-lg">
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
                                <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold text-left justify-center">My
                                    Skills</h2>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6 w-full">
                        {skills.map((skill, index) => (
                            <Expandable
                                className="relative w-full"
                                key={index}
                                expandDirection="vertical"
                                expandBehavior="replace"
                                initialDelay={0.2}
                            >
                                {({isExpanded}) => (
                                    <ExpandableTrigger>
                                        <ExpandableCard
                                            className="w-full relative p-0 m-0 b-0 transform transition-transform duration-300 hover:scale-105 cursor-pointer duration-200"
                                            hoverToExpand={false}
                                            expandDelay={200}
                                            collapseDelay={500}
                                        >
                                            <MagicCard
                                                key={index}
                                                className="relative rounded-xl w-full h-full"
                                                gradientFrom={colors.vibrant}
                                                gradientTo={colors.muted}
                                            >
                                                <ExpandableCardHeader>
                                                    <div className="flex items-center gap-3">
                                                        {skill.icon}
                                                        <h3 className="text-xl lg:text-2xl font-bold">{skill.category}</h3>
                                                    </div>
                                                </ExpandableCardHeader>
                                                <ExpandableContent>
                                                    <div className="px-6 pt-2">{skill.detailed}</div>
                                                </ExpandableContent>
                                                <ExpandableCardContent>
                                                    {!isExpanded && (
                                                        <div className="flex flex-wrap gap-2 pt-2">
                                                            {skill.badges.map((badge, valueIndex) => (
                                                                <Badge key={valueIndex}
                                                                       className="border-transparent transition-colors duration-200 hover:opacity-90"
                                                                       onMouseEnter={(e) => {
                                                                           // @ts-expect-error
                                                                           e.currentTarget.style.backup = e.currentTarget.style.backgroundColor;
                                                                           e.currentTarget.style.backgroundColor = colors.light_muted;
                                                                       }}
                                                                       onMouseLeave={(e) => {
                                                                           // @ts-expect-error
                                                                           e.currentTarget.style.backgroundColor = e.currentTarget.style.backup;
                                                                       }}
                                                                >
                                                                    <div className="flex flex-row gap-2">
                                                                        <badge.icon className="w-4 h-4"/>
                                                                        <p>{badge.text}</p>
                                                                    </div>
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    )}
                                                </ExpandableCardContent>
                                            </MagicCard>
                                        </ExpandableCard>
                                    </ExpandableTrigger>
                                )}
                            </Expandable>
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
                            <ProjectCard key={project.name} {...project} />
                        ))}
                    </BentoGrid>
                </section>
            </main>
        </>
    );
}