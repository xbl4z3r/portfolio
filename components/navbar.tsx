"use client";

import { useState } from "react";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  Logo,
} from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export const Navbar = ({
                         navbarData,
                       }: {
  navbarData: { href: string; label: string }[];
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
      <nav className="w-full border-b border-border sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between mx-auto max-w-7xl">
          {/* Logo and brand */}
          <div className="flex items-center gap-3">
            <NextLink className="flex justify-start items-center gap-1" href="/">
              <Logo />
              <p className="font-bold text-inherit">xbl4z3r</p>
            </NextLink>

            {/* Desktop navigation links */}
            <div className="hidden lg:flex gap-4 justify-start ml-2">
              {navbarData.map((item) => (
                  <div key={item.href} className="relative">
                    <NextLink
                        className="text-sm font-medium transition-colors hover:text-primary"
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault();
                          const [, id] = item.href.split("#");
                          const element = document.getElementById(id);
                          if (element) {
                            element.scrollIntoView({ behavior: "smooth" });
                          }
                        }}
                    >
                      {item.label}
                    </NextLink>
                  </div>
              ))}
            </div>
          </div>

          {/* Desktop right side elements */}
          <div className="hidden sm:flex items-center gap-4">
            <div className="flex items-center gap-2">
              <a
                  href={siteConfig.links.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Discord"
              >
                <DiscordIcon className="h-5 w-5" />
                <span className="sr-only">Discord</span>
              </a>
              <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="GitHub"
              >
                <GithubIcon className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <ThemeSwitch />
            </div>
            <div className="hidden md:block">
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
                  <HeartFilledIcon className="text-red-500 h-4 w-4" />
                  Sponsor
                </a>
              </Button>
            </div>
          </div>

          {/* Mobile right side + menu toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <GithubIcon className="h-5 w-5" />
            </a>
            <ThemeSwitch />
            <button
                className="inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-accent hover:text-accent-foreground"
                onClick={toggleMenu}
                aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
            <div className="sm:hidden border-t border-border">
              <div className="container py-4 mx-auto space-y-3">
                {navbarData.map((item, index) => (
                    <div key={`${item.href}-${index}`} className="py-2">
                      <NextLink
                          href="#"
                          className={clsx(
                              "text-foreground block px-2 py-1 text-lg font-medium",
                              {
                                "text-primary": index === 2,
                                "text-red-500": index === navbarData.length - 1,
                              }
                          )}
                          onClick={(e) => {
                            e.preventDefault();
                            setIsMenuOpen(false);
                            const [, id] = item.href.split("#");
                            const element = document.getElementById(id);
                            if (element) {
                              element.scrollIntoView({ behavior: "smooth" });
                            }
                          }}
                      >
                        {item.label}
                      </NextLink>
                    </div>
                ))}
              </div>
            </div>
        )}
      </nav>
  );
};