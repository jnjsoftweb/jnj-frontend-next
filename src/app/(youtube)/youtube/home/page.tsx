'use client';

import { useState } from 'react';
import {
  Search,
  Menu,
  Video,
  User,
  Mic,
  Home,
  PlaySquare,
  Users,
  Library,
  History,
  ThumbsUp,
  Clock,
  ChevronDown,
  ArrowLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Page() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isExpandedSidebar, setIsExpandedSidebar] = useState(false);

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

  const tabItems = ['전체', '뉴스', '게임', '라이브', '부동산', '시각 예술'];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background">
        <div className="flex items-center justify-between p-4">
          {isSearchVisible ? (
            <div className="flex items-center w-full">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchVisible(false)}
              >
                <ArrowLeft className="h-6 w-6" />
              </Button>
              <Input className="flex-1 ml-2" placeholder="검색" type="search" />
            </div>
          ) : (
            <>
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    if (window.innerWidth >= 768) {
                      // md 브레이크포인트
                      setIsExpandedSidebar(!isExpandedSidebar);
                    } else {
                      setIsDrawerOpen(true);
                    }
                  }}
                >
                  <Menu className="h-6 w-6" />
                </Button>
                <div className="flex items-center gap-2">
                  <Video className="h-6 w-6 text-red-600" />
                  <span className="text-xl font-bold hidden sm:inline-block">
                    YouTube
                  </span>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-4 flex-1 max-w-xl ml-auto">
                <Input className="flex-1" placeholder="Search" type="search" />
                <Button size="icon" variant="ghost">
                  <Search className="h-5 w-5" />
                </Button>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  onClick={() => setIsSearchVisible(true)}
                >
                  <Search className="h-6 w-6" />
                </Button>
                <Button variant="ghost" size="icon">
                  <User className="h-6 w-6" />
                </Button>
              </div>
            </>
          )}
        </div>
      </header>
      <div className="flex">
        {/* Fixed width sidebar with transition */}
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
        {/* Main content with margin transition */}
        <div
          className={`w-full transition-[margin] duration-300 ease-in-out ${
            isExpandedSidebar ? 'ml-56' : 'ml-[72px]'
          }`}
        >
          <div className="max-w-[2000px] mx-auto">
            <Tabs defaultValue="전체" className="w-full">
              <TabsList className="flex justify-start overflow-x-auto">
                {tabItems.map((item) => (
                  <TabsTrigger key={item} value={item} className="px-4 py-2">
                    {item}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="aspect-video bg-muted rounded-lg"></div>
                  <div className="flex gap-2">
                    <div className="w-10 h-10 rounded-full bg-muted"></div>
                    <div className="flex-1 space-y-1">
                      <div className="h-4 w-full bg-muted rounded"></div>
                      <div className="h-3 w-2/3 bg-muted rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
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
                key={channel}
                variant="ghost"
                className="w-full justify-start"
              >
                <User className="h-5 w-5 mr-2" />
                {channel}
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
