import type { Video } from "../../types/video";
import { videos } from "../../data/videos";
import VideoCard from "../../components/VideoCard/VideoCard";

interface HomeProps {
  onSelectVideo: (video: Video) => void;
}

const Home = ({ onSelectVideo }: HomeProps) => {
  const groupedVideos = videos.reduce<Record<string, Video[]>>(
    (acc, video) => {
      const key = video.category.slug;
      if (!acc[key]) acc[key] = [];
      acc[key].push(video);
      return acc;
    },
    {}
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0f0f0f",
        color: "#ffffff",
        padding: "32px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            fontSize: "30px",
            fontWeight: 700,
            marginBottom: "40px",
            letterSpacing: "-0.5px",
          }}
        >
          Video Feed
        </h1>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "48px",
          }}
        >
          {Object.entries(groupedVideos).map(([slug, items]) => (
            <section key={slug}>
              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  marginBottom: "18px",
                  color: "#f1f1f1",
                  letterSpacing: "0.3px",
                }}
              >
                {items[0].category.name}
              </h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fill, minmax(260px, 1fr))",
                  gap: "20px",
                }}
              >
                {items.map((video) => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    onClick={() => onSelectVideo(video)}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
