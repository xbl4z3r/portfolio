"use client"

import React, { memo, useEffect, useState } from "react"

import { SpotifyCard } from "@/components/spotify-card"
import { siteConfig } from "@/config/site"
import { Navbar } from "@/components/navbar"
import { SparklesText } from "@/components/magicui/sparkles-text"
import { TextAnimate } from "@/components/magicui/text-animate"
import { useColor } from "@/hooks/useColor"
import { Meteors } from "@/components/magicui/meteors"
import { BentoGrid } from "@/components/magicui/bento-grid"
import { ProjectCard } from "@/components/project-card"
import {
  BookHeartIcon,
  Code2Icon,
  ComputerIcon,
  DatabaseZapIcon,
  GamepadIcon,
  Info,
  KeyboardIcon,
  LayoutIcon,
  SquareMenuIcon,
  WifiIcon,
  WorkflowIcon,
} from "lucide-react"
import { SpinningText } from "@/components/magicui/spinning-text"
import { Badge } from "@/components/ui/badge"
import { MagicCard } from "@/components/magicui/magic-card"
import {
  Expandable,
  ExpandableCard,
  ExpandableCardContent,
  ExpandableCardHeader,
  ExpandableContent,
  ExpandableTrigger,
} from "@/components/expandable-card"
import {
  SiCplusplus,
  SiDiscord,
  SiDocker,
  SiDotnet,
  SiExpress,
  SiFirst,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiGradle,
  SiJetbrains,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiOpengl,
  SiReact,
  SiRust,
  SiShadcnui,
  SiSocketdotio,
  SiTailwindcss,
  SiTauri,
  SiTypescript,
  SiUnity,
  SiUnrealengine,
  SiX,
} from "@icons-pack/react-simple-icons"
import { ShineBorder } from "@/components/magicui/shine-border"
import { PopoverContent, PopoverTrigger, Popover } from "@/components/ui/popover"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon } from "@radix-ui/react-icons"

const TaglineAnimation = memo(() => (
  <TextAnimate animation="blurInUp" by="character" once={true} className="animation-persistent">
    Software Engineer. Game Developer. Guitarist.
  </TextAnimate>
))

const projects = [
  {
    name: "Sink",
    description:
      "Native cross-platform desktop Spotify client built with Tauri v2, Rust librespot core, and React 19 with 32-bit float audio DSP.",
    className:
      "col-span-1 md:col-span-2 lg:col-span-2 lg:row-span-1 lg:col-start-1 lg:col-end-3 lg:row-start-1 lg:row-end-2",
    category: "Spotify Client",
    tags: ["Tauri v2", "Rust", "React 19", "Audio DSP"],
    glowClass: "hover:shadow-[0_0_35px_-5px_rgba(133,193,174,0.35)]",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-[#071914] to-black flex items-center justify-between overflow-hidden">
        {/* Ambient radial lighting flares matching Sink sage green palette */}
        <div className="absolute -right-16 -top-16 w-96 h-96 rounded-full bg-[#85c1ae]/20 blur-3xl pointer-events-none" />
        <div className="absolute right-32 -bottom-20 w-80 h-80 rounded-full bg-[#5a9583]/15 blur-3xl pointer-events-none" />

        {/* Right showcase: Glassmorphic desktop player mockup preview */}
        <div className="absolute right-6 sm:right-10 top-1/2 -translate-y-1/2 mr-20 flex items-center gap-5 transition-transform duration-500 group-hover:scale-105 pointer-events-none select-none">
          <div className="relative group/icon">
            <div className="absolute -inset-2.5 rounded-3xl bg-gradient-to-r from-[#85c1ae] to-[#5a9583] opacity-45 blur-lg group-hover:opacity-75 transition duration-500" />
            <img
              src="/sink.png"
              className="relative w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-2xl shadow-2xl"
              alt="Sink Desktop Spotify Client"
            />
          </div>
        </div>
      </div>
    ),
    tooltip: "Sink logo design, Paraphernalia DSP & desktop UI assets © xbl4z3r",
    href: "/sink",
    cta: "Explore Sink",
  },
  {
    name: "SpoTuya",
    description:
      "IoT automation service syncing Tuya smart lights with Spotify album artwork and audio palettes in real time.",
    className:
      "col-span-1 md:col-span-1 lg:col-span-1 lg:row-span-1 lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-2",
    category: "IoT Automation",
    tags: ["Node.js", "Tuya Cloud", "Spotify API"],
    glowClass: "hover:shadow-[0_0_35px_-5px_rgba(36,200,100,0.3)]",
    background: (
      <div className="absolute inset-0 bg-black overflow-hidden">
        <img
          src="/spotuya.jpg"
          className="w-full h-full object-cover opacity-75 transition-transform duration-700 group-hover:scale-110"
          alt="SpoTuya IoT Light Sync"
        />
        <div className="absolute top-4 right-14 w-8 h-8 rounded-full bg-emerald-500/20 blur-md pointer-events-none" />
      </div>
    ),
    tooltip: "Credits to Tech Hive for the thumbnail",
    href: "/spotuya",
    cta: "Explore SpoTuya",
  },
  {
    name: "Hyper Bot",
    description:
      "Sharded multipurpose Discord bot with low-latency music playback, server economy, leveling, and moderation commands.",
    className:
      "col-span-1 md:col-span-1 lg:col-span-1 lg:row-span-2 lg:col-start-1 lg:col-end-2 lg:row-start-2 lg:row-end-4",
    category: "Discord Application",
    tags: ["Discord.js", "TypeScript", "MongoDB"],
    glowClass: "hover:shadow-[0_0_35px_-5px_rgba(88,101,242,0.35)]",
    background: (
      <div className="absolute inset-0 bg-black overflow-hidden flex flex-col justify-between">
        <img
          src="/stock_discord.webp"
          className="w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
          alt="Hyper Bot Discord Application"
        />
      </div>
    ),
    tooltip: "Credits to Shutterstock for the thumbnail",
    href: "/hyperbot",
    cta: "Explore Bot",
  },
  {
    name: "RoadPlanner",
    description:
      "Visual path generator for FTC robotics autonomous programs using Road Runner v1.0 bezier splines.",
    className:
      "col-span-1 md:col-span-1 lg:col-span-1 lg:row-span-1 lg:col-start-2 lg:col-end-3 lg:row-start-2 lg:row-end-3",
    category: "FTC Robotics Tool",
    tags: ["Java", "Road Runner 1.0", "Splines"],
    glowClass: "hover:shadow-[0_0_35px_-5px_rgba(245,158,11,0.35)]",
    background: (
      <div className="absolute inset-0 bg-black overflow-hidden">
        <img
          src="/roadplanner.jpg"
          className="w-full h-full object-cover opacity-85 transition-transform duration-700 group-hover:scale-105"
          alt="RoadPlanner FTC Path Generator"
        />
      </div>
    ),
    tooltip: "Credits to FIRST Inspires for the thumbnail",
    href: "https://github.com/xbl4z3r/RoadPlanner",
    cta: "View on GitHub",
  },
  {
    name: "Paper Plane Sim",
    description:
      "Unity 3D paper plane flight simulation featuring aerodynamic lift, drag, dynamic wind forces, and Cinemachine tracking.",
    className:
      "col-span-1 md:col-span-1 lg:col-span-1 lg:row-span-1 lg:col-start-3 lg:col-end-4 lg:row-start-2 lg:row-end-3",
    category: "Unity 3D Simulation",
    tags: ["Unity 3D", "C#", "Cinemachine"],
    glowClass: "hover:shadow-[0_0_35px_-5px_rgba(56,189,248,0.35)]",
    background: (
      <div className="absolute inset-0 bg-black overflow-hidden">
        <img
          src="/paperplane.png"
          className="w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
          alt="Paper Plane Simulator in Unity 3D"
        />
      </div>
    ),
    tooltip: "Thumbnail is taken inside the simulation",
    href: "https://github.com/xbl4z3r/paper-plane-simulator",
    cta: "View on GitHub",
  },
  {
    name: "Hyper Client",
    description:
      "Minecraft PvP client with multi-version Fabric architecture (1.8.9 - 1.20+), custom C# launcher, and FPS optimizations.",
    className:
      "col-span-1 md:col-span-2 lg:col-span-2 lg:row-span-1 lg:col-start-2 lg:col-end-4 lg:row-start-3 lg:row-end-4",
    category: "Minecraft Client & Launcher",
    tags: ["Fabric", "Java", "C# .NET"],
    glowClass: "hover:shadow-[0_0_35px_-5px_rgba(36,200,219,0.35)]",
    background: (
      <div className="absolute inset-0 bg-black overflow-hidden">
        <img
          src="/hyperclient_bg.jpg"
          className="w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
          alt="Hyper Client Minecraft PvP"
        />
      </div>
    ),
    tooltip: "Credits to zKevsh for the thumbnail",
    href: "/hyperclient",
    cta: "Explore Client",
  },
]

const skillsData = [
  {
    category: "Languages",
    icon: Code2Icon,
    badges: [
      {
        text: "Rust",
        icon: SiRust,
      },
      {
        text: "C#",
        icon: SiDotnet,
      },
      {
        text: "Java",
        icon: SiGradle,
      },
      {
        text: "C++",
        icon: SiCplusplus,
      },
      {
        text: "TypeScript/JavaScript",
        icon: SiTypescript,
      },
    ],
    detailed: (
      <p>
        I believe that learning new languages is a great way to expand your horizons and improve
        your problem-solving as every language has its own unique features and quirks. I love
        systems programming in Rust for high-performance native desktop applications (like Sink) and
        C# / Java for robust enterprise and game clients. I also build extensively in TypeScript
        across modern full-stack web architectures.
      </p>
    ),
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
        icon: SiNextdotjs,
      },
      {
        text: "Tailwind CSS",
        icon: SiTailwindcss,
      },
      {
        text: "ShadCN",
        icon: SiShadcnui,
      },
    ],
    detailed: (
      <p>
        I've always been a fan of creating beautiful and interactive user interfaces, and I've
        experimented with various frontend technologies to achieve that goal. I'm most proficient in
        React and Next.js, as I've used them the most in my projects. To style my components, I
        mainly use Tailwind CSS and ShadCN, as they allow me to quickly prototype and style my
        components without having to write a lot of CSS.
      </p>
    ),
  },
  {
    category: "Game Development",
    icon: GamepadIcon,
    badges: [
      {
        text: "Unity",
        icon: SiUnity,
      },
      {
        text: "OpenGL",
        icon: SiOpengl,
      },
      {
        text: "LWJGL",
        icon: KeyboardIcon,
      },
      {
        text: "Unreal Engine",
        icon: SiUnrealengine,
      },
    ],
    detailed: (
      <p>
        Game development has always been a passion of mine, and I've worked on various game projects
        to improve my skills in this area. I started my journey with Unreal, but I quickly switched
        to Unity due to its ease of use and vast community support. I've also experimented with
        OpenGL and LWJGL for more low-level game development. This has allowed me to understand the
        inner workings of game engines and graphics programming.
      </p>
    ),
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
        icon: SiExpress,
      },
      {
        text: "MongoDB",
        icon: SiMongodb,
      },
      {
        text: "WebSockets",
        icon: SiSocketdotio,
      },
    ],
    detailed: (
      <p>
        I've always been fascinated by the backend side of things. I love designing and implementing
        scalable and efficient backend services to support my frontend applications. I'm most
        proficient in Node.js and Express, as I've used them the most in my projects. I've also
        worked with MongoDB as my database of choice due to its flexibility and scalability. I've
        also experimented with WebSockets for real-time communication between clients and servers.
      </p>
    ),
  },
  {
    category: "Tools & DevOps",
    icon: WorkflowIcon,
    badges: [
      {
        text: "Tauri",
        icon: SiTauri,
      },
      {
        text: "Git",
        icon: SiGit,
      },
      {
        text: "Docker",
        icon: SiDocker,
      },
      {
        text: "GitHub Actions",
        icon: SiGithubactions,
      },
      {
        text: "JetBrains IDEs",
        icon: SiJetbrains,
      },
    ],
    detailed: (
      <p>
        I believe that having the right tools and workflows is essential to being a productive
        developer. I've adopted Git as my version control system of choice, and I use it in all my
        projects to keep track of changes and collaborate with others. I've also worked with Docker
        to containerize my applications and GitHub Actions for CI/CD pipelines. I'm a big fan of
        JetBrains IDEs, as they provide powerful features and integrations to make my development
        process smoother.
      </p>
    ),
  },
  {
    category: "Other",
    icon: SquareMenuIcon,
    badges: [
      {
        text: "CI/CD",
        icon: SiGithub,
      },
      {
        text: "System Design",
        icon: ComputerIcon,
      },
      {
        text: "Robotics",
        icon: SiFirst,
      },
      {
        text: "IOT",
        icon: WifiIcon,
      },
    ],
    detailed: (
      <p>
        I'm always looking to expand my skill set and learn new things. I've worked on various
        projects that have allowed me to gain experience in CI/CD pipelines, system design,
        robotics, and IOT. I believe that having a diverse skill set is essential in today's
        fast-paced and ever-changing tech landscape, and I'm always looking for new opportunities to
        learn and grow.
      </p>
    ),
  },
]

export default function Home() {
  const { colors } = useColor()
  const [isOpen, setIsOpen] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    if (isHovering) {
      setIsOpen(true)
    } else {
      const timer = setTimeout(() => {
        setIsOpen(false)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isHovering])

  const skills = skillsData.map((skill) => ({
    ...skill,
    // Replace the icon component with the styled version
    icon: <skill.icon className="w-6 h-6" style={{ color: colors.vibrant }} />,
  }))

  return (
    <>
      <Navbar
        navbarData={siteConfig.pages.portfolio}
        accentColors={[colors.vibrant, colors.muted]}
      />
      <main className="container mx-auto max-w-7xl pt-6 px-6 grow h-full">
        <Meteors
          number={250}
          colors={[
            colors.vibrant,
            colors.muted,
            colors.light_vibrant,
            colors.light_muted,
            colors.dark_vibrant,
            colors.dark_muted,
          ]}
        />
        <section
          className="flex flex-col items-center justify-evenly bg-background min-h-screen"
          id="home"
        >
          <div className="inline-block max-w-lg text-center justify-center items-center">
            <div className="flex flex-wrap items-center justify-center">
              <h1 className={"text-4xl md:text-5xl lg:text-6xl"}>Hi, I'm&nbsp;</h1>
              <SparklesText
                text="xbl4z3r"
                colors={{ first: colors.vibrant, second: colors.muted }}
                className={"text-4xl md:text-5xl lg:text-6xl"}
              />
            </div>
            <TaglineAnimation />
          </div>
          <SpotifyCard />
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
                >
                  •
                </h2>

                <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold text-left justify-center">
                  About Me
                </h2>
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
                color={colors.vibrant}
              />
            </div>
          </div>

          <div className={"flex flex-wrap items-center justify-between"}>
            <div className={"flex flex-col gap-3"}>
              <p className="text-left max-w-3xl text-md sm:text-xl md:text-xl lg:text-xl font-normal">
                I'm a self-taught software engineer and game developer with a passion for creating
                interactive experiences. I've always been fascinated by physics, mathematics, and
                computer science, and I love to experiment with new technologies and tools. I'm
                currently working on a variety of projects, including game development, web
                development, and backend services, all part of my journey to become a better
                developer. I'm also the guitarist of a band I started with some friends. I'm always
                looking for new opportunities to learn and grow, so feel free to{" "}
                <Popover
                  open={isOpen}
                  onOpenChange={(open) => {
                    setIsOpen(open)
                    if (!open) setIsHovering(false)
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
                        shineColor={[
                          colors.vibrant,
                          colors.muted,
                          colors.light_vibrant,
                          colors.light_muted,
                          colors.dark_vibrant,
                          colors.dark_muted,
                        ]}
                        className="absolute inset-0 rounded-lg"
                      />
                      <div className="space-y-1">
                        <h4 className="text-md font-semibold">xbl4z3r</h4>
                        <p className="text-sm">Software Engineer</p>
                        <div className="flex items-center pt-2">
                          <SiX className="mr-2 h-4 w-4 opacity-70" />{" "}
                          <span className="text-xs text-muted-foreground">
                            <a href={siteConfig.links.x} target="_blank">
                              @xbl4z3r
                            </a>
                          </span>
                        </div>
                        <div className="flex items-center pt-2">
                          <SiDiscord className="mr-2 h-4 w-4 opacity-70" />{" "}
                          <span className="text-xs text-muted-foreground">
                            <a href={siteConfig.links.discord} target="_blank">
                              @xbl4z3r
                            </a>
                          </span>
                        </div>
                        <div className="flex items-center pt-2">
                          <SiGithub className="mr-2 h-4 w-4 opacity-70" />{" "}
                          <span className="text-xs text-muted-foreground">
                            <a href={siteConfig.links.github} target="_blank">
                              @xbl4z3r
                            </a>
                          </span>
                        </div>
                        <p className="pt-2 text-sm text-muted-foreground">
                          These are the only ways to contact me. I don't use any other platforms.
                        </p>
                      </div>
                    </Card>
                  </PopoverContent>
                </Popover>{" "}
                if you'd like to chat!
              </p>
            </div>
            <div className="relative items-center justify-center w-48 h-48 hidden lg:flex">
              <div className="absolute bg-linear-to-br from-vibrant to-muted rounded-lg">
                <SpinningText radius={10} className="absolute">
                  about me • about me • about me • about me • about me •
                </SpinningText>
              </div>
              <BookHeartIcon
                color={colors.vibrant}
                className="absolute w-12 h-12 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              />
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
                >
                  •
                </h2>
                <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold text-left justify-center">
                  My Skills
                </h2>
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
                {({ isExpanded }) => (
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
                                <Badge
                                  key={valueIndex}
                                  className="border-transparent transition-colors duration-200 hover:opacity-90"
                                  onMouseEnter={(e) => {
                                    e.currentTarget.dataset.backupBg =
                                      e.currentTarget.style.backgroundColor
                                    e.currentTarget.style.backgroundColor = colors.light_muted
                                  }}
                                  onMouseLeave={(e) => {
                                    if (e.currentTarget.dataset.backupBg) {
                                      e.currentTarget.style.backgroundColor =
                                        e.currentTarget.dataset.backupBg
                                    }
                                  }}
                                >
                                  <div className="flex flex-row gap-2">
                                    <badge.icon className="w-4 h-4" />
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
          className="flex flex-col items-left justify-evenly bg-background min-h-full py-16 gap-y-8 my-24"
          id="projects"
        >
          <div className="flex flex-row items-left justify-left gap-4">
            <h2
              className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold text-left justify-center bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(to right, ${colors.vibrant}, ${colors.muted})`,
              }}
            >
              •
            </h2>
            <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold text-left justify-center">
              Projects
            </h2>
          </div>

          {/* Bento Box Grid */}
          <BentoGrid className="w-full">
            {projects.map((project) => (
              <ProjectCard key={project.name} {...project} />
            ))}
          </BentoGrid>
        </section>
      </main>
    </>
  )
}
