"use client";

import React, {useState} from "react";
import {cn} from "@/lib/utils";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {Info} from "lucide-react";
import {Button} from "@/components/ui/button";
import {ArrowRightIcon} from "@radix-ui/react-icons";

export interface ProjectCardProps extends React.ComponentPropsWithoutRef<"div"> {
    name: string;
    className?: string;
    background: React.ReactNode;
    description: string;
    category?: string;
    tags?: string[];
    tooltip?: string;
    href: string;
    cta: string;
    accentColor?: string;
    glowClass?: string;
}

export const ProjectCard = ({
    name,
    className,
    background,
    description,
    category,
    tags,
    tooltip,
    href,
    cta,
    accentColor,
    glowClass,
    ...props
}: ProjectCardProps) => {
    const [isTooltipOpen, setIsTooltipOpen] = useState(false);

    return (
        <div
            key={name}
            className={cn(
                "group relative flex flex-col justify-between overflow-hidden rounded-2xl cursor-pointer",
                "border border-white/10 bg-zinc-950/80 backdrop-blur-sm",
                "transition-all duration-500 hover:border-white/25 hover:shadow-2xl",
                glowClass || "hover:shadow-emerald-500/10",
                className,
            )}
            onClick={() => {
                if (href.startsWith("http")) {
                    window.open(href, "_blank", "noopener,noreferrer");
                } else {
                    window.location.href = href;
                }
            }}
            {...props}
        >
            {/* Background Image / Component */}
            <div className="absolute inset-0 z-0 overflow-hidden">{background}</div>

            {/* Dark Gradient Scrim: preserves artwork vibrancy while guaranteeing razor-sharp text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/15 pointer-events-none z-[1]" />

            {/* Top Header: Category, Minimal Tags, Title & Tooltip */}
            <div className="relative p-5 sm:p-6 flex flex-wrap w-full justify-between items-start z-10">
                <div className="flex flex-col gap-1.5 max-w-[85%]">
                    <div className="flex items-center flex-wrap gap-2">
                        {category && (
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-white/70">
                                {category}
                            </span>
                        )}
                        {tags && tags.length > 0 && (
                            <div className="flex items-center gap-1.5 flex-wrap">
                                {tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-white/10 text-white/90 border border-white/15 backdrop-blur-md shadow-sm"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight group-hover:text-white transition-colors drop-shadow-md">
                        {name}
                    </h3>
                </div>

                {tooltip && (
                    <div className="shrink-0 relative z-20" onClick={(e) => e.stopPropagation()}>
                        <TooltipProvider delayDuration={150}>
                            <Tooltip open={isTooltipOpen} onOpenChange={setIsTooltipOpen}>
                                <TooltipTrigger asChild>
                                    <button
                                        type="button"
                                        aria-label={`Image disclaimer: ${tooltip}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsTooltipOpen((prev) => !prev);
                                        }}
                                        className="p-1.5 rounded-full bg-black/60 hover:bg-black/85 text-zinc-400 hover:text-white transition-all duration-200 border border-white/15 backdrop-blur-md shadow-md focus:outline-none focus:ring-1 focus:ring-white/40 active:scale-95 cursor-pointer"
                                    >
                                        <Info className="w-4 h-4" />
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent
                                    side="top"
                                    align="end"
                                    sideOffset={6}
                                    className="bg-zinc-950/95 border border-white/15 text-xs text-zinc-200 px-3 py-1.5 rounded-lg shadow-2xl backdrop-blur-md max-w-xs z-50 pointer-events-auto"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <p className="font-sans leading-relaxed">{tooltip}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                )}
            </div>

            {/* Bottom Content: Description */}
            <div className="relative z-10 flex transform-gpu flex-col gap-1 p-5 sm:p-6 transition-all duration-300 group-hover:-translate-y-8">
                <p className="max-w-lg text-xs sm:text-sm text-zinc-200/90 leading-relaxed drop-shadow-sm font-normal">
                    {description}
                </p>
            </div>

            {/* Hover CTA Button */}
            <div
                className={cn(
                    "pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 sm:p-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 z-10",
                )}
            >
                <Button
                    variant="ghost"
                    asChild
                    size="sm"
                    className="pointer-events-auto text-white hover:text-white bg-white/10 hover:bg-white/20 border border-white/15 backdrop-blur-md text-xs font-medium rounded-lg shadow-lg"
                >
                    <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-white flex items-center gap-1.5"
                    >
                        {cta}
                        <ArrowRightIcon className="h-3.5 w-3.5 rtl:rotate-180" />
                    </a>
                </Button>
            </div>

            {/* Subtle card sheen on hover */}
            <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-white/[.03] z-[2]" />
        </div>
    );
};