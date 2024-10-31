'use client';

import { useEffect, useState } from 'react';
import ChannelCard from '../components/ChannelCard';
import mySubscriptions from '../db/mySubscriptions.json';
import { CHANNEL_DETAIL_BY_ID } from '@/queries/gql/youtube';
import { fetchGraphql } from '@/service/fetchData';

interface ChannelDetail {
  title: string;
  description: string;
  customUrl: string;
  publishedAt: string;
  thumbnail: string;
}

function SubscriptionsPage() {
  const [channelDetails, setChannelDetails] = useState<Record<string, ChannelDetail>>({});

  useEffect(() => {
    const fetchChannelDetails = async () => {
      const details: Record<string, ChannelDetail> = {};
      
      for (const subscription of mySubscriptions) {
        try {
          const response = await fetchGraphql({
            query: CHANNEL_DETAIL_BY_ID,
            variables: { channelId: subscription.id }
          });
          details[subscription.id] = response.youtubeChannelDetail;
        } catch (error) {
          console.error(`채널 정보 로딩 실패 (${subscription.id}):`, error);
        }
      }
      
      setChannelDetails(details);
    };

    fetchChannelDetails();
  }, []);

  return (
    <div className="flex-1 ml-[88px] xl:ml-[240px] p-4">
      <h1 className="text-2xl font-bold mb-6">구독 목록</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mySubscriptions.map((subscription) => {
          const channelDetail = channelDetails[subscription.id];
          if (!channelDetail) return null;
          
          return (
            <ChannelCard
              key={subscription.id}
              channel={{
                id: subscription.id,
                title: channelDetail.title,
                thumbnail: channelDetail.thumbnail,
                subscriberCount: channelDetail.subscriberCount,
                viewCount: channelDetail.viewCount,
                videoCount: channelDetail.videoCount,
                description: channelDetail.description,
                customUrl: channelDetail.customUrl
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default SubscriptionsPage; 