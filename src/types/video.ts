export interface Video {
  id: string;
  title: string;
  mediaUrl: string;   
  thumbnailUrl: string;
  duration: number;
  category: {
    slug: string;
    name: string;
    iconUrl: string;
  };
}
