interface Channel {
  id: string;
  title: string;
  thumbnail: string;
  subscriberCount: string;
  viewCount: string;
  videoCount: string;
  description: string;
  customUrl: string;
}

interface ChannelCardProps {
  channel: Channel;
}

const ChannelCard = ({ channel }: ChannelCardProps) => {
  return (
    <div className="flex flex-col p-6 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-200 bg-white w-full min-w-[300px]">
      <div className="flex flex-col items-center">
        <img 
          src={channel.thumbnail} 
          alt={channel.title}
          className="w-32 h-32 rounded-full mb-4 border-2 border-gray-100"
        />
        <h3 className="text-lg font-semibold text-center mb-1">{channel.title}</h3>
        <a 
          href={`https://youtube.com/${channel.customUrl}`} 
          className="text-sm text-gray-500 hover:text-blue-500 mb-3"
          target="_blank"
          rel="noopener noreferrer"
        >
          {channel.customUrl.replace('@@', '@')}
        </a>
      </div>
      
      <div className="flex flex-col gap-2 mb-4 text-sm text-gray-600">
        <div className="flex justify-between px-4">
          <span>구독자</span>
          <span className="font-medium">{Number(channel.subscriberCount).toLocaleString()}명</span>
        </div>
        <div className="flex justify-between px-4">
          <span>동영상</span>
          <span className="font-medium">{Number(channel.videoCount).toLocaleString()}개</span>
        </div>
        <div className="flex justify-between px-4">
          <span>총 조회수</span>
          <span className="font-medium">{Number(channel.viewCount).toLocaleString()}회</span>
        </div>
      </div>
      
      <p className="text-sm text-gray-600 line-clamp-2 text-center">
        {channel.description}
      </p>
    </div>
  );
};

export default ChannelCard; 