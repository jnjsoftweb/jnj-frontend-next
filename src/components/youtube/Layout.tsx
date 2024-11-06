// src/components/Layout.tsx
import { ReactNode } from 'react';
import {Sidebar} from '@/containers/youtube/Sidebar'; // 사이드바 컴포넌트 임포트

const Layout = ({ children, isVideoPage }: { children: ReactNode; isVideoPage: boolean }) => {
  return (
    <div className="flex">
      {!isVideoPage && <Sidebar isExpandedSidebar={true} onMenuSelect={() => {}} />} {/* 비디오 페이지가 아닐 때만 사이드바 렌더링 */}
      <main className={`flex-1 ${isVideoPage ? 'p-0' : 'p-4'}`}>{children}</main>
    </div>
  );
};

export default Layout;