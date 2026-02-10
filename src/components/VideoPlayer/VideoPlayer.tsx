import { useEffect, useRef, useState } from "react";
import type { Video } from "../../types/video";
import Hls from "hls.js";
import "./VideoPlayer.css";

interface Props {
  video: Video;
  allVideos: Video[];
  onClose: () => void;
}

const formatTime = (time: number) => {
  if (!time || isNaN(time)) return "0:00";
  const m = Math.floor(time / 60);
  const s = Math.floor(time % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};

const VideoPlayer = ({ video, allVideos, onClose }: Props) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [activeVideo, setActiveVideo] = useState<Video>(video);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [showList, setShowList] = useState(false);

  /* ===============================
     VIDEO LOAD (MP4 + HLS) – FINAL
     =============================== */
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    let hls: Hls | null = null;

    // reset
    el.pause();
    el.removeAttribute("src");
    el.load();
    el.muted = true; // 🔑 REQUIRED for autoplay
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);

    const playSafely = () => {
      el.play().catch(() => {});
    };

    if (activeVideo.mediaUrl.endsWith(".m3u8")) {
      if (Hls.isSupported()) {
        hls = new Hls();
        hls.loadSource(activeVideo.mediaUrl);
        hls.attachMedia(el);
        hls.on(Hls.Events.MANIFEST_PARSED, playSafely);
      } else if (el.canPlayType("application/vnd.apple.mpegurl")) {
        el.src = activeVideo.mediaUrl;
        el.oncanplay = playSafely;
      }
    } else {
      el.src = activeVideo.mediaUrl;
      el.oncanplay = playSafely;
    }

    return () => {
      hls?.destroy();
    };
  }, [activeVideo.id]);

  /* ===============================
     VIDEO EVENTS
     =============================== */
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onTime = () => setCurrentTime(el.currentTime);
    const onMeta = () => setDuration(el.duration || 0);

    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    el.addEventListener("timeupdate", onTime);
    el.addEventListener("loadedmetadata", onMeta);

    return () => {
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("loadedmetadata", onMeta);
    };
  }, [activeVideo.id]);

  /* ===============================
     CONTROLS
     =============================== */
  const togglePlay = () => {
    const el = videoRef.current;
    if (!el) return;

    el.muted = false; // user interaction → allow sound
    el.paused ? el.play().catch(() => {}) : el.pause();
  };

  const seekBy = (sec: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime += sec;
  };

  const seekTo = (time: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = time;
  };

  /* ===============================
     RELATED VIDEOS
     =============================== */
  const relatedVideos = allVideos.filter(
    (v) =>
      v.category.slug === activeVideo.category.slug &&
      v.id !== activeVideo.id
  );

  return (
    <div className="video-player-container">
      <button className="back-btn" onClick={onClose}>
        ← Back
      </button>
      {/* 🎬 Video Title */}
<div
  style={{
    position: "absolute",
    top: 19,
    left: 120, // keeps space for Back button
    zIndex: 20,
    color: "white",
    fontSize: 16,
    fontWeight: 500,
    maxWidth: "70%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    pointerEvents: "none",
  }}
>
  {activeVideo.title}
</div>



      <div
        className="video-wrapper"
        onMouseMove={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <video
          key={activeVideo.id}
          ref={videoRef}
          className="video-el"
          playsInline
        />

        <div className={`controls ${showControls ? "show" : ""}`}>
          <input
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            onChange={(e) => seekTo(Number(e.target.value))}
            className="progress"
          />

          <div className="control-row">
            <div className="left-controls">
              <button onClick={() => seekBy(-10)}>⏪ 10</button>
              <button onClick={togglePlay}>
                {isPlaying ? "⏸" : "▶"}
              </button>
              <button onClick={() => seekBy(10)}>10 ⏩</button>
              <span className="time">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
          </div>
        </div>

        {/* Reveal handle */}
        <div
          style={{
            position: "absolute",
            bottom: showList ? "35%" : "8px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 15,
            cursor: "pointer",
          }}
          onClick={() => setShowList((p) => !p)}
        >
          <div
            style={{
              width: 36,
              height: 5,
              borderRadius: 4,
              background: "rgba(255,255,255,0.6)",
            }}
          />
        </div>

        {/* Related drawer */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: "35%",
            background: "#111",
            transform: showList ? "translateY(0)" : "translateY(100%)",
            transition: "transform 0.35s ease",
            zIndex: 14,
            padding: "16px",
            overflowY: "auto",
            color: "white",
          }}
        >
          <h4>Related Videos</h4>

          {relatedVideos.length === 0 && (
            <p style={{ opacity: 0.6 }}>
              No more videos in this category
            </p>
          )}

          {relatedVideos.map((v) => (
            <div
              key={v.id}
              style={{
                display: "flex",
                gap: 12,
                marginBottom: 12,
                cursor: "pointer",
              }}
              onClick={() => {
                setShowList(false);
                setActiveVideo(v);
              }}
            >
              <img
                src={v.thumbnailUrl}
                alt={v.title}
                style={{
                  width: 120,
                  height: 70,
                  objectFit: "cover",
                  borderRadius: 6,
                }}
              />
              <div>
                <div style={{ fontSize: 14, fontWeight: 500 }}>
                  {v.title}
                </div>
                <div style={{ fontSize: 12, opacity: 0.6 }}>
                  {v.duration}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
