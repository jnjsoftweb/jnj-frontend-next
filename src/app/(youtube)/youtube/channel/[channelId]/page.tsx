'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  VIDEOS_BY_CHANNELID,
  GQL_PLAYLISTS_BY_CHANNELID,
  GQL_CHANNEL_DETAIL,
} from '@/queries/gql/youtube';
import { fetchGraphql } from '@/service/fetchData';
// import Link from 'next/link';
import { PlaylistCard } from '@/app/(youtube)/youtube/components/PlaylistCard';
import { VideoCard } from '@/app/(youtube)/youtube/components/VideoCard';

interface Video {
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
  channel: {
    channelId: string;
    title: string;
    thumbnail: string;
  };
}

interface Playlist {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  channelTitle: string;
  publishedAt: string;
  itemCount: number;
  privacyStatus: string;
}

interface ChannelDetail {
  title: string;
  description: string;
  customUrl: string;
  publishedAt: string;
  thumbnail: string;
}

export default function ChannelPage({
  params,
}: {
  params: { channelId: string };
}) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [channelDetail, setChannelDetail] = useState<ChannelDetail | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChannelContent = async () => {
      try {
        const [videosData, playlistsData, channelData] = await Promise.all([
          fetchGraphql({
            query: VIDEOS_BY_CHANNELID,
            variables: {
              channelId: params.channelId,
              maxItems: 50,
            },
          }),
          fetchGraphql({
            query: GQL_PLAYLISTS_BY_CHANNELID,
            variables: { channelId: params.channelId },
          }),
          fetchGraphql({
            query: GQL_CHANNEL_DETAIL,
            variables: { channelId: params.channelId },
          }),
        ]);

        setVideos(videosData.youtubeVideosByChannelId);
        setPlaylists(playlistsData.youtubePlaylistByChannelId);
        setChannelDetail(channelData.youtubeChannelById);
        setLoading(false);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : '컨텐츠를 불러오는데 실패했습니다.'
        );
        setLoading(false);
      }
    };

    fetchChannelContent();
  }, [params.channelId]);

  const formatViewCount = (viewCount: string) => {
    const count = parseInt(viewCount);
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count;
  };

  const getRelativeTime = (publishedAt: string) => {
    const diff = new Date().getTime() - new Date(publishedAt).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}일 전`;
    if (hours > 0) return `${hours}시간 전`;
    return `${minutes}분 전`;
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;

  return (
    <div className="p-4">
      <Tabs defaultValue="videos" className="w-full">
        <TabsList>
          <TabsTrigger value="about">채널 정보</TabsTrigger>
          <TabsTrigger value="videos">동영상</TabsTrigger>
          <TabsTrigger value="playlists">재생목록</TabsTrigger>
        </TabsList>

        <TabsContent value="about">
          {channelDetail && (
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <div className="flex items-start gap-6">
                <img
                  src={channelDetail.thumbnail}
                  alt={channelDetail.title}
                  className="w-32 h-32 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-2">
                    {channelDetail.title}
                  </h1>
                  {channelDetail.customUrl && (
                    <p className="text-muted-foreground mb-2">
                      @{channelDetail.customUrl.replace('@', '')}
                    </p>
                  )}
                  <p className="text-sm text-muted-foreground mb-4">
                    가입일:{' '}
                    {new Date(channelDetail.publishedAt).toLocaleDateString()}
                  </p>
                  <p className="text-sm whitespace-pre-wrap">
                    {channelDetail.description}
                  </p>
                </div>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="videos">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {videos.map((video) => (
              <VideoCard key={video.video.videoId} video={video} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="playlists">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {playlists && playlists.length > 0 ? (
              playlists.map((playlist) => (
                <PlaylistCard key={playlist.playlistId} playlist={playlist} />
              ))
            ) : (
              <div>재생목록이 없습니다.</div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
