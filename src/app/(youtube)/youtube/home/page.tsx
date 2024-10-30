'use client';

import { useState } from 'react';
import {
  Video,
  User,
  ChevronDown,
  Home as HomeIcon,
  PlaySquare,
  Library as LibraryIcon,
  Clock,
  ThumbsUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Header } from '../containers/Header';
import { Sidebar } from '../containers/Sidebar';
import { MainContent } from './containers/MainContent';
import mySubscriptions from '../db/mySubscriptions.json';

export default function Page() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isExpandedSidebar, setIsExpandedSidebar] = useState(false);

  const menuItems = [
    { name: 'Home', icon: HomeIcon },
    { name: 'Shorts', icon: PlaySquare },
    { name: 'Subscriptions', icon: User },
    { name: 'Library', icon: LibraryIcon },
    { name: 'Watch later', icon: Clock },
    { name: 'Liked videos', icon: ThumbsUp },
  ];

  const subscriptions = mySubscriptions;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header
        onMenuClick={() => setIsDrawerOpen(true)}
        isExpandedSidebar={isExpandedSidebar}
        setIsExpandedSidebar={setIsExpandedSidebar}
      />
      <div className="flex">
        <Sidebar isExpandedSidebar={isExpandedSidebar} />
        <MainContent isExpandedSidebar={isExpandedSidebar} />
      </div>
      <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <SheetContent side="left" className="w-[240px]">
          <div className="flex items-center gap-2 mb-6">
            <Video className="h-6 w-6 text-red-600" />
            <span className="text-xl font-bold">YouTube</span>
          </div>
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                className="w-full justify-start"
              >
                <item.icon className="h-5 w-5 mr-2" />
                {item.name}
              </Button>
            ))}
            <div className="my-4 border-t" />
            <h3 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              구독
            </h3>
            {subscriptions.map((channel) => (
              <Button
                key={channel.channelId}
                variant="ghost"
                className="w-full justify-start gap-2"
              >
                <img
                  src={channel.thumbnail}
                  alt={channel.title}
                  className="h-6 w-6 rounded-full"
                />
                {channel.title}
              </Button>
            ))}
            <Button variant="ghost" className="w-full justify-start">
              <ChevronDown className="h-5 w-5 mr-2" />
              더보기
            </Button>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
