import React from 'react';
import PlayerPlaylistItems from './PlayerPlaylistItems/PlayerPlaylistItems';
import s from './PlayerPlaylistContent.module.scss';
import { useAsync } from '@/hooks/useFetching';
import { getPlayerPlaylistsData } from '@/actions/playlist';
import { selectPlayerPlaylist } from '@/redux/selectors/playerSelectors';
import { useAppSelector } from '@/hooks/reduxHooks';
import { MusicData } from '@/types/types';
import { getMusicsByIds } from '@/dal/music';
import Image from 'next/image';
import LoadingSvg from '@/public/circleTube.svg';

const PlayerPlaylistContent = () => {
  const { playlist } = useAppSelector(selectPlayerPlaylist);
  console.log(playlist)
  const getPlaylistData = async () => {
    console.log(playlist)
    if (playlist._id) {
      const res = await getPlayerPlaylistsData(playlist._id);
      if (!res.ok) return null;
      const data = { title: res.data?.title, _id: res.data?._id, items: res.data?.items } as {
        title: string;
        items: MusicData[];
        _id: string | null;
      };
      return data;
    } else if (playlist.items.length > 0) {
      console.log(playlist.items)
      const res = await getMusicsByIds({ musicIds: playlist.items });
      if (!res) return null;
      return { title: 'Без названия', _id: null, items: res };
    } else {
      return null;
    }
  };
  const { execute, status, data: playlistData, error } = useAsync(getPlaylistData, [playlist._id,playlist.items.length]);
  console.log(playlistData);
  return (
    <div className={s.playerPlaylistContent}>
      {status === 'success' && playlistData && (
        <>
          <div className={s.playerPlaylistContent_title}>{playlistData.title}</div>
          <PlayerPlaylistItems playlistItems={playlistData.items} />
        </>
      )}
      {status === 'error' && <div>Не удалось получить плейлист</div>}
      {status === 'pending' && <Image src={LoadingSvg} alt="loading..." height={50} width={50} />}
    </div>
  );
};

export default PlayerPlaylistContent;
