import React, {useEffect, useState} from "react";
import {Card, CardContent} from "@/components/ui/card";
import {Progress} from "@/components/ui/progress";
import {Vibrant} from "node-vibrant/browser";
import {ShineBorder} from "@/components/magicui/shine-border";
import {useColor} from "@/hooks/useColor";

const SERVER_REFRESH_INTERVAL = 10000;
const REFRESH_INTERVAL = 1000;

const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export const SpotifyCard = () => {
    const [result, setResult] = useState({
        initialized: false,
        isPlaying: false,
        track: {
            title: "Not Playing",
            artist: [{name: "No Artist", url: ""}],
            album: {name: "No Album", url: ""},
            duration: 1,
            artUrl: "https://placehold.co/200",
            url: "",
        },
        progress: 0,
    });
    const [isArtistHovered, setIsArtistHovered] = useState(false);
    const [isTitleHovered, setIsTitleHovered] = useState(false);
    const [isCardHovered, setIsCardHovered] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [gradientPosition, setGradientPosition] = useState("circle at 20% 50%");
    const [opacity, setOpacity] = useState(0);
    const {colors, updateColors} = useColor();

    useEffect(() => {
        if (!loaded) return;
        const timer = setTimeout(() => {
            setOpacity(1);
        }, 100);
        return () => clearTimeout(timer);
    }, [loaded]);

    useEffect(() => {
        const updateGradientPosition = () => {
            if (window.innerWidth < 768) setGradientPosition("circle at 50% 25%");
            else setGradientPosition("circle at 25% 50%");
        };
        updateGradientPosition();
        window.addEventListener('resize', updateGradientPosition);
        return () => window.removeEventListener('resize', updateGradientPosition);
    }, []);

    useEffect(() => {
        const fetchSpotifyData = async () => {
            try {
                const response = await fetch("/api/spotify");
                const data = await response.json();
                if (data.track.title == result.track.title) return;
                setResult(data);
                if(!loaded) setLoaded(true);
                Vibrant.from(data.track.artUrl).getPalette().then((palette) => {
                    if (palette.Vibrant === null || palette.Muted === null || palette.LightVibrant === null || palette.LightMuted === null || palette.DarkVibrant === null || palette.DarkMuted === null) return;
                    updateColors({
                        vibrant: palette.Vibrant.hex.toUpperCase(),
                        muted: palette.Muted.hex.toUpperCase(),
                        light_vibrant: palette.LightVibrant.hex.toUpperCase(),
                        light_muted: palette.LightMuted.hex.toUpperCase(),
                        dark_vibrant: palette.DarkVibrant.hex.toUpperCase(),
                        dark_muted: palette.DarkMuted.hex.toUpperCase(),
                    });
                }).catch((error) => {
                    console.error("Failed to fetch artwork colors", error);
                });
            } catch (error) {
                console.error("Failed to fetch Spotify data", error);
            }
        };

        fetchSpotifyData().then(() => {
            const interval = setInterval(fetchSpotifyData, SERVER_REFRESH_INTERVAL);
            return () => clearInterval(interval);
        });
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

        return () => clearInterval(interval);
    }, [result]);

    const safeDuration = Math.max(1, result.track.duration);

    return (
        <Card
            className="overflow-hidden backdrop-blur-md w-full max-w-3xl mx-auto relative transition-all duration-300"
            style={{
                opacity: opacity,
                transition: "opacity 3s ease-in-out, transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                visibility: loaded ? 'visible' : 'hidden',
                transform: isCardHovered ? 'translateY(-8px) scale(1.01)' : 'translateY(0) scale(1)',
                boxShadow: isCardHovered
                    ? `0 20px 30px -10px ${colors.vibrant}30, 0 10px 20px -10px ${colors.muted}40`
                    : '0 10px 15px -5px rgba(0,0,0,0.1)'
            }}
            onMouseEnter={() => setIsCardHovered(true)}
            onMouseLeave={() => setIsCardHovered(false)}
        >
            <ShineBorder
                shineColor={[colors.vibrant, colors.muted, colors.light_vibrant, colors.light_muted, colors.dark_vibrant, colors.dark_muted]}
                className="absolute inset-0 rounded-lg"/>
            <div
                className="absolute inset-0 w-full h-full"
                style={{
                    background: `
                radial-gradient(${gradientPosition},
                ${colors.vibrant}50 0%,
                ${colors.muted}20 40%,
                transparent 100%)
            `,
                    zIndex: -1
                }}
            />
            <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                    <div className="p-4 flex items-center justify-center">
                        <div
                            className="relative w-48 h-48 md:w-52 md:h-52 lg:w-64 lg:h-64 xl:w-72 xl:h-72 rounded-lg overflow-hidden shrink-0 group">
                            <div
                                className="absolute inset-0 z-10 bg-gradient-to-r from-black/30 via-transparent to-transparent md:bg-gradient-to-b md:from-transparent md:via-black/30 md:to-black/80"
                                aria-hidden="true"/>

                            <img
                                src={result.track.artUrl}
                                alt={`${result.track.title} album art`}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />

                            {/* Spotify Logo (only visible on mobile) */}
                            <div className="absolute top-2 left-2 z-20 md:hidden">
                                <svg className="w-5 h-5" style={{color: colors.vibrant}} viewBox="0 0 24 24"
                                     fill="currentColor">
                                    <path
                                        d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.8-.179-.92-.6-.12-.421.18-.8.6-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.48.659.24 1.08zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between w-full p-4 md:py-6 md:px-8 lg:py-8 lg:px-10">
                        <div className="flex items-center space-x-2 mb-3">
                            <svg className="w-5 h-5" style={{color: colors.vibrant}} viewBox="0 0 24 24"
                                 fill="currentColor">
                                <path
                                    d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.8-.179-.92-.6-.12-.421.18-.8.6-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.48.659.24 1.08zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                            </svg>
                            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        {result.isPlaying ? "Currently Playing" : "Recently Played"}
                    </span>
                        </div>
                        <div className="flex-grow">
                            <a href={result.track.url}
                               target="_blank"
                               rel="noreferrer"
                               className="block"
                               onMouseEnter={() => setIsTitleHovered(true)}
                               onMouseLeave={() => setIsTitleHovered(false)}>
                                <h3 className="font-bold text-xl md:text-2xl lg:text-3xl line-clamp-1 transition-colors"
                                    style={isTitleHovered ? {color: colors.vibrant} : {}}>
                                    {result.track.title}
                                </h3>
                            </a>
                            <div className="mt-2 space-y-1">
                                <a href={result.track.artist[0].url}
                                   target="_blank"
                                   rel="noreferrer"
                                   className="text-sm md:text-base lg:text-lg text-muted-foreground transition-colors"
                                   onMouseEnter={() => setIsArtistHovered(true)}
                                   onMouseLeave={() => setIsArtistHovered(false)}
                                   style={isArtistHovered ? {color: colors.vibrant} : {}}>
                                    {result.track.artist[0].name}
                                </a>
                                <p className="text-xs md:text-sm text-muted-foreground/70 block">
                                    {result.track.album.name}
                                </p>
                            </div>
                        </div>
                        <div className="mt-4 md:mt-6 lg:mt-8">
                            <Progress
                                aria-label={"Song Progress"}
                                value={(result.progress / safeDuration) * 100}
                                max={100}
                                className="h-1.5 [&>div]:!bg-current bg-primary/20"
                                style={{
                                    "--progress-color": colors.vibrant,
                                    color: colors.vibrant
                                } as React.CSSProperties}
                            />
                            <div className="flex justify-between mt-2 text-xs md:text-sm text-muted-foreground">
                                <span>{formatTime(result.progress)}</span>
                                <span>{formatTime(safeDuration)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};