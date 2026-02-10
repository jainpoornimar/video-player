import type { Category } from "./category";

export interface Video {
  id: string;
  title: string;
  thumbnailUrl: string;
  mediaUrl: string;
  duration: number; // in seconds
  category: Category;
}
