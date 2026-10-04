import querystring from "querystring";
import axios, {AxiosResponse} from "axios";
import {config} from "dotenv";
import {NowPlaying} from "@/types";

config();

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_ENDPOINT = "https://api.spotify.com/v1/me/player/recently-played";

const client_id = process.env.WEB_SPOTIFY_CLIENT_ID;
const client_secret = process.env.WEB_SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.WEB_SPOTIFY_REFRESH_TOKEN;

let access_token: string | null = null;
let token_expires_at: number = 0;

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export async function getNowPlayingItem(
    force: boolean = false,
    _retryCount: number = 0,
): Promise<NowPlaying> {
    if (!client_id || !client_secret || !refresh_token) {
        return errorFallback("Spotify credentials not configured");
    }

    if (_retryCount > 1) {
        return errorFallback("Spotify API Error - max retries exceeded");
    }

    let response: AxiosResponse;
    try {
        response = await getNowPlaying(force);
    } catch (err) {
        try {
            await getAccessToken(true);
            return getNowPlayingItem(true, _retryCount + 1);
        } catch {
            return errorFallback("Failed to authenticate with Spotify");
        }
    }

    if (response.status === 401) {
        try {
            await getAccessToken(true);
            return getNowPlayingItem(true, _retryCount + 1);
        } catch {
            return errorFallback("Spotify token refresh failed");
        }
    }

    if (response.status > 400) {
        return errorFallback("Spotify API Error - " + response.status);
    }

    const song = response.data;

    if (
        response.status === 204 ||
        song?.currently_playing_type === "unknown" ||
        !song?.item
    ) {
        return getRecentlyPlayedFallback();
    }

    if (song.currently_playing_type === "episode") {
        return {
            initialized: true,
            error: null,
            is_playing: Boolean(song.is_playing),
            track: {
                name: song.item.name,
                artists: [{name: song.item.show?.publisher ?? "Unknown", url: song.item.show?.external_urls?.spotify ?? ""}],
                album: {name: song.item.show?.name ?? "Unknown Show", url: song.item.show?.external_urls?.spotify ?? ""},
                duration: song.item.duration_ms ?? 0,
                artUrl: song.item.images?.[0]?.url ?? "https://placehold.co/200",
                url: song.item.external_urls?.spotify ?? "",
            },
            progress: song.progress_ms ?? 0,
            played_at: song.timestamp ? new Date(song.timestamp).toString() : new Date().toString(),
            type: song.currently_playing_type,
        };
    }

    return {
        initialized: true,
        error: null,
        is_playing: Boolean(song.is_playing),
        track: {
            name: song.item.name,
            artists: (song.item.artists ?? []).map((_artist: { name: string; external_urls: { spotify: string } }) => ({
                name: _artist.name,
                url: _artist.external_urls?.spotify ?? "",
            })),
            album: {
                name: song.item.album?.name ?? "Unknown Album",
                url: song.item.album?.external_urls?.spotify ?? ""
            },
            duration: song.item.duration_ms ?? 0,
            artUrl: song.item.album?.images?.[0]?.url ?? "https://placehold.co/200",
            url: song.item.external_urls?.spotify ?? "",
        },
        progress: song.progress_ms ?? 0,
        played_at: song.timestamp ? new Date(song.timestamp).toString() : new Date().toString(),
        type: song.currently_playing_type ?? "track",
    };
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

async function getRecentlyPlayedFallback(): Promise<NowPlaying> {
    try {
        const recentlyPlayed = await getRecentlyPlayed();
        const items = recentlyPlayed.data?.items;
        if (!items || items.length === 0 || !items[0]?.track) {
            return errorFallback("No recently played track available");
        }
        const item = items[0];
        return {
            initialized: true,
            error: null,
            is_playing: false,
            track: {
                name: item.track.name,
                artists: (item.track.artists ?? []).map(
                    (_artist: { name: string; external_urls: { spotify: string } }) => ({
                        name: _artist.name,
                        url: _artist.external_urls?.spotify ?? "",
                    }),
                ),
                album: {
                    name: item.track.album?.name ?? "Unknown Album",
                    url: item.track.album?.external_urls?.spotify ?? "",
                },
                duration: item.track.duration_ms ?? 0,
                artUrl: item.track.album?.images?.[0]?.url ?? "https://placehold.co/200",
                url: item.track.external_urls?.spotify ?? "",
            },
            progress: item.track.duration_ms ?? 0,
            played_at: item.played_at ?? new Date().toString(),
            type: item.track.type ?? "track",
        };
    } catch {
        return errorFallback("Failed to fetch recently played tracks");
    }
}

function errorFallback(message: string): NowPlaying {
    return {
        initialized: true,
        error: message,
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

const getNowPlaying = async (force: boolean = false): Promise<AxiosResponse> => {
    const {access_token} = await getAccessToken(force);
    return axios(NOW_PLAYING_ENDPOINT + "?additional_types=episode", {
        headers: {Authorization: `Bearer ${access_token}`},
        // Disable axios throwing on non-2xx so we can handle 204/401 ourselves
        validateStatus: () => true,
    });
};

const getRecentlyPlayed = async (force: boolean = false): Promise<AxiosResponse> => {
    const {access_token} = await getAccessToken(force);
    return axios(RECENTLY_PLAYED_ENDPOINT + "?limit=1", {
        headers: {Authorization: `Bearer ${access_token}`},
        validateStatus: () => true,
    });
};

/**
 * Exchange the OAuth refresh token for a short-lived (~1h) Web API bearer token.
 * Token is cached and only re-fetched when within 60 seconds of expiry.
 */
const getAccessToken = async (force: boolean = false): Promise<{ access_token: string }> => {
    const now = Date.now();
    if (access_token && !force && now < token_expires_at - 60_000) {
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

    access_token = response.data.access_token as string;
    // Spotify tokens last 3600s; store exact expiry
    const expires_in: number = response.data.expires_in ?? 3600;
    token_expires_at = Date.now() + expires_in * 1000;

    return {access_token};
};
