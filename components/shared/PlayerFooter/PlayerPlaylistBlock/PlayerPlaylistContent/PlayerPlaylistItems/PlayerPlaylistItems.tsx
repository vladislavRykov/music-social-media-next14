// 'use client';

// import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';

// import { MusicData } from '@/types/types';
// import React from 'react';
// import PlayerPlaylistItem from './PlayerPlaylistItem/PlayerPlaylistItem';
// import s from './PlayerPlaylistItems.module.scss';
// import { ReactSortable } from 'react-sortablejs';
// import { setPlaylistItems as setPlaylistItemsRedux } from '@/redux/slices/PlayerSlice';
// import {areArraysEqual }from '@/utils/ArrayFunctions'
// import { setNewPlaylistOrderAction } from '@/actions/playlist';
// import { selectPlayerPlaylist } from '@/redux/selectors/playerSelectors';

// type PropsT = {
//   playlistItems: MusicData[];
// };

// const PlayerPlaylistItems: React.FC<PropsT> = ({ playlistItems }) => {
//   const dispatch = useAppDispatch();
//   const { playlist } = useAppSelector(selectPlayerPlaylist);
//   console.log(playlistItems)
//   const handleOnChange = async (newList: MusicData[]) => {
//     const oldListIds = sortedPlaylistItem.map((item) => item._id);
//     const newListIds = newList.map((item) => item._id);
//     if (areArraysEqual(oldListIds, newListIds)) return
//     try {
//       // const newListIds = newList.map((item) => item._id);
//       dispatch(setPlaylistItemsRedux(newListIds)); // Обновляем состояние в Redux
//       console.log(playlist._id, newListIds)
//       playlist._id && (await setNewPlaylistOrderAction(playlist._id, newListIds));
//     } catch (error) {
//       console.error('Ошибка при сохранении порядка плейлиста:', error);
//     }
//   };

//   const sortedPlaylistItem = playlist.items.map((item) => {
//     const playlistItem = playlistItems.find((playlistItem) => playlistItem._id === item);
//     return { id: playlistItem?._id, ...playlistItem };
//   }) as (MusicData & { id: string })[];
//   return (
//     <ReactSortable
//       list={sortedPlaylistItem}
//       setList={(newList) => handleOnChange(newList)}
//       className={s.playerPlaylistItems}>
//       {sortedPlaylistItem.map((playlistItem) => (
//         <PlayerPlaylistItem
//           playlistId={playlist._id}
//           _id={playlistItem._id}
//           playlist={playlist.items}
//           image={playlistItem.image}
//           title={playlistItem.title}
//           author={playlistItem.author}
//           duration={playlistItem.duration}
//         />
//       ))}
//     </ReactSortable>
//   );
// };

// export default PlayerPlaylistItems;
'use client';

import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';

import { MusicData, MusicDataWithReactionT } from '@/types/types';
import React from 'react';
import PlayerPlaylistItem from './PlayerPlaylistItem/PlayerPlaylistItem';
import s from './PlayerPlaylistItems.module.scss';
import { ReactSortable } from 'react-sortablejs';
import { setPlaylistItems as setPlaylistItemsRedux } from '@/redux/slices/PlayerSlice';
import { areArraysEqual } from '@/utils/ArrayFunctions';
import { setNewPlaylistOrderAction } from '@/actions/playlist';
import { selectPlayerPlaylist } from '@/redux/selectors/playerSelectors';

type PropsT = {
  playlistItems: MusicDataWithReactionT[];
};

const PlayerPlaylistItems: React.FC<PropsT> = ({ playlistItems }) => {
  const dispatch = useAppDispatch();
  const { playlist } = useAppSelector(selectPlayerPlaylist);
  const prevListRef = useRef<MusicDataWithReactionT[] | null>(null);

  const handleOnChange = async (newList: MusicDataWithReactionT[]) => {
    if (!prevListRef.current) return;
    const oldListIds = prevListRef.current.map((item) => item._id);
    const newListIds = newList.map((item) => item._id);
    if (areArraysEqual(oldListIds, newListIds)) return;
    try {
      // const newListIds = newList.map((item) => item._id);
      dispatch(setPlaylistItemsRedux(newListIds)); // Обновляем состояние в Redux
      playlist._id && (await setNewPlaylistOrderAction(playlist._id, newListIds));
    } catch (error) {
      console.error('Ошибка при сохранении порядка плейлиста:', error);
    }
  };

  const sortedPlaylistItem = playlist.items.map((item) => {
    const playlistItem = playlistItems.find((playlistItem) => playlistItem._id === item);
    return { id: playlistItem?._id, ...playlistItem };
  }) as (MusicDataWithReactionT & { id: string })[];
  useEffect(() => {
    prevListRef.current = sortedPlaylistItem;
  }, [sortedPlaylistItem]);
  return (
    <ReactSortable
      list={sortedPlaylistItem}
      setList={(newList) => handleOnChange(newList)}
      className={s.playerPlaylistItems}>
      {sortedPlaylistItem.map((playlistItem) => (
        <PlayerPlaylistItem
          reactionStatus={playlistItem.reactionStatus}
          playlistId={playlist._id}
          _id={playlistItem._id}
          playlist={playlist.items}
          image={playlistItem.image}
          title={playlistItem.title}
          author={playlistItem.author}
          duration={playlistItem.duration}
        />
      ))}
    </ReactSortable>
  );
};

export default PlayerPlaylistItems;
