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
  const [showUpNext, setShowUpNext] = useState(false);
const [countdown, setCountdown] = useState(2);
const [isPiP, setIsPiP] = useState(false);
const [skipFeedback, setSkipFeedback] = useState<null | "forward" | "backward">(null);



/* SYNC PROP VIDEO → LOCAL STATE*/
useEffect(() => {
  setActiveVideo(video);
}, [video]);

  /* LOAD VIDEO (ONLY WHEN VIDEO CHANGES)*/
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

  /* VIDEO EVENTS */
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleTime = () => setCurrentTime(el.currentTime);
    const handleMeta = () => setDuration(el.duration || 0);
    const handleEnded = () => {
  if (relatedVideos.length === 0) return;

  setShowUpNext(true);
  setCountdown(2);
};


    el.addEventListener("play", handlePlay);
    el.addEventListener("pause", handlePause);
    el.addEventListener("timeupdate", handleTime);
    el.addEventListener("loadedmetadata", handleMeta);
    el.addEventListener("play", handlePlay);

    el.addEventListener("ended", handleEnded);


    return () => {
      el.removeEventListener("play", handlePlay);
      el.removeEventListener("pause", handlePause);
      el.removeEventListener("timeupdate", handleTime);
      el.removeEventListener("loadedmetadata", handleMeta);
      el.removeEventListener("ended", handleEnded);

    };
  }, []);

  useEffect(() => {
  if (!showUpNext) return;

  if (countdown === 0) {
    const nextVideo = relatedVideos[0];
    if (nextVideo) {
      setActiveVideo(nextVideo);
    }
    setShowUpNext(false);
    return;
  }

  const timer = setTimeout(() => {
    setCountdown((prev) => prev - 1);
  }, 1000);

  return () => clearTimeout(timer);
}, [showUpNext, countdown]);


useEffect(() => {
  const video = videoRef.current;
  if (!video) return;

  const handleEnter = () => setIsPiP(true);
  const handleLeave = () => setIsPiP(false);

  video.addEventListener("enterpictureinpicture", handleEnter);
  video.addEventListener("leavepictureinpicture", handleLeave);

  return () => {
    video.removeEventListener("enterpictureinpicture", handleEnter);
    video.removeEventListener("leavepictureinpicture", handleLeave);
  };
}, []);


  /*  CONTROLS*/
  const togglePlay = () => {
    const el = videoRef.current;
    if (!el) return;

    el.paused ? el.play().catch(() => {}) : el.pause();
  };

  /* PIP toggle function */

  const togglePiP = async () => {
  const video = videoRef.current;
  if (!video) return;

  try {
    if (document.pictureInPictureElement) {
      await document.exitPictureInPicture();
      setIsPiP(false);
    } else {
      await video.requestPictureInPicture();
      setIsPiP(true);
    }
  } catch (err) {
    console.error("PiP failed:", err);
  }
};


  const seekBy = (sec: number) => {
  const el = videoRef.current;
  if (!el) return;

  el.currentTime += sec;

  // Trigger animation
  if (sec > 0) {
    setSkipFeedback("forward");
  } else {
    setSkipFeedback("backward");
  }

  // Clear animation after 500ms
  setTimeout(() => {
    setSkipFeedback(null);
  }, 500);
};


  const seekTo = (time: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = time;
  };

  /* DRAG TO MINIMIZE*/
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

  /* RELATED VIDEOS */
  const relatedVideos = allVideos.filter(
    (v: Video) =>
      v.category.slug === activeVideo.category.slug &&
      v.id !== activeVideo.id
  );

  const ITEM_HEIGHT = 90; 
const VISIBLE_COUNT = 6;
const [scrollTop, setScrollTop] = useState(0);

const startIndex = Math.floor(scrollTop / ITEM_HEIGHT);
const endIndex = startIndex + VISIBLE_COUNT;

const visibleVideos = relatedVideos.slice(startIndex, endIndex);


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
      {/*  FULLSCREEN HEADER  */}
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

      {/*  VIDEO WRAPPER  */}
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
        {/* Skip Feedback Animation */}
{skipFeedback && (
  <div
    style={{
      position: "absolute",
      top: "50%",
      left: skipFeedback === "backward" ? "30%" : "70%",
      transform: "translate(-50%, -50%)",
      fontSize: 28,
      fontWeight: 700,
      color: "white",
      background: "rgba(0,0,0,0.6)",
      padding: "12px 18px",
      borderRadius: 50,
      animation: "skipFade 0.5s ease",
      pointerEvents: "none",
      zIndex: 30,
    }}
  >
    {skipFeedback === "forward" ? "+10s" : "-10s"}
  </div>
)}


        {/*  FULLSCREEN CONTROLS  */}
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
  <button onClick={() => seekBy(-10)}>⏪ </button>
  <button onClick={togglePlay}>
    {isPlaying ? "⏸" : "▶"}
  </button>
  <button onClick={() => seekBy(10)}> ⏩</button>
  <button onClick={togglePiP}>
    {isPiP ? "🗗" : "🗖"}
  </button>
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

 {showUpNext && (
  <div
    style={{
      position: "absolute",
      inset: 0,
      background: "rgba(0,0,0,0.7)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
      zIndex: 30,
    }}
  >
    <h2 style={{ marginBottom: 16 }}>
      Up Next in {countdown}...
    </h2>

    <button
      onClick={() => setShowUpNext(false)}
      style={{
        padding: "8px 16px",
        background: "#0972b4",
        border: "none",
        borderRadius: 6,
        color: "white",
        cursor: "pointer",
      }}
    >
      Cancel
    </button>
  </div>
)}


            {/* RELATED DRAWER */}
            <div
  onScroll={(e) =>
    setScrollTop((e.target as HTMLDivElement).scrollTop)
  }
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

              <div
  style={{
    height: relatedVideos.length * ITEM_HEIGHT,
    position: "relative",
  }}
>
  {visibleVideos.map((v, index) => {
    const actualIndex = startIndex + index;

    return (
      <div
        key={v.id}
        style={{
          position: "absolute",
          top: actualIndex * ITEM_HEIGHT,
          left: 0,
          right: 0,
          height: ITEM_HEIGHT,
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
    );
  })}
</div>

            </div>
          </>
        )}

        {/*  MINI CONTROLS  */}
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
