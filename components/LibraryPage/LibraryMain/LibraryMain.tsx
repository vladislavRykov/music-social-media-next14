'use client';
import React, { useEffect, useState } from 'react';
import s from './LibraryMain.module.scss';
import musicImg from '@/public/musicImg.jpg';
import FavPlaylist from '@/public/favSongsImg.png';
import LibPlaylist from '../LibPlaylist/LibPlaylist';
import { useAsync, useLoading } from '@/hooks/useFetching';
import { getAllUserPlaylist, getPlaylistsByUsernameAction } from '@/actions/playlist';
import { toast } from 'react-toastify';
import {
  ItemsPlaylistData,
  LibraryPlaylistData,
  PlaylistData,
  UserPlaylistData,
} from '@/types/playlistTypes';
import { AccessType, Overwrite } from '@/types/common';
import { useParams } from 'next/navigation';
import LoadingSvg from '@/public/circleTube.svg';
import { useAppSelector } from '@/hooks/reduxHooks';
import Image from 'next/image';
import { moveToFront } from '@/utils/MoveToFront';
import LibraryItemLoader from '@/components/UI/Loaders/LibraryItemLoader';
import { selectUserProfileData } from '@/redux/selectors/userSelectors';

type PlaylistType = Overwrite<
  PlaylistData,
  { userId: UserPlaylistData; items: LibraryPlaylistData[] }
>;

const LibraryMain = () => {
  const params: { nickname: string } | null = useParams();
  const { userId: currentUserId, userName: currentUserName } =
    useAppSelector(selectUserProfileData);
  const isCurrentUserProfile = Boolean(
    currentUserName && params && params.nickname === currentUserName,
  );
  const asyncFunction = async () => {
    if (params) {
      return getPlaylistsByUsernameAction<PlaylistType[]>(params.nickname, [
        {
          path: 'userId',
          select: 'username', // Выбираем только name и email
        },
        {
          path: 'items',
          select: 'image songPath', // Выбираем только name и email
        },
      ]);
    } else {
      return null;
    }
  };
  const { execute, status, error, data: playlists } = useAsync(asyncFunction, [params?.nickname]);
  useEffect(() => {
    if (!playlists?.ok) toast.error(playlists?.message);
  }, []);
  const findPlaylistById = (type: string) => (obj: PlaylistType) => obj.type === type;
  const newPlaylists: PlaylistType[] | undefined = moveToFront(
    playlists?.data || [],
    findPlaylistById('favorites'),
  );
  return (
    <div className={s.librarymain}>
      {status === 'success' && newPlaylists.length === 0 && (
        <div className={s.noPosts}>
          {isCurrentUserProfile
            ? 'Тут отображаются ваши плейлисты'
            : 'Тут отображаются плейлисты пользователя'}
        </div>
      )}
      <div className={s.itemList}>
        {status === 'success' &&
          newPlaylists.map((playlist) => {
            if (
              playlist.access_type === AccessType.Private &&
              playlist.userId._id !== currentUserId
            )
              return null;
            return (
              <LibPlaylist
                isCurrentUserAuthor={playlist.userId._id === currentUserId}
                type={playlist.type}
                key={playlist._id}
                playlistImg={playlist.playlistImg || playlist.items[0]?.image || musicImg}
                title={playlist.title}
                author={playlist.userId.username}
                trackCount={playlist.items.length}
                playlistId={playlist._id}
                allItems={playlist.items.map((item) => item._id)}
                desc={playlist.description}
              />
            );
          })}
        {status === 'pending' &&
          Array(25)
            .fill(0)
            .map((_, idx) => <LibraryItemLoader key={idx} />)}
      </div>
    </div>
  );
};

export default LibraryMain;
