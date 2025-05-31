import React from 'react';
import PlayerPlaylistItems from './PlayerPlaylistItems/PlayerPlaylistItems';
import s from './PlayerPlaylistContent.module.scss';
import { useAsync } from '@/hooks/useFetching';
import { getPlayerPlaylistsData } from '@/actions/playlist';
import { selectPlayerPlaylist } from '@/redux/selectors/playerSelectors';
import { useAppSelector } from '@/hooks/reduxHooks';
import { MusicData, MusicDataWithReactionT } from '@/types/types';
import { getMusicsByIds } from '@/dal/music';
import Image from 'next/image';
import LoadingSvg from '@/public/circleTube.svg';
import { getArrayMusicByIdA } from '@/actions/music';
import Link from 'next/link';

const PlayerPlaylistContent = () => {
  const { playlist } = useAppSelector(selectPlayerPlaylist);
  const getPlaylistData = async () => {
    if (playlist._id) {
      const res = await getPlayerPlaylistsData(playlist._id);
      console.log('player', res.data?.items);
      if (!res.ok) return null;
      const data = { title: res.data?.title, _id: res.data?._id, items: res.data?.items } as {
        title: string;
        items: MusicDataWithReactionT[];
        _id: string | null;
      };
      return data;
    } else if (playlist.items.length > 0) {
      const res = await getArrayMusicByIdA(playlist.items);
      console.log(res);
      if (!res.ok) return null;
      return { title: 'Без названия', _id: null, items: res.data };
    } else {
      return null;
    }
  };
  const {
    execute,
    status,
    data: playlistData,
    error,
  } = useAsync(getPlaylistData, [playlist._id, playlist.items.length]);
  return (
    <div className={s.playerPlaylistContent}>
      {status === 'success' && playlistData && playlistData.items && (
        <>
          <div className={s.playerPlaylistContent_title}>
            <Link className={s.playerPlaylistContent_titleLink} href={`/playlist?list=${playlist._id}`}>{playlistData.title}</Link>
          </div>
          <PlayerPlaylistItems playlistItems={playlistData.items} />
        </>
      )}
      {(status === 'error') && <div>Не удалось получить плейлист</div>}
      {status === 'pending' && <Image src={LoadingSvg} alt="loading..." height={50} width={50} />}
    </div>
  );
};

export default PlayerPlaylistContent;
