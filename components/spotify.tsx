import { Card, CardBody, CardFooter, Image, Progress } from "@heroui/react";
import React, { useEffect, useState } from "react";

const SERVER_REFRESH_INTERVAL = 10000;
const REFRESH_INTERVAL = 1000;

export const SpotifyCard = () => {
  const [result, setResult] = useState({
    initialized: false,
    isPlaying: false,
    track: {
      title: "Not Playing",
      artist: [{ name: "No Artist", url: "" }],
      album: { name: "No Album", url: "" },
      duration: 0,
      artUrl: "https://via.placeholder.com/200",
      url: "",
    },
    progress: 0,
  });

  useEffect(() => {
    const interval = setInterval(async () => {
      const response = await fetch("/api/v3/spotify");
      const data = await response.json();

      setResult(data);
    }, SERVER_REFRESH_INTERVAL);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (result.initialized && result.isPlaying) {
        setResult((prev) => ({
          ...prev,
          progress: prev.progress + REFRESH_INTERVAL,
        }));
        if (result.progress >= result.track.duration) {
          setResult((prev) => ({
            ...prev,
            progress: result.track.duration,
            isPlaying: false,
          }));
        }
      }
    }, REFRESH_INTERVAL);

    return () => {
      clearInterval(interval);
    };
  }, [result]);

  return (
    <Card
      isBlurred
      isFooterBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 max-w-[724px] w-auto"
      shadow="sm"
    >
      <CardBody>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
          {/* screen width w-[calc(100%_-_12px)] */}
          <div className="relative col-span-6 md:col-span-4 justify-center items-center flex flex-col w-[calc(100vw_-_4.5rem)] h-[calc(100vw_-_4.5rem)] md:w-full md:h-full">
            <Image
              alt="Spotify Album Art"
              aria-label="Spotify Album Art"
              className="rounded-lg h-full w-full"
              src={result.track.artUrl}
            />
            <CardFooter className="justify-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_12px)] shadow-small z-10">
              <p className="text-tiny text-white/80">
                {result.isPlaying
                  ? "Playing on Spotify."
                  : "Currently offline."}
              </p>
            </CardFooter>
          </div>

          <div className="flex flex-col col-span-10 md:col-span-8 gap-4">
            <div className="flex content-evenly items-center justify-between">
              <div className="flex flex-col gap-0">
                <a href={result.track.url} rel="noreferrer" target="_blank">
                  <h1 className="text-3xl font-bold">{result.track.title}</h1>
                </a>
                <a
                  className="text-lg text-foreground/50"
                  href={result.track.artist[0].url}
                  rel="noreferrer"
                  target="_blank"
                >
                  <p>by {result.track.artist[0].name}</p>
                </a>
              </div>
            </div>
            <div className="flex flex-col mt-3 gap-1">
              <Progress
                color="primary"
                maxValue={result.track.duration}
                value={result.progress}
              />
              <div className="flex justify-between">
                <p className="text-lg text-foreground/50">
                  {new Date(result.progress).toISOString().substr(14, 5)}
                </p>
                <p className="text-lg text-foreground/50">
                  {new Date(result.track.duration).toISOString().substr(14, 5)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
