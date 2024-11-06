import { formatViewCount, getRelativeTime } from '@/lib/youtube-utils';
import Link from 'next/link';

interface Channel {
  channelId: string;
  title: string;
  thumbnail: string;
}

interface VideoData {
  video: {
    videoId: string;
    title: string;
    description: string;
    thumbnail: string;
    publishedAt: string;
    duration: string;
    viewCount: string;
    likeCount: string;
  };
  channel: Channel;
}

interface VideoCardProps {
  video: VideoData;
  onVideoClick?: (videoId: string) => void;
}

export function VideoCard({ video, onVideoClick }: VideoCardProps) {
  const handleClick = () => {
    if (onVideoClick) {
      onVideoClick(video.video.videoId);
    }
  };

  return (
    <div className="cursor-pointer" onClick={handleClick}>
      <div className="relative group">
        <div className="aspect-video bg-muted rounded-lg overflow-hidden">
          <img
            src={video.video.thumbnail}
            alt={video.video.title}
            className="w-full h-full object-cover"
          />
        </div>
        {video.video.duration && (
          <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
            {video.video.duration
              .replace('PT', '')
              .replace('H', ':')
              .replace('M', ':')
              .replace('S', '')}
          </div>
        )}
      </div>
      <div className="flex gap-2 mt-2">
        <Link href={`/youtube/channel/${video.channel.channelId}`}>
          <img
            src={video.channel.thumbnail}
            alt={video.channel.title}
            className="w-8 h-8 rounded-full"
          />
        </Link>
        <div className="flex flex-col">
          <h3 className="font-medium line-clamp-2 text-sm">
            {video.video.title}
          </h3>
          <Link
            href={`/youtube/channel/${video.channel.channelId}`}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            {video.channel.title}
          </Link>
          <div className="text-sm text-muted-foreground">
            조회수 {formatViewCount(video.video.viewCount)}회 •{' '}
            {getRelativeTime(video.video.publishedAt)}
          </div>
        </div>
      </div>
    </div>
  );
}
