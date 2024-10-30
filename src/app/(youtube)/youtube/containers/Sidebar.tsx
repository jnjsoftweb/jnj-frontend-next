import {
  User,
  Home,
  PlaySquare,
  Users,
  Library,
  History,
  Video,
  Clock,
  ThumbsUp,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  isExpandedSidebar: boolean;
}

export function Sidebar({ isExpandedSidebar }: SidebarProps) {
  const menuItems = [
    { name: 'Home', icon: Home },
    { name: 'Shorts', icon: PlaySquare },
    { name: 'Subscriptions', icon: Users },
    { name: 'Library', icon: Library },
    { name: 'History', icon: History },
    { name: 'Your videos', icon: Video },
    { name: 'Watch later', icon: Clock },
    { name: 'Liked videos', icon: ThumbsUp },
  ];

  const subscriptions = [
    'Channel 1',
    'Channel 2',
    'Channel 3',
    'Channel 4',
    'Channel 5',
  ];

  return (
    <aside
      className={`fixed top-[56px] left-0 h-[calc(100vh-56px)] bg-background border-r transition-[width] duration-300 ease-in-out z-40 ${
        isExpandedSidebar ? 'w-56' : 'w-[72px]'
      }`}
    >
      <nav className="space-y-2 p-2">
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
        {subscriptions.map((channel) => (
          <Button
            key={channel}
            variant="ghost"
            className="w-full justify-start"
          >
            <User className="h-5 w-5 mr-0 xl:mr-2" />
            <span className={isExpandedSidebar ? 'inline' : 'hidden'}>
              {channel}
            </span>
          </Button>
        ))}
        <Button variant="ghost" className="w-full justify-start">
          <ChevronDown className="h-5 w-5 mr-0 xl:mr-2" />
          <span className={isExpandedSidebar ? 'inline' : 'hidden'}>
            더보기
          </span>
        </Button>
      </nav>
    </aside>
  );
}
