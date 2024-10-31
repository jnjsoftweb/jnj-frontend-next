'use client';

import { useState, useEffect } from 'react';
import { VIDEOS_BY_PLAYLISTID } from '@/queries/gql/youtube';
import { fetchGraphql } from '@/service/fetchData';

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  channelTitle: string;
  publishedAt: string;
  duration: string;
  viewCount: string;
  likeCount: string;
  commentCount: string;
}

export default function ChannelVideos({
  params,
}: {
  params: { channelId: string };
}) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await fetchGraphql({
          query: VIDEOS_BY_PLAYLISTID,
          variables: { channelId: params.channelId },
        });
        setVideos(data.youtubeGetChannelVideos);
        setLoading(false);
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
  }, [params.channelId]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {videos.map((video) => (
        <div key={video.id} className="space-y-2">
          <div className="relative group">
            <div className="aspect-video bg-muted rounded-lg overflow-hidden">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
              {video.duration
                .replace('PT', '')
                .replace('H', ':')
                .replace('M', ':')
                .replace('S', '')}
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="font-medium line-clamp-2 text-sm">{video.title}</h3>
            <div className="text-sm text-muted-foreground">
              <div>{video.channelTitle}</div>
              <div>
                조회수 {parseInt(video.viewCount).toLocaleString()}회 •{' '}
                {new Date(video.publishedAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
