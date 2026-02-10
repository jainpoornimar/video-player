import type { Video } from "../../types/video";

interface VideoCardProps {
  video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
  return (
    <div className="relative mb-4 rounded-lg overflow-hidden bg-zinc-900">
      <img
        src={video.thumbnailUrl}
        alt={video.title}
        className="w-full h-56 object-cover"
      />

      {/* Duration */}
      <div className="absolute bottom-2 right-2 bg-black/80 text-xs px-2 py-1 rounded">
        {Math.floor(video.duration / 60)}:
        {(video.duration % 60).toString().padStart(2, "0")}
      </div>

      {/* Info */}
      <div className="p-3">
        <span className="text-xs text-blue-400">
          {video.category.name}
        </span>
        <h3 className="text-sm font-medium mt-1">
          {video.title}
        </h3>
      </div>
    </div>
  );
}
