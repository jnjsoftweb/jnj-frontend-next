'use client';

import { useEffect, useState } from 'react';
import { PLAYLISTS_BY_CHANNELID, channelId } from '@/queries/gql/youtube';
import { fetchGraphql } from '@/service/fetchData';

interface Playlist {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  channelTitle: string;
  publishedAt: string;
  itemCount: number;
  privacyStatus: string;
}

export default function FromGraphql() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlaylists = async (variables: any) => {
      try {
        const data = await fetchGraphql({
          query: PLAYLISTS_BY_CHANNELID,
          variables,
        });

        setPlaylists(data.youtubeGetPlaylistsByChannelId);
        setLoading(false);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : '플레이리스트를 불러오는데 실패했습니다.'
        );
        setLoading(false);
      }
    };

    fetchPlaylists(channelId);
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">플레이리스트</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {playlists.map((playlist) => (
          <div key={playlist.id} className="border rounded-lg p-4 shadow-sm">
            <img
              src={playlist.thumbnail}
              alt={playlist.title}
              className="w-full h-48 object-cover rounded-md mb-2"
            />
            <h2 className="text-xl font-semibold mb-2">{playlist.title}</h2>
            <p className="text-gray-600 mb-2">{playlist.description}</p>
            <div className="text-sm text-gray-500">
              <p>채널: {playlist.channelTitle}</p>
              <p>동영상 수: {playlist.itemCount}</p>
              <p>공개 상태: {playlist.privacyStatus}</p>
              <p>
                게시일: {new Date(playlist.publishedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
