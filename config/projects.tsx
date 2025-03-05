import {CodeIcon, FrameIcon, LaptopIcon, LayersIcon} from "@radix-ui/react-icons";
import React from "react";

export const projects = [
    {
        Icon: CodeIcon,
        name: "Hyper Bot",
        description: "Discord bot with moderation, utility, and fun commands",
        className: "lg:row-start-1 lg:row-end-3 lg:col-start-1 lg:col-end-2",
        background: (
            <div className="absolute inset-0 rounded-lg bg-background/80">
                <img
                    src="/stock_discord.webp"
                    className="w-full h-full object-cover mix-blend-overlay opacity-50"
                    alt="Discord"
                />
            </div>
        ),
        category: "Multipurpose Discord Application",
        href: "",
        cta: ""
    },
    {
        Icon: CodeIcon,
        name: "Game Development",
        description: "Creating interactive experiences and games using Unity and other engines",
        className: "lg:row-start-1 lg:row-end-2 lg:col-start-2 lg:col-end-4",
        background: <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-lg"/>,
        href: "",
        cta: ""
    },
    {
        Icon: LaptopIcon,
        name: "Frontend Development",
        description: "Building responsive user interfaces with React, Next.js, and TypeScript",
        className: "lg:row-start-2 lg:row-end-3 lg:col-start-2 lg:col-end-3",
        background: <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent rounded-lg"/>,
        href: "",
        cta: ""
    },
    {
        Icon: FrameIcon,
        name: "Backend Development",
        description: "Creating robust APIs and services with Node.js, Express, and databases",
        className: "lg:row-start-2 lg:row-end-3 lg:col-start-3 lg:col-end-4",
        background: <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-lg"/>,
        href: "",
        cta: ""
    },
    {
        Icon: FrameIcon,
        name: "TypeScript",
        description: "Building type-safe applications for web and backend services",
        className: "lg:row-start-3 lg:row-end-4 lg:col-start-1 lg:col-end-2",
        background: <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent rounded-lg"/>,
        href: "",
        cta: ""
    },
    {
        Icon: LayersIcon,
        name: "C/C++",
        description: "Low-level systems programming and performance-critical applications",
        className: "lg:row-start-3 lg:row-end-4 lg:col-start-2 lg:col-end-3",
        background: <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-transparent rounded-lg"/>,
        href: "",
        cta: ""
    },
    {
        Icon: CodeIcon,
        name: "Java",
        description: "Enterprise applications, Android development, and cross-platform solutions",
        className: "lg:row-start-3 lg:row-end-4 lg:col-start-3 lg:col-end-4",
        background: <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-transparent rounded-lg"/>,
        href: "",
        cta: ""
    }
]