import type { Video } from "../types/video";

export const videos: Video[] = [
  {
    id: "video-1",
    title: "Sample AI Reel",
    thumbnailUrl: "/thumbnails/video1.jpg",  
    mediaUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    duration: 10,
    category: {
      slug: "social-media-ai",
      name: "Social Media AI",
      iconUrl: "",
    },
  },
  {
    id: "video-2",
    title: "Advanced Social Media AI Tips",
    thumbnailUrl: "/thumbnails/video2.jpg",  
    mediaUrl: "https://media.w3.org/2010/05/sintel/trailer.mp4",
    duration: 52,
    category: {
      slug: "social-media-ai",
      name: "Social Media AI",
      iconUrl: "",
    },
  },
  {
    id: "video-3",
    title: "AI Income Strategy",
    thumbnailUrl: "/thumbnails/video3.jpg",  
    mediaUrl: "https://www.w3schools.com/html/movie.mp4",
    duration: 12,
    category: {
      slug: "ai-income",
      name: "AI Income",
      iconUrl: "",
    },
  },
];
