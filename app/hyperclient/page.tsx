"use client";

import React, {memo, useEffect, useState} from "react";

import {siteConfig} from "@/config/site";
import {Navbar} from "@/components/navbar";
import {LineShadowText} from "@/components/magicui/line-shadow-text";
import {useTheme} from "next-themes";
import {Ripple} from "@/components/magicui/ripple";
import {AuroraText} from "@/components/magicui/aurora-text";
import {TextReveal} from "@/components/magicui/text-reveal";
import {BentoGrid} from "@/components/magicui/bento-grid";
import {cn} from "@/lib/utils";
import {GaugeIcon, PackageIcon, PaintbrushIcon} from "lucide-react";

const features = [
    {
        name: "Customizable",
        description: "Hyper Client is fully customizable to suit your needs, with a wide range of customization options.",
        className: "lg:row-start-1 lg:row-end-3 lg:col-start-1 lg:col-end-2",
        background: (<div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-lg"/>),
        icon: <PaintbrushIcon/>
    },
    {
        name: "Optimized",
        description: "Hyper Client is optimized for performance, ensuring that you get the best experience possible.",
        className: "lg:row-start-1 lg:row-end-2 lg:col-start-2 lg:col-end-3",
        background: (<div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent rounded-lg"/>),
        icon: <GaugeIcon/>
    },
    {
        name: "Feature-packed",
        description: "Hyper Client is packed with features, so no matter whether you're a casual player or a hardcore gamer, there's something for you.",
        className: "lg:row-start-2 lg:row-end-3 lg:col-start-2 lg:col-end-3",
        background: (<div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent rounded-lg"/>),
        icon: <PackageIcon/>
    }
]

const FeatureCard = ({
                         name,
                         className,
                         background,
                         description,
                         icon,
                         ...props
                     }: {
    name: string;
    className: string;
    background: React.ReactNode;
    description: string;
    icon: React.ReactNode;
    props: any;
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
            {...props}
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

export default function HyperClientPage() {
    const theme = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);
    const shadowColor = mounted ? (theme.resolvedTheme === "dark" ? "white" : "black") : "transparent";

    return (
        <>
            <Navbar navbarData={siteConfig.pages.hyperclient} accentColors={["#3398db", "#a3f4ff"]}/>
            <main className="container mx-auto max-w-7xl grow h-full">
                <section
                    className="relative flex flex-col items-center justify-center bg-background h-[calc(100vh-4rem)]"
                    id="home"
                >
                    <Ripple
                        mainCircleSize={700}
                        className="z-0"
                    />
                    <div
                        className="relative z-10 flex flex-col max-w-5xl w-full items-center justify-center">
                        <h1 className="text-6xl md:text-7xl lg:text-7xl text-center font-bold gradient text-transparent bg-clip-text bg-linear-to-r from-[#3398db] to-[#a3f4ff] p-3 md:p-4 lg:p-5">
                            Hyper Client
                        </h1>
                        <div className="flex flex-wrap items-center justify-center">
                        <span className="text-lg md:text-xl lg:text-2xl">
                            A <AuroraText colors={["#3398db", "#49b8e4", "#71d2ef", "#8be3f9", "#a3f4ff"]}
                                          className="text-lg md:text-xl lg:text-2xl">modern</AuroraText> and{" "}
                            <LineShadowText className="italic" shadowColor={shadowColor}>powerful</LineShadowText>{" "}
                            Minecraft client.
                        </span>
                        </div>
                    </div>
                </section>
                <section
                    className="relative flex flex-col items-center justify-center bg-background"
                >
                    <TextReveal>Hyper Client will change the way you play Minecraft.</TextReveal>
                </section>
                <section
                    className="relative flex flex-col items-center justify-center bg-background min-h-screen px-6"
                    id="features"
                >
                    <div className="relative flex flex-col md:flex-row lg:flex-row items-center justify-evenly bg-background w-full">
                        <div className="hidden md:flex lg:flex flex-col gap-2 max-w-md pr-10">
                            <h1 className="text-4xl text-start font-bold gradient text-transparent bg-clip-text bg-linear-to-r from-[#3398db] to-[#a3f4ff]">
                                Experience the future of Minecraft.
                            </h1>
                            <p className="text-lg md:text-xl lg:text-2xl text-start">
                                Hyper Client is a modern and powerful Minecraft client that will change the way you play
                                Minecraft.
                            </p>
                        </div>
                        <div className="flex md:hidden lg:hidden flex-col gap-2 max-w-md pb-20">
                            <h1 className="text-4xl text-center font-bold gradient text-transparent bg-clip-text bg-linear-to-r from-[#3398db] to-[#a3f4ff]">
                                Experience the future of Minecraft.
                            </h1>
                            <p className="text-lg md:text-xl lg:text-2xl text-center">
                                Hyper Client is a modern and powerful Minecraft client that will change the way you play
                                Minecraft.
                            </p>
                        </div>
                        <div>
                            <BentoGrid className="grid-cols-2 gap-4">
                                {features.map((feature) => (
                                    <FeatureCard key={feature.name} {...feature} />
                                ))}
                            </BentoGrid>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}