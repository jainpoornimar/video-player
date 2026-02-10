import type { Video } from "../../types/video";

interface VideoCardProps {
  video: Video;
  onClick: () => void;
}

const formatDuration = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const VideoCard = ({ video, onClick }: VideoCardProps) => {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        gap: "16px",
        backgroundColor: "#1c1c1c",
        borderRadius: "12px",
        overflow: "hidden",
        cursor: "pointer",
        transition: "background-color 0.2s ease",
      }}
    >
      {/* Thumbnail */}
      <div style={{ position: "relative" }}>
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          style={{
            width: "160px",
            height: "100px",
            objectFit: "cover",
          }}
        />

        {/* Duration */}
        <span
          style={{
            position: "absolute",
            bottom: "6px",
            right: "6px",
            background: "rgba(0,0,0,0.8)",
            color: "#fff",
            fontSize: "12px",
            padding: "2px 6px",
            borderRadius: "4px",
          }}
        >
          {formatDuration(video.duration)}
        </span>
      </div>

      {/* Info */}
      <div
        style={{
          flex: 1,
          padding: "12px 12px 12px 0",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h3
          style={{
            fontSize: "16px",
            fontWeight: 500,
            marginBottom: "8px",
          }}
        >
          {video.title}
        </h3>

        {/* Category badge */}
        <span
          style={{
            display: "inline-block",
            backgroundColor: "#2a2a2a",
            color: "#ccc",
            fontSize: "12px",
            padding: "4px 8px",
            borderRadius: "999px",
            width: "fit-content",
          }}
        >
          {video.category.name}
        </span>
      </div>
    </div>
  );
};

export default VideoCard;
