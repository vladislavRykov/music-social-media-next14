'use client';
import React, { CSSProperties, useEffect, useState } from 'react';
import s from './PlaylistPage.module.scss';
import PlaylistLeftBlock from '@/components/PlaylistPage/PlaylistLeftBlock/PlaylistLeftBlock';
import PlaylistItemsBlock from '@/components/PlaylistPage/PlaylistItemsBlock/PlaylistItemsBlock';
import { getPlaylistById } from '@/dal/playlist';
import { useSearchParams } from 'next/navigation';
import { AccessType, Overwrite } from '@/types/common';
import { useAsync } from '@/hooks/useFetching';
import { PlaylistData, UserPlaylistData } from '@/types/playlistTypes';
import { MusicData, UserDataMongoose, UserMainFields } from '@/types/types';
import Image from 'next/image';
import { useAppSelector } from '@/hooks/reduxHooks';
import { selectUser } from '@/redux/selectors/userSelectors';
import circleTube from '@/public/circleTube.svg';
import { getPlayerPlaylistsData } from '@/actions/playlist';
import { getUserMainFieldsById } from '@/dal/user';

const PlaylistPage = () => {
  const searchParams = useSearchParams();
  const currentUser = useAppSelector(selectUser);
  const isPlayerShown = useAppSelector((state) => state.playerReducer.showPlayer);

  const list = searchParams?.get('list');
  const asyncFunction = async () => {
    if (!list || list === 'LM') return null;
    const playlistData = await getPlayerPlaylistsData(list);
    if (!playlistData.ok || !playlistData.data) return null;
    const userData: UserMainFields | null = await getUserMainFieldsById(playlistData.data.userId);
    if (!userData) return null;
    console.log(playlistData.data.items.map((id) => id));
    return { playlist: playlistData.data, userData };
  };
  const { execute, data, error, status } = useAsync(asyncFunction, [list, currentUser?._id]);
  const isAuthor = currentUser?._id === data?.userData._id;

  const backgroundImageStyle: CSSProperties = {
    backgroundImage: `url(${data?.playlist?.items[0]?.image})`,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '300px',
    filter: 'blur(30px)',
  };

  const isPlaylistEmpty = data?.playlist?.items.length === 0;
  return (
    <div className={s.playlistPage} style={isPlayerShown ? { paddingBottom: '80px' } : {}}>
      <div style={backgroundImageStyle}></div>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '300px',
          backgroundColor: '#030303b5',
          filter: 'blur(30px)',
        }}></div>
      {status === 'success' && data?.playlist && (
        <>
          <PlaylistLeftBlock
            isPlayerShown={isPlayerShown}
            isPlaylistHasImg={!!data.playlist.playlistImg}
            isPlaylistEmpty={isPlaylistEmpty}
            isAuthor={isAuthor}
            firstSongId={data?.playlist.items[0]?._id}
            playlistId={data?.playlist._id}
            author={{
              username: data?.userData.username,
              avatar: data?.userData.avatar || '',
            }}
            type={data?.playlist.type}
            title={data?.playlist.title}
            playlistImg={
              data.playlist.playlistImg || data?.playlist.items[0]?.image || mockPlaylistAva
            }
            description={data?.playlist.description}
            trackCount={data?.playlist.items.length}
            totalDuration={data?.playlist.items.reduce((acc, prev) => acc + prev.duration, 0)}
            access_type={data?.playlist.access_type as AccessType}
            createdAt={data?.playlist.createdAt}
            updatePlaylistData={() => execute()}
          />
          <PlaylistItemsBlock
            type={data?.playlist.type}
            isPlaylistEmpty={isPlaylistEmpty}
            isAuthor={isAuthor}
            updatePlaylist={() => execute()}
            playlistId={data?.playlist._id}
            playlistItems={data?.playlist.items}
          />
        </>
      )}
      {status === 'pending' && (
        <div className={s.loadingBlock}>
          <Image src={circleTube} height={100} width={100} alt="loading..." />
        </div>
      )}
    </div>
  );
};

export default PlaylistPage;
