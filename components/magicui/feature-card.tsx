import React from "react";
import {cn} from "@/lib/utils";

export const FeatureCard = ({
                         name,
                         className,
                         background,
                         description,
                         icon,
                     }: {
    name: string;
    className: string;
    background: React.ReactNode;
    description: string;
    icon: React.ReactNode;
}) => {
    return (
        <div
            key={name}
            className={cn(
                "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
                "bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
                "transform-gpu dark:bg-background dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
                className,
            )}
        >
            <div>{background}</div>
            <div className="absolute p-6 flex flex-wrap w-full justify-between items-center z-10">
                <div className="flex flex-row gap-2 items-center">
                    <div className="h-12 w-12 flex items-center justify-center rounded-lg bg-primary/10">
                        {icon}
                    </div>
                    <p className="text-3xl lg:text-4xl font-semibold">
                        {name}
                    </p>
                </div>
            </div>
            <div
                className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300">
                <p className="max-w-lg text-primary/90">{description}</p>
            </div>
            <div
                className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] dark:group-hover:bg-neutral-800/10"/>
        </div>
    );
};