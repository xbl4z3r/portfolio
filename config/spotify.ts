import querystring from "querystring";

import axios, {AxiosResponse} from "axios";
import {config} from "dotenv";

config();

const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played`;
const client_id = process.env.WEB_SPOTIFY_CLIENT_ID;
const client_secret = process.env.WEB_SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.WEB_SPOTIFY_REFRESH_TOKEN;

let access_token: string | null = null;

export async function getNowPlayingItem(force: boolean = false): Promise<NowPlaying> {
    const response = await getNowPlaying();

    if (response.status === 401) {
        await getAccessToken(true);
        return getNowPlayingItem(true);
    }

    if (response.status > 400) {
        return {
            initialized: true,
            error: true,
            isPlaying: false,
            track: {
                title: "Not Playing",
                artist: [{name: "No Artist", url: ""}],
                album: {name: "No Album", url: ""},
                duration: 0,
                artUrl: "https://placehold.co/200",
                url: "",
            },
            progress: 0,
        };
    }

    const song = await response.data;

    if (response.status === 204 || song.currently_playing_type !== "track") {
        const recentlyPlayed = await getRecentlyPlayed();
        const recentlyPlayedSong = await recentlyPlayed.data;
        return {
            initialized: true,
            error: false,
            isPlaying: false,
            track: {
                title: recentlyPlayedSong.items[0].track.name,
                artist: recentlyPlayedSong.items[0].track.artists.map((_artist: { name: any, external_urls: any }) => ({
                    name: _artist.name,
                    url: _artist.external_urls.spotify,
                })),
                album: {
                    name: recentlyPlayedSong.items[0].track.album.name,
                    url: recentlyPlayedSong.items[0].track.album.external_urls.spotify,
                },
                duration: recentlyPlayedSong.items[0].track.duration_ms,
                artUrl: recentlyPlayedSong.items[0].track.album.images[0].url,
                url: recentlyPlayedSong.items[0].track.external_urls.spotify,
            },
            progress: recentlyPlayedSong.items[0].track.duration_ms,
        }
    }

    return {
        initialized: true,
        error: false,
        isPlaying: song.is_playing,
        track: {
            title: song.item.name,
            artist: song.item.artists.map((_artist: { name: any, external_urls: any }) => ({
                name: _artist.name,
                url: _artist.external_urls.spotify,
            })),
            album: {name: song.item.album.name, url: song.item.album.external_urls.spotify},
            duration: song.item.duration_ms,
            artUrl: song.item.album.images[0].url,
            url: song.item.external_urls.spotify,
        },
        progress: song.progress_ms,
    };
}

const getNowPlaying = async (
    force: boolean = false,
): Promise<AxiosResponse> => {
    const {access_token} = await getAccessToken(force);

    try {
        return axios(NOW_PLAYING_ENDPOINT, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
    } catch (err) {
        await getAccessToken(true);

        return getNowPlaying(true);
    }
};

const getRecentlyPlayed = async (force: boolean = false): Promise<AxiosResponse> => {
    const {access_token} = await getAccessToken(force);

    try {
        return axios(RECENTLY_PLAYED_ENDPOINT + "?limit=1", {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
    } catch (err) {
        await getAccessToken(true);
        return getRecentlyPlayed(true);
    }
};

const getAccessToken = async (force: boolean = false) => {
    if (access_token && !force) {
        return {access_token};
    }
    const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
    const response = await axios.post(
        TOKEN_ENDPOINT,
        querystring.stringify({
            grant_type: "refresh_token",
            refresh_token,
        }),
        {
            headers: {
                Authorization: `Basic ${basic}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
        },
    );

    access_token = response.data.access_token;

    return {access_token};
};

export type NowPlaying = {
    initialized: boolean;
    error: boolean;
    isPlaying: boolean;
    track: {
        title: string;
        artist: { name: string; url: string }[];
        album: { name: string; url: string };
        duration: number;
        artUrl: string;
        url: string;
    };
    progress: number;
};
