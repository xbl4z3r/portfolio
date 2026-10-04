"use client";

import React from "react";
import { siteConfig } from "@/config/site";
import { GithubIcon, DiscordIcon, HeartFilledIcon } from "@/components/icons";
import { SiX } from "@icons-pack/react-simple-icons";
import { ArrowUp } from "lucide-react";

export const Footer = () => {
    const year = new Date().getFullYear();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <main className="container mx-auto max-w-7xl px-6 py-8 grow h-full">
            <footer className="footer flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border/20 pt-8 bg-background">
                <a
                    className="text-black/50 dark:text-white/40 hover:text-black dark:hover:text-white text-base sm:text-lg transition-colors text-center sm:text-left font-normal"
                    href="/"
                >
                    Copyright © {year} xbl4z3r's development
                </a>

                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <a
                            href={siteConfig.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-8 w-8 rounded-lg bg-muted/40 hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="GitHub"
                        >
                            <GithubIcon className="h-4 w-4" />
                        </a>
                        <a
                            href={siteConfig.links.discord}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-8 w-8 rounded-lg bg-muted/40 hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="Discord"
                        >
                            <DiscordIcon className="h-4 w-4" />
                        </a>
                        <a
                            href={siteConfig.links.x}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-8 w-8 rounded-lg bg-muted/40 hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="X / Twitter"
                        >
                            <SiX className="h-3.5 w-3.5" />
                        </a>
                        <a
                            href={siteConfig.links.sponsor}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-8 w-8 rounded-lg bg-muted/40 hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-red-400 transition-colors"
                            aria-label="Sponsor"
                        >
                            <HeartFilledIcon className="h-4 w-4 text-red-500/80" />
                        </a>
                    </div>

                    <button
                        onClick={scrollToTop}
                        className="h-8 w-8 rounded-lg bg-muted/40 hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors ml-1"
                        aria-label="Back to top"
                        title="Back to top"
                    >
                        <ArrowUp className="h-4 w-4" />
                    </button>
                </div>
            </footer>
        </main>
    );
};