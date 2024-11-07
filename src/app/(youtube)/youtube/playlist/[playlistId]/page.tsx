'use client';

import { useState, useEffect } from 'react';
import { VIDEOS_BY_PLAYLISTID } from '@/queries/gql/youtube';
import { fetchGraphql } from '@/service/fetchData';
import { VideoCard } from '@/app/(youtube)/youtube/components/VideoCard';

interface Channel {
  channelId: string;
  title: string;
  thumbnail: string;
}

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
  channel: Channel;
}

export default function PlaylistPage({
  params,
}: {
  params: { playlistId: string };
}) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await fetchGraphql({
          query: VIDEOS_BY_PLAYLISTID,
          variables: { playlistId: params.playlistId },
        });

        if (data?.youtubeVideosByPlaylistId) {
          setVideos(data.youtubeVideosByPlaylistId);
          setLoading(false);
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : '동영상을 불러오는데 실패했습니다.'
        );
        setLoading(false);
      }
    };

    fetchVideos();
  }, [params.playlistId]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {videos.map((video) => (
          <VideoCard key={video.video.videoId} video={video} />
        ))}
      </div>
    </div>
  );
}
