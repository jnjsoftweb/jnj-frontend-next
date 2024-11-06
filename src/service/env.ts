import path from 'path';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
const EXPRESS_URL = process.env.NEXT_PUBLIC_EXPRESS_URL || 'http://localhost';
const GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:3007/graphql';
const JSON_ROOT = '/db/json/';
const YOUTUBE_DOWNLOADS_SLUG =process.env.NEXT_PUBLIC_YOUTUBE_DOWNLOADS_SLUG || '/links/youtube/downloads/'
const APP_ROOT = path.resolve(process.cwd(), '../jnj-backend');
const SQLITE_DB_DIR = 'C:/JnJ-soft/Projects/internal/jnj-backend/db/sqlite';

export { APP_URL, EXPRESS_URL, JSON_ROOT, GRAPHQL_URL, YOUTUBE_DOWNLOADS_SLUG, APP_ROOT, SQLITE_DB_DIR };
