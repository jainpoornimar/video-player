import type { Video } from "../types/video";

export const videos: Video[] = [
  {
    id: "video-1",
    title: "Sample AI Reel",
    thumbnailUrl: "https://picsum.photos/400/700?random=1",
    mediaUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    duration: 596,
    category: {
      slug: "social-media-ai",
      name: "Social Media AI",
      iconUrl: "",
    },
  },
  {
    id: "video-2",
    title: "Advanced Social Media AI Tips",
    thumbnailUrl: "https://picsum.photos/400/700?random=2",
    mediaUrl: "https://media.w3.org/2010/05/sintel/trailer.mp4",
    duration: 52,
    category: {
      slug: "social-media-ai", // 👈 SAME CATEGORY
      name: "Social Media AI",
      iconUrl: "",
    },
  },
  {
    id: "video-3",
    title: "AI Income Strategy",
    thumbnailUrl: "https://picsum.photos/400/700?random=3",
    mediaUrl: "https://www.w3schools.com/html/movie.mp4",
    duration: 420,
    category: {
      slug: "ai-income",
      name: "AI Income",
      iconUrl: "",
    },
  },
];
