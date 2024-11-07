'use client';

import { useState, useEffect } from 'react';
import ChannelCard from '@/components/youtube/ChannelCard';
import { fetchGraphql } from '@/service/fetchData';
import { GQL_CHANNELS_BY_USERID } from '@/queries/gql/youtube';

const userId = 'mooninlearn';

interface Channel {
  channelId: string;
  title: string;
  thumbnail: string;
  subscriberCount: string;
  viewCount: string;
  videoCount: string;
  description: string;
  customUrl: string;
}

function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const data = await fetchGraphql({
          query: GQL_CHANNELS_BY_USERID,
          variables: { userId },
        });

        if (data?.youtubeChannelsByUserId) {
          setSubscriptions(data.youtubeChannelsByUserId);
          setLoading(false);
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : '구독 정보를 불러오는데 실패했습니다.'
        );
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;

  return (
    <div className="flex-1 p-4 ml-0 sm:ml-[0px] xl:ml-[0px] w-full">
      <h1 className="text-2xl font-bold mb-6">구독 목록</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
        {subscriptions.map((channel) => (
          <ChannelCard
            key={channel.channelId}
            channel={{
              id: channel.channelId,
              title: channel.title,
              thumbnail: channel.thumbnail,
              subscriberCount: channel.subscriberCount,
              viewCount: channel.viewCount || '0',
              videoCount: channel.videoCount || '0',
              description: channel.description || '',
              customUrl: channel.customUrl || channel.title,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default SubscriptionsPage;
