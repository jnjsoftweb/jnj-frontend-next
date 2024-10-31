import {
  Home,
  Library,
  Users,
  Clock,
  ThumbsUp,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import mySubscriptions from '../db/mySubscriptions.json';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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

  const menuItems = [
    { name: 'Home', icon: Home, path: '/youtube/home' },
    { name: 'Downloads', icon: Library, path: '/youtube/downloads' },
    { name: 'Subscriptions', icon: Users, path: '/youtube/subscriptions' },
    { name: 'Watch later', icon: Clock, path: '/youtube/watch-later' },
    { name: 'Liked videos', icon: ThumbsUp, path: '/youtube/liked' },
  ];

  const subscriptions = mySubscriptions;
  const displayedSubscriptions = showAllSubscriptions
    ? subscriptions
    : subscriptions.slice(0, 6);

  return (
    <aside
      className={`fixed top-[56px] left-0 h-[calc(100vh-56px)] bg-background border-r 
        transition-all duration-300 ease-in-out 
        ${isExpandedSidebar ? 'w-[240px]' : 'w-[88px]'}
        md:translate-x-0 
        ${isExpandedSidebar ? 'translate-x-0' : '-translate-x-full'}
        ${isExpandedSidebar ? 'z-50 md:z-40' : 'z-40'}
        ${isExpandedSidebar ? 'shadow-lg md:shadow-none' : ''}
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
              <span className={isExpandedSidebar ? 'inline' : 'hidden'}>
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
          <Link key={channel.id} href={`/youtube/channel/${channel.id}`}>
            <Button
              variant={channel.id === currentChannelId ? 'secondary' : 'ghost'}
              className={`w-full justify-start gap-2 ${
                channel.id === currentChannelId
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
                className={isExpandedSidebar ? 'inline truncate' : 'hidden'}
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
            <span className={isExpandedSidebar ? 'inline' : 'hidden'}>
              {showAllSubscriptions ? '간략히 보기' : '더보기'}
            </span>
          </Button>
        )}
      </nav>
    </aside>
  );
}
