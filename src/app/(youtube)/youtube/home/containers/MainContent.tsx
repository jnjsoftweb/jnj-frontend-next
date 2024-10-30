import mostPopularVideos from '../../db/mostPopularVideos.json';

interface MainContentProps {
  isExpandedSidebar: boolean;
}

export function MainContent({ isExpandedSidebar }: MainContentProps) {
  // 조회수를 포맷팅하는 함수
  const formatViewCount = (viewCount: string) => {
    const count = parseInt(viewCount);
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count;
  };

  // 날짜를 상대적 시간으로 변환하는 함수
  const getRelativeTime = (publishedAt: string) => {
    const diff = new Date().getTime() - new Date(publishedAt).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}일 전`;
    if (hours > 0) return `${hours}시간 전`;
    return `${minutes}분 전`;
  };

  return (
    <div
      className={`w-full transition-[margin] duration-300 ease-in-out ${
        isExpandedSidebar ? 'ml-[280px]' : 'ml-[88px]'
      }`}
    >
      <div className="max-w-[2000px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {mostPopularVideos.map((video) => (
            <div key={video.videoId} className="space-y-2">
              <div className="relative group">
                <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                  {video.duration.replace('PT', '').replace('H', ':').replace('M', ':').replace('S', '')}
                </div>
              </div>
              <div className="flex gap-2">
                <img
                  src={`https://i.ytimg.com/vi/${video.videoId}/default.jpg`}
                  alt={video.channelTitle}
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1 space-y-1">
                  <h3 className="font-medium line-clamp-2 text-sm">
                    {video.title}
                  </h3>
                  <div className="text-sm text-muted-foreground">
                    <div>{video.channelTitle}</div>
                    <div>
                      조회수 {formatViewCount(video.viewCount)}회 • {getRelativeTime(video.publishedAt)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
