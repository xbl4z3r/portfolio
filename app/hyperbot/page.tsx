"use client";

import { Button, Card, Image } from "@heroui/react";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

import { subtitle, title } from "@/components/primitives";
import { hyperbotConfig } from "@/config/hyperbot";
import { Navbar } from "@/components/navbar";
import { siteConfig } from "@/config/site";

const formatNumber = (number: number) => {
  const SI_SYMBOL = ["", "k", "M", "B", "T", "Q"];
  const tier = (Math.log10(number) / 3) | 0;

  if (tier === 0) return number;

  const suffix = SI_SYMBOL[tier];
  const scale = Math.pow(10, tier * 3);
  const scaled = number / scale;

  return scaled.toFixed(1) + suffix;
};

export default function HyperbotPage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState({
    guilds: 0,
    users: 0,
    commands: 0,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    fetch("/api/v3/hyperbot/stats")
      .then((res) => res.json())
      .then((data) => setStats(data));
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Navbar navbarData={siteConfig.navItems.hyperbot} />
      <main className="container mx-auto max-w-7xl pt-6 px-6 flex-grow h-full">
        <section
          className="flex flex-col items-center justify-center h-full bg-background"
          id="home"
        >
          <div className="flex flex-col items-center justify-center max-w-lg text-center">
            <Image
              alt="Hyper Bot"
              className="w-72 h-72 rounded-full mx-auto"
              src="/hyperbot.png"
            />
            <div className="flex flex-row items-center justify-center">
              <h1 className={title({ size: "lg" })}>Meet&nbsp;</h1>
              <h1 className={title({ color: "violet", size: "lg" })}>
                Hyper Bot
              </h1>
            </div>
            <h4 className={subtitle({ class: "mt-4" })}>
              Multi-purpose Discord application with a lot of features.
            </h4>
            <div className="flex flex-row items-center justify-center w-full gap-8">
              <Button
                className="mt-8"
                color="secondary"
                size="lg"
                onClick={() => {
                  window.location.href += "/invite";
                }}
              >
                <h2 className={subtitle()}>Invite</h2>
              </Button>
              <Button
                className="mt-8"
                color="default"
                size="lg"
                onClick={() => {
                  window.location.href += "/vote";
                }}
              >
                <h2 className={subtitle()}>Vote</h2>
              </Button>
            </div>
          </div>
        </section>
        <section
          className="flex flex-col items-center justify-evenly h-fit w-full py-8"
          id="features"
        >
          <Card className="w-full max-w-6xl p-8 from-violet-400 to-violet-700 bg-gradient-to-br rounded-xl">
            <div className="inline-block max-w-6xl text-center justify-center items-center w-full">
              <h1 className={title({ size: "lg" })}>Features</h1>
              <h4 className={subtitle({ class: "mt-4" })}>
                Here are some of the features that Hyper Bot offers.
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 h-fit p-4">
                {hyperbotConfig.features.map((feature) => (
                  <div
                    key={feature.title}
                    className="flex flex-col items-center w-full"
                  >
                    <Card
                      className="flex flex-col items-center w-fit p-6"
                      isBlurred={true}
                    >
                      <Image
                        alt={feature.title}
                        className="w-16 h-16"
                        src={
                          theme === "dark"
                            ? feature.icon.dark
                            : feature.icon.light
                        }
                      />
                      <h3
                        className={title({
                          size: "sm",
                        })}
                      >
                        {feature.title}
                      </h3>
                      <p className={subtitle({ className: "mt-2" })}>
                        {feature.description}
                      </p>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </section>
        <section
          className="flex flex-col items-center justify-center h-fit w-full bg-background py-12 gap-y-6"
          id="about"
        >
          <div className="flex flex-col items-start justify-start w-full text-left">
            <div className="flex flex-row items-center justify-center text-center">
              <Image
                alt="Hyper Bot"
                className="w-14 h-14 rounded-full mx-auto"
                src="/hyperbot.png"
              />
              <h1 className={title({ size: "lg", color: "violet" })}>H</h1>
              <h1 className={title({ size: "lg" })}>igh Performance</h1>
            </div>
            <h4 className={subtitle({ class: "mt-4 max-w-2xl" })}>
              Hyper Bot is a high-performance Discord application that can
              handle a large number of servers and users. It is built with
              performance in mind and can handle thousands of users at once.
              Hyper Bot is built with the latest technologies and is constantly
              updated to ensure that it is always running at peak performance.
            </h4>
          </div>
          <div className="flex flex-col items-start justify-start sm:items-end sm:justify-end lg:items-end lg:justify-end w-full text-left sm:text-right lg:text-right">
            <div className="flex flex-row items-center justify-center text-center">
              <Image
                alt="Hyper Bot"
                className="w-14 h-14 rounded-full mx-auto"
                src="/hyperbot.png"
              />
              <h1 className={title({ size: "lg", color: "violet" })}>Y</h1>
              <h1 className={title({ size: "lg" })}>ou</h1>
            </div>
            <h4 className={subtitle({ class: "mt-4 max-w-2xl" })}>
              The Discord application is built with its users in mind, offering
              a suite of features to customize the experience. Hyper Bot is
              built for you, the user, and is capable of running the way you
              want it to. With a wide range of customization options, Hyper Bot
              is the perfect Discord application for you.
            </h4>
          </div>
          <div className="flex flex-col items-start justify-start w-full text-left">
            <div className="flex flex-row items-center justify-center text-center">
              <Image
                alt="Hyper Bot"
                className="w-14 h-14 rounded-full mx-auto"
                src="/hyperbot.png"
              />
              <h1 className={title({ size: "lg", color: "violet" })}>P</h1>
              <h1 className={title({ size: "lg" })}>owerful Features</h1>
            </div>
            <h4 className={subtitle({ class: "mt-4 max-w-2xl" })}>
              Hyper Bot offers a wide range of features to enhance your Discord
              experience. With features like moderation, music, and more, Hyper
              Bot is the perfect Discord application for any server. No need for
              multiple bots, Hyper Bot has everything you need, all in one
              place.
            </h4>
          </div>
          <div className="flex flex-col items-start justify-start sm:items-end sm:justify-end lg:items-end lg:justify-end w-full text-left sm:text-right lg:text-right">
            <div className="flex flex-row items-center justify-center text-center">
              <Image
                alt="Hyper Bot"
                className="w-14 h-14 rounded-full mx-auto"
                src="/hyperbot.png"
              />
              <h1 className={title({ size: "lg", color: "violet" })}>E</h1>
              <h1 className={title({ size: "lg" })}>asy to use</h1>
            </div>
            <h4 className={subtitle({ class: "mt-4 max-w-2xl" })}>
              Hyper Bot is easy to use and easy to set up. With a simple and
              intuitive interface, Hyper Bot is perfect for users of all skill
              levels. Whether you are a beginner or an expert, Hyper Bot is the
              perfect Discord application for you.
            </h4>
          </div>
          <div className="flex flex-col items-start justify-start w-full text-left">
            <div className="flex flex-row items-center justify-center text-center">
              <Image
                alt="Hyper Bot"
                className="w-14 h-14 rounded-full mx-auto"
                src="/hyperbot.png"
              />
              <h1 className={title({ size: "lg", color: "violet" })}>R</h1>
              <h1 className={title({ size: "lg" })}>eliable</h1>
            </div>
            <h4 className={subtitle({ class: "mt-4 max-w-2xl" })}>
              Hyper Bot is a reliable Discord application that is always up and
              running. With a 99.9% uptime guarantee, you can trust that Hyper
              Bot will always be there when you need it. Hyper Bot is built with
              reliability in mind and is constantly monitored to ensure that it
              is always running smoothly.
            </h4>
          </div>
        </section>
        <section
          className="flex flex-row items-center h-fit w-full gap-8 justify-center py-12"
          id="stats"
        >
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="flex flex-col items-center h-full w-full justify-around gap-y-8">
              <Card className="w-full max-w-7xl p-8 from-violet-400 to-violet-700 bg-gradient-to-br rounded-xl h-auto">
                <div className="inline-block max-w-6xl text-center justify-center items-center w-full">
                  <h1 className={title({ size: "lg" })}>Made With Love</h1>
                  <h4 className={subtitle({ class: "mt-4" })}>
                    Hyper Bot is a multi-purpose Discord application built with
                    love and care by a passionate developer.
                  </h4>
                </div>
              </Card>
              <Card className="w-full max-w-7xl p-8 from-violet-400 to-violet-700 bg-gradient-to-br rounded-xl h-auto ">
                <div className="inline-block max-w-6xl text-center justify-center items-center w-full">
                  <h1 className={title({ size: "lg" })}>Trusted By Many</h1>
                  <h4 className={subtitle({ class: "mt-4" })}>
                    Hyper Bot is trusted by many users and servers. Here are
                    some statistics about Hyper Bot.
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 mt-16">
                    <div className="flex flex-col items-center justify-center w-full">
                      <Card
                        className="flex flex-col items-center justify-center w-full p-6"
                        isBlurred={true}
                      >
                        <h2 className="text-2xl text-white">Guilds</h2>
                        <p className="text-lg text-white">
                          {formatNumber(stats.guilds)}
                        </p>
                      </Card>
                    </div>
                    <div className="flex flex-col items-center justify-center w-full">
                      <Card
                        className="flex flex-col items-center justify-center w-full p-6"
                        isBlurred={true}
                      >
                        <h2 className="text-2xl text-white">Users</h2>
                        <p className="text-lg text-white">
                          {formatNumber(stats.users)}
                        </p>
                      </Card>
                    </div>
                    <div className="flex flex-col items-center justify-center w-full">
                      <Card
                        className="flex flex-col items-center justify-center w-full p-6"
                        isBlurred={true}
                      >
                        <h2 className="text-2xl text-white">Commands</h2>
                        <p className="text-lg text-white">
                          {formatNumber(stats.commands)}
                        </p>
                      </Card>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            <Card className="w-full max-w-5xl p-8 from-dark-400 to-dark-700 bg-gradient-to-br rounded-xl h-full flex flex-col justify-center items-center">
              <Image
                alt="Hyper Bot"
                className="w-32 h-32 rounded-full mx-auto"
                src={
                  theme === "dark"
                    ? hyperbotConfig.supportIcon.dark
                    : hyperbotConfig.supportIcon.light
                }
              />
              <div className="flex flex-col max-w-6xl text-center justify-center items-center w-full">
                <h1 className={title({ size: "lg" })}>Are you ready?</h1>
                <h4 className={subtitle({ class: "mt-4" })}>
                  Get started with Hyper Bot today and take your Discord server
                  to the next level.
                </h4>
              </div>
              <div className="flex flex-row items-center justify-center w-full gap-8">
                <Button
                  className="mt-8"
                  color="secondary"
                  size="lg"
                  onClick={() => {
                    window.location.href += "/invite";
                  }}
                >
                  <h2 className={subtitle()}>Invite</h2>
                </Button>
                <Button
                  className="mt-8"
                  color="default"
                  size="lg"
                  onClick={() => {
                    window.location.href += "/vote";
                  }}
                >
                  <h2 className={subtitle()}>Vote</h2>
                </Button>
              </div>
            </Card>
          </div>
        </section>
      </main>
    </>
  );
}
