import Link from 'next/link';
import { getRelativeTime } from '@/utils/youtube';

interface PlaylistProps {
  playlist: {
    playlistId: string;
    title: string;
    description: string;
    thumbnail: string;
    publishedAt: string;
    itemCount: number;
  };
}

export function PlaylistCard({ playlist }: PlaylistProps) {
  return (
    <Link href={`/youtube/playlist/${playlist.playlistId}`} className="block">
      <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
        <img
          src={playlist.thumbnail}
          alt={playlist.title}
          className="w-full h-48 object-cover rounded-md mb-2"
        />
        <h2 className="text-lg font-semibold mb-2">{playlist.title}</h2>
        <p className="text-gray-600 mb-2 line-clamp-2">
          {playlist.description}
        </p>
        <div className="text-sm text-gray-500">
          <p>동영상 {playlist.itemCount}개</p>
          <p>업데이트: {getRelativeTime(playlist.publishedAt)}</p>
        </div>
      </div>
    </Link>
  );
}
