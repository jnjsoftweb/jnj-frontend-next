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

export { GET_SIMPLE_PLAYLIST_ITEMS };
