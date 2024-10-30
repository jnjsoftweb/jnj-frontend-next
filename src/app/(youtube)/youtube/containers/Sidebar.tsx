import {
  Home,
  Library,
  Clock,
  ThumbsUp,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import mySubscriptions from '../db/mySubscriptions.json';
import { useState } from 'react';

interface SidebarProps {
  isExpandedSidebar: boolean;
}

export function Sidebar({ isExpandedSidebar }: SidebarProps) {
  const [showAllSubscriptions, setShowAllSubscriptions] = useState(false);

  const menuItems = [
    { name: 'Home', icon: Home },
    { name: 'Downloads', icon: Library },
    { name: 'Watch later', icon: Clock },
    { name: 'Liked videos', icon: ThumbsUp },
  ];

  const subscriptions = mySubscriptions;
  const displayedSubscriptions = showAllSubscriptions 
    ? subscriptions 
    : subscriptions.slice(0, 6);

  return (
    <aside
      className={`fixed top-[56px] left-0 h-[calc(100vh-56px)] bg-background border-r transition-[width] duration-300 ease-in-out z-40 ${
        isExpandedSidebar ? 'w-[240px]' : 'w-[88px]'
      }`}
    >
      <nav className="space-y-2 p-2 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
        {menuItems.map((item) => (
          <Button
            key={item.name}
            variant="ghost"
            className="w-full justify-start"
          >
            <item.icon className="h-5 w-5 mr-0 xl:mr-2" />
            <span className={isExpandedSidebar ? 'inline' : 'hidden'}>
              {item.name}
            </span>
          </Button>
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
          <Button
            key={channel.channelId}
            variant="ghost"
            className="w-full justify-start gap-2"
          >
            <img
              src={channel.thumbnail}
              alt={channel.title}
              className="h-6 w-6 rounded-full object-cover flex-shrink-0"
            />
            <span className={isExpandedSidebar ? 'inline truncate' : 'hidden'}>
              {channel.title}
            </span>
          </Button>
        ))}
        {subscriptions.length > 6 && (
          <Button 
            variant="ghost" 
            className="w-full justify-start"
            onClick={() => setShowAllSubscriptions(!showAllSubscriptions)}
          >
            <ChevronDown className={`h-5 w-5 mr-0 xl:mr-2 transform transition-transform flex-shrink-0 ${
              showAllSubscriptions ? 'rotate-180' : ''
            }`} />
            <span className={isExpandedSidebar ? 'inline' : 'hidden'}>
              {showAllSubscriptions ? '간략히 보기' : '더보기'}
            </span>
          </Button>
        )}
      </nav>
    </aside>
  );
}
