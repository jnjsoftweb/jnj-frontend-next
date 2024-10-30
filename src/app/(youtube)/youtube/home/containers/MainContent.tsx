import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface MainContentProps {
  isExpandedSidebar: boolean;
}

export function MainContent({ isExpandedSidebar }: MainContentProps) {
  const tabItems = ['전체', '뉴스', '게임', '라이브', '부동산', '시각 예술'];

  return (
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
  );
}
