const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
const EXPRESS_URL = process.env.NEXT_PUBLIC_EXPRESS_URL || 'http://localhost';
const GRAPHQL_URL = process.env.GRAPHQL_URL || 'http://localhost:3007';
const JSON_ROOT =
  process.env.JSON_ROOT ||
  'C:/JnJ-soft/Projects/internal/jnj-backend/db/json/youtube/';
  const YOUTUBE_DOWNLOADS_SLUG =process.env.NEXT_PUBLIC_YOUTUBE_DOWNLOADS_SLUG || '/links/youtube/downloads/'
export { APP_URL, EXPRESS_URL, JSON_ROOT, GRAPHQL_URL, YOUTUBE_DOWNLOADS_SLUG };
