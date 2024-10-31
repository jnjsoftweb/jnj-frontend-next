import { useState } from 'react';
import { Search, Menu, Video, User, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  onMenuClick: () => void;
  isExpandedSidebar: boolean;
  setIsExpandedSidebar: (expanded: boolean) => void;
}

export function Header({
  onMenuClick,
  isExpandedSidebar,
  setIsExpandedSidebar,
}: HeaderProps) {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  return (
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
                    setIsExpandedSidebar(!isExpandedSidebar);
                  } else {
                    onMenuClick();
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
  );
}
