import type { Video } from "../types/video";

export const videos: Video[] = [
  {
    id: "video-1",
    title: "Sample AI Reel",
    thumbnailUrl: "https://picsum.photos/400/700?1",
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
    title: "AI Income Strategy",
    thumbnailUrl: "https://picsum.photos/400/700?2",
    mediaUrl: "https://www.w3schools.com/html/movie.mp4",
    duration: 420,
    category: {
      slug: "ai-income",
      name: "AI Income",
      iconUrl: "",
    },
  },
];
