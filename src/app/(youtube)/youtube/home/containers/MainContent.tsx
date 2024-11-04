'use client';

import { useState, useEffect } from 'react';
import { fetchJson } from '@/service/fetchData';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  channelTitle: string;
  channelThumbnail: string;
  publishedAt: string;
  duration: string;
  viewCount: string;
  likeCount: string;
  commentCount: string | null;
}

interface MainContentProps {
  isExpandedSidebar: boolean;
}

export function MainContent({ isExpandedSidebar }: MainContentProps) {
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const data = await fetchJson('youtube/mostPopularVideos', {
          root: '/backups/db/json/'
        });
        setVideos(data);
      } catch (error) {
        console.error('Error loading videos:', error);
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, []);

  // 조회수를 포맷팅하는 함수
  const formatViewCount = (viewCount: string) => {
    const count = parseInt(viewCount);
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count;
  };

  // 날짜를 상대적 시간으로 변환하는 함수
  const getRelativeTime = (publishedAt: string) => {
    const diff = new Date().getTime() - new Date(publishedAt).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}일 전`;
    if (hours > 0) return `${hours}시간 전`;
    return `${minutes}분 전`;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {videos.map((video) => (
          <div
            key={video.id}
            className="space-y-2 cursor-pointer"
            onClick={() => setSelectedVideoId(video.id)}
          >
            {/* 기존 비디오 카드 내용 */}
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
            <div className="flex gap-2">
              <img
                src={video.channelThumbnail}
                alt={video.channelTitle}
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1 space-y-1">
                <h3 className="font-medium line-clamp-2 text-sm">
                  {video.title}
                </h3>
                <div className="text-sm text-muted-foreground">
                  <div>{video.channelTitle}</div>
                  <div>
                    조회수 {formatViewCount(video.viewCount)}회 •{' '}
                    {getRelativeTime(video.publishedAt)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 비디오 플레이어 모달 */}
      {selectedVideoId && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setSelectedVideoId(null)}
        >
          <div
            className="bg-white p-4 rounded-lg w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative pt-[56.25%]">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${selectedVideoId}?autoplay=1`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => setSelectedVideoId(null)}
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </>
  );
}
