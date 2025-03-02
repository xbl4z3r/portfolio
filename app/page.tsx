"use client";

import React, { useState, useEffect } from "react";

import { subtitle, title } from "@/components/primitives";
import { SpotifyCard } from "@/components/spotify-card";
import { siteConfig } from "@/config/site";
import { Navbar } from "@/components/navbar";
import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {SparklesText} from "@/components/magicui/sparkles-text";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("unknown");
  const [modalContent, setModalContent] = useState("unknown");
  const [modalLink, setModalLink] = useState("unknown");

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const onOpenChange = (open: boolean) => setIsOpen(open);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
      <>
        <Navbar navbarData={siteConfig.navItems.portfolio} />
        <main className="container mx-auto max-w-7xl pt-6 px-6 flex-grow h-full">
          <section
              className="flex flex-col items-center justify-evenly bg-background min-h-screen"
              id="home"
          >
            <div className="inline-block max-w-lg text-center justify-center items-center">
              <div className="flex flex-wrap items-center justify-center">
                <h1 className={title({ size: "lg" })}>Hi, I'm&nbsp;</h1>
                <SparklesText text="xbl4z3r" colors={{ first: "#0072F5", second: "#5EA2EF" }} className={"text-4xl lg:text-6xl"} />
              </div>
              <h4 className={subtitle({ class: "mt-4" })}>
                Software Engineer. Game Developer. Guitarist.
              </h4>
            </div>
            {isMounted && <SpotifyCard />}
          </section>
          {/*<section*/}
          {/*    className="flex flex-col items-center justify-evenly h-fit bg-background py-20 gap-y-20 min-h-full"*/}
          {/*    id="about"*/}
          {/*>*/}
          {/*  <h1 className={title({ size: "lg" })} id="about">*/}
          {/*    About Me*/}
          {/*  </h1>*/}
          {/*  <div>*/}
          {/*    <h3 className={subtitle({ class: "mt-4" })}>*/}
          {/*      I'm a software engineer with a passion for creating innovative*/}
          {/*      solutions to complex problems. I have experience in a wide range*/}
          {/*      of technologies, including web development, game*/}
          {/*      development,&nbsp;*/}
          {/*      and IoT. I'm always looking for new challenges and opportunities*/}
          {/*      to learn and grow as a developer. Some of my skills include:*/}
          {/*    </h3>*/}
          {/*    <div className="grid grid-cols-12 gap-4 mt-8">*/}
          {/*      <Card*/}
          {/*          className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 hover:scale-105 cursor-pointer transition-transform"*/}
          {/*          onClick={() => {*/}
          {/*            setModalLink("unknown");*/}
          {/*            setModalTitle("Web Development");*/}
          {/*            setModalContent(*/}
          {/*                "I have experience developing websites and web applications using a variety of technologies, including CSS, TypeScript and React. I am passionate about creating user-friendly and responsive web applications that provide value to users and am always looking for new ways to improve my skills and expand my knowledge in this area. One of the websites I have developed is my personal portfolio website, which showcases my projects and skills as a developer, as well as product pages for my software projects.",*/}
          {/*            );*/}
          {/*            onOpen();*/}
          {/*          }}*/}
          {/*      >*/}
          {/*        <CardHeader className="flex items-center justify-between">*/}
          {/*          <h4 className="font-medium text-2xl">*/}
          {/*            Web Development*/}
          {/*          </h4>*/}
          {/*          <img*/}
          {/*              alt="Web development icon"*/}
          {/*              className="w-8 h-8"*/}
          {/*              src="https://img.icons8.com/ios-filled/50/ffffff/web.png"*/}
          {/*          />*/}
          {/*        </CardHeader>*/}
          {/*        <CardContent>*/}
          {/*          <p className="text-muted-foreground">*/}
          {/*            Frontend and backend development*/}
          {/*          </p>*/}
          {/*          <p className="text-muted-foreground">*/}
          {/*            React, Next.js, TypeScript, MongoDB*/}
          {/*          </p>*/}
          {/*        </CardContent>*/}
          {/*      </Card>*/}

          {/*      /!* Similar pattern for other cards *!/*/}

          {/*    </div>*/}
          {/*  </div>*/}
          {/*</section>*/}
          {/*<section*/}
          {/*    className="flex flex-col items-center justify-evenly h-full min-h-fit bg-background gap-y-20 mt-20"*/}
          {/*    id="projects"*/}
          {/*>*/}
          {/*  <h1 className={title({ size: "lg" })} id="projects">*/}
          {/*    Projects*/}
          {/*  </h1>*/}
          {/*  <div className="max-w-[1000px] gap-2 grid grid-cols-12 grid-rows-2 gap-y-6 sm:gap-y-2 lg:gap-y-2 pb-12">*/}
          {/*    <div className="w-full h-[400px] col-span-12 sm:col-span-5 relative overflow-hidden rounded-lg">*/}
          {/*      <Card className="h-full">*/}
          {/*        <div className="absolute z-10 top-1 flex items-start justify-between w-full p-4">*/}
          {/*          <div className="flex flex-col">*/}
          {/*            <p className="text-xs text-white/60 uppercase font-bold">*/}
          {/*              Multipurpose Discord Application*/}
          {/*            </p>*/}
          {/*            <h4 className="text-white/90 font-medium text-3xl">*/}
          {/*              Hyper Bot*/}
          {/*            </h4>*/}
          {/*          </div>*/}
          {/*          <TooltipProvider>*/}
          {/*            <Tooltip>*/}
          {/*              <TooltipTrigger>*/}
          {/*                <img*/}
          {/*                    alt="Information button"*/}
          {/*                    className="w-6 h-6"*/}
          {/*                    src="https://img.icons8.com/material-outlined/24/BBBBBB/info--v1.png"*/}
          {/*                />*/}
          {/*              </TooltipTrigger>*/}
          {/*              <TooltipContent>*/}
          {/*                <p>Credits to Shutterstock for the thumbnail</p>*/}
          {/*              </TooltipContent>*/}
          {/*            </Tooltip>*/}
          {/*          </TooltipProvider>*/}
          {/*        </div>*/}
          {/*        <img*/}
          {/*            alt="Discord app background"*/}
          {/*            className="z-0 w-full h-full object-cover hover:scale-105 transition-transform duration-300"*/}
          {/*            src="https://www.shutterstock.com/image-photo/man-holding-iphone-14-pro-600nw-2323636747.jpg"*/}
          {/*        />*/}
          {/*        <div className="absolute bg-black/40 bottom-0 z-10 border-t border-zinc-600 w-full p-4 flex items-center justify-between">*/}
          {/*          <div className="flex gap-2 items-center">*/}
          {/*            <img*/}
          {/*                alt="Hyper Bot icon"*/}
          {/*                className="rounded-full w-10 h-11"*/}
          {/*                src="/hyperbot.png"*/}
          {/*            />*/}
          {/*            <div className="flex flex-col">*/}
          {/*              <p className="text-xs text-white/60">*/}
          {/*                All-In-One Discord Bot*/}
          {/*              </p>*/}
          {/*              <p className="text-xs text-white/60">*/}
          {/*                Entertain users and aid moderation.*/}
          {/*              </p>*/}
          {/*            </div>*/}
          {/*          </div>*/}
          {/*          <Button*/}
          {/*              variant="secondary"*/}
          {/*              size="sm"*/}
          {/*              className="rounded-full"*/}
          {/*              onClick={() => {*/}
          {/*                window.open("/hyperbot", "_self");*/}
          {/*              }}*/}
          {/*          >*/}
          {/*            Visit*/}
          {/*          </Button>*/}
          {/*        </div>*/}
          {/*      </Card>*/}
          {/*    </div>*/}

          {/*    /!* Similar pattern for other project cards *!/*/}

          {/*  </div>*/}
          {/*</section>*/}

          <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{modalTitle}</DialogTitle>
              </DialogHeader>
              <DialogDescription>
                {modalContent}
              </DialogDescription>
              <DialogFooter>
                <Button variant="outline" onClick={onClose}>
                  Close
                </Button>
                {modalLink !== "unknown" && (
                    <Button
                        onClick={() => {
                          window.open(modalLink, "_blank");
                          onClose();
                        }}
                    >
                      Visit
                    </Button>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </main>
      </>
  );
}