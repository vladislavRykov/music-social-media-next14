import React, { useState } from 'react';
import s from './PlaylistItemsBlock.module.scss';
import { MusicData, UserDataMongoose } from '@/types/types';
import PlaylistItem from './PlaylistItem/PlaylistItem';
import { Overwrite } from '@/types/common';
import { PlaylistData } from '@/types/playlistTypes';
import { ReactSortable } from 'react-sortablejs';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { setPlaylistItems as setPlaylistItemsRedux } from '@/redux/slices/PlayerSlice';
import { setNewPlaylistOrderAction } from '@/actions/playlist';
import SelectedPopup from '@/components/shared/Popups/SelectedPopup/SelectedPopup';
import Link from 'next/link';
import { areArraysEqual } from '@/utils/ArrayFunctions';
import { useSearchParams } from 'next/navigation';

type PlaylistItemsBlockProps = {
  playlistItems: MusicData[];
  playlistId: string;
  type: string;
  updatePlaylist: () => Promise<{
    likesAndDislikes: {
        likes: string[];
        dislikes: string[];
    } | null | undefined;
    playlist: Overwrite<PlaylistData, {
        userId: UserDataMongoose;
        items: MusicData[];
    }> | null;
} | null>;
  isAuthor: boolean;
  isPlaylistEmpty: boolean;
  likesAndDislikes: {
    likes: string[];
    dislikes: string[];
} | null;
};

const PlaylistItemsBlock: React.FC<PlaylistItemsBlockProps> = ({
  playlistItems,
  playlistId,
  updatePlaylist,
  isAuthor,
  isPlaylistEmpty,
  likesAndDislikes,
  type
}) => {
  const dispatch = useAppDispatch();
  // const searchParams = useSearchParams();
  // const shuffled = searchParams?.get('shuffled');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  console.log(likesAndDislikes)
  const [playlistItemsState, setPlaylistItemsState] = useState(playlistItems);
  const playlist = useAppSelector((state) => state.playerReducer.playlist);

  const handleOnChange = async (newList: MusicData[]) => {
    console.log('handleOnChange')
    const oldListIds = sortedPlaylistItem.map((item) => item._id);
  const newListIds = newList.map((item) => item._id);
  if (areArraysEqual(oldListIds, newListIds)) return 
    try {
      const newListIds = newList.map((item) => item._id);
      playlist._id === playlistId && dispatch(setPlaylistItemsRedux(newListIds)); // Обновляем состояние в Redux
    setPlaylistItemsState(newList);
      // playlist._id !== playlistId && setPlaylistItemsState(newList);
      await setNewPlaylistOrderAction(playlistId, newListIds);
    } catch (error) {
      console.error('Ошибка при сохранении порядка плейлиста:', error);
    }
  };


  const sortedPlaylistItem =
    // playlist._id === playlistId
    //   ? (playlist.items.map((item) => {
    //       const playlistItem = playlistItems.find((playlistItem) => playlistItem._id === item);
    //       return { id: playlistItem?._id, ...playlistItem };
    //     }) as (MusicData & { id: string })[])
      // :
       playlistItemsState.map((item) => ({ id: item._id, ...item }));
  return (
    <div className={s.playlistItemsBlock}>
      {!isPlaylistEmpty ? (
        <>
          <ReactSortable
            list={sortedPlaylistItem}
            // onEnd={onEnd}
            setList={(newList) => handleOnChange(newList)}
            className={s.playlistItemsBlock_items}>
            {sortedPlaylistItem.map((item) => (
              <PlaylistItem
              type={type}
                isAuthor={isAuthor}
                updatePlaylist={updatePlaylist}
                selectionMode={selectedItems.length > 0}
                isSelected={selectedItems.includes(item._id)}
                setSelectedItems={setSelectedItems}
                playlistId={playlistId}
                key={item._id}
                id={item._id}
                musicImg={item.image}
                title={item.title}
                author={item.author}
                duration={item.duration}
                likesAndDislikes={likesAndDislikes}
              />
            ))}
          </ReactSortable>
          {selectedItems.length > 0 && (
            <SelectedPopup
            type={type}
              playlistId={playlistId}
              selectedItems={selectedItems}
              closePopup={() => setSelectedItems([])}
            />
          )}
        </>
      ) : (
        <div className={s.emptyPlaylist}>
          <h2 className={s.emptyPlaylist_title}>Плейлист пуст</h2>
          <Link className={s.emptyPlaylist_link} href={'/browse'}>
            Перейти на страницу поиска
          </Link>
        </div>
      )}
    </div>
  );
};

export default PlaylistItemsBlock;
