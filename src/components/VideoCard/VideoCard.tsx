import type { Video } from "../../types/video";

interface Props {
  video: Video;
  onClick: () => void;
}

const formatDuration = (sec: number) => {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};

const VideoCard = ({ video, onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      style={{
        cursor: "pointer",
        borderRadius: "14px",
        overflow: "hidden",
        background: "#181818",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow =
          "0 10px 25px rgba(0,0,0,0.5)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div style={{ position: "relative" }}>
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          style={{
            width: "100%",
            height: "160px",
            objectFit: "cover",
          }}
          
        />
        

        {/* Duration Badge */}
        <span
          style={{
            position: "absolute",
            bottom: 8,
            right: 8,
            background: "rgba(0,0,0,0.8)",
            padding: "3px 6px",
            fontSize: "12px",
            borderRadius: "4px",
          }}
        >
          {formatDuration(video.duration)}
        </span>
      </div>

      <div style={{ padding: "12px" }}>
        <div
          style={{
            fontSize: "14px",
            fontWeight: 600,
            marginBottom: "6px",
            color: "#fff",
          }}
        >
          {video.title}
        </div>

        <div
          style={{
            fontSize: "12px",
            color: "#aaa",
          }}
        >
          {video.category.name}
        </div>
      </div>
    </div>
    
  );
};

export default VideoCard;
