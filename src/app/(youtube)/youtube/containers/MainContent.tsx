'use client';

import { useState, useEffect } from 'react';
import { fetchJson } from '@/service/fetchData';
import { VideoCard } from '@/components/youtube/VideoCard';

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

interface MainContentProps {
  isExpandedSidebar: boolean;
}

export function MainContent({ isExpandedSidebar }: MainContentProps) {
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const data = await fetchJson('youtube/mostPopularVideos');
        setVideos(data);
      } catch (error) {
        console.error('Error loading videos:', error);
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {videos.map((video) => (
        <VideoCard key={video.video.videoId} video={video} />
      ))}
    </div>
  );
}
