import { useState } from "react";
import { PlayerContext, type PlayerState } from "./PlayerContext";
import { videos } from "../../data/videos";   
import type { Video } from "../../types/video"; 

interface Props {
  children: React.ReactNode;
}

export const PlayerProvider = ({ children }: Props) => {
  const [state, setState] = useState<PlayerState>({
    currentVideo: null,
    isPlaying: false,
  });

  const playVideo = (video: Video) => {
    setState({
      currentVideo: video,
      isPlaying: true,
    });
  };

  const pause = () => {
    setState((prev) => ({
      ...prev,
      isPlaying: false,
    }));
  };

  //   Auto-play next video
  const playNext = () => {
    if (!state.currentVideo) return;

    const currentIndex = videos.findIndex(
      (v) => v.id === state.currentVideo?.id
    );

    const nextIndex = (currentIndex + 1) % videos.length;
    const nextVideo = videos[nextIndex];

    setState({
      currentVideo: nextVideo,
      isPlaying: true,
    });
  };

  return (
    <PlayerContext.Provider
      value={{
        state,
        playVideo,
        pause,
        playNext, 
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
