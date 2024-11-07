'use client';

import { useEffect, useState } from 'react';
import VideoLocal from '@/components/videoLocal';
import { formatViewCount, getRelativeTime } from '@/utils/youtube';

interface VideoInfo {
  title: string;
  publishedAt: string;
  channelTitle: string;
  channelId: string;
  channelThumbnail: string;
  description: string;
}

export default function LocalVideoPage({
  params,
}: {
  params: { videoPath: string[] };
}) {
  // videoPath 배열의 마지막 요소가 실제 비디오 파일명
  const fullPath = params.videoPath.join('/');
  const decodedVideoPath = decodeURIComponent(fullPath);
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 비디오 파일명만 추출 (경로의 마지막 부분)
    const videoFileName = decodedVideoPath.split('/').pop() || '';
    const mockVideoInfo = {
      title: videoFileName.split('_')[0],
      publishedAt: new Date().toISOString(),
      channelTitle: '채널명',
      channelId: '1',
      viewCount: '100',
      channelThumbnail: '/placeholder.jpg',
      description: '비디오 설명',
    };
    setVideoInfo(mockVideoInfo);
    setLoading(false);
  }, [decodedVideoPath]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;
  if (!videoInfo) return <div>동영상을 찾을 수 없습니다.</div>;

  return (
    <div className="flex-1 p-4">
      <div className="w-full mx-auto">
        <div className="aspect-video w-full mb-4">
          <VideoLocal videoName={decodedVideoPath} />
        </div>

        <div className="w-full mx-auto">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold mb-2">{videoInfo.title}</h1>
              <div className="text-sm text-muted-foreground">
                조회수 {formatViewCount(videoInfo.viewCount)}회 •{' '}
                {getRelativeTime(videoInfo.publishedAt)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
