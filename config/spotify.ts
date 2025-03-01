import querystring from "querystring";

import axios, { AxiosResponse } from "axios";
import { config } from "dotenv";

config();

const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const client_id = process.env.WEB_SPOTIFY_CLIENT_ID;
const client_secret = process.env.WEB_SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.WEB_SPOTIFY_REFRESH_TOKEN;

let access_token: string | null = null;

export async function getNowPlayingItem(): Promise<NowPlaying> {
  const response = await getNowPlaying();

  if (response.status === 401) {
    await getAccessToken(true);

    return getNowPlayingItem();
  }

  if (response.status > 400 || response.status === 204) {
    return {
      initialized: true,
      error: true,
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
    };
  }

  const song = await response.data;

  if (song.currently_playing_type !== "track") {
    return {
      initialized: true,
      error: false,
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
    };
  }

  const albumImageUrl = song.item.album.images[0].url;
  const artist = song.item.artists
    .map((_artist: { name: any }) => _artist.name)
    .join(", ");
  const artistUrl = song.item.artists[0].external_urls.spotify;
  const isPlaying = song.is_playing;
  const songUrl = song.item.external_urls.spotify;
  const title = song.item.name;
  const album = song.item.album.name;
  const albumUrl = song.item.album.external_urls.spotify;
  const duration = song.item.duration_ms;
  const progress = song.progress_ms;

  return {
    initialized: true,
    error: false,
    isPlaying: isPlaying,
    track: {
      title: title,
      artist: [{ name: artist, url: artistUrl }],
      album: { name: album, url: albumUrl },
      duration: duration,
      artUrl: albumImageUrl,
      url: songUrl,
    },
    progress: progress,
  };
}

const getNowPlaying = async (
  force: boolean = false,
): Promise<AxiosResponse> => {
  const { access_token } = await getAccessToken(force);

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

const getAccessToken = async (force: boolean = false) => {
  if (access_token && !force) {
    return { access_token };
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

  return { access_token };
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
