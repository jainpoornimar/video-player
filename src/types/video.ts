export interface Video {
  id: string;
  title: string;
  mediaUrl: string;   // <-- changed from src to mediaUrl
  thumbnailUrl: string;
  duration: number;
  category: {
    slug: string;
    name: string;
    iconUrl: string;
  };
}
