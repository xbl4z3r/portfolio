"use client";

import { Button, Card, Image } from "@heroui/react";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

import { subtitle, title } from "@/components/primitives";
import { Navbar } from "@/components/navbar";
import { siteConfig } from "@/config/site";
import { hyperclientConfig } from "@/config/hyperclient";

export default function HyperclientPage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Navbar navbarData={siteConfig.navItems.hyperclient} />
      <main className="container mx-auto max-w-7xl pt-6 px-6 flex-grow h-full">
        <section
          className="flex flex-col items-center justify-center h-full bg-background"
          id="home"
        >
          <div className="flex flex-col items-center justify-center max-w-xl text-center">
            <Image
              alt="Hyper Client"
              className="w-72 h-72 rounded-full mx-auto"
              src="/hyperclient.png"
            />
            <div className="flex flex-row items-center justify-center">
              <h1 className={title({ size: "lg" })}>Meet&nbsp;</h1>
              <h1 className={title({ color: "green", size: "lg" })}>
                Hyper Client
              </h1>
            </div>
            <h4 className={subtitle({ class: "mt-4" })}>
              Feature-rich Minecraft PvP client for a better gaming experience.
            </h4>
            <div className="flex flex-row items-center justify-center w-full gap-8 hidden">
              <Button
                className="mt-8"
                color="success"
                size="lg"
                onClick={() => {
                  window.location.href += "/download";
                }}
              >
                <h2 className={subtitle()}>Download</h2>
              </Button>
              <Button
                className="mt-8"
                color="default"
                size="lg"
                onClick={() => {
                  window.location.href += "/store";
                }}
              >
                <h2 className={subtitle()}>Store</h2>
              </Button>
            </div>
          </div>
        </section>
        <section
          className="flex flex-col items-center justify-evenly h-screen w-full py-8"
          id="features"
        >
          <Card className="w-full max-w-6xl p-8 from-green-400 to-green-700 bg-gradient-to-br rounded-xl">
            <div className="inline-block max-w-6xl text-center justify-center items-center w-full">
              <h1 className={title({ size: "lg" })}>Under Construction</h1>
              <h4 className={subtitle({ class: "mt-4" })}>
                This page is currently under construction. Please check back
                later.
              </h4>
            </div>
          </Card>
        </section>
      </main>
    </>
  );
}
