'use client';

import { useState, useEffect } from 'react';
import { VideoDetail, PlaylistDetail, ChannelDetail } from '@/types/youtube';
import { fetchGraphql } from '@/service/fetchData';
import {
  VIDEOS_BY_CHANNELID,
  GQL_PLAYLISTS_BY_CHANNELID,
  GQL_CHANNEL_DETAIL,
} from '@/queries/gql/youtube';
import { ChannelTabs } from '@/components/youtube/ChannelTabs';
import { PlaylistCard } from '@/components/youtube/PlaylistCard';

interface Props {
  params: {
    channelId: string;
  };
}

export default function ChannelPlaylistPage({ params }: Props) {
  const [videoDetails, setVideoDetails] = useState<VideoDetail[]>([]);
  const [playlistDetails, setPlaylistDetails] = useState<PlaylistDetail[]>([]);
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

        setVideoDetails(videosData.youtubeVideosByChannelId);
        
        setPlaylistDetails(playlistsData.youtubePlaylistByChannelId);
        
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

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;
  if (!channelDetail) return <div>채널 정보를 찾을 수 없습니다.</div>;

  return (
    <main className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-4">{channelDetail.title}</h1>
          <ChannelTabs
            channelDetail={channelDetail}
            videoDetails={videoDetails}
            playlistDetails={playlistDetails}
            defaultValue="playlists"
            channelId={params.channelId}
          />
        </div>
      </div>
    </main>
  );
}
