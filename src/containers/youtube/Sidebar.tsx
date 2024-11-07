import {
  Home,
  Library,
  Users,
  Clock,
  ThumbsUp,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { fetchGraphql } from '@/service/fetchData';
import { GQL_CHANNELS_BY_USERID } from '@/queries/gql/youtube';
import { getLoginInfo } from '@/utils/youtube';

interface SidebarProps {
  isExpandedSidebar: boolean;
  onMenuSelect: (menu: string) => void;
}

export function Sidebar({ isExpandedSidebar, onMenuSelect }: SidebarProps) {
  const [showAllSubscriptions, setShowAllSubscriptions] = useState(false);
  const pathname = usePathname();
  const currentChannelId = pathname?.includes('/channel/')
    ? pathname.split('/channel/')[1]
    : '';
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const userId = getLoginInfo();
        if (!userId) return;

        const variables = {
          userId,
        };

        const data = await fetchGraphql({
          query: GQL_CHANNELS_BY_USERID,
          variables,
        });

        if (data?.youtubeChannelsByUserId) {
          setSubscriptions(data.youtubeChannelsByUserId);
        }
      } catch (error) {
        console.error('구독 정보를 불러오는데 실패했습니다:', error);
      }
    };

    fetchSubscriptions();
  }, []);

  const menuItems = [
    { name: 'Home', icon: Home, path: '/youtube/home' },
    { name: 'Downloads', icon: Library, path: '/youtube/downloads' },
    { name: 'Subscriptions', icon: Users, path: '/youtube/subscriptions' },
    { name: 'Watch later', icon: Clock, path: '/youtube/watch-later' },
    { name: 'Liked videos', icon: ThumbsUp, path: '/youtube/liked' },
  ];

  const displayedSubscriptions = showAllSubscriptions
    ? subscriptions
    : subscriptions.slice(0, 6);

  return (
    <aside
      className={`fixed top-[56px] left-0 h-[calc(100vh-56px)] bg-background border-r 
        transition-all duration-300 ease-in-out 
        ${
          isExpandedSidebar
            ? 'w-[240px] translate-x-0 shadow-lg z-50'
            : 'hidden'
        }
      `}
    >
      <nav className="space-y-2 p-2 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
        {menuItems.map((item) => (
          <Link key={item.name} href={item.path}>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => onMenuSelect(item.name)}
            >
              <item.icon className="h-5 w-5 mr-0 xl:mr-2" />
              <span className='inline'>
                {item.name}
              </span>
            </Button>
          </Link>
        ))}
        <div className="my-4 border-t" />
        <h3
          className={`mb-2 px-4 text-lg font-semibold tracking-tight ${
            isExpandedSidebar ? 'block' : 'hidden'
          }`}
        >
          구독
        </h3>
        {displayedSubscriptions.map((channel) => (
          <Link
            key={channel.channelId}
            href={`/youtube/channel/${channel.channelId}`}
          >
            <Button
              variant={
                channel.channelId === currentChannelId ? 'secondary' : 'ghost'
              }
              className={`w-full justify-start gap-2 ${
                channel.channelId === currentChannelId
                  ? 'bg-accent hover:bg-accent/80'
                  : 'hover:bg-accent/10'
              }`}
            >
              <img
                src={channel.thumbnail}
                alt={channel.title}
                className="h-6 w-6 rounded-full object-cover flex-shrink-0"
              />
              <span
                className='inline truncate'
              >
                {channel.title}
              </span>
            </Button>
          </Link>
        ))}
        {subscriptions.length > 6 && (
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => setShowAllSubscriptions(!showAllSubscriptions)}
          >
            <ChevronDown
              className={`h-5 w-5 mr-0 xl:mr-2 transform transition-transform flex-shrink-0 ${
                showAllSubscriptions ? 'rotate-180' : ''
              }`}
            />
            <span className='inline'>
              {showAllSubscriptions ? '간략히 보기' : '더보기'}
            </span>
          </Button>
        )}
      </nav>
    </aside>
  );
}
