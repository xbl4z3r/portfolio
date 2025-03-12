"use client";

import {useEffect, useState} from "react";
import NextLink from "next/link";
import {siteConfig} from "@/config/site";
import {ThemeSwitch} from "@/components/theme-switch";
import {
    GithubIcon,
    DiscordIcon,
    HeartFilledIcon,
    Logo,
} from "@/components/icons";
import {Button} from "@/components/ui/button";
import {Menu, X} from "lucide-react";

export const Navbar = ({
                           navbarData, accentColors
                       }: {
    navbarData: {title: string, icon: string, navItems: { href: string; label: string }[]};
    accentColors: string[];
}) => {
    const [activeSection, setActiveSection] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const getGradientTextStyle = () => ({
        backgroundImage: accentColors.length > 1
            ? `linear-gradient(to right, ${accentColors[0]}, ${accentColors[1] || accentColors[0]})`
            : `linear-gradient(to right, ${accentColors[0]}, ${accentColors[0]})`,
        backgroundSize: "100%",
        backgroundRepeat: "no-repeat",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        color: "transparent",
        display: "inline-block",
        fontWeight: "600"
    });

    useEffect(() => {
        const handleScroll = () => {
            const sections = navbarData.navItems.map(item => {
                const [, id] = item.href.split("#");
                return document.getElementById(id);
            }).filter(Boolean);

            if (sections.length === 0) return;

            let currentSectionId = "";
            let minDistance = Infinity;

            sections.forEach((section) => {
                if (!section) return;
                const rect = section.getBoundingClientRect();
                const distance = Math.abs(rect.top);

                if (distance < minDistance) {
                    minDistance = distance;
                    currentSectionId = section.id;
                }
            });

            if (currentSectionId && currentSectionId !== activeSection) {
                setActiveSection(currentSectionId);
            }
        };

        window.addEventListener('scroll', handleScroll);
        setTimeout(handleScroll, 100);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [activeSection, navbarData]);

    return (
        <nav className="w-full border-b border-border sticky top-0 z-50 backdrop-blur-xs bg-background/80">
            <div className="container flex h-16 items-center justify-between mx-auto max-w-7xl">
                <div className="flex items-center gap-3">
                    <NextLink className="flex justify-start items-center gap-1" href="#">
                        <img src={navbarData.icon} alt={navbarData.title} className="h-10 w-auto"/>
                        <p className="font-bold text-inherit">{navbarData.title}</p>
                    </NextLink>
                    <div className="hidden sm:flex gap-4 justify-start ml-2">
                        {navbarData.navItems.map((item) => {
                            const [, id] = item.href.split("#");
                            const isActive = id === activeSection;

                            return (
                                <div key={item.href} className="relative">
                                    <NextLink
                                        className="text-sm font-medium transition-all hover:text-primary"
                                        href={item.href}
                                        style={isActive ? getGradientTextStyle() : {}}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            const element = document.getElementById(id);
                                            if (element) {
                                                element.scrollIntoView({behavior: "smooth"});
                                            }
                                        }}
                                    >
                                        {item.label}
                                    </NextLink>
                                    {isActive && (
                                        <span
                                            className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                                            style={{
                                                background: accentColors.length > 1
                                                    ? `linear-gradient(to right, ${accentColors[0]}, ${accentColors[1] || accentColors[0]})`
                                                    : accentColors[0]
                                            }}
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="hidden sm:flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <a
                            href={siteConfig.links.discord}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="Discord"
                        >
                            <DiscordIcon className="h-auto w-auto"/>
                            <span className="sr-only">Discord</span>
                        </a>
                        <a
                            href={siteConfig.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="GitHub"
                        >
                            <GithubIcon className="h-auto w-auto"/>
                            <span className="sr-only">GitHub</span>
                        </a>
                        <ThemeSwitch/>
                    </div>
                    <div className="hidden sm:block">
                        <Button
                            variant="outline"
                            size="sm"
                            className="gap-1"
                            asChild
                        >
                            <a
                                href={siteConfig.links.sponsor}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1"
                                aria-label="Sponsor"
                            >
                                <HeartFilledIcon className="h-4 w-4" style={{color: accentColors[0]}}/>
                                Sponsor
                            </a>
                        </Button>
                    </div>
                </div>
                <div className="flex sm:hidden items-center gap-2">
                    <a
                        href={siteConfig.links.discord}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Discord"
                    >
                        <DiscordIcon className="h-auto w-auto"/>
                        <span className="sr-only">Discord</span>
                    </a>
                    <a
                        href={siteConfig.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="GitHub"
                    >
                        <GithubIcon className="h-auto w-auto"/>
                    </a>
                    <ThemeSwitch/>
                    <button
                        className="inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X className="h-auto w-auto"/> : <Menu className="h-auto w-auto"/>}
                    </button>
                </div>
            </div>
            <div
                className={`sm:hidden absolute left-0 right-0 top-full border-t border-border z-50 backdrop-blur-xs shadow-lg overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0 border-t-0'}`}>
                <div className="container py-4 mx-auto space-y-3 overflow-y-auto bg-background/80">
                    {navbarData.navItems.map((item, index) => {
                        const [, id] = item.href.split("#");
                        const isActive = id === activeSection;

                        return (
                            <div key={`${item.href}-${index}`} className="py-2">
                                <NextLink
                                    href="#"
                                    className={"block px-2 py-1 text-lg font-medium relative transition-all duration-300"}
                                    style={isActive ? getGradientTextStyle() : {}}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setIsMenuOpen(false);
                                        const element = document.getElementById(id);
                                        if (element) {
                                            element.scrollIntoView({behavior: "smooth"});
                                        }
                                    }}
                                >
                                    {item.label}
                                    {isActive && (
                                        <span
                                            className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full transition-all duration-300"
                                            style={{
                                                backgroundImage: accentColors.length > 1
                                                    ? `linear-gradient(to bottom, ${accentColors[0]}, ${accentColors[1] || accentColors[0]})`
                                                    : `linear-gradient(to bottom, ${accentColors[0]}, ${accentColors[0]})`,
                                            }}
                                        />
                                    )}
                                </NextLink>
                            </div>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
};