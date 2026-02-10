import { useState } from "react";
import Home from "./pages/Home/Home";
import type { Video } from "./types/video";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer";
import {videos} from "./data/videos";
import VideoPortal from "./components/VideoPlayer/VideoPortal";

function App() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  return (
  <div
    style={{
      minHeight: "100vh",
      transition: "opacity 0.35s ease, transform 0.35s ease",
    }}
  >
    {selectedVideo ? (
      <div
        style={{
          opacity: 1,
          transform: "scale(1)",
          transition: "opacity 0.35s ease, transform 0.35s ease",
        }}
      >
        

{selectedVideo && (
  <VideoPortal>
    <VideoPlayer
      video={selectedVideo}
      allVideos={videos}
      onClose={() => setSelectedVideo(null)}
    />
  </VideoPortal>
)}


      </div>
    ) : (
      <div
        style={{
          opacity: 1,
          transform: "scale(1)",
          transition: "opacity 0.35s ease, transform 0.35s ease",
        }}
      >
        <Home onSelectVideo={setSelectedVideo} />
      </div>
    )}
  </div>
);
}

export default App;