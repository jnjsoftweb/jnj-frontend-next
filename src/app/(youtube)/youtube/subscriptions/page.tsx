'use client';

import ChannelCard from '../components/ChannelCard';
import mySubscriptions from '../db/mySubscriptions.json';

function SubscriptionsPage() {
  return (
    <div className="flex-1 p-4 ml-0 sm:ml-[0px] xl:ml-[0px] w-full">
      <h1 className="text-2xl font-bold mb-6">구독 목록</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
        {mySubscriptions.map((subscription) => (
          <ChannelCard
            key={subscription.id}
            channel={{
              id: subscription.id,
              title: subscription.title,
              thumbnail: subscription.thumbnail,
              subscriberCount: subscription.subscriberCount,
              viewCount: subscription.viewCount || '0',
              videoCount: subscription.videoCount || '0',
              description: subscription.description || '',
              customUrl: subscription.customUrl || subscription.title
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default SubscriptionsPage; 