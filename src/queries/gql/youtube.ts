const CHANNEL_DETAIL_BY_ID = `
  query GetChannelDetailById($channelId: String!) {
    youtubeChannelDetail(id: $channelId) {
      title
      description
      customUrl
      publishedAt
      thumbnail
      uploadsPlaylistId
      viewCount
      subscriberCount
      videoCount
    }
  }
`;

const PLAYLISTS_BY_CHANNELID = `
  query GetPlaylistsByChannelId($channelId: String!) {
    youtubeGetPlaylistsByChannelId(channelId: $channelId) {
      id
      title
      description
      thumbnail
      channelTitle
      publishedAt
      itemCount
      privacyStatus
    }
  }
`;

const channelId = {
  channelId: 'UCUpJs89fSBXNolQGOYKn0YQ',
};

const VIDEOS_BY_CHANNELID = `
  query GetVideoDetailsByChannelId($channelId: String!, $maxItems: Int) {
    youtubeGetVideoDetailsByChannelId(channelId: $channelId, maxItems: $maxItems) {
      id
      title
      description
      thumbnail
      channelId
      channelTitle
      channelThumbnail
      publishedAt
      duration
      caption
      tags
      viewCount
      likeCount
      dislikeCount
      favoriteCount
      commentCount
    }
  }
`;

const VIDEOS_BY_PLAYLISTID = `
query GetVideoDetailsByPlaylistId($playlistId: String!, $maxItems: Int) {
  youtubeGetVideoDetailsByPlaylistId(playlistId: $playlistId, maxItems: $maxItems) {
    id
    title
    description
    thumbnail
    channelId
    channelTitle
    channelThumbnail
    publishedAt
    duration
    caption
    tags
    viewCount
    likeCount
  }
}
`;

export {
  CHANNEL_DETAIL_BY_ID,
  PLAYLISTS_BY_CHANNELID,
  VIDEOS_BY_CHANNELID,
  VIDEOS_BY_PLAYLISTID,
  channelId,
};
