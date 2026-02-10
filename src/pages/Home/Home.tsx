import type { Video } from "../../types/video";
import { videos } from "../../data/videos";
import VideoCard from "../../components/VideoCard/VideoCard";

interface HomeProps {
  onSelectVideo: (video: Video) => void;
}

const Home = ({ onSelectVideo }: HomeProps) => {
  // Group videos by category
  const groupedVideos = videos.reduce<Record<string, Video[]>>(
    (acc, video) => {
      const key = video.category.slug;

      if (!acc[key]) {
        acc[key] = [];
      }

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
        padding: "24px",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {/* Page Title */}
        <h1
          style={{
            fontSize: "28px",
            fontWeight: 600,
            marginBottom: "32px",
          }}
        >
          Video Feed
        </h1>

        {/* Category Sections */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "40px",
          }}
        >
          {Object.entries(groupedVideos).map(([slug, items]) => (
            <section key={slug}>
              {/* Category Heading */}
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: 500,
                  marginBottom: "16px",
                }}
              >
                {items[0].category.name}
              </h2>

              {/* Video Cards */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
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
