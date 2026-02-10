import { createContext } from "react";
import type { Video } from "../../types/video";

export interface PlayerState {
  currentVideo: Video | null;
  isPlaying: boolean;
}

export interface PlayerContextType {
  state: PlayerState;
  playVideo: (video: Video) => void;
  pause: () => void;
  playNext: () => void;
}


export const PlayerContext = createContext<PlayerContextType | null>(null);
