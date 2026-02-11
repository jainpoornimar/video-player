import { useState } from "react";
import Home from "./pages/Home/Home";
import type { Video } from "./types/video";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer";
import { videos } from "./data/videos";

function App() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [playerMode, setPlayerMode] = useState<"fullscreen" | "mini">(
    "fullscreen"
  );

  const isFullscreenVideo = selectedVideo && playerMode === "fullscreen";

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      {/*  HOME PAGE 
          
      */}
      <div
        style={{
          display: isFullscreenVideo ? "none" : "block",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Home
          onSelectVideo={(video) => {
            setSelectedVideo(video);
            setPlayerMode("fullscreen");
          }}
        />
      </div>

      {/*  VIDEO PLAYER 
          
      */}
      {selectedVideo && (
        <div
          style={{
            position: playerMode === "mini" ? "fixed" : "relative",
            zIndex: playerMode === "mini" ? 9999 : 10,
          }}
        >
          <VideoPlayer
            video={selectedVideo}
            allVideos={videos}
            mode={playerMode}
            onMinimize={() => {
              console.log("App: switching to mini mode");
              setPlayerMode("mini");
            }}
            onRestore={() => {
              console.log("App: restoring fullscreen");
              setPlayerMode("fullscreen");
            }}
            onClose={() => {
              setSelectedVideo(null);
              setPlayerMode("fullscreen");
            }}
          />
        </div>
      )}
    </div>
  );
}

export default App;