import Link from 'next/link';
import { formatViewCount } from '@/lib/youtube-utils';

interface ChannelCardProps {
  channel: {
    id: string;
    title: string;
    thumbnail: string;
    subscriberCount: string;
    viewCount: string;
    videoCount: string;
    description: string;
    customUrl: string;
  };
}

export default function ChannelCard({ channel }: ChannelCardProps) {
  return (
    <Link href={`/youtube/channel/${channel.id}`}>
      <div className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex items-center gap-4 mb-4">
          <img
            src={channel.thumbnail}
            alt={channel.title}
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h2 className="font-semibold">{channel.title}</h2>
            <p className="text-sm text-muted-foreground">
              @{channel.customUrl.replace('@', '')}
            </p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
          {channel.description}
        </p>
        <div className="text-sm text-muted-foreground">
          <p>구독자 {formatViewCount(channel.subscriberCount)}명</p>
          <p>동영상 {channel.videoCount}개</p>
        </div>
      </div>
    </Link>
  );
}
