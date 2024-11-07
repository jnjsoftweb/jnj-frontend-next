import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter } from 'next/navigation';
import { VideoDetail, PlaylistDetail, ChannelDetail } from '@/types/youtube';
import { VideoCard } from './VideoCard';

interface ChannelTabsProps {
  channelDetail: ChannelDetail;
  videoDetails: VideoDetail[];
  playlistDetails: PlaylistDetail[];
  defaultValue?: string;
  channelId: string;
}

export function ChannelTabs({
  channelDetail,
  videoDetails,
  playlistDetails,
  defaultValue = 'videos',
  channelId,
}: ChannelTabsProps) {
  const router = useRouter();

  const handleTabChange = (value: string) => {
    const routes = {
      about: 'info',
      videos: 'videolist',
      playlists: 'playlist',
    };
    router.push(
      `/youtube/channel/${channelId}/${routes[value as keyof typeof routes]}`
    );
  };

  return (
    <Tabs defaultValue={defaultValue} onValueChange={handleTabChange}>
      <TabsList className="mb-4">
        <TabsTrigger value="about">채널정보</TabsTrigger>
        <TabsTrigger value="videos">동영상</TabsTrigger>
        <TabsTrigger value="playlists">재생목록</TabsTrigger>
      </TabsList>

      <TabsContent value="about">
        <div className="bg-card rounded-lg p-6">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={channelDetail.thumbnail}
              alt={channelDetail.title}
              className="w-24 h-24 rounded-full"
            />
            <div>
              <h2 className="text-xl font-bold">{channelDetail.title}</h2>
              <p className="text-gray-500">{channelDetail.customUrl}</p>
            </div>
          </div>
          <p className="whitespace-pre-line">{channelDetail.description}</p>
        </div>
      </TabsContent>

      <TabsContent value="videos">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {videoDetails.map((item) => (
            <VideoCard key={item.video.videoId} video={item} />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="playlists">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {playlistDetails.map((playlist) => (
            <div
              key={playlist.playlistId}
              className="bg-card rounded-lg overflow-hidden shadow-sm"
            >
              <img
                src={playlist.thumbnail}
                alt={playlist.title}
                className="w-full aspect-video object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                  {playlist.title}
                </h3>
                <p className="text-sm text-gray-500">
                  동영상 {playlist.itemCount}개
                </p>
              </div>
            </div>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
