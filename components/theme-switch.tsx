"use client";

import { FC, useState, useEffect } from "react";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { useTheme } from "next-themes";
import clsx from "clsx";

import { SunFilledIcon, MoonFilledIcon } from "@/components/icons";

export interface ThemeSwitchProps {
    className?: string;
    classNames?: {
        base?: string;
        wrapper?: string;
    };
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({
                                                      className,
                                                      classNames,
                                                  }) => {
    const [isMounted, setIsMounted] = useState(false);
    const { theme, setTheme } = useTheme();
    const isLight = theme === "light";

    const handleToggle = () => {
        setTheme(isLight ? "dark" : "light");
    };

    useEffect(() => {
        setIsMounted(true);
    }, []); // Fixed dependency array

    // Prevent Hydration Mismatch
    if (!isMounted) return <div className="w-6 h-6" />;

    return (
        <button
            aria-label={`Switch to ${isLight ? 'dark' : 'light'} theme`}
            onClick={handleToggle}
            className={clsx(
                "px-px transition-opacity hover:opacity-80 cursor-pointer",
                className,
                classNames?.base,
            )}
        >
            <VisuallyHidden>
                <label><input
                    type="checkbox"
                    checked={isLight}
                    onChange={handleToggle}
                /></label>
            </VisuallyHidden>
            <div
                className={clsx(
                    [
                        "w-auto h-auto",
                        "bg-transparent",
                        "rounded-lg",
                        "flex items-center justify-center",
                        "group-data-[selected=true]:bg-transparent",
                        "!text-default-500",
                        "pt-px",
                        "px-0",
                        "mx-0",
                    ],
                    classNames?.wrapper,
                )}
            >
                {isLight ? (
                    <MoonFilledIcon size={24} />
                ) : (
                    <SunFilledIcon size={24} />
                )}
            </div>
        </button>
    );
};