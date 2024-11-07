import { formatViewCount, getRelativeTime } from '@/lib/youtube-utils';
import Link from 'next/link';
import { VideoPopupMenu } from './VideoPopupMenu';
import { useRouter } from 'next/navigation';
import { VideoDetail } from '@/types/youtube';

interface VideoCardProps {
  video: VideoDetail;
  onVideoClick?: (videoId: string) => void;
}

export function VideoCard({ video, onVideoClick }: VideoCardProps) {
  const router = useRouter();

  if (!video || !video.channel || !video.video) {
    return null;
  }

  const handleClick = () => {
    router.push(`/youtube/video/${video.video.videoId}`);
    if (onVideoClick) {
      onVideoClick(video.video.videoId);
    }
  };

  return (
    <>
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
          <div className="flex flex-col flex-1">
            <div className="flex justify-between items-start">
              <h3 className="font-medium line-clamp-2 text-sm flex-1">
                {video.video.title}
              </h3>
              <div onClick={(e) => e.stopPropagation()}>
                <VideoPopupMenu videoId={video.video.videoId} />
              </div>
            </div>
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
    </>
  );
}
