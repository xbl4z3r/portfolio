import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface NowPlaying {
  initialized: boolean;
  error: string | null;
  is_playing: boolean;
  track: {
    name: string;
    artists: {
      name: string;
      url: string;
    }[];
    album: {
      name: string;
      url: string;
    };
    duration: number;
    artUrl: string;
    url: string;
  };
  progress: number;
  played_at: string;
  type: "track" | "episode" | "unknown";
}
