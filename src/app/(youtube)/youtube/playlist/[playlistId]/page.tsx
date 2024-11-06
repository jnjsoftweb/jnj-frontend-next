'use client';

import { useState, useEffect } from 'react';
import { VIDEOS_BY_PLAYLISTID } from '@/queries/gql/youtube';
import { fetchGraphql } from '@/service/fetchData';

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

  const formatDuration = (duration: string | null | undefined) => {
    if (!duration) return '';
    return duration
      .replace('PT', '')
      .replace('H', ':')
      .replace('M', ':')
      .replace('S', '');
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {videos.map((video) => (
          <div key={video.video.videoId} className="space-y-2">
            <div className="relative group">
              <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                <img
                  src={video.video.thumbnail}
                  alt={video.video.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                {formatDuration(video.duration)}
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="font-medium line-clamp-2 text-sm">
                {video.video.title}
              </h3>
              <div className="text-sm text-muted-foreground">
                <div>{video.channel.title}</div>
                <div>
                  조회수 {formatViewCount(video.video.viewCount)}회 •{' '}
                  {getRelativeTime(video.video.publishedAt)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
