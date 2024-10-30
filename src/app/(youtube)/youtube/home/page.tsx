'use client';

import { useState } from 'react';
import { Header } from '../containers/Header';
import { Sidebar } from '../containers/Sidebar';
import { MainContent } from './containers/MainContent';

export default function Page() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isExpandedSidebar, setIsExpandedSidebar] = useState(false);

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
    </div>
  );
}
