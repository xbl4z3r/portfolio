import querystring from "querystring";

import axios, {AxiosResponse} from "axios";
import {config} from "dotenv";
import {NowPlaying} from "@/types";

config();

const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played`;
const client_id = process.env.WEB_SPOTIFY_CLIENT_ID;
const client_secret = process.env.WEB_SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.WEB_SPOTIFY_REFRESH_TOKEN;

let access_token: string | null = null;

export async function getNowPlayingItem(force: boolean = false): Promise<NowPlaying> {
    let response: AxiosResponse;
    try {
        response = await getNowPlaying(force);
    } catch (err) {
        await getAccessToken(true);
        return getNowPlayingItem(true);
    }

    if (response.status === 401) {
        await getAccessToken(true);
        return getNowPlayingItem(true);
    }

    if (response.status > 400) {
        return {
            initialized: true,
            error: "Spotify API Error - " + response.status,
            is_playing: false,
            track: {
                name: "Not Playing",
                artists: [{name: "No Artist", url: ""}],
                album: {name: "No Album", url: ""},
                duration: 0,
                artUrl: "https://placehold.co/200",
                url: "",
            },
            progress: 0,
            played_at: Date.now().toString(),
            type: "unknown",
        };
    }

    const song = await response.data;

    if (response.status === 204 ||
        song.currently_playing_type === "unknown" ||
        song.item === null
    ) {
        const recentlyPlayed = await getRecentlyPlayed();
        const recentlyPlayedSong = await recentlyPlayed.data;
        return {
            initialized: true,
            error: null,
            is_playing: false,
            track: {
                name: recentlyPlayedSong.items[0].track.name,
                artists: recentlyPlayedSong.items[0].track.artists.map((_artist: { name: any, external_urls: any }) => ({
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
            played_at: recentlyPlayedSong.items[0].played_at,
            type: recentlyPlayedSong.items[0].track.type,
        }
    }

    if (song.currently_playing_type === "episode") {
        return {
            initialized: true,
            error: null,
            is_playing: song.is_playing,
            track: {
                name: song.item.name,
                artists: [{name: song.item.show.publisher, url: song.item.show.external_urls.spotify}],
                album: {name: song.item.show.name, url: song.item.show.external_urls.spotify},
                duration: song.item.duration_ms,
                artUrl: song.item.images[0].url,
                url: song.item.external_urls.spotify
            },
            progress: song.progress_ms,
            played_at: new Date(song.timestamp).toString(),
            type: song.currently_playing_type
        };
    }

    return {
        initialized: true,
        error: null,
        is_playing: song.is_playing,
        track: {
            name: song.item.name,
            artists: song.item.artists.map((_artist: { name: any, external_urls: any }) => ({
                name: _artist.name,
                url: _artist.external_urls.spotify,
            })),
            album: {name: song.item.album.name, url: song.item.album.external_urls.spotify},
            duration: song.item.duration_ms,
            artUrl: song.item.album.images[0].url,
            url: song.item.external_urls.spotify,
        },
        progress: song.progress_ms,
        played_at: new Date(song.timestamp).toString(),
        type: song.currently_playing_type,
    };
}

const getNowPlaying = async (
    force: boolean = false,
): Promise<AxiosResponse> => {
    const {access_token} = await getAccessToken(force);

    try {
        return axios(NOW_PLAYING_ENDPOINT + "?additional_types=episode", {
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