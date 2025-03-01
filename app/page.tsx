"use client";

import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from "@heroui/react";

import { subtitle, title } from "@/components/primitives";
import { SpotifyCard } from "@/components/spotify";
import { Navbar } from "@/components/navbar";
import { siteConfig } from "@/config/site";

export default function Home() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [modalTitle, setModalTitle] = useState("unknown");
  const [modalContent, setModalContent] = useState("unknown");
  const [modalLink, setModalLink] = useState("unknown");

  return (
    <>
      <Navbar navbarData={siteConfig.navItems.portfolio} />
      <main className="container mx-auto max-w-7xl pt-6 px-6 flex-grow h-full">
        <section
          className="flex flex-col items-center justify-evenly h-full bg-background"
          id="home"
        >
          <div className="inline-block max-w-lg text-center justify-center items-center">
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <h1 className={title({ size: "lg" })}>Hi, I'm&nbsp;</h1>
            <h1 className={title({ color: "blue", size: "lg" })}>xbl4z3r</h1>
            <h4 className={subtitle({ class: "mt-4" })}>
              Software Engineer. Game Developer. Guitarist.
            </h4>
          </div>
          <SpotifyCard />
        </section>
        <section
          className="flex flex-col items-center justify-evenly h-fit bg-background py-20 gap-y-20"
          id="about"
        >
          <h1 className={title({ size: "lg" })} id="about">
            About Me
          </h1>
          <div>
            <h3 className={subtitle({ class: "mt-4" })}>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              I'm a software engineer with a passion for creating innovative
              solutions to complex problems. I have experience in a wide range
              of technologies, including web development, game
              development,&nbsp;
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              and IoT. I'm always looking for new challenges and opportunities
              to learn and grow as a developer. Some of my skills include:
            </h3>
            <div className="grid grid-cols-12 gap-4 mt-8">
              <Card
                isHoverable
                isPressable
                className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 hover:scale-105"
                onClick={() => {
                  setModalLink("unknown");
                  setModalTitle("Web Development");
                  setModalContent(
                    "I have experience developing websites and web applications using a variety of technologies, including CSS, TypeScript and React. I am passionate about creating user-friendly and responsive web applications that provide value to users and am always looking for new ways to improve my skills and expand my knowledge in this area. One of the websites I have developed is my personal portfolio website, which showcases my projects and skills as a developer, as well as product pages for my software projects.",
                  );
                  onOpen();
                }}
              >
                <CardHeader className="flex items-center justify-between">
                  <h4 className="text-foreground-900 font-medium text-2xl">
                    Web Development
                  </h4>
                  <Image
                    alt="Web development icon"
                    className="w-8 h-8"
                    src="https://img.icons8.com/ios-filled/50/ffffff/web.png"
                  />
                </CardHeader>
                <CardBody>
                  <p className="text-foreground-500">
                    Frontend and backend development
                  </p>
                  <p className="text-foreground-500">
                    React, Next.js, TypeScript, MongoDB
                  </p>
                </CardBody>
              </Card>
              <Card
                isHoverable
                isPressable
                className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 hover:scale-105"
                onClick={() => {
                  setModalLink("unknown");
                  setModalTitle("Game Development");
                  setModalContent(
                    "I have experience developing 2D and 3D games using Unity and C#. I am passionate about creating engaging and immersive gaming experiences and am always looking for new ways to push the boundaries of what is possible in game development. I am currently working on building my dream game, but it is still in the early stages of development. I am excited to see where this project takes me and am looking forward to sharing it with the world once it is ready.",
                  );
                  onOpen();
                }}
              >
                <CardHeader className="flex items-center justify-between">
                  <h4 className="text-foreground-900 font-medium text-2xl">
                    Game Development
                  </h4>
                  <Image
                    alt="Game development icon"
                    className="w-8 h-8"
                    src="https://img.icons8.com/ios-filled/50/ffffff/controller.png"
                  />
                </CardHeader>
                <CardBody>
                  <p className="text-foreground-500">
                    2D and 3D game development
                  </p>
                  <p className="text-foreground-500">Unity, C#, NGO</p>
                </CardBody>
              </Card>
              <Card
                isHoverable
                isPressable
                className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 hover:scale-105"
                onClick={() => {
                  setModalLink("unknown");
                  setModalTitle("App Development");
                  setModalContent(
                    "I have experience developing cross-platform applications for desktop and mobile devices. I am passionate about creating user-friendly applications that provide value to users and am always looking for new ways to improve my skills and expand my knowledge in this area. One of the applications I have developed is the Hyper Client Launcher, a custom Minecraft Launcher that provides easy access to Hyper Client. This app was first built using Electron and later migrated to DOTNET to improve performance and user experience.",
                  );
                  onOpen();
                }}
              >
                <CardHeader className="flex items-center justify-between">
                  <h4 className="text-foreground-900 font-medium text-2xl">
                    App Development
                  </h4>
                  <Image
                    alt="App development icon"
                    className="w-8 h-8"
                    src="https://img.icons8.com/ios-filled/50/ffffff/computer.png"
                  />
                </CardHeader>
                <CardBody>
                  <p className="text-foreground-500">
                    Cross-platform app development
                  </p>
                  <p className="text-foreground-500">
                    Electron, DOTNET, Flutter
                  </p>
                </CardBody>
              </Card>
              <Card
                isHoverable
                isPressable
                className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 hover:scale-105"
                onClick={() => {
                  setModalLink("unknown");
                  setModalTitle("IoT & Robotics");
                  setModalContent(
                    "I have experience working with IoT smart devices and robotics technologies, including building and programming robots. I have worked with a variety of platforms and tools during my time as a FTC Programmer including TensorFlow and RoadRunner. I am always looking for new opportunities to learn and grow in this field and am excited to see what the future holds for IoT and robotics.",
                  );
                  onOpen();
                }}
              >
                <CardHeader className="flex items-center justify-between">
                  <h4 className="text-foreground-900 font-medium text-2xl">
                    IoT & Robotics
                  </h4>
                  <Image
                    alt="IoT & Robotics icon"
                    className="w-8 h-8"
                    src="https://img.icons8.com/ios-filled/50/ffffff/robot.png"
                  />
                </CardHeader>
                <CardBody>
                  <p className="text-foreground-500">
                    Robots and smart devices
                  </p>
                  <p className="text-foreground-500">
                    Python, TensorFlow, RoadRunner
                  </p>
                </CardBody>
              </Card>
            </div>
          </div>
        </section>
        <section
          className="flex flex-col items-center justify-evenly h-full min-h-fit bg-background gap-y-20 mt-20"
          id="projects"
        >
          <h1 className={title({ size: "lg" })} id="projects">
            Projects
          </h1>
          <div className="max-w-[1000px] gap-2 grid grid-cols-12 grid-rows-2 gap-y-6 sm:gap-y-2 lg:gap-y-2 pb-12">
            <Card
              isFooterBlurred
              className="w-full h-[400px] col-span-12 sm:col-span-5"
            >
              <CardHeader className="absolute z-10 top-1 flex items-start justify-between">
                <div className="flex flex-col">
                  <p className="text-tiny text-white/60 uppercase font-bold">
                    Multipurpose Discord Application
                  </p>
                  <h4 className="text-white/90 font-medium text-3xl">
                    Hyper Bot
                  </h4>
                </div>
                <Tooltip
                  content="Credits to Shutterstock for the thumbnail"
                  showArrow={true}
                >
                  <Image
                    alt="Information button"
                    className="w-6 h-6 accent-white"
                    src="https://img.icons8.com/material-outlined/24/BBBBBB/info--v1.png"
                  />
                </Tooltip>
              </CardHeader>
              <Image
                isZoomed
                removeWrapper
                alt="Discord app background"
                className="z-0 w-full h-full object-cover"
                src="https://www.shutterstock.com/image-photo/man-holding-iphone-14-pro-600nw-2323636747.jpg"
              />
              <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                <div className="flex flex-grow gap-2 items-center">
                  <Image
                    alt="Hyper Bot icon"
                    className="rounded-full w-10 h-11"
                    src="/hyperbot.png"
                  />
                  <div className="flex flex-col">
                    <p className="text-tiny text-white/60">
                      All-In-One Discord Bot
                    </p>
                    <p className="text-tiny text-white/60">
                      Entertain users and aid moderation.
                    </p>
                  </div>
                </div>
                <Button
                  className="text-tiny"
                  color="secondary"
                  radius="full"
                  size="sm"
                  onPress={() => {
                    window.open("/hyperbot", "_self");
                  }}
                >
                  Visit
                </Button>
              </CardFooter>
            </Card>
            <Card
              isFooterBlurred
              className="w-full h-[400px] col-span-12 sm:col-span-7"
            >
              <CardHeader className="absolute z-10 top-1 flex items-start justify-between">
                <div className="flex flex-col">
                  <p className="text-tiny text-white/60 uppercase font-bold">
                    Advanced Minecraft Client
                  </p>
                  <h4 className="text-white/90 font-medium text-3xl">
                    Hyper Client
                  </h4>
                </div>
                <Tooltip
                  content="Credits to zKevsh for the thumbnail"
                  showArrow={true}
                >
                  <Image
                    alt="Information button"
                    className="w-6 h-6 accent-white"
                    src="https://img.icons8.com/material-outlined/24/BBBBBB/info--v1.png"
                  />
                </Tooltip>
              </CardHeader>
              <Image
                isZoomed
                removeWrapper
                alt="Minecraft PvP background"
                className="z-0 w-full h-full object-cover"
                src="https://i.ytimg.com/vi/VOL1PHXM-Kg/maxresdefault.jpg"
              />
              <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                <div className="flex flex-grow gap-2 items-center">
                  <Image
                    alt="Hyper Client icon"
                    className="rounded-full w-10 h-11"
                    src="/hyperclient.png"
                  />
                  <div className="flex flex-col">
                    <p className="text-tiny text-white/60">
                      Minecraft PvP Client
                    </p>
                    <p className="text-tiny text-white/60">
                      Elite gaming experience.
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    radius="full"
                    size="sm"
                    onPress={() => {
                      setModalTitle("Hyper Client");
                      setModalContent(
                        "Introducing Hyper Client - the cutting-edge Minecraft PvP client and launcher with a modern UI. Enjoy seamless integration with your favorite services, a wide range of gameplay-enhancing modules, and extensive UI customization options. Personalize your character with our vast collection of cosmetics and elevate your Minecraft experience like never before.\n" +
                          "Hyper Client is designed to be user-friendly and easy to use, making it perfect for both beginners and experienced players and is packed with features that will help you dominate " +
                          "the competition and take your Minecraft skills to the next level. Whether you're looking to improve your PvP skills, explore new worlds, or just have fun with friends, Hyper Client has everything you " +
                          "need to make the most of your Minecraft experience.",
                      );
                      setModalLink("/hyperclient");
                      onOpen();
                    }}
                  >
                    Learn More
                  </Button>
                  <Button
                    className="text-tiny"
                    color="success"
                    radius="full"
                    size="sm"
                    onPress={() => {
                      window.open("/hyperclient", "_self");
                    }}
                  >
                    Visit
                  </Button>
                </div>
              </CardFooter>
            </Card>
            <Card
              isFooterBlurred
              className="col-span-12 sm:col-span-4 h-[400px]"
            >
              <CardHeader className="absolute z-10 top-1 flex items-start justify-between">
                <div className="flex flex-col">
                  <p className="text-tiny text-white/60 uppercase font-bold">
                    IOT Utility
                  </p>
                  <h4 className="text-white/90 font-medium text-3xl">
                    SpoTuya
                  </h4>
                </div>
                <Tooltip
                  content="Credits to Tech Hive for the thumbnail"
                  showArrow={true}
                >
                  <Image
                    alt="Information button"
                    className="w-6 h-6 accent-white"
                    src="https://img.icons8.com/material-outlined/24/BBBBBB/info--v1.png"
                  />
                </Tooltip>
              </CardHeader>
              <Image
                isZoomed
                removeWrapper
                alt="Man dancing with lights background"
                className="z-0 w-full h-full object-cover"
                src="https://www.techhive.com/wp-content/uploads/2023/04/philips-hue-spotify-image-2-100901041-orig.jpeg?quality=50&strip=all"
              />
              <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                <div className="flex flex-grow gap-2 items-center">
                  <div className="flex flex-col">
                    <p className="text-tiny text-white/60">
                      Background Service
                    </p>
                    <p className="text-tiny text-white/60">
                      Live and feel your music.
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    radius="full"
                    size="sm"
                    onPress={() => {
                      setModalTitle("SpoTuya");
                      setModalContent(
                        "SpoTuya is a background service that syncs your Tuya smart lights with your Spotify music. It uses the Spotify API to listen for music events and then sends commands to your Tuya lights to change their color and brightness based on the music that's playing. " +
                          "SpoTuya is a fun way to enhance your music listening experience and create a more immersive environment in your home. Whether you're throwing a party, relaxing with friends, or just enjoying some tunes on your own, SpoTuya can help set the mood and make your music " +
                          "come alive.",
                      );
                      setModalLink("/spotuya");
                      onOpen();
                    }}
                  >
                    Learn More
                  </Button>
                </div>
              </CardFooter>
            </Card>
            <Card
              isFooterBlurred
              className="col-span-12 sm:col-span-4 h-[400px]"
            >
              <CardHeader className="absolute z-10 top-1 flex items-start justify-between">
                <div className="flex flex-col">
                  <p className="text-tiny text-white/60 uppercase font-bold">
                    FTC Utility
                  </p>
                  <h4 className="text-white/90 font-medium text-3xl">
                    RoadPlanner
                  </h4>
                </div>
                <Tooltip
                  content="Credits to FIRST Inspires for the thumbnail"
                  showArrow={true}
                >
                  <Image
                    alt="Information button"
                    className="w-6 h-6 accent-white"
                    src="https://img.icons8.com/material-outlined/24/BBBBBB/info--v1.png"
                  />
                </Tooltip>
              </CardHeader>
              <Image
                isZoomed
                removeWrapper
                alt="FTC event background"
                className="z-0 w-full h-full object-cover"
                src="https://www.firstinspires.org/sites/all/themes/first/assets/images/2020/ftc/event-experience.jpg"
              />
              <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                <div className="flex flex-grow gap-2 items-center">
                  <div className="flex flex-col">
                    <p className="text-tiny text-white/60">Java Application</p>
                    <p className="text-tiny text-white/60">
                      Effortlessly design paths.
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    radius="full"
                    size="sm"
                    onPress={() => {
                      setModalTitle("RoadPlanner");
                      setModalContent(
                        "RoadPlanner is a Java application designed to help FTC teams plan their autonomous paths. It allows teams to easily create and visualize paths for their robot to follow during the autonomous period of a match. " +
                          "RoadPlanner features an intuitive drag-and-drop interface that makes it easy to design paths, as well as tools for editing and fine-tuning paths to ensure accuracy. With RoadPlanner, teams can quickly and efficiently plan their autonomous strategies and optimize their robot's performance on the field.",
                      );
                      setModalLink("/roadplanner");
                      onOpen();
                    }}
                  >
                    Learn More
                  </Button>
                </div>
              </CardFooter>
            </Card>
            <Card
              isFooterBlurred
              className="col-span-12 sm:col-span-4 h-[400px]"
            >
              <CardHeader className="absolute z-10 top-1 flex items-start justify-between">
                <div className="flex flex-col">
                  <p className="text-tiny text-white/60 uppercase font-bold">
                    Physics Simulation
                  </p>
                  <h4 className="text-white/90 font-medium text-3xl">
                    Paper Plane Sim
                  </h4>
                </div>
                <Tooltip
                  content="Thumbnail is taken inside the simulation"
                  showArrow={true}
                >
                  <Image
                    alt="Information button"
                    className="w-6 h-6 accent-white"
                    src="https://img.icons8.com/material-outlined/24/BBBBBB/info--v1.png"
                  />
                </Tooltip>
              </CardHeader>
              <Image
                isZoomed
                removeWrapper
                alt="Paper plane simulation background"
                className="z-0 w-full h-full object-cover"
                src="/paperplane.png"
              />
              <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                <div className="flex flex-grow gap-2 items-center">
                  <div className="flex flex-col">
                    <p className="text-tiny text-white/60">Unity Simulation</p>
                    <p className="text-tiny text-white/60">
                      Test robotized plane launching.
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    radius="full"
                    size="sm"
                    onPress={() => {
                      setModalTitle("Paper Plane Sim");
                      setModalContent(
                        "Paper Plane Sim is a Unity simulation that allows users to test the physics of paper planes in a virtual environment. It features a realistic physics engine that accurately models the behavior of paper planes, allowing users to experiment with different designs and see how they perform in flight. " +
                          "Paper Plane Sim is a fun and educational tool that can be used to learn about aerodynamics, physics, and engineering principles. Whether you're a student, a teacher, or just a fan of paper planes, Paper Plane Sim is a great way to explore the world of flight and have fun in the process.",
                      );
                      setModalLink("/paperplanesim");
                      onOpen();
                    }}
                  >
                    Learn More
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </section>
        <Modal
          backdrop="blur"
          isOpen={isOpen}
          size="2xl"
          onOpenChange={onOpenChange}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  {modalTitle}
                </ModalHeader>
                <ModalBody>
                  <p>{modalContent}</p>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  {modalLink !== "unknown" && (
                    <Button
                      color="primary"
                      onPress={() => {
                        window.open(modalLink, "_blank");
                        onClose();
                      }}
                    >
                      Visit
                    </Button>
                  )}
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </main>
    </>
  );
}
