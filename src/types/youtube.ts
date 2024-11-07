interface UserInfo {
  userId: string;
  name: string;
  email: string;
  thumbnail: string;
  password: string;
}

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

export type { UserInfo, VideoDetail, PlaylistDetail, ChannelDetail };
