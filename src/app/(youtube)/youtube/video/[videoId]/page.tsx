'use client';

import { useEffect, useState } from 'react';
import { GQL_VIDEO_DETAIL } from '@/queries/gql/youtube';
import { fetchGraphql } from '@/service/fetchData';
import { VideoPopupMenu } from '@/components/youtube/VideoPopupMenu';
import { formatViewCount, getRelativeTime } from '@/utils/youtube';
import { VideoDetail } from '@/types/youtube';
import Link from 'next/link';
import Layout from '@/components/youtube/Layout';

export default function VideoPage({ params }: { params: { videoId: string } }) {
  const [videoDetail, setVideoDetail] = useState<VideoDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideoDetail = async () => {
      try {
        const data = await fetchGraphql({
          query: GQL_VIDEO_DETAIL,
          variables: { videoId: params.videoId },
        });

        if (data?.youtubeVideoById) {
          setVideoDetail(data.youtubeVideoById);
        }
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

    fetchVideoDetail();
  }, [params.videoId]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;
  if (!videoDetail) return <div>동영상을 찾을 수 없습니다.</div>;

  return (
    <Layout isVideoPage={true}>
      <div className="max-w-full mx-auto">
        <div className="aspect-video w-full mb-4">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${params.videoId}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              {videoDetail.video.title}
            </h1>
            <div className="text-sm text-muted-foreground">
              조회수 {formatViewCount(videoDetail.video.viewCount)}회 •{' '}
              {getRelativeTime(videoDetail.video.publishedAt)}
            </div>
          </div>
          <VideoPopupMenu videoId={params.videoId} />
        </div>

        <div className="flex items-center gap-4 mb-4">
          <Link href={`/youtube/channel/${videoDetail.channel.channelId}`}>
            <img
              src={videoDetail.channel.thumbnail}
              alt={videoDetail.channel.title}
              className="w-12 h-12 rounded-full"
            />
          </Link>
          <div>
            <Link
              href={`/youtube/channel/${videoDetail.channel.channelId}`}
              className="font-medium hover:text-foreground"
            >
              {videoDetail.channel.title}
            </Link>
          </div>
        </div>

        <div className="bg-muted p-4 rounded-lg">
          <p className="whitespace-pre-wrap">{videoDetail.video.description}</p>
        </div>
      </div>
    </Layout>
  );
}
