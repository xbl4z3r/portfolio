"use client";

import { cn } from "@/lib/utils";
import React, { useState, useEffect, useRef } from "react";

interface MeteorsProps {
    number?: number;
    minDelay?: number;
    maxDelay?: number;
    minDuration?: number;
    maxDuration?: number;
    angle?: number;
    colors?: string[];
    className?: string;
}

interface MeteorStyle extends React.CSSProperties {
    originalColor?: string;
    animationDuration?: string;
    animationDelay?: string;
}

function MeteorsComponent({
                              number = 20,
                              minDelay = 0.2,
                              maxDelay = 1.2,
                              minDuration = 2,
                              maxDuration = 10,
                              angle = 215,
                              colors = ["#ffffff"],
                              className,
                          }: MeteorsProps) {
    const [meteorStyles, setMeteorStyles] = useState<MeteorStyle[]>([]);
    const prevNumberRef = useRef<number>(0);
    const initializedRef = useRef<boolean>(false);

    const createMeteorStyle = (useColors: string[]): MeteorStyle => {
        const color = useColors[Math.floor(Math.random() * useColors.length)];
        return {
            "--angle": angle + "deg",
            top: `${Math.floor((Math.random() - 0.1) * 50)}%`,
            left: `${Math.floor((Math.random() - 0.5) * 200)}%`,
            animationDelay: Math.random() * (maxDelay - minDelay) + minDelay + "s",
            animationDuration: Math.floor(Math.random() * (maxDuration - minDuration) + minDuration) + "s",
            backgroundColor: color,
            boxShadow: `0 0 0 1px ${color}10`,
            originalColor: color,
        } as MeteorStyle;
    };

    const updateMeteorStyle = (idx: number) => {
        setMeteorStyles((prev) => {
            const newMeteorStyles = [...prev];
            newMeteorStyles[idx] = createMeteorStyle(colors);
            return newMeteorStyles;
        });
    };

    // Initialize and handle number changes
    useEffect(() => {
        if (typeof window === "undefined") return;

        if (!initializedRef.current) {
            setMeteorStyles(Array.from({length: number}, () => createMeteorStyle(colors)));
            prevNumberRef.current = number;
            initializedRef.current = true;
            return;
        }

        // Handle number changes
        if (number > prevNumberRef.current) {
            // Add new meteors with current colors
            const newMeteors = Array.from(
                {length: number - prevNumberRef.current},
                () => createMeteorStyle(colors)
            );
            setMeteorStyles(prev => [...prev, ...newMeteors]);
        } else if (number < prevNumberRef.current) {
            // Remove excess meteors
            setMeteorStyles(prev => prev.slice(0, number));
        }
        prevNumberRef.current = number;
    }, [number, colors]);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {meteorStyles.map((style, idx) => (
                <span
                    key={idx}
                    style={style}
                    onAnimationIteration={() => updateMeteorStyle(idx)}
                    className={cn(
                        "pointer-events-none absolute size-0.5 rotate-[var(--angle)] animate-meteor rounded-full",
                        className
                    )}
                >
                    <div
                        className="pointer-events-none absolute top-1/2 -z-10 h-px w-[50px] -translate-y-1/2"
                        style={{
                            background: `linear-gradient(to right, ${style.backgroundColor}, transparent)`,
                        }}
                    />
                </span>
            ))}
        </div>
    );
}

export const Meteors = React.memo(MeteorsComponent);