import gql from 'graphql-tag';

const GET_SIMPLE_PLAYLIST_ITEMS = gql`
  query GetSimplePlaylistItems($playlistId: String!, $maxResults: Int) {
    youtubeGetSimplePlaylistItems(
      playlistId: $playlistId
      maxResults: $maxResults
    ) {
      items {
        title
        videoId
        description
        thumbnail
      }
    }
  }
`;


const PLAYLISTS_0 = gql`
  query GetPlaylistsByChannelId($channelId: String!) {
    youtubeGetPlaylistsByChannelId(channelId: "UCUpJs89fSBXNolQGOYKn0YQ") {
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

const PLAYLISTS = gql`
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
  channelId: "UCUpJs89fSBXNolQGOYKn0YQ"
}

// query GetChannelById($part: String, $id: String) {
//   youtubeGetChannels(
//     part: $part
//     id: $id
//   ) {
//     id
//     snippet {
//       title
//       description
//       thumbnails {
//         default {
//           url
//         }
//       }
//     }
//     statistics {
//       viewCount
//       subscriberCount
//       videoCount
//     }
//   }
// }


// {
//   "part": "snippet,statistics",
//   "id": "UCUpJs89fSBXNolQGOYKn0YQ"
// }


export { GET_SIMPLE_PLAYLIST_ITEMS };
