'use client';

import { useState } from 'react';
import { Header } from './containers/Header';
import { Sidebar } from './containers/Sidebar';

export default function YoutubeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isExpandedSidebar, setIsExpandedSidebar] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('Home');

  const toggleSidebar = () => {
    setIsExpandedSidebar(!isExpandedSidebar);
  };

  return (
    <div>
      <Header
        onMenuClick={toggleSidebar}
        isExpandedSidebar={isExpandedSidebar}
        setIsExpandedSidebar={setIsExpandedSidebar}
      />
      <Sidebar
        isExpandedSidebar={isExpandedSidebar}
        onMenuSelect={setSelectedMenu}
      />
      <div className="flex-1 w-full">
        <div className={`w-full transition-all duration-300 ease-in-out pl-0 sm:pl-[88px]`}>
          <div className="max-w-[2000px] mx-auto">{children}</div>
        </div>
      </div>
    </div>
  );
}