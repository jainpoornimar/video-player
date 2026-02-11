import { useEffect, useRef, useState } from "react";
import type { Video } from "../../types/video";
import Hls from "hls.js";
import "./VideoPlayer.css";

interface Props {
  video: Video;
  allVideos: Video[];
  mode: "fullscreen" | "mini";
  onClose: () => void;
  onMinimize: () => void;
  onRestore: () => void;
}

const formatTime = (time: number) => {
  if (!time || isNaN(time)) return "0:00";
  const m = Math.floor(time / 60);
  const s = Math.floor(time % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};

const VideoPlayer = ({
  video,
  allVideos,
  onClose,
  onMinimize,
  mode,
  onRestore,
}: Props) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const dragStartY = useRef<number | null>(null);

  const [activeVideo, setActiveVideo] = useState<Video>(video);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [showList, setShowList] = useState(false);
/* ===============================
   SYNC PROP VIDEO → LOCAL STATE
   =============================== */
useEffect(() => {
  setActiveVideo(video);
}, [video]);

  /* ===============================
     LOAD VIDEO (ONLY WHEN VIDEO CHANGES)
     =============================== */
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    let hls: Hls | null = null;

    el.pause();
    el.removeAttribute("src");
    el.load();

    const playSafely = () => {
      el.play().catch(() => {});
    };

    if (activeVideo.mediaUrl.endsWith(".m3u8")) {
      if (Hls.isSupported()) {
        hls = new Hls();
        hls.loadSource(activeVideo.mediaUrl);
        hls.attachMedia(el);
        hls.on(Hls.Events.MANIFEST_PARSED, playSafely);
      } else {
        el.src = activeVideo.mediaUrl;
        el.onloadedmetadata = playSafely;
      }
    } else {
      el.src = activeVideo.mediaUrl;
      el.onloadedmetadata = playSafely;
    }

    return () => {
      hls?.destroy();
    };
  }, [activeVideo.id]); // 🔥 DO NOT include mode

  /* ===============================
     VIDEO EVENTS
     =============================== */
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleTime = () => setCurrentTime(el.currentTime);
    const handleMeta = () => setDuration(el.duration || 0);

    el.addEventListener("play", handlePlay);
    el.addEventListener("pause", handlePause);
    el.addEventListener("timeupdate", handleTime);
    el.addEventListener("loadedmetadata", handleMeta);

    return () => {
      el.removeEventListener("play", handlePlay);
      el.removeEventListener("pause", handlePause);
      el.removeEventListener("timeupdate", handleTime);
      el.removeEventListener("loadedmetadata", handleMeta);
    };
  }, []);

  /* ===============================
     CONTROLS
     =============================== */
  const togglePlay = () => {
    const el = videoRef.current;
    if (!el) return;

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
     DRAG TO MINIMIZE
     =============================== */
  const handlePointerDown = (e: React.PointerEvent) => {
    if (mode === "mini") return;
    dragStartY.current = e.clientY;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (dragStartY.current === null || mode === "mini") return;
    const deltaY = e.clientY - dragStartY.current;
    if (deltaY > 120) {
      onMinimize();
      dragStartY.current = null;
    }
  };

  const handlePointerUp = () => {
    dragStartY.current = null;
  };

  /* ===============================
     RELATED VIDEOS
     =============================== */
  const relatedVideos = allVideos.filter(
    (v: Video) =>
      v.category.slug === activeVideo.category.slug &&
      v.id !== activeVideo.id
  );

  return (
    <div
      className={`video-player-container ${
        mode === "mini" ? "mini-mode" : ""
      }`}
      style={
        mode === "mini"
          ? {
              position: "fixed",
              right: 16,
              bottom: 16,
              width: 360,
              height: 200,
              zIndex: 99999,
              borderRadius: 12,
              overflow: "hidden",
              boxShadow: "0 8px 30px rgba(0,0,0,0.6)",
              background: "#000",
            }
          : undefined
      }
    >
      {/* ================= FULLSCREEN HEADER ================= */}
      {mode === "fullscreen" && (
        <>
          <button className="back-btn" onClick={onClose}>
            ← Back
          </button>

          <div
            style={{
              position: "absolute",
              top: 19,
              left: 120,
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
        </>
      )}

      {/* ================= VIDEO WRAPPER ================= */}
      <div
        className="video-wrapper"
        onMouseMove={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {/* SINGLE VIDEO ELEMENT */}
        <video
          ref={videoRef}
          className="video-el"
          playsInline
          style={
            mode === "mini"
              ? { width: "100%", height: "100%", objectFit: "cover" }
              : undefined
          }
          onClick={() => {
            if (mode === "mini") onRestore();
          }}
        />

        {/* ================= FULLSCREEN CONTROLS ================= */}
        {mode === "fullscreen" && (
          <>
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
            {/* Reveal Handle */}
<div
  style={{
    position: "absolute",
    bottom: showList ? "35%" : "8px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 15,
    cursor: "pointer",
  }}
  onClick={() => setShowList((prev) => !prev)}
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


            {/* RELATED DRAWER */}
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                height: "35%",
                background: "#111",
                transform: showList
                  ? "translateY(0)"
                  : "translateY(100%)",
                transition: "transform 0.35s ease",
                zIndex: 14,
                padding: "16px",
                overflowY: "auto",
                color: "white",
              }}
            >
              <h4>Related Videos</h4>

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
                    style={{
                      width: 120,
                      height: 70,
                      objectFit: "cover",
                      borderRadius: 6,
                    }}
                  />
                  <div>
                    <div style={{ fontWeight: 500 }}>{v.title}</div>
                    <div style={{ opacity: 0.6 }}>{v.duration}</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ================= MINI CONTROLS ================= */}
        {mode === "mini" && (
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "10px 14px",
              background:
                "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0))",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "white",
            }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              style={{
                background: "none",
                border: "none",
                color: "white",
                fontSize: 22,
                cursor: "pointer",
              }}
            >
              {isPlaying ? "⏸" : "▶"}
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              style={{
                background: "none",
                border: "none",
                color: "white",
                fontSize: 18,
                cursor: "pointer",
              }}
            >
              ✕
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
