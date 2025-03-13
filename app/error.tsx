"use client";

import React, {useEffect} from "react";
import {InteractiveHoverButton} from "@/components/magicui/interactive-hover-button";
import {track} from "@vercel/analytics";
import {siteConfig} from "@/config/site";
import {Navbar} from "@/components/navbar";
import {ConstructionIcon} from "lucide-react";

export default function Error({
                                  error,
                                  reset,
                              }: {
    error: Error;
    reset: () => void;
}) {
    useEffect(() => {
        track('error', {
            message: error.message,
            stack: error.stack || 'no stack',
            name: error.name,
            url: window.location.href
        });
    }, [error]);

    return (
        <>
            <Navbar navbarData={{title: "xbl4z3r", icon: <img src="/favicon.ico" alt="logo" className="h-10 w-auto"/>, navItems: []}} accentColors={["#FF0000"]}/>
            <main className="container mx-auto max-w-7xl pt-6 px-6 grow h-[calc(100vh-9rem)] items-center justify-center">
            <div className="flex flex-col items-center justify-evenly h-full">
                <div className="flex flex-col gap-4">
                    <ConstructionIcon className="w-72 h-72 text-red-500 animate-pulse mx-auto"/>
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center">
                        Well, this is embarrassing. Something went wrong.
                    </h1>
                    <p className="text-lg text-center">
                        An error occurred while trying to render this segment. This is likely a bug on our end and we're
                        working to fix it.
                    </p>
                </div>
                <InteractiveHoverButton onClick={() => reset()}>
                    Try again
                </InteractiveHoverButton>
            </div>
        </main>
        </>
    );
}
