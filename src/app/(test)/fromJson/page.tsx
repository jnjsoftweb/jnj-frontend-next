import { fetchJson } from '@/service/fetchData';

interface Subscription {
  title: string;
  channelId: string;
  thumbnail: string;
  description: string;
}

export default async function DataPage() {
  const subscriptions = (await fetchJson('mySubscriptions')) as Subscription[];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My YouTube Subscriptions</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subscriptions?.map((subscription, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 flex items-start space-x-4"
          >
            <img
              src={subscription.thumbnail}
              alt={subscription.title}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h2 className="font-semibold">{subscription.title}</h2>
              <p className="text-sm text-gray-600 line-clamp-2">
                {subscription.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
