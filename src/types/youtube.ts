interface VideoDetail {
  video: {
    videoId: string;
    title: string;
    description: string;
    thumbnail: string;
    publishedAt: string;
    duration: string;
    viewCount: string;
    likeCount: string;
  };
  channel: {
    channelId: string;
    title: string;
    thumbnail: string;
  };
}

interface PlaylistDetail {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  channelTitle: string;
  publishedAt: string;
  itemCount: number;
  privacyStatus: string;
}

interface ChannelDetail {
  title: string;
  description: string;
  customUrl: string;
  publishedAt: string;
  thumbnail: string;
}

export type { VideoDetail, PlaylistDetail, ChannelDetail };
