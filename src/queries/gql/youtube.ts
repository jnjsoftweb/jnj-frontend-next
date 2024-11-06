const GQL_ALL_CHANNELS = `
  query getYoutubeAllChannels {
    youtubeAllChannels {
      channelId
      title
      customUrl
      publishedAt
      description
      thumbnail
      uploadsPlaylistId
      viewCount
      subscriberCount
      videoCount
    }
  }
`;

const GQL_CHANNELS_BY_USERID = `
  query getChannelsByUserId($userId: String!) {
    youtubeChannelsByUserId(userId: $userId) {
      channelId
      title
      customUrl
      publishedAt
      description
      thumbnail
      uploadsPlaylistId
      viewCount
      subscriberCount
      videoCount
    }
  }
`;

const GQL_CHANNEL_DETAIL = `
  query getYoutubeChannelById($channelId: String!) {
    youtubeChannelById(channelId: $channelId) {
      channelId
      title
      customUrl
      publishedAt
      description
      thumbnail
      uploadsPlaylistId
      viewCount
      subscriberCount
      videoCount
    }
  }
`;

const GQL_PLAYLISTS_BY_CHANNELID = `
  query getYoutubePlaylistByChannelId($channelId: String!) {
    youtubePlaylistByChannelId(channelId: $channelId) {
      playlistId
      title
      thumbnail
      publishedAt
      itemCount
    }
  }
`;

const channelId = {
  channelId: 'UCUpJs89fSBXNolQGOYKn0YQ',
};

// const VIDEOS_BY_CHANNELID = `
//   query GetVideoDetailsByChannelId($channelId: String!, $maxItems: Int) {
//     youtubeVideosByChannelId(channelId: $channelId) {
//       id
//       title
//       description
//       thumbnail
//       channelId
//       channelTitle
//       channelThumbnail
//       publishedAt
//       duration
//       caption
//       tags
//       viewCount
//       likeCount
//       commentCount
//     }
//   }
// `;

const VIDEOS_BY_CHANNELID = `
  query GetVideoDetailsByChannelId($channelId: String!){
    youtubeVideosByChannelId(channelId: $channelId) {
      video {
        videoId
        title
        description
        thumbnail
        publishedAt
        viewCount
        likeCount
      }
      channel {
        channelId
        title
        description
        thumbnail
      }
    }
  }
`;

const VIDEOS_BY_PLAYLISTID = `
  query GetVideoDetailsByPlaylistId($playlistId: String!) {
    youtubeVideosByPlaylistId(playlistId: $playlistId) {
      video {
        videoId
        title
        description
        thumbnail
        publishedAt
        duration
        viewCount
        likeCount
      }
      channel {
        channelId
        title
        thumbnail
      }
    }
  }
`;

export {
  GQL_ALL_CHANNELS,
  GQL_CHANNEL_DETAIL,
  GQL_CHANNELS_BY_USERID,
  GQL_PLAYLISTS_BY_CHANNELID,
  VIDEOS_BY_CHANNELID,
  VIDEOS_BY_PLAYLISTID,
  channelId,
};
